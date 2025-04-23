import { Server } from "socket.io";

// Memory store for connections and messages
let connections = {};
let messages = {};
let timeOnline = {};

export const connectToSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      allowedHeaders: ["*"],
      credentials: true
    }
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("join-call", (path) => {
      if (!connections[path]) {
        connections[path] = [];
      }

      connections[path].push(socket.id);
      timeOnline[socket.id] = new Date();

      // Notify all users in the call that a new user has joined
      for (let a = 0; a < connections[path].length; a++) {
        io.to(connections[path][a]).emit("user-joined", socket.id, connections[path]);
      }

      // Send chat history to the new user (if any)
      if (messages[path]) {
        for (let a = 0; a < messages[path].length; ++a) {
          io.to(socket.id).emit(
            "chat-message",
            messages[path][a]["data"],
            messages[path][a]["sender"],
            messages[path][a]["socket-id-sender"]
          );
        }
      }
    });

    socket.on("signal", (toId, message) => {
      io.to(toId).emit("signal", socket.id, message);
    });

    socket.on("chat-message", (data, sender) => {
      const [matchingRoom, found] = Object.entries(connections).reduce(
        ([matchedRoom, isFound], [roomKey, roomSockets]) => {
          if (!isFound && roomSockets.includes(socket.id)) {
            return [roomKey, true];
          }
          return [matchedRoom, isFound];
        },
        ["", false]
      );

      if (found) {
        if (!messages[matchingRoom]) {
          messages[matchingRoom] = [];
        }

        messages[matchingRoom].push({
          sender,
          data,
          "socket-id-sender": socket.id
        });

        connections[matchingRoom].forEach((elem) => {
          io.to(elem).emit("chat-message", data, sender, socket.id);
        });

        console.log("message from", sender, ":", data);
      }
    });

    socket.on("disconnect", () => {
      const disconnectTime = new Date();
      const diffTime = Math.abs(disconnectTime - timeOnline[socket.id]);
      delete timeOnline[socket.id];

      for (const [roomKey, socketList] of Object.entries(connections)) {
        if (socketList.includes(socket.id)) {
          connections[roomKey] = socketList.filter(id => id !== socket.id);

          connections[roomKey].forEach((id) => {
            io.to(id).emit("user-left", socket.id);
          });

          if (connections[roomKey].length === 0) {
            delete connections[roomKey];
          }

          break; // Once removed from a room, break loop
        }
      }

      console.log("User disconnected:", socket.id, `- was online for ${diffTime}ms`);
    });
  });

  return io;
};

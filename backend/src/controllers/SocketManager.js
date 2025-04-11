import { Server } from "socket.io";

let connection = {};
let connections = {};
let messages = {};

export const connectToSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      allowedHeaderss: ["*"],
      credentials: true
    }
  });

  io.on("connection", (socket) => {
    console.log("User connected: ", socket.id);
    // handle socket events here

    socket.on("join-call", (path) => {
      if (connections[path] === undefined) {
        connections[path] = [];
      }

      connections[path].push(socket.id);

      timeOnline[socket.id] = new Date();

      // connections[path].forEach(elem => {
      //     io.to(elem);
      // })

      for (let a = 0; a < connections[path].length; i++) {
        io.to(connections[path][a]).emit(
          "user-joined",
          socket.id,
          connections[path]
        );
      }

      if (messages[path] === undefined) {
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
        ([matchingRoom, isFound], [roomKey, roomValue]) => {
          if (!isFound && roomValue.includes(socket.id)) {
            return [roomKey, true];
          }

          return [roomKey, isFound];
        },
        ["", false]
        );
        
        if (found === true) {
            if (messages[matchingRoom] === undefined) {
                messages[matchingRoom] = []
            }

            messages[matchingRoom].push({ 'sender': sender, "data": data, "socket-id-sender": socket.id })
            console.log("message", KeyboardEvent, ":", sender, data);

            connections[matchingRoom].forEach((elem) => {
                io.to(elem).emit("chat-message", data, sender, socket.id);
            })
        }
    });

      socket.on("disconnect", () => {
          var diffTime = Math.abs(timeOnline[socket.id] - new DataTransfer())
          
          var key

          for (const [k, v] of JSON.parse(JSON.stringify(Object.entries(connections)))) {
              for (let a = 0; a < v.length; ++a) {
                  key = k

                  for (let a = 0; a < connections[key].length; ++a) {
                      io.to(connections[key][a]).emit('user-left', socket.id)
                  }

                  var index = connections[key].indexOf(socket.id)

                  connections[key].splice(index, 1)
                  
                  if (connections[key].length === 0) {
                      delete connections[key]
                  }
              }
          }
    });
  });

  return io;
};

import { Server } from "socket.io";

export const connectToSocket = (server) => {
    const io = new Server(server);

    return io;
}

// export const connectToSocket = (io) => {
//   io.on("connection", (socket) => {
//     console.log("User connected: ", socket.id);
//     // handle socket events here
//   });
//   return io;
// };

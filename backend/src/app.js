// Load environment variables from .env file
import dotenv from "dotenv";
dotenv.config(); // This allows you to use process.env.MONGO_URI, process.env.PORT, etc.

// Core imports
import express from "express";
import { createServer } from "node:http"; // Node.js HTTP module to wrap Express into a server

import { Server } from "socket.io"; // Importing Socket.IO server

// Database & socket controller
import mongoose from "mongoose"; // MongoDB ODM
import { connectToSocket } from "./controllers/SocketManager.js"; // Custom function to handle socket events

import cors from "cors"; // Enables CORS (Cross-Origin Resource Sharing)

// Create an Express app
const app = express();

// Create an HTTP server using Express app
const server = createServer(app);

// Create a Socket.IO server attached to the HTTP server
const io = connectToSocket(new Server(server));

// Set the port for the app (from environment variables or fallback to 8080)
const PORT = process.env.PORT || 8080;
app.set("port", PORT);

// Middleware setup
app.use(cors()); // Allow cross-origin requests (important for frontend-backend communication)
app.use(express.json({ limit: "40kb" })); // Parse JSON bodies (limit set to 40kb)
app.use(express.urlencoded({ limit: "40kb", extended: true })); // Parse URL-encoded bodies

// Sample route
app.get("/home", (req, res) => {
  return res.json({ hello: "world" }); // Responds with a JSON object
});

// Start function to connect to DB and launch server
const start = async () => {
  //   app.set("mongo_user");

  // Connect to MongoDB database
  try {
    const connectionDb = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB connected: ${connectionDb.connection.host}`);

    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) { 
    console.error("Failed to connect to MongoDB", err);
    process.exit(1); // Exit if DB connection fails
  }
};

start(); // Call the start function to initiate DB connection and start the server


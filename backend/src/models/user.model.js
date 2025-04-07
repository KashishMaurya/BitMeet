// Importing 'mongoose' and 'Schema' from the mongoose library
import mongoose, { Schema } from "mongoose";

// Creating a new Schema for the 'User' model
// A schema defines the structure of documents within a MongoDB collection
const userSchema = new Schema({
  // 'name' field: must be a String and is required
  name: {
    type: String,
    required: true, // This means the 'name' field must be provided
  },

  // 'username' field: must be a String, required and unique
  username: {
    type: String,
    required: true, // This field must be present when creating a user
    unique: true, // Ensures no two users can have the same username
  },

  // 'password' field: must be a String and is required
  password: {
    type: String,
    required: true, // The password is necessary for authentication
  },

  // 'token' field: optional string, used for storing a JWT or session token
  token: {
    type: String, // This can be used to store a JWT for the user session
  },
});

// Creating a Mongoose model from the schema
// This creates a 'users' collection in the MongoDB database (Mongoose automatically pluralizes the model name)
const User = mongoose.model("User", userSchema);

// Exporting the User model so it can be imported and used in other files
export { User };

/*
 So, what does this file actually do?
✅ 1. Sets up the schema (blueprint) for user data
✅ 2. Creates a Mongoose model
✅ 3. Exports the model
This file is essential for enabling your backend to talk to the database in a structured and consistent way. It handles all the data-related logic for users, like registration, login, token storage, etc.
*/

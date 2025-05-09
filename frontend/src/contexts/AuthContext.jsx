import { createContext, useState } from "react";
import axios from "axios";
import HttpStatus from "http-status";
import { useNavigate } from "react-router-dom";
import server from "../environment.js";

// Create context
export const AuthContext = createContext({});

// Axios client
const client = axios.create({
  baseURL: `${server}/api/v1/users`,
});

// Provider component
export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  const router = useNavigate();

  const handleRegister = async (name, username, password) => {
    try {
      const request = await client.post("/register", {
        name,
        username,
        password,
      });

      if (request.status === HttpStatus.CREATED) {
        return request.data.message;
      }
    } catch (error) {
      console.error("Error during registration:", error);
      throw error;
    }
  };

  const handleLogin = async (username, password) => {
    try {
      const request = await client.post("/login", {
        username,
        password,
      });

      if (request.status === HttpStatus.OK) {
        localStorage.setItem("token", request.data.token);
        // setUserData(request.data.user);
        router("/home");
      }
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  };

  const getHistoryOfUser = async () => {
    console.log("Fetching user History...");

    if (!localStorage.getItem("token")) {
      console.error("No token found in local storage.");
      return []; // or handle as needed
    }
    try {
      const request = await client.get("/get_all_activity", {
        params: {
          token: localStorage.getItem("token"),
        },
      });

      
      return request.data.history || []; // fallback to empty array
    } catch (err) {
      console.error("Error fetching history:", err);
      throw err;
    }
  };


  const addToUserHistory = async (meetingCode) => {
    try {
      let request = await client.post("/add_to_activity", {
        token: localStorage.getItem("token"),
        meeting_code: meetingCode,
      });
      return request.status;
    } catch (error) {
      throw error;
    }
  };

  const data = {
    userData,
    setUserData,
    handleRegister,
    handleLogin,
    getHistoryOfUser,
    addToUserHistory,
  };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

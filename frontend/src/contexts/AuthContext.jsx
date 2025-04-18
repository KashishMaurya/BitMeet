import { createContext, useState } from "react";
import axios from "axios";
import HttpStatus from "http-status";
import { useNavigate } from "react-router-dom";

// Create context
export const AuthContext = createContext({});

// Axios client
const client = axios.create({
  baseURL: "http://localhost:8080/api/v1/users",
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

  const data = {
    userData,
    setUserData,
    handleRegister,
    handleLogin, 
  };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

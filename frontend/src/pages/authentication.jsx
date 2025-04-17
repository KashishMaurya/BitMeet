import React from "react";
import {
  Avatar,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  // Link,
  Paper,
  Snackbar,
  TextField,
  // Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { AuthContext } from "../contexts/AuthContext";

const Authentication = () => {
  const [username, setUsername] = React.useState();
  const [password, setPassword] = React.useState();
  const [name, setName] = React.useState();
  const [error, setError] = React.useState();
  const [messages, setMessages] = React.useState();

  const [formState, setFormState] = React.useState(0);

  const [open, setOpen] = React.useState(false);

  const { handleRegister, handleLogin } = React.useContext(AuthContext);

  let handleAuth = async () => {
    try {
      if (formState === 0) {
      }
      if (formState === 1) {
        let result = await handleRegister(name, username, password);
        console.log(result);
        setMessages(result);
        setOpen(true);
      }
    } catch (error) {
      let message = error.response.data.message;
      setError(message);
    }
  };

  const paperStyle = {
    padding: 20,
    height: "100vh",
    width: 500,
    margin: "20px auto",
  };

  const avatarStyle = { backgroundColor: "#7b1fa2" };

  const btnStyle = { margin: "8px 0" };

  return (
    <Grid container style={{ minHeight: "100vh" }}>
      <Grid
        container
        style={{ minHeight: "100vh" }}
        item
        xs={false}
        sm={6}
        md={7}
        sx={{
          // backgroundImage:
          //   "url('https://unsplash.com/photos/black-macbook-watch-smartphone-and-notebook-XVhgrKy8C4g')",
          // backgroundRepeat: "no-repeat",
          backgroundColor: "black",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <Grid
        item
        xs={12}
        sm={6}
        md={5}
        component={Paper}
        elevation={6}
        square
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <div style={paperStyle}>
          <Grid align="center" sx={{ mb: 2 }}>
            <Avatar style={avatarStyle}>
              <LockOutlinedIcon />
            </Avatar>
          </Grid>

          <div align="center">
            <Button
              variant={formState === 0 ? "contained" : ""}
              onClick={() => {
                setFormState(0);
              }}
            >
              Sign In
            </Button>
            <Button
              variant={formState === 1 ? "contained" : ""}
              onClick={() => {
                setFormState(1);
              }}
            >
              Sign Up
            </Button>
          </div>

          {formState === 1 ? (
            <TextField
              label="Full Name"
              // placeholder="Enter Username"
              id="username"
              name="username"
              fullWidth
              required
              margin="normal"
              autoFocus
              onChange={(e) => setName(e.target.value)}
            />
          ) : (
            <></>
          )}

          <TextField
            label="Username"
            // placeholder="Enter Username"
            id="username"
            name="username"
            fullWidth
            required
            margin="normal"
            autoFocus
            onChange={(e) => setUsername(e.target.value)}
          />

          <TextField
            label="Password"
            // placeholder="Enter Password"
            type="password"
            id="password"
            name="password"
            fullWidth
            required
            margin="normal"
            onChange={(e) => setPassword(e.target.value)}
          />

          <p style={{color: "red"}}>{error}</p>

          <Button
            type="button"
            color="primary"
            variant="contained"
            fullWidth
            style={btnStyle}
            onClick={handleAuth}
          >
            {formState === 0 ? "Login" : "Register"}
          </Button>
        </div>
      </Grid>

      <Snackbar open={open} autoHideDuration={4000} message={messages} />
    </Grid>
  );
};

export default Authentication;


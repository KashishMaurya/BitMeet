import React from "react";
import {
  Avatar,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  // Link,
  Paper,
  TextField,
  // Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const Authentication = () => {

  const [username, setUsername] = React.useState();
  const [password, setPassword] = React.useState();
  const [name, setName] = React.useState();
  const [error, setError] = React.useState();
  const [messages, setMessages] = React.useState();

  const[formState, setFormState] = React.useState(0);

  const [open, setOpen] = React.useState(false);

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
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <LockOutlinedIcon />
            </Avatar>
            <h2>Sign In</h2>
          </Grid>

          <TextField
            label="Email Address"
            placeholder="Enter email"
            fullWidth
            required
            margin="normal"
          />

          <TextField
            label="Password"
            placeholder="Enter password"
            type="password"
            fullWidth
            required
            margin="normal"
          />

          <FormControlLabel
            control={<Checkbox name="checkedB" color="primary" />}
            label="Remember me"
          />

          <Button
            type="button"
            color="primary"
            variant="contained"
            fullWidth
            style={btnStyle}
          >
            Sign in
          </Button>
        </div>
      </Grid>
    </Grid>
  );
};

export default Authentication;

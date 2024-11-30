import React, { useEffect, useMemo, useState } from "react";
import { Button, Container, TextField, Typography } from "@mui/material";
import { io } from "socket.io-client";

const App = () => {
  const socket = useMemo(() => io(import.meta.env.VITE_BACKEND_URL), []);
  // const socket = io(import.meta.env.VITE_BACKEND_URL);
  const [message, setMessage] = useState("");
 
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server", socket.id);
    });
    socket.on("message", (data) => {
      console.log(data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", message);
    setMessage("");
  };
  return (
    <Container maxWidth="sm">
      <Typography variant="h1" component="div" gutterBottom>
        Welcome to Socket.io
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          id="outlined-basic"
          label="outlined"
          variant="outlined"
        />
        <Button type="submit" variant="contained" color="primary">
          Send
        </Button>
      </form>
    </Container>
  );
};
export default App;

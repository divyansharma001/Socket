import React, { useEffect, useMemo, useState } from "react";
import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import { io } from "socket.io-client";

const App = () => {
  const socket = useMemo(() => io(import.meta.env.VITE_BACKEND_URL), []);
  // const socket = io(import.meta.env.VITE_BACKEND_URL);
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [socketId, setSocketId] = useState("")
  const [messages, setMessages] = useState([]);
  const [roomName, setRoomName] = useState("");

  console.log(messages);
 
  useEffect(() => {
    socket.on("connect", () => {
      setSocketId(socket?.id)
      console.log("Connected to server", socket.id);
    });
    socket.on("message", (data) => {
      console.log(data);
    });

    socket.on("recieve-message", (data) => {
      console.log("recieve msg", data);
      setMessages((prev) => [...prev, data]);
    }
    );

    return () => {
      socket.disconnect();
    }
  }, [socket]);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", {message, room});
    setMessage("");
  };

  const joinRoomHandler = (e) =>{
    e.preventDefault();
    socket.emit("join-room", roomName);
    setRoomName("");
  }
  return (
    <Container maxWidth="sm">
      <Typography variant="h6" component="div" gutterBottom>
        Welcome to chat-app
      </Typography>

      <Typography variant="h4" component="div" gutterBottom>
        {socketId}
        </Typography>

        <form onSubmit={joinRoomHandler}>
          <h5>Join Room</h5>
          <TextField
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          id="outlined-basic"
          label="RoomName"
          variant="outlined"
        />
        <Button type="submit" variant="contained" color="primary">
          Join
        </Button>
        </form>


      <form onSubmit={handleSubmit}>
        <TextField
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          id="outlined-basic"
          label="Message"
          variant="outlined"
        />
         <TextField
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          id="outlined-basic"
          label="Room"
          variant="outlined"
        />
 
       <Stack>
        {messages.map((msg, index) => (
          <Typography key={index} variant="body1" component="div" gutterBottom>
            {msg}
          </Typography>
        ))}
       </Stack>

        <Button type="submit" variant="contained" color="primary">
          Send
        </Button>
      </form>
    </Container>
  );
};
export default App;

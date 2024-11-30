import express from 'express';
import {Server} from 'socket.io';
import {createServer} from 'http';
import cors from 'cors'
import 'dotenv/config' 
const PORT = 3000;

const app = express();

app.use(cors())

const server = createServer(app);

const io = new Server(server, {
  cors:{
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST'],
    credentials: true
  }
})

io.on('connection', (socket)=>{
console.log('a user connected', socket.id);
socket.on('message', (data)=>{
  console.log(data);
});
socket.on('disconnect', ()=>{
  console.log('user disconnected');
  socket.broadcast.emit('message', `${socket.id} has left the chat`);
});
})


app.get('/', (req, res) => {
res.send('Backend is up and running');
})

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
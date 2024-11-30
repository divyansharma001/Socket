import express from 'express';
import {Server} from 'socket.io';
import {createServer} from 'http';
const PORT = 3000;

const app = express();

const server = createServer(app);

const io = new Server

io.on('connection', (socket)=>{
console.log('a user connected');
console.log("id", socket.id);
})


app.get('/', (req, res) => {
res.send('Backend is up and running');
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
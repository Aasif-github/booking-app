import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import path from 'node:path';
import bookingRouter from './routes/booking.route';

const app = express();
// Create an HTTP server and bind it with Socket.io
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000", // Adjust to your frontend URL
      methods: ['GET', 'POST'],
    },
});
// Enable CORS for all routes
// app.use(cors());

// Optionally, configure CORS to allow specific origins
// app.use(cors({
//   origin: 'http://localhost:3000' // Only allow requests from this origin
// })); 

console.log('testing');

// Serve static files from the frontend folder
// app.use(express.static(path.join(__dirname, '../frontend')));
app.use(express.static(path.join(__dirname, '../frontend', 'public')));

app.get('/socket', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
});

app.get('/test', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend', 'test.html'));
});

// Handle Socket.io connections
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Emit a message to the client
  socket.emit('message', 'Hello from the server!');

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});


app.use(express.json());

app.use('/v1/booking', bookingRouter);

app.get('/', (req, res) => {
    res.send('Hello, TypeScript + Node.js + Express!');
});

export { app, server, io }
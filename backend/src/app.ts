import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

import bookingRouter from './routes/booking.route';


const app = express();

// Create HTTP server and attach Socket.IO
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
      origin: "http://localhost:3002", // Your frontend's URL
      methods: ["GET", "POST"],
    },
  });

app.use(express.json());

app.use('/v1/booking', bookingRouter);

app.get('/', (req, res) => {
    res.send('Hello, TypeScript + Node.js + Express!');
});

// Listen for connections
io.on('connection', (socket) => {
    console.log('a user connected', socket.id);

    socket.on('new-booking', (data) => {
        console.log('Received new booking:', data);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected', socket.id);
    }); 
});

export { app, server, io }
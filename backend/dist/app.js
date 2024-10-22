"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = exports.server = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const booking_route_1 = __importDefault(require("./routes/booking.route"));
const app = (0, express_1.default)();
exports.app = app;
// Create HTTP server and attach Socket.IO
const server = http_1.default.createServer(app);
exports.server = server;
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "http://localhost:3002", // Your frontend's URL
        methods: ["GET", "POST"],
    },
});
exports.io = io;
app.use(express_1.default.json());
app.use('/v1/booking', booking_route_1.default);
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

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = exports.server = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const node_path_1 = __importDefault(require("node:path"));
const booking_route_1 = __importDefault(require("./routes/booking.route"));
const app = (0, express_1.default)();
exports.app = app;
// Create an HTTP server and bind it with Socket.io
const server = http_1.default.createServer(app);
exports.server = server;
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "http://localhost:3000", // Adjust to your frontend URL
        methods: ['GET', 'POST'],
    },
});
exports.io = io;
// Enable CORS for all routes
// app.use(cors());
// Optionally, configure CORS to allow specific origins
// app.use(cors({
//   origin: 'http://localhost:3000' // Only allow requests from this origin
// })); 
console.log('testing');
// Serve static files from the frontend folder
// app.use(express.static(path.join(__dirname, '../frontend')));
app.use(express_1.default.static(node_path_1.default.join(__dirname, '../frontend', 'public')));
app.get('/socket', (req, res) => {
    res.sendFile(node_path_1.default.join(__dirname, '../frontend', 'index.html'));
});
app.get('/test', (req, res) => {
    res.sendFile(node_path_1.default.join(__dirname, '../frontend', 'test.html'));
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
app.use(express_1.default.json());
app.use('/v1/booking', booking_route_1.default);
app.get('/', (req, res) => {
    res.send('Hello, TypeScript + Node.js + Express!');
});

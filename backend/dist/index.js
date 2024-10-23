"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = __importDefault(require("./configs/database"));
dotenv_1.default.config();
// Listen for connections
// io.on('connection', (socket) => {
//     console.log('a user connected');
//     console.log('a user connected', socket.id);
//     socket.on('new-booking', (data) => {
//         console.log('Received new booking:', data);
//     });
//     socket.on('disconnect', () => {
//         console.log('user disconnected', socket.id);
//     }); 
// });
(0, database_1.default)().then(() => {
    console.log("MongoDB Connected");
}).then(() => {
    app_1.app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
}).catch((err) => {
    console.log(err);
});

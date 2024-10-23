import { app } from "./app";
import dotenv from "dotenv";
import connectDB from "./configs/database";
import { io } from "./app";

dotenv.config();
  
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

connectDB().then(() => {
    console.log("MongoDB Connected");
}).then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    })  
}).catch((err) => {
    console.log(err);
})


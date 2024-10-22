import { app } from "./app";
import dotenv from "dotenv";
import connectDB from "./configs/database";

dotenv.config();

connectDB().then(() => {
    console.log("MongoDB Connected");
}).then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    })  
}).catch((err) => {
    console.log(err);
})


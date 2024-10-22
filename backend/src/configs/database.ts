import mongoose from "mongoose";

const connectDB = async (): Promise<typeof mongoose | void> => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI as string);        
    } catch (error: any) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};  

export default connectDB
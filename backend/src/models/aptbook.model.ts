import { Schema, model } from "mongoose";

interface Appointment {
    aptId: string;
    userId: string;    
    reason: string;    
    date: string;
    time: string;
}

const aptBookSchema = new Schema<Appointment>({
    aptId: { type: String, required: true },
    userId: { type: String, required: true },
    reason: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
});

export const AptBook = model<Appointment>("AptBook", aptBookSchema);


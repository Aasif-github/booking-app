import { Request, Response, NextFunction } from "express";
import { AptBook }  from "../models/aptbook.model";
import { RequestHandler } from "express";
import ReturnResponse from "../utils/interfaces";
import { io } from "../app";

export const getBookings = (req: Request, res: Response) => {
    
    let data = {
        status: "success",
        message: "Get all bookings",
    };
    
    io.emit('get-booking', data);
    
    res.send("Get all bookings");
}   

export const createBooking: RequestHandler = async(req: Request, res: Response, next: NextFunction):Promise<any> => {
    try {
        const { aptId, userId, reason, date, time } = req.body;

        const newBooking = new AptBook({
            aptId,
            userId,
            reason,
            date,
            time
        });

        const data = await newBooking.save()    

        // Emit event to notify users about the new booking
        // io.emit('new-booking', {
        //     serviceId: service._id,
        //     bookingDate: bookingDate,
        //     status: 'confirmed',
        //     userId: req.userId,
        // });
        
        io.emit('new-booking', data);

        const response:ReturnResponse = {
            status: "success",
            message: "Created a new booking",
            data: data
        }

        return res.status(201).json(response);        
    
    } catch (error) {
        console.log(error);
        // next(error);    
    }     
}
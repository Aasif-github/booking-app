"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBooking = exports.getBookings = void 0;
const aptbook_model_1 = require("../models/aptbook.model");
const app_1 = require("../app");
const getBookings = (req, res) => {
    let data = {
        status: "success",
        message: "Get all bookings",
    };
    app_1.io.emit('get-booking', data);
    res.send("Get all bookings");
};
exports.getBookings = getBookings;
const createBooking = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { aptId, userId, reason, date, time } = req.body;
        const newBooking = new aptbook_model_1.AptBook({
            aptId,
            userId,
            reason,
            date,
            time
        });
        const data = yield newBooking.save();
        // Emit event to notify users about the new booking
        // io.emit('new-booking', {
        //     serviceId: service._id,
        //     bookingDate: bookingDate,
        //     status: 'confirmed',
        //     userId: req.userId,
        // });
        app_1.io.emit('new-booking', data);
        const response = {
            status: "success",
            message: "Created a new booking",
            data: data
        };
        return res.status(201).json(response);
    }
    catch (error) {
        console.log(error);
        // next(error);    
    }
});
exports.createBooking = createBooking;

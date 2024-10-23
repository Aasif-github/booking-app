import express from "express";
import { getBookings, createBooking } from "../controllers/booking.controller";

const router = express.Router();

// router.get("/", (req, res) => {
//     res.send("Hello, TypeScript + Node.js + Express!");
// });

router.get("/appointments", getBookings);
router.post("/book-appointment", createBooking);


export default router;
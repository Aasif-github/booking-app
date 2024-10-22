import express from "express";
import { createBooking } from "../controllers/booking.controller";

const router = express.Router();

// router.get("/", (req, res) => {
//     res.send("Hello, TypeScript + Node.js + Express!");
// });

router.post("/book-appointment", createBooking);

export default router;
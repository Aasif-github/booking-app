"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AptBook = void 0;
const mongoose_1 = require("mongoose");
const aptBookSchema = new mongoose_1.Schema({
    aptId: { type: String, required: true },
    userId: { type: String, required: true },
    reason: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
});
exports.AptBook = (0, mongoose_1.model)("AptBook", aptBookSchema);

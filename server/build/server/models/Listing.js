"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
var Level;
(function (Level) {
    Level["Preschool"] = "PRESCHOOL";
    Level["Primary"] = "PRIMARY";
    Level["Secondary"] = "SECONDARY";
    Level["JC"] = "JC";
    Level["Tertiary"] = "TERTIARY";
    Level["Other"] = "OTHER";
})(Level || (Level = {}));
const ListingSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    tutor: {
        type: mongoose_1.Types.ObjectId,
        ref: "User",
        required: true,
    },
    level: [String],
    subject: [String],
});
ListingSchema.plugin(mongoose_paginate_v2_1.default);
const Listing = mongoose_1.model("Listing", ListingSchema);
exports.default = Listing;

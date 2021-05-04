"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const PORT = process.env.PORT || 3000;
const app = express_1.default();
// body parser for json
app.use(express_1.default.json());
// routes
app.get("/ping", (_req, res) => {
    console.log("someone pinged here");
    res.send("pong");
});
// start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

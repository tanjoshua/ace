"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PORT = exports.MDB_KEY = exports.JWT_KEY = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.JWT_KEY = process.env.JWT_KEY;
exports.MDB_KEY = process.env.MDB_KEY;
exports.PORT = process.env.PORT;

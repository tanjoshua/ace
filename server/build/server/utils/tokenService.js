"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createToken = exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const HttpError_1 = __importDefault(require("../errors/HttpError"));
const config_1 = require("./config");
const verifyToken = (token) => {
    const parsedToken = jsonwebtoken_1.default.verify(token, config_1.JWT_KEY);
    // not authenticated
    if (!parsedToken) {
        throw new HttpError_1.default(401, "Unauthorized");
    }
    return parsedToken;
};
exports.verifyToken = verifyToken;
const createToken = (tokenData) => {
    const token = jsonwebtoken_1.default.sign(tokenData, config_1.JWT_KEY);
    return token;
};
exports.createToken = createToken;

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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = __importDefault(require("../models/User"));
const tokenService_1 = require("../utils/tokenService");
const HttpError_1 = __importDefault(require("../errors/HttpError"));
require("express-async-errors");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    // reject if email already exists
    const existingUser = yield User_1.default.exists({ email });
    if (existingUser) {
        throw new HttpError_1.default(403, "Email is already used");
    }
    const hashedPassword = yield bcrypt_1.default.hash(password, 12);
    // create user
    let user = new User_1.default({ name, email, password: hashedPassword });
    user = yield user.save();
    const token = tokenService_1.createToken({ userId: user.id, name: user.name });
    // save into db
    res.status(201).json({ userId: user.id, token });
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    // verify user
    const user = yield User_1.default.findOne({ email });
    if (!user) {
        throw new HttpError_1.default(401, "Invalid credentials");
    }
    const verified = yield user.verifyPassword(password);
    if (!verified) {
        throw new HttpError_1.default(401, "Invalid credentials");
    }
    // verified
    const token = tokenService_1.createToken({ userId: user.id, name: user.name });
    res.json({ userId: user.id, token });
});
exports.login = login;

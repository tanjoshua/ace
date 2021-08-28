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
exports.getUserDetails = void 0;
const User_1 = __importDefault(require("../models/User"));
const HttpError_1 = __importDefault(require("../errors/HttpError"));
require("express-async-errors");
const getUserDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.user.id;
    // get user details less password
    const user = yield User_1.default.findById(id).select("-password");
    if (!user) {
        throw new HttpError_1.default(404, "User not found");
    }
    res.json(user);
});
exports.getUserDetails = getUserDetails;

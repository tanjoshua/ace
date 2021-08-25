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
const User_1 = __importDefault(require("../models/User"));
const HttpError_1 = __importDefault(require("../errors/HttpError"));
const tokenService_1 = require("../utils/tokenService");
// token will be in the Authorization header eg. Bearer <token>
exports.default = (req, _res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authorization = req.get("Authorization");
    // no token attached
    if (!authorization || typeof authorization == "undefined") {
        // ERROR
        throw new HttpError_1.default(401, "Unauthorized");
    }
    // parse token
    const encryptedToken = authorization.split(" ")[1];
    const token = tokenService_1.verifyToken(encryptedToken);
    // retrieve user data
    const user = yield User_1.default.findById(token.userId);
    if (!user) {
        throw new HttpError_1.default(401, "Unauthorized - User not found");
    }
    req.user = user;
    next();
});

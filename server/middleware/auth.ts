import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

import User, { IUser } from "../models/User";
import HttpError from "../errors/HttpError";
import { verifyToken } from "../utils/tokenService";

// token will be in the Authorization header eg. Bearer <token>
export default async (req: Request, _res: Response, next: NextFunction) => {
  const authorization = req.get("Authorization");

  // no token attached
  if (!authorization || typeof authorization == "undefined") {
    // ERROR
    throw new HttpError(401, "Unauthorized");
  }

  // parse token
  const encryptedToken = authorization.split(" ")[1];
  const token = verifyToken(encryptedToken);

  // retrieve user data
  const user = await User.findById(token.userId);

  if (!user) {
    throw new HttpError(401, "Unauthorized - User not found");
  }

  req.user = user;

  next();
};

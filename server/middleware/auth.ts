import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import HttpError from "../errors/HttpError";
import { jwtKey } from "../utils/config";

// token will be in the Authorization header eg. Bearer <token>
export default (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.get("Authorization");

  // no token attached
  if (!authorization || typeof authorization == "undefined") {
    // ERROR
    throw new HttpError(401, "Unauthorized");
  }

  // parse token
  const token = authorization.split(" ")[1];
  const parsedToken = jwt.verify(token, jwtKey);

  // not authenticated
  if (!parsedToken) {
    throw new HttpError(401, "Unauthorized");
  }

  // valid token
  req.userId = (<any>parsedToken).userId;
  next();
};

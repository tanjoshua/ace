import { Request, Response } from "express";
import User from "../models/User";
import HttpError from "../errors/HttpError";
require("express-async-errors");

export const getUserDetails = async (req: Request, res: Response) => {
  const id = req.user.id;

  // get user details less password
  const user = await User.findById(id).select("-password");

  if (!user) {
    throw new HttpError(404, "User not found");
  }

  res.json(user);
};

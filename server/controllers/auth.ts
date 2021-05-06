import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/User";
import { createToken } from "../utils/tokenService";
import HttpError from "../errors/HttpError";
require("express-async-errors");

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  // reject if email already exists
  const existingUser = await User.exists({ email });
  if (existingUser) {
    throw new HttpError(403, "Email is already used");
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  // create user
  let user = new User({ name, email, password: hashedPassword });
  user = await user.save();

  const token = createToken({ userId: user.id, name: user.name });

  // save into db
  res.status(201).json({ userId: user.id, token });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // verify user
  const user = await User.findOne({ email });

  if (!user) {
    throw new HttpError(401, "Invalid credentials");
  }

  const verified = await user.verifyPassword(password);
  if (!verified) {
    throw new HttpError(401, "Invalid credentials");
  }

  // verified
  const token = createToken({ userId: user.id, name: user.name });
  res.json({ userId: user.id, token });
};

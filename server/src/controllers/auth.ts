import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { wrap } from "@mikro-orm/core";
import { v4 } from "uuid";

import { User } from "../entities/User";
import { createToken } from "../utils/tokenService";
import HttpError from "../errors/HttpError";
import { DI } from "..";
import { COOKIE_NAME } from "../utils/config";
import { sendEmail } from "../utils/emailService";
import { PasswordReset } from "../entities";

require("express-async-errors");

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  // reject if email already exists
  const existingUser = await DI.userRepository.findOne({ email });
  if (existingUser) {
    throw new HttpError(403, "Email is already used");
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  // create user
  const user = new User();
  wrap(user).assign({ name, email, password: hashedPassword });
  DI.userRepository.persistAndFlush(user);

  req.session.userId = user.id;
  const token = createToken({ userId: user.id, name: user.name });

  // save into db
  res.status(201).json({ userId: user.id, token });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // verify user
  const user = await DI.userRepository.findOne({ email });

  if (!user) {
    throw new HttpError(401, "Invalid credentials");
  }

  const verified = await bcrypt.compare(password, user.password);
  if (!verified) {
    throw new HttpError(401, "Invalid credentials");
  }

  // verified
  req.session.userId = user.id;
  const token = createToken({ userId: user.id, name: user.name });
  res.json({ userId: user.id, token });
};

export const logout = async (req: Request, res: Response) => {
  req.session.destroy((err) => {
    res.clearCookie(COOKIE_NAME);
    if (err) {
      console.log("LOGOUT ERROR: ", err);
    }
    res.json();
  });
};

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;

  // find user
  const user = await DI.userRepository.findOne({ email });
  if (!user) {
    throw new HttpError(404, "User not found");
  }

  // generate token
  const token = v4();
  await DI.passwordResetRepository.create({ token, userId: user.id });

  // send email
  const html = `<a href="http://localhost:3000/reset-password/${token}">Reset Password</a>`;
  await sendEmail(email, "Reset Password", html);
};

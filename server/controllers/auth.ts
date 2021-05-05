import { Request, Response } from "express";
import bcrypt from "bcrypt";

export const registerController = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 12);

  // save into db
  res.status(201);
};

export const loginController = (req: Request, res: Response) => {};

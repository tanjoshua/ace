import { Request, Response } from "express";

import { DI } from "../index";
import HttpError from "../errors/HttpError";
require("express-async-errors");

export const getUserDetails = async (req: Request, res: Response) => {
  const id = req.params.id;

  // get user details
  const user = await DI.userRepository.findOne(id);

  if (!user) {
    throw new HttpError(404, "User not found");
  }

  res.json({ user });
};

export const getCurrentUser = async (req: Request, res: Response) => {
  const id = req.session.userId;

  // get user details
  if (id) {
    const user = await DI.userRepository.findOne(id);

    if (!user) {
      throw new HttpError(404, "User not found");
    }

    res.json({ user });
  } else {
    res.json();
  }
};

import { User } from "../src/entities";
import { Request } from "express";

declare module "express" {
  interface Request {
    user?: User;
  }
}

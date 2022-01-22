import { Router } from "express";
import {
  getCurrentUser,
  getCurrentUserDetails,
  getUserDetails,
} from "../controllers/user";

const router = Router();

router.get("/me/details", getCurrentUserDetails);

router.get("/me", getCurrentUser);

router.get("/:id", getUserDetails);

export default router;

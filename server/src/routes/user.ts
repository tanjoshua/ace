import { Router } from "express";
import { getCurrentUser, getUserDetails } from "../controllers/user";

const router = Router();

router.get("/me", getCurrentUser);

router.get("/:id", getUserDetails);

export default router;

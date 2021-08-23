import { Router } from "express";
import { getUserDetails } from "../controllers/user";
import auth from "../middleware/auth";

const router = Router();

router.get("/", auth, getUserDetails);

export default router;

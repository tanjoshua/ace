import { Router } from "express";
import { body } from "express-validator";
import {
  getListings,
  createListing,
  getListingDetails,
  replaceListing,
  deleteListing,
} from "../controllers/listing";
import { Level } from "../entities";
import auth from "../middleware/auth";

const router = Router();

router.get("/", getListings);

router.get("/:id", getListingDetails);

router.post(
  "/",
  auth,
  [
    body("title").notEmpty().withMessage("Title is a required field"),
    body("level").isArray(),
    body("level.*").isIn(Object.values(Level)),
    body("subject").isArray(),
    body("contactInfo").isArray(),
  ],
  createListing
);

router.put("/:id", auth, replaceListing);

router.delete("/:id", auth, deleteListing);

export default router;

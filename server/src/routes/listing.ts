import { Router } from "express";
import { body } from "express-validator";
import {
  getListings,
  createListing,
  getListingDetails,
  replaceListing,
  deleteListing,
  getListingLevels,
  getListingSubjects,
  uploadListingImage,
} from "../controllers/listing";
import { Level } from "../entities";
import auth from "../middleware/auth";
import handleValidatorErrors from "../middleware/handleValidatorErrors";
import imageParser from "../middleware/imageParser";

const router = Router();

router.get("/", getListings);

router.get("/levels", getListingLevels);

router.get("/subjects", getListingSubjects);

router.get("/:id", getListingDetails);

router.post(
  "/",
  auth,
  [
    body("title").notEmpty().withMessage("Title is a required field"),
    body("level").isArray(),
    body("level.*").isIn(Object.values(Level)),
    body("subject").isArray(),
    body("contactInfo")
      .notEmpty()
      .withMessage("Contact information is required"),
    body("pricing").notEmpty().withMessage("Pricing information is required"),
  ],
  handleValidatorErrors,
  createListing
);

router.put("/:id", auth, replaceListing);

router.delete("/:id", auth, deleteListing);

router.post(
  "/:id/image",
  auth,
  imageParser.single("image"),
  uploadListingImage
);

export default router;

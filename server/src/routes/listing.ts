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
  getListingRegions,
} from "../controllers/listing";
import { Level } from "../entities";
import auth from "../middleware/auth";
import handleValidatorErrors from "../middleware/handleValidatorErrors";
import imageParser from "../middleware/imageParser";

const router = Router();

router.get("/", getListings);

router.get("/levels", getListingLevels);

router.get("/subjects", getListingSubjects);

router.get("/regions", getListingRegions);

router.get("/:id", getListingDetails);

router.post(
  "/",
  auth,
  [
    body("title").notEmpty().withMessage("Title is a required field"),
    body("name").notEmpty().withMessage("Name is a required field"),
    body("level").isArray(),
    body("level.*").isIn(Object.values(Level)),
    body("subject").isArray(),
    body("contactInfo")
      .notEmpty()
      .withMessage("Contact information is required"),
    body("online").custom((value, { req }) => {
      if (value || req.body.inPerson) {
        return true;
      } else {
        throw new Error(
          "At least one of online or in person has to be selected"
        );
      }
    }),
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

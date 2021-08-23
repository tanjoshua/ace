import { Router } from "express";
import {
  getListings,
  createListing,
  getListingDetails,
  replaceListing,
  deleteListing,
} from "../controllers/listing";
import auth from "../middleware/auth";

const router = Router();

router.get("/", auth, getListings);

router.get("/:id", auth, getListingDetails);

router.post("/", auth, createListing);

router.put("/:id", auth, replaceListing);

router.delete("/:id", auth, deleteListing);

export default router;

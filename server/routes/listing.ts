import { Router } from "express";
import {
  getListings,
  createListing,
  getListingDetails,
  replaceListing,
} from "../controllers/listing";

const router = Router();

router.get("/", getListings);

router.get("/:id", getListingDetails);

router.post("/", createListing);

router.put("/:id", replaceListing);

export default router;

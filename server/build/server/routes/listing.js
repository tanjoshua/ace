"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const listing_1 = require("../controllers/listing");
const auth_1 = __importDefault(require("../middleware/auth"));
const router = express_1.Router();
router.get("/", auth_1.default, listing_1.getListings);
router.get("/:id", auth_1.default, listing_1.getListingDetails);
router.post("/", auth_1.default, listing_1.createListing);
router.put("/:id", auth_1.default, listing_1.replaceListing);
router.delete("/:id", auth_1.default, listing_1.deleteListing);
exports.default = router;

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteListing = exports.replaceListing = exports.createListing = exports.getListingDetails = exports.getListings = void 0;
const Listing_1 = __importDefault(require("../models/Listing"));
const HttpError_1 = __importDefault(require("../errors/HttpError"));
require("express-async-errors");
const getListings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // retrieve options
    const page = req.query.page || 1;
    const limit = req.query.limit || 5;
    const result = yield Listing_1.default.paginate({}, { page: page, limit: limit });
    res.json(result);
});
exports.getListings = getListings;
const getListingDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.query;
    const listing = yield Listing_1.default.findById(id);
    res.json(listing);
});
exports.getListingDetails = getListingDetails;
const createListing = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description } = req.body;
    const listing = new Listing_1.default({ title, description });
    const result = yield listing.save();
    res.status(201).json(result);
});
exports.createListing = createListing;
const replaceListing = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.query;
    const { title, description, level, subject } = req.body;
    const listing = yield Listing_1.default.findById(id);
    if (!listing) {
        throw new HttpError_1.default(404, "Listing not found");
    }
    // check that user is owner
    if (listing.tutor.toString() !== id) {
        throw new HttpError_1.default(403, "Forbidden - User not owner");
    }
    // update fields
    listing.title = title;
    listing.description = description;
    listing.level = level;
    listing.subject = subject;
    // save
    const result = yield listing.save();
    res.json(result);
});
exports.replaceListing = replaceListing;
// export const updateListing = async (req: Request, res: Response) => {};
const deleteListing = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.query;
    const result = Listing_1.default.findByIdAndRemove(id);
    if (!result) {
        throw new HttpError_1.default(404, "Listing not found");
    }
    res.json(result);
});
exports.deleteListing = deleteListing;

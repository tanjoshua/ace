import { Request, Response } from "express";

import Listing from "../models/Listing";
import HttpError from "../errors/HttpError";
require("express-async-errors");

export const getListings = async (req: Request, res: Response) => {
  // retrieve options
  const page = req.query.page || 1;
  const limit = req.query.limit || 5;

  const result = await Listing.paginate(
    {},
    { page: <number>page, limit: <number>limit }
  );

  res.json(result);
};

export const getListingDetails = async (req: Request, res: Response) => {
  const { id } = req.query;
  const listing = await Listing.findById(id);
  res.json(listing);
};

export const createListing = async (req: Request, res: Response) => {
  const { title, description } = req.body;

  const listing = new Listing({ title, description });
  const result = await listing.save();
  res.status(201).json(result);
};

export const replaceListing = async (req: Request, res: Response) => {
  const { id } = req.query;
  const { title, description, level, subject } = req.body;

  const listing = await Listing.findById(id);

  if (!listing) {
    throw new HttpError(404, "Listing not found");
  }

  // check that user is owner
  if (listing.tutor.toString() !== id) {
    throw new HttpError(403, "Forbidden - User not owner");
  }

  // update fields
  listing.title = title;
  listing.description = description;
  listing.level = level;
  listing.subject = subject;

  // save
  const result = await listing.save();
  res.json(result);
};

// export const updateListing = async (req: Request, res: Response) => {};

export const deleteListing = async (req: Request, res: Response) => {
  const { id } = req.query;

  const result = Listing.findByIdAndRemove(id);

  if (!result) {
    throw new HttpError(404, "Listing not found");
  }

  res.json(result);
};

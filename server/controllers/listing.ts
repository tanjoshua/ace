import { Request, Response } from "express";

import Listing from "../models/Listing";
import HttpError from "../errors/HttpError";
require("express-async-errors");

const DOCS_PER_PAGE = 5;

export const getListings = async (req: Request, res: Response) => {
  const page = req.query.page || 1;

  const result = await Listing.paginate(
    {},
    { page: <number>page, limit: DOCS_PER_PAGE }
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
  const { title, description } = req.body;

  const listing = await Listing.findOneAndReplace(
    { _id: id },
    { title, description }
  );

  if (!listing) {
    throw new HttpError(404, "Listing not found");
  }

  const result = await listing.save();
  res.json(result);
};

// export const updateListing = async (req: Request, res: Response) => {};

// export const deleteListing = async (req: Request, res: Response) => {};

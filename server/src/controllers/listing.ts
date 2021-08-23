import { Request, Response } from "express";
import { wrap } from "@mikro-orm/core";

import { DI } from "../index";
import { Listing } from "../entities/Listing";
import HttpError from "../errors/HttpError";

require("express-async-errors");

export const getListings = async (req: Request, res: Response) => {
  // retrieve options
  const page = req.query.page || 1;
  const limit = req.query.limit || 5;

  const [listings, count] = await DI.listingRepository.findAndCount(
    {},
    { offset: (+page - 1) * +limit, limit: +limit }
  );

  res.json({ listings, count });
};

export const getListingDetails = async (req: Request, res: Response) => {
  const { id } = req.params;
  const listing = await DI.listingRepository.findOne(id);
  res.json(listing);
};

export const createListing = async (req: Request, res: Response) => {
  const { title, description } = req.body;

  const listing = new Listing();
  wrap(listing).assign({ title, description, tutor: req.session.userId });
  await DI.listingRepository.persistAndFlush(listing);
  res.status(201).json(listing);
};

export const replaceListing = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description } = req.body;

  const listing = await DI.listingRepository.findOne(id);

  if (!listing) {
    throw new HttpError(404, "Listing not found");
  }

  // check that user is owner
  if (listing.tutor.toString() !== id) {
    throw new HttpError(403, "Forbidden - User not owner");
  }

  // update fields
  wrap(listing).assign({ title, description });

  // save
  await DI.listingRepository.flush();
  res.json(listing);
};

// export const updateListing = async (req: Request, res: Response) => {};

export const deleteListing = async (req: Request, res: Response) => {
  const { id } = req.params;

  const listing = DI.listingRepository.findOne(id);

  if (!listing) {
    throw new HttpError(404, "Listing not found");
  }

  await DI.listingRepository.removeAndFlush(listing);

  res.json(listing);
};

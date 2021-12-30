import { Request, Response } from "express";
import { QueryOrder, wrap } from "@mikro-orm/core";

import { DI } from "../index";
import { Listing, Level, subjects } from "../entities/Listing";
import HttpError from "../errors/HttpError";

require("express-async-errors");

export const getListings = async (req: Request, res: Response) => {
  // retrieve options
  const page = req.query.page || 1;
  const limit = req.query.limit || 5;

  const [listings, count] = await DI.listingRepository.findAndCount(
    {},
    {
      offset: (+page - 1) * +limit,
      limit: +limit,
      orderBy: { createdAt: QueryOrder.DESC },
      populate: ["tutor"],
    }
  );

  // keep only relevant info for tutor
  const listingsResult = listings.map((listing) => ({
    ...wrap(listing).toObject(),
    tutor: {
      name: listing.tutor.name,
      id: listing.tutor.id,
    },
  }));

  res.json({ listings: listingsResult, count });
};

export const getListingDetails = async (req: Request, res: Response) => {
  const { id } = req.params;
  const listing = await DI.listingRepository.findOne(id);
  res.json(listing);
};

export const createListing = async (req: Request, res: Response) => {
  // create listing
  const listing = new Listing();
  listing.tutor = req.user!;
  wrap(listing).assign(req.body);
  await DI.listingRepository.persistAndFlush(listing);
  res.status(201).json(listing);
};

export const replaceListing = async (req: Request, res: Response) => {
  const { id } = req.params;

  const listing = await DI.listingRepository.findOne(id);

  if (!listing) {
    throw new HttpError(404, "Listing not found");
  }

  // check that user is owner
  if (listing.tutor.id !== req.session.userId) {
    throw new HttpError(403, "Forbidden - User not owner");
  }

  // update fields
  wrap(listing).assign(req.body);

  // save
  await DI.listingRepository.flush();
  res.json(listing);
};

// export const updateListing = async (req: Request, res: Response) => {};

export const deleteListing = async (req: Request, res: Response) => {
  const { id } = req.params;

  const listing = await DI.listingRepository.findOne(id);

  if (!listing) {
    throw new HttpError(404, "Listing not found");
  }

  // check that user is owner
  if (listing.tutor.id !== req.session.userId) {
    throw new HttpError(403, "Forbidden - User not owner");
  }

  await DI.listingRepository.removeAndFlush(listing);

  res.json(listing);
};

export const getListingLevels = async (_req: Request, res: Response) => {
  res.json({
    levels: Object.values(Level),
  });
};

export const getListingSubjects = async (_req: Request, res: Response) => {
  res.json({
    subjects,
  });
};

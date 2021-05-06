import { Request, Response } from "express";

import Listing from "../models/Listing";
// import HttpError from "../errors/HttpError";
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

// export const getListingDetails = async (req: Request, res: Response) => {};

// export const createListing = async (req: Request, res: Response) => {};

// export const replaceListing = async (req: Request, res: Response) => {};

// export const updateListing = async (req: Request, res: Response) => {};

// export const deleteListing = async (req: Request, res: Response) => {};

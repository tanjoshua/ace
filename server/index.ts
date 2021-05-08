import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import cors from "cors";
import { PORT, MDB_KEY } from "./utils/config";

import authRoutes from "./routes/auth";
import listingRoutes from "./routes/listing";
import userRoutes from "./routes/user";
import HttpError from "./errors/HttpError";

const app = express();

// serve frontend
app.use(express.static("build/client"));

// body parser for json
app.use(express.json());

// cors
app.use(cors());

// health check
app.get("/health", (_req, res) => {
  res.send("ok");
});

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/listing", listingRoutes);
app.use("/api/user", userRoutes);

// 404 route not found
app.use((_req, res, _next) => {
  res.status(404).send("Route not found");
});

// error handler
app.use((err: HttpError, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || 500;
  const message = err.message;

  res.status(status).json({ message });
});

// start server
mongoose
  .connect(MDB_KEY, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT || 3000, () => {
      console.log(`Server running on port ${PORT || 3000}`);
    });
  });

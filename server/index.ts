import express, { Request, Response, NextFunction } from "express";
import { MikroORM } from "@mikro-orm/core";
import cors from "cors";
import { PORT, MDB_KEY, __prod__ } from "./utils/config";

import { User, Listing } from "./entities";
import authRoutes from "./routes/auth";
import listingRoutes from "./routes/listing";
import userRoutes from "./routes/user";
import HttpError from "./errors/HttpError";

const main = async () => {
  await MikroORM.init({
    entities: [User, Listing],
    clientUrl: MDB_KEY,
    type: "mongo",
    debug: !__prod__,
  });

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
  app.use(
    (err: HttpError, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || 500;
      const message = err.message;

      res.status(status).json({ message });
    }
  );

  // start server
  app.listen(PORT || 3000, () => {
    console.log(`Server running on port ${PORT || 3000}`);
  });
};

main();

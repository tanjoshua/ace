import express, { Request, Response, NextFunction } from "express";
import {
  MikroORM,
  EntityManager,
  EntityRepository,
  RequestContext,
  ReflectMetadataProvider,
} from "@mikro-orm/core";
import cors from "cors";
import session from "express-session";
import connectMongo from "connect-mongodb-session";
const MongoDBStore = connectMongo(session);

import { PORT, MDB_KEY, __prod__, SESSION_SECRET } from "./utils/config";
import { User, Listing } from "./entities";
import authRoutes from "./routes/auth";
import listingRoutes from "./routes/listing";
import userRoutes from "./routes/user";
import HttpError from "./errors/HttpError";

const app = express();
const store = new MongoDBStore({
  uri: MDB_KEY,
  collection: "sessions",
});
export const DI = {} as {
  orm: MikroORM;
  em: EntityManager;
  userRepository: EntityRepository<User>;
  listingRepository: EntityRepository<Listing>;
};

const main = async () => {
  // setup ORM
  DI.orm = await MikroORM.init({
    entities: [User, Listing],
    clientUrl: MDB_KEY,
    type: "mongo",
    debug: !__prod__,
    metadataProvider: ReflectMetadataProvider,
  });
  DI.em = DI.orm.em;
  DI.userRepository = DI.orm.em.getRepository(User);
  DI.listingRepository = DI.orm.em.getRepository(Listing);

  // serve frontend
  app.use(express.static("build/client"));
  // body parser for json
  app.use(express.json());
  // cors
  app.use(cors());

  app.use(
    session({
      secret: SESSION_SECRET,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true,
        secure: __prod__,
        sameSite: "lax",
      },
      store: store,
      resave: false,
      saveUninitialized: false,
    })
  );

  app.use((_req, _res, next) => RequestContext.create(DI.orm.em, next));

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

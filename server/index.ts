import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { PORT, MDB_KEY } from "./utils/config";

const app = express();

// body parser for json
app.use(express.json());

// cors
app.use(cors());

// health check
app.get("/health", (_req, res) => {
  res.send("ok");
});

// ROUTES
app.use("/api/auth", require("./routes/auth"));

// 404 route not found
app.use("/", (_req, res, _next) => {
  res.status(404).send("Route not found");
});

// start server
mongoose
  .connect(MDB_KEY, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  });

import express = require("express");
import cors = require("cors");

const PORT = process.env.PORT || 3000;

const app = express();

// body parser for json
app.use(express.json());

// cors
app.use(cors());

// health check
app.get("/health", (_req, res) => {
  res.send("ok");
});

// 404 route not found
app.use("/", (_req, res, _next) => {
  res.status(404).send("Route not found");
});

// start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const config_1 = require("./utils/config");
const auth_1 = __importDefault(require("./routes/auth"));
const listing_1 = __importDefault(require("./routes/listing"));
const user_1 = __importDefault(require("./routes/user"));
const app = express_1.default();
// serve frontend
app.use(express_1.default.static("build/client"));
// body parser for json
app.use(express_1.default.json());
// cors
app.use(cors_1.default());
// health check
app.get("/health", (_req, res) => {
    res.send("ok");
});
// ROUTES
app.use("/api/auth", auth_1.default);
app.use("/api/listing", listing_1.default);
app.use("/api/user", user_1.default);
// 404 route not found
app.use((_req, res, _next) => {
    res.status(404).send("Route not found");
});
// error handler
app.use((err, _req, res, _next) => {
    const status = err.status || 500;
    const message = err.message;
    res.status(status).json({ message });
});
// start server
mongoose_1.default
    .connect(config_1.MDB_KEY, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
    app.listen(config_1.PORT || 3000, () => {
        console.log(`Server running on port ${config_1.PORT || 3000}`);
    });
});

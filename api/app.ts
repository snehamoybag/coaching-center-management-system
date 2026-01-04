import "dotenv/config";
import express, { json, urlencoded } from "express";
import errorRequestHandler from "./middlewares/error-request-handler.middleware";
import requeset404Handler from "./middlewares/error-404-handler.middleware";
import v1Router from "./routes/v1";

import "./configs/passport"; // intialize passport auth strategies

const app = express();

// PARSERS
app.use(urlencoded({ extended: true }));
app.use(json());

// ROUTES
app.use("/api/v1", v1Router);

// ERROR HANDLER MIDDLEWARE
app.use(errorRequestHandler);

// 404 HANDLER
app.use(requeset404Handler);

// SERVER
const PORT = Number(process.env.server_port) || 3000;
const HOST = process.env.server_host || "localhost";

app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});

import express, { json, urlencoded } from "express";

const app = express();

// PARSERS
app.use(urlencoded({ extended: true }));
app.use(json());

// SERVER
const PORT = Number(process.env.server_port) || 3000;
const HOST = process.env.server_host || "localhost";

app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});

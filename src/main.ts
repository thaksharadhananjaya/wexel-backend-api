import express from "express";
import { Routes } from "./routes";
import ENVIRONMENT from "./config/environment";

const app = express();

app.use(express.json());
app.use("/api/v1/", Routes.routes);

const { HOST, PORT } = ENVIRONMENT;

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});

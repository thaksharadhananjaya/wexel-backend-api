import express from "express";
import { Routes } from "./routes";
import ENVIRONMENT from "./config/environment";
import globalErrorHandler from "./middleware/global-error-handler";

const app = express();

app.use(express.json());
app.use("/api/v1/", Routes.routes);
// Global error handling middleware
app.use(globalErrorHandler);

const { HOST, PORT } = ENVIRONMENT;

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});

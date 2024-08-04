import ENVIRONMENT from './config/environment';
import globalErrorHandler from './middlewares/global-error-handler.middleware';
import { httpResponse } from './middlewares/http-response.middleware';
import { RegisterRoutes } from '../build/generated/routes';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import * as swaggerJson from "../build/generated/swagger.json";

const app = express();

app.use(express.json());
app.use(httpResponse);
app.use(
    '/api/docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerJson)
);

RegisterRoutes(app);
// Global error handling middleware
app.use(globalErrorHandler);

const { HOST, PORT } = ENVIRONMENT;

app.listen(PORT, HOST, () => {
    console.log(`Server running at http://${HOST}:${PORT}`);
});

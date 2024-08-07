import { RegisterRoutes } from '../build/generated/routes';
import * as swaggerJson from '../build/generated/swagger.json';
import ENVIRONMENT from './config/environment';
import globalErrorHandler from './middlewares/global-error-handler.middleware';
import { httpResponse } from './middlewares/http-response.middleware';
import cors from 'cors';
import express from 'express';
import swaggerUi from 'swagger-ui-express';

const app = express();

app.use(express.json());
app.use(httpResponse);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerJson));

RegisterRoutes(app);
// Global error handling middleware
app.use(globalErrorHandler);

// Use CORS middleware
app.use(cors());

const { HOST, PORT } = ENVIRONMENT;

app.listen(PORT, HOST, () => {
    console.log(`Server running at http://${HOST}:${PORT}`);
});

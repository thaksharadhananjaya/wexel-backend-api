import ENVIRONMENT from './config/environment';
import globalErrorHandler from './middlewares/global-error-handler.middleware';
import { httpResponse } from './middlewares/http-response.middleware';
import { Routes } from './routes';
import express from 'express';

const app = express();

app.use(express.json());
app.use(httpResponse);
app.use('/api/v1/', Routes.routes);
// Global error handling middleware
app.use(globalErrorHandler);

const { HOST, PORT } = ENVIRONMENT;

app.listen(PORT, HOST, () => {
    console.log(`Server running at http://${HOST}:${PORT}`);
});

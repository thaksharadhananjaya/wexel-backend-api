/**
 * .env file related keys are defined here
 */
import dotenv from 'dotenv';

dotenv.config();

// =========================================================
type Environment = {
    HOST: string;
    PORT: number;
};
// =========================================================

const ENVIRONMENT: Environment = {
    HOST: process.env.HOST || 'localhost',
    PORT: +process.env.PORT || 3000,
};
//
export default ENVIRONMENT;

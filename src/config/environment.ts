/**
 * .env file related keys are defined here
 */
import dotenv from 'dotenv';

dotenv.config();

// =========================================================
type Environment = {
    HOST: string;
    PORT: number;
    JWK_URL: string;
    ISSUER: string;
};
// =========================================================

const ENVIRONMENT: Environment = {
    HOST: process.env.HOST || 'localhost',
    PORT: +process.env.PORT || 3000,
    JWK_URL: process.env.JWK_URL,
    ISSUER: process.env.ISSUER,
};
//
export default ENVIRONMENT;

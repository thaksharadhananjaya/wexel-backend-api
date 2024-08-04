/**
 * @file auth-token-validation.ts
 *
 * This file contains functions to validate JSON Web Tokens (JWT) using JSON Web Key Sets (JWKS)
 * retrieved from AWS Cognito. The `validateToken` function verifies the provided JWT token by
 * fetching the appropriate signing key from the JWKS endpoint. If the token is valid, the function
 * resolves with the decoded token; otherwise, it rejects with an `UnauthorizedException`.
 *
 * Dependencies:
 * - jsonwebtoken: Library to handle JWT operations.
 * - jwks-rsa: Client library to retrieve signing keys from a JWKS endpoint.
 * - UnauthorizedException: Custom exception to handle unauthorized access scenarios.
 *
 * Functions:
 * - getKey: Retrieves the signing key for a given JWT header.
 * - validateToken: Validates a JWT token using the JWKS retrieved from the specified URI.
 */
import ENVIRONMENT from '../config/environment';
import { UnauthorizedException } from '../exceptions/unauthenticated-exception';
import jwt, { JwtHeader, SigningKeyCallback } from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';

const client = jwksClient({
    jwksUri: ENVIRONMENT.JWK_URL,
    cache: true,
});

/**
 * Retrieves the signing key for a given JWT header.
 *
 * @param {JwtHeader} header - The JWT header containing the key ID (kid).
 * @param {SigningKeyCallback} callback - The callback to call with the signing key or an error.
 * @returns {void}
 */
const getKey = (header: JwtHeader, callback: SigningKeyCallback) => {
    return client.getSigningKey(header.kid as string, (error, key) => {
        if (error) {
            callback(error, undefined);
        } else {
            const signingKey = key?.getPublicKey();
            callback(null, signingKey);
        }
    });
};

/**
 * Validates a JWT token using the JWKS retrieved from the specified URI.
 *
 * @param {string} token - The JWT token to validate.
 * @returns {Promise<object>} A promise that resolves to the decoded token if valid, or rejects with an UnauthorizedException if invalid.
 */
export const validateToken = (token: string) => {
    return new Promise((resolve, reject) => {
        jwt.verify(
            token,
            getKey,
            {
                audience: false,
                issuer: ENVIRONMENT.ISSUER,
            },
            (error, decoded) => {
                if (error) {
                    reject(new UnauthorizedException("Unauthorized request"));
                } else {
                    resolve(decoded);
                }
            }
        );
    });
};

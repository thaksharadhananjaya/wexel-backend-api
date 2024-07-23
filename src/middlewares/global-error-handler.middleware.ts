// src/middleware/globalErrorHandler.ts
import { BaseException } from '../exceptions/base-exception';
import { NextFunction, Request, Response } from 'express';

const globalErrorHandler = (
    err: BaseException,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { status, statusCode, message } = err;

    res.status(err.statusCode).json({
        status,
        statusCode,
        error: { message },
    });
};

export default globalErrorHandler;

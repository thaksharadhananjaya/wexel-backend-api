// src/middleware/globalErrorHandler.ts
import { Request, Response, NextFunction } from "express";
import { BaseException } from "../exceptions/base-exception";

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

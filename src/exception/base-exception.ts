export class BaseException extends Error {
  public readonly statusCode: number;
  public readonly status: string;

  constructor(message: string, error: string, statusCode: number) {
    super(message);

    this.statusCode = statusCode;
    this.status = error;

    Error.captureStackTrace(this, this.constructor);
  }
}

import { Request, Response, NextFunction } from "express";

export function httpResponse(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const oldJson = res.json;

  res.json = function (data: any) {
    const transformedData =
      res.statusCode > 399
        ? data
        : {
            status: "SUCCESS",
            statusCode: res.statusCode,
            data,
          };
    return oldJson.call(this, transformedData); // Ensure we return the response object
  };

  next();
}

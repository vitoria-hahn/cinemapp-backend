import jwt from "jsonwebtoken";
import { Request, NextFunction, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const authenticateJWT = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const secretKey = process.env.JWT_SECRET;
  if (!secretKey) {
    return {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      message: `secret key not provided`,
      return: null,
    };
  }
  const token = request.headers.authorization?.slice(7);

  if (token) {
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        response.status(StatusCodes.BAD_REQUEST).json({ error: err });
      }
      (request as any).user = user;
      next();
    });
  }
  response.status(StatusCodes.UNAUTHORIZED).json({ error: "please, login" });
};

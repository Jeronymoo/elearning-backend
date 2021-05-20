import authConfig from "@config/auth";
import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import AppError from "@shared/errors/AppError";

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("JWT token is missing.", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    verify(token, authConfig.jwt.secret);

    return next();
  } catch (err) {
    throw new AppError("Invalid JWT token", 401);
  }
}

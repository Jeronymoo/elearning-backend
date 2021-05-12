import "express-async-errors";
import uploadConfig from "@config/upload";
import cors from "cors";
import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";

import AppError from "@shared/errors/AppError";
import rateLimiter from "@shared/infra/http/middlewares/rateLimiter";

import routes from "./routes/index";

import "@shared/infra/typeorm";

const port = 3333;
const app = express();
app.use(rateLimiter);
app.use(express.json());
app.use(cors());
app.use("/files", express.static(uploadConfig.directory));
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  console.error(err);

  return response.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});

app.get("/", (request, response) => {
  response.json({ message: "Hello, world" });
});

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});

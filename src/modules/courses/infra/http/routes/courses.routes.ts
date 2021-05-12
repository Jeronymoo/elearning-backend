import uploadConfig from "@config/upload";
import { Router } from "express";
import multer from "multer";

import ensureAuthenticated from "@shared/infra/http/middlewares/ensureAuthenticated";

import CoursesController from "../controllers/CoursesController";

const coursesRouter = Router();
const upload = multer(uploadConfig);
const coursesController = new CoursesController();

coursesRouter.get("/", coursesController.show);

coursesRouter.get("/:id/lessons", coursesController.showLessons);

coursesRouter.post(
  "/",
  ensureAuthenticated,
  upload.single("image"),
  coursesController.create
);

coursesRouter.put(
  "/:id",
  ensureAuthenticated,
  upload.single("image"),
  coursesController.update
);

coursesRouter.delete("/:id", ensureAuthenticated, coursesController.delete);

export default coursesRouter;

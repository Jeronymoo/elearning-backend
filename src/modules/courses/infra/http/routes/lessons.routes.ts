import { Router } from "express";

import ensureAuthenticated from "@shared/infra/http/middlewares/ensureAuthenticated";

import LessonsController from "../controllers/LessonsController";

const lessonsRouter = Router();
const lessonsController = new LessonsController();

lessonsRouter.post("/", ensureAuthenticated, lessonsController.create);

lessonsRouter.put("/:id", ensureAuthenticated, lessonsController.update);

lessonsRouter.delete("/:id", ensureAuthenticated, lessonsController.delete);

export default lessonsRouter;

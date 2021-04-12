import { getRepository } from "typeorm";

import AppError from "@shared/errors/AppError";

import Lessons from "../infra/typeorm/entities/Lessons";

class DeleteLessonService {
  public async execute(id: string): Promise<void> {
    const lessonsRepository = getRepository(Lessons);

    const course = await lessonsRepository.findOne(id);

    if (!course) {
      throw new AppError("This lesson id doesn't exist.");
    }

    await lessonsRepository.delete(id);
  }
}

export default DeleteLessonService;

import { getRepository } from "typeorm";

import AppError from "@shared/errors/AppError";

import Courses from "../infra/typeorm/entities/Courses";

class DeleteCourseService {
  public async execute(id: string): Promise<void> {
    const coursesRepository = getRepository(Courses);

    const course = await coursesRepository.findOne(id);

    if (!course) {
      throw new AppError("This course id doesn't exist.");
    }

    await coursesRepository.delete(id);
  }
}

export default DeleteCourseService;

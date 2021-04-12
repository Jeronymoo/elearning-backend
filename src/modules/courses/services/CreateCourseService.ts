import { getRepository } from "typeorm";

import AppError from "@shared/errors/AppError";

import Courses from "../infra/typeorm/entities/Courses";

interface Request {
  name: string;
  filename: string;
}

class CreateCourseService {
  public async execute({ name, filename }: Request): Promise<Courses> {
    const courseRepository = getRepository(Courses);

    const nameExists = await courseRepository.findOne({ where: { name } });

    if (nameExists) {
      throw new AppError("Course name already exists.");
    }

    const course = courseRepository.create({
      name,
      image_path: filename,
    });

    await courseRepository.save(course);

    return course;
  }
}

export default CreateCourseService;

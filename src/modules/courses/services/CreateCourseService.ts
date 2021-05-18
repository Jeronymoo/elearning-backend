import { getRepository } from "typeorm";

import AppError from "@shared/errors/AppError";
import RedisCacheProvider from "@shared/providers/CacheProvider/RedisCacheProvider";

import Courses from "../infra/typeorm/entities/Courses";

interface IRequest {
  name: string;
  filename: string;
}

class CreateCourseService {
  public async execute({ name, filename }: IRequest): Promise<Courses> {
    const courseRepository = getRepository(Courses);
    const redisCache = RedisCacheProvider.getInstance();

    const nameExists = await courseRepository.findOne({ where: { name } });

    if (nameExists) {
      throw new AppError("Course name already exists.");
    }

    const course = courseRepository.create({
      name,
      image_path: filename,
    });

    await courseRepository.save(course);

    redisCache.invalidate("courses-list");

    return course;
  }
}

export default CreateCourseService;

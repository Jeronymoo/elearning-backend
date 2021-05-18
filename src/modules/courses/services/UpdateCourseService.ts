import uploadConfig from "@config/upload";
import fs from "fs";
import path from "path";
import { getRepository } from "typeorm";

import AppError from "@shared/errors/AppError";
import RedisCacheProvider from "@shared/providers/CacheProvider/RedisCacheProvider";

import Courses from "../infra/typeorm/entities/Courses";

interface IRequest {
  course_id: string;
  name: string;
  filename: string;
}

class CreateCourseService {
  public async execute({
    course_id,
    name,
    filename,
  }: IRequest): Promise<Courses> {
    const courseRepository = getRepository(Courses);
    const redisCache = RedisCacheProvider.getInstance();

    const course = await courseRepository.findOne(course_id);

    if (!course) {
      throw new AppError("Course doesn't exists. Try other id.");
    }

    if (course.image_path) {
      const courseImagePath = path.join(
        uploadConfig.directory,
        course.image_path
      );

      await fs.promises.unlink(courseImagePath);
    }

    if (filename === undefined) {
      course.name = name;
      console.log("Teste");
    } else {
      course.name = name;

      course.image_path = filename;
    }

    await redisCache.invalidate("courses-list");

    await courseRepository.save(course);

    return course;
  }
}

export default CreateCourseService;

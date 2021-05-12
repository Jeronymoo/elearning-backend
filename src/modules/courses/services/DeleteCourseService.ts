import UploadConfig from "@config/upload";
import fs from "fs";
import path from "path";
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

    const filePath = path.resolve(UploadConfig.directory, course.image_path);

    fs.unlink(filePath, (err) => {
      console.log(err);
    });

    await coursesRepository.delete(id);
  }
}

export default DeleteCourseService;

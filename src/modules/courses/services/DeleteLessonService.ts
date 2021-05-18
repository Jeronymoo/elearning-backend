import { getRepository } from "typeorm";

import AppError from "@shared/errors/AppError";
import RedisCacheProvider from "@shared/providers/CacheProvider/RedisCacheProvider";

import Lessons from "../infra/typeorm/entities/Lessons";

class DeleteLessonService {
  public async execute(id: string): Promise<void> {
    const lessonsRepository = getRepository(Lessons);
    const redisCache = RedisCacheProvider.getInstance();

    const course = await lessonsRepository.findOne(id);

    if (!course) {
      throw new AppError("This lesson id doesn't exist.");
    }

    await redisCache.invalidate(`lessons-list-${course.course_id}`);

    await lessonsRepository.delete(id);
  }
}

export default DeleteLessonService;

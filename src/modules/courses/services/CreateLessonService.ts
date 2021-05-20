import { getRepository } from "typeorm";

import AppError from "@shared/errors/AppError";
import RedisCacheProvider from "@shared/providers/CacheProvider/RedisCacheProvider";

import Lessons from "../infra/typeorm/entities/Lessons";

interface IRequest {
  name: string;
  duration: string;
  course_id: string;
  description: string;
  video_id: string;
}

class CreateLessonService {
  public async execute({
    name,
    duration,
    course_id,
    description,
    video_id,
  }: IRequest): Promise<Lessons> {
    const lessonRepository = getRepository(Lessons);
    const redisCache = RedisCacheProvider.getInstance();

    const videoExists = await lessonRepository.findOne({ where: { video_id } });

    if (videoExists) {
      throw new AppError("A lesson with this video already exists.");
    }

    const lesson = lessonRepository.create({
      name,
      duration,
      course_id,
      description,
      video_id,
    });

    await lessonRepository.save(lesson);

    await redisCache.invalidate(`lessons-list-${course_id}`);
    await redisCache.invalidate("courses-list");

    return lesson;
  }
}

export default CreateLessonService;

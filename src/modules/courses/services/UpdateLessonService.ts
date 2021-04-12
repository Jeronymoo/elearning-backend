import { getRepository } from "typeorm";

import AppError from "@shared/errors/AppError";

import Lessons from "../infra/typeorm/entities/Lessons";

interface Request {
  id: string;
  name: string;
  duration: string;
  course_id: string;
  description: string;
  video_id: string;
}

class CreateLessonService {
  public async execute({
    id,
    name,
    duration,
    course_id,
    description,
    video_id,
  }: Request): Promise<Lessons> {
    const lessonRepository = getRepository(Lessons);

    const lesson = await lessonRepository.findOne({ where: { id } });

    if (!lesson) {
      throw new AppError("This lesson doesn't exist. Try it again.");
    }

    lesson.name = name;
    lesson.duration = duration;
    lesson.course_id = course_id;
    lesson.description = description;
    lesson.video_id = video_id;

    await lessonRepository.save(lesson);

    return lesson;
  }
}

export default CreateLessonService;

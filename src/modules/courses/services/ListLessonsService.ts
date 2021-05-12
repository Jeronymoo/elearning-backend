import { getRepository } from "typeorm";

import RedisCacheProvider from "@shared/providers/CacheProvider/RedisCacheProvider";

import Lessons from "../infra/typeorm/entities/Lessons";

class ListLessonsService {
  public async execute(course_id: string): Promise<Lessons[]> {
    const lessonsRepository = getRepository(Lessons);
    const redisCache = new RedisCacheProvider();

    const lessons = await lessonsRepository.find({ where: { course_id } });

    return lessons;
  }
}

export default ListLessonsService;

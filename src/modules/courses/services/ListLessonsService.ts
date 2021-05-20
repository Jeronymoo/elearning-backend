import { getRepository } from "typeorm";

import RedisCacheProvider from "@shared/providers/CacheProvider/RedisCacheProvider";

import Lessons from "../infra/typeorm/entities/Lessons";

class ListLessonsService {
  public async execute(course_id: string): Promise<Lessons[]> {
    const lessonsRepository = getRepository(Lessons);
    const redisCache = RedisCacheProvider.getInstance();

    let lessons = await redisCache.recover<Lessons[]>(
      `lessons-list-${course_id}`
    );

    if (!lessons) {
      lessons = await lessonsRepository.find({ where: { course_id } });

      await redisCache.save(`lessons-list-${course_id}`, lessons);
    }

    return lessons;
  }
}

export default ListLessonsService;

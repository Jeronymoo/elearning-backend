import { getRepository } from "typeorm";

import RedisCacheProvider from "@shared/providers/CacheProvider/RedisCacheProvider";

import Courses from "../infra/typeorm/entities/Courses";

class ListCoursesService {
  public async execute(): Promise<Courses[]> {
    const courseRepository = getRepository(Courses);
    const redisCache = RedisCacheProvider.getInstance();

    let courses = await redisCache.recover<Courses[]>("courses-list");

    if (!courses) {
      courses = await courseRepository.find({
        relations: ["lessons"],
      });

      await redisCache.save("courses-list", courses);
    }

    return courses;
  }
}

export default ListCoursesService;

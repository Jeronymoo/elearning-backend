import { getRepository } from "typeorm";

import Lessons from "../infra/typeorm/entities/Lessons";

class ListLessonsService {
  public async execute(course_id: string): Promise<Lessons[]> {
    const lessonsRepository = getRepository(Lessons);

    const lessons = lessonsRepository.find({ where: { course_id } });

    return lessons;
  }
}

export default ListLessonsService;

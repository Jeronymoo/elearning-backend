import { getRepository } from "typeorm";

import Courses from "../infra/typeorm/entities/Courses";

class ListCoursesService {
  public async execute(): Promise<Courses[]> {
    const courseRepository = getRepository(Courses);

    const courses = courseRepository.find();

    return courses;
  }
}

export default ListCoursesService;

import CreateCourseService from "@modules/courses/services/CreateCourseService";
import DeleteCourseService from "@modules/courses/services/DeleteCourseService";
import ListCoursesService from "@modules/courses/services/ListCoursesService";
import UpdateCourseService from "@modules/courses/services/UpdateCourseService";
import { Request, Response } from "express";

export default class CoursesController {
  public async show(request: Request, response: Response): Promise<Response> {
    const listCourse = new ListCoursesService();

    const course = await listCourse.execute();

    return response.json(course);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;
    const { filename } = request.file;

    const createCourse = new CreateCourseService();

    const course = await createCourse.execute({ name, filename });

    return response.json(course);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name } = request.body;
    const { filename } = request.file;

    const updateCourse = new UpdateCourseService();

    const course = await updateCourse.execute({
      course_id: id,
      name,
      filename,
    });

    return response.json(course);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteCourse = new DeleteCourseService();

    await deleteCourse.execute(id);

    return response.json();
  }
}

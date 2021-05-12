import CreateLessonService from "@modules/courses/services/CreateLessonService";
import DeleteLessonService from "@modules/courses/services/DeleteLessonService";
import UpdateLessonService from "@modules/courses/services/UpdateLessonService";
import { Request, Response } from "express";

export default class CoursesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, course_id, description, duration, video_id } = request.body;

    const createLesson = new CreateLessonService();

    const lesson = await createLesson.execute({
      name,
      course_id,
      description,
      duration,
      video_id,
    });

    return response.json(lesson);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, course_id, description, duration, video_id } = request.body;

    const updateLesson = new UpdateLessonService();

    const lesson = await updateLesson.execute({
      id,
      name,
      course_id,
      description,
      duration,
      video_id,
    });

    return response.json(lesson);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteLesson = new DeleteLessonService();

    await deleteLesson.execute(id);

    return response.json();
  }
}

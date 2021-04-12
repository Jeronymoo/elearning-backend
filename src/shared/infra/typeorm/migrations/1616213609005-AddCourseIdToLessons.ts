import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export class AddCourseIdToLessons1616213609005 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "lessons",
      new TableColumn({
        name: "course_id",
        type: "uuid",
        isNullable: true,
      })
    );

    await queryRunner.createForeignKey(
      "lessons",
      new TableForeignKey({
        columnNames: ["course_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "courses",
        name: "LessonCourse",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("lessons", "LessonCourse");
    await queryRunner.dropColumn("lessons", "course_id");
  }
}

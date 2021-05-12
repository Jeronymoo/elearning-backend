import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from "typeorm";

import Lessons from "./Lessons";

@Entity("courses")
class Courses {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  image_path: string;

  @OneToMany(() => Lessons, (lessons) => lessons.course)
  lessons: Lessons[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Courses;

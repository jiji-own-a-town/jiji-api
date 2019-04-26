import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne,
  OneToMany,
  ManyToOne,
  Index
} from "typeorm";

import { User } from "./user";

@Entity({ name: "roles" })
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ select: true })
  @Index("role-idx", { unique: true })
  role: string;

  @OneToMany(type => User, user => user.role)
  users: User[];
}

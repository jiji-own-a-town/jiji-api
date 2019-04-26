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

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  first_name: string;

  @Column({ nullable: true })
  last_name: string;

  @Column()
  @Index("email-idx", { unique: true, nullable: false })
  email: string;

  @Column({ select: true })
  password: string;

  @ManyToOne(type => Role, role => role.users)
  @JoinColumn({ name: "role_id" })
  role: Role;

  @Column({ default: () => "1" })
  active: number;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  updated_time: string;

  @Column({ type: "datetime" })
  created_at: string;

  @Column({ nullable: true })
  phone: string;

  //Uses user resolver
  accessToken: string;

  @OneToOne(type => UserToken, userToken => userToken.user)
  userToken: UserToken;
}

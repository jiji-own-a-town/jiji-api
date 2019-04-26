import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn
} from "typeorm";
import { User } from "./user";

@Entity({ name: "userTokens" })
export class UserToken {
  @PrimaryGeneratedColumn({ name: "token_id" })
  id: number;

  @OneToOne(type => User, user => user.userToken)
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column({ length: 500 })
  token: string;

  @Column({
    name: "given_date",
    type: "datetime",
    default: () => "CURRENT_TIMESTAMP"
  })
  givenDate: string;

  @Column({ name: "expire_date", type: "datetime", nullable: true })
  expireDate: string;
}

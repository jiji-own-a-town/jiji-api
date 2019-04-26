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

import { Media } from "./media";
import { User } from "./user";

@Entity({ name: "media_items" })
export class MediaItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index("mediaitem-idx", { unique: true })
  path: string;

  @Column()
  extension: string;

  @Column()
  size: string;

  @ManyToOne(type => Media, media => media.mediaItems)
  @JoinColumn({ name: "media_id" })
  media: Media;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  updated_time: string;

  @Column({ type: "datetime" })
  created_at: string;

  @OneToOne(type => User, user => user.mediaItem)
  user: User;
}

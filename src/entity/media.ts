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

import { MediaItem } from "./mediaItem";

@Entity({ name: "media" })
export class Media {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index("type-idx", { unique: true })
  type: string;

  @OneToMany(type => MediaItem, mediaItem => mediaItem.media)
  // @JoinColumn({ name: "role_id" })
  mediaItems: MediaItem[];
}

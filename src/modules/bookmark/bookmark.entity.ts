import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';

import { User } from '../user/user.entity';

@Entity()
export class Bookmark {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: 'spot' | 'food' | 'festival';

  @Column()
  ref: string;

  @ManyToOne(() => User, (user) => user.bookmarks, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @RelationId((bookmark: Bookmark) => bookmark.user)
  userId: string;
}

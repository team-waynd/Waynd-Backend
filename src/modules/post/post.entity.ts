import { PrimaryGeneratedColumn, Entity, Column } from 'typeorm';
import { OneToMany, ManyToOne } from 'typeorm';
@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  user_id: string;

  @Column()
  targetRegionId: number;

  @Column()
  title: string;

  @Column('text')
  content: string;

  @Column()
  rating: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  updated_at: Date | null;

  @OneToMany(() => PostLike, (like) => like.post)
  likes: PostLike[];
}

@Entity('post_images')
export class PostImage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  post_id: string;

  @Column()
  image_url: string;
}

@Entity('tags')
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}

@Entity('post_tags')
export class PostTag {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  post_id: string;

  @Column()
  tag_id: number;
}

@Entity('post_likes')
export class PostLike {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  post_id: string;

  @Column()
  user_id: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @ManyToOne(() => Post, (post) => post.likes)
  post: Post;
}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { Post, PostImage, Tag, PostTag, PostLike } from './post.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, PostImage, Tag, PostTag, PostLike]),
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}

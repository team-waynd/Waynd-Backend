import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { Post, PostImage, Tag, PostTag, PostLike } from './post.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, PostImage, Tag, PostTag, PostLike]),
    AuthModule,
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}

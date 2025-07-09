import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/createPost.dto';
import { Post, PostImage, PostTag } from './post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @InjectRepository(PostImage)
    private postImageRepository: Repository<PostImage>,
    @InjectRepository(PostTag)
    private postTagRepository: Repository<PostTag>,
  ) {}

  async createPost(createPostDto: CreatePostDto): Promise<Post> {
    const {
      user_id,
      targetRegionId,
      title,
      content,
      rating,
      image_urls,
      tag_ids,
    } = createPostDto;

    // 1. 게시글 저장
    const post = await this.postRepository.save({
      user_id,
      targetRegionId,
      title,
      content,
      rating,
      created_at: new Date(),
    });

    // 2. 이미지 저장
    const images = image_urls.map((url) => ({
      post_id: post.id,
      image_url: url,
    }));
    await this.postImageRepository.save(images);

    // 3. 태그 저장
    const tags = tag_ids.map((tag_id) => ({
      post_id: post.id,
      tag_id: tag_id,
    }));
    await this.postTagRepository.save(tags);

    return post;
  }
}

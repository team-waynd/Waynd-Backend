import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreatePostDto } from './dto/createPost.dto';
import { Post, PostImage, PostTag, Tag } from './post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @InjectRepository(PostImage)
    private postImageRepository: Repository<PostImage>,
    @InjectRepository(PostTag)
    private postTagRepository: Repository<PostTag>,
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
  ) {}

  async getAllPosts() {
    const posts = await this.postRepository.find();

    const postIds = posts.map((post) => post.id);

    const images = await this.postImageRepository.find({
      where: { post_id: In(postIds) },
    });

    const postTags = await this.postTagRepository.find({
      where: { post_id: In(postIds) },
    });

    const tagIds = postTags.map((pt) => pt.tag_id);
    const tags = await this.tagRepository.find({
      where: { id: In(tagIds) },
    });

    const result = posts.map((post) => {
      const postImages = images.filter((img) => img.post_id === post.id);
      const relatedTagIds = postTags
        .filter((pt) => pt.post_id === post.id)
        .map((pt) => pt.tag_id);
      const postTagsData = tags.filter((tag) => relatedTagIds.includes(tag.id));

      return {
        ...post,
        images: postImages,
        tags: postTagsData,
      };
    });

    return result;
  }

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

  async deletePost(id: string): Promise<void> {
    // 1. 게시글 삭제
    await this.postRepository.delete(id);

    // 2. 이미지 삭제
    await this.postImageRepository.delete({ post_id: id });

    // 3. 태그 삭제
    await this.postTagRepository.delete({ post_id: id });
  }
}

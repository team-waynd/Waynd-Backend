import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreatePostDto } from './dto/createPost.dto';
import { Post, PostImage, PostLike, PostTag, Tag } from './post.entity';
import { DataSource } from 'typeorm';
import { NotFoundException, BadRequestException } from '@nestjs/common';

@Injectable()
export class PostService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @InjectRepository(PostImage)
    private postImageRepository: Repository<PostImage>,
    @InjectRepository(PostTag)
    private postTagRepository: Repository<PostTag>,
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
    @InjectRepository(PostLike)
    private likeRepository: Repository<PostLike>,
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

    return await this.dataSource.transaction(async (manager) => {
      const post = await this.postRepository.save({
        user_id,
        targetRegionId,
        title,
        content,
        rating,
      });

      const images = image_urls.map((url) => ({
        post_id: post.id,
        image_url: url,
      }));
      await this.postImageRepository.save(images);

      const tags = tag_ids.map((tag_id) => ({
        post_id: post.id,
        tag_id: tag_id,
      }));
      await this.postTagRepository.save(tags);

      return post;
    });
  }

  async deletePost(id: string): Promise<void> {
    await this.dataSource.transaction(async (manager) => {
      await this.postImageRepository.delete({ post_id: id });
      await this.postTagRepository.delete({ post_id: id });
      await this.postRepository.delete(id);
    });
  }

  async updatePost(id: string, updatePostDto: CreatePostDto): Promise<void> {
    const { title, content, rating, image_urls, tag_ids } = updatePostDto;

    return await this.dataSource.transaction(async (manager) => {
      await this.postRepository.update(id, {
        title,
        content,
        rating,
        updated_at: new Date(),
      });

      if (image_urls) {
        await this.postImageRepository.delete({ post_id: id });

        const images = image_urls.map((url) => ({
          post_id: id,
          image_url: url,
        }));
        await this.postImageRepository.save(images);
      }

      if (tag_ids) {
        await this.postTagRepository.delete({ post_id: id });

        const tags = tag_ids.map((tag_id) => ({
          post_id: id,
          tag_id: tag_id,
        }));
        await this.postTagRepository.save(tags);
      }
    });
  }

  async likePost(
    postId: string,
    userId: string,
  ): Promise<{ liked: boolean; message: string }> {
    const post = await this.postRepository.findOneBy({ id: postId });
    if (!post) {
      throw new NotFoundException('게시글이 존재하지 않습니다.');
    }

    const existing = await this.likeRepository.findOne({
      where: { post_id: postId, user_id: userId },
    });

    if (existing) {
      await this.likeRepository.delete({ id: existing.id });
      return { liked: false, message: '좋아요 취소' };
    }

    const like = this.likeRepository.create({
      post_id: postId,
      user_id: userId,
    });

    await this.likeRepository.save(like);
    return { liked: true, message: '좋아요 완료' };
  }
}

import { Body, Controller, Post, Get, Delete, Param } from '@nestjs/common';
import { CreatePostDto } from './dto/createPost.dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  getAllPosts() {
    return this.postService.getAllPosts();
  }

  @Post('/create')
  createPost(@Body() createPostDto: CreatePostDto) {
    return this.postService.createPost(createPostDto);
  }

  @Delete('/:id')
  deletePost(@Param('id') id: string) {
    return this.postService.deletePost(id);
  }
}

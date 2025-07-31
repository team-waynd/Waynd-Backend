import {
  Body,
  Controller,
  Post,
  Get,
  Delete,
  Param,
  Patch,
} from '@nestjs/common';
import { CreatePostDto } from './dto/createPost.dto';
import { PostService } from './post.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DeletePostDto } from './dto/deletePost.dto';
import { GetAllPostDto } from './dto/getAllPost.dto';
import { PatchPostDto } from './dto/patchPost.dto';

@ApiTags('Post')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  @ApiOperation({ summary: '게시물 전체 조회' })
  @ApiResponse({
    status: 200,
    type: GetAllPostDto,
    isArray: true,
    description: '성공적으로 모든 게시물들을 반환합니다.',
  })
  getAllPosts() {
    return this.postService.getAllPosts();
  }

  @Post('/create')
  @ApiOperation({ summary: '게시물 작성' })
  @ApiResponse({
    status: 200,
    type: CreatePostDto,
    description: '성공적으로 게시물을 작성합니다.',
  })
  createPost(@Body() createPostDto: CreatePostDto) {
    return this.postService.createPost(createPostDto);
  }

  @Delete('/:id')
  @ApiOperation({ summary: '게시글 삭제' })
  @ApiResponse({
    status: 200,
    type: DeletePostDto,
    description: '해당 ID의 게시물을 삭제합니다.',
  })
  deletePost(@Param('id') id: string) {
    return this.postService.deletePost(id);
  }

  @Patch('/:id')
  @ApiOperation({ summary: '게시글 수정' })
  @ApiResponse({
    status: 200,
    type: PatchPostDto,
    description: '해당 ID의 게시물을 수정합니다.',
  })
  updatePost(@Param('id') id: string, @Body() updatePostDto: CreatePostDto) {
    return this.postService.updatePost(id, updatePostDto);
  }
}

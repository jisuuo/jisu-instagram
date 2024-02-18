import { Module } from '@nestjs/common';
import { PostController } from '@root/post/post.controller';
import { PostService } from '@root/post/post.service';

@Module({
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}

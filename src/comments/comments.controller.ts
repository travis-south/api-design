import { Body, Controller, Delete, Get, Inject, Param, Post } from '@nestjs/common';
import { GithubCommentService } from './adapters/github-comment.service';
import Comment, { CommentResponse } from './comment.interface';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment-dto';

@Controller('comments')
export class CommentsController {
    private commentsService: CommentsService;
    constructor(@Inject('GIT_TOKEN') private gitToken: string) {}

    @Get('/:org')
    listAllComments(@Param('org') org: string): Array<Comment> {
        this.commentsService = new CommentsService(new GithubCommentService(org, this.gitToken));
        return this.commentsService.listAllComments();
    }

    // @todo: refactor, this can be implemented more elegantly without requiring the org in the param.  
    @Delete('/:id/:org')
    deleteComment(@Param('id') commentId: string, @Param('org') org: string, @Body('user') user: string): CommentResponse {
        this.commentsService = new CommentsService(new GithubCommentService(org, this.gitToken));
        return this.commentsService.deleteCommment(user, commentId);
    }

    @Post('/:org')
    createComment(@Param('org') org: string, @Body() createCommentDto: CreateCommentDto): Comment {
        this.commentsService = new CommentsService(new GithubCommentService(org, this.gitToken));
        return this.commentsService.createComment(createCommentDto);
    }
}

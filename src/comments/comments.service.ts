import { Injectable } from '@nestjs/common';
import { Comment, CommentResponse } from './comment.interface';
import { CreateCommentDto } from './dto/create-comment-dto';
import { CommentProvider } from './comment-provider.interface';

@Injectable()
export class CommentsService {
    private comments: Comment[] = [];

    constructor(private commentService: CommentProvider) {}

    createComment(createCommentDto: CreateCommentDto): Comment {
        const comment: Comment = createCommentDto;
        return this.commentService.createComment(comment);
    }

    listAllComments(): Comment[] {
        return this.commentService.listAllComment();
    }

    deleteCommment(user: string, commentId: string): CommentResponse {
        return this.commentService.deleteComment(user, commentId);
    }


}

import { CreateCommentDto } from "./dto/create-comment-dto";
import { Comment, CommentResponse } from "./comment.interface";

export interface CommentProvider {

    createComment: (createCommentDto: CreateCommentDto) => Comment;

    listAllComment: () => Comment[];

    deleteComment: (user: string, commentId: string) => CommentResponse;
}

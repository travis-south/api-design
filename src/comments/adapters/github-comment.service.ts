import { CommentProvider } from "../comment-provider.interface";
import { Injectable } from "@nestjs/common";
import { CreateCommentDto } from "../dto/create-comment-dto";
import { Comment, CommentResponse } from "../comment.interface";

@Injectable()
export class GithubCommentService implements CommentProvider {

    constructor(private org: string, private token: string) {}

    createComment(createCommentDto: CreateCommentDto): Comment {
        const comment: Comment = createCommentDto;

        // Put Github API logic here to create comment with the org
        // I didn't included it here since I don't have enterprise account. 
        return comment;
    }

    listAllComment(): Comment[] {
        const comments: Array<Comment> = [];

        // Put Github API logic here to list all comments necessary for this org/user
        // I didn't included it here since I don't have enterprise account. 
        return comments;
    }

    deleteComment(user: string, commentId: string): CommentResponse {
        const response: CommentResponse = { status: "200", message: "successfully deleted" };
        
        // Put Github API logic here to soft delete a comment for this org/user
        // I didn't included it here since I don't have enterprise account. 
        return response;
    }

}
export interface Comment {
    comment: string;
    user: string;
    org: string;
}

export interface CommentResponse {
    status: string;
    message: string;
}

export default Comment;
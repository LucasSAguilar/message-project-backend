import PostDto from "../dto/post.dto";

export default interface ResponseInsertPostInterface {
    success: boolean;
    message: string;
    post: PostDto;
}
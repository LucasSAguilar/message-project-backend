import PostDto from "../dto/post.dto";

export default interface ResponseInsertPostInterface {
    ok: boolean;
    message: string;
    post: PostDto;
}
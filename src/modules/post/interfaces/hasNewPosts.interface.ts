import PostInterface from "./PostInterface";

export default interface HasNewPostsInterface {
    ok: boolean;
    hasPost: boolean;
    message: string;
    posts: PostInterface[];
}
import PostInterface from "./PostInterface";

export default interface HasNewPostsInterface {
    success: boolean;
    hasPost: boolean;
    message: string;
    posts: PostInterface[];
}
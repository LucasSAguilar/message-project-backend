import PostInterface from "./PostInterface";

export default interface ResponseAllPostsInterface {
  success: boolean;
  message: string;
  posts: PostInterface[];
}

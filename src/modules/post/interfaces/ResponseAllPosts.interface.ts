import PostInterface from "./PostInterface";

export default interface ResponseAllPostsInterface {
  ok: boolean;
  message: string;
  posts: PostInterface[];
}

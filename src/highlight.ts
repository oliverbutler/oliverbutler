import type { Post } from "./posts";

export type Highlight =
  | {
      type: "post";
      post: Post;
    }
  | {
      type: "custom";
      title: string;
      content: string;
      img: string;
      href?: string;
      github?: string;
      npm?: string;
    };

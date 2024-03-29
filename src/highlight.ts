import type { Post } from "./posts";

export type Highlight =
  | {
      type: "post";
      class?: string;
      post: Post;
    }
  | {
      type: "custom";
      class?: string;
      title: string;
      content: string;
      img: any;
      href?: string;
      github?: string;
      npm?: string;
    };

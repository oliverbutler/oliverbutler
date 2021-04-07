/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PostsBySlug
// ====================================================

export interface PostsBySlug_posts_dynamic_ComponentDisplayText {
  __typename: "ComponentDisplayText";
  markdown: string | null;
}

export interface PostsBySlug_posts_dynamic_ComponentDisplayCode {
  __typename: "ComponentDisplayCode";
  code: any | null;
}

export interface PostsBySlug_posts_dynamic_ComponentDisplayImage_images {
  __typename: "UploadFile";
  url: string;
  blurHash: string | null;
  width: number | null;
  height: number | null;
  alternativeText: string | null;
  caption: string | null;
}

export interface PostsBySlug_posts_dynamic_ComponentDisplayImage {
  __typename: "ComponentDisplayImage";
  images: (PostsBySlug_posts_dynamic_ComponentDisplayImage_images | null)[] | null;
}

export type PostsBySlug_posts_dynamic = PostsBySlug_posts_dynamic_ComponentDisplayText | PostsBySlug_posts_dynamic_ComponentDisplayCode | PostsBySlug_posts_dynamic_ComponentDisplayImage;

export interface PostsBySlug_posts_tags {
  __typename: "Tag";
  name: string | null;
}

export interface PostsBySlug_posts_image {
  __typename: "UploadFile";
  url: string;
  blurHash: string | null;
  width: number | null;
  height: number | null;
  alternativeText: string | null;
  caption: string | null;
}

export interface PostsBySlug_posts {
  __typename: "Post";
  title: string | null;
  slug: string | null;
  description: string | null;
  updatedAt: any;
  createdAt: any;
  published_at: any | null;
  readingTime: number | null;
  dynamic: (PostsBySlug_posts_dynamic | null)[] | null;
  tags: (PostsBySlug_posts_tags | null)[] | null;
  image: PostsBySlug_posts_image | null;
}

export interface PostsBySlug {
  posts: (PostsBySlug_posts | null)[] | null;
}

export interface PostsBySlugVariables {
  slug: string;
}

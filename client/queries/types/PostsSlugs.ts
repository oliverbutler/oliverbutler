/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PostsSlugs
// ====================================================

export interface PostsSlugs_posts {
  __typename: "Post";
  slug: string | null;
}

export interface PostsSlugs {
  posts: (PostsSlugs_posts | null)[] | null;
}

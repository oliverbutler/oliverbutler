import { gql } from "@apollo/client";

export const GET_POSTS = gql`
  query Posts {
    posts {
      title
      slug
      description
      readingTime
      tags {
        name
      }
      image {
        url
        blurHash
      }
    }
  }
`;

export const GET_POST = gql`
  query Post($id: ID!) {
    post(id: $id) {
      title
      slug
      description
      readingTime
      tags {
        name
      }
      image {
        url
        blurHash
      }
    }
  }
`;

export const GET_POST_SLUG = gql`
  query PostsBySlug($slug: String!) {
    posts(where: { slug: $slug }) {
      title
      slug
      description
      content
      tags {
        name
      }
      image {
        url
        blurHash
      }
    }
  }
`;

export const GET_POST_PATHS = gql`
  query PostsSlugs {
    posts {
      slug
    }
  }
`;

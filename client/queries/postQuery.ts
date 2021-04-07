import { gql } from "@apollo/client";

export const GET_POSTS = gql`
  query Posts {
    posts {
      title
      slug
      description
      readingTime
      updatedAt
      createdAt
      published_at
      tags {
        name
      }
      image {
        url
        blurHash
        width
        height
        alternativeText
        caption
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
      updatedAt
      createdAt
      published_at
      tags {
        name
      }
      image {
        url
        blurHash
        width
        height
        alternativeText
        caption
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
      updatedAt
      createdAt
      published_at
      readingTime
      dynamic {
        __typename
        ... on ComponentDisplayText {
          markdown
        }

        ... on ComponentDisplayCode {
          code
        }

        ... on ComponentDisplayImage {
          images {
            url
            blurHash
            width
            height
            alternativeText
            caption
          }
        }
      }
      tags {
        name
      }
      image {
        url
        blurHash
        width
        height
        alternativeText
        caption
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

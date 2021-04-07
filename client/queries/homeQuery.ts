import { gql } from "@apollo/client";

export const GET_HOME = gql`
  query HomePage {
    homePage {
      title
      subtitle
      image {
        url
        blurHash
        width
        height
        alternativeText
        caption
      }
      dynamicContent {
        ... on ComponentDisplayProjects {
          __typename
          title
          subtitle
          projects {
            name
            description
            project_url
            github_url
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
        ... on ComponentDisplayExperience {
          __typename
          title
          subtitle
          experiences {
            company
            role
            dates
            type
            tags {
              name
            }
            description
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
        ... on ComponentDisplayEducation {
          __typename
          title
          subtitle
          educations {
            name
            dates
            image {
              url
              blurHash
              width
              height
              alternativeText
              caption
            }
            modules {
              title
              description
              grades
              tags {
                name
              }
            }
          }
        }
      }
    }
  }
`;

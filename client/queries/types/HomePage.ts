/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: HomePage
// ====================================================

export interface HomePage_homePage_image {
  __typename: "UploadFile";
  url: string;
  blurHash: string | null;
  width: number | null;
  height: number | null;
  alternativeText: string | null;
  caption: string | null;
}

export interface HomePage_homePage_dynamicContent_ComponentDisplayProjects_projects_tags {
  __typename: "Tag";
  name: string | null;
}

export interface HomePage_homePage_dynamicContent_ComponentDisplayProjects_projects_image {
  __typename: "UploadFile";
  url: string;
  blurHash: string | null;
  width: number | null;
  height: number | null;
  alternativeText: string | null;
  caption: string | null;
}

export interface HomePage_homePage_dynamicContent_ComponentDisplayProjects_projects {
  __typename: "Project";
  name: string;
  description: string | null;
  project_url: string | null;
  github_url: string | null;
  tags: (HomePage_homePage_dynamicContent_ComponentDisplayProjects_projects_tags | null)[] | null;
  image: HomePage_homePage_dynamicContent_ComponentDisplayProjects_projects_image | null;
}

export interface HomePage_homePage_dynamicContent_ComponentDisplayProjects {
  __typename: "ComponentDisplayProjects";
  title: string | null;
  subtitle: string | null;
  projects: (HomePage_homePage_dynamicContent_ComponentDisplayProjects_projects | null)[] | null;
}

export interface HomePage_homePage_dynamicContent_ComponentDisplayExperience_experiences_tags {
  __typename: "Tag";
  name: string | null;
}

export interface HomePage_homePage_dynamicContent_ComponentDisplayExperience_experiences_image {
  __typename: "UploadFile";
  url: string;
  blurHash: string | null;
  width: number | null;
  height: number | null;
  alternativeText: string | null;
  caption: string | null;
}

export interface HomePage_homePage_dynamicContent_ComponentDisplayExperience_experiences {
  __typename: "Experience";
  order: number;
  company: string | null;
  role: string | null;
  dates: string | null;
  type: string | null;
  tags: (HomePage_homePage_dynamicContent_ComponentDisplayExperience_experiences_tags | null)[] | null;
  description: string | null;
  image: HomePage_homePage_dynamicContent_ComponentDisplayExperience_experiences_image | null;
}

export interface HomePage_homePage_dynamicContent_ComponentDisplayExperience {
  __typename: "ComponentDisplayExperience";
  title: string | null;
  subtitle: string | null;
  experiences: (HomePage_homePage_dynamicContent_ComponentDisplayExperience_experiences | null)[] | null;
}

export interface HomePage_homePage_dynamicContent_ComponentDisplayEducation_educations_image {
  __typename: "UploadFile";
  url: string;
  blurHash: string | null;
  width: number | null;
  height: number | null;
  alternativeText: string | null;
  caption: string | null;
}

export interface HomePage_homePage_dynamicContent_ComponentDisplayEducation_educations_modules_tags {
  __typename: "Tag";
  name: string | null;
}

export interface HomePage_homePage_dynamicContent_ComponentDisplayEducation_educations_modules {
  __typename: "ComponentEducationModule";
  title: string | null;
  description: string | null;
  grades: string | null;
  tags: (HomePage_homePage_dynamicContent_ComponentDisplayEducation_educations_modules_tags | null)[] | null;
}

export interface HomePage_homePage_dynamicContent_ComponentDisplayEducation_educations {
  __typename: "Education";
  name: string;
  dates: string;
  image: HomePage_homePage_dynamicContent_ComponentDisplayEducation_educations_image | null;
  modules: (HomePage_homePage_dynamicContent_ComponentDisplayEducation_educations_modules | null)[] | null;
}

export interface HomePage_homePage_dynamicContent_ComponentDisplayEducation {
  __typename: "ComponentDisplayEducation";
  title: string | null;
  subtitle: string | null;
  educations: (HomePage_homePage_dynamicContent_ComponentDisplayEducation_educations | null)[] | null;
}

export type HomePage_homePage_dynamicContent = HomePage_homePage_dynamicContent_ComponentDisplayProjects | HomePage_homePage_dynamicContent_ComponentDisplayExperience | HomePage_homePage_dynamicContent_ComponentDisplayEducation;

export interface HomePage_homePage {
  __typename: "HomePage";
  title: string | null;
  subtitle: string | null;
  image: HomePage_homePage_image | null;
  dynamicContent: (HomePage_homePage_dynamicContent | null)[] | null;
}

export interface HomePage {
  homePage: HomePage_homePage | null;
}

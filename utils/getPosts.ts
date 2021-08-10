import { PostMeta } from "components/Post/Post";

export interface PostFile {
  path: string;
  meta: PostMeta | undefined;
}

export const getPosts = (): PostFile[] => {
  const rawMdxFiles = require.context("pages", true, /^\.\/.*mdx$/);
  const mdxFiles: PostFile[] = rawMdxFiles.keys().map((fileName: string) => {
    return {
      path: fileName.slice(7, fileName.length - 4),
      meta: require("../pages" + fileName.substr(1)).meta,
    };
  });

  return mdxFiles;
};

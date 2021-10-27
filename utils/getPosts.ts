import { PostMeta } from "components/Post/Post";
import fg from "fast-glob";

export interface PostFile {
  path: string;
  meta: PostMeta | undefined;
}

export const getPosts = async (): Promise<PostFile[]> => {
  const mdxFiles: PostFile[] = await Promise.all(
    (
      await fg("pages/blog/*.mdx", { stats: true })
    ).map(async (file) => {
      const meta = (await import(`pages/blog/${file.name}`)).meta;
      return {
        path: file.name.substring(0, file.name.length - 4),
        meta: meta,
      };
    })
  );

  return mdxFiles;
};

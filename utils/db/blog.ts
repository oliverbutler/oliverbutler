import { Document, InsertOneResult, UpdateResult } from "mongodb";
import { Blog } from "types/global";
import { PostFile } from "utils/getPosts";
import { connectMongo } from "./mongodb";

export const getBlogs = async (): Promise<Blog[]> => {
  const { db } = await connectMongo();

  return db.collection("blog").find<Blog>({}).toArray();
};

export const getBlog = async (slug: string): Promise<Blog> => {
  const { db } = await connectMongo();

  return db.collection("blog").findOne<Blog>({ slug: slug });
};

export const createBlog = async (
  blog: Omit<Blog, "_id" | "hitCount">
): Promise<InsertOneResult<Document> | false> => {
  const { db } = await connectMongo();

  const blogToInsert: Omit<Blog, "_id"> = { ...blog, hitCount: 0 };

  if ((await getBlog(blog.slug)) === undefined) {
    return db.collection("blog").insertOne(blogToInsert);
  } else return false;
};

export const populateBlogsFromMDXFiles = (blogFiles: PostFile[]) => {
  blogFiles.forEach((blogFile) => {
    createBlog({ slug: blogFile.meta.slug, points: 0 }).then((res) => {
      if (res !== false) {
        console.log("[DB] Just created entry for " + blogFile.meta.slug);
      }
    });
  });
};

export const registerBlogHit = async (slug: string) => {
  const { db } = await connectMongo();

  return db
    .collection("blog")
    .updateOne({ slug: slug }, { $inc: { hitCount: 1 } });
};

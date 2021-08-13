import { FindCursor, InsertOneResult } from "mongodb";
import { Blog } from "types/global";
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
  blog: Omit<Blog, "_id">
): Promise<InsertOneResult<Document> | false> => {
  const { db } = await connectMongo();

  if ((await getBlog(blog.slug)) === undefined) {
    return db.collection("blog").insertOne(blog);
  } else return false;
};

import type { NextApiRequest, NextApiResponse } from "next";
import { createBlog, getBlog, getBlogs } from "utils/db/blogs";
import requestIp from "request-ip";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { blogId } = req.query;
  if (blogId === undefined)
    return res.status(400).json({ error: "Missing blogId" });

  switch (req.method) {
    case "GET":
      const blog = await getBlog(blogId as string);

      console.log(req.headers);

      if (blog === undefined)
        return res.status(404).json({ message: "Blog not found" });
      else return res.status(200).json(blog);

    case "POST":
      const insertion = await createBlog({ slug: blogId as string, points: 1 });
      return res.status(201).json(insertion);

    default:
      return res.status(405).json({ message: "Method not allowed" });
  }
}

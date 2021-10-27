import type { NextApiRequest, NextApiResponse } from "next";
import { createBlog, getBlog, getBlogs } from "utils/db/blog";
import requestIp from "request-ip";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { slug, browserId } = req.query;
  if (slug === undefined)
    return res.status(400).json({ error: "Missing slug" });

  switch (req.method) {
    case "GET":
      const blog = await getBlog(slug as string);

      if (blog === undefined)
        return res.status(404).json({ message: "Blog not found" });
      else return res.status(200).json(blog);

    default:
      return res.status(405).json({ message: "Method not allowed" });
  }
}

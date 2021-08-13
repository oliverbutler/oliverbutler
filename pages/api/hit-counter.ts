import type { NextApiRequest, NextApiResponse } from "next";
import requestIp from "request-ip";
import { registerBlogHit } from "utils/db/blog";
import { getIpHash } from "utils/db/likes/tracking";
import { connectMongo } from "utils/db/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { slug, browserId } = req.query;
  if (slug === undefined)
    return res.status(400).json({ error: "Missing slug" });

  const detectedIp = requestIp.getClientIp(req);

  switch (req.method) {
    case "GET":
      const hitResult = await registerBlogHit(slug as string);
      return res.status(201).json(hitResult);

    default:
      return res.status(405).json({ message: "Method not allowed" });
  }
}

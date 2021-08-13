import type { NextApiRequest, NextApiResponse } from "next";
import requestIp from "request-ip";
import { getIpHash } from "utils/ip";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { slug, browserId } = req.query;
  if (slug === undefined)
    return res.status(400).json({ error: "Missing slug" });
  if (browserId === undefined)
    return res.status(400).json({ error: "Missing browserId" });

  const detectedIp = requestIp.getClientIp(req);

  switch (req.method) {
    case "GET":
      return res.status(200).json({
        likes: 123,
        likesFromUser: 10,
        browserId,
        ip: detectedIp,
        ipHash: getIpHash(detectedIp),
      });

    default:
      return res.status(405).json({ message: "Method not allowed" });
  }
}

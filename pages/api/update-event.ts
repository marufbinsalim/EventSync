// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import createClient from "@/utils/supabase/api";
import { PostgrestError } from "@supabase/supabase-js";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ error: PostgrestError | string | null | any }>
) {
  // Only allow POST requests
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method Not Allowed" });

  let supabase = createClient(req, res);

  let event = req.body;

  if (!event || !event.id)
    return res.status(400).json({ error: "Event ID is required" });

  let { error } = await supabase.from("events").upsert([
    {
      id: event.id,
      title: event.title,
      location: event.location,
      description: event.description,
      startDate: event.startDate,
      endDate: event.endDate,
    },
  ]);

  return res.status(200).json({ error: error });
}

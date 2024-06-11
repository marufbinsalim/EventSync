// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import createClient from "@/utils/supabase/api";
import { PostgrestError } from "@supabase/supabase-js";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ error: PostgrestError | string | null }>
) {
  // Only allow POST requests
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method Not Allowed" });

  let supabase = createClient(req, res);

  let event = req.body;
  let { error } = await supabase.from("events").insert([event]);

  return res.status(200).json({ error: error });
}

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

  let { event_id, user_id, attending } = req.body;

  if (!event_id || !user_id || (attending !== true && attending !== false)) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  if (!attending) {
    let { error } = await supabase.from("responses").insert([
      {
        event_id,
        user_id,
      },
    ]);
    return res.status(200).json({ error: error });
  }

  let { error } = await supabase
    .from("responses")
    .delete()
    .match({ event_id, user_id });
  return res.status(200).json({ error: error });
}

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import createClient from "@/utils/supabase/api";
import { PostgrestError } from "@supabase/supabase-js";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ error: PostgrestError | string | null }>
) {
  // Only allow POST requests
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method Not Allowed" });

  let supabase = createClient(req, res);

  let user_id = req.body.user_id;
  let username = req.body.username;

  let { error } = await supabase.from("profiles").upsert([
    {
      id: user_id,
      username,
    },
  ]);

  return res.status(200).json({ error: error });
}

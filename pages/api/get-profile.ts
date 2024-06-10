// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import createClient from "@/utils/supabase/api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ data: any; error: string | null }>
) {
  // Only allow POST requests
  if (req.method !== "POST")
    return res.status(405).json({ data: null, error: "Method Not Allowed" });

  let user_id = req.body.user_id;

  let supabase = createClient(req, res);
  let { data, error } = (await supabase
    .from("profiles")
    .select("*")
    .match({ id: user_id as string })
    .range(0, 1)
    .single()) as {
    data: any;
    error: any;
  };
  res.status(200).json({ data, error: error });
}

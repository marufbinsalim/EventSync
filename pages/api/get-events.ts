// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import createClient from "@/utils/supabase/api";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ data: any[]; error: Error | null }>
) {
  let supabase = createClient(req, res);
  let { data, error } = (await supabase.from("events").select("*")) as {
    data: any[];
    error: Error | null;
  };
  res.status(200).json({ data, error });
}

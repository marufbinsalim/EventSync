// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import createClient from "@/utils/supabase/api";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{
    data: any[];
    pageinationInfo: {
      currentPage: number;
      pageSize: number;
      totalPages: number;
      totalItems: number;
    };
    error: Error | null;
  }>
) {
  let startDateRangeStart =
    req.body.startDateRangeStart || "2000-01-01T00:00:00.000000+00:00";
  let endDateRangeEnd =
    req.body.endDateRangeEnd || "3000-01-01T00:00:00.000000+00:00";

  let titleSearch = req.body.titleSearch || "";
  let locationSearch = req.body.locationSearch || "";

  let currentPage = req.body.currentPage || 1;
  let pageSize = req.body.pageSize || 5;
  let offset = (currentPage - 1) * pageSize;
  let range = {
    start: offset,
    end: offset + pageSize,
  };

  let supabase = createClient(req, res);
  let { data, count, error } = (await supabase
    .from("events")
    .select(`*, responses: responses(*, users: profiles(*))`, {
      count: "exact",
    }) // joins responses and users to events data based on the foreign keys
    .filter("startDate", "gte", startDateRangeStart) // filters events that start after the start date range
    .filter("endDate", "lte", endDateRangeEnd) // filters events that end before the end date range
    .ilike("title", `%${titleSearch}%`) // filters events that have the title search string in the title
    .ilike("location", `%${locationSearch}%`) // filters events that have the location search string in the location
    .range(range.start, range.end)) as {
    // we will use this to build pagination later
    data: any[];
    count: number;
    error: Error | null;
  };
  res.status(200).json({
    data,
    pageinationInfo: {
      currentPage,
      pageSize,
      totalPages: Math.ceil(count / pageSize),
      totalItems: count,
    },
    error,
  });
}

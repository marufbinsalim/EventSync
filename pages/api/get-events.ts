// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import createClient from "@/utils/supabase/api";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{
    data: any[];
    paginationInfo: {
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

  let auth_id = req.body.auth_id || null;

  let pageSize = req.body.pageSize || 10;
  let currentPage = req.body.currentPage || 1;
  let offset = (currentPage - 1) * pageSize;
  let range = {
    start: offset,
    end: offset + pageSize,
  };

  let supabase = createClient(req, res);
  let queryBuilder = supabase
    .from("events")
    .select(
      `*, event_creator: profiles!events_created_by_fkey(*), responses: responses(*, users: profiles(*))`,
      {
        count: "exact",
      }
    ) // joins responses and users to events data based on the foreign keys
    .filter("startDate", "gte", startDateRangeStart) // filters events that start after the start date range
    .filter("endDate", "lte", endDateRangeEnd) // filters events that end before the end date range
    .ilike("title", `%${titleSearch}%`) // filters events that have the title search string in the title
    .ilike("location", `%${locationSearch}%`) // filters events that have the location search string in the location
    .order("created_at", { ascending: true }); // orders events by start date

  if (auth_id) {
    // if there is an auth_id, filter events that were created by the user
    queryBuilder = queryBuilder.filter("created_by", "eq", auth_id);
  }

  // enables pagination
  queryBuilder = queryBuilder.range(range.start, range.end - 1);

  let { data, count, error } = (await queryBuilder) as {
    // we will use this to build pagination later
    data: any[];
    count: number;
    error: Error | null;
  };
  res.status(200).json({
    data,
    paginationInfo: {
      currentPage,
      pageSize,
      totalPages: Math.ceil(count / pageSize),
      totalItems: count,
    },
    error,
  });
}

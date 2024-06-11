async function getEvents(
  page: number,
  startDateRangeStart?: string | null,
  endDateRangeEnd?: string | null,
  titleSearch?: string | null,
  locationSearch?: string | null,
  auth_id?: string | null
) {
  let response = await fetch("/api/get-events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      currentPage: page,
      startDateRangeStart: startDateRangeStart || null,
      endDateRangeEnd: endDateRangeEnd || null,
      titleSearch: titleSearch || null,
      locationSearch: locationSearch || null,
      auth_id: auth_id || null,
    }),
  });

  if (response.ok) {
    let {
      data,
      pageinationInfo,
      error,
    }: {
      data: any[];
      pageinationInfo: {
        currentPage: number;
        pageSize: number;
        totalPages: number;
        totalItems: number;
      };
      error: Error | string | null;
    } = await response.json();
    if (error) {
      console.error(error);
      return null;
    }
    return { data, pageinationInfo };
  } else {
    console.error(response.statusText);
    return null;
  }
}

export default getEvents;

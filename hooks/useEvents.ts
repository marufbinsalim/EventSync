import getEvents from "@/utils/query-functions/getEvents";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { DateValueType } from "react-tailwindcss-datepicker";

export default function useEvents({
  selectedEvent,
  setSelectedEvent,
  user,
}: {
  selectedEvent: any;
  setSelectedEvent: (event: any) => void;
  user: any;
}) {
  const [events, setEvents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [togglingAttendance, setTogglingAttendance] = useState<{
    event_id: string;
    state: boolean;
  } | null>(null);
  const [page, setPage] = useState<number>(1);

  const [paginationInfo, setPaginationInfo] = useState<{
    currentPage: number;
    pageSize: number;
    totalPages: number;
    totalItems: number;
  } | null>(null);

  const [titleSearch, setTitleSearch] = useState<string>("");
  const [locationSearch, setLocationSearch] = useState<string>("");
  const [dateRange, setDateRange] = useState<DateValueType>({
    startDate: null,
    endDate: null,
  });

  async function toggleAttendance(
    eventId: string,
    userId: string,
    attending: boolean
  ) {
    setTogglingAttendance({ event_id: eventId, state: attending });
    let response = await fetch("/api/toggle-response", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ event_id: eventId, user_id: userId, attending }),
    });
    setTogglingAttendance(null);

    if (!response.ok) {
      let error = await response.json();
      console.error("Failed to toggle attendance:", error);
      toast.error("Failed to toggle attendance");
      return;
    }

    let updatedEvents = events.map((event) => {
      if (event.id === eventId) {
        let updated = {
          ...event,
          responses: attending
            ? event.responses.filter(
                (response: any) => response.user_id !== userId
              )
            : [
                ...event.responses,
                { user: user, user_id: userId, event_id: eventId },
              ],
        };
        if (selectedEvent && selectedEvent.id === eventId) {
          setSelectedEvent(updated);
        }
        return updated;
      }
      return event;
    });
    setEvents(updatedEvents);
    toast.success(
      attending
        ? "You chose not to attend this event"
        : "You chose to attend this event"
    );
  }

  useEffect(() => {
    console.log("useEffect");
    let isMounted = true;
    if (page === 0) return;
    setIsLoading(true);
    getEvents(
      page,
      dateRange?.startDate ? new Date(dateRange.startDate).toISOString() : null,
      dateRange?.endDate ? new Date(dateRange.endDate).toISOString() : null,
      titleSearch,
      locationSearch
    ).then((response) => {
      if (isMounted && response) {
        setEvents(response.data);
        setPaginationInfo(response.paginationInfo);
      }
      setIsLoading(false);
    });

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  async function applyFilters() {
    console.log("applyFilters");
    setPage(0);

    // await for 200ms before fetching data
    await new Promise((resolve) => setTimeout(resolve, 200));

    setPage(1);
  }

  useEffect(() => {
    console.log("useEffect");
    applyFilters();
  }, [titleSearch, locationSearch, dateRange]);

  const reset = async () => {
    setTitleSearch("");
    setLocationSearch("");
    setDateRange({ startDate: null, endDate: null });

    setPage(0);
    // await for 200ms before fetching data
    await new Promise((resolve) => setTimeout(resolve, 200));
    setPage(1);
  };

  return {
    data: {
      events,
      paginationInfo,
    },
    toggleAttendance,
    togglingAttendance,
    isLoading,
    titleSearch,
    setTitleSearch,
    locationSearch,
    setLocationSearch,
    dateRange,
    setDateRange,
    reset,
    applyFilters,
    page,
    setPage,
  };
}

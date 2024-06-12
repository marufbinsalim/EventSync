import getEvents from "@/utils/query-functions/getEvents";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function useEvents({ page }: { page: number }) {
  const [events, setEvents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [paginationInfo, setPaginationInfo] = useState<{
    currentPage: number;
    pageSize: number;
    totalPages: number;
    totalItems: number;
  } | null>(null);

  async function toggleAttendance(
    eventId: string,
    userId: string,
    attending: boolean
  ) {
    let response = await fetch("/api/toggle-response", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ event_id: eventId, user_id: userId, attending }),
    });

    if (!response.ok) {
      let error = await response.json();
      console.error("Failed to toggle attendance:", error);
      toast.error("Failed to toggle attendance");
    } else {
      let updatedEvents = events.map((event) => {
        if (event.id === eventId) {
          return {
            ...event,
            responses: attending
              ? event.responses.filter(
                  (response: any) => response.user_id !== userId
                )
              : [...event.responses, { user_id: userId }],
          };
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
  }

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    getEvents(page).then((response) => {
      if (isMounted && response) {
        setEvents(response.data);
        setPaginationInfo(response.paginationInfo);
      }
      setIsLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, [page]);
  return {
    data: {
      events,
      paginationInfo,
    },
    toggleAttendance,
    isLoading,
  };
}

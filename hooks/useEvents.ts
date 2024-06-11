import getEvents from "@/utils/query-functions/getEvents";
import { useEffect, useState } from "react";

export default function useEvents({ page }: { page: number }) {
  const [events, setEvents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [paginationInfo, setPaginationInfo] = useState<{
    currentPage: number;
    pageSize: number;
    totalPages: number;
    totalItems: number;
  } | null>(null);

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
    isLoading,
  };
}

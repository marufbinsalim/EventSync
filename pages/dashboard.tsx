import DetailedView from "@/components/Events/DetailedView";
import EventCard from "@/components/Events/EventCard";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import NavigationBar from "@/components/Nav/NavigationBar";
import Pagination from "@/components/Pagination/Pagination";
import useEvents from "@/hooks/useEvents";
import useProfile from "@/hooks/useProfile";
import { CircleDashed } from "lucide-react";
import Head from "next/head";
import { useState } from "react";

export type DashboardView = "events" | "details" | "edit";

export default function Dashboard() {
  const [page, setPage] = useState<number>(1);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const { data: profileData, isLoading: profileLoading } = useProfile();
  let { data, isLoading, toggleAttendance, togglingAttendance } = useEvents({
    page,
    selectedEvent,
    setSelectedEvent,
    user: profileData?.user ?? null,
  });
  const [view, setView] = useState<DashboardView>("events");

  function isAttending(event: any): boolean {
    if (!profileData || !profileData.user) {
      return false;
    }
    let user_id = profileData.user.id;
    let responses = event.responses;

    if (!responses || responses.length === 0) {
      return false;
    }

    let response = responses.find(
      (response: any) => response.user_id === user_id
    );
    return response ? true : false;
  }
  return (
    <>
      <Head>
        <title>Dashboard @ Eventsync</title>
        <meta name="description" content="Dashboard" />
      </Head>
      <div className="flex flex-col h-[100%] overflow-y-hidden bg-slate-600">
        <Header />
        <NavigationBar />

        {view === "events" && (
          <div className="bg-slate-800 p-4 text-slate-300 flex">Search</div>
        )}
        <div className="flex-1 flex flex-col overflow-y-auto styled-scroll bg-slate-600 mb-2 relative">
          {isLoading && (
            <div className="flex justify-center items-center flex-1 bg-slate-600 text-white">
              <CircleDashed
                className="w-10 h-10 text-primary animate-spin"
                size={64}
              />
            </div>
          )}

          {!isLoading &&
            data &&
            data.events &&
            data.events.length > 0 &&
            view === "events" && (
              <div className="bg-slate-600 grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3 md:w-2/3 md:mx-auto relative">
                {data.events.map((event, index) => (
                  <EventCard
                    key={index}
                    event={event}
                    isAttending={isAttending(event)}
                    toggleAttendance={toggleAttendance}
                    togglingAttendance={togglingAttendance}
                    user_id={profileData.user?.id ?? ""}
                    setView={setView}
                    setSelectedEvent={setSelectedEvent}
                  />
                ))}
              </div>
            )}
          {view !== "events" && (
            <DetailedView
              view={view}
              setView={setView}
              setSelectedEvent={setSelectedEvent}
              selectedEvent={selectedEvent}
              isCreator={profileData?.user?.id === selectedEvent?.created_by}
              isAttending={isAttending(selectedEvent)}
              toggleAttendance={toggleAttendance}
              togglingAttendance={togglingAttendance}
              user_id={profileData?.user?.id ?? ""}
            />
          )}
        </div>
        {!isLoading && data && data.paginationInfo && view === "events" && (
          <Pagination
            page={page}
            setPage={setPage}
            paginationInfo={data.paginationInfo}
            options={{
              startPages: 1,
              endPages: 1,
              surroundingPages: 1,
            }}
          />
        )}
        <Footer />
      </div>
    </>
  );
}

import AddressInput from "@/components/AddressInput/AddressInput";
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

export default function Dashboard() {
  const [page, setPage] = useState<number>(1);
  const { data: profileData, isLoading: profileLoading } = useProfile();
  let { data, isLoading, toggleAttendance } = useEvents({ page });

  function isAttending(event: any) {
    if (!profileData || !profileData.user) {
      return false;
    }

    let user = profileData.user;
    let user_id = user.id;

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
        <div>Search</div>
        <div className="flex-1 flex flex-col overflow-y-auto styled-scroll bg-slate-600 mb-2">
          {isLoading && (
            <div className="flex justify-center items-center flex-1 bg-slate-600 text-white">
              <CircleDashed
                className="w-10 h-10 text-primary animate-spin"
                size={64}
              />
            </div>
          )}

          {!isLoading && data && data.events && data.events.length > 0 && (
            <div className="bg-slate-600 grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3 md:w-2/3 md:mx-auto">
              {data.events.map((event, index) => (
                <EventCard
                  key={index}
                  event={event}
                  isAttending={isAttending(event)}
                  toggleAttendance={toggleAttendance}
                  user_id={profileData.user?.id ?? ""}
                />
              ))}
            </div>
          )}
        </div>
        {!isLoading && data && data.paginationInfo && (
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

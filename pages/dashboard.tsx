import AddressInput from "@/components/AddressInput/AddressInput";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import NavigationBar from "@/components/Nav/NavigationBar";
import Pagination from "@/components/Pagination/Pagination";
import useEvents from "@/hooks/useEvents";
import { CircleDashed } from "lucide-react";
import Head from "next/head";
import { useState } from "react";

export default function Dashboard() {
  const [page, setPage] = useState<number>(1);
  let { data, isLoading } = useEvents({ page });
  return (
    <>
      <Head>
        <title>Dashboard @ Eventsync</title>
        <meta name="description" content="Dashboard" />
      </Head>
      <div className="flex flex-col h-[100%] overflow-y-hidden">
        <Header />
        <NavigationBar />
        <div>Search</div>
        <div className="flex-1 flex flex-col overflow-y-auto styled-scroll bg-slate-600">
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
                <div
                  key={index}
                  className="flex flex-col gap-2 p-4 bg-slate-800 rounded-md shadow-md"
                >
                  <h1 className="text-lg font-bold text-white">
                    {event.title}
                  </h1>
                  <p className="text-sm text-gray-300">{event.description}</p>
                  <p className="text-sm text-gray-300">{event.address}</p>
                </div>
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

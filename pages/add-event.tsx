import AddressInput from "@/components/AddressInput/AddressInput";
import RangeDatePicker from "@/components/RangeDatePicker/RangeDatePicker";
import Header from "@/components/Header/Header";
import NavigationBar from "@/components/Nav/NavigationBar";
import useProfile from "@/hooks/useProfile";
import { PlusCircle } from "lucide-react";
import Footer from "@/components/Footer/Footer";
import Head from "next/head";
import { useState } from "react";
import { DateValueType } from "react-tailwindcss-datepicker";

export default function Add() {
  const [title, setTitle] = useState<string>("");
  const [selectedAddress, setSelectedAddress] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [dateRange, setDateRange] = useState<DateValueType>({
    startDate: null,
    endDate: null,
  });

  const { data, isLoading, isError } = useProfile();

  return (
    <>
      <Head>
        <title>Add Event @ Eventsync</title>
        <meta name="description" content="profile page!" />
      </Head>
      <div className="flex flex-col h-[100%] overflow-y-hidden bg-slate-800">
        <Header />
        <NavigationBar />

        <div className="flex flex-col flex-1 w-full overflow-y-hidden bg-slate-800">
          <div className="items-center flex-1 w-full m-auto my-2 overflow-y-auto md:w-2/3 styled-scroll">
            {/* title input container */}
            <div className="flex flex-col gap-2 px-4 py-2">
              <p className="text-lg text-white">Event Title</p>
              <input
                type="text"
                placeholder="Example: Blood Donation Drive ..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full md:w-[335px] p-[4px] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-600 text-white"
              />
            </div>

            {/* address input container */}
            <div className="flex flex-col gap-2 px-4 py-2 m-auto">
              <p className="text-lg text-white">Location</p>
              <AddressInput
                selectedAddress={selectedAddress}
                setSelectedAddress={setSelectedAddress}
              />
            </div>

            {/* Date Picker container */}
            <div className="px-4 py-2">
              <RangeDatePicker value={dateRange} setValue={setDateRange} />
            </div>

            {/* Description Container */}
            <div className="flex flex-col gap-2 px-4 py-2">
              <p className="text-lg text-white">Event Description</p>
              <textarea
                placeholder="Enter event description ..."
                content="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full min-h-[150px] resize-none p-[4px] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-600 text-white"
              />
            </div>
          </div>
        </div>
        <button className="flex items-center justify-center gap-2 px-4 py-2 text-white bg-black rounded-[20px] w-[max-content] ml-auto mr-4 md:ml-[33vh] md:mr-0 my-2 md:my-8">
          <p>Add</p>
          <PlusCircle className="w-6 h-6 md:h-8 md:w-8" />
        </button>
        <Footer />
      </div>
    </>
  );
}

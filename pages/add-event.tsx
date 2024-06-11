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
import addEvent from "@/utils/query-functions/addEvent";
import toast from "react-hot-toast";

export default function Add() {
  const [title, setTitle] = useState<string>("");
  const [selectedAddress, setSelectedAddress] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [dateRange, setDateRange] = useState<DateValueType>({
    startDate: null,
    endDate: null,
  });
  const [addressInputKey, forceUpdate] = useState<number>(0); // To force re-render the AddressInput component (clear the input field)
  const { data, isLoading, isError } = useProfile();

  async function handleAddEvent() {
    if (!data || !data.user) {
      console.error("Unauthenticated user cannot add event");
      toast.error("Unauthenticated user cannot add event");
      return;
    }

    if (!title || title.trim() === "") {
      console.error("Title is required");
      toast.error("Title Field is required");
      return;
    }

    if (!selectedAddress || selectedAddress.trim() === "") {
      console.error("Location is required");
      toast.error("Location Field is required");
      return;
    }

    if (!description || description.trim() === "") {
      console.error("Description is required");
      toast.error("Description Field is required");
      return;
    }

    if (!dateRange || !dateRange.startDate || !dateRange.endDate) {
      console.error("Date Range is required");
      toast.error("Date Range is required");
      return;
    }

    let startDateTimeStampz = new Date(dateRange.startDate).toISOString();
    let endDateTimeStampz = new Date(dateRange.endDate).toISOString();

    const event = {
      title,
      location: selectedAddress,
      description,
      startDate: startDateTimeStampz,
      endDate: endDateTimeStampz,
      created_by: data.user.id,
    };

    let response = await addEvent(event);

    if (!response) {
      console.error("Failed to add event");
      toast.error("Failed to add event");
      return;
    }

    console.log("Event added successfully");
    toast.success("Event added successfully");

    setTitle("");
    setSelectedAddress("");
    forceUpdate((num) => num + 1); // re-render the AddressInput component
    setDescription("");
    setDateRange({ startDate: null, endDate: null });
  }

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

            {/* Date Picker container */}
            <div className="px-4 py-2">
              <RangeDatePicker value={dateRange} setValue={setDateRange} />
            </div>

            {/* address input container */}
            <div className="flex flex-col gap-2 px-4 py-2 m-auto">
              <p className="text-lg text-white">Location</p>
              <AddressInput
                key={addressInputKey}
                selectedAddress={selectedAddress}
                setSelectedAddress={setSelectedAddress}
              />
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
        <button
          onClick={handleAddEvent}
          className="flex items-center justify-center gap-2 px-4 py-2 text-white bg-black rounded-[20px] w-[max-content] ml-auto mr-4 md:ml-[33vh] md:mr-0 my-2 md:my-8"
        >
          <p>Add</p>
          <PlusCircle className="w-6 h-6 md:h-8 md:w-8" />
        </button>
        <Footer />
      </div>
    </>
  );
}

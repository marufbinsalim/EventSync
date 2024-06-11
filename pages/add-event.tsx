import AddressInput from "@/components/AddressInput/AddressInput";
import Header from "@/components/Header/Header";
import NavigationBar from "@/components/Nav/NavigationBar";
import RangeDatePicker from "@/components/RangeDatePicker/RangeDatePicker";
import { PlusCircle, SaveAllIcon } from "lucide-react";
import Head from "next/head";
import { useState } from "react";

export default function Add() {
  const [title, setTitle] = useState<string>("");
  const [selectedAddress, setSelectedAddress] = useState<string>("");

  return (
    <>
      <Head>
        <title>Add Event @ Eventsync</title>
        <meta name="description" content="profile page!" />
      </Head>
      <div className="flex flex-col h-[100%] overflow-y-hidden bg-slate-800">
        <Header />
        <NavigationBar />
        <button className="flex items-center justify-end gap-2 p-4 text-white md:m-auto md:w-2/3">
          <p>Add</p>
          <PlusCircle className="w-8 h-8" />
        </button>
        <div className="flex flex-col flex-1 w-full overflow-y-hidden bg-slate-800">
          <div className="flex-1 w-full m-auto overflow-y-scroll md:w-2/3 styled-scroll">
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
              <RangeDatePicker />
            </div>
          </div>
        </div>
        <div>Footer</div>
      </div>
    </>
  );
}

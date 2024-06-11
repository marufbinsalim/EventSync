import AddressInput from "@/components/AddressInput/AddressInput";
import Header from "@/components/Header/Header";
import NavigationBar from "@/components/Nav/NavigationBar";
import Head from "next/head";
import { useState } from "react";

export default function Add() {
  const [selectedAddress, setSelectedAddress] = useState<string>("");
  return (
    <>
      <Head>
        <title>Add Event @ Eventsync</title>
        <meta name="description" content="profile page!" />
      </Head>
      <div className="flex flex-col h-[100%] overflow-y-hidden">
        <Header />
        <NavigationBar />
        <div className="flex-1 w-full overflow-y-scroll styled-scroll bg-slate-800">
          <div className="flex flex-wrap items-center gap-2 px-4 py-2">
            <p className="text-lg text-white">Address</p>
            <AddressInput
              selectedAddress={selectedAddress}
              setSelectedAddress={setSelectedAddress}
            />
          </div>
        </div>
        <div>Footer</div>
      </div>
    </>
  );
}

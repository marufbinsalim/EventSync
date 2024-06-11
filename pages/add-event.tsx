import AddressInput from "@/components/AddressInput/AddressInput";
import Header from "@/components/Header/Header";
import NavigationBar from "@/components/Nav/NavigationBar";
import Head from "next/head";

export default function Add() {
  return (
    <>
      <Head>
        <title>Add Event @ Eventsync</title>
        <meta name="description" content="profile page!" />
      </Head>
      <div className="flex flex-col h-[100%] overflow-y-hidden">
        <Header />
        <NavigationBar />
        <div className="flex-1 w-full overflow-y-scroll styled-scroll">
          <AddressInput />
        </div>
        <div>Footer</div>
      </div>
    </>
  );
}

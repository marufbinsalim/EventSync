import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import NavigationBar from "@/components/Nav/NavigationBar";
import useProfile from "@/hooks/useProfile";
import {
  CircleDashed,
  Edit,
  Edit2Icon,
  LucideSave,
  SaveIcon,
} from "lucide-react";
import Head from "next/head";
import { useState } from "react";

export default function Profile() {
  const { data, isLoading, isError } = useProfile();
  const [editName, setEditName] = useState(false);
  return (
    <>
      <Head>
        <title>Profile @ Eventsync</title>
        <meta name="description" content="profile page!" />
      </Head>
      <div className="flex flex-col h-[100%] overflow-y-hidden">
        <Header />
        <NavigationBar />
        <div className="flex-1 overflow-y-scroll styled-scroll text-white bg-slate-700">
          {isLoading && (
            <div className="flex justify-center items-center h-[60vh]">
              <CircleDashed
                className="w-10 h-10 text-primary animate-spin"
                size={64}
              />
            </div>
          )}
          {!isLoading && data && data.user && (
            <div className="flex flex-col bg-slate-800 w-max p-4 md:p-8 m-auto mt-8 rounded-xl">
              <div className="flex flex-col justify-center gap-4">
                <div className="flex items-center gap-2 md:flex-col md:gap-4">
                  <img
                    src={data.user.profile_picture_url || "/avatar.png"}
                    alt="avatar"
                    className="w-10 h-10 rounded-full md:w-20 md:h-20"
                  />
                  <p className="w-full text-center">{data.user.email}</p>
                </div>
                {editName && (
                  <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-2 p-2 rounded-md bg-slate-900 w-max m-auto">
                    <input
                      value={data.updatebleLocalStates.username}
                      onChange={(e) =>
                        data.updateLocalStates.setUsername(e.target.value)
                      }
                      className="p-[4px] text-center border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-600 text-white"
                      spellCheck={false}
                    />
                    <button
                      onClick={async () => {
                        await data.updateLocalStates.saveUpdatedUserName();
                        setEditName(false);
                      }}
                      className="text-white bg-primary rounded-md px-4 py-2 flex gap-2 items-center bg-slate-900"
                    >
                      Update
                      <LucideSave size={24} />
                    </button>
                  </div>
                )}
                {!editName && (
                  <div className="flex flex-row items-center justify-between gap-6 md:gap-2 p-2 rounded-md bg-gray-900 w-full m-auto">
                    <h1 className="">Username : {data.user.username}</h1>
                    <button
                      onClick={() => {
                        setEditName(true);
                      }}
                      className="text-white bg-primary rounded-md px-2 py-1"
                    >
                      <Edit size={24} />
                    </button>
                  </div>
                )}
              </div>
              <div className="flex flex-col items-center gap-4 mt-4"></div>
            </div>
          )}
        </div>
        <Footer />
      </div>
    </>
  );
}

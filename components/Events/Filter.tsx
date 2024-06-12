import { CheckSquare, SquareDashedBottom, XIcon } from "lucide-react";
import RangeDatePicker from "../RangeDatePicker/RangeDatePicker";

export default function Filter({
  titleSearch,
  setTitleSearch,
  locationSearch,
  setLocationSearch,
  dateRange,
  setDateRange,
  showSelfEvents,
  setShowSelfEvents,
  reset,
}: {
  titleSearch: string;
  setTitleSearch: (value: string) => void;
  locationSearch: string;
  setLocationSearch: (value: string) => void;
  dateRange: any;
  setDateRange: (value: any) => void;
  showSelfEvents: boolean;
  setShowSelfEvents: (value: boolean) => void;
  reset: () => void;
}) {
  return (
    <div className="bg-slate-800 p-4 text-slate-300 flex flex-col md:flex-row md:justify-between gap-2 md:gap-8">
      <div className="flex gap-2 items-center">
        <p className="text-lg mr-auto md:mr-0">Title </p>
        <input
          value={titleSearch}
          onChange={(e) => setTitleSearch(e.target.value)}
          type="text"
          placeholder="Example: Hackathon ..."
          className="p-[4px] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-600 text-white"
        />
      </div>
      <div className="flex gap-2 items-center">
        <p className="text-lg mr-auto md:mr-0">Location </p>
        <input
          value={locationSearch}
          onChange={(e) => setLocationSearch(e.target.value)}
          type="text"
          placeholder="Example: Dhaka, Bangladesh ..."
          className=" p-[4px] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-600 text-white"
        />
      </div>
      <div className="flex gap-2 items-center">
        <p className="text-lg mr-auto md:mr-0">Date </p>
        <RangeDatePicker
          labelLess={true}
          value={dateRange}
          setValue={setDateRange}
        />
      </div>

      <div className="flex gap-2 items-center justify-between mt-4 md:mt-0 md:ml-auto">
        <button
          className="bg-slate-700 p-2 rounded-md text-white w-max flex items-center justify-center gap-2"
          onClick={() => setShowSelfEvents(!showSelfEvents)}
        >
          Only My Events
          {showSelfEvents ? (
            <CheckSquare className="w-6 h-6" />
          ) : (
            <SquareDashedBottom className="w-6 h-6" />
          )}
        </button>

        <button
          className="bg-slate-700 p-2 rounded-md text-white w-max flex items-center justify-center gap-2"
          onClick={reset}
        >
          Reset Filters <XIcon className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}

import { useState } from "react";
import { DateValueType } from "react-tailwindcss-datepicker";
import AddressInput from "../AddressInput/AddressInput";
import RangeDatePicker from "../RangeDatePicker/RangeDatePicker";
import { SaveAll } from "lucide-react";
import toast from "react-hot-toast";
import updateEvent from "@/utils/query-functions/updateEvent";

export default function Edit({
  event,
  setView,
}: {
  event: any;
  setView: (view: any) => void;
}) {
  let [title, setTitle] = useState<string>(event.title);
  let [location, setLocation] = useState<string>(event.location);
  let [locationInputKey, forceUpdateLocation] = useState<number>(0);
  let [description, setDescription] = useState<string>(event.description);
  let [dateRange, setDateRange] = useState<DateValueType>({
    startDate: new Date(event.startDate),
    endDate: new Date(event.endDate),
  });

  async function handleSaveChanges() {
    if (!title || title.trim() === "") {
      toast.error("Title Field is required");
      return;
    }

    if (!location || location.trim() === "") {
      toast.error("Location Field is required");
      return;
    }

    if (!description || description.trim() === "") {
      toast.error("Description Field is required");
      return;
    }

    if (!dateRange || !dateRange.startDate || !dateRange.endDate) {
      toast.error("Date Range is required");
      return;
    }

    let startDateTimeStampz = new Date(dateRange.startDate).toISOString();
    let endDateTimeStampz = new Date(dateRange.endDate).toISOString();

    const updatedEvent = {
      id: event.id,
      title,
      location,
      description,
      startDate: startDateTimeStampz,
      endDate: endDateTimeStampz,
      created_by: event.created_by,
    };

    let response = await updateEvent(updatedEvent);

    if (!response) {
      toast.error("Failed to save changes");
      return;
    }

    toast.success("Changes saved successfully");
  }

  return (
    <>
      <div className="items-center flex-1 w-full m-auto my-2 overflow-y-auto md:w-2/3 styled-scroll">
        {/* title input container */}
        <div className="flex flex-col gap-2 px-4 py-2">
          <p className="text-sm text-white">Event Title</p>
          <input
            type="text"
            placeholder="Example: Blood Donation Drive ..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full md:w-[335px] p-[4px] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-600 text-white"
          />
        </div>

        {/* Date Picker container */}
        <div className="flex flex-col gap-2 px-4 py-2 m-auto">
          <p className="text-sm text-white">Date Range</p>
          <RangeDatePicker
            value={dateRange}
            setValue={setDateRange}
            labelLess={true}
          />
        </div>

        {/* address input container */}
        <div className="flex flex-col gap-2 px-4 py-2 m-auto">
          <p className="text-sm text-white">Location</p>
          <AddressInput
            key={locationInputKey}
            selectedAddress={location}
            setSelectedAddress={setLocation}
            buttonsInSameRow={false}
          />
        </div>

        {/* Description Container */}
        <div className="flex flex-col gap-2 px-4 py-2">
          <p className="text-sm text-white">Event Description</p>
          <textarea
            placeholder="Enter event description ..."
            content="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full min-h-[100px] resize-none p-[4px] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-600 text-white"
          />
        </div>
      </div>
      <div className="flex items-center px-4 py-2 gap-2 md:w-2/3 md:m-auto">
        <button
          className="bg-slate-700 p-2 rounded-md text-white w-max flex items-center justify-center gap-2 text-sm"
          onClick={handleSaveChanges}
        >
          Save Changes
          <SaveAll className="w-4 h-4 text-white" />
        </button>
      </div>
    </>
  );
}

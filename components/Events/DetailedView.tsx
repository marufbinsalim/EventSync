import { DashboardView } from "@/pages/dashboard";
import DetailNavigation from "./DetailNavigation";
import { CircleDashed } from "lucide-react";
import { getFormattedDateString } from "@/utils/basic-functions/getFormattedDate";

export default function DetailedView({
  selectedEvent,
  isCreator,
  view,
  setView,
  setSelectedEvent,
  isAttending,
  toggleAttendance,
  togglingAttendance,
  user_id,
}: {
  selectedEvent: any;
  isCreator: boolean;
  view: DashboardView;
  setView: (view: DashboardView) => void;
  setSelectedEvent: (event: any) => void;
  isAttending: boolean;
  toggleAttendance: (
    eventId: string,
    userId: string,
    attending: boolean
  ) => void;
  togglingAttendance: { event_id: string; state: boolean } | null;
  user_id: string;
}) {
  return (
    <div
      className={`absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[90%] h-[90%] md:w-2/3 md:left-[16.75vw] md:translate-x-0 justify-center items-center p-4 bg-slate-800 text-slate-300`}
    >
      <DetailNavigation
        setView={setView}
        isCreator={isCreator}
        setSelectedEvent={setSelectedEvent}
      />

      <div>
        <h1 className="text-lg font-bold text-slate-100">
          {"Title : "} {selectedEvent.title}
        </h1>
        <p className="text-sm text-slate-300">
          {"Location : "} {selectedEvent.location}
        </p>
        <p className="text-sm text-slate-300">
          {"Start Time : " + getFormattedDateString(selectedEvent.startDate)}
        </p>
      </div>
      <div className="flex items-center gap-2 text-slate-300 mt-auto ">
        <button
          className="bg-slate-700 p-2 rounded-md text-white w-max"
          disabled={togglingAttendance?.event_id === selectedEvent.id}
          onClick={(e) => {
            toggleAttendance(selectedEvent.id, user_id, isAttending);
          }}
        >
          {/* {isAttending ? "Not Interested" : "Attend"} */}
          {togglingAttendance?.event_id === selectedEvent.id ? (
            <CircleDashed className="w-4 h-4 animate-spin" />
          ) : isAttending ? (
            "Not Interested"
          ) : (
            "Attend"
          )}
        </button>
        <p className="text-sm font-extralight">
          {isAttending
            ? "You are attending this event"
            : "You are not attending this event"}
        </p>
      </div>
    </div>
  );
}

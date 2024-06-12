import { DashboardViewType } from "@/pages/dashboard";
import { getFormattedDateString } from "@/utils/basic-functions/getFormattedDate";
import { CircleDashed } from "lucide-react";
function EventCard({
  event,
  user_id,
  isAttending,
  toggleAttendance,
  togglingAttendance,
  setView,
  setSelectedEvent,
}: {
  user_id: string;
  event: any;
  isAttending: boolean;
  toggleAttendance: (
    eventId: string,
    userId: string,
    attending: boolean
  ) => void;
  togglingAttendance: { event_id: string; state: boolean } | null;
  setView: (view: DashboardViewType) => void;
  setSelectedEvent: (event: any) => void;
}) {
  function GoToView(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target instanceof HTMLButtonElement) return;
    setSelectedEvent(event);
    setView("details");
  }

  return (
    <div
      className="flex flex-col gap-4 p-4 bg-slate-800 rounded-md shadow-md cursor-pointer"
      onClick={(e: React.MouseEvent<HTMLDivElement>) => GoToView(e)}
    >
      <div>
        <h1 className="text-lg font-bold text-slate-100">
          {"Title : "} {event.title}
        </h1>
        <p className="text-sm text-slate-300">
          {"Location : "} {event.location}
        </p>
        <p className="text-sm text-slate-300">
          {"Start Time : " + getFormattedDateString(event.startDate)}
        </p>
      </div>
      <div className="flex items-center gap-2 text-slate-300 mt-auto ">
        <button
          className="bg-slate-700 p-2 rounded-md text-white w-max"
          disabled={togglingAttendance?.event_id === event.id}
          onClick={(e) => {
            toggleAttendance(event.id, user_id, isAttending);
          }}
        >
          {/* {isAttending ? "Not Interested" : "Attend"} */}
          {togglingAttendance?.event_id === event.id ? (
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

export default EventCard;

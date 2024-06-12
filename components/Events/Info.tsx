import { CircleDashed } from "lucide-react";
import { getFormattedDateRangeString } from "@/utils/basic-functions/getFormattedDate";

export default function Info({
  selectedEvent,
  isAttending,
  toggleAttendance,
  togglingAttendance,
  user_id,
}: {
  selectedEvent: any;
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
    <div className="flex flex-col gap-4 flex-1 overflow-hidden">
      <div className="flex flex-col gap-4">
        <h1 className="text-lg font-bold text-slate-100">
          {"Title : "} {selectedEvent.title}
        </h1>
        <p className="text-sm text-slate-300">
          {"Location : "} {selectedEvent.location}
        </p>
        <p className="text-sm text-slate-300">
          {"Description : "} {selectedEvent.description}
        </p>
        <p className="text-sm text-slate-300">
          {getFormattedDateRangeString(
            selectedEvent.startDate,
            selectedEvent.endDate
          )}
        </p>
      </div>
      <div className="flex items-center gap-2 text-slate-300 w-full mt-4">
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
      {selectedEvent.responses && selectedEvent.responses.length > 0 && (
        <div className="mt-4 flex flex-col gap-4 flex-1 overflow-y-hidden">
          <h1 className="text-lg font-bold text-slate-100">Attendees</h1>
          <div className="flex flex-col gap-2 flex-1  overflow-y-auto">
            {selectedEvent.responses.map((response: any, index: number) => (
              <div
                key={index}
                className="flex items-center p-2 bg-slate-700 rounded-md gap-2 md:gap-4"
              >
                <img
                  src={response.user.profile_picture_url ?? "/avatar.png"}
                  alt={response.user.username}
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex flex-col items-center gap-2 flex-1">
                  <p className="text-slate-100 w-full">
                    {response.user.username}
                  </p>
                  <p className="text-slate-300 text-sm w-full">
                    {response.user.email}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {selectedEvent.responses && selectedEvent.responses.length === 0 && (
        <div className="mt-4 flex flex-col gap-4">
          <h1 className="text-lg font-thin text-slate-100">
            No Attendees as of yet ...
          </h1>
        </div>
      )}
    </div>
  );
}

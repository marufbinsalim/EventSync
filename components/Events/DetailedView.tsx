import { DashboardView } from "@/pages/dashboard";
import DetailNavigation from "./DetailNavigation";
import { CircleDashed } from "lucide-react";
import { getFormattedDateRangeString } from "@/utils/basic-functions/getFormattedDate";
import Info from "@/components/Events/Info";

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
    <div className="absolute flex flex-col gap-2 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[90%] h-[90%] md:w-2/3 md:left-[16.75vw] md:translate-x-0 rounded-20px p-4 bg-slate-800 text-slate-300">
      <DetailNavigation
        setView={setView}
        isCreator={isCreator}
        setSelectedEvent={setSelectedEvent}
      />

      {view === "details" && (
        <Info
          selectedEvent={selectedEvent}
          isAttending={isAttending}
          toggleAttendance={toggleAttendance}
          togglingAttendance={togglingAttendance}
          user_id={user_id}
        />
      )}
    </div>
  );
}

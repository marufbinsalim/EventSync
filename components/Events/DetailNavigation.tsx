import { DashboardView } from "@/pages/dashboard";
import { Edit, InfoIcon, MoveLeft } from "lucide-react";

function DetailNavigation({
  setView,
  isCreator,
  setSelectedEvent,
}: {
  setView: (view: DashboardView) => void;
  isCreator: boolean;
  setSelectedEvent: (event: any) => void;
}) {
  return (
    <div className="flex gap-4 justify-left md:justify-center w-full pb-4">
      <button
        className="p-2 bg-slate-700 rounded-md text-white flex gap-2 items-center mr-auto"
        onClick={(e) => {
          setView("events");
          setSelectedEvent(null);
        }}
      >
        <MoveLeft className="w-6 h-6" />
      </button>
      <button className="p-2 bg-slate-700 rounded-md text-white flex gap-2 items-center">
        Details <InfoIcon className="w-6 h-6" />
      </button>
      {isCreator && (
        <button className="p-2 bg-slate-700 rounded-md text-white flex gap-2 items-center">
          Edit <Edit className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}

export default DetailNavigation;

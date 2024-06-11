import { supabase } from "@/utils/supabase/client";
import { LogOutIcon, LucideCircleUserRound, PlusCircle } from "lucide-react";

export default function NavigationBar() {
  async function signOut() {
    let { error } = await supabase.auth.signOut();
  }

  return (
    <nav className="flex items-center justify-end w-full gap-4 px-4 pt-2 pb-4 text-center text-white md:border-t md:p-4 md:justify-end md:gap-4 bg-slate-900 md:border-slate-800">
      <a
        href="/profile"
        className="flex flex-col-reverse items-center p-2 rounded-lg bg-slate-700 md:flex-row md:gap-2 md:hover:bg-slate-600"
      >
        <span className="hidden md:block">Edit Profile</span>
        <LucideCircleUserRound
          className="w-5 h-5 md:h-8 md:w-8"
          strokeWidth={1}
        />
      </a>

      <a
        href="/add-event"
        className="flex flex-col-reverse items-center p-2 rounded-lg bg-slate-700 md:flex-row md:gap-2 md:hover:bg-slate-600"
      >
        <span className="hidden md:block">Add Event</span>
        <PlusCircle
          className="w-5 h-5 md:h-8 md:w-8"
          strokeWidth={1}
          color="#00FF00"
        />
      </a>

      <button
        onClick={signOut}
        className="flex flex-col-reverse items-center p-2 rounded-lg bg-slate-700 md:flex-row md:gap-2 md:hover:bg-slate-600"
      >
        <span className="hidden md:block">Sign Out</span>
        <LogOutIcon
          strokeWidth={1}
          className="w-5 h-5 md:h-8 md:w-8"
          color="#e64b4b"
        />
      </button>
    </nav>
  );
}

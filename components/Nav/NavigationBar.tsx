import { supabase } from "@/utils/supabase/client";
import { LogOutIcon, PlusCircle, UserCircleIcon } from "lucide-react";

export default function NavigationBar() {
  async function signOut() {
    let { error } = await supabase.auth.signOut();
  }

  return (
    <nav className="flex items-center justify-center w-full gap-4 p-4 text-white md:justify-end bg-slate-900">
      <a href="/profile" className="flex items-center gap-2">
        <span className="hidden md:block">Profile</span>
        <UserCircleIcon className="w-8 h-8" strokeWidth={1} />
      </a>

      <a href="/add-event" className="flex items-center gap-2">
        <span className="hidden md:block">Add Event</span>
        <PlusCircle className="w-8 h-8" strokeWidth={1} color="#00FF00" />
      </a>

      <button onClick={signOut} className="flex items-center gap-2">
        <span className="hidden md:block">Sign Out</span>
        <LogOutIcon className="w-8 h-8" strokeWidth={1} color="#FF0000" />
      </button>
    </nav>
  );
}

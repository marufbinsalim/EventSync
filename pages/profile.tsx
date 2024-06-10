import { supabase } from "@/utils/supabase/client";

export default function Dashboard() {
  return (
    <div>
      Profile
      <button
        onClick={async () => {
          let { error } = await supabase.auth.signOut();
        }}
      >
        Sign Out
      </button>
    </div>
  );
}

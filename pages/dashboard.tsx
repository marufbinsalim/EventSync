import Header from "@/components/Header/Header";
import { supabase } from "@/utils/supabase/client";

export default function Dashboard() {
  return (
    <div>
      <Header />
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

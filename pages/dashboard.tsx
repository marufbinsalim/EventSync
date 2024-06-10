import Header from "@/components/Header/Header";
import NavigationBar from "@/components/Nav/NavigationBar";
import { supabase } from "@/utils/supabase/client";

export default function Dashboard() {
  return (
    <div>
      <Header />
      <NavigationBar />
    </div>
  );
}

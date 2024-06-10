import AuthUI from "@/components/AuthUI";
import { supabase } from "@/utils/supabase/client";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { Star, StarHalfIcon } from "lucide-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function AuthenticationScreen() {
  const [session, setSession] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const data = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "INITIAL_SESSION" && session) {
        router.push("/dashboard");
      } else {
        setSession(session);
      }
    });

    return () => {
      data.data.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session, router]);

  return (
    <div className="flex flex-col items-center h-screen bg-slate-900 text-white">
      <div className="bg-red-300 w-full flex justify-center p-4">
        <Star size={32} />
      </div>
      <AuthUI />
    </div>
  );
}

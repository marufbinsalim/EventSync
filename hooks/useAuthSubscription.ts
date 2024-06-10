import { supabase } from "@/utils/supabase/client";
import type { AuthChangeEvent, Session } from "@supabase/supabase-js";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function useAuthSubscription() {
  const router = useRouter();
  const [nextRoute, setNextRoute] = useState("");
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  function handleEvent(
    event: AuthChangeEvent,
    session: Session | null
  ): { nextRoute: string } {
    let next = "";
    switch (event) {
      case "INITIAL_SESSION":
        next = session ? "/dashboard" : "/";
        break;
      case "TOKEN_REFRESHED":
        next = session ? "/dashboard" : "/";
        break;
      case "SIGNED_IN":
        next = "/dashboard";
        break;
      case "SIGNED_OUT":
        next = "/";
        break;
    }

    return {
      nextRoute: next,
    };
  }

  useEffect(() => {
    setIsLoading(true);
    const authState = supabase.auth.onAuthStateChange((event, session) => {
      const { nextRoute } = handleEvent(event, session);
      setNextRoute(nextRoute);
      setSession(session);
      setIsLoading(false);
    });

    return () => {
      authState.data.subscription.unsubscribe();
      setIsLoading(false);
    };
  }, []);

  useEffect(() => {
    // Redirect to the next route if it's not the current route
    if (nextRoute !== "" && router.pathname !== nextRoute && !isLoading) {
      router.push(nextRoute);
    }
  }, [nextRoute, router, isLoading]);

  return {
    session,
    isAuthStateLoading: isLoading,
  };
}

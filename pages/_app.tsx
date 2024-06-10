import "@/styles/globals.css";
import { supabase } from "@/utils/supabase/client";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    let nextRoute = "/";
    const authState = supabase.auth.onAuthStateChange((event, session) => {
      switch (event) {
        case "INITIAL_SESSION":
          nextRoute = session ? "/dashboard" : "/";
          break;
        case "SIGNED_IN":
          nextRoute = "/dashboard";
          break;
        case "SIGNED_OUT":
          nextRoute = "/";
          break;
        case "TOKEN_REFRESHED":
          nextRoute = session ? "/dashboard" : "/";
          break;
      }
      router.push(nextRoute);
    });

    return () => {
      authState.data.subscription.unsubscribe();
    };
  }, []);

  return <Component {...pageProps} />;
}

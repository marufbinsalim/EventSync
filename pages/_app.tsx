import useAuthSubscription from "@/hooks/useAuthSubscription";
import "@/styles/globals.css";
import { supabase } from "@/utils/supabase/client";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  const { session, isAuthStateLoading } = useAuthSubscription();

  console.log({ session, isAuthStateLoading });

  return (
    <>
      <Component {...pageProps} />
    </>
  );
}

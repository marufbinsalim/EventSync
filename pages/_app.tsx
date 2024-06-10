import useAuthSubscription from "@/hooks/useAuthSubscription";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  const { session, isAuthStateLoading } = useAuthSubscription({
    unprotectedRoutes: ["/unprotected"],
  });

  console.log({ session, isAuthStateLoading });

  return (
    <>
      <Component {...pageProps} />
    </>
  );
}

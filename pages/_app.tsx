import useAuthSubscription from "@/hooks/useAuthSubscription";
import AuthProvider from "@/providers/AuthProvider";
import ReactQueryProvider from "@/providers/QueryClientProvider";
import { RootState, store } from "@/state/store";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider, useSelector } from "react-redux";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ReactQueryProvider>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </ReactQueryProvider>
    </Provider>
  );
}

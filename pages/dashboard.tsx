import Header from "@/components/Header/Header";
import NavigationBar from "@/components/Nav/NavigationBar";
import Head from "next/head";

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>Dashboard @ Eventsync</title>
        <meta name="description" content="Dashboard" />
      </Head>
      <div>
        <Header />
        <NavigationBar />
      </div>
    </>
  );
}

import Header from "@/components/Header/Header";
import NavigationBar from "@/components/Nav/NavigationBar";
import Head from "next/head";

export default function Profile() {
  return (
    <>
      <Head>
        <title>Profile @ Eventsync</title>
        <meta name="description" content="profile page!" />
      </Head>
      <div>
        <Header />
        <NavigationBar />
      </div>
    </>
  );
}

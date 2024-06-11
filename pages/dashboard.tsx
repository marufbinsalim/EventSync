import AddressInput from "@/components/AddressInput/AddressInput";
import Footer from "@/components/Footer/Footer";
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
      <div className="flex flex-col h-[100%] overflow-y-hidden">
        <Header />
        <NavigationBar />
        <div className="flex-1 overflow-y-scroll styled-scroll">
          {
            // 1000 divs rendered
            Array.from({ length: 1000 }, (_, i) => (
              <div key={i} className="p-4 bg-slate-800">
                <p className="text-white">Content {i + 1}</p>
              </div>
            ))
          }
        </div>
        <Footer />
      </div>
    </>
  );
}

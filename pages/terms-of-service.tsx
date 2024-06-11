import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import NavigationBar from "@/components/Nav/NavigationBar";
import Head from "next/head";

export default function Terms() {
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
          <div className="p-8 bg-slate-800 text-slate-300 md:px-[16.5vw]">
            <h1 className="mb-4 text-4xl font-bold">Terms of Service</h1>
            <p className="mb-6">
              {` Welcome to our service. Please read these terms and conditions
              carefully before using Our Service.`}
            </p>

            <section className="mb-8">
              <h2 className="mb-2 text-3xl font-semibold">1. Introduction</h2>
              <p className="mb-4">
                {` These Terms of Service govern your use of our website located at
                example.com (together or individually "Service") operated by Our
                Company.`}
              </p>
              <p className="mb-4">
                Our Privacy Policy also governs your use of our Service and
                explains how we collect, safeguard and disclose information that
                results from your use of our web pages.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-2 text-3xl font-semibold">2. Communications</h2>
              <p className="mb-4">
                {` By using our Service, you agree to subscribe to newsletters,
                  marketing or promotional materials and other information we may
                  send. However, you may opt out of receiving any, or all, of
                  these communications from us by following the unsubscribe link
                  or by emailing at example@example.com.`}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-2 text-3xl font-semibold">3. Purchases</h2>
              <p className="mb-4">
                {` If you wish to purchase any product or service made available
                through Service ("Purchase"), you may be asked to supply certain
                information relevant to your Purchase including, without
                limitation, your credit card number, the expiration date of your
                credit card, your billing address, and your shipping
                information.`}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-2 text-3xl font-semibold">
                4. Contests, Sweepstakes and Promotions
              </h2>
              <p className="mb-4">
                {` Any contests, sweepstakes or other promotions (collectively,
                "Promotions") made available through Service may be governed by
                rules that are separate from these Terms of Service. If you
                participate in any Promotions, please review the applicable
                rules as well as our Privacy Policy. If the rules for a
                Promotion conflict with these Terms of Service, Promotion rules
                will apply.`}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-2 text-3xl font-semibold">5. Content</h2>
              <p className="mb-4">
                {` Content found on or through this Service are the property of Our
                Company or used with permission. You may not distribute, modify,
                transmit, reuse, download, repost, copy, or use said Content,
                whether in whole or in part, for commercial purposes or for
                personal gain, without express advance written permission from
                us.`}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-2 text-3xl font-semibold">6. Termination</h2>
              <p className="mb-4">
                {`   We may terminate or suspend your account and bar access to
                Service immediately, without prior notice or liability, under
                our sole discretion, for any reason whatsoever and without
                limitation, including but not limited to a breach of Terms.`}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-2 text-3xl font-semibold">
                7. Changes To Service
              </h2>
              <p className="mb-4">
                {` We reserve the right to withdraw or amend our Service, and any
                service or material we provide via Service, in our sole
                discretion without notice. We will not be liable if for any
                reason all or any part of Service is unavailable at any time or
                for any period. From time to time, we may restrict access to
                some parts of Service, or the entire Service, to users,
                including registered users.`}
              </p>
            </section>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

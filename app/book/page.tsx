import type { Metadata } from "next";
import { Suspense } from "react";
import { BookingContent } from "../components/BookingContent";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";

export const metadata: Metadata = {
  title: "Plan a Ride | Amha Tours",
  description: "Prepare a private ride or Addis Ababa tour request for Amha.",
};

export default function BookPage() {
  return (
    <main className="booking-page">
      <div className="place-topbar">
        <div className="shell"><Navbar /></div>
      </div>
      <section className="booking-hero" aria-labelledby="booking-title">
        <div className="shell booking-hero-inner">
          <div>
            <p className="eyebrow">Plan with Amha</p>
            <h1 id="booking-title">Build your Addis ride</h1>
          </div>
          <div>
            <p>Tell Amha where you want to go and when. If you arrived from a place guide, that destination is already filled in below.</p>
            <div className="booking-steps" aria-label="Booking steps">
              <span><b>01</b> Share the plan</span>
              <span><b>02</b> Confirm timing</span>
              <span><b>03</b> Agree the price</span>
            </div>
          </div>
        </div>
      </section>
      <Suspense fallback={<div className="booking-loading">Loading booking form...</div>}><BookingContent /></Suspense>
      <Footer />
    </main>
  );
}

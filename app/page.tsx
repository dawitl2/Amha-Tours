import { AboutAmha } from "./components/AboutAmha";
import { AirportTransfer } from "./components/AirportTransfer";
import { Contact } from "./components/Contact";
import { Destinations } from "./components/Destinations";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { HotelTransport } from "./components/HotelTransport";
import { Services } from "./components/Services";
import { Testimonials } from "./components/Testimonials";

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <Destinations />
      <AirportTransfer />
      <HotelTransport />
      <AboutAmha />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}

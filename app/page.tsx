import { AboutAmaha } from "./components/AboutAmaha";
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
      <AboutAmaha />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}


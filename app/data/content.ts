import { places, type Place } from "./places";
import { siteData } from "./siteData";

export type EditableService = {
  number: string;
  title: string;
  description: string;
  symbol: string;
};

export type EditableImageCard = {
  name: string;
  meta: string;
  image: string;
  position: string;
};

export type EditableTestimonial = {
  name: string;
  trip: string;
  quote: string;
  image: string;
  position: string;
};

export type SiteContent = {
  brand: string;
  domain: string;
  person: {
    name: string;
    role: string;
    photo: string;
    intro: string;
    description: string;
  };
  contact: {
    displayPhone: string;
    phoneHref: string;
    whatsappBaseHref: string;
    whatsappHref: string;
    telegramHref: string;
    facebookHref: string;
    instagramHref: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    mobileTitle: string;
    intro: string;
    mobileIntro: string;
    image: string;
    steps: { number: string; title: string; description: string }[];
    ribbon: string[];
  };
  servicesIntro: string;
  services: EditableService[];
  places: Place[];
  journeys: EditableImageCard[];
  hotels: string[];
  testimonials: EditableTestimonial[];
};

export const defaultContent: SiteContent = {
  brand: "Amha Tours",
  domain: "https://amhatours.com.et",
  person: {
    name: "Amha",
    role: "Private local driver",
    photo: "/Driver photo.webp",
    intro: "Amha helps visitors get around the city comfortably with direct communication and routes shaped around their plans.",
    description: "Whether you are arriving for a holiday, a business visit or a short stopover, discuss the schedule, pickup and price with Amha before the ride.",
  },
  contact: { ...siteData.contact },
  hero: {
    eyebrow: "Private rides / Addis Ababa",
    title: "Explore Addis Ababa with a trusted local driver",
    mobileTitle: "Your easier way around Addis",
    intro: "Amha offers pre-booked airport transfers, private city rides and personalized tours, planned directly with you.",
    mobileIntro: "Airport pickups, city rides and flexible local tours, arranged directly with Amha.",
    image: "/hero-addis.webp",
    steps: [
      { number: "01", title: "Call Amha directly", description: "One quick conversation. No account or booking platform." },
      { number: "02", title: "Share your plan", description: "Tell him your pickup, timing and the places you want to see." },
      { number: "03", title: "Confirm and ride", description: "Agree the time and price, then relax while Amha handles the route." },
    ],
    ribbon: ["explore", "discover", "arrive", "connect", "relax"],
  },
  servicesIntro: "Choose one ride or plan a full day. Your timing, route and price are confirmed directly with Amha before the trip.",
  services: siteData.services.map((service) => ({ ...service })),
  places: places.map((place) => ({
    ...place,
    images: place.images.map((image) => ({ ...image })),
    highlights: [...place.highlights],
    activities: place.activities.map((activity) => ({ ...activity })),
  })),
  journeys: siteData.journeys.map((journey) => ({ ...journey })),
  hotels: [...siteData.hotels],
  testimonials: siteData.testimonials.map((review) => ({ ...review })),
};

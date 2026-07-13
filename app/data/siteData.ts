const siteUrl = "https://amaha-tours-addis.big802240.chatgpt.site";
const shareText = "Amaha Tours - private rides and local tours in Addis Ababa";

export const siteData = {
  brand: "Amaha Tours",
  nav: [
    { label: "Home", href: "/#home" },
    { label: "Services", href: "/#services" },
    { label: "Explore Addis", href: "/#explore" },
    { label: "About", href: "/#about" },
    { label: "Contact", href: "/#contact" },
  ],
  contact: {
    whatsappHref: `https://wa.me/?text=${encodeURIComponent("Hello Amaha, I would like to ask about a ride in Addis Ababa.")}`,
    telegramHref: `https://t.me/share/url?url=${encodeURIComponent(siteUrl)}&text=${encodeURIComponent(shareText)}`,
    facebookHref: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(siteUrl)}`,
  },
  services: [
    {
      number: "01",
      title: "Airport transfers",
      description: "Pre-booked pickup or drop-off at Bole International Airport.",
      symbol: "A",
    },
    {
      number: "02",
      title: "Private city rides",
      description: "Comfortable, direct transport around Addis Ababa on your schedule.",
      symbol: "C",
    },
    {
      number: "03",
      title: "Hotel transfers",
      description: "Planned rides between your hotel, airport, offices and restaurants.",
      symbol: "H",
    },
    {
      number: "04",
      title: "Personalized Addis tours",
      description: "A flexible local route built around the places you want to experience.",
      symbol: "T",
    },
    {
      number: "05",
      title: "Business and events",
      description: "Dependable pre-arranged transport for meetings and local events.",
      symbol: "E",
    },
    {
      number: "06",
      title: "Custom routes",
      description: "Combine parks, museums, restaurants and landmarks in one day.",
      symbol: "+",
    },
  ],
  journeys: [
    { name: "Bole arrival", meta: "Airport to hotel", image: "/Bole arrival.jpg", position: "center" },
    { name: "Addis highlights", meta: "Flexible full-day route", image: "/Addis highlights.png", position: "center" },
    { name: "Entoto morning", meta: "Forest views and city history", image: "/Entoto morning.png", position: "center" },
    { name: "Museum afternoon", meta: "Culture, design and local coffee", image: "/Museum afternoon.jpg", position: "center" },
    { name: "Dinner transfer", meta: "Hotel to restaurant and back", image: "/Dinner transfer.png", position: "center" },
    { name: "Unity Park afternoon", meta: "Gardens, history and architecture", image: "/unity3.jpg", position: "center" },
    { name: "Lucy and ancient Ethiopia", meta: "National Museum visit", image: "/National Museum1.jpg", position: "center" },
    { name: "A calmer arrival", meta: "Airport pickup with a clear plan", image: "/A calmer arrival.jpg", position: "center" },
  ],
  hotels: [
    "Bole hotels and guesthouses",
    "Kazanchis business hotels",
    "Meskel Square and city-centre stays",
  ],
  testimonials: [
    {
      name: "Kwame Mensah",
      trip: "First visit to Addis",
      quote: "The route felt personal and unhurried. It was easy to combine the museum, coffee and a city-view stop without rushing the day.",
      image: "/afrian profile1.jpg",
      position: "center",
    },
    {
      name: "Amina Diallo",
      trip: "Airport pickup and city day",
      quote: "Having the pickup and the next day's plans in one conversation made the arrival much easier to understand.",
      image: "/african profile 2.jpg",
      position: "center 35%",
    },
    {
      name: "Lukas Weber",
      trip: "Short Addis stopover",
      quote: "I liked being able to choose the pace, ask questions and change one stop when the traffic made another route more sensible.",
      image: "/european profilejpg.jpg",
      position: "center 24%",
    },
  ],
} as const;

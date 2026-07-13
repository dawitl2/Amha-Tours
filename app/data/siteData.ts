export const siteData = {
  brand: "Amaha Tours",
  logoLabel: "LOGO",
  nav: [
    { label: "Home", href: "#home" },
    { label: "Services", href: "#services" },
    { label: "Explore Addis", href: "#explore" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ],
  contact: {
    displayPhone: "+251 9XX XXX XXX",
    phoneHref: "tel:+251900000000",
    whatsappHref: "https://wa.me/251900000000",
    email: "amaha@example.com",
    emailHref: "mailto:amaha@example.com",
  },
  services: [
    {
      number: "01",
      title: "Airport transfers",
      description: "Pre-booked pickup or drop-off at Bole International Airport.",
      symbol: "✈",
    },
    {
      number: "02",
      title: "Private city rides",
      description: "Comfortable, direct transport around Addis Ababa on your schedule.",
      symbol: "↗",
    },
    {
      number: "03",
      title: "Hotel transfers",
      description: "Planned rides between your hotel, airport, offices and restaurants.",
      symbol: "⌂",
    },
    {
      number: "04",
      title: "Personalized Addis tours",
      description: "A flexible local route built around the places you want to experience.",
      symbol: "◎",
    },
    {
      number: "05",
      title: "Business & events",
      description: "Dependable pre-arranged transport for meetings and local events.",
      symbol: "◇",
    },
    {
      number: "06",
      title: "Custom routes",
      description: "Combine markets, museums, restaurants and landmarks in one day.",
      symbol: "+",
    },
  ],
  destinations: [
    {
      name: "Unity Park",
      meta: "Culture · Gardens · City history",
      description: "A central stop for architecture, gardens and Ethiopia’s modern story.",
      position: "center 38%",
    },
    {
      name: "National Museum",
      meta: "History · Museum visit",
      description: "Explore Ethiopia’s deep history at a comfortable, unhurried pace.",
      position: "center 55%",
    },
    {
      name: "Merkato & Piassa",
      meta: "Markets · Streets · Local life",
      description: "Discover busy market streets and historic neighbourhoods with local help.",
      position: "center 70%",
    },
  ],
  journeys: [
    { name: "Bole arrival", meta: "Airport to hotel", position: "left center" },
    { name: "Addis highlights", meta: "Flexible full-day route", position: "center center" },
    { name: "Entoto morning", meta: "Views and city history", position: "right center" },
    { name: "Museum afternoon", meta: "Culture and local coffee", position: "center 40%" },
    { name: "Dinner transfer", meta: "Hotel to restaurant", position: "center 75%" },
  ],
  hotels: [
    "Example hotel near Bole",
    "Example hotel in Kazanchis",
    "Example hotel near Meskel Square",
  ],
  testimonials: [
    {
      name: "Maya",
      trip: "Airport pickup placeholder",
      quote: "Amaha made the arrival plan feel straightforward and personal. Communication was clear before the trip.",
      position: "left center",
    },
    {
      name: "Daniel",
      trip: "Business visit placeholder",
      quote: "It was reassuring to arrange the day directly with one local driver and adapt the route as plans changed.",
      position: "center center",
    },
    {
      name: "Sara",
      trip: "City tour placeholder",
      quote: "The sample tour felt relaxed, flexible and easy to understand—exactly what a first visit to Addis needs.",
      position: "right center",
    },
  ],
} as const;


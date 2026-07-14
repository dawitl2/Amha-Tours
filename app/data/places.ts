export type Place = {
  slug: string;
  name: string;
  kicker: string;
  cardMeta: string;
  description: string;
  longDescription: string;
  images: { src: string; alt: string }[];
  airportDistance: string;
  driveTime: string;
  visitLength: string;
  bestFor: string;
  highlights: string[];
  activities: { title: string; text: string }[];
  visitorNote: string;
  planningNote: string;
  officialUrl: string;
};

export const places: Place[] = [
  {
    slug: "unity-park",
    name: "Unity Park",
    kicker: "Palace grounds, gardens and Ethiopian stories",
    cardMeta: "Culture / Gardens / City history",
    description: "A central Addis stop that brings historic buildings, gardens and wildlife into one thoughtfully paced visit.",
    longDescription:
      "Set within the Grand Palace grounds, Unity Park gives visitors an approachable introduction to Ethiopia's landscapes, history and cultural diversity. It works especially well at the beginning of a city visit because Amaha can pair it with nearby museums, coffee or an evening meal.",
    images: [
      { src: "/unity3.webp", alt: "Landscaped gardens inside Unity Park at sunset" },
      { src: "/unity2.webp", alt: "Historic wooden palace building at Unity Park" },
      { src: "/unity1.webp", alt: "White lion resting in the wildlife area at Unity Park" },
    ],
    airportDistance: "Approx. 9 km",
    driveTime: "25-45 min",
    visitLength: "2-3 hours",
    bestFor: "First-time visitors",
    highlights: ["Historic palace buildings", "Regional gardens and cultural displays", "Wildlife areas and open lawns", "Easy pairing with central Addis stops"],
    activities: [
      { title: "Walk the palace grounds", text: "Take an easy route through restored buildings, courtyards and landscaped areas." },
      { title: "See Ethiopia in one place", text: "Use the exhibits and regional gardens as a visual introduction before a longer trip." },
      { title: "Build a half-day route", text: "Continue to the National Museum, a coffee stop or an early dinner nearby." },
    ],
    visitorNote: "Visitors often appreciate the mix of open-air space and cultural context, especially when they want an introduction to Addis that does not feel rushed.",
    planningNote: "Airport distance and drive time are estimates and change with traffic. Confirm current admission details before departure.",
    officialUrl: "https://unitypark.et/",
  },
  {
    slug: "national-museum",
    name: "National Museum",
    kicker: "Lucy, archaeology and Ethiopia's long history",
    cardMeta: "History / Archaeology / Museum visit",
    description: "Meet Lucy and explore collections that move from human origins through royal, artistic and cultural history.",
    longDescription:
      "The National Museum of Ethiopia is one of Addis Ababa's essential cultural stops. Its best-known resident is Lucy, the 3.2-million-year-old hominin fossil, alongside archaeological finds, historic objects, royal collections and Ethiopian art. A measured visit leaves time to ask questions and connect the exhibits to the wider city.",
    images: [
      { src: "/National Museum1.webp", alt: "Lucy fossil display inside the National Museum of Ethiopia" },
      { src: "/National Museum2.webp", alt: "Exterior entrance of the National Museum of Ethiopia" },
      { src: "/National Museum3.webp", alt: "Royal garments and throne displayed in the National Museum" },
    ],
    airportDistance: "Approx. 10 km",
    driveTime: "30-50 min",
    visitLength: "1.5-2.5 hours",
    bestFor: "History and culture",
    highlights: ["Lucy and early hominin history", "Archaeological collections", "Royal and diplomatic objects", "Modern and traditional Ethiopian art"],
    activities: [
      { title: "Start with human origins", text: "Spend time in the palaeontology galleries and understand why Lucy matters." },
      { title: "Follow Ethiopia's timeline", text: "Move through archaeological, royal and artistic collections at a comfortable pace." },
      { title: "Add coffee or a second museum", text: "Pair the visit with a nearby coffee break, Holy Trinity Cathedral or Unity Park." },
    ],
    visitorNote: "People who enjoy history usually value the museum most when they allow enough time for the smaller objects, not only the famous Lucy display.",
    planningNote: "Airport distance and drive time are estimates and change with traffic. Museum access and displays can change, so confirm before the visit.",
    officialUrl: "https://www.visitethiopia.et/space/victory-monument-miyaziya-27-square",
  },
  {
    slug: "entoto-park",
    name: "Entoto Park",
    kicker: "Forest air, panoramic views and an active morning",
    cardMeta: "Nature / Views / Light adventure",
    description: "Trade the city streets for eucalyptus forest, mountain air, viewpoints, cafes and flexible outdoor activities.",
    longDescription:
      "High on Mount Entoto, this large natural park offers a different side of Addis Ababa. Forest paths, lookout points, cafes and recreation areas make it easy to shape the stop around your energy level. It is a strong choice for a slower morning, family outing or sunset view before returning to the city.",
    images: [
      { src: "/Entoto1.webp", alt: "Bamboo-covered viewpoint walkway at Entoto Park" },
      { src: "/Entoto2.webp", alt: "Aerial view of forest and visitor buildings at Entoto Park" },
      { src: "/Entoto3.webp", alt: "Covered seating and city viewpoint at Entoto Park" },
    ],
    airportDistance: "Approx. 18 km",
    driveTime: "45-75 min",
    visitLength: "3-5 hours",
    bestFor: "Views and outdoors",
    highlights: ["Panoramic Addis views", "Forest walks and fresh mountain air", "Cafes and recreation areas", "Flexible routes for different energy levels"],
    activities: [
      { title: "Walk to a viewpoint", text: "Choose a short stroll or a longer forest route with stops for photographs." },
      { title: "Make it an active day", text: "Depending on availability, the wider park offers cycling, riding and other recreation." },
      { title: "Pause for coffee", text: "Leave time for a warm drink or meal before the drive back down into Addis." },
    ],
    visitorNote: "The cooler air and wide views are the main draw. Many visitors prefer to leave room in the schedule instead of trying to fit Entoto between several short city stops.",
    planningNote: "Airport distance and drive time are estimates and change with traffic. Weather is cooler at altitude, and activity availability can change.",
    officialUrl: "https://www.entotopark.gov.et/",
  },
];

export function getPlace(slug: string) {
  return places.find((place) => place.slug === slug);
}

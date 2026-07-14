import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://amaha-tours.vercel.app";
const title = "Amaha Tours | Private Driver in Addis Ababa";
const description =
  "Private airport transfers, city rides and personalized Addis Ababa tours arranged directly with a trusted local driver in Ethiopia.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  keywords: [
    "Addis Ababa",
    "Ethiopia",
    "Addis Ababa tourism",
    "Ethiopia tours",
    "private driver Addis Ababa",
    "Bole airport transfer",
    "Addis city tour",
    "Unity Park tour",
    "Entoto Park",
    "National Museum of Ethiopia",
    "local tour guide Addis Ababa",
    "airport pickup Addis Ababa",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title,
    description,
    url: "/",
    siteName: "Amaha Tours",
    locale: "en_ET",
    type: "website",
  },
  twitter: {
    card: "summary",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Amaha Tours",
  url: siteUrl,
  telephone: "+251911010008",
  description,
  areaServed: [
    { "@type": "City", name: "Addis Ababa" },
    { "@type": "Country", name: "Ethiopia" },
  ],
  sameAs: [
    "https://www.instagram.com/amha_abebaw/",
    "https://www.facebook.com/share/17tfT8bqXy/",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

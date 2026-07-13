import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Amaha Tours | Private Driver in Addis Ababa",
  description:
    "Private airport transfers, city rides and personalized Addis Ababa tours arranged directly with a trusted local driver.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

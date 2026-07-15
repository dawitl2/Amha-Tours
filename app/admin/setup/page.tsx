import type { Metadata } from "next";
import { SetupForm } from "../../components/SetupForm";

export const metadata: Metadata = {
  title: "Secure setup | Amha Tours",
  robots: { index: false, follow: false },
};

export default function SetupPage() {
  return <SetupForm />;
}

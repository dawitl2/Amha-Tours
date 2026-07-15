"use client";

import { useSiteContent } from "../context/SiteContentContext";
import Link from "next/link";

const nav = [
  { label: "Home", href: "/#home" },
  { label: "Services", href: "/#services" },
  { label: "Explore Addis", href: "/places" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export function Footer() {
  const { brand, contact } = useSiteContent();
  return (
    <footer className="footer">
      <div className="shell">
        <div className="footer-main">
          <Link className="brand brand-wordmark footer-brand" href="/#home" aria-label={`${brand} home`}>
            <span className="brand-mark" aria-hidden="true">A</span><span>{brand}</span>
          </Link>
          <nav aria-label="Footer navigation">
            {nav.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
          </nav>
          <Link className="button button-outline-dark" href="/book">Plan a ride <span aria-hidden="true">-&gt;</span></Link>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 {brand}. All rights reserved.</p>
          <p><a href={contact.phoneHref}>{contact.displayPhone}</a> / Addis Ababa / Ethiopia</p>
        </div>
      </div>
    </footer>
  );
}

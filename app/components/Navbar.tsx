"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSiteContent } from "../context/SiteContentContext";

const nav = [
  { label: "Home", href: "/#home" },
  { label: "Services", href: "/#services" },
  { label: "Explore Addis", href: "/places" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { brand } = useSiteContent();

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <header className="site-header">
      <Link className="brand brand-wordmark" href="/#home" aria-label={`${brand} home`}>
        <span className="brand-mark" aria-hidden="true">A</span><span>{brand}</span>
      </Link>

      <nav className="desktop-nav" aria-label="Primary navigation">
        {nav.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>

      <Link className="button button-outline nav-action" href="/book">
        Book a ride <span aria-hidden="true">-&gt;</span>
      </Link>

      <button
        className="menu-button"
        type="button"
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={open}
        aria-controls="mobile-navigation"
        onClick={() => setOpen((value) => !value)}
      >
        <span />
        <span />
        <span />
      </button>

      <nav
        className={`mobile-nav ${open ? "is-open" : ""}`}
        id="mobile-navigation"
        aria-label="Mobile navigation"
      >
        {nav.map((item) => (
          <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
            {item.label}
          </Link>
        ))}
        <Link className="button button-lime" href="/book" onClick={() => setOpen(false)}>
          Plan a ride <span aria-hidden="true">-&gt;</span>
        </Link>
      </nav>
    </header>
  );
}

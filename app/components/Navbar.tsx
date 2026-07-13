"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { siteData } from "../data/siteData";

export function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <header className="site-header">
      <Link className="brand" href="/#home" aria-label="Amaha Tours home">
        <img className="brand-logo" src="/logo.png" alt="Amaha Tours" />
      </Link>

      <nav className="desktop-nav" aria-label="Primary navigation">
        {siteData.nav.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>

      <Link className="button button-outline nav-action" href="/#contact">
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
        {siteData.nav.map((item) => (
          <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
            {item.label}
          </Link>
        ))}
        <Link className="button button-lime" href="/#contact" onClick={() => setOpen(false)}>
          Plan a ride <span aria-hidden="true">-&gt;</span>
        </Link>
      </nav>
    </header>
  );
}

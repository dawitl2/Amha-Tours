"use client";

import { useEffect, useState } from "react";
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
      <a className="brand" href="#home" aria-label="Amaha Tours home">
        <span className="logo-placeholder">{siteData.logoLabel}</span>
        <span>Amaha Tours</span>
      </a>

      <nav className="desktop-nav" aria-label="Primary navigation">
        {siteData.nav.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>

      <a className="button button-outline nav-action" href={siteData.contact.whatsappHref}>
        Book a ride <span aria-hidden="true">→</span>
      </a>

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
          <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
            {item.label}
          </a>
        ))}
        <a className="button button-lime" href={siteData.contact.whatsappHref}>
          WhatsApp Amaha <span aria-hidden="true">→</span>
        </a>
      </nav>
    </header>
  );
}


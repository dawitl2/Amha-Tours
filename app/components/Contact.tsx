"use client";

import type { FormEvent } from "react";
import { siteData } from "../data/siteData";

export function Contact() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const message = [
      "Hello Amaha, I would like to ask about a ride.",
      `Name: ${form.get("name") || ""}`,
      `Contact: ${form.get("contact") || ""}`,
      `Pickup: ${form.get("pickup") || ""}`,
      `Destination: ${form.get("destination") || ""}`,
      `Date: ${form.get("date") || ""}`,
      `Message: ${form.get("message") || ""}`,
    ].join("\n");
    window.open(`${siteData.contact.whatsappHref}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="contact section" id="contact" aria-labelledby="contact-title">
      <div className="shell contact-grid">
        <div className="contact-copy">
          <p className="eyebrow light">Ready to plan your ride?</p>
          <h2 id="contact-title">Contact Amaha directly</h2>
          <p>
            Share your travel date, pickup and destination. Amaha will confirm availability, schedule and price with you directly.
          </p>
          <div className="contact-links">
            <a href={siteData.contact.whatsappHref}>
              <span>WhatsApp</span><strong>{siteData.contact.displayPhone}</strong><b aria-hidden="true">↗</b>
            </a>
            <a href={siteData.contact.phoneHref}>
              <span>Phone</span><strong>{siteData.contact.displayPhone}</strong><b aria-hidden="true">↗</b>
            </a>
            <a href={siteData.contact.emailHref}>
              <span>Email</span><strong>{siteData.contact.email}</strong><b aria-hidden="true">↗</b>
            </a>
          </div>
          <p className="placeholder-notice">Placeholder contact details · replace before publishing</p>
        </div>

        <form className="inquiry-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label>
              Your name
              <input name="name" type="text" placeholder="Name" required />
            </label>
            <label>
              Phone or email
              <input name="contact" type="text" placeholder="How can Amaha reply?" required />
            </label>
          </div>
          <div className="form-row">
            <label>
              Pickup location
              <input name="pickup" type="text" placeholder="Airport, hotel or address" />
            </label>
            <label>
              Destination
              <input name="destination" type="text" placeholder="Where would you like to go?" />
            </label>
          </div>
          <label>
            Travel date
            <input name="date" type="date" />
          </label>
          <label>
            Message
            <textarea name="message" rows={4} placeholder="Flight number, preferred time, number of travelers or places you want to visit" />
          </label>
          <button className="button button-lime form-submit" type="submit">
            Prepare WhatsApp message <span aria-hidden="true">→</span>
          </button>
          <p className="form-note">This form does not store a booking. It opens a pre-filled WhatsApp message.</p>
        </form>
      </div>
    </section>
  );
}


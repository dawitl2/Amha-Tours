"use client";

import type { FormEvent } from "react";
import { FaFacebookF, FaInstagram, FaTelegramPlane, FaWhatsapp } from "react-icons/fa";
import { siteData } from "../data/siteData";

export function Contact({ defaultDestination = "" }: { defaultDestination?: string }) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const message = [
      "Hello Amaha, I would like to ask about a ride.",
      `Name: ${form.get("name") || ""}`,
      `Reply to: ${form.get("contact") || ""}`,
      `Pickup: ${form.get("pickup") || ""}`,
      `Destination: ${form.get("destination") || ""}`,
      `Date: ${form.get("date") || ""}`,
      `Message: ${form.get("message") || ""}`,
    ].join("\n");
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="contact section" id="contact" aria-labelledby="contact-title">
      <div className="shell contact-grid">
        <div className="contact-copy">
          <p className="eyebrow light">Ready to plan your ride?</p>
          <h2 id="contact-title">Start the conversation</h2>
          <p>
            Share your date, pickup and destination. The form prepares a message that you can send from WhatsApp without creating an account.
          </p>
          <div className="social-links" aria-label="Social and messaging links">
            <a href={siteData.contact.whatsappHref} target="_blank" rel="noreferrer" aria-label="Open WhatsApp">
              <FaWhatsapp aria-hidden="true" /><span>WhatsApp</span>
            </a>
            <a href={siteData.contact.telegramHref} target="_blank" rel="noreferrer" aria-label="Share with Telegram">
              <FaTelegramPlane aria-hidden="true" /><span>Telegram</span>
            </a>
            <a href={siteData.contact.instagramHref} target="_blank" rel="noreferrer" aria-label="Open Instagram">
              <FaInstagram aria-hidden="true" /><span>Instagram</span>
            </a>
            <a href={siteData.contact.facebookHref} target="_blank" rel="noreferrer" aria-label="Share with Facebook">
              <FaFacebookF aria-hidden="true" /><span>Facebook</span>
            </a>
          </div>
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
              <input name="destination" type="text" defaultValue={defaultDestination} placeholder="Where would you like to go?" />
            </label>
          </div>
          <label>
            Travel date
            <input name="date" type="date" />
          </label>
          <label>
            Message
            <textarea name="message" rows={4} placeholder="Flight number, preferred time, travelers or places you want to visit" />
          </label>
          <button className="button button-lime form-submit" type="submit">
            Prepare WhatsApp message <span aria-hidden="true">-&gt;</span>
          </button>
          <p className="form-note">Your details are not stored by this website. WhatsApp opens so you can choose where to send the message.</p>
        </form>
      </div>
    </section>
  );
}

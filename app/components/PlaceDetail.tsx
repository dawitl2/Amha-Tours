"use client";

import Link from "next/link";
import { FaFacebookF, FaInstagram, FaTelegramPlane, FaWhatsapp } from "react-icons/fa";
import { useSiteContent } from "../context/SiteContentContext";
import { getPlace } from "../data/places";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import { PlaceGallery } from "./PlaceGallery";

export function PlaceDetail({ slug }: { slug: string }) {
  const content = useSiteContent();
  const place = content.places.find((item) => item.slug === slug) ?? getPlace(slug);

  if (!place) {
    return <main className="place-page"><div className="place-topbar"><div className="shell"><Navbar /></div></div><section className="directory-empty section"><h1>Place not found</h1><p>This guide may have moved or been removed.</p><Link className="button button-dark" href="/places">Browse all places</Link></section><Footer /></main>;
  }

  const pageUrl = `${content.domain.replace(/\/$/, "")}/place/?slug=${encodeURIComponent(place.slug)}`;
  const shareText = `Explore ${place.name} in Addis Ababa with ${content.brand}`;

  return (
    <main className="place-page">
      <div className="place-topbar"><div className="shell"><Navbar /></div></div>
      <section className="place-hero" aria-labelledby="place-title">
        <img src={place.images[0]?.src ?? "/Addis highlights.webp"} alt="" aria-hidden="true" />
        <div className="place-hero-shade" />
        <div className="shell place-hero-copy"><Link className="place-back" href="/places">&larr; All Addis places</Link><p className="eyebrow light">Explore Addis / {content.brand}</p><h1 id="place-title">{place.name}</h1><p>{place.kicker}</p></div>
      </section>
      <section className="place-overview section"><div className="shell">
        <div className="place-facts" aria-label="Visit overview"><div><span>From Bole Airport</span><strong>{place.airportDistance}</strong></div><div><span>Typical drive</span><strong>{place.driveTime}</strong></div><div><span>Good visit length</span><strong>{place.visitLength}</strong></div><div><span>Best for</span><strong>{place.bestFor}</strong></div></div>
        <div className="place-intro-grid"><div><p className="eyebrow">Why visit</p><h2>A closer look at {place.name}</h2></div><div className="place-intro-copy"><p>{place.longDescription}</p><p className="place-planning-note">{place.planningNote}</p>{place.officialUrl && <div className="place-link-row"><a className="text-link" href={place.officialUrl} target="_blank" rel="noreferrer">Check current visitor information <span aria-hidden="true">-&gt;</span></a></div>}</div></div>
        <PlaceGallery images={place.images} placeName={place.name} />
      </div></section>
      <section className="place-highlights section"><div className="shell place-highlights-grid"><div className="highlight-panel"><p className="eyebrow light">What you can see</p><h2>Make room for the details</h2><ul>{place.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul></div><div className="activity-list"><p className="eyebrow">What you can do</p>{place.activities.map((activity,index) => <article key={`${activity.title}-${index}`}><span>{String(index + 1).padStart(2,"0")}</span><div><h3>{activity.title}</h3><p>{activity.text}</p></div></article>)}</div></div></section>
      <section className="place-perspective section"><div className="shell place-perspective-inner"><p className="eyebrow">What visitors tend to value</p><blockquote>{place.visitorNote}</blockquote><div className="place-share" aria-label="Share this place"><span>Share the idea</span><a href={`https://wa.me/?text=${encodeURIComponent(`${shareText} ${pageUrl}`)}`} target="_blank" rel="noreferrer"><FaWhatsapp aria-hidden="true" /><span>WhatsApp</span></a><a href={`https://t.me/share/url?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(shareText)}`} target="_blank" rel="noreferrer"><FaTelegramPlane aria-hidden="true" /><span>Telegram</span></a><a href={content.contact.instagramHref} target="_blank" rel="noreferrer"><FaInstagram aria-hidden="true" /><span>Instagram</span></a><a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`} target="_blank" rel="noreferrer"><FaFacebookF aria-hidden="true" /><span>Facebook</span></a></div></div></section>
      <section className="place-cta section"><div className="shell place-cta-inner"><div><p className="eyebrow light">Build it into your day</p><h2>Want to include {place.name}?</h2></div><Link className="button button-lime" href={`/book?destination=${encodeURIComponent(place.name)}`}>Book this place <span aria-hidden="true">-&gt;</span></Link></div></section>
      <Footer />
    </main>
  );
}

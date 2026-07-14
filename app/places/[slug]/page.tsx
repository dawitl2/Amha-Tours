import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaFacebookF, FaInstagram, FaTelegramPlane, FaWhatsapp } from "react-icons/fa";
import { Footer } from "../../components/Footer";
import { Navbar } from "../../components/Navbar";
import { PlaceGallery } from "../../components/PlaceGallery";
import { getPlace, places } from "../../data/places";

export function generateStaticParams() {
  return places.map((place) => ({ slug: place.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const place = getPlace(slug);
  if (!place) return {};
  return {
    title: `${place.name} | Amaha Tours`,
    description: place.description,
  };
}

export default async function PlacePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const place = getPlace(slug);
  if (!place) notFound();

  const pageUrl = `https://amaha-tours-dawits-projects-b5dc96b5.vercel.app/places/${place.slug}`;
  const shareText = `Explore ${place.name} in Addis Ababa with Amaha Tours`;

  return (
    <main className="place-page">
      <div className="place-topbar">
        <div className="shell"><Navbar /></div>
      </div>

      <section className="place-hero" aria-labelledby="place-title">
        <img src={place.images[0].src} alt="" aria-hidden="true" />
        <div className="place-hero-shade" />
        <div className="shell place-hero-copy">
          <Link className="place-back" href="/#explore">&larr; All Addis places</Link>
          <p className="eyebrow light">Explore Addis / Amaha Tours</p>
          <h1 id="place-title">{place.name}</h1>
          <p>{place.kicker}</p>
        </div>
      </section>

      <section className="place-overview section">
        <div className="shell">
          <div className="place-facts" aria-label="Visit overview">
            <div><span>From Bole Airport</span><strong>{place.airportDistance}</strong></div>
            <div><span>Typical drive</span><strong>{place.driveTime}</strong></div>
            <div><span>Good visit length</span><strong>{place.visitLength}</strong></div>
            <div><span>Best for</span><strong>{place.bestFor}</strong></div>
          </div>

          <div className="place-intro-grid">
            <div>
              <p className="eyebrow">Why visit</p>
              <h2>A closer look at {place.name}</h2>
            </div>
            <div className="place-intro-copy">
              <p>{place.longDescription}</p>
              <p className="place-planning-note">{place.planningNote}</p>
              <div className="place-link-row">
                <a className="text-link" href={place.officialUrl} target="_blank" rel="noreferrer">Check current visitor information <span aria-hidden="true">-&gt;</span></a>
              </div>
            </div>
          </div>

          <PlaceGallery images={place.images} placeName={place.name} />
        </div>
      </section>

      <section className="place-highlights section">
        <div className="shell place-highlights-grid">
          <div className="highlight-panel">
            <p className="eyebrow light">What you can see</p>
            <h2>Make room for the details</h2>
            <ul>
              {place.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
            </ul>
          </div>
          <div className="activity-list">
            <p className="eyebrow">What you can do</p>
            {place.activities.map((activity, index) => (
              <article key={activity.title}>
                <span>0{index + 1}</span>
                <div><h3>{activity.title}</h3><p>{activity.text}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="place-perspective section">
        <div className="shell place-perspective-inner">
          <p className="eyebrow">What visitors tend to value</p>
          <blockquote>{place.visitorNote}</blockquote>
          <div className="place-share" aria-label="Share this place">
            <span>Share the idea</span>
            <a href={`https://wa.me/?text=${encodeURIComponent(`${shareText} ${pageUrl}`)}`} target="_blank" rel="noreferrer"><FaWhatsapp aria-hidden="true" /><span>WhatsApp</span></a>
            <a href={`https://t.me/share/url?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(shareText)}`} target="_blank" rel="noreferrer"><FaTelegramPlane aria-hidden="true" /><span>Telegram</span></a>
            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer"><FaInstagram aria-hidden="true" /><span>Instagram</span></a>
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`} target="_blank" rel="noreferrer"><FaFacebookF aria-hidden="true" /><span>Facebook</span></a>
          </div>
        </div>
      </section>

      <section className="place-cta section">
        <div className="shell place-cta-inner">
          <div><p className="eyebrow light">Build it into your day</p><h2>Want to include {place.name}?</h2></div>
          <Link className="button button-lime" href={`/book?destination=${encodeURIComponent(place.name)}`}>Book this place <span aria-hidden="true">-&gt;</span></Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}

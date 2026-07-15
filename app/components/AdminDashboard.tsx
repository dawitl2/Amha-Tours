"use client";

import { useCallback, useEffect, useState, type FormEvent, type ReactNode } from "react";
import Link from "next/link";
import { defaultContent, type SiteContent } from "../data/content";
import type { Place } from "../data/places";

type Session = { authenticated: boolean; admin?: { username: string; mustChangePassword: boolean }; csrfToken?: string | null };
type Tab = "identity" | "hero" | "services" | "places" | "more";

function Field({ label, value, onChange, multiline = false, type = "text" }: { label: string; value: string; onChange: (value: string) => void; multiline?: boolean; type?: string }) {
  return <label className="admin-field"><span>{label}</span>{multiline ? <textarea value={value} rows={4} onChange={(event) => onChange(event.target.value)} /> : <input type={type} value={value} onChange={(event) => onChange(event.target.value)} />}</label>;
}

function Panel({ title, intro, children }: { title: string; intro?: string; children: ReactNode }) {
  return <section className="admin-panel"><div className="admin-panel-heading"><div><h2>{title}</h2>{intro && <p>{intro}</p>}</div></div>{children}</section>;
}

const blankPlace: Place = {
  slug: "new-place", name: "New place", kicker: "Add a short introduction", cardMeta: "Culture / Addis Ababa", description: "Short card description.", longDescription: "Longer visitor description.",
  images: [{ src: "/Addis highlights.webp", alt: "Addis Ababa destination" }], airportDistance: "Approx. 10 km", driveTime: "30-45 min", visitLength: "2-3 hours", bestFor: "First-time visitors",
  highlights: ["Add a highlight"], activities: [{ title: "Add an activity", text: "Describe what visitors can do." }], visitorNote: "What visitors tend to value.", planningNote: "Times and access can change. Confirm before departure.", officialUrl: "https://",
};

export function AdminDashboard() {
  const [session, setSession] = useState<Session>({ authenticated: false });
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [tab, setTab] = useState<Tab>("identity");
  const [selectedPlace, setSelectedPlace] = useState(0);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  const loadSession = useCallback(async () => {
    try {
      const response = await fetch("/api/session.php", { credentials: "same-origin", cache: "no-store" });
      const data = await response.json();
      if (!data.ok) throw new Error(data.error ?? "Dashboard is unavailable.");
      setSession(data);
      if (data.authenticated) {
        const contentResponse = await fetch("/api/content.php", { credentials: "same-origin", cache: "no-store" });
        const contentData = await contentResponse.json();
        if (contentData.content) setContent({ ...defaultContent, ...contentData.content });
      }
    } catch (error) {
      setSession({ authenticated: false });
      setMessage(error instanceof Error ? error.message : "Dashboard is unavailable.");
    }
  }, []);

  useEffect(() => {
    // The first state update happens only after the session request resolves.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void loadSession();
  }, [loadSession]);

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    await run(async () => {
      const response = await fetch("/api/login.php", { method: "POST", credentials: "same-origin", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ username: form.get("username"), password: form.get("password"), remember: form.get("remember") === "on" }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? "Sign in failed.");
      setSession(data);
      await loadSession();
    });
  }

  async function changePassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const next = String(form.get("newPassword") ?? "");
    if (next !== form.get("confirmPassword")) return setMessage("The new passwords do not match.");
    await run(async () => {
      const response = await api("/api/change-password.php", { currentPassword: form.get("currentPassword"), newPassword: next });
      setSession((current) => ({ ...current, ...response, authenticated: true }));
      setMessage("Password changed. The dashboard is ready.");
    });
  }

  async function save() {
    await run(async () => {
      await api("/api/save-content.php", { content });
      setMessage("Changes saved and published.");
    });
  }

  async function logout() {
    await run(async () => {
      await api("/api/logout.php", {});
      setSession({ authenticated: false });
      setMessage("");
    });
  }

  async function api(url: string, body: unknown) {
    const response = await fetch(url, { method: "POST", credentials: "same-origin", headers: { "Content-Type": "application/json", "X-CSRF-Token": session?.csrfToken ?? "" }, body: JSON.stringify(body) });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error ?? "The request failed.");
    return data;
  }

  async function run(action: () => Promise<void>) {
    setBusy(true); setMessage("");
    try { await action(); } catch (error) { setMessage(error instanceof Error ? error.message : "The request failed."); } finally { setBusy(false); }
  }

  async function upload(file: File, applyUrl: (url: string) => void) {
    const form = new FormData(); form.append("image", file);
    await run(async () => {
      const response = await fetch("/api/upload.php", { method: "POST", credentials: "same-origin", headers: { "X-CSRF-Token": session?.csrfToken ?? "" }, body: form });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? "Upload failed.");
      applyUrl(data.url); setMessage("Image uploaded. Save changes to publish it.");
    });
  }

  const setSection = <K extends keyof SiteContent>(key: K, value: SiteContent[K]) => setContent((current) => ({ ...current, [key]: value }));
  const updatePlace = (place: Place) => setSection("places", content.places.map((item, index) => index === selectedPlace ? place : item));
  const place = content.places[selectedPlace] ?? blankPlace;

  if (!session.authenticated) return <main className="admin-shell admin-auth-shell"><section className="admin-auth-card"><div className="admin-brand"><span>A</span><strong>Amha Tours</strong></div><p className="admin-kicker">Private administration</p><h1>Sign in to manage the site</h1><form className="admin-form" onSubmit={login}><label>Username<input name="username" autoComplete="username" defaultValue="amha" required /></label><label>Password<input name="password" type="password" autoComplete="current-password" required /></label><label className="admin-check"><input name="remember" type="checkbox" /> Keep me signed in on this browser</label><button className="admin-primary" disabled={busy}>{busy ? "Signing in..." : "Sign in"}</button></form><p className="admin-hint">First deployment? <Link href="/admin/setup">Run the one-time setup</Link>.</p>{message && <p className="admin-message error" role="alert">{message}</p>}</section></main>;
  if (session.admin?.mustChangePassword) return <main className="admin-shell admin-auth-shell"><section className="admin-auth-card"><div className="admin-brand"><span>A</span><strong>Amha Tours</strong></div><p className="admin-kicker">Required security step</p><h1>Replace the initial password</h1><p>Choose a unique password with at least 10 characters, including letters and numbers.</p><form className="admin-form" onSubmit={changePassword}><label>Current password<input name="currentPassword" type="password" required /></label><label>New password<input name="newPassword" type="password" minLength={10} required /></label><label>Confirm new password<input name="confirmPassword" type="password" minLength={10} required /></label><button className="admin-primary" disabled={busy}>{busy ? "Updating..." : "Change password"}</button></form>{message && <p className="admin-message error" role="alert">{message}</p>}</section></main>;

  return (
    <main className="admin-shell">
      <header className="admin-topbar"><div className="admin-brand"><span>A</span><strong>Amha Tours</strong><small>Content dashboard</small></div><div><a href="/" target="_blank" rel="noreferrer">View website</a><button type="button" onClick={logout}>Sign out</button></div></header>
      <div className="admin-workspace">
        <nav className="admin-tabs" aria-label="Dashboard sections">{([['identity','Business & contact'],['hero','Hero'],['services','Services'],['places','Places'],['more','Routes & reviews']] as [Tab,string][]).map(([key,label]) => <button type="button" className={tab === key ? "is-active" : ""} key={key} onClick={() => setTab(key)}>{label}</button>)}</nav>
        <div className="admin-content">
          {tab === "identity" && <Panel title="Business, person and contact" intro="These details are reused across the navigation, about section, booking form and footer."><div className="admin-grid"><Field label="Business name" value={content.brand} onChange={(brand) => setSection("brand", brand)} /><Field label="Live domain" value={content.domain} onChange={(domain) => setSection("domain", domain)} /><Field label="Person name" value={content.person.name} onChange={(name) => setSection("person", { ...content.person, name })} /><Field label="Role" value={content.person.role} onChange={(role) => setSection("person", { ...content.person, role })} /><Field label="Phone as displayed" value={content.contact.displayPhone} onChange={(displayPhone) => setSection("contact", { ...content.contact, displayPhone })} /><Field label="Telephone link" value={content.contact.phoneHref} onChange={(phoneHref) => setSection("contact", { ...content.contact, phoneHref })} /><Field label="WhatsApp message link" value={content.contact.whatsappHref} onChange={(whatsappHref) => setSection("contact", { ...content.contact, whatsappHref })} /><Field label="WhatsApp base link" value={content.contact.whatsappBaseHref} onChange={(whatsappBaseHref) => setSection("contact", { ...content.contact, whatsappBaseHref })} /><Field label="Telegram link" value={content.contact.telegramHref} onChange={(telegramHref) => setSection("contact", { ...content.contact, telegramHref })} /><Field label="Instagram link" value={content.contact.instagramHref} onChange={(instagramHref) => setSection("contact", { ...content.contact, instagramHref })} /><Field label="Facebook link" value={content.contact.facebookHref} onChange={(facebookHref) => setSection("contact", { ...content.contact, facebookHref })} /><Field label="Driver photo URL" value={content.person.photo} onChange={(photo) => setSection("person", { ...content.person, photo })} /></div><ImageUpload onUpload={(file) => upload(file, (photo) => setSection("person", { ...content.person, photo }))} /><Field label="Short introduction" value={content.person.intro} multiline onChange={(intro) => setSection("person", { ...content.person, intro })} /><Field label="About description" value={content.person.description} multiline onChange={(description) => setSection("person", { ...content.person, description })} /></Panel>}
          {tab === "hero" && <Panel title="Main hero" intro="Change the image and message shown at the top of the homepage."><div className="admin-grid"><Field label="Eyebrow" value={content.hero.eyebrow} onChange={(eyebrow) => setSection("hero", { ...content.hero, eyebrow })} /><Field label="Hero image URL" value={content.hero.image} onChange={(image) => setSection("hero", { ...content.hero, image })} /><Field label="Desktop title" value={content.hero.title} onChange={(title) => setSection("hero", { ...content.hero, title })} /><Field label="Phone title" value={content.hero.mobileTitle} onChange={(mobileTitle) => setSection("hero", { ...content.hero, mobileTitle })} /></div><ImageUpload onUpload={(file) => upload(file, (image) => setSection("hero", { ...content.hero, image }))} /><Field label="Desktop introduction" value={content.hero.intro} multiline onChange={(intro) => setSection("hero", { ...content.hero, intro })} /><Field label="Phone introduction" value={content.hero.mobileIntro} multiline onChange={(mobileIntro) => setSection("hero", { ...content.hero, mobileIntro })} />{content.hero.steps.map((step,index) => <div className="admin-repeat" key={index}><Field label={`Step ${index + 1} title`} value={step.title} onChange={(title) => setSection("hero", { ...content.hero, steps: content.hero.steps.map((item,i) => i === index ? { ...item, title } : item) })} /><Field label="Description" value={step.description} onChange={(description) => setSection("hero", { ...content.hero, steps: content.hero.steps.map((item,i) => i === index ? { ...item, description } : item) })} /></div>)}</Panel>}
          {tab === "services" && <Panel title="Services" intro="Add, remove, rename or describe the services offered."><Field label="Section introduction" value={content.servicesIntro} multiline onChange={(servicesIntro) => setSection("servicesIntro", servicesIntro)} />{content.services.map((service,index) => <div className="admin-list-card" key={`${service.number}-${index}`}><div className="admin-grid four"><Field label="Number" value={service.number} onChange={(number) => setSection("services", content.services.map((item,i) => i === index ? { ...item, number } : item))} /><Field label="Symbol" value={service.symbol} onChange={(symbol) => setSection("services", content.services.map((item,i) => i === index ? { ...item, symbol } : item))} /><Field label="Name" value={service.title} onChange={(title) => setSection("services", content.services.map((item,i) => i === index ? { ...item, title } : item))} /><Field label="Description" value={service.description} onChange={(description) => setSection("services", content.services.map((item,i) => i === index ? { ...item, description } : item))} /></div><button className="admin-danger" type="button" onClick={() => setSection("services", content.services.filter((_,i) => i !== index))}>Remove service</button></div>)}<button className="admin-secondary" type="button" onClick={() => setSection("services", [...content.services, { number: String(content.services.length + 1).padStart(2,'0'), symbol: '+', title: 'New service', description: 'Describe this service.' }])}>+ Add service</button></Panel>}
          {tab === "places" && <Panel title="Places" intro="Edit every place guide, its images, facts, highlights and activities."><div className="admin-place-layout"><aside>{content.places.map((item,index) => <button type="button" className={selectedPlace === index ? "is-active" : ""} onClick={() => setSelectedPlace(index)} key={`${item.slug}-${index}`}>{item.name}</button>)}<button type="button" onClick={() => { setSection("places", [...content.places, { ...blankPlace }]); setSelectedPlace(content.places.length); }}>+ Add place</button></aside><div className="admin-place-editor"><div className="admin-grid"><Field label="Name" value={place.name} onChange={(name) => updatePlace({ ...place, name })} /><Field label="URL slug" value={place.slug} onChange={(slug) => updatePlace({ ...place, slug: slug.toLowerCase().replace(/[^a-z0-9-]/g,'-') })} /><Field label="Card categories" value={place.cardMeta} onChange={(cardMeta) => updatePlace({ ...place, cardMeta })} /><Field label="Kicker" value={place.kicker} onChange={(kicker) => updatePlace({ ...place, kicker })} /><Field label="Airport distance" value={place.airportDistance} onChange={(airportDistance) => updatePlace({ ...place, airportDistance })} /><Field label="Drive time" value={place.driveTime} onChange={(driveTime) => updatePlace({ ...place, driveTime })} /><Field label="Visit length" value={place.visitLength} onChange={(visitLength) => updatePlace({ ...place, visitLength })} /><Field label="Best for" value={place.bestFor} onChange={(bestFor) => updatePlace({ ...place, bestFor })} /><Field label="Official URL" value={place.officialUrl} onChange={(officialUrl) => updatePlace({ ...place, officialUrl })} /></div><Field label="Card description" value={place.description} multiline onChange={(description) => updatePlace({ ...place, description })} /><Field label="Full description" value={place.longDescription} multiline onChange={(longDescription) => updatePlace({ ...place, longDescription })} /><Field label="Visitor perspective" value={place.visitorNote} multiline onChange={(visitorNote) => updatePlace({ ...place, visitorNote })} /><Field label="Planning note" value={place.planningNote} multiline onChange={(planningNote) => updatePlace({ ...place, planningNote })} /><Field label="Highlights (one per line)" value={place.highlights.join('\n')} multiline onChange={(value) => updatePlace({ ...place, highlights: value.split('\n').filter(Boolean) })} /><h3>Images</h3>{place.images.map((item,index) => <div className="admin-repeat" key={`${item.src}-${index}`}><Field label="Image URL" value={item.src} onChange={(src) => updatePlace({ ...place, images: place.images.map((image,i) => i === index ? { ...image, src } : image) })} /><Field label="Alt text" value={item.alt} onChange={(alt) => updatePlace({ ...place, images: place.images.map((image,i) => i === index ? { ...image, alt } : image) })} /><button className="admin-danger" type="button" onClick={() => updatePlace({ ...place, images: place.images.filter((_,i) => i !== index) })}>Remove</button></div>)}<ImageUpload label="Upload and add image" onUpload={(file) => upload(file, (src) => updatePlace({ ...place, images: [...place.images, { src, alt: `${place.name} visitor image` }] }))} /><h3>Activities</h3>{place.activities.map((activity,index) => <div className="admin-repeat" key={index}><Field label="Activity" value={activity.title} onChange={(title) => updatePlace({ ...place, activities: place.activities.map((item,i) => i === index ? { ...item, title } : item) })} /><Field label="Description" value={activity.text} onChange={(text) => updatePlace({ ...place, activities: place.activities.map((item,i) => i === index ? { ...item, text } : item) })} /></div>)}<button className="admin-secondary" type="button" onClick={() => updatePlace({ ...place, activities: [...place.activities, { title: 'New activity', text: 'Describe the activity.' }] })}>+ Add activity</button><button className="admin-danger block" type="button" onClick={() => { setSection("places", content.places.filter((_,i) => i !== selectedPlace)); setSelectedPlace(0); }}>Delete this place</button></div></div></Panel>}
          {tab === "more" && <Panel title="Routes, pickup areas and testimonials" intro="Maintain the supporting content that makes the homepage more engaging."><h3>Journey cards</h3>{content.journeys.map((item,index) => <div className="admin-list-card" key={index}><div className="admin-grid"><Field label="Name" value={item.name} onChange={(name) => setSection("journeys", content.journeys.map((entry,i) => i === index ? { ...entry, name } : entry))} /><Field label="Meta" value={item.meta} onChange={(meta) => setSection("journeys", content.journeys.map((entry,i) => i === index ? { ...entry, meta } : entry))} /><Field label="Image URL" value={item.image} onChange={(image) => setSection("journeys", content.journeys.map((entry,i) => i === index ? { ...entry, image } : entry))} /></div><ImageUpload onUpload={(file) => upload(file, (image) => setSection("journeys", content.journeys.map((entry,i) => i === index ? { ...entry, image } : entry)))} /></div>)}<h3>Hotel and pickup areas</h3><Field label="One area per line" value={content.hotels.join('\n')} multiline onChange={(value) => setSection("hotels", value.split('\n').filter(Boolean))} /><h3>Testimonials</h3>{content.testimonials.map((item,index) => <div className="admin-list-card" key={index}><div className="admin-grid"><Field label="Guest name" value={item.name} onChange={(name) => setSection("testimonials", content.testimonials.map((entry,i) => i === index ? { ...entry, name } : entry))} /><Field label="Trip" value={item.trip} onChange={(trip) => setSection("testimonials", content.testimonials.map((entry,i) => i === index ? { ...entry, trip } : entry))} /><Field label="Image URL" value={item.image} onChange={(image) => setSection("testimonials", content.testimonials.map((entry,i) => i === index ? { ...entry, image } : entry))} /></div><Field label="Quote" value={item.quote} multiline onChange={(quote) => setSection("testimonials", content.testimonials.map((entry,i) => i === index ? { ...entry, quote } : entry))} /><ImageUpload onUpload={(file) => upload(file, (image) => setSection("testimonials", content.testimonials.map((entry,i) => i === index ? { ...entry, image } : entry)))} /></div>)}</Panel>}
        </div>
      </div>
      <div className="admin-savebar"><p className={message.toLowerCase().includes("fail") || message.toLowerCase().includes("incorrect") ? "error" : ""} role="status">{message}</p><button className="admin-primary" type="button" onClick={save} disabled={busy}>{busy ? "Working..." : "Save and publish"}</button></div>
    </main>
  );
}

function ImageUpload({ onUpload, label = "Upload replacement image" }: { onUpload: (file: File) => void; label?: string }) {
  return <label className="admin-upload"><span>{label}</span><input type="file" accept="image/jpeg,image/png,image/webp" onChange={(event) => { const file = event.target.files?.[0]; if (file) onUpload(file); event.currentTarget.value = ""; }} /></label>;
}

import { siteData } from "../data/siteData";

export function Footer() {
  return (
    <footer className="footer">
      <div className="shell">
        <div className="footer-main">
          <a className="brand footer-brand" href="#home" aria-label="Amaha Tours home">
            <span className="logo-placeholder">{siteData.logoLabel}</span>
            <span>Amaha Tours</span>
          </a>
          <nav aria-label="Footer navigation">
            {siteData.nav.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
          </nav>
          <a className="button button-outline-dark" href={siteData.contact.whatsappHref}>WhatsApp Amaha <span aria-hidden="true">→</span></a>
        </div>
        <div className="footer-bottom">
          <p>© 2026 Amaha Tours. All rights reserved.</p>
          <p>{siteData.contact.displayPhone} · {siteData.contact.email} · placeholder details</p>
        </div>
      </div>
    </footer>
  );
}


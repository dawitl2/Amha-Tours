import { siteData } from "../data/siteData";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="footer">
      <div className="shell">
        <div className="footer-main">
          <Link className="brand footer-brand" href="/#home" aria-label="Amaha Tours home">
            <img className="brand-logo" src="/logo.png" alt="Amaha Tours" />
          </Link>
          <nav aria-label="Footer navigation">
            {siteData.nav.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
          </nav>
          <Link className="button button-outline-dark" href="/book">Plan a ride <span aria-hidden="true">-&gt;</span></Link>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 Amaha Tours. All rights reserved.</p>
          <p>Addis Ababa / Airport transfers / Private city routes</p>
        </div>
      </div>
    </footer>
  );
}

import { site } from "@/lib/site";
import { whatsappLink } from "@/lib/whatsapp";
import { Wordmark } from "./Wordmark";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer__inner">
        <div className="footer__brand">
          <Wordmark gradientId="bm-footer" className="brand--footer" />
          <p className="footer__tag">{site.tagline}</p>
        </div>

        <div className="footer__cols">
          <div className="footer__col">
            <h4>Collection</h4>
            <a href="#collection">Skin Care</a>
            <a href="#collection">Hair Care</a>
            <a href="#collection">Body &amp; Lips</a>
          </div>

          <div className="footer__col">
            <h4>Reach Us</h4>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
              WhatsApp · {site.whatsappDisplay}
            </a>
            <a href={site.instagramUrl} target="_blank" rel="noopener noreferrer">
              Instagram · @{site.instagramHandle}
            </a>
          </div>

          <div className="footer__col">
            <h4>Good to Know</h4>
            <p className="footer__note">
              Natural formulations can vary slightly in colour and scent between batches — that is
              the herbs talking, not a defect.
            </p>
          </div>
        </div>
      </div>

      <div className="shell footer__base">
        <p>
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
        <p>Handcrafted in India 🇮🇳</p>
      </div>
    </footer>
  );
}

import Link from "next/link"
import { site } from "@/lib/site";
import { whatsappLink } from "@/lib/whatsapp";
import { Wordmark } from "./Wordmark";

/**
 * Official brand marks, served from /public/social.
 *
 * YouTube, WhatsApp and Facebook are the platforms' own colour icons as
 * supplied; Instagram is the same glyph on Instagram's brand gradient, built
 * to match because no Instagram file was supplied with the others.
 */
const SOCIALS = [
  { key: "whatsapp", href: whatsappLink(), label: `Message ${site.name} on WhatsApp`, text: site.whatsappDisplay },
  { key: "instagram", href: site.instagramUrl, label: `${site.name} on Instagram`, text: `@${site.instagramHandle}` },
  { key: "youtube", href: site.youtubeUrl, label: `${site.name} on YouTube`, text: `@${site.youtubeHandle}` },
  { key: "facebook", href: site.facebookUrl, label: `${site.name} on Facebook`, text: site.facebookName },
] as const

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer__inner">
        <div className="footer__brand">
          <Wordmark className="brand--footer" />
          <p className="footer__tag">{site.tagline}</p>
        </div>

        <div className="footer__cols">
          <div className="footer__col">
            <h4>Collection</h4>
            <Link href="/#collection">Skin Care</Link>
            <Link href="/#collection">Hair Care</Link>
            <Link href="/#collection">Body &amp; Lips</Link>
          </div>

          <div className="footer__col">
            <h4>Information</h4>
            <Link href="/about">About Us</Link>
            <Link href="/terms">Terms &amp; Conditions</Link>
            <Link href="/terms-of-use">Terms of Use</Link>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/disclaimer">Disclaimer</Link>
          </div>

          <div className="footer__col">
            <h4>Reach Us</h4>
            {SOCIALS.map(({ key, href, label, text }) => (
              <a
                key={key}
                className="footer__social"
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
              >
                {/*
                  Plain <img>, not next/image: the Cloudinary loader rewrites
                  every next/image src to a Cloudinary public ID, and these
                  brand marks live in /public rather than the asset library.
                */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="footer__ico" src={`/social/${key}.${key === "facebook" ? "png" : "svg"}`} alt="" width={18} height={18} loading="lazy" decoding="async" />
                <span>{text}</span>
              </a>
            ))}
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

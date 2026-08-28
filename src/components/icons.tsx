import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function WhatsAppIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24a8.2 8.2 0 0 1 8.24 8.25c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.79.97-.14.16-.29.18-.54.06-.25-.13-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.48c-.16 0-.43.06-.65.31-.22.25-.86.84-.86 2.05s.88 2.38 1 2.54c.12.17 1.73 2.65 4.2 3.71.59.25 1.04.4 1.4.52.59.19 1.12.16 1.54.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.11-.22-.17-.47-.29Z" />
    </svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16Zm0 5.68A4.16 4.16 0 1 0 16.16 12 4.16 4.16 0 0 0 12 7.84Zm0 6.86A2.7 2.7 0 1 1 14.7 12 2.7 2.7 0 0 1 12 14.7Zm5.3-7.03a.97.97 0 1 1-.97-.97.97.97 0 0 1 .97.97Z" />
    </svg>
  );
}

/** Shared gold gradient used by the trust icons. Rendered once, near <body>. */
export function GoldGradientDefs() {
  return (
    <svg width="0" height="0" aria-hidden="true" focusable="false" style={{ position: "absolute" }}>
      <defs>
        <linearGradient id="goldStroke" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F0D48F" />
          <stop offset="48%" stopColor="#C8912F" />
          <stop offset="100%" stopColor="#8A5E14" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function StrokeIcon({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="url(#goldStroke)"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

export const LeafIcon = () => (
  <StrokeIcon>
    <path d="M16 29V12" />
    <path d="M16 16c-6.4 0-10-4.2-10-10.6 6.4 0 10 4.2 10 10.6Z" />
    <path d="M16 21c5.6 0 8.8-3.7 8.8-9.3-5.6 0-8.8 3.7-8.8 9.3Z" />
    <path d="M16 12c-.8-1.4-2-2.4-3.4-3" />
  </StrokeIcon>
);

export const MortarIcon = () => (
  <StrokeIcon>
    <path d="M5.5 13.5h21c0 6-3.8 10.6-9 11.3V28" />
    <path d="M5.5 13.5c0 6 3.8 10.6 9 11.3V28" />
    <path d="M11 28h10" />
    <path d="M20 13.5 25.2 6" />
    <path d="M23.6 4.2a2.6 2.6 0 1 1 3.6 3.7l-1.4 1.2-3.4-3.4Z" />
  </StrokeIcon>
);

export const RabbitIcon = () => (
  <StrokeIcon>
    <path d="M12.6 13.6C11 10.4 9.7 7 9.7 5.2c0-1.5.8-2.2 1.8-2 1.6.4 2.9 3.8 3.5 7.4" />
    <path d="M18.9 13.9c1.9-3 3.6-6.2 3.9-7.9.3-1.5-.4-2.3-1.4-2.3-1.6.1-3.4 3.2-4.5 6.7" />
    <path d="M22.4 22.2c0 3.3-2.9 5.6-6.5 5.6s-6.5-2.3-6.5-5.6c0-4.4 2.9-8.4 6.5-8.4s6.5 4 6.5 8.4Z" />
    <path d="M13.6 20.4h.01M18.4 20.4h.01" />
    <path d="M16 22.8v1.3" />
  </StrokeIcon>
);

export const BookIcon = () => (
  <StrokeIcon>
    <path d="M16 9.4C13.6 7.3 10.4 6.3 7 6.3H4.2v17.4H7c3.4 0 6.6 1 9 3.1" />
    <path d="M16 9.4c2.4-2.1 5.6-3.1 9-3.1h2.8v17.4H25c-3.4 0-6.6 1-9 3.1" />
    <path d="M16 9.4v17.4" />
    <path d="M7.8 11.6h4.4M7.8 15.4h4.4M19.8 11.6h4.4M19.8 15.4h4.4" />
  </StrokeIcon>
);

/** The tree glyph that sits between VEE and REE in the wordmark. */
export function TreeMark({ gradientId }: { gradientId: string }) {
  return (
    <svg viewBox="0 0 40 64" role="presentation" aria-hidden="true">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#E8C46B" />
          <stop offset="55%" stopColor="#C8912F" />
          <stop offset="100%" stopColor="#7A5312" />
        </linearGradient>
      </defs>
      <path d="M20 2 L34 24 H6 Z" fill={`url(#${gradientId})`} />
      <rect x="18.2" y="22" width="3.6" height="22" fill={`url(#${gradientId})`} />
      <g stroke={`url(#${gradientId})`} strokeWidth={2} strokeLinecap="round" fill="none">
        <path d="M20 43 C20 50 14 51 9 60" />
        <path d="M20 43 C20 50 26 51 31 60" />
        <path d="M20 43 L20 61" />
        <path d="M15.5 49 C12 52 11 56 10.4 60" />
        <path d="M24.5 49 C28 52 29 56 29.6 60" />
      </g>
    </svg>
  );
}

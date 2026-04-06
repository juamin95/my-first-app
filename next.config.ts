import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https://bnzpdujupmmrwcbunbql.supabase.co",
      "font-src 'self'",
      "connect-src 'self' https://bnzpdujupmmrwcbunbql.supabase.co",
      "frame-ancestors 'none'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "bnzpdujupmmrwcbunbql.supabase.co",
      },
    ],
  },
  async redirects() {
    return [
      // ── non-www → www (canonical domain) ──────────────────────────
      {
        source: "/:path*",
        has: [{ type: "host", value: "gruenschnitt-amini.de" }],
        destination: "https://www.gruenschnitt-amini.de/:path*",
        permanent: true,
      },
      // ── Webflow → Next.js: Projektgalerie ─────────────────────────
      // Webflow used /galerie, /referenzen, or /portfolio
      {
        source: "/galerie",
        destination: "/projekte",
        permanent: true,
      },
      {
        source: "/referenzen",
        destination: "/projekte",
        permanent: true,
      },
      {
        source: "/portfolio",
        destination: "/projekte",
        permanent: true,
      },
      // ── Webflow → Next.js: Über uns ───────────────────────────────
      // Webflow sometimes appends -0 / -1 to deduplicate slugs
      {
        source: "/team",
        destination: "/ueber-uns",
        permanent: true,
      },
      {
        source: "/ueber-uns-0",
        destination: "/ueber-uns",
        permanent: true,
      },
      {
        source: "/ueber-uns-1",
        destination: "/ueber-uns",
        permanent: true,
      },
      // ── Webflow → Next.js: Leistungen ─────────────────────────────
      // Old flat /leistungen → new split structure (gewerbe as default)
      {
        source: "/leistungen",
        destination: "/leistungen/gewerbe",
        permanent: true,
      },
      // ── Webflow → Next.js: Kontakt ────────────────────────────────
      {
        source: "/contact",
        destination: "/kontakt",
        permanent: true,
      },
      {
        source: "/anfrage",
        destination: "/kontakt",
        permanent: true,
      },
      // ── Webflow → Next.js: Blog / News (falls vorhanden) ──────────
      {
        source: "/blog",
        destination: "/",
        permanent: true,
      },
      {
        source: "/news",
        destination: "/",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;

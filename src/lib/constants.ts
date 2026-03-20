export const SITE_NAME = "Psylog";
export const SITE_TAGLINE = "Klinik Psikolog";

export const NAV_LINKS = [
  { label: "Ana Sayfa", href: "/" },
  { label: "Hakkımda", href: "/hakkimda" },
  { label: "Makaleler", href: "/makaleler" },
  { label: "İletişim", href: "/iletisim" },
] as const;

export type NavLink = (typeof NAV_LINKS)[number];

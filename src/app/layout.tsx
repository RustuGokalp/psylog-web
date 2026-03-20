import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://psylog.com.tr"
  ),
  title: {
    default: "Psylog | Klinik Psikolog",
    template: "%s | Psylog",
  },
  description:
    "Klinik psikolog portföyü ve makale platformu. Psikoloji, terapi ve zihinsel sağlık üzerine profesyonel içerikler.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: "Psylog",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={`${inter.variable} ${lora.variable} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}

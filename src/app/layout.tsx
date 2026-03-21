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
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://tugcetekin.com",
  ),
  title: {
    default: "Tuğçe Tekin | Klinik Psikolog",
    template: "%s | Tuğçe Tekin",
  },
  description:
    "Klinik Psikolog Tuğçe Tekin'in resmi web sitesi. Psikoloji, terapi ve zihinsel sağlık üzerine profesyonel makaleler ve danışmanlık bilgisi.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: "Tuğçe Tekin",
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

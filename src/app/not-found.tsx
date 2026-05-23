import type { Metadata } from "next";
import { Caveat } from "next/font/google";
import Link from "next/link";
import { Home } from "lucide-react";
import { createMetadata } from "@/lib/metadata";
import HotAirBalloon from "@/components/icons/hot-air-balloon";
import Cloud from "@/components/icons/cloud";
import WaveDivider from "@/components/icons/wave-divider";

const caveat = Caveat({
  variable: "--font-handwriting",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  ...createMetadata({
    title: "Sayfa Bulunamadı",
    description:
      "Aradığınız sayfa mevcut değil. Ana sayfaya dönerek devam edebilirsiniz.",
  }),
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div
      className={`${caveat.variable} nf-scene relative min-h-screen overflow-hidden flex flex-col`}
    >
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute inset-0 nf-dot-grid" aria-hidden="true" />

        <Cloud
          color="#eecdd6"
          className="absolute top-[8%] left-[-4%] w-72 opacity-35"
        />

        <Cloud
          color="#d4ccf0"
          className="absolute top-[22%] right-[-2%] w-64 opacity-30"
        />

        <Cloud
          color="#eecdd6"
          className="absolute top-[55%] right-[5%] w-44 opacity-20"
        />

        <Cloud
          color="#d4ccf0"
          className="absolute top-[48%] left-[6%] w-52 opacity-25"
        />

        <Cloud
          color="#eecdd6"
          className="absolute top-[70%] left-[-3%] w-60 opacity-20"
        />

        <WaveDivider
          color="#eecdd6"
          secondaryColor="#d4ccf0"
          className="absolute bottom-0 left-0 w-full"
        />
      </div>

      {/* ── Main content ── */}
      <main className="flex flex-1 flex-col items-center justify-center text-center px-4 py-24">
        <div className="mx-auto max-w-xl flex flex-col items-center">
          <div className="animate-float-balloon w-40 sm:w-52 mx-auto relative">
            <HotAirBalloon className="w-full h-auto" />
            <Cloud
              color="#d4ccf0"
              className="absolute -left-16 bottom-4 w-24 opacity-40"
            />
          </div>

          <p className="nf-404 mt-6 text-7xl sm:text-8xl leading-none">404</p>

          <h1 className="nf-title mt-4 text-2xl sm:text-3xl font-display leading-snug">
            Bazen rüzgâr bizi beklemediğimiz yerlere taşır.
          </h1>

          <p className="nf-text mt-4 max-w-md mx-auto text-base leading-relaxed">
            Bu balon planladığı yoldan biraz savruldu — tıpkı kimi zaman
            kendimizi beklemediğimiz bir yerde bulmamız gibi. Kaybolmak da
            yolculuğun bir parçasıdır; acele etmeden, aşağıdaki yollardan
            biriyle yeniden tanıdık bir yere inebilirsiniz.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
            <Link
              href="/"
              className="nf-btn-primary inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white transition-colors"
            >
              <Home className="h-4 w-4" aria-hidden="true" />
              Ana Sayfaya Dön
            </Link>

            <Link
              href="/iletisim"
              className="nf-btn-ghost inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition-colors"
            >
              İletişime Geç
            </Link>
          </div>
        </div>
      </main>

      {/* ── Footer link row ── */}
      <footer className="nf-footer-row relative z-10 mt-auto py-6 px-4">
        <div className="mx-auto max-w-5xl flex flex-wrap items-center gap-x-4 gap-y-2 justify-center">
          <span className="nf-eyebrow text-xs font-medium uppercase tracking-widest">
            Belki Bunlar?
          </span>
          <span className="nf-sep" aria-hidden="true">
            ·
          </span>
          <Link
            href="/hakkimda"
            className="nf-footer-link text-sm transition-colors"
          >
            Hakkımda
          </Link>
          <span className="nf-sep" aria-hidden="true">
            ·
          </span>
          <Link
            href="/calisma-alanlari"
            className="nf-footer-link text-sm transition-colors"
          >
            Çalışma Alanları
          </Link>
          <span className="nf-sep" aria-hidden="true">
            ·
          </span>
          <Link
            href="/yazilarim"
            className="nf-footer-link text-sm transition-colors"
          >
            Yazılarım
          </Link>
        </div>
      </footer>
    </div>
  );
}

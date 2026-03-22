import Image from "next/image";
import Link from "next/link";
import { UserRound } from "lucide-react";
import Blob from "@/components/icons/blob";
import Daisy from "@/components/icons/daisy";
import Rose from "@/components/icons/rose";
import Butterfly from "@/components/icons/butterfly";
import Star from "@/components/icons/star";
import { SITE_NAME } from "@/lib/constants";
import { About } from "@/types/about";

interface HeroSectionProps {
  about: About | null;
}

export default function HeroSection({ about }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-violet-500 via-purple-400 to-pink-400">
      {/* Decorative shapes */}
      <Blob className="pointer-events-none absolute -top-16 -left-16 h-64 w-64 text-white/20" />
      <Blob className="pointer-events-none absolute -right-12 -bottom-12 h-56 w-56 text-white/15" />
      <Daisy className="pointer-events-none absolute top-8 right-1/4 h-12 w-12 text-white/20" />
      <Daisy className="pointer-events-none absolute bottom-8 left-1/3 h-8 w-8 text-white/15" />
      <Daisy className="pointer-events-none absolute top-6 left-1/4 h-16 w-16 text-white/25" />
      <Rose className="pointer-events-none absolute bottom-9 right-1/6 h-12 w-12 text-pink-200/30" />
      <Rose className="pointer-events-none absolute top-4 right-6 h-10 w-10 text-white/20" />
      <Butterfly className="pointer-events-none absolute bottom-8 left-8 h-16 w-16 text-pink-100/25" aria-hidden="true" />
      <Star      className="pointer-events-none absolute top-12 left-1/3 h-8 w-8 text-white/20" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="flex flex-col items-center gap-12 md:flex-row md:items-center md:gap-16">
          {/* Left: text */}
          <div className="flex-1 text-center md:text-left">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-pink-100">
              Çocuk ve Ergen Klinik Psikoloğu
            </p>
            <h1 className="text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">
              {SITE_NAME}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-pink-100 sm:text-xl">
              Çocuğunuzun iç dünyasını anlamak, birlikte büyümek ve iyileşmek
              için buradayım. Güvenli, sıcak ve destekleyici bir ortamda
              yanınızdayım.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row md:items-start">
              <Link
                href="/iletisim"
                className="inline-flex h-10 items-center justify-center rounded-lg bg-white px-6 text-sm font-semibold text-violet-700 transition-colors hover:bg-pink-50"
              >
                Randevu Al
              </Link>
              <Link
                href="/hakkimda"
                className="inline-flex h-10 items-center justify-center rounded-lg border border-white/60 bg-transparent px-6 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Hakkımda
              </Link>
            </div>
          </div>

          {/* Right: photo */}
          <div className="shrink-0">
            <div className="relative h-56 w-56 sm:h-72 sm:w-72 lg:h-80 lg:w-80">
              {about?.profileImage ? (
                <Image
                  src={about.profileImage}
                  alt={`${SITE_NAME} profil fotoğrafı`}
                  fill
                  priority
                  className="rounded-full object-cover ring-4 ring-white/40"
                  sizes="(max-width: 640px) 224px, (max-width: 1024px) 288px, 320px"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center rounded-full bg-white/20 ring-4 ring-white/40">
                  <UserRound
                    className="h-24 w-24 text-white/60"
                    aria-hidden="true"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

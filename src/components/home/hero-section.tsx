import Image from "next/image";
import Link from "next/link";
import { UserRound } from "lucide-react";
import { SITE_NAME } from "@/lib/constants";
import { About } from "@/types/about";
import Daisy from "@/components/icons/daisy";
import Star from "@/components/icons/star";
import Balloon from "@/components/icons/balloon";

interface HeroSectionProps {
  about: About | null;
}

export default function HeroSection({ about }: HeroSectionProps) {
  return (
    <section className="flex min-h-140 flex-col md:flex-row">
      {/* Left: photo */}
      <div className="relative h-72 w-full md:min-h-140 md:w-1/2">
        {about?.profileImage ? (
          <Image
            src={about.profileImage}
            alt={`${SITE_NAME} profil fotoğrafı`}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-rose-50">
            <UserRound className="h-24 w-24 text-rose-200" aria-hidden="true" />
          </div>
        )}
      </div>

      {/* Right: text */}
      <div className="relative flex w-full flex-col justify-center overflow-hidden bg-rose-50 px-8 py-16 md:w-1/2 md:px-14 lg:px-20">
        <Balloon
          className="pointer-events-none absolute top-6 right-8 h-16 w-16 text-rose-300/35"
          aria-hidden="true"
        />
        <Daisy
          className="pointer-events-none absolute bottom-8 right-12 h-12 w-12 text-rose-400/30"
          aria-hidden="true"
        />
        <Star
          className="pointer-events-none absolute top-1/2 right-6 h-6 w-6 -translate-y-1/2 text-violet-300/30"
          aria-hidden="true"
        />

        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-rose-400">
          Çocuk ve Ergen Klinik Psikoloğu
        </p>
        <h1 className="font-serif text-5xl font-normal text-rose-900 sm:text-6xl lg:text-7xl">
          {SITE_NAME}
        </h1>
        <p className="mt-3 text-xl font-medium text-rose-700/70">
          Klinik Psikolog
        </p>
        <p className="mt-6 text-base leading-relaxed text-slate-600 sm:text-lg">
          Çocuğunuzun iç dünyasını anlamak, birlikte büyümek ve iyileşmek için
          buradayım. Güvenli, sıcak ve destekleyici bir ortamda yanınızdayım.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/iletisim"
            className="inline-flex items-center justify-center rounded-full bg-rose-500 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-rose-600"
          >
            Randevu Al
          </Link>
          <Link
            href="/hakkimda"
            className="inline-flex items-center justify-center rounded-full border border-rose-300 bg-white px-7 py-3 text-sm font-semibold text-rose-700 transition-colors hover:bg-rose-100"
          >
            Hakkımda
          </Link>
        </div>
      </div>
    </section>
  );
}

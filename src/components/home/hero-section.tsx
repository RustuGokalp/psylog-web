import Image from "next/image";
import Link from "next/link";
import { UserRound } from "lucide-react";
import { SITE_NAME } from "@/lib/constants";
import { About } from "@/types/about";

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
          <div className="flex h-full w-full items-center justify-center bg-gray-100">
            <UserRound className="h-24 w-24 text-gray-300" aria-hidden="true" />
          </div>
        )}
      </div>

      {/* Right: text */}
      <div className="flex w-full flex-col justify-center bg-slate-100 px-8 py-16 md:w-1/2 md:px-14 lg:px-20">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-400">
          Çocuk ve Ergen Klinik Psikoloğu
        </p>
        <h1 className="font-serif text-5xl font-normal text-gray-900 sm:text-6xl lg:text-7xl">
          {SITE_NAME}
        </h1>
        <p className="mt-3 text-xl font-medium text-gray-600">
          Klinik Psikolog
        </p>
        <p className="mt-6 text-base leading-relaxed text-gray-500 sm:text-lg">
          Çocuğunuzun iç dünyasını anlamak, birlikte büyümek ve iyileşmek için
          buradayım. Güvenli, sıcak ve destekleyici bir ortamda yanınızdayım.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/iletisim"
            className="inline-flex items-center justify-center rounded-full bg-pink-300 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-pink-400"
          >
            Randevu Al
          </Link>
          <Link
            href="/hakkimda"
            className="inline-flex items-center justify-center rounded-full border border-pink-200 bg-white px-7 py-3 text-sm font-semibold text-gray-600 transition-colors hover:bg-pink-50"
          >
            Hakkımda
          </Link>
        </div>
      </div>
    </section>
  );
}

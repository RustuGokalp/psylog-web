import Image from "next/image";
import Link from "next/link";
import { UserRound } from "lucide-react";
import { SITE_NAME } from "@/lib/constants";
import { About } from "@/types/about";
import Daisy from "@/components/icons/daisy";
import Rose from "@/components/icons/rose";
import Butterfly from "@/components/icons/butterfly";
import Star from "@/components/icons/star";
import HtmlContent from "@/components/html-content";
import Wildflower from "@/components/icons/wildflower";

interface AboutContentProps {
  about: About | null;
}

export default function AboutContent({ about }: AboutContentProps) {
  return (
    <>
      <section className="relative overflow-hidden bg-violet-100">
        <Daisy
          className="pointer-events-none absolute top-6 left-8 h-16 w-16 text-violet-300/40"
          aria-hidden="true"
        />
        <Star
          className="pointer-events-none absolute top-4 right-1/4 h-10 w-10 text-violet-400/30"
          aria-hidden="true"
        />
        <Rose
          className="pointer-events-none absolute bottom-4 right-10 h-12 w-12 text-rose-300/35"
          aria-hidden="true"
        />
        <Butterfly
          className="pointer-events-none absolute bottom-3 left-1/4 h-12 w-12 text-violet-300/35"
          aria-hidden="true"
        />
        <div className="relative">
          <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-violet-500">
              Hakkımda
            </p>
            <h1 className="text-4xl font-bold text-violet-900 sm:text-5xl">
              {SITE_NAME}
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-base text-violet-700/80">
              Çocuğunuzun iç dünyasını anlamak ve birlikte büyümek için
              buradayım. Güvenli, sıcak ve destekleyici bir ortamda
              yanınızdayım.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-violet-50">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12">
            <div>
              {about?.profileImage ? (
                <Image
                  src={about.profileImage}
                  alt={`${SITE_NAME} profil fotoğrafı`}
                  width={600}
                  height={700}
                  priority
                  className="h-auto w-full rounded-2xl object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : (
                <div
                  role="img"
                  aria-label="Profil fotoğrafı mevcut değil"
                  className="flex h-72 w-full items-center justify-center rounded-2xl bg-violet-100"
                >
                  <UserRound
                    className="h-24 w-24 text-violet-300"
                    aria-hidden="true"
                  />
                </div>
              )}
            </div>

            <div className="flex flex-col justify-center">
              <h2 className="mb-4 text-2xl font-bold text-violet-900 sm:text-3xl">
                {SITE_NAME}
              </h2>
              <p className="mb-6 text-sm font-semibold uppercase tracking-widest text-purple-400">
                Çocuk ve Ergen Klinik Psikoloğu
              </p>
              {about?.message ? (
                <HtmlContent
                  html={about.message}
                  className="text-base leading-relaxed text-gray-600"
                />
              ) : (
                <p className="text-base leading-relaxed text-gray-500">
                  Bu sayfa yakında güncellenecektir. Benimle iletişime geçmek
                  için{" "}
                  <Link
                    href="/iletisim"
                    className="font-medium text-violet-600 underline underline-offset-2 hover:text-violet-800"
                  >
                    iletişim sayfasını
                  </Link>{" "}
                  ziyaret edebilirsiniz.
                </p>
              )}

              {about && about.education.length > 0 && (
                <div className="mt-6">
                  <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-purple-400">
                    Eğitim
                  </p>
                  <ul className="space-y-2">
                    {about.education.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 text-sm text-gray-600"
                      >
                        <span
                          className="h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400"
                          aria-hidden="true"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {about && about.workingAreas.length > 0 && (
                <div className="relative mt-6">
                  <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-purple-400">
                    Çalışma Alanları
                  </p>
                  <ul className="space-y-2">
                    {about.workingAreas.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 text-sm text-gray-600"
                      >
                        <span
                          className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400"
                          aria-hidden="true"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Wildflower
                    className="pointer-events-none absolute bottom-4 right-16 h-20 w-20"
                    aria-hidden="true"
                  />
                  <Link
                    href="/calisma-alanlari"
                    className="mt-5 inline-flex items-center gap-1 rounded-full border border-violet-300 px-5 py-2 text-sm font-semibold text-violet-700 transition-colors hover:bg-violet-100"
                  >
                    Çalışma Alanlarım →
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

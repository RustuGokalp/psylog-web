import Image from "next/image";
import Link from "next/link";
import { UserRound } from "lucide-react";
import { SITE_NAME } from "@/lib/constants";
import { About } from "@/types/about";
import Daisy from "@/components/icons/daisy";
import Rose from "@/components/icons/rose";
import Butterfly from "@/components/icons/butterfly";
import Star from "@/components/icons/star";

interface AboutContentProps {
  about: About | null;
}

export default function AboutContent({ about }: AboutContentProps) {
  return (
    <>
      <section className="relative overflow-hidden bg-linear-to-br from-violet-500 via-purple-400 to-pink-400">
        <Daisy
          className="pointer-events-none absolute top-6 left-8 h-16 w-16 text-white/20"
          aria-hidden="true"
        />
        <Star
          className="pointer-events-none absolute top-4 right-1/4 h-10 w-10 text-white/20"
          aria-hidden="true"
        />
        <Rose
          className="pointer-events-none absolute bottom-4 right-10 h-12 w-12 text-pink-200/25"
          aria-hidden="true"
        />
        <Butterfly
          className="pointer-events-none absolute bottom-3 left-1/4 h-12 w-12 text-white/20"
          aria-hidden="true"
        />
        <div className="relative">
          <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-purple-100/80">
              Hakkımda
            </p>
            <h1 className="text-4xl font-bold text-white sm:text-5xl">
              {SITE_NAME}
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-base text-purple-100/90">
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
            <div className="relative h-72 w-full overflow-hidden rounded-2xl md:h-auto">
              {about?.profileImage ? (
                <Image
                  src={about.profileImage}
                  alt={`${SITE_NAME} profil fotoğrafı`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-violet-100">
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
                <p className="text-base leading-relaxed text-gray-600">
                  {about.message}
                </p>
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
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

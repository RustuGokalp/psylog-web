import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import ContactInfo from "@/components/contact/contact-info";
import ContactForm from "@/components/contact/contact-form";
import Daisy from "@/components/icons/daisy";
import Rose from "@/components/icons/rose";
import Butterfly from "@/components/icons/butterfly";
import Balloon from "@/components/icons/balloon";

export const metadata: Metadata = createMetadata({
  title: "İletişim",
  description:
    "Klinik Psikolog Tuğçe Tekin ile iletişime geçin. Randevu almak veya bilgi edinmek için formu doldurun ya da iletişim bilgilerini kullanın.",
  path: "/iletisim",
});

export default function ContactPage() {
  return (
    <main>
      <section className="relative overflow-hidden bg-[#FAEEF5]">
        <Daisy
          className="pointer-events-none absolute top-6 left-8 h-16 w-16 text-rose-300/40"
          aria-hidden="true"
        />
        <Daisy
          className="pointer-events-none absolute bottom-4 right-10 h-10 w-10 rotate-45 text-rose-300/35"
          aria-hidden="true"
        />
        <Rose
          className="pointer-events-none absolute top-4 right-1/4 h-12 w-12 text-rose-300/35"
          aria-hidden="true"
        />
        <Butterfly
          className="pointer-events-none absolute bottom-3 left-1/4 h-12 w-12 text-violet-300/30"
          aria-hidden="true"
        />
        <Balloon
          className="pointer-events-none absolute top-8 right-8 h-10 w-10 text-rose-400/30"
          aria-hidden="true"
        />
        <div className="relative">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-rose-500">
              Randevu ve Bilgi
            </p>
            <h1 className="text-4xl font-bold text-rose-900 sm:text-5xl">
              İletişime Geçin
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-base text-rose-800/70">
              Çocuğunuz veya ergeniniz için profesyonel destek almak
              istiyorsanız, aşağıdaki formu doldurabilir veya doğrudan iletişim
              bilgilerimi kullanabilirsiniz.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-rose-50">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
            <ContactInfo />

            <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
              <h2 className="mb-6 text-xl font-bold text-rose-800">
                Mesaj Gönder
              </h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

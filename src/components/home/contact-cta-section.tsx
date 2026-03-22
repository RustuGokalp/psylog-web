import Link from "next/link";
import PhoneSketch from "@/components/icons/phone-sketch";
import EnvelopeSketch from "@/components/icons/envelope-sketch";
import LocationSketch from "@/components/icons/location-sketch";
import Daisy from "@/components/icons/daisy";
import Rose from "@/components/icons/rose";
import Balloon from "@/components/icons/balloon";
import Star from "@/components/icons/star";

const CONTACT_ITEMS = [
  {
    icon: <PhoneSketch />,
    label: "Telefon",
    value: "+90 5XX XXX XX XX",
  },
  {
    icon: <EnvelopeSketch className="h-16 w-16" />,
    label: "E-posta",
    value: "info@tugcetekin.com",
  },
  {
    icon: <LocationSketch className="h-16 w-16" />,
    label: "Konum",
    value: "İstanbul",
  },
];

export default function ContactCtaSection() {
  return (
    <section className="relative overflow-hidden bg-orange-50">
      <Daisy className="pointer-events-none absolute -top-4 -right-4 h-24 w-24 rotate-12 text-orange-300/30" aria-hidden="true" />
      <Rose  className="pointer-events-none absolute -bottom-4 -left-4 h-20 w-20 -rotate-6 text-orange-400/20" aria-hidden="true" />
      <Daisy className="pointer-events-none absolute top-1/2 right-8 h-8 w-8 -translate-y-1/2 text-orange-200/25" aria-hidden="true" />
      <Balloon className="pointer-events-none absolute top-6 left-10 h-14 w-14 text-orange-300/30" aria-hidden="true" />
      <Star    className="pointer-events-none absolute bottom-6 right-1/3 h-7 w-7 text-orange-400/25" aria-hidden="true" />
      <div className="relative">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-orange-800 sm:text-4xl">
            Benimle İletişime Geçin
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">
            Çocuğunuz veya ergeniniz için profesyonel destek almak istiyorsanız
            benimle iletişime geçebilir, randevu alabilirsiniz.
          </p>
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-8 sm:flex-row sm:gap-12">
          {CONTACT_ITEMS.map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center gap-2 text-center"
            >
              {item.icon}
              <span className="text-xs font-semibold uppercase tracking-widest text-orange-500">
                {item.label}
              </span>
              <span className="text-sm font-medium text-foreground">
                {item.value}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/iletisim"
            className="inline-flex h-10 items-center justify-center rounded-full bg-orange-600 px-8 text-sm font-semibold text-white transition-colors hover:bg-orange-700"
          >
            Mesaj Gönder
          </Link>
        </div>
      </div>
      </div>
    </section>
  );
}

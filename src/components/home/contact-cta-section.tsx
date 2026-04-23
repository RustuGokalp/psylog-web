import Link from "next/link";
import PhoneSketch from "@/components/icons/phone-sketch";
import EnvelopeSketch from "@/components/icons/envelope-sketch";
import LocationSketch from "@/components/icons/location-sketch";
import Daisy from "@/components/icons/daisy";
import Balloon from "@/components/icons/balloon";
import Star from "@/components/icons/star";
import Wildflower from "@/components/icons/wildflower";
import Butterfly from "@/components/icons/butterfly";

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
    <section className="relative overflow-hidden bg-rose-50">
      <Balloon
        className="pointer-events-none absolute top-6 left-10 h-16 w-16 text-rose-400/35"
        aria-hidden="true"
      />
      <Daisy
        className="pointer-events-none absolute -top-4 right-16 h-20 w-20 rotate-12 text-rose-300/30"
        aria-hidden="true"
      />
      <Wildflower
        className="pointer-events-none absolute -bottom-4 -right-4 h-28 w-28 text-rose-300/25"
        aria-hidden="true"
      />
      <Butterfly
        className="pointer-events-none absolute bottom-8 left-1/4 h-12 w-12 text-violet-300/30"
        aria-hidden="true"
      />
      <Star
        className="pointer-events-none absolute top-1/2 right-8 h-7 w-7 -translate-y-1/2 text-rose-400/30"
        aria-hidden="true"
      />
      <div className="relative">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-rose-800 sm:text-4xl">
              Benimle İletişime Geçin
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-slate-500">
              Çocuğunuz veya ergeniniz için profesyonel destek almak
              istiyorsanız benimle iletişime geçebilir, randevu alabilirsiniz.
            </p>
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-8 sm:flex-row sm:gap-12">
            {CONTACT_ITEMS.map((item) => (
              <div
                key={item.label}
                className="flex flex-col items-center gap-2 text-center"
              >
                {item.icon}
                <span className="text-xs font-semibold uppercase tracking-widest text-rose-500">
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
              className="inline-flex h-10 items-center justify-center rounded-full bg-rose-500 px-8 text-sm font-semibold text-white transition-colors hover:bg-rose-600"
            >
              Mesaj Gönder
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

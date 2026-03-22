import PhoneSketch from "@/components/icons/phone-sketch";
import EnvelopeSketch from "@/components/icons/envelope-sketch";
import LocationSketch from "@/components/icons/location-sketch";

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
    <section className="bg-orange-50">
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
      </div>
    </section>
  );
}

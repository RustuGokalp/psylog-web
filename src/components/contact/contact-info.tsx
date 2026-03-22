import PhoneSketch from "@/components/icons/phone-sketch";
import EnvelopeSketch from "@/components/icons/envelope-sketch";
import LocationSketch from "@/components/icons/location-sketch";
import Daisy from "@/components/icons/daisy";
import Rose from "@/components/icons/rose";

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

export default function ContactInfo() {
  return (
    <div className="relative flex flex-col gap-8">
      <div>
        <h2 className="text-2xl font-bold text-orange-800 sm:text-3xl">
          İletişim Bilgileri
        </h2>
        <div className="mt-2 flex items-center gap-2">
          <Daisy className="h-7 w-7 text-orange-300" aria-hidden="true" />
          <Rose  className="h-5 w-5 text-orange-400/70" aria-hidden="true" />
        </div>
        <p className="mt-3 text-base text-muted-foreground">
          Aşağıdaki kanallardan bana ulaşabilirsiniz. En geç 24 saat
          içinde size geri dönüş sağlayacağım.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {CONTACT_ITEMS.map((item) => (
          <div key={item.label} className="flex items-center gap-5">
            <div className="shrink-0 text-orange-500">{item.icon}</div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-orange-500">
                {item.label}
              </p>
              <p className="mt-0.5 text-base font-medium text-foreground">
                {item.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl bg-orange-100 p-6">
        <h3 className="text-base font-semibold text-orange-800">
          Seans Saatleri
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Pazartesi – Cuma: 09:00 – 18:00
        </p>
        <p className="text-sm text-muted-foreground">
          Cumartesi: Randevuya göre
        </p>
      </div>
    </div>
  );
}

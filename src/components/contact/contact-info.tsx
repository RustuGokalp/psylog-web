import PhoneSketch from "@/components/icons/phone-sketch";
import EnvelopeSketch from "@/components/icons/envelope-sketch";
import LocationSketch from "@/components/icons/location-sketch";
import { Instagram } from "lucide-react";
import Daisy from "@/components/icons/daisy";
import Rose from "@/components/icons/rose";
import { ContactInfo as ContactInfoData } from "@/types/contact-info";
import WorkingHoursClient from "@/components/contact/working-hours-client";

interface ContactInfoProps {
  contactInfo: ContactInfoData | null;
}

interface ContactItem {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}

export default function ContactInfo({ contactInfo }: ContactInfoProps) {
  const ig = contactInfo?.instagram?.trim().replace(/^@/, "");

  const contactItems: ContactItem[] = [
    {
      icon: <PhoneSketch className="h-16 w-16" />,
      label: "Telefon",
      value: contactInfo?.phone ?? "+90 5XX XXX XX XX",
    },
    {
      icon: <EnvelopeSketch className="h-16 w-14" />,
      label: "E-posta",
      value: contactInfo?.email ?? "info@tugcetekin.com",
    },
    ...(ig
      ? [
          {
            icon: (
              <Instagram
                className="h-12 w-12 text-orange-500"
                strokeWidth={1.25}
              />
            ),
            label: "Instagram",
            value: "@" + ig,
            href: "https://www.instagram.com/" + ig,
          } satisfies ContactItem,
        ]
      : []),
    {
      icon: <LocationSketch className="h-16 w-16" />,
      label: "Konum",
      value: contactInfo?.location ?? "İstanbul",
    },
  ];

  return (
    <div className="relative flex flex-col gap-8">
      <div>
        <h2 className="text-2xl font-bold text-orange-800 sm:text-3xl">
          İletişim Bilgileri
        </h2>
        <div className="mt-2 flex items-center gap-2">
          <Daisy className="h-7 w-7 text-orange-300" aria-hidden="true" />
          <Rose className="h-5 w-5 text-orange-400/70" aria-hidden="true" />
        </div>
        <p className="mt-3 text-base text-muted-foreground">
          Aşağıdaki kanallardan bana ulaşabilirsiniz. En geç 24 saat içinde size
          geri dönüş sağlayacağım.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {contactItems.map((item) => (
          <div key={item.label} className="flex items-center gap-5">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center text-orange-500">
              {item.icon}
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-orange-500">
                {item.label}
              </p>
              {item.href ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Instagram'da ${item.value} hesabını ziyaret et`}
                  className="mt-0.5 inline-block text-base font-medium text-foreground underline-offset-2 transition-colors hover:text-orange-600 hover:underline"
                >
                  {item.value}
                </a>
              ) : (
                <p className="mt-0.5 text-base font-medium text-foreground">
                  {item.value}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl bg-orange-100 p-6">
        <h3 className="text-base font-semibold text-orange-800">
          Çalışma Saatleri
        </h3>
        <WorkingHoursClient workingHours={contactInfo?.workingHours} />
      </div>
    </div>
  );
}

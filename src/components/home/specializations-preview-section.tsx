import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Specialization } from "@/types/specialization";
import Daisy from "@/components/icons/daisy";
import Rose from "@/components/icons/rose";
import Butterfly from "@/components/icons/butterfly";

interface SpecializationsPreviewSectionProps {
  specializations: Specialization[];
}

const ACCENT_COLORS = ["bg-purple-400", "bg-pink-400", "bg-blue-400"];

const PLACEHOLDER_COLORS = ["bg-purple-100", "bg-pink-100", "bg-blue-100"];

export default function SpecializationsPreviewSection({
  specializations,
}: SpecializationsPreviewSectionProps) {
  if (specializations.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-pink-50">
      <Daisy
        className="pointer-events-none absolute top-10 right-20 h-14 w-14 text-pink-300/25"
        aria-hidden="true"
      />
      <Rose
        className="pointer-events-none absolute bottom-6 left-3 h-12 w-12 rotate-6 text-pink-400/20"
        aria-hidden="true"
      />
      <Butterfly
        className="pointer-events-none absolute bottom-8 right-8 h-14 w-14 text-pink-400/20"
        aria-hidden="true"
      />
      <div className="relative">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-pink-800 sm:text-4xl">
              Çalışma Alanlarım
            </h2>
            <p className="mt-4 text-base text-muted-foreground">
              Çocuklar ve ergenlerle yürüttüğüm terapötik çalışmalarda
              odaklandığım başlıca uzmanlık alanları.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {specializations.map((item, index) => {
              const accentColor = ACCENT_COLORS[index % ACCENT_COLORS.length];
              const placeholderColor =
                PLACEHOLDER_COLORS[index % PLACEHOLDER_COLORS.length];
              const truncatedDescription =
                item.description.length > 120
                  ? item.description.slice(0, 120) + "..."
                  : item.description;

              return (
                <Card
                  key={item.id}
                  className="overflow-hidden rounded-2xl shadow-sm"
                >
                  <div
                    className={`h-2 w-full ${accentColor}`}
                    aria-hidden="true"
                  />

                  <div className="relative h-44 w-full">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div
                        className={`h-full w-full ${placeholderColor}`}
                        aria-hidden="true"
                      />
                    )}
                  </div>

                  <CardHeader className="pt-4">
                    <CardTitle>
                      <h3 className="text-base font-semibold text-foreground">
                        {item.title}
                      </h3>
                    </CardTitle>
                  </CardHeader>

                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {truncatedDescription}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/calisma-alanlari"
              className="font-semibold text-pink-600 hover:text-pink-800 hover:underline"
            >
              Tüm Alanlar →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

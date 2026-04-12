import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Specialization } from "@/types/specialization";
import HtmlContent from "@/components/html-content";
import Daisy from "@/components/icons/daisy";
import Blob from "@/components/icons/blob";
import Star from "@/components/icons/star";
import Butterfly from "@/components/icons/butterfly";

interface SpecializationsPreviewSectionProps {
  specializations: Specialization[];
}

const ACCENT_COLORS = ["bg-rose-400", "bg-violet-300", "bg-purple-300"];

const PLACEHOLDER_COLORS = ["bg-rose-100", "bg-violet-100", "bg-purple-100"];

export default function SpecializationsPreviewSection({
  specializations,
}: SpecializationsPreviewSectionProps) {
  if (specializations.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-violet-50">
      <Blob
        className="pointer-events-none absolute -top-10 -right-10 h-52 w-52 text-violet-200/30"
        aria-hidden="true"
      />
      <Daisy
        className="pointer-events-none absolute top-8 left-12 h-14 w-14 text-violet-300/35"
        aria-hidden="true"
      />
      <Butterfly
        className="pointer-events-none absolute bottom-8 right-10 h-14 w-14 text-rose-300/30"
        aria-hidden="true"
      />
      <Star
        className="pointer-events-none absolute bottom-10 left-1/3 h-8 w-8 text-violet-300/30"
        aria-hidden="true"
      />
      <div className="relative">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-violet-800 sm:text-4xl">
              Çalışma Alanlarım
            </h2>
            <p className="mt-4 text-base text-slate-500">
              Çocuklar ve ergenlerle yürüttüğüm terapötik çalışmalarda
              odaklandığım başlıca uzmanlık alanları.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {specializations.map((item, index) => {
              const accentColor = ACCENT_COLORS[index % ACCENT_COLORS.length];
              const placeholderColor =
                PLACEHOLDER_COLORS[index % PLACEHOLDER_COLORS.length];

              return (
                <Link
                  key={item.id}
                  href={`/calisma-alanlari/${item.slug}`}
                  className="group block rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Card className="h-full overflow-hidden rounded-2xl shadow-sm transition-shadow group-hover:shadow-md">
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
                        <h3 className="text-base font-semibold text-foreground group-hover:text-violet-700">
                          {item.title}
                        </h3>
                      </CardTitle>
                    </CardHeader>

                    <CardContent>
                      <HtmlContent
                        html={item.summary}
                        className="line-clamp-3 text-sm text-muted-foreground"
                      />
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/calisma-alanlari"
              className="font-semibold text-violet-600 hover:text-violet-800 hover:underline"
            >
              Tüm Alanlar →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

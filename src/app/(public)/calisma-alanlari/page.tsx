import type { Metadata } from "next";
import Image from "next/image";
import { createMetadata } from "@/lib/metadata";
import { getSpecializations } from "@/services/specialization.service";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = createMetadata({
  title: "Çalışma Alanlarım",
  description:
    "Klinik Psikolog Tuğçe Tekin'in çocuk ve ergen alanındaki uzmanlık ve çalışma alanları hakkında bilgi edinin.",
  path: "/calisma-alanlari",
});

const PLACEHOLDER_COLORS = [
  "bg-purple-100",
  "bg-pink-100",
  "bg-blue-100",
  "bg-green-100",
  "bg-orange-100",
];

export default async function CalismaAlanlariPage() {
  const specializations = await getSpecializations();

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Çalışma Alanlarım
        </h1>
        <p className="mt-4 text-base text-muted-foreground sm:text-lg">
          Danışanlarımla yürüttüğüm terapötik çalışmalarda odaklandığım başlıca
          uzmanlık alanlarını aşağıda bulabilirsiniz.
        </p>
      </header>

      {specializations.length === 0 ? (
        <p className="text-base text-muted-foreground">
          Henüz çalışma alanı eklenmemiş. Lütfen daha sonra tekrar ziyaret edin.
        </p>
      ) : (
        <div>
          {specializations.map((item, index) => {
            const isEven = index % 2 === 0;
            const placeholderColor =
              PLACEHOLDER_COLORS[index % PLACEHOLDER_COLORS.length];

            return (
              <div key={item.id}>
                <article
                  className={`flex flex-col py-12 md:gap-12 ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div className="relative h-56 w-full shrink-0 overflow-hidden rounded-2xl md:h-64 md:w-1/3">
                    {item.image !== null ? (
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    ) : (
                      <div
                        className={`h-full w-full ${placeholderColor}`}
                        aria-hidden="true"
                      />
                    )}
                  </div>

                  <div className="mt-6 flex flex-1 flex-col md:mt-0">
                    <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                      {item.title}
                    </h2>
                    <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </article>

                {index < specializations.length - 1 && <Separator />}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

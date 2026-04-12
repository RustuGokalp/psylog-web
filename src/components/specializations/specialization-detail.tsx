"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import DOMPurify from "dompurify";
import { Specialization } from "@/types/specialization";
import { fetchSpecializationBySlug } from "@/services/specialization.service";
import { ApiException } from "@/lib/api";
import Daisy from "@/components/icons/daisy";
import Butterfly from "@/components/icons/butterfly";
import Star from "@/components/icons/star";
import Rose from "@/components/icons/rose";

interface Props {
  slug: string;
}

function SpecializationDetailSkeleton() {
  return (
    <main>
      <section className="relative overflow-hidden bg-purple-100">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="mb-6 h-4 w-32 animate-pulse rounded bg-purple-200" />
          <div className="mb-2 h-3 w-24 animate-pulse rounded bg-purple-200" />
          <div className="h-10 w-2/3 animate-pulse rounded bg-purple-200 sm:h-12" />
        </div>
      </section>
      <section className="bg-violet-50">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="mb-10 h-72 w-full animate-pulse rounded-2xl bg-violet-200 sm:h-96" />
          <div className="space-y-3">
            <div className="h-4 w-full animate-pulse rounded bg-violet-200" />
            <div className="h-4 w-5/6 animate-pulse rounded bg-violet-200" />
            <div className="h-4 w-4/6 animate-pulse rounded bg-violet-200" />
            <div className="mt-6 h-4 w-full animate-pulse rounded bg-violet-200" />
            <div className="h-4 w-5/6 animate-pulse rounded bg-violet-200" />
          </div>
        </div>
      </section>
    </main>
  );
}

export default function SpecializationDetail({ slug }: Props) {
  const [data, setData] = useState<Specialization | null>(null);
  const [status, setStatus] = useState<
    "loading" | "success" | "not-found" | "error"
  >("loading");

  useEffect(() => {
    let cancelled = false;

    fetchSpecializationBySlug(slug)
      .then((json) => {
        if (!cancelled) {
          setData(json);
          setStatus("success");
        }
      })
      .catch((err) => {
        if (cancelled) return;
        if (err instanceof ApiException && err.error.status === 404) {
          setStatus("not-found");
        } else {
          setStatus("error");
        }
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (status === "loading") return <SpecializationDetailSkeleton />;
  if (status === "not-found") return notFound();
  if (status === "error" || !data) {
    return (
      <main className="flex min-h-96 items-center justify-center bg-violet-50">
        <div className="text-center">
          <p className="text-base text-slate-600">
            Sayfa yüklenirken bir hata oluştu.
          </p>
          <Link
            href="/calisma-alanlari"
            className="mt-4 inline-block text-sm font-semibold text-violet-600 hover:underline"
          >
            ← Çalışma Alanlarına Dön
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-purple-100">
        <Daisy
          className="pointer-events-none absolute top-6 right-16 h-14 w-14 text-purple-300/40"
          aria-hidden="true"
        />
        <Butterfly
          className="pointer-events-none absolute bottom-4 left-12 h-12 w-12 text-violet-300/35"
          aria-hidden="true"
        />
        <Star
          className="pointer-events-none absolute top-1/2 right-8 h-8 w-8 -translate-y-1/2 text-purple-400/30"
          aria-hidden="true"
        />
        <Rose
          className="pointer-events-none absolute bottom-4 right-1/3 h-10 w-10 text-rose-300/30"
          aria-hidden="true"
        />
        <div className="relative">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <Link
              href="/calisma-alanlari"
              className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-purple-600 hover:text-purple-800 hover:underline"
            >
              ← Çalışma Alanlarım
            </Link>
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-purple-500">
              Uzmanlık Alanı
            </p>
            <h1 className="text-4xl font-bold text-purple-900 sm:text-5xl">
              {data.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="bg-violet-50">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          {data.image && (
            <div className="relative mb-10 h-72 w-full overflow-hidden rounded-2xl shadow-sm sm:h-96">
              <Image
                src={data.image}
                alt={data.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 896px"
              />
            </div>
          )}

          <div
            className="prose prose-slate prose-lg max-w-none
              prose-headings:text-violet-900
              prose-a:text-violet-600 prose-a:no-underline hover:prose-a:underline
              prose-strong:text-slate-800
              prose-li:text-slate-600
              prose-p:text-slate-600 prose-p:leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(data.content),
            }}
          />

          <div className="mt-14 flex flex-col items-center gap-4 border-t border-violet-200 pt-10 text-center">
            <p className="text-base text-slate-600">
              Bu alanda destek almak ister misiniz?
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/iletisim"
                className="inline-flex items-center justify-center rounded-full bg-violet-500 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-violet-600"
              >
                Randevu Al
              </Link>
              <Link
                href="/calisma-alanlari"
                className="inline-flex items-center justify-center rounded-full border border-violet-300 px-7 py-3 text-sm font-semibold text-violet-700 transition-colors hover:bg-violet-100"
              >
                Diğer Alanlar
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

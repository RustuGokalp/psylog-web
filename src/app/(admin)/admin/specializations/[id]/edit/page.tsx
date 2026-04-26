"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { getAdminSpecializationById } from "@/services/specialization.service";
import { Specialization } from "@/types/specialization";
import { ApiException } from "@/lib/api";
import SpecializationForm from "@/components/admin/specialization-form";
import { SpecializationFormValues } from "@/schemas/specialization.schema";
import { Skeleton } from "@/components/ui/skeleton";
import { ActionAlert } from "@/components/action-alert";
import { Undo2 } from "lucide-react";

export default function EditSpecializationPage() {
  const params = useParams();
  const router = useRouter();
  const specializationId = Number(params.id);

  const [specialization, setSpecialization] = useState<Specialization | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (isNaN(specializationId)) {
      setNotFound(true);
      setLoading(false);
      return;
    }

    async function fetchSpecialization() {
      try {
        const data = await getAdminSpecializationById(specializationId);
        setSpecialization(data);
      } catch (err) {
        if (err instanceof ApiException && err.error.status === 404) {
          setNotFound(true);
          return;
        }
        const msg =
          err instanceof ApiException
            ? err.message
            : "Çalışma alanı yüklenemedi.";
        setErrorMsg(msg);
      } finally {
        setLoading(false);
      }
    }

    fetchSpecialization();
  }, [specializationId, router]);

  if (loading) {
    return (
      <div className="flex flex-col gap-6 max-w-3xl">
        <div>
          <Skeleton className="h-8 w-48 rounded-md" />
          <Skeleton className="h-4 w-64 rounded-md mt-2" />
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-full rounded-md" />
          ))}
        </div>
        <ActionAlert
          open={!!errorMsg}
          type="error"
          title="Yükleme Hatası"
          description={errorMsg ?? undefined}
          onClose={() => router.push("/admin/specializations")}
        />
      </div>
    );
  }

  if (notFound || !specialization) {
    return (
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-slate-800">
          Çalışma Alanı Bulunamadı
        </h1>
        <p className="text-sm text-slate-500">
          ID: {specializationId} olan bir çalışma alanı bulunamadı.
        </p>
      </div>
    );
  }

  const initialValues: SpecializationFormValues = {
    title: specialization.title,
    summary: specialization.summary,
    content: specialization.content,
    image: specialization.image ?? "",
    displayOrder:
      specialization.displayOrder !== null
        ? String(specialization.displayOrder)
        : "",
  };

  return (
    <div className="flex flex-col gap-6 max-w-3xl">
      <Link
        href="/admin/specializations"
        className="inline-flex items-center gap-1.5 text-sm text-violet-600 hover:text-violet-800 transition-colors w-fit"
      >
        <Undo2 className="h-4 w-4" />
        Çalışma Alanları listesine dön
      </Link>
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          Çalışma Alanını Düzenle
        </h1>
        <p className="text-sm text-slate-500 mt-0.5 line-clamp-1">
          {specialization.title}
        </p>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <SpecializationForm
          mode="edit"
          initialValues={initialValues}
          specializationId={specializationId}
          createdAt={specialization.createdAt}
          updatedAt={specialization.updatedAt}
        />
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { getAdminSpecializations } from "@/services/specialization.service";
import { Specialization } from "@/types/specialization";
import { ApiException } from "@/lib/api";
import SpecializationTable from "@/components/admin/specialization-table";
import { Skeleton } from "@/components/ui/skeleton";
import { ActionAlert } from "@/components/action-alert";
import { Plus } from "lucide-react";

export default function AdminSpecializationsPage() {
  const [specializations, setSpecializations] = useState<Specialization[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fetchSpecializations = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAdminSpecializations();
      setSpecializations(data);
    } catch (err) {
      const msg =
        err instanceof ApiException
          ? err.message
          : "Çalışma alanları yüklenemedi.";
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSpecializations();
  }, [fetchSpecializations]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Çalışma Alanları
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            {!loading
              ? `${specializations.length} çalışma alanı`
              : "Tüm çalışma alanlarını yönetin"}
          </p>
        </div>
        <Link
          href="/admin/specializations/new"
          className="inline-flex items-center gap-2 rounded-lg bg-violet-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-violet-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Yeni Alan</span>
          <span className="sm:hidden">Yeni</span>
        </Link>
      </div>

      {loading ? (
        <div className="bg-white rounded-xl border border-slate-200 p-4 flex flex-col gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-full rounded-md" />
          ))}
        </div>
      ) : (
        <SpecializationTable
          specializations={specializations}
          onDeleteSuccess={fetchSpecializations}
        />
      )}

      <ActionAlert
        open={!!errorMsg}
        type="error"
        title="Yükleme Hatası"
        description={errorMsg ?? undefined}
        onClose={() => setErrorMsg(null)}
      />
    </div>
  );
}

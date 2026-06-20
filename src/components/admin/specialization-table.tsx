"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ActionAlert, AlertType } from "@/components/action-alert";
import { ApiException } from "@/lib/api";
import { deleteSpecialization } from "@/services/specialization.service";
import { Specialization } from "@/types/specialization";
import { Pencil, Trash2 } from "lucide-react";
import { formatTurkishDateTime } from "@/lib/format";
import { DataTable } from "@/components/ui/DataTable";
import { createSpecializationColumns } from "@/components/tables/columns/specialization-columns";
import { TableAction } from "@/components/tables/table-action";

interface SpecializationTableProps {
  specializations: Specialization[];
  onDeleteSuccess?: () => void;
  fillHeight?: boolean;
}

type FeedbackAlert = {
  type: AlertType;
  title: string;
  description?: string;
} | null;

export default function SpecializationTable({
  specializations: initialSpecializations,
  onDeleteSuccess,
  fillHeight,
}: SpecializationTableProps) {
  const router = useRouter();
  const [specializations, setSpecializations] = useState<Specialization[]>(
    initialSpecializations,
  );
  const [deleteTarget, setDeleteTarget] = useState<Specialization | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [feedbackAlert, setFeedbackAlert] = useState<FeedbackAlert>(null);
  const [feedbackAlertOpen, setFeedbackAlertOpen] = useState(false);

  useEffect(() => {
    setSpecializations(initialSpecializations);
  }, [initialSpecializations]);

  async function handleDelete() {
    if (!deleteTarget) return;
    setIsDeleting(true);
    const title = deleteTarget.title;
    try {
      await deleteSpecialization(deleteTarget.id);
      setDeleteTarget(null);
      setFeedbackAlert({
        type: "success",
        title: "Çalışma Alanı Silindi",
        description: `"${title}" başarıyla silindi.`,
      });
      setFeedbackAlertOpen(true);
    } catch (err) {
      const msg =
        err instanceof ApiException
          ? err.message
          : "Çalışma alanı silinirken bir hata oluştu.";
      setDeleteTarget(null);
      setFeedbackAlert({ type: "error", title: "Hata", description: msg });
      setFeedbackAlertOpen(true);
    } finally {
      setIsDeleting(false);
    }
  }

  const emptyState = (
    <div className="rounded-xl border border-dashed border-slate-300 bg-white py-16 text-center">
      <p className="text-sm text-slate-500">Henüz çalışma alanı yok.</p>
      <Link
        href="/admin/specializations/new"
        className="mt-4 inline-flex items-center rounded-lg bg-violet-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-violet-700 transition-colors"
      >
        Yeni Çalışma Alanı Oluştur
      </Link>
    </div>
  );

  function renderMobileCard(item: Specialization) {
    return (
      <div className="flex flex-col gap-2.5 p-4">
        <div className="flex items-start justify-between gap-2">
          <p className="flex-1 text-sm font-medium leading-snug text-slate-800 line-clamp-2">
            {item.title}
          </p>
          {item.displayOrder != null && (
            <span className="shrink-0 text-xs text-slate-400">
              #{item.displayOrder}
            </span>
          )}
        </div>
        <span className="text-xs text-slate-400">
          {formatTurkishDateTime(item.createdAt)}
        </span>
        <div className="flex items-center justify-end gap-1 border-t border-slate-100 pt-2.5">
          <TableAction
            tooltip="Düzenle"
            tone="amber"
            icon={Pencil}
            onClick={() =>
              router.push(`/admin/specializations/${item.id}/edit`)
            }
          />
          <TableAction
            tooltip="Sil"
            tone="red"
            icon={Trash2}
            onClick={() => setDeleteTarget(item)}
          />
        </div>
      </div>
    );
  }

  const columns = useMemo(
    () =>
      createSpecializationColumns({
        onEdit: (id) => router.push(`/admin/specializations/${id}/edit`),
        onDelete: (item) => setDeleteTarget(item),
      }),
    [router],
  );

  return (
    <>
      <DataTable<Specialization>
        columns={columns}
        data={specializations}
        getRowId={(s) => String(s.id)}
        renderMobileCard={renderMobileCard}
        emptyState={emptyState}
        fillHeight={fillHeight}
      />

      <ActionAlert
        open={!!deleteTarget}
        type="warning"
        title="Çalışma Alanını Sil"
        description={
          deleteTarget
            ? `"${deleteTarget.title}" adlı çalışma alanını silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.`
            : undefined
        }
        onClose={() => !isDeleting && setDeleteTarget(null)}
        onConfirm={handleDelete}
        confirmLabel="Sil"
        loading={isDeleting}
      />

      <ActionAlert
        open={feedbackAlertOpen}
        type={feedbackAlert?.type ?? "info"}
        title={feedbackAlert?.title ?? ""}
        description={feedbackAlert?.description}
        onClose={() => {
          setFeedbackAlertOpen(false);
          if (feedbackAlert?.type === "success") onDeleteSuccess?.();
        }}
      />
    </>
  );
}

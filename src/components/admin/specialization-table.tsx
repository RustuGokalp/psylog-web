"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ActionAlert, AlertType } from "@/components/action-alert";
import { ApiException } from "@/lib/api";
import { deleteSpecialization } from "@/services/specialization.service";
import { Specialization } from "@/types/specialization";
import { Pencil, Trash2 } from "lucide-react";

interface SpecializationTableProps {
  specializations: Specialization[];
  onDeleteSuccess?: () => void;
}

type FeedbackAlert = {
  type: AlertType;
  title: string;
  description?: string;
} | null;

export default function SpecializationTable({
  specializations: initialSpecializations,
  onDeleteSuccess,
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
      setFeedbackAlert({ type: "success", title: "Çalışma Alanı Silindi", description: `"${title}" başarıyla silindi.` });
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

  function formatDate(iso: string) {
    return new Date(iso).toLocaleString("tr-TR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  if (specializations.length === 0) {
    return (
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
  }

  return (
    <>
      {/* Mobile card list */}
      <div className="sm:hidden flex flex-col divide-y divide-slate-100 rounded-xl border border-slate-200 bg-white">
        {specializations.map((item) => (
          <div key={item.id} className="flex flex-col gap-2.5 p-4">
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
              {formatDate(item.createdAt)}
            </span>
            <div className="flex items-center justify-end gap-1 border-t border-slate-100 pt-2.5">
              <button
                onClick={() =>
                  router.push(`/admin/specializations/${item.id}/edit`)
                }
                className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-amber-400 transition-colors hover:bg-amber-50 hover:text-amber-500"
                aria-label="Düzenle"
              >
                <Pencil className="h-4 w-4" />
              </button>
              <button
                onClick={() => setDeleteTarget(item)}
                className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-red-400 transition-colors hover:bg-red-50 hover:text-red-600"
                aria-label="Sil"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop table */}
      <div className="hidden sm:block overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50 hover:bg-slate-50">
              <TableHead className="font-semibold text-slate-600">
                Başlık
              </TableHead>
              <TableHead className="hidden md:table-cell font-semibold text-slate-600">
                Slug
              </TableHead>
              <TableHead className="font-semibold text-slate-600 text-center">
                Sıra
              </TableHead>
              <TableHead className="hidden lg:table-cell font-semibold text-slate-600">
                Oluşturulma
              </TableHead>
              <TableHead className="hidden lg:table-cell font-semibold text-slate-600">
                Güncelleme
              </TableHead>
              <TableHead className="w-24 text-center font-semibold text-slate-600">
                Aksiyonlar
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {specializations.map((item) => (
              <TableRow key={item.id} className="hover:bg-slate-50">
                <TableCell>
                  <p className="font-medium text-slate-800 line-clamp-1">
                    {item.title}
                  </p>
                </TableCell>
                <TableCell className="hidden md:table-cell text-sm text-slate-500 font-mono">
                  {item.slug}
                </TableCell>
                <TableCell className="text-center text-sm text-slate-500">
                  {item.displayOrder ?? "—"}
                </TableCell>
                <TableCell className="hidden lg:table-cell text-sm text-slate-500 whitespace-nowrap">
                  {formatDate(item.createdAt)}
                </TableCell>
                <TableCell className="hidden lg:table-cell text-sm text-slate-500 whitespace-nowrap">
                  {item.updatedAt ? formatDate(item.updatedAt) : "—"}
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        router.push(`/admin/specializations/${item.id}/edit`)
                      }
                      className="h-8 w-8 cursor-pointer text-amber-400 hover:text-amber-500 hover:bg-amber-50"
                      aria-label="Düzenle"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setDeleteTarget(item)}
                      className="h-8 w-8 cursor-pointer text-red-400 hover:text-red-600 hover:bg-red-50"
                      aria-label="Sil"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

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

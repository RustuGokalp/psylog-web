"use client";

import { useEffect, useState, useCallback } from "react";
import { getAdminContacts } from "@/services/contact.service";
import { ContactMessage } from "@/types/contact";
import { ApiException } from "@/lib/api";
import ContactTable from "@/components/admin/contact-table";
import AdminPagination from "@/components/admin/admin-pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { ActionAlert } from "@/components/action-alert";

const PAGE_SIZE = 10;

export default function AdminContactPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  const fetchMessages = useCallback(async (p: number) => {
    setLoading(true);
    try {
      const data = await getAdminContacts(p, PAGE_SIZE);
      setMessages(data.content);
      setTotalPages(data.totalPages);
      setTotalElements(data.totalElements);
    } catch (err) {
      const msg =
        err instanceof ApiException ? err.message : "Mesajlar yüklenemedi.";
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMessages(page);
  }, [fetchMessages, page]);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">İletişim</h1>
        <p className="mt-0.5 text-sm text-slate-500">
          {loading ? "Mesajlar yükleniyor..." : `${totalElements} mesaj`}
        </p>
      </div>

      {loading ? (
        <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4">
          {Array.from({ length: PAGE_SIZE }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-full rounded-md" />
          ))}
        </div>
      ) : (
        <ContactTable messages={messages} />
      )}

      {!loading && (
        <AdminPagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
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

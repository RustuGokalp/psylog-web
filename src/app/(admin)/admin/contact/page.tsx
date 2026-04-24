"use client";

import { useEffect, useState, useCallback } from "react";
import { getAdminContacts } from "@/services/contact.service";
import { ContactMessage } from "@/types/contact";
import { ApiException } from "@/lib/api";
import ContactTable from "@/components/admin/contact-table";
import { Skeleton } from "@/components/ui/skeleton";
import { ActionAlert } from "@/components/action-alert";

export default function AdminContactPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fetchMessages = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAdminContacts();
      setMessages(data);
    } catch (err) {
      const msg =
        err instanceof ApiException ? err.message : "Mesajlar yüklenemedi.";
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">İletişim</h1>
        <p className="mt-0.5 text-sm text-slate-500">
          {loading ? "Mesajlar yükleniyor..." : `${messages.length} mesaj`}
        </p>
      </div>

      {loading ? (
        <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-full rounded-md" />
          ))}
        </div>
      ) : (
        <ContactTable messages={messages} />
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

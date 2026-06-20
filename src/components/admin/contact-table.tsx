"use client";

import { useState, useMemo } from "react";
import { ContactMessage } from "@/types/contact";
import { Eye, Mail, Phone } from "lucide-react";
import { formatTurkishDateTime } from "@/lib/format";
import { DataTable } from "@/components/ui/DataTable";
import { createContactColumns } from "@/components/tables/columns/contact-columns";
import { TableAction } from "@/components/tables/table-action";
import ContactDetailModal from "@/components/admin/modals/contact-detail-modal";

interface ContactTableProps {
  messages: ContactMessage[];
  fillHeight?: boolean;
}

export default function ContactTable({
  messages,
  fillHeight,
}: ContactTableProps) {
  const [selected, setSelected] = useState<ContactMessage | null>(null);

  const emptyState = (
    <div className="rounded-xl border border-dashed border-slate-300 bg-white py-16 text-center">
      <Mail className="mx-auto h-8 w-8 text-slate-300" />
      <p className="mt-3 text-sm text-slate-500">Henüz iletişim mesajı yok.</p>
    </div>
  );

  function renderMobileCard(msg: ContactMessage) {
    return (
      <div className="flex flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-medium text-slate-800">{msg.fullName}</p>
          <span className="shrink-0 text-xs text-slate-400">
            {formatTurkishDateTime(msg.createdAt)}
          </span>
        </div>

        <p className="text-xs font-medium text-slate-600">{msg.subject}</p>

        <div className="flex flex-wrap gap-x-3 gap-y-1">
          <span className="flex items-center gap-1 text-xs text-slate-400">
            <Mail className="h-3 w-3" />
            {msg.email}
          </span>
          {msg.mobilePhone && (
            <span className="flex items-center gap-1 text-xs text-slate-400">
              <Phone className="h-3 w-3" />
              {msg.mobilePhone}
            </span>
          )}
        </div>

        <p className="line-clamp-2 text-xs text-slate-500">{msg.message}</p>

        <div className="mt-1 self-start">
          <TableAction
            tooltip="Detayı gör"
            tone="blue"
            icon={Eye}
            onClick={() => setSelected(msg)}
          />
        </div>
      </div>
    );
  }

  const columns = useMemo(
    () =>
      createContactColumns({
        onView: (m) => setSelected(m),
      }),
    [],
  );

  return (
    <>
      <DataTable<ContactMessage>
        columns={columns}
        data={messages}
        getRowId={(m) => String(m.id)}
        renderMobileCard={renderMobileCard}
        emptyState={emptyState}
        fillHeight={fillHeight}
      />

      <ContactDetailModal
        message={selected}
        onClose={() => setSelected(null)}
      />
    </>
  );
}

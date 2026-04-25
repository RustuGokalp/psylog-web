"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ContactMessage } from "@/types/contact";
import { Eye, Mail, Phone } from "lucide-react";

interface ContactTableProps {
  messages: ContactMessage[];
}

export default function ContactTable({ messages }: ContactTableProps) {
  const [selected, setSelected] = useState<ContactMessage | null>(null);

  function formatDate(iso: string) {
    return new Date(iso).toLocaleString("tr-TR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  if (messages.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-white py-16 text-center">
        <Mail className="mx-auto h-8 w-8 text-slate-300" />
        <p className="mt-3 text-sm text-slate-500">
          Henüz iletişim mesajı yok.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Mobile card list */}
      <div className="sm:hidden flex flex-col divide-y divide-slate-100 rounded-xl border border-slate-200 bg-white">
        {messages.map((msg) => (
          <div key={msg.id} className="flex flex-col gap-2 p-4">
            <div className="flex items-start justify-between gap-2">
              <p className="text-sm font-medium text-slate-800">
                {msg.fullName}
              </p>
              <span className="shrink-0 text-xs text-slate-400">
                {formatDate(msg.createdAt)}
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

            <button
              onClick={() => setSelected(msg)}
              className="mt-1 cursor-pointer self-start rounded-md p-1 text-blue-400 hover:bg-blue-50 hover:text-blue-600 transition-colors"
              aria-label="Detayı gör"
            >
              <Eye className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Desktop table */}
      <div className="hidden sm:block overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50 hover:bg-slate-50">
              <TableHead className="font-semibold text-slate-600">
                Ad Soyad
              </TableHead>
              <TableHead className="font-semibold text-slate-600">
                E-posta
              </TableHead>
              <TableHead className="font-semibold text-slate-600">
                Konu
              </TableHead>
              <TableHead className="hidden md:table-cell font-semibold text-slate-600">
                Telefon
              </TableHead>
              <TableHead className="hidden lg:table-cell font-semibold text-slate-600">
                Tarih
              </TableHead>
              <TableHead className="w-16 text-center font-semibold text-slate-600">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {messages.map((msg) => (
              <TableRow key={msg.id} className="hover:bg-slate-50">
                <TableCell className="font-medium text-slate-800 whitespace-nowrap">
                  {msg.fullName}
                </TableCell>
                <TableCell className="text-sm text-slate-600">
                  {msg.email}
                </TableCell>
                <TableCell className="text-sm text-slate-600 max-w-48">
                  <p className="line-clamp-1">{msg.subject}</p>
                </TableCell>
                <TableCell className="hidden md:table-cell text-sm text-slate-500 whitespace-nowrap">
                  {msg.mobilePhone ?? <span className="text-slate-300">—</span>}
                </TableCell>
                <TableCell className="hidden lg:table-cell text-sm text-slate-500 whitespace-nowrap">
                  {formatDate(msg.createdAt)}
                </TableCell>
                <TableCell className="text-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSelected(msg)}
                    className="cursor-pointer h-8 w-8 text-blue-400 hover:text-blue-600 hover:bg-blue-50"
                    aria-label="Detayı gör"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Message detail dialog */}
      <Dialog
        open={!!selected}
        onOpenChange={(open) => !open && setSelected(null)}
      >
        <DialogContent className="max-w-md p-0 overflow-hidden">
          <DialogHeader className="px-5 pt-5 pb-3 border-b border-slate-100">
            <DialogTitle className="text-sm font-semibold text-slate-800 leading-snug">
              {selected?.subject}
            </DialogTitle>
          </DialogHeader>

          <div className="px-5 py-4 flex flex-col gap-3">
            <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
              <dt className="text-slate-400 font-medium whitespace-nowrap">
                Ad Soyad
              </dt>
              <dd className="text-slate-700">{selected?.fullName}</dd>

              <dt className="text-slate-400 font-medium whitespace-nowrap">
                E-posta
              </dt>
              <dd className="text-slate-700 break-all">{selected?.email}</dd>

              {selected?.mobilePhone && (
                <>
                  <dt className="text-slate-400 font-medium whitespace-nowrap">
                    Telefon
                  </dt>
                  <dd className="text-slate-700">{selected.mobilePhone}</dd>
                </>
              )}

              <dt className="text-slate-400 font-medium whitespace-nowrap">
                Tarih
              </dt>
              <dd className="text-slate-700">
                {selected && formatDate(selected.createdAt)}
              </dd>
            </dl>

            <div className="border-t border-slate-100" />

            <div>
              <p className="mb-1.5 text-xs font-medium text-slate-400 uppercase tracking-wide">
                Mesaj
              </p>
              <p className="text-sm leading-relaxed text-slate-700 whitespace-pre-wrap">
                {selected?.message}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

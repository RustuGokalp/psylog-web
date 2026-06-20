"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ContactMessage } from "@/types/contact";
import { formatTurkishDateTime } from "@/lib/format";

interface ContactDetailModalProps {
  message: ContactMessage | null;
  onClose: () => void;
}

export default function ContactDetailModal({
  message,
  onClose,
}: ContactDetailModalProps) {
  return (
    <Dialog open={!!message} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="max-w-md p-0 overflow-hidden"
        showCloseButton={false}
      >
        <DialogHeader className="px-5 pt-5 pb-3 border-b border-slate-100">
          <DialogTitle className="text-lg font-semibold text-slate-800 leading-snug">
            İletişim Detayı
          </DialogTitle>
        </DialogHeader>

        <div className="px-5 py-4 flex flex-col gap-3">
          <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
            <dt className="text-slate-400 font-medium whitespace-nowrap">
              Ad Soyad
            </dt>
            <dd className="text-slate-700">{message?.fullName}</dd>

            <dt className="text-slate-400 font-medium whitespace-nowrap">
              E-posta
            </dt>
            <dd className="text-slate-700 break-all">{message?.email}</dd>

            {message?.mobilePhone && (
              <>
                <dt className="text-slate-400 font-medium whitespace-nowrap">
                  Telefon
                </dt>
                <dd className="text-slate-700">{message.mobilePhone}</dd>
              </>
            )}

            <dt className="text-slate-400 font-medium whitespace-nowrap">
              Tarih
            </dt>
            <dd className="text-slate-700">
              {message && formatTurkishDateTime(message.createdAt)}
            </dd>
          </dl>

          <div className="border-t border-slate-100" />

          {message?.subject && (
            <div>
              <p className="mb-1.5 text-xs font-medium text-slate-400 uppercase tracking-wide">
                Konu
              </p>
              <p className="text-sm leading-relaxed text-slate-700 whitespace-pre-wrap break-all">
                {message.subject}
              </p>
            </div>
          )}

          <div>
            <p className="mb-1.5 text-xs font-medium text-slate-400 uppercase tracking-wide">
              Mesaj
            </p>
            <p className="text-sm leading-relaxed text-slate-700 whitespace-pre-wrap">
              {message?.message}
            </p>
          </div>
        </div>

        <DialogFooter className="mx-0 mb-0 rounded-none border-t border-slate-100 bg-transparent px-5 py-3">
          <DialogClose render={<Button variant="outline" size="lg" />}>
            Kapat
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

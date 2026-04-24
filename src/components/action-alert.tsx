"use client";

import {
  CheckCircle2,
  XCircle,
  TriangleAlert,
  Info,
  Loader2,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export type AlertType = "success" | "error" | "warning" | "info";

interface ActionAlertProps {
  open: boolean;
  onClose: () => void;
  type: AlertType;
  title: string;
  description?: string;
  content?: React.ReactNode;
  onConfirm?: () => void;
  confirmLabel?: string;
  confirmClassName?: string;
  closeLabel?: string;
  loading?: boolean;
}

const alertConfig: Record<
  AlertType,
  {
    icon: React.ElementType;
    iconClass: string;
    confirmVariant: "default" | "destructive";
  }
> = {
  success: {
    icon: CheckCircle2,
    iconClass: "text-green-600",
    confirmVariant: "default",
  },
  error: {
    icon: XCircle,
    iconClass: "text-destructive",
    confirmVariant: "destructive",
  },
  warning: {
    icon: TriangleAlert,
    iconClass: "text-amber-500",
    confirmVariant: "destructive",
  },
  info: {
    icon: Info,
    iconClass: "text-blue-500",
    confirmVariant: "default",
  },
};

export function ActionAlert({
  open,
  onClose,
  type,
  title,
  description,
  content,
  onConfirm,
  confirmLabel = "Onayla",
  confirmClassName,
  closeLabel = "Kapat",
  loading = false,
}: ActionAlertProps) {
  const { icon: Icon, iconClass, confirmVariant } = alertConfig[type];

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent showCloseButton={false} className="max-w-sm">
        <DialogHeader className="items-center text-center">
          <Icon className={`size-18 ${iconClass} mb-1`} />
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {content && (
          <div className="rounded-lg border border-slate-100 bg-slate-50 px-4 py-3 text-sm">
            {content}
          </div>
        )}
        <DialogFooter className="justify-center">
          <Button variant="outline" onClick={onClose} disabled={loading}>
            {closeLabel}
          </Button>
          {onConfirm && (
            <Button
              variant={confirmVariant}
              onClick={onConfirm}
              disabled={loading}
              className={confirmClassName}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Bekleniyor...
                </span>
              ) : (
                confirmLabel
              )}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

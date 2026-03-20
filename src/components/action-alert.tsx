"use client";

import { CheckCircle2, XCircle, TriangleAlert, Info } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type AlertType = "success" | "error" | "warning" | "info";

interface ActionAlertProps {
  open: boolean;
  onClose: () => void;
  type: AlertType;
  title: string;
  description?: string;
}

const alertConfig: Record<
  AlertType,
  {
    icon: React.ElementType;
    iconClass: string;
    buttonVariant: "default" | "destructive";
  }
> = {
  success: {
    icon: CheckCircle2,
    iconClass: "text-green-600",
    buttonVariant: "default",
  },
  error: {
    icon: XCircle,
    iconClass: "text-destructive",
    buttonVariant: "destructive",
  },
  warning: {
    icon: TriangleAlert,
    iconClass: "text-amber-500",
    buttonVariant: "default",
  },
  info: { icon: Info, iconClass: "text-blue-500", buttonVariant: "default" },
};

export function ActionAlert({
  open,
  onClose,
  type,
  title,
  description,
}: ActionAlertProps) {
  const { icon: Icon, iconClass, buttonVariant } = alertConfig[type];

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent showCloseButton={false} className="max-w-sm">
        <DialogHeader className="items-center text-center">
          <Icon className={`size-18 ${iconClass} mb-1`} />
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <DialogFooter className="justify-center">
          <Button variant={buttonVariant} onClick={onClose}>
            Kapat
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

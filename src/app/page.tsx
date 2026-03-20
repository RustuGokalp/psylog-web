"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ActionAlert } from "@/components/action-alert";

type AlertType = "success" | "error" | "warning" | "info";

interface AlertState {
  open: boolean;
  type: AlertType;
  title: string;
  description?: string;
}

const ALERT_EXAMPLES: Record<AlertType, Omit<AlertState, "open">> = {
  success: {
    type: "success",
    title: "Post published",
    description: "Your post is now live and visible to everyone.",
  },
  error: {
    type: "error",
    title: "Something went wrong",
    description: "The post could not be deleted. Please try again.",
  },
  warning: {
    type: "warning",
    title: "Unsaved changes",
    description: "You have unsaved changes. They will be lost if you leave.",
  },
  info: {
    type: "info",
    title: "Draft saved",
    description: "Your draft has been saved automatically.",
  },
};

export default function Home() {
  const [alert, setAlert] = useState<AlertState>({
    open: false,
    type: "info",
    title: "",
  });

  function openAlert(type: AlertType) {
    setAlert({ open: true, ...ALERT_EXAMPLES[type] });
  }

  function closeAlert() {
    setAlert((prev) => ({ ...prev, open: false }));
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-12 p-16">
      <section className="flex flex-col gap-4">
        <h2 className="text-sm font-medium text-zinc-500">ActionAlert</h2>
        <div className="flex flex-wrap gap-3">
          <Button onClick={() => openAlert("success")}>Success</Button>
          <Button onClick={() => openAlert("error")} variant="destructive">
            Error
          </Button>
          <Button onClick={() => openAlert("warning")} variant="outline">
            Warning
          </Button>
          <Button onClick={() => openAlert("info")} variant="secondary">
            Info
          </Button>
        </div>
      </section>

      <ActionAlert
        open={alert.open}
        onClose={closeAlert}
        type={alert.type}
        title={alert.title}
        description={alert.description}
      />
    </div>
  );
}

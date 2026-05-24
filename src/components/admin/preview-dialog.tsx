"use client";

import { useState, ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface PreviewTab {
  value: string;
  label: string;
  content: ReactNode;
}

interface PreviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  tabs: PreviewTab[];
}

export default function PreviewDialog({
  open,
  onOpenChange,
  title,
  tabs,
}: PreviewDialogProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.value ?? "");

  const activeContent = tabs.find((t) => t.value === activeTab)?.content;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="flex max-h-[85vh] w-full max-w-[calc(100%-2rem)] flex-col gap-0 overflow-hidden p-0 sm:max-w-4xl"
        showCloseButton
      >
        {/* Sticky header */}
        <DialogHeader className="sticky top-0 z-10 shrink-0 border-b border-slate-100 bg-white px-4 pb-3 pt-4 sm:px-6">
          <div className="flex flex-col gap-3 pr-8">
            <DialogTitle className="text-base font-semibold text-slate-800">
              {title}
            </DialogTitle>

            {tabs.length > 1 && (
              <div
                role="tablist"
                aria-label="Önizleme sekmeleri"
                className="inline-flex rounded-lg border border-slate-200 bg-slate-50 p-1 gap-1"
              >
                {tabs.map((tab) => (
                  <button
                    key={tab.value}
                    role="tab"
                    aria-selected={activeTab === tab.value}
                    onClick={() => setActiveTab(tab.value)}
                    className={cn(
                      "flex-1 rounded-md px-4 py-1.5 text-sm font-medium transition-colors",
                      activeTab === tab.value
                        ? "bg-white text-slate-800 shadow-sm border border-slate-200"
                        : "text-slate-500 hover:text-slate-700",
                    )}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </DialogHeader>

        {/* Scrollable panel */}
        <div role="tabpanel" className="min-h-0 flex-1 overflow-y-auto">
          {activeContent}
        </div>
      </DialogContent>
    </Dialog>
  );
}

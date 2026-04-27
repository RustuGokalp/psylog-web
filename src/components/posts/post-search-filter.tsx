"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Tag, ChevronDown, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsiblePanel,
} from "@/components/ui/collapsible";

interface PostSearchFilterProps {
  initialKeyword?: string;
  initialTag?: string;
}

export default function PostSearchFilter({
  initialKeyword,
  initialTag,
}: PostSearchFilterProps) {
  const router = useRouter();
  const [open, setOpen] = useState(!!(initialKeyword || initialTag));
  const [keyword, setKeyword] = useState(initialKeyword ?? "");
  const [tag, setTag] = useState(initialTag ?? "");
  const [appliedKeyword, setAppliedKeyword] = useState(initialKeyword ?? "");
  const [appliedTag, setAppliedTag] = useState(initialTag ?? "");

  const isDirty = keyword !== appliedKeyword || tag !== appliedTag;
  const hasActiveFilter = !!(appliedKeyword || appliedTag);
  const canCancel = isDirty || hasActiveFilter;

  function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isDirty) return;
    const trimmedKeyword = keyword.trim();
    const trimmedTag = tag.trim();
    setAppliedKeyword(trimmedKeyword);
    setAppliedTag(trimmedTag);
    const params = new URLSearchParams();
    if (trimmedKeyword) params.set("keyword", trimmedKeyword);
    if (trimmedTag) params.set("tag", trimmedTag);
    const query = params.toString();
    router.push(query ? `/yazilarim?${query}` : "/yazilarim");
  }

  function handleClear() {
    setKeyword("");
    setTag("");
    setAppliedKeyword("");
    setAppliedTag("");
    router.push("/yazilarim");
  }

  return (
    <Collapsible open={open} onOpenChange={setOpen} className="mb-8">
      <div className="rounded-2xl border border-slate-100 bg-white shadow-sm">
        <CollapsibleTrigger className="flex w-full cursor-pointer items-center justify-between px-4 py-3 text-sm font-medium text-slate-700 hover:text-slate-900">
          <div className="flex items-center gap-2">
            <SlidersHorizontal
              className="h-4 w-4 text-slate-400"
              aria-hidden="true"
            />
            <span>Filtrele</span>
            {hasActiveFilter && (
              <span
                className="h-2 w-2 rounded-full bg-rose-500"
                aria-label="Aktif filtre var"
              />
            )}
          </div>
          <ChevronDown
            className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            aria-hidden="true"
          />
        </CollapsibleTrigger>

        <CollapsiblePanel open={open}>
          <form
            onSubmit={handleSubmit}
            className="border-t border-slate-100 px-4 pb-4 pt-3"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex flex-1 gap-3">
                <div className="relative flex-1">
                  <Search
                    className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                    aria-hidden="true"
                  />
                  <Input
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="Anahtar kelime ara…"
                    className="h-10 pl-9 text-xs sm:text-sm"
                  />
                </div>

                <div className="relative flex-1">
                  <Tag
                    className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                    aria-hidden="true"
                  />
                  <Input
                    type="text"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    placeholder="Etiket…"
                    className="h-10 pl-9 text-xs sm:text-sm"
                  />
                </div>
              </div>

              <div className="flex gap-2 sm:shrink-0">
                <Button
                  type="submit"
                  disabled={!isDirty}
                  className="h-10 w-full bg-rose-500 hover:bg-rose-600 text-white sm:w-20"
                >
                  Ara
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClear}
                  disabled={!canCancel}
                  className="h-10 w-full sm:w-20"
                >
                  İptal
                </Button>
              </div>
            </div>
          </form>
        </CollapsiblePanel>
      </div>
    </Collapsible>
  );
}

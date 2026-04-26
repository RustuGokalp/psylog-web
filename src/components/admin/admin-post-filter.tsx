"use client";

import { useState } from "react";
import { Search, Tag } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface AdminPostFilterProps {
  onSearch: (keyword: string, tag: string) => void;
}

export default function AdminPostFilter({ onSearch }: AdminPostFilterProps) {
  const [keyword, setKeyword] = useState("");
  const [tag, setTag] = useState("");
  const [appliedKeyword, setAppliedKeyword] = useState("");
  const [appliedTag, setAppliedTag] = useState("");

  const isDirty = keyword !== appliedKeyword || tag !== appliedTag;
  const hasActiveFilter = !!(appliedKeyword || appliedTag);
  const canCancel = isDirty || hasActiveFilter;

  function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isDirty) return;
    setAppliedKeyword(keyword.trim());
    setAppliedTag(tag.trim());
    onSearch(keyword.trim(), tag.trim());
  }

  function handleClear() {
    setKeyword("");
    setTag("");
    if (hasActiveFilter) {
      setAppliedKeyword("");
      setAppliedTag("");
      onSearch("", "");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-slate-200 bg-white p-4"
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
              className="pl-9 text-xs sm:text-sm"
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
              className="pl-9 text-xs sm:text-sm"
            />
          </div>
        </div>

        <div className="flex gap-2 sm:shrink-0">
          <Button
            type="submit"
            disabled={!isDirty}
            className="h-8 w-full bg-violet-600 hover:bg-violet-700 text-white sm:w-20"
          >
            Ara
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={handleClear}
            disabled={!canCancel}
            className="h-8 w-full sm:w-20"
          >
            İptal
          </Button>
        </div>
      </div>
    </form>
  );
}

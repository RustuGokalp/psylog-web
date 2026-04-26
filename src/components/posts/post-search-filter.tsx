"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Tag } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface PostSearchFilterProps {
  initialKeyword?: string;
  initialTag?: string;
}

export default function PostSearchFilter({
  initialKeyword,
  initialTag,
}: PostSearchFilterProps) {
  const router = useRouter();
  const [keyword, setKeyword] = useState(initialKeyword ?? "");
  const [tag, setTag] = useState(initialTag ?? "");
  const [isCancelling, setIsCancelling] = useState(false);

  const isDirty =
    keyword !== (initialKeyword ?? "") || tag !== (initialTag ?? "");
  const hasActiveFilter = !!(initialKeyword || initialTag);
  const canCancel = isDirty || hasActiveFilter;

  function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isDirty) return;
    const params = new URLSearchParams();
    if (keyword.trim()) params.set("keyword", keyword.trim());
    if (tag.trim()) params.set("tag", tag.trim());
    const query = params.toString();
    router.push(query ? `/yazilarim?${query}` : "/yazilarim");
  }

  function handleClear() {
    setIsCancelling(true);
    setKeyword("");
    setTag("");
    if (initialKeyword || initialTag) {
      router.push("/yazilarim");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"
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
            disabled={!isDirty || isCancelling}
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
  );
}

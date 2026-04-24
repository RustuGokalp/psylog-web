import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface AdminPaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function buildPageWindows(current: number, total: number): (number | "...")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i);
  }

  const pages: (number | "...")[] = [];
  const left = Math.max(1, current - 1);
  const right = Math.min(total - 2, current + 1);

  pages.push(0);

  if (left > 1) pages.push("...");

  for (let i = left; i <= right; i++) {
    pages.push(i);
  }

  if (right < total - 2) pages.push("...");

  pages.push(total - 1);

  return pages;
}

export default function AdminPagination({
  page,
  totalPages,
  onPageChange,
}: AdminPaginationProps) {
  if (totalPages <= 1) return null;

  const windows = buildPageWindows(page, totalPages);

  return (
    <div className="flex items-center justify-center gap-1">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 0}
        className="gap-1 text-slate-600"
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="hidden sm:inline">Önceki</span>
      </Button>

      {windows.map((item, index) =>
        item === "..." ? (
          <span
            key={`ellipsis-${index}`}
            className="px-2 text-sm text-slate-400 select-none"
          >
            …
          </span>
        ) : (
          <Button
            key={item}
            variant={item === page ? "default" : "ghost"}
            size="sm"
            onClick={() => onPageChange(item)}
            className={
              item === page
                ? "bg-violet-600 text-white hover:bg-violet-700 min-w-9"
                : "text-slate-600 min-w-9"
            }
          >
            {item + 1}
          </Button>
        ),
      )}

      <Button
        variant="ghost"
        size="sm"
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages - 1}
        className="gap-1 text-slate-600"
      >
        <span className="hidden sm:inline">Sonraki</span>
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}

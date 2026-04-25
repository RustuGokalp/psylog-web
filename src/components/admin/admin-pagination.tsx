import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

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

  function go(e: React.MouseEvent, target: number) {
    e.preventDefault();
    onPageChange(target);
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            text="Önceki"
            onClick={(e) => go(e, page - 1)}
            className={
              page === 0 ? "pointer-events-none opacity-40" : "cursor-pointer"
            }
          />
        </PaginationItem>

        {windows.map((item, index) =>
          item === "..." ? (
            <PaginationItem key={`ellipsis-${index}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={item}>
              <PaginationLink
                isActive={item === page}
                onClick={(e) => go(e, item)}
                className="cursor-pointer"
              >
                {item + 1}
              </PaginationLink>
            </PaginationItem>
          ),
        )}

        <PaginationItem>
          <PaginationNext
            text="Sonraki"
            onClick={(e) => go(e, page + 1)}
            className={
              page >= totalPages - 1
                ? "pointer-events-none opacity-40"
                : "cursor-pointer"
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

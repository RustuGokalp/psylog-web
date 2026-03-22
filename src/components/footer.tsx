import { SITE_NAME } from "@/lib/constants";
import Star from "@/components/icons/star";
import Daisy from "@/components/icons/daisy";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t bg-background">
      <Star  className="pointer-events-none absolute top-1/2 right-6 h-4 w-4 -translate-y-1/2 text-muted-foreground/20" aria-hidden="true" />
      <Daisy className="pointer-events-none absolute top-1/2 left-6 h-4 w-4 -translate-y-1/2 text-muted-foreground/20" aria-hidden="true" />
      <div className="relative">
        <div className="mx-auto max-w-5xl px-4 py-6 text-center text-sm text-muted-foreground">
          &copy; {year} {SITE_NAME}. Tüm hakları saklıdır.
        </div>
      </div>
    </footer>
  );
}

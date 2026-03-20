import { SITE_NAME } from "@/lib/constants";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-5xl px-4 py-6 text-center text-sm text-muted-foreground">
        &copy; {year} {SITE_NAME}. Tüm hakları saklıdır.
      </div>
    </footer>
  );
}

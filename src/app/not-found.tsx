import type { Metadata } from "next";
import Link from "next/link";
import NavBar from "@/components/nav-bar";
import Footer from "@/components/footer";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = {
  ...createMetadata({
    title: "Sayfa Bulunamadı",
    description:
      "Aradığınız sayfa mevcut değil. Ana sayfaya dönerek devam edebilirsiniz.",
  }),
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />
      <main className="flex flex-1 items-center justify-center px-4 py-16">
        <div className="mx-auto max-w-md text-center">
          <p className="text-sm font-medium text-muted-foreground">404</p>
          <h1 className="mt-3 text-2xl font-semibold tracking-tight">
            Sayfa bulunamadı
          </h1>
          <p className="mt-4 text-base text-muted-foreground">
            Aradığınız sayfa taşınmış ya da artık mevcut olmayabilir.
            Endişelenmeyin — ana sayfadan devam edebilirsiniz.
          </p>
          <div className="mt-8">
            <Link
              href="/"
              className="inline-flex h-8 items-center justify-center rounded-lg bg-primary px-2.5 text-sm font-medium text-primary-foreground transition-all"
            >
              Ana Sayfaya Dön
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

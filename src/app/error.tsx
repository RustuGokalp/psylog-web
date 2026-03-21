"use client";

import Link from "next/link";
import NavBar from "@/components/nav-bar";
import Footer from "@/components/footer";
import { Button, buttonVariants } from "@/components/ui/button";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ reset }: ErrorPageProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />
      <main className="flex flex-1 items-center justify-center px-4 py-16">
        <div className="mx-auto max-w-md text-center">
          <p className="text-sm font-medium text-muted-foreground">Hata</p>
          <h1 className="mt-3 text-2xl font-semibold tracking-tight">
            Bir şeyler ters gitti
          </h1>
          <p className="mt-4 text-base text-muted-foreground">
            Beklenmedik bir hata oluştu. Sayfayı yeniden yüklemeyi deneyebilir
            ya da ana sayfaya dönebilirsiniz.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button onClick={reset}>Tekrar Dene</Button>
            <Link href="/" className={buttonVariants({ variant: "outline" })}>
              Ana Sayfaya Dön
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

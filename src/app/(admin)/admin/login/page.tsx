import type { Metadata } from "next";
import { Suspense } from "react";
import LoginForm from "@/components/admin/login-form";

export const metadata: Metadata = {
  title: "Admin Girişi | Psylog",
  description: "Psylog yönetim paneline giriş yapın.",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50 px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-violet-700 mb-1">Psylog Admin</h1>
          <p className="text-sm text-slate-500">Yönetim paneline giriş yapın</p>
        </div>
        <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-8">
          <Suspense>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

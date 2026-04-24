"use client";

import { usePathname } from "next/navigation";
import AdminSidebar from "@/components/admin/sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminSidebar />
      <div className="lg:pl-64">
        <main className="min-h-screen pt-14 lg:pt-0 overflow-x-hidden">
          <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">{children}</div>
        </main>
      </div>
    </div>
  );
}

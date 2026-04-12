"use client";

import { usePathname } from "next/navigation";
import AdminSidebar from "@/components/admin/sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Login page renders without the admin shell
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 lg:flex-row">
      <AdminSidebar />
      <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
    </div>
  );
}

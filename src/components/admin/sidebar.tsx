"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ActionAlert } from "@/components/action-alert";
import { ApiException } from "@/lib/api";
import { logout } from "@/services/auth.service";
import { FileText, LogOut, Mail, Menu, Brain } from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    label: "Yazılar",
    href: "/admin/posts",
    icon: <FileText className="h-4 w-4" />,
  },
  {
    label: "İletişim",
    href: "/admin/contact",
    icon: <Mail className="h-4 w-4" />,
  },
];

interface SidebarContentProps {
  isActive: (href: string) => boolean;
  onLogout: () => void;
  onNavClick?: () => void;
}

function SidebarContent({
  isActive,
  onLogout,
  onNavClick,
}: SidebarContentProps) {
  return (
    <div className="flex h-full flex-col">
      {/* Brand */}
      <div className="flex items-center gap-2 px-6 py-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-600">
          <Brain className="h-5 w-5 text-white" />
        </div>
        <div>
          <p className="text-sm font-semibold leading-tight text-gray-900">
            Psylog
          </p>
          <p className="text-xs text-gray-500">Admin Paneli</p>
        </div>
      </div>

      <Separator />

      {/* Nav */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavClick}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              isActive(item.href)
                ? "bg-violet-100 text-violet-700"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            }`}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
      </nav>

      <Separator />

      {/* Logout */}
      <div className="px-3 py-4">
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start gap-3 text-gray-600 hover:text-red-600 hover:bg-red-50 cursor-pointer"
          onClick={onLogout}
        >
          <LogOut className="h-4 w-4" />
          Çıkış Yap
        </Button>
      </div>
    </div>
  );
}

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [logoutConfirm, setLogoutConfirm] = useState(false);
  const [logoutError, setLogoutError] = useState<string | null>(null);

  async function executeLogout() {
    setLogoutConfirm(false);
    try {
      await logout();
      router.push("/admin/login");
      router.refresh();
    } catch (err) {
      const msg =
        err instanceof ApiException
          ? err.message
          : "Çıkış yapılırken bir hata oluştu.";
      setLogoutError(msg);
    }
  }

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(href + "/");
  }

  return (
    <>
      {/* Desktop sidebar — fixed */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-30 lg:flex lg:w-64 lg:flex-col border-r border-gray-200 bg-white">
        <SidebarContent
          isActive={isActive}
          onLogout={() => setLogoutConfirm(true)}
        />
      </aside>

      {/* Mobile top bar — fixed */}
      <header className="fixed top-0 left-0 right-0 z-20 flex h-14 items-center justify-between border-b border-gray-200 bg-white px-4 lg:hidden">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-600">
            <Brain className="h-4 w-4 text-white" />
          </div>
          <span className="text-sm font-semibold text-gray-900">
            Admin Paneli
          </span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setMobileOpen(true)}
          aria-label="Menüyü aç"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer panel */}
          <aside className="absolute left-0 top-0 h-full w-72 bg-white shadow-xl">
            <SidebarContent
              isActive={isActive}
              onLogout={() => setLogoutConfirm(true)}
              onNavClick={() => setMobileOpen(false)}
            />
          </aside>
        </div>
      )}

      <ActionAlert
        open={logoutConfirm}
        type="warning"
        title="Çıkış Yap"
        description="Oturumunuzu kapatmak istediğinizden emin misiniz?"
        onClose={() => setLogoutConfirm(false)}
        onConfirm={executeLogout}
        confirmLabel="Çıkış Yap"
      />

      <ActionAlert
        open={!!logoutError}
        type="error"
        title="Çıkış Yapılamadı"
        description={logoutError ?? undefined}
        onClose={() => setLogoutError(null)}
      />
    </>
  );
}

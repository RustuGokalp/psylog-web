import type { Metadata } from "next";
import SpecializationForm from "@/components/admin/specialization-form";

export const metadata: Metadata = {
  title: "Yeni Çalışma Alanı | Psylog Admin",
  description: "Yeni bir çalışma alanı oluşturun.",
  robots: { index: false, follow: false },
};

export default function NewSpecializationPage() {
  return (
    <div className="flex flex-col gap-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          Yeni Çalışma Alanı
        </h1>
        <p className="text-sm text-slate-500 mt-0.5">
          Yeni bir çalışma alanı oluşturun
        </p>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <SpecializationForm mode="create" />
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import PostForm from "@/components/admin/post-form";

export const metadata: Metadata = {
  title: "Yeni Yazı | Psylog Admin",
  description: "Yeni bir blog yazısı oluşturun.",
  robots: { index: false, follow: false },
};

export default function NewPostPage() {
  return (
    <div className="flex flex-col gap-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Yeni Yazı</h1>
        <p className="text-sm text-slate-500 mt-0.5">
          Yeni bir blog yazısı oluşturun
        </p>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <PostForm mode="create" />
      </div>
    </div>
  );
}

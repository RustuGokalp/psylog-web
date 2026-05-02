"use client";

import { useRef, useState, DragEvent, ChangeEvent } from "react";
import Image from "next/image";
import { UploadCloud, X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  aspectRatio?: "video" | "square";
  label?: string;
}

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!;

async function uploadToCloudinary(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    { method: "POST", body: formData },
  );

  if (!res.ok) throw new Error("Yükleme başarısız.");
  const data = await res.json();
  // Insert f_auto so Cloudinary serves browser-compatible format (fixes HEIC etc.)
  return (data.secure_url as string).replace("/upload/", "/upload/f_auto/");
}

export default function ImageUpload({
  value,
  onChange,
  aspectRatio = "video",
  label = "Görsel",
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(file: File) {
    if (!file.type.startsWith("image/")) {
      setError("Sadece görsel dosyaları yükleyebilirsiniz.");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const url = await uploadToCloudinary(file);
      onChange(url);
    } catch {
      setError("Yükleme başarısız. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  }

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = "";
  }

  const isSquare = aspectRatio === "square";

  return (
    <div className="flex flex-col gap-1.5">
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-lg border-2 border-dashed transition-colors",
          isSquare ? "max-w-40" : "aspect-video",
          dragging
            ? "border-violet-400 bg-violet-50"
            : "border-slate-200 bg-slate-50 hover:border-slate-300",
          loading && "pointer-events-none",
        )}
        style={isSquare ? { aspectRatio: "1/1" } : undefined}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => !loading && inputRef.current?.click()}
        role="button"
        tabIndex={0}
        aria-label={`${label} yükle`}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
        }}
      >
        {value && !loading ? (
          <>
            <Image
              src={value}
              alt={label}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 600px"
            />
            <div className="absolute inset-0 bg-black/0 transition-colors hover:bg-black/20" />
            <p className="absolute bottom-2 left-0 right-0 text-center text-xs text-white opacity-0 drop-shadow transition-opacity hover:opacity-100">
              Değiştirmek için tıkla veya sürükle
            </p>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-2 p-4 text-center cursor-pointer">
            {loading ? (
              <>
                <Loader2 className="h-6 w-6 animate-spin text-violet-500" />
                <span className="text-xs text-slate-500">Yükleniyor...</span>
              </>
            ) : (
              <>
                <UploadCloud
                  className={cn(
                    "h-7 w-7 transition-colors",
                    dragging ? "text-violet-500" : "text-slate-400",
                  )}
                />
                <div>
                  <p className="text-xs font-medium text-slate-600">
                    Sürükle bırak
                  </p>
                  <p className="text-xs text-slate-400">veya tıkla</p>
                </div>
              </>
            )}
          </div>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleChange}
        />
      </div>

      {value && !loading && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="inline-flex w-fit items-center gap-1 text-xs text-slate-400 hover:text-red-500 transition-colors"
        >
          <X className="h-3 w-3" />
          Görseli kaldır
        </button>
      )}

      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

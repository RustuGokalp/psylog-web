"use client";

import { useCallback, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  getAboutAdmin,
  createAbout,
  updateAbout,
  deleteAbout,
} from "@/services/about.service";
import { About } from "@/types/about";
import { ApiException } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import RichTextEditor from "@/components/admin/rich-text-editor";
import ImageUpload from "@/components/admin/image-upload";
import { Skeleton } from "@/components/ui/skeleton";
import { ActionAlert } from "@/components/action-alert";
import { Plus, X } from "lucide-react";

const aboutSchema = Yup.object({
  message: Yup.string().trim().required("Hakkımda metni zorunludur."),
  profileImage: Yup.string()
    .url("Geçerli bir URL girin.")
    .nullable()
    .optional(),
  education: Yup.array().of(Yup.string().defined()),
  workingAreas: Yup.array().of(Yup.string().defined()),
});

type AboutFormValues = {
  message: string;
  profileImage: string;
  education: string[];
  workingAreas: string[];
};

type ResultAlert = {
  open: boolean;
  type: "success" | "error";
  title: string;
  description?: string;
};

function buildInitialValues(data: About | null): AboutFormValues {
  if (!data)
    return { message: "", profileImage: "", education: [], workingAreas: [] };
  return {
    message: data.message,
    profileImage: data.profileImage ?? "",
    education: data.education,
    workingAreas: data.workingAreas,
  };
}

export default function AdminAboutPage() {
  const [existing, setExisting] = useState<About | null>(null);
  const [loading, setLoading] = useState(true);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [eduInput, setEduInput] = useState("");
  const [workInput, setWorkInput] = useState("");
  const [resultAlert, setResultAlert] = useState<ResultAlert>({
    open: false,
    type: "success",
    title: "",
  });

  const isUpdate = existing !== null;

  const formik = useFormik<AboutFormValues>({
    initialValues: buildInitialValues(existing),
    enableReinitialize: true,
    validationSchema: aboutSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: (_values, { setSubmitting }) => {
      setSubmitting(false);
      setConfirmOpen(true);
    },
  });

  const loadAbout = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAboutAdmin();
      setExisting(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAbout();
  }, [loadAbout]);

  async function handleConfirm() {
    const values = formik.values;
    setIsLoading(true);

    const payload = {
      message: values.message.trim(),
      profileImage: values.profileImage.trim() || null,
      education: values.education.filter((e) => e.trim()),
      workingAreas: values.workingAreas.filter((w) => w.trim()),
    };

    try {
      const result = isUpdate
        ? await updateAbout(payload)
        : await createAbout(payload);
      setExisting(result);
      setResultAlert({
        open: true,
        type: "success",
        title: isUpdate ? "Güncellendi" : "Kaydedildi",
        description: "Hakkımda bilgileri başarıyla kaydedildi.",
      });
    } catch (err) {
      const msg =
        err instanceof ApiException
          ? err.message
          : "Bir hata oluştu. Lütfen tekrar deneyin.";
      setResultAlert({
        open: true,
        type: "error",
        title: "Hata",
        description: msg,
      });
    } finally {
      setIsLoading(false);
      setConfirmOpen(false);
    }
  }

  async function handleDelete() {
    setIsDeleting(true);
    try {
      await deleteAbout();
      setExisting(null);
      setDeleteConfirm(false);
      setResultAlert({
        open: true,
        type: "success",
        title: "Silindi",
        description: "Hakkımda kaydı başarıyla silindi.",
      });
    } catch (err) {
      const msg =
        err instanceof ApiException ? err.message : "Silme işlemi başarısız.";
      setDeleteConfirm(false);
      setResultAlert({
        open: true,
        type: "error",
        title: "Hata",
        description: msg,
      });
    } finally {
      setIsDeleting(false);
    }
  }

  function addEducation() {
    const val = eduInput.trim();
    if (!val) return;
    formik.setFieldValue("education", [...formik.values.education, val]);
    setEduInput("");
  }

  function removeEducation(index: number) {
    formik.setFieldValue(
      "education",
      formik.values.education.filter((_, i) => i !== index),
    );
  }

  function addWorkingArea() {
    const val = workInput.trim();
    if (!val) return;
    formik.setFieldValue("workingAreas", [...formik.values.workingAreas, val]);
    setWorkInput("");
  }

  function removeWorkingArea(index: number) {
    formik.setFieldValue(
      "workingAreas",
      formik.values.workingAreas.filter((_, i) => i !== index),
    );
  }

  return (
    <div className="flex flex-col gap-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Hakkımda</h1>
        <p className="mt-0.5 text-sm text-slate-500">
          {loading
            ? "Yükleniyor..."
            : isUpdate
              ? "Mevcut bilgileri düzenleyin"
              : "Henüz kayıt yok. Yeni bir kayıt oluşturun."}
        </p>
      </div>

      {loading ? (
        <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-full rounded-md" />
          ))}
        </div>
      ) : (
        <form
          onSubmit={formik.handleSubmit}
          noValidate
          className="flex flex-col gap-6"
        >
          <div className="flex flex-col gap-5 rounded-xl border border-slate-200 bg-white p-6">
            {/* message */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="message" className="text-slate-700 font-medium">
                Hakkımda Metni <span className="text-red-500">*</span>
              </Label>
              <RichTextEditor
                value={formik.values.message}
                onChange={(html) => formik.setFieldValue("message", html)}
                onBlur={() => formik.setFieldTouched("message", true)}
                placeholder="Hakkımda metnini buraya girin..."
                hasError={!!(formik.touched.message && formik.errors.message)}
                minHeight="200px"
              />
              {formik.touched.message && formik.errors.message && (
                <p
                  id="message-error"
                  role="alert"
                  className="text-xs text-destructive"
                >
                  {formik.errors.message}
                </p>
              )}
            </div>

            {/* profileImage */}
            <div className="flex flex-col gap-1.5">
              <Label className="text-slate-700 font-medium">
                Profil Fotoğrafı{" "}
                <span className="text-slate-400 font-normal text-xs">
                  (isteğe bağlı)
                </span>
              </Label>
              <ImageUpload
                value={formik.values.profileImage}
                onChange={(url) => formik.setFieldValue("profileImage", url)}
                aspectRatio="square"
                label="Profil fotoğrafı"
              />
            </div>

            {/* education */}
            <div className="flex flex-col gap-1.5">
              <Label className="text-slate-700 font-medium">
                Eğitim{" "}
                <span className="text-slate-400 font-normal text-xs">
                  (isteğe bağlı)
                </span>
              </Label>
              <div className="flex gap-2">
                <Input
                  value={eduInput}
                  onChange={(e) => setEduInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addEducation();
                    }
                  }}
                  placeholder="Ör: Psikoloji - Bahçeşehir Üniversitesi"
                  disabled={isLoading}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={addEducation}
                  disabled={isLoading || !eduInput.trim()}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              {formik.values.education.length > 0 && (
                <ul className="flex flex-col gap-1.5 mt-1">
                  {formik.values.education.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center justify-between gap-2 rounded-lg border border-violet-200 bg-violet-50 px-3 py-2 text-sm text-violet-800"
                    >
                      <span>{item}</span>
                      <button
                        type="button"
                        onClick={() => removeEducation(i)}
                        disabled={isLoading}
                        className="text-slate-400 hover:text-red-500 transition-colors disabled:opacity-50"
                        aria-label="Kaldır"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* workingAreas */}
            <div className="flex flex-col gap-1.5">
              <Label className="text-slate-700 font-medium">
                Çalışma Alanları{" "}
                <span className="text-slate-400 font-normal text-xs">
                  (isteğe bağlı)
                </span>
              </Label>
              <div className="flex gap-2">
                <Input
                  value={workInput}
                  onChange={(e) => setWorkInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addWorkingArea();
                    }
                  }}
                  placeholder="Ör: Bebek, Çocuk ve Genç Yetişkinler"
                  disabled={isLoading}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={addWorkingArea}
                  disabled={isLoading || !workInput.trim()}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              {formik.values.workingAreas.length > 0 && (
                <ul className="flex flex-col gap-1.5 mt-1">
                  {formik.values.workingAreas.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center justify-between gap-2 rounded-lg border border-violet-200 bg-violet-50 px-3 py-2 text-sm text-violet-800"
                    >
                      <span>{item}</span>
                      <button
                        type="button"
                        onClick={() => removeWorkingArea(i)}
                        disabled={isLoading}
                        className="text-slate-400 hover:text-red-500 transition-colors disabled:opacity-50"
                        aria-label="Kaldır"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <Button
            type="submit"
            disabled={formik.isSubmitting || isLoading || !formik.dirty}
            className="self-end bg-violet-600 hover:bg-violet-700 text-white"
          >
            {isUpdate ? "Güncelle" : "Kaydet"}
          </Button>

          {/* Danger zone — only when record exists */}
          {isUpdate && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-5">
              <p className="text-sm font-semibold text-red-700">
                Tehlikeli Alan
              </p>
              <p className="mt-1 text-xs text-red-500">
                Hakkımda kaydını silerseniz tüm bilgiler kalıcı olarak silinir
                ve bu işlem geri alınamaz.
              </p>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => setDeleteConfirm(true)}
                className="mt-4"
              >
                Kaydı Sil
              </Button>
            </div>
          )}
        </form>
      )}

      {/* Submit confirmation */}
      <ActionAlert
        open={confirmOpen}
        type="warning"
        title={
          isUpdate
            ? "Değişiklikleri kaydetmek istiyor musunuz?"
            : "Hakkımda bilgilerini kaydetmek istiyor musunuz?"
        }
        description="Formu göndermeden önce bilgilerinizi kontrol edin."
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleConfirm}
        confirmLabel={isUpdate ? "Güncelle" : "Kaydet"}
        confirmClassName="bg-green-600 hover:bg-green-700 text-white"
        closeLabel="İptal"
        loading={isLoading}
      />

      {/* Delete confirmation */}
      <ActionAlert
        open={deleteConfirm}
        type="warning"
        title="Hakkımda kaydını silmek istiyor musunuz?"
        description="Bu işlem geri alınamaz. Tüm bilgiler kalıcı olarak silinecektir."
        onClose={() => setDeleteConfirm(false)}
        onConfirm={handleDelete}
        confirmLabel="Evet, Sil"
        loading={isDeleting}
      />

      {/* Result feedback */}
      <ActionAlert
        open={resultAlert.open}
        type={resultAlert.type}
        title={resultAlert.title}
        description={resultAlert.description}
        onClose={() => setResultAlert((prev) => ({ ...prev, open: false }))}
      />
    </div>
  );
}

"use client";

import { useState, useMemo } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import {
  createSpecialization,
  updateSpecialization,
} from "@/services/specialization.service";
import { ApiException } from "@/lib/api";
import {
  specializationSchema,
  SpecializationFormValues,
} from "@/schemas/specialization.schema";
import { ActionAlert } from "@/components/action-alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import RichTextEditor from "@/components/admin/rich-text-editor";
import ImageUpload from "@/components/admin/image-upload";
import { Loader2 } from "lucide-react";

interface SpecializationFormProps {
  mode: "create" | "edit";
  initialValues?: Partial<SpecializationFormValues>;
  specializationId?: number;
  createdAt?: string;
  updatedAt?: string;
}

const defaultValues: SpecializationFormValues = {
  title: "",
  summary: "",
  content: "",
  image: "",
  displayOrder: "",
};

function formatDisplayDate(iso: string) {
  return new Date(iso).toLocaleString("tr-TR", {
    timeZone: "Europe/Istanbul",
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function buildPayload(values: SpecializationFormValues) {
  return {
    title: values.title,
    summary: values.summary,
    content: values.content,
    image: values.image || null,
    displayOrder:
      values.displayOrder !== "" ? Number(values.displayOrder) : null,
  };
}

type ResultAlert = {
  type: "success" | "error";
  title: string;
  description?: string;
} | null;

export default function SpecializationForm({
  mode,
  initialValues,
  specializationId,
  createdAt,
  updatedAt,
}: SpecializationFormProps) {
  const router = useRouter();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [resultAlert, setResultAlert] = useState<ResultAlert>(null);
  const [resultAlertOpen, setResultAlertOpen] = useState(false);

  const isEdit = mode === "edit";

  const stableInitialValues = useMemo(
    () => ({ ...defaultValues, ...initialValues }),
    // Deps are the primitive field values — stable across re-renders when data hasn't changed.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      initialValues?.title,
      initialValues?.summary,
      initialValues?.content,
      initialValues?.image,
      initialValues?.displayOrder,
    ],
  );

  const formik = useFormik<SpecializationFormValues>({
    initialValues: stableInitialValues,
    validationSchema: specializationSchema,
    onSubmit: async () => {
      setConfirmOpen(true);
    },
  });

  async function executeCreate() {
    formik.setSubmitting(true);
    try {
      await createSpecialization(buildPayload(formik.values));
      setConfirmOpen(false);
      setResultAlert({
        type: "success",
        title: "Çalışma Alanı Oluşturuldu",
        description: "Yeni çalışma alanı başarıyla oluşturuldu.",
      });
      setResultAlertOpen(true);
    } catch (err) {
      const msg =
        err instanceof ApiException
          ? err.message
          : "Bir hata oluştu. Lütfen tekrar deneyin.";
      setConfirmOpen(false);
      setResultAlert({
        type: "error",
        title: "Oluşturma Hatası",
        description: msg,
      });
      setResultAlertOpen(true);
    } finally {
      formik.setSubmitting(false);
    }
  }

  async function handleEditSaveClick() {
    const errors = await formik.validateForm();
    if (Object.keys(errors).length > 0) {
      await formik.setTouched(
        Object.fromEntries(Object.keys(formik.values).map((k) => [k, true])),
        true,
      );
      return;
    }
    setConfirmOpen(true);
  }

  async function executeUpdate() {
    formik.setSubmitting(true);
    try {
      await updateSpecialization(
        specializationId!,
        buildPayload(formik.values),
      );
      setConfirmOpen(false);
      setResultAlert({
        type: "success",
        title: "Değişiklikler Kaydedildi",
        description: "Çalışma alanı başarıyla güncellendi.",
      });
      setResultAlertOpen(true);
    } catch (err) {
      const msg =
        err instanceof ApiException
          ? err.message
          : "Bir hata oluştu. Lütfen tekrar deneyin.";
      setConfirmOpen(false);
      setResultAlert({
        type: "error",
        title: "Güncelleme Hatası",
        description: msg,
      });
      setResultAlertOpen(true);
    } finally {
      formik.setSubmitting(false);
    }
  }

  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        noValidate
        className="flex flex-col gap-6"
      >
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="title" className="text-slate-700 font-medium">
            Başlık <span className="text-red-500">*</span>
          </Label>
          <Input
            id="title"
            name="title"
            type="text"
            placeholder="Çalışma alanı başlığı"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={formik.isSubmitting}
            aria-describedby="title-error"
            className={
              formik.touched.title && formik.errors.title
                ? "border-red-400"
                : ""
            }
          />
          {formik.touched.title && formik.errors.title && (
            <p id="title-error" className="text-xs text-red-500">
              {formik.errors.title}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="summary" className="text-slate-700 font-medium">
            Özet <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="summary"
            name="summary"
            placeholder="Kısa özet..."
            value={formik.values.summary}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={formik.isSubmitting}
            rows={3}
            aria-describedby="summary-error"
            className={`resize-none ${
              formik.touched.summary && formik.errors.summary
                ? "border-red-400"
                : ""
            }`}
          />
          {formik.touched.summary && formik.errors.summary && (
            <p id="summary-error" className="text-xs text-red-500">
              {formik.errors.summary}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="content" className="text-slate-700 font-medium">
            İçerik <span className="text-red-500">*</span>
          </Label>
          <RichTextEditor
            value={formik.values.content}
            onChange={(html) => formik.setFieldValue("content", html)}
            onBlur={() => formik.setFieldTouched("content", true)}
            placeholder="Detaylı içerik..."
            hasError={!!(formik.touched.content && formik.errors.content)}
            minHeight="280px"
          />
          {formik.touched.content && formik.errors.content && (
            <p id="content-error" className="text-xs text-red-500">
              {formik.errors.content}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <Label className="text-slate-700 font-medium">
              Görsel{" "}
              <span className="text-slate-400 font-normal text-xs">
                (isteğe bağlı)
              </span>
            </Label>
            <ImageUpload
              value={formik.values.image}
              onChange={(url) => formik.setFieldValue("image", url)}
              aspectRatio="video"
              label="Çalışma alanı görseli"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label
              htmlFor="displayOrder"
              className="text-slate-700 font-medium"
            >
              Sıra Numarası{" "}
              <span className="text-slate-400 font-normal text-xs">
                (isteğe bağlı)
              </span>
            </Label>
            <Input
              id="displayOrder"
              name="displayOrder"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="Sıra Numarası"
              value={formik.values.displayOrder}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={formik.isSubmitting}
              aria-describedby="displayOrder-error"
              className={
                formik.touched.displayOrder && formik.errors.displayOrder
                  ? "border-red-400"
                  : ""
              }
            />
            {formik.touched.displayOrder && formik.errors.displayOrder && (
              <p id="displayOrder-error" className="text-xs text-red-500">
                {formik.errors.displayOrder}
              </p>
            )}
          </div>
        </div>

        {isEdit && (createdAt || updatedAt) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {createdAt && (
              <div className="flex flex-col gap-1.5">
                <Label className="text-slate-500 text-xs font-medium">
                  Oluşturulma Tarihi
                </Label>
                <Input
                  value={formatDisplayDate(createdAt)}
                  disabled
                  className="bg-slate-50 text-slate-500 text-sm"
                />
              </div>
            )}
            {updatedAt && (
              <div className="flex flex-col gap-1.5">
                <Label className="text-slate-500 text-xs font-medium">
                  Son Güncelleme
                </Label>
                <Input
                  value={formatDisplayDate(updatedAt)}
                  disabled
                  className="bg-slate-50 text-slate-500 text-sm"
                />
              </div>
            )}
          </div>
        )}

        <div className="flex items-center justify-end gap-3 pt-2">
          {isEdit ? (
            <Button
              type="button"
              onClick={handleEditSaveClick}
              disabled={formik.isSubmitting || !formik.dirty}
              className="bg-violet-600 hover:bg-violet-700 text-white min-w-35 disabled:opacity-50"
            >
              {formik.isSubmitting ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Kaydediliyor...
                </span>
              ) : (
                "Değişiklikleri Kaydet"
              )}
            </Button>
          ) : (
            <>
              <Button
                type="submit"
                disabled={formik.isSubmitting || !formik.dirty}
                className="bg-violet-600 hover:bg-violet-700 text-white min-w-35 disabled:opacity-50"
              >
                {formik.isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Oluşturuluyor...
                  </span>
                ) : (
                  "Oluştur"
                )}
              </Button>
              <Button
                type="button"
                variant="ghost"
                disabled={formik.isSubmitting}
                onClick={() => router.push("/admin/specializations")}
                className="text-slate-500"
              >
                İptal
              </Button>
            </>
          )}
        </div>
      </form>

      <ActionAlert
        open={confirmOpen}
        type="warning"
        title={isEdit ? "Değişiklikleri Kaydet" : "Çalışma Alanı Oluştur"}
        description={
          isEdit
            ? "Bu çalışma alanında yaptığınız değişiklikleri kaydetmek istediğinizden emin misiniz?"
            : "Yeni çalışma alanını oluşturmak istediğinizden emin misiniz?"
        }
        onClose={() => !formik.isSubmitting && setConfirmOpen(false)}
        onConfirm={isEdit ? executeUpdate : executeCreate}
        confirmLabel={isEdit ? "Kaydet" : "Oluştur"}
        confirmClassName="bg-green-600 hover:bg-green-700 text-white"
        loading={formik.isSubmitting}
      />

      <ActionAlert
        open={resultAlertOpen}
        type={resultAlert?.type ?? "success"}
        title={resultAlert?.title ?? ""}
        description={resultAlert?.description}
        onClose={() => {
          setResultAlertOpen(false);
          if (resultAlert?.type === "success") {
            router.push("/admin/specializations");
            router.refresh();
          }
        }}
      />
    </>
  );
}

"use client";

import { useCallback, useEffect, useState } from "react";
import { useFormik } from "formik";
import {
  getContactInfoAdmin,
  createContactInfo,
  updateContactInfo,
  deleteContactInfo,
} from "@/services/contact-info.service";
import {
  contactInfoSchema,
  type ContactInfoFormValues,
} from "@/schemas/contact-info.schema";
import { ContactInfo } from "@/types/contact-info";
import { ApiException } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { ActionAlert } from "@/components/action-alert";

type ResultAlert = {
  open: boolean;
  type: "success" | "error";
  title: string;
  description?: string;
};

function buildInitialValues(data: ContactInfo | null): ContactInfoFormValues {
  if (!data) return { phone: "", email: "", location: "" };
  return {
    phone: data.phone,
    email: data.email,
    location: data.location,
  };
}

export default function AdminContactInfoPage() {
  const [existing, setExisting] = useState<ContactInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [resultAlert, setResultAlert] = useState<ResultAlert>({
    open: false,
    type: "success",
    title: "",
  });

  const isUpdate = existing !== null;

  const formik = useFormik<ContactInfoFormValues>({
    initialValues: buildInitialValues(existing),
    enableReinitialize: true,
    validationSchema: contactInfoSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: (_values, { setSubmitting }) => {
      setSubmitting(false);
      setConfirmOpen(true);
    },
  });

  const hasChanges =
    formik.values.phone.trim() !== (existing?.phone ?? "") ||
    formik.values.email.trim() !== (existing?.email ?? "") ||
    formik.values.location.trim() !== (existing?.location ?? "");

  const loadContactInfo = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getContactInfoAdmin();
      setExisting(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadContactInfo();
  }, [loadContactInfo]);

  async function handleConfirm() {
    const values = formik.values;
    setIsLoading(true);

    const payload = {
      phone: values.phone.trim(),
      email: values.email.trim(),
      location: values.location.trim(),
    };

    try {
      const result = isUpdate
        ? await updateContactInfo(payload)
        : await createContactInfo(payload);
      setExisting(result);
      setResultAlert({
        open: true,
        type: "success",
        title: isUpdate ? "Güncellendi" : "Kaydedildi",
        description: "İletişim bilgileri başarıyla kaydedildi.",
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
      await deleteContactInfo();
      setExisting(null);
      setDeleteConfirm(false);
      setResultAlert({
        open: true,
        type: "success",
        title: "Silindi",
        description: "İletişim bilgileri başarıyla silindi.",
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

  return (
    <div className="flex flex-col gap-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          İletişim Bilgileri
        </h1>
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
          {Array.from({ length: 3 }).map((_, i) => (
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
            {/* phone */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="phone" className="text-slate-700 font-medium">
                Telefon <span className="text-red-500">*</span>
              </Label>
              <p className="text-xs text-slate-400">
                Kabul edilen biçimler: 5321112233, 532-111-22-33, (532) 111 22
                33, 0 (532) 111 22 33, +90 532 111 22 33, +90 (532) 111 22 33
              </p>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="Ör: 532-111-22-33"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={isLoading}
                aria-describedby={
                  formik.touched.phone && formik.errors.phone
                    ? "phone-error"
                    : undefined
                }
              />
              {formik.touched.phone && formik.errors.phone && (
                <p
                  id="phone-error"
                  role="alert"
                  className="text-xs text-destructive"
                >
                  {formik.errors.phone}
                </p>
              )}
            </div>

            {/* email */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email" className="text-slate-700 font-medium">
                E-posta <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Ör: info@tugcetekin.com"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={isLoading}
                aria-describedby={
                  formik.touched.email && formik.errors.email
                    ? "email-error"
                    : undefined
                }
              />
              {formik.touched.email && formik.errors.email && (
                <p
                  id="email-error"
                  role="alert"
                  className="text-xs text-destructive"
                >
                  {formik.errors.email}
                </p>
              )}
            </div>

            {/* location */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="location" className="text-slate-700 font-medium">
                Konum <span className="text-red-500">*</span>
              </Label>
              <Input
                id="location"
                name="location"
                type="text"
                placeholder="Ör: İstanbul"
                value={formik.values.location}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={isLoading}
                aria-describedby={
                  formik.touched.location && formik.errors.location
                    ? "location-error"
                    : undefined
                }
              />
              {formik.touched.location && formik.errors.location && (
                <p
                  id="location-error"
                  role="alert"
                  className="text-xs text-destructive"
                >
                  {formik.errors.location}
                </p>
              )}
            </div>
          </div>

          <Button
            type="submit"
            disabled={formik.isSubmitting || isLoading || !hasChanges}
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
                İletişim bilgilerini silerseniz tüm bilgiler kalıcı olarak
                silinir ve bu işlem geri alınamaz.
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
            : "İletişim bilgilerini kaydetmek istiyor musunuz?"
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
        title="İletişim bilgilerini silmek istiyor musunuz?"
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

"use client";

import { useRef, useState } from "react";
import { useFormik } from "formik";
import { contactSchema, ContactFormValues } from "@/schemas/contact.schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ActionAlert } from "@/components/action-alert";
import { sendContact } from "@/services/contact.service";
import { ApiException } from "@/lib/api";
import { ContactRequest } from "@/types/contact";

function maskPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 10);
  if (digits.length === 0) return "";
  if (digits.length <= 3) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  if (digits.length <= 8)
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)} ${digits.slice(6)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)} ${digits.slice(6, 8)} ${digits.slice(8, 10)}`;
}

export default function ContactForm() {
  const honeypotRef = useRef<HTMLInputElement>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState<{
    open: boolean;
    type: "success" | "error";
    title: string;
    description: string;
  }>({ open: false, type: "success", title: "", description: "" });

  const formik = useFormik<ContactFormValues>({
    initialValues: {
      fullName: "",
      email: "",
      subject: "",
      mobilePhone: "",
      message: "",
    },
    validationSchema: contactSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: (_values, { setSubmitting }) => {
      if (honeypotRef.current?.value) return;
      setSubmitting(false);
      setConfirmOpen(true);
    },
  });

  async function handleConfirm() {
    const values = formik.values;
    setConfirmOpen(false);
    setIsLoading(true);

    const payload: ContactRequest = {
      fullName: values.fullName.trim(),
      email: values.email.trim(),
      subject: values.subject.trim(),
      message: values.message.trim(),
    };

    if (values.mobilePhone?.trim()) {
      payload.mobilePhone = values.mobilePhone.trim();
    }

    try {
      await sendContact(payload);
      formik.resetForm();
      setAlert({
        open: true,
        type: "success",
        title: "Mesajınız İletildi",
        description: "En kısa sürede size dönüş yapacağım.",
      });
    } catch (err) {
      const msg =
        err instanceof ApiException
          ? err.message
          : "Bir hata oluştu. Lütfen tekrar deneyin.";
      setAlert({
        open: true,
        type: "error",
        title: "Bir Hata Oluştu",
        description: msg,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <ActionAlert
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        type="warning"
        title="Mesajınızı göndermek istiyor musunuz?"
        description="Formu göndermeden önce bilgilerinizi kontrol edin."
        onConfirm={handleConfirm}
        confirmLabel="Gönder"
        confirmClassName="bg-green-600 hover:bg-green-700 text-white"
        closeLabel="İptal"
        loading={isLoading}
      />

      <ActionAlert
        open={alert.open}
        onClose={() => setAlert((prev) => ({ ...prev, open: false }))}
        type={alert.type}
        title={alert.title}
        description={alert.description}
      />

      <form
        onSubmit={formik.handleSubmit}
        noValidate
        className="flex flex-col gap-5"
      >
        {/* Honeypot — bots fill this, humans don't see it */}
        <div
          className="absolute opacity-0 pointer-events-none"
          style={{ left: "-9999px" }}
          aria-hidden="true"
        >
          <input
            ref={honeypotRef}
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="fullName" className="text-orange-800 font-medium">
            Ad Soyad <span className="text-orange-500">*</span>
          </Label>
          <Input
            id="fullName"
            type="text"
            autoComplete="name"
            placeholder="Adınız ve soyadınız"
            maxLength={100}
            {...formik.getFieldProps("fullName")}
            disabled={isLoading}
            aria-invalid={!!(formik.touched.fullName && formik.errors.fullName)}
            aria-describedby={
              formik.touched.fullName && formik.errors.fullName
                ? "fullName-error"
                : undefined
            }
            className="border-orange-200 focus-visible:ring-orange-400/50 placeholder:text-muted-foreground/60"
          />
          {formik.touched.fullName && formik.errors.fullName && (
            <p
              id="fullName-error"
              role="alert"
              className="text-xs text-destructive mt-1"
            >
              {formik.errors.fullName}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email" className="text-orange-800 font-medium">
            E-posta <span className="text-orange-500">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="ornek@email.com"
            maxLength={255}
            {...formik.getFieldProps("email")}
            disabled={isLoading}
            aria-invalid={!!(formik.touched.email && formik.errors.email)}
            aria-describedby={
              formik.touched.email && formik.errors.email
                ? "email-error"
                : undefined
            }
            className="border-orange-200 focus-visible:ring-orange-400/50 placeholder:text-muted-foreground/60"
          />
          {formik.touched.email && formik.errors.email && (
            <p
              id="email-error"
              role="alert"
              className="text-xs text-destructive mt-1"
            >
              {formik.errors.email}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="subject" className="text-orange-800 font-medium">
            Konu <span className="text-orange-500">*</span>
          </Label>
          <Input
            id="subject"
            type="text"
            autoComplete="off"
            placeholder="Mesajınızın konusu"
            maxLength={150}
            {...formik.getFieldProps("subject")}
            disabled={isLoading}
            aria-invalid={!!(formik.touched.subject && formik.errors.subject)}
            aria-describedby={
              formik.touched.subject && formik.errors.subject
                ? "subject-error"
                : undefined
            }
            className="border-orange-200 focus-visible:ring-orange-400/50 placeholder:text-muted-foreground/60"
          />
          {formik.touched.subject && formik.errors.subject && (
            <p
              id="subject-error"
              role="alert"
              className="text-xs text-destructive mt-1"
            >
              {formik.errors.subject}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="mobilePhone" className="text-orange-800 font-medium">
            Telefon
            <span className="text-muted-foreground text-xs font-normal">
              (isteğe bağlı)
            </span>
          </Label>
          <Input
            id="mobilePhone"
            type="tel"
            autoComplete="tel"
            placeholder="(538) 110 00 00"
            {...formik.getFieldProps("mobilePhone")}
            onChange={(e) =>
              formik.setFieldValue("mobilePhone", maskPhone(e.target.value))
            }
            disabled={isLoading}
            aria-invalid={
              !!(formik.touched.mobilePhone && formik.errors.mobilePhone)
            }
            aria-describedby={
              formik.touched.mobilePhone && formik.errors.mobilePhone
                ? "mobilePhone-error"
                : undefined
            }
            className="border-orange-200 focus-visible:ring-orange-400/50 placeholder:text-muted-foreground/60"
          />
          {formik.touched.mobilePhone && formik.errors.mobilePhone && (
            <p
              id="mobilePhone-error"
              role="alert"
              className="text-xs text-destructive mt-1"
            >
              {formik.errors.mobilePhone}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="message" className="text-orange-800 font-medium">
            Mesaj <span className="text-orange-500">*</span>
          </Label>
          <Textarea
            id="message"
            placeholder="Mesajınızı buraya yazın..."
            maxLength={1000}
            {...formik.getFieldProps("message")}
            disabled={isLoading}
            rows={5}
            aria-invalid={!!(formik.touched.message && formik.errors.message)}
            aria-describedby={
              formik.touched.message && formik.errors.message
                ? "message-error"
                : undefined
            }
            className="resize-none border-orange-200 focus-visible:ring-orange-400/50 placeholder:text-muted-foreground/60"
          />
          {formik.touched.message && formik.errors.message && (
            <p
              id="message-error"
              role="alert"
              className="text-xs text-destructive mt-1"
            >
              {formik.errors.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          disabled={formik.isSubmitting || isLoading}
          className="w-full bg-orange-600 text-white hover:bg-orange-700 h-10"
        >
          {isLoading ? "Gönderiliyor..." : "Mesaj Gönder"}
        </Button>
      </form>
    </>
  );
}

"use client";

import { useState } from "react";
import { useFormik } from "formik";
import { contactSchema } from "@/schemas/contact.schema";
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
  const [alert, setAlert] = useState<{
    open: boolean;
    type: "success" | "error";
    title: string;
    description: string;
  }>({ open: false, type: "success", title: "", description: "" });

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      subject: "",
      mobilePhone: "",
      message: "",
    },
    validationSchema: contactSchema,
    onSubmit: async (values, { setSubmitting }) => {
      const payload: ContactRequest = {
        fullName: values.fullName,
        email: values.email,
        subject: values.subject,
        message: values.message,
      };

      if (values.mobilePhone && values.mobilePhone.trim() !== "") {
        payload.mobilePhone = values.mobilePhone.trim();
      }

      try {
        await sendContact(payload);
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
        setSubmitting(false);
      }
    },
  });

  function handleAlertClose() {
    const wasSuccess = alert.type === "success";
    setAlert((prev) => ({ ...prev, open: false }));
    if (wasSuccess) {
      formik.resetForm();
    }
  }

  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        noValidate
        className="flex flex-col gap-5"
      >
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="fullName" className="text-orange-800 font-medium">
            Ad Soyad <span className="text-orange-500">*</span>
          </Label>
          <Input
            id="fullName"
            name="fullName"
            type="text"
            autoComplete="name"
            placeholder="Adınız ve soyadınız"
            value={formik.values.fullName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={formik.isSubmitting}
            aria-describedby="fullName-error"
            className={`border-orange-200 focus-visible:ring-orange-400/50 placeholder:text-muted-foreground/60${
              formik.touched.fullName && formik.errors.fullName
                ? " border-red-400"
                : ""
            }`}
          />
          {formik.touched.fullName && formik.errors.fullName && (
            <p id="fullName-error" className="text-xs text-red-500 mt-1">
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
            name="email"
            type="email"
            autoComplete="email"
            placeholder="ornek@email.com"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={formik.isSubmitting}
            aria-describedby="email-error"
            className={`border-orange-200 focus-visible:ring-orange-400/50 placeholder:text-muted-foreground/60${
              formik.touched.email && formik.errors.email
                ? " border-red-400"
                : ""
            }`}
          />
          {formik.touched.email && formik.errors.email && (
            <p id="email-error" className="text-xs text-red-500 mt-1">
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
            name="subject"
            type="text"
            placeholder="Mesajınızın konusu"
            value={formik.values.subject}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={formik.isSubmitting}
            aria-describedby="subject-error"
            className={`border-orange-200 focus-visible:ring-orange-400/50 placeholder:text-muted-foreground/60${
              formik.touched.subject && formik.errors.subject
                ? " border-red-400"
                : ""
            }`}
          />
          {formik.touched.subject && formik.errors.subject && (
            <p id="subject-error" className="text-xs text-red-500 mt-1">
              {formik.errors.subject}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="mobilePhone" className="text-orange-800 font-medium">
            Telefon{" "}
            <span className="text-muted-foreground text-xs font-normal">
              (isteğe bağlı)
            </span>
          </Label>
          <Input
            id="mobilePhone"
            name="mobilePhone"
            type="tel"
            autoComplete="tel"
            placeholder="(538) 110 00 00"
            value={formik.values.mobilePhone}
            onChange={(e) =>
              formik.setFieldValue("mobilePhone", maskPhone(e.target.value))
            }
            onBlur={formik.handleBlur}
            disabled={formik.isSubmitting}
            aria-describedby="mobilePhone-error"
            className={`border-orange-200 focus-visible:ring-orange-400/50 placeholder:text-muted-foreground/60${
              formik.touched.mobilePhone && formik.errors.mobilePhone
                ? " border-red-400"
                : ""
            }`}
          />
          {formik.touched.mobilePhone && formik.errors.mobilePhone && (
            <p id="mobilePhone-error" className="text-xs text-red-500 mt-1">
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
            name="message"
            placeholder="Mesajınızı buraya yazın..."
            value={formik.values.message}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={formik.isSubmitting}
            rows={5}
            aria-describedby="message-error"
            className={`resize-none border-orange-200 focus-visible:ring-orange-400/50 placeholder:text-muted-foreground/60${
              formik.touched.message && formik.errors.message
                ? " border-red-400"
                : ""
            }`}
          />
          {formik.touched.message && formik.errors.message && (
            <p id="message-error" className="text-xs text-red-500 mt-1">
              {formik.errors.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          disabled={formik.isSubmitting}
          className="w-full bg-orange-600 text-white hover:bg-orange-700 h-10"
        >
          {formik.isSubmitting ? "Gönderiliyor..." : "Mesaj Gönder"}
        </Button>
      </form>

      <ActionAlert
        open={alert.open}
        onClose={handleAlertClose}
        type={alert.type}
        title={alert.title}
        description={alert.description}
      />
    </>
  );
}

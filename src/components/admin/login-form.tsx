"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter, useSearchParams } from "next/navigation";
import { login } from "@/services/auth.service";
import { ApiException } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useState } from "react";

const loginSchema = Yup.object({
  email: Yup.string()
    .required("E-posta zorunludur")
    .email("Geçerli bir e-posta adresi girin"),
  password: Yup.string()
    .required("Şifre zorunludur")
    .min(6, "Şifre en az 6 karakter olmalıdır"),
});

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawFrom = searchParams.get("from") ?? "";
  const redirectTo = rawFrom.startsWith("/admin") ? rawFrom : "/admin/posts";
  const [serverError, setServerError] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: loginSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setServerError(null);
      try {
        await login({ email: values.email, password: values.password });
        router.push(redirectTo);
      } catch (err) {
        const msg =
          err instanceof ApiException
            ? err.message
            : "Giriş yapılamadı. Lütfen tekrar deneyin.";
        setServerError(msg);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} noValidate className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="email" className="text-slate-700 font-medium">
          E-posta
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="admin@example.com"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={formik.isSubmitting}
          aria-describedby="email-error"
          className={
            formik.touched.email && formik.errors.email ? "border-red-400" : ""
          }
        />
        {formik.touched.email && formik.errors.email && (
          <p id="email-error" className="text-xs text-red-500">
            {formik.errors.email}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="password" className="text-slate-700 font-medium">
          Şifre
        </Label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={formik.isSubmitting}
          aria-describedby="password-error"
          className={
            formik.touched.password && formik.errors.password
              ? "border-red-400"
              : ""
          }
        />
        {formik.touched.password && formik.errors.password && (
          <p id="password-error" className="text-xs text-red-500">
            {formik.errors.password}
          </p>
        )}
      </div>

      {serverError && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          {serverError}
        </p>
      )}

      <Button
        type="submit"
        disabled={formik.isSubmitting}
        className="w-full bg-violet-600 hover:bg-violet-700 text-white h-10"
      >
        {formik.isSubmitting ? (
          <span className="flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            Giriş yapılıyor...
          </span>
        ) : (
          "Giriş Yap"
        )}
      </Button>
    </form>
  );
}

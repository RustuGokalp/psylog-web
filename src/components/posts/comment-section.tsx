"use client";

import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Comment } from "@/types/post";
import { submitComment } from "@/services/post.service";
import { ActionAlert, AlertType } from "@/components/action-alert";
import { ApiException } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface Props {
  postId: number;
  initialComments: Comment[];
}

interface ResultAlert {
  type: AlertType;
  title: string;
  description?: string;
}

const commentSchema = Yup.object({
  author: Yup.string().trim().required("Adınızı girin."),
  email: Yup.string()
    .trim()
    .email("Geçerli bir e-posta adresi girin.")
    .optional(),
  content: Yup.string()
    .trim()
    .required("Yorum alanı boş bırakılamaz.")
    .max(1000, "Yorum en fazla 1000 karakter olabilir."),
});

type CommentFormValues = Yup.InferType<typeof commentSchema>;

function formatTurkishDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function getInitial(name: string): string {
  return name.charAt(0).toUpperCase();
}

export default function CommentSection({ postId, initialComments }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [resultAlert, setResultAlert] = useState<ResultAlert | null>(null);

  const formik = useFormik<CommentFormValues>({
    initialValues: { author: "", email: "", content: "" },
    validationSchema: commentSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: (_values, helpers) => {
      helpers.setSubmitting(false);
      setConfirmOpen(true);
    },
  });

  async function handleConfirm() {
    setIsLoading(true);
    try {
      const trimmedEmail = formik.values.email?.trim();
      await submitComment(postId, {
        author: formik.values.author.trim(),
        ...(trimmedEmail && { email: trimmedEmail }),
        content: formik.values.content.trim(),
      });
      formik.resetForm();
      setSubmitted(true);
      setConfirmOpen(false);
      setResultAlert({
        type: "success",
        title: "Yorumunuz alındı",
        description: "Onaylandıktan sonra yayınlanacak.",
      });
    } catch (err) {
      setConfirmOpen(false);
      const message =
        err instanceof ApiException
          ? err.error.message
          : "Yorum gönderilemedi. Lütfen tekrar deneyin.";
      setResultAlert({
        type: "error",
        title: "Yorum gönderilemedi",
        description: message,
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
        title="Yorumu göndermek istiyor musunuz?"
        description="Yorumunuz onaylandıktan sonra yayınlanacaktır."
        onConfirm={handleConfirm}
        confirmLabel="Gönder"
        confirmClassName="bg-green-600 hover:bg-green-700 text-white"
        closeLabel="İptal"
        loading={isLoading}
      />

      <ActionAlert
        open={resultAlert !== null}
        onClose={() => setResultAlert(null)}
        type={resultAlert?.type ?? "info"}
        title={resultAlert?.title ?? ""}
        description={resultAlert?.description}
      />

      <section className="mt-14" aria-labelledby="comments-heading">
        <h2 id="comments-heading" className="text-xl font-bold text-slate-800">
          Yorumlar
          {initialComments.length > 0 && (
            <span className="text-base font-normal text-slate-400">
              ({initialComments.length})
            </span>
          )}
        </h2>

        {initialComments.length === 0 ? (
          <p className="mt-4 text-sm text-slate-400">
            Henüz yorum yok. İlk yorumu siz yapın!
          </p>
        ) : (
          <ul className="mt-6 flex flex-col divide-y divide-slate-100">
            {initialComments.map((comment) => (
              <li key={comment.id} className="flex gap-3 py-5">
                <div
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-200 text-sm font-semibold text-slate-600"
                  aria-hidden="true"
                >
                  {getInitial(comment.author)}
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-semibold text-slate-800">
                      {comment.author}
                    </span>
                    <time
                      dateTime={comment.createdAt}
                      className="text-xs text-slate-400"
                    >
                      {formatTurkishDate(comment.createdAt)}
                    </time>
                  </div>
                  <p className="text-sm leading-relaxed text-slate-600">
                    {comment.content}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-10">
          <h3 className="mb-4 text-base font-semibold text-slate-800">
            Yorum Yaz
          </h3>

          {submitted ? (
            <div className="rounded-xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              Yorumunuz alındı. Onaylandıktan sonra yayınlanacak.
            </div>
          ) : (
            <form
              onSubmit={formik.handleSubmit}
              className="flex flex-col gap-3"
              noValidate
            >
              <div className="flex flex-col gap-1">
                <Input
                  type="text"
                  id="author"
                  placeholder="Adınız"
                  {...formik.getFieldProps("author")}
                  disabled={isLoading}
                  aria-invalid={
                    !!(formik.touched.author && formik.errors.author)
                  }
                />
                {formik.touched.author && formik.errors.author && (
                  <p className="text-xs text-destructive">
                    {formik.errors.author}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <Input
                  type="email"
                  id="email"
                  placeholder="E-posta adresiniz (opsiyonel)"
                  {...formik.getFieldProps("email")}
                  disabled={isLoading}
                  aria-invalid={!!(formik.touched.email && formik.errors.email)}
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="text-xs text-destructive">
                    {formik.errors.email}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <Textarea
                  id="content"
                  placeholder="Yorumunuzu yazın..."
                  {...formik.getFieldProps("content")}
                  disabled={isLoading}
                  rows={4}
                  aria-invalid={
                    !!(formik.touched.content && formik.errors.content)
                  }
                />
                {formik.touched.content && formik.errors.content && (
                  <p className="text-xs text-destructive">
                    {formik.errors.content}
                  </p>
                )}
              </div>

              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="rounded-xl bg-rose-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-rose-700"
                >
                  {formik.isSubmitting ? "Gönderiliyor..." : "Gönder"}
                </Button>
              </div>
            </form>
          )}
        </div>
      </section>
    </>
  );
}

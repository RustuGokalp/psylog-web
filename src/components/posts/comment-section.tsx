"use client";

import { useState } from "react";
import { Comment } from "@/types/post";
import { submitComment } from "@/services/post.service";
import { ActionAlert, AlertType } from "@/components/action-alert";
import { ApiException } from "@/lib/api";

interface Props {
  postId: number;
  initialComments: Comment[];
}

interface ResultAlert {
  type: AlertType;
  title: string;
  description?: string;
}

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
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [resultAlert, setResultAlert] = useState<ResultAlert | null>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!author.trim() || !content.trim()) return;
    setConfirmOpen(true);
  }

  async function handleConfirm() {
    setIsSubmitting(true);
    try {
      await submitComment(postId, {
        author: author.trim(),
        content: content.trim(),
      });
      setAuthor("");
      setContent("");
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
      setIsSubmitting(false);
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
        closeLabel="İptal"
        loading={isSubmitting}
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
              onSubmit={handleSubmit}
              className="flex flex-col gap-3"
              noValidate
            >
              <input
                type="text"
                placeholder="Adınız"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                disabled={isSubmitting}
                required
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none transition-colors focus:border-rose-400 focus:ring-2 focus:ring-rose-100 disabled:opacity-50"
              />
              <textarea
                placeholder="Yorumunuzu yazın..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                disabled={isSubmitting}
                required
                rows={4}
                className="w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none transition-colors focus:border-rose-400 focus:ring-2 focus:ring-rose-100 disabled:opacity-50"
              />

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting || !author.trim() || !content.trim()}
                  className="cursor-pointer rounded-full bg-rose-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSubmitting ? "Gönderiliyor..." : "Gönder"}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </>
  );
}

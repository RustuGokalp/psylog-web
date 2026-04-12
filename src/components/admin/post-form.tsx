"use client";

import { useState, KeyboardEvent } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { format, parse, isValid } from "date-fns";
import { tr } from "date-fns/locale";
import { createPost, updatePost } from "@/services/post.service";
import { ApiException } from "@/lib/api";
import { postSchema, PostFormValues, PublishMode } from "@/schemas/post.schema";
import { ActionAlert } from "@/components/action-alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Loader2, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface PostFormProps {
  mode: "create" | "edit";
  initialValues?: Partial<PostFormValues>;
  postId?: number;
  createdAt?: string;
  updatedAt?: string;
}

const defaultValues: PostFormValues = {
  title: "",
  summary: "",
  content: "",
  coverImage: "",
  tags: [],
  publishMode: "draft",
  publishAt: "",
  readingTime: "",
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

function buildPayload(values: PostFormValues) {
  return {
    title: values.title,
    summary: values.summary,
    content: values.content,
    coverImage: values.coverImage || null,
    tags: values.tags,
    published: values.publishMode === "publish",
    publishAt:
      values.publishMode === "schedule" && values.publishAt
        ? values.publishAt
        : null,
    readingTime:
      values.readingTime !== "" && values.readingTime !== undefined
        ? Number(values.readingTime)
        : null,
  };
}

// Derive publishMode + publishAt from raw post data (for edit initialValues)
export function resolvePublishMode(
  published: boolean,
  publishAt: string | null | undefined,
): { publishMode: PublishMode; publishAt: string } {
  if (published) return { publishMode: "publish", publishAt: "" };
  if (publishAt) return { publishMode: "schedule", publishAt };
  return { publishMode: "draft", publishAt: "" };
}

const PUBLISH_MODES: { value: PublishMode; label: string }[] = [
  { value: "draft", label: "Taslak" },
  { value: "schedule", label: "Zamanla" },
  { value: "publish", label: "Yayınla" },
];

type ResultAlert = {
  type: "success" | "error";
  title: string;
  description?: string;
} | null;

export default function PostForm({
  mode,
  initialValues,
  postId,
  createdAt,
  updatedAt,
}: PostFormProps) {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [tagInput, setTagInput] = useState("");
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [resultAlert, setResultAlert] = useState<ResultAlert>(null);

  const isEdit = mode === "edit";

  const formik = useFormik<PostFormValues>({
    initialValues: { ...defaultValues, ...initialValues },
    validationSchema: postSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting }) => {
      // Only handles create mode — edit mode goes through handleEditSaveClick
      setServerError(null);
      try {
        await createPost(buildPayload(values));
        router.push("/admin/posts");
        router.refresh();
      } catch (err) {
        const msg =
          err instanceof ApiException
            ? err.message
            : "Bir hata oluştu. Lütfen tekrar deneyin.";
        setServerError(msg);
      } finally {
        setSubmitting(false);
      }
    },
  });

  // ── Edit mode: validate → confirm dialog → execute ────────────────────────

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
    setConfirmOpen(false);
    formik.setSubmitting(true);
    try {
      await updatePost(postId!, buildPayload(formik.values));
      setResultAlert({
        type: "success",
        title: "Değişiklikler Kaydedildi",
        description: "Yazı başarıyla güncellendi.",
      });
    } catch (err) {
      const msg =
        err instanceof ApiException
          ? err.message
          : "Bir hata oluştu. Lütfen tekrar deneyin.";
      setResultAlert({ type: "error", title: "Güncelleme Hatası", description: msg });
    } finally {
      formik.setSubmitting(false);
    }
  }

  // ── Tag handlers ──────────────────────────────────────────────────────────

  function handleAddTag() {
    const value = tagInput.trim();
    if (!value) return;
    if (formik.values.tags.includes(value)) {
      setTagInput("");
      return;
    }
    formik.setFieldValue("tags", [...formik.values.tags, value]);
    setTagInput("");
  }

  function handleRemoveTag(tag: string) {
    formik.setFieldValue(
      "tags",
      formik.values.tags.filter((t) => t !== tag),
    );
  }

  function handleTagKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  }

  // ── Date/time helpers ─────────────────────────────────────────────────────

  const selectedDate = formik.values.publishAt
    ? parse(formik.values.publishAt, "yyyy-MM-dd'T'HH:mm:ss", new Date())
    : undefined;

  const validSelectedDate =
    selectedDate && isValid(selectedDate) ? selectedDate : undefined;

  const timeValue = validSelectedDate
    ? format(validSelectedDate, "HH:mm")
    : "";

  function handleCalendarSelect(day: Date | undefined) {
    if (!day) return;
    const existingTime = timeValue || "09:00";
    const [h, m] = existingTime.split(":");
    day.setHours(Number(h), Number(m), 0, 0);
    formik.setFieldValue("publishAt", format(day, "yyyy-MM-dd'T'HH:mm:ss"));
    setCalendarOpen(false);
  }

  function handleTimeChange(e: React.ChangeEvent<HTMLInputElement>) {
    const base = validSelectedDate ?? new Date();
    const [h, m] = e.target.value.split(":");
    const updated = new Date(base);
    updated.setHours(Number(h), Number(m), 0, 0);
    formik.setFieldValue("publishAt", format(updated, "yyyy-MM-dd'T'HH:mm:ss"));
  }

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        noValidate
        className="flex flex-col gap-6"
      >
        {/* Title */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="title" className="text-slate-700 font-medium">
            Başlık <span className="text-red-500">*</span>
          </Label>
          <Input
            id="title"
            name="title"
            type="text"
            placeholder="Yazı başlığı"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={formik.isSubmitting}
            aria-describedby="title-error"
            className={
              formik.touched.title && formik.errors.title ? "border-red-400" : ""
            }
          />
          {formik.touched.title && formik.errors.title && (
            <p id="title-error" className="text-xs text-red-500">
              {formik.errors.title}
            </p>
          )}
        </div>

        {/* Summary */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="summary" className="text-slate-700 font-medium">
            Özet <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="summary"
            name="summary"
            placeholder="Yazının kısa özeti (liste sayfasında gösterilir)"
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

        {/* Content */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="content" className="text-slate-700 font-medium">
            İçerik <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="content"
            name="content"
            placeholder="Yazının tam içeriği..."
            value={formik.values.content}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={formik.isSubmitting}
            rows={14}
            aria-describedby="content-error"
            className={`resize-y font-mono text-sm ${
              formik.touched.content && formik.errors.content
                ? "border-red-400"
                : ""
            }`}
          />
          {formik.touched.content && formik.errors.content && (
            <p id="content-error" className="text-xs text-red-500">
              {formik.errors.content}
            </p>
          )}
        </div>

        {/* Cover image + reading time */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="coverImage" className="text-slate-700 font-medium">
              Kapak Görseli URL{" "}
              <span className="text-slate-400 font-normal text-xs">
                (isteğe bağlı)
              </span>
            </Label>
            <Input
              id="coverImage"
              name="coverImage"
              type="url"
              placeholder="https://example.com/image.jpg"
              value={formik.values.coverImage}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={formik.isSubmitting}
              aria-describedby="coverImage-error"
              className={
                formik.touched.coverImage && formik.errors.coverImage
                  ? "border-red-400"
                  : ""
              }
            />
            {formik.touched.coverImage && formik.errors.coverImage && (
              <p id="coverImage-error" className="text-xs text-red-500">
                {formik.errors.coverImage}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label
              htmlFor="readingTime"
              className="text-slate-700 font-medium"
            >
              Okuma Süresi (dk){" "}
              <span className="text-slate-400 font-normal text-xs">
                (isteğe bağlı)
              </span>
            </Label>
            <Input
              id="readingTime"
              name="readingTime"
              type="number"
              min={1}
              max={999}
              value={formik.values.readingTime}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={formik.isSubmitting}
              aria-describedby="readingTime-error"
              className={
                formik.touched.readingTime && formik.errors.readingTime
                  ? "border-red-400"
                  : ""
              }
            />
            {formik.touched.readingTime && formik.errors.readingTime && (
              <p id="readingTime-error" className="text-xs text-red-500">
                {formik.errors.readingTime}
              </p>
            )}
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-col gap-2">
          <Label className="text-slate-700 font-medium">
            Etiketler{" "}
            <span className="text-slate-400 font-normal text-xs">
              (isteğe bağlı)
            </span>
          </Label>

          {formik.values.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
              {formik.values.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="flex items-center gap-1 pr-1 text-xs bg-white border border-slate-200 text-slate-700"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    disabled={formik.isSubmitting}
                    aria-label={`${tag} etiketini kaldır`}
                    className="ml-0.5 rounded-full p-0.5 hover:bg-slate-200 transition-colors disabled:opacity-50"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}

          <div className="flex gap-2">
            <Input
              id="tagInput"
              type="text"
              placeholder="Etiket ekle..."
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagKeyDown}
              disabled={formik.isSubmitting}
              className="flex-1"
            />
            {tagInput.trim() && (
              <Button
                type="button"
                variant="outline"
                onClick={handleAddTag}
                disabled={formik.isSubmitting}
                className="shrink-0"
              >
                Ekle
              </Button>
            )}
          </div>
        </div>

        {/* Publish mode */}
        <div className="flex flex-col gap-3">
          <Label className="text-slate-700 font-medium">Yayın Durumu</Label>

          <div className="inline-flex rounded-lg border border-slate-200 bg-slate-50 p-1 gap-1">
            {PUBLISH_MODES.map(({ value, label }) => (
              <button
                key={value}
                type="button"
                disabled={formik.isSubmitting}
                onClick={() => {
                  formik.setFieldValue("publishMode", value);
                  if (value !== "schedule") {
                    formik.setFieldValue("publishAt", "");
                  }
                }}
                className={cn(
                  "flex-1 rounded-md px-4 py-1.5 text-sm font-medium transition-colors",
                  formik.values.publishMode === value
                    ? "bg-white text-slate-800 shadow-sm border border-slate-200"
                    : "text-slate-500 hover:text-slate-700",
                )}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Schedule picker */}
          {formik.values.publishMode === "schedule" && (
            <div className="flex flex-col gap-2 rounded-lg border border-violet-100 bg-violet-50 p-4">
              <p className="text-xs text-slate-500">
                Yazı belirlediğiniz tarih ve saatte otomatik olarak yayınlanacak.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Date picker */}
                <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                  <PopoverTrigger
                    disabled={formik.isSubmitting}
                    className={cn(
                      "flex h-9 flex-1 items-center gap-2 rounded-md border bg-white px-3 text-sm transition-colors hover:bg-slate-50 disabled:opacity-50",
                      formik.touched.publishAt && formik.errors.publishAt
                        ? "border-red-400"
                        : "border-slate-200",
                    )}
                  >
                    <CalendarIcon className="h-4 w-4 text-slate-400 shrink-0" />
                    <span
                      className={
                        validSelectedDate ? "text-slate-800" : "text-slate-400"
                      }
                    >
                      {validSelectedDate
                        ? format(validSelectedDate, "d MMMM yyyy", {
                            locale: tr,
                          })
                        : "Tarih seçin"}
                    </span>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={validSelectedDate}
                      onSelect={handleCalendarSelect}
                      disabled={(date) =>
                        date < new Date(new Date().setHours(0, 0, 0, 0))
                      }
                      locale={tr}
                    />
                  </PopoverContent>
                </Popover>

                {/* Time picker */}
                <div className="flex items-center gap-2">
                  <Input
                    type="time"
                    value={timeValue}
                    onChange={handleTimeChange}
                    disabled={formik.isSubmitting || !validSelectedDate}
                    className="w-32 bg-white"
                  />
                  {validSelectedDate && (
                    <button
                      type="button"
                      onClick={() => formik.setFieldValue("publishAt", "")}
                      disabled={formik.isSubmitting}
                      aria-label="Tarihi temizle"
                      className="rounded-md p-1.5 text-slate-400 hover:bg-violet-100 hover:text-slate-600 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>

              {formik.touched.publishAt && formik.errors.publishAt && (
                <p className="text-xs text-red-500">
                  {formik.errors.publishAt}
                </p>
              )}

              {validSelectedDate && (
                <p className="text-xs text-violet-600 font-medium">
                  {format(validSelectedDate, "d MMMM yyyy, HH:mm", {
                    locale: tr,
                  })}{" "}
                  tarihinde yayınlanacak
                </p>
              )}
            </div>
          )}
        </div>

        {/* Dates (edit mode only) */}
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

        {/* Inline error (create mode only) */}
        {serverError && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
            {serverError}
          </p>
        )}

        {/* Actions */}
        <div className="flex items-center gap-3 pt-2">
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
            <Button
              type="submit"
              disabled={formik.isSubmitting}
              className="bg-violet-600 hover:bg-violet-700 text-white min-w-35 disabled:opacity-50"
            >
              {formik.isSubmitting ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Oluşturuluyor...
                </span>
              ) : (
                "Yazıyı Oluştur"
              )}
            </Button>
          )}
          <Button
            type="button"
            variant="ghost"
            disabled={formik.isSubmitting}
            onClick={() => router.push("/admin/posts")}
            className="text-slate-500"
          >
            İptal
          </Button>
        </div>
      </form>

      {/* Edit confirmation */}
      {isEdit && (
        <ActionAlert
          open={confirmOpen}
          type="warning"
          title="Değişiklikleri Kaydet"
          description="Bu yazıda yaptığınız değişiklikleri kaydetmek istediğinizden emin misiniz? Kaydedilen değişiklikler geri alınamaz."
          onClose={() => setConfirmOpen(false)}
          onConfirm={executeUpdate}
          confirmLabel="Kaydet"
        />
      )}

      {/* Edit result */}
      {isEdit && (
        <ActionAlert
          open={!!resultAlert}
          type={resultAlert?.type ?? "success"}
          title={resultAlert?.title ?? ""}
          description={resultAlert?.description}
          onClose={() => {
            if (resultAlert?.type === "success") {
              router.push("/admin/posts");
              router.refresh();
            } else {
              setResultAlert(null);
            }
          }}
        />
      )}
    </>
  );
}

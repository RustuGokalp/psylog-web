import * as Yup from "yup";

export const postSchema = Yup.object({
  title: Yup.string()
    .required("Başlık zorunludur")
    .min(3, "Başlık en az 3 karakter olmalıdır")
    .max(255, "Başlık en fazla 255 karakter olmalıdır"),
  summary: Yup.string()
    .required("Özet zorunludur")
    .min(10, "Özet en az 10 karakter olmalıdır")
    .max(500, "Özet en fazla 500 karakter olmalıdır"),
  content: Yup.string()
    .required("İçerik zorunludur")
    .min(20, "İçerik en az 20 karakter olmalıdır"),
  coverImage: Yup.string()
    .url("Geçerli bir URL girin")
    .nullable()
    .optional(),
  tags: Yup.array().of(Yup.string().required()).optional(),
  publishMode: Yup.string()
    .oneOf(["draft", "schedule", "publish"])
    .required(),
  publishAt: Yup.string()
    .nullable()
    .optional()
    .when("publishMode", {
      is: "schedule",
      then: (s) => s.required("Zamanlanmış yayın için tarih seçilmelidir"),
    }),
  readingTime: Yup.number()
    .integer("Okuma süresi tam sayı olmalıdır")
    .min(1, "Okuma süresi en az 1 dakika olmalıdır")
    .max(999, "Okuma süresi en fazla 999 dakika olmalıdır")
    .nullable()
    .optional(),
});

export type PublishMode = "draft" | "schedule" | "publish";

export interface PostFormValues {
  title: string;
  summary: string;
  content: string;
  coverImage: string;
  tags: string[];
  publishMode: PublishMode;
  publishAt: string;
  readingTime: string;
}

import * as Yup from "yup";

export const commentSchema = Yup.object({
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

export type CommentFormValues = Yup.InferType<typeof commentSchema>;

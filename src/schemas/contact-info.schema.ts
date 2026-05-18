import * as Yup from "yup";

// Accepted phone formats:
//   5321112233 | 532-111-22-33 | (532) 111 22 33
//   0 (532) 111 22 33 | +90 532 111 22 33 | +90 (532) 111 22 33
export const PHONE_REGEX =
  /^(?:\d{10}|\d{3}-\d{3}-\d{2}-\d{2}|(?:(?:\+90|0)\s)?(?:\(\d{3}\)|\d{3})\s\d{3}\s\d{2}\s\d{2})$/;

export const contactInfoSchema = Yup.object({
  phone: Yup.string()
    .trim()
    .required("Telefon numarası zorunludur.")
    .matches(
      PHONE_REGEX,
      "Geçersiz telefon formatı. Örn: 5321112233, 532-111-22-33, (532) 111 22 33, 0 (532) 111 22 33, +90 532 111 22 33 veya +90 (532) 111 22 33.",
    ),
  email: Yup.string()
    .trim()
    .required("E-posta adresi zorunludur.")
    .email("Geçerli bir e-posta adresi girin."),
  location: Yup.string()
    .trim()
    .required("Konum zorunludur.")
    .max(200, "Konum en fazla 200 karakter olabilir."),
});

export type ContactInfoFormValues = Yup.InferType<typeof contactInfoSchema>;

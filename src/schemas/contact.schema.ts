import * as Yup from "yup";

export const contactSchema = Yup.object({
  fullName: Yup.string()
    .trim()
    .required("Ad soyad zorunludur.")
    .min(2, "Ad soyad en az 2 karakter olmalıdır.")
    .max(50, "Ad soyad en fazla 50 karakter olabilir."),
  email: Yup.string()
    .trim()
    .required("E-posta adresi zorunludur.")
    .email("Geçerli bir e-posta adresi girin.")
    .max(255, "E-posta adresi en fazla 255 karakter olabilir."),
  subject: Yup.string()
    .trim()
    .required("Konu zorunludur.")
    .min(2, "Konu en az 2 karakter olmalıdır.")
    .max(150, "Konu en fazla 150 karakter olabilir."),
  mobilePhone: Yup.string().test(
    "phone",
    "Geçerli bir telefon numarası girin (ör: (538) 110 00 00)",
    (value) => {
      if (!value || value.trim() === "") return true;
      return /^\(\d{3}\) \d{3} \d{2} \d{2}$/.test(value.trim());
    },
  ),
  message: Yup.string()
    .trim()
    .required("Mesaj zorunludur.")
    .min(20, "Mesaj en az 20 karakter olmalıdır.")
    .max(750, "Mesaj en fazla 750 karakter olabilir."),
});

export type ContactFormValues = Yup.InferType<typeof contactSchema>;

import * as Yup from "yup";

export const contactSchema = Yup.object({
  fullName: Yup.string()
    .required("Ad soyad en az 2, en fazla 100 karakter olmalıdır")
    .min(2, "Ad soyad en az 2, en fazla 100 karakter olmalıdır")
    .max(100, "Ad soyad en az 2, en fazla 100 karakter olmalıdır"),
  email: Yup.string()
    .required("Geçerli bir e-posta adresi girin")
    .email("Geçerli bir e-posta adresi girin")
    .max(255, "Geçerli bir e-posta adresi girin"),
  subject: Yup.string()
    .required("Konu en az 2, en fazla 150 karakter olmalıdır")
    .min(2, "Konu en az 2, en fazla 150 karakter olmalıdır")
    .max(150, "Konu en az 2, en fazla 150 karakter olmalıdır"),
  mobilePhone: Yup.string().test(
    "phone",
    "Geçerli bir telefon numarası girin (ör: (538) 110 00 00)",
    (value) => {
      if (!value || value.trim() === "") return true;
      return /^\(\d{3}\) \d{3} \d{2} \d{2}$/.test(value.trim());
    },
  ),
  message: Yup.string()
    .required("Mesaj en az 20, en fazla 1000 karakter olmalıdır")
    .min(20, "Mesaj en az 20, en fazla 1000 karakter olmalıdır")
    .max(1000, "Mesaj en az 20, en fazla 1000 karakter olmalıdır"),
});

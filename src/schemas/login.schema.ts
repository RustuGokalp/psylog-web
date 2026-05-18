import * as Yup from "yup";

export const loginSchema = Yup.object({
  email: Yup.string()
    .required("E-posta zorunludur")
    .email("Geçerli bir e-posta adresi girin"),
  password: Yup.string()
    .required("Şifre zorunludur")
    .min(6, "Şifre en az 6 karakter olmalıdır"),
});

export type LoginFormValues = Yup.InferType<typeof loginSchema>;

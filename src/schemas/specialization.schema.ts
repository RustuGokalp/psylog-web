import * as Yup from "yup";

export const specializationSchema = Yup.object({
  title: Yup.string()
    .required("Başlık zorunludur")
    .max(100, "Başlık en fazla 100 karakter olmalıdır"),
  summary: Yup.string().required("Özet zorunludur"),
  content: Yup.string().required("İçerik zorunludur"),
  image: Yup.string().url("Geçerli bir URL girin").nullable().optional(),
  displayOrder: Yup.number()
    .integer("Sıra numarası tam sayı olmalıdır")
    .min(1, "Sıra numarası en az 1 olmalıdır")
    .nullable()
    .optional(),
});

export interface SpecializationFormValues {
  title: string;
  summary: string;
  content: string;
  image: string;
  displayOrder: string;
}

import * as Yup from "yup";

export const aboutSchema = Yup.object({
  message: Yup.string().trim().required("Hakkımda metni zorunludur."),
  profileImage: Yup.string()
    .url("Geçerli bir URL girin.")
    .nullable()
    .optional(),
  education: Yup.array().of(Yup.string().defined()),
  workingAreas: Yup.array().of(Yup.string().defined()),
});

// The form keeps non-nullable, always-present fields (empty string / empty
// array defaults), so it intentionally diverges from Yup.InferType.
export interface AboutFormValues {
  message: string;
  profileImage: string;
  education: string[];
  workingAreas: string[];
}

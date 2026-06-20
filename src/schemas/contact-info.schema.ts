import * as Yup from "yup";
import type { DayOfWeek, WorkingHourStatus } from "@/types/contact-info";

// Accepted phone formats:
//   5321112233 | 532-111-22-33 | (532) 111 22 33
//   0 (532) 111 22 33 | +90 532 111 22 33 | +90 (532) 111 22 33
export const PHONE_REGEX =
  /^(?:\d{10}|\d{3}-\d{3}-\d{2}-\d{2}|(?:(?:\+90|0)\s)?(?:\(\d{3}\)|\d{3})\s\d{3}\s\d{2}\s\d{2})$/;

export const DAY_ORDER: DayOfWeek[] = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
];

export const DAY_LABELS: Record<DayOfWeek, string> = {
  MONDAY: "Pazartesi",
  TUESDAY: "Salı",
  WEDNESDAY: "Çarşamba",
  THURSDAY: "Perşembe",
  FRIDAY: "Cuma",
  SATURDAY: "Cumartesi",
  SUNDAY: "Pazar",
};

export const STATUS_LABELS: Record<WorkingHourStatus, string> = {
  OPEN: "Açık",
  BY_APPOINTMENT: "Randevu ile",
  CLOSED: "Kapalı",
};

const workingHourSchema = Yup.object({
  dayOfWeek: Yup.mixed<DayOfWeek>().oneOf(DAY_ORDER).required(),
  status: Yup.mixed<WorkingHourStatus>()
    .oneOf(["OPEN", "BY_APPOINTMENT", "CLOSED"])
    .required(),
  startTime: Yup.string().when("status", {
    is: "OPEN",
    then: (s) => s.required("Başlangıç saati zorunludur."),
    otherwise: (s) => s.nullable(),
  }),
  endTime: Yup.string().when("status", {
    is: "OPEN",
    then: (s) =>
      s
        .required("Bitiş saati zorunludur.")
        .test(
          "after-start",
          "Bitiş saati başlangıçtan sonra olmalı.",
          function (v) {
            const { startTime } = this.parent;
            return !startTime || !v || startTime < v;
          },
        ),
    otherwise: (s) => s.nullable(),
  }),
});

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
  instagram: Yup.string()
    .trim()
    .max(31, "Instagram kullanıcı adı çok uzun.")
    .matches(/^@?[A-Za-z0-9._]*$/, "Geçersiz Instagram kullanıcı adı.")
    .optional(),
  workingHours: Yup.array()
    .of(workingHourSchema)
    .length(7, "7 gün de gereklidir.")
    .required(),
});

export type ContactInfoFormValues = Yup.InferType<typeof contactInfoSchema>;

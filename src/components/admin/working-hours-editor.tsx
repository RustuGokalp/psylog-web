"use client";

import type { FormikErrors, FormikTouched } from "formik";
import { TimePicker } from "@/components/ui/date-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DAY_LABELS,
  DAY_ORDER,
  STATUS_LABELS,
  type ContactInfoFormValues,
} from "@/schemas/contact-info.schema";
import type { WorkingHourStatus } from "@/types/contact-info";

interface WorkingHoursEditorProps {
  value: ContactInfoFormValues["workingHours"];
  onRowChange: (
    index: number,
    patch: Partial<ContactInfoFormValues["workingHours"][number]>,
  ) => void;
  errors?: FormikErrors<ContactInfoFormValues>["workingHours"];
  touched?: FormikTouched<ContactInfoFormValues>["workingHours"];
  disabled?: boolean;
}

const STATUS_OPTIONS: WorkingHourStatus[] = [
  "OPEN",
  "BY_APPOINTMENT",
  "CLOSED",
];

export default function WorkingHoursEditor({
  value,
  onRowChange,
  errors,
  touched,
  disabled,
}: WorkingHoursEditorProps) {
  return (
    <div className="flex flex-col gap-3">
      {DAY_ORDER.map((day, i) => {
        const row = value[i];
        const rowErrors =
          Array.isArray(errors) && errors[i]
            ? (errors[i] as FormikErrors<
                ContactInfoFormValues["workingHours"][number]
              >)
            : undefined;
        const rowTouched =
          Array.isArray(touched) && touched[i]
            ? (touched[i] as FormikTouched<
                ContactInfoFormValues["workingHours"][number]
              >)
            : undefined;

        const isOpen = row?.status === "OPEN";

        return (
          <div
            key={day}
            className="flex flex-col gap-2 rounded-lg border border-slate-200 bg-slate-50 p-3 sm:flex-row sm:items-start sm:gap-3"
          >
            {/* Day label */}
            <span className="w-full shrink-0 pt-1 text-sm font-medium text-slate-700 sm:w-24">
              {DAY_LABELS[day]}
            </span>

            {/* Status select */}
            <div className="flex flex-col gap-1">
              <Select
                value={row?.status ?? "CLOSED"}
                onValueChange={(v) => {
                  const newStatus = v as WorkingHourStatus;
                  const patch: Partial<
                    ContactInfoFormValues["workingHours"][number]
                  > = { status: newStatus };
                  if (newStatus !== "OPEN") {
                    patch.startTime = "";
                    patch.endTime = "";
                  } else {
                    if (!row?.startTime) patch.startTime = "09:00";
                    if (!row?.endTime) patch.endTime = "18:00";
                  }
                  onRowChange(i, patch);
                }}
                disabled={disabled}
              >
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Durum seçin">
                    {(v: WorkingHourStatus | null) =>
                      v ? STATUS_LABELS[v] : "Durum seçin"
                    }
                  </SelectValue>
                </SelectTrigger>
                <SelectContent alignItemWithTrigger={false}>
                  {STATUS_OPTIONS.map((status) => (
                    <SelectItem key={status} value={status}>
                      {STATUS_LABELS[status]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Time inputs — only when OPEN */}
            {isOpen && (
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:gap-2">
                {/* Start time */}
                <div className="flex flex-col gap-1">
                  <TimePicker
                    value={row?.startTime ?? ""}
                    onChange={(v) => onRowChange(i, { startTime: v })}
                    disabled={disabled}
                    aria-label={`${DAY_LABELS[day]} başlangıç saati`}
                    className="w-full sm:w-32"
                  />
                  {rowTouched?.startTime && rowErrors?.startTime && (
                    <p className="text-xs text-destructive">
                      {rowErrors.startTime}
                    </p>
                  )}
                </div>

                <span className="hidden pt-2 text-sm text-slate-400 sm:block">
                  –
                </span>

                {/* End time */}
                <div className="flex flex-col gap-1">
                  <TimePicker
                    value={row?.endTime ?? ""}
                    onChange={(v) => onRowChange(i, { endTime: v })}
                    disabled={disabled}
                    aria-label={`${DAY_LABELS[day]} bitiş saati`}
                    className="w-full sm:w-32"
                  />
                  {rowTouched?.endTime && rowErrors?.endTime && (
                    <p className="text-xs text-destructive">
                      {rowErrors.endTime}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

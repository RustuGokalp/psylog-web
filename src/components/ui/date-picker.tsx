"use client";

import * as React from "react";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerProps {
  value?: Date;
  onChange: (date: Date | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  disabledDate?: (date: Date) => boolean;
}

function DatePicker({
  value,
  onChange,
  placeholder = "Tarih seçin",
  disabled,
  className,
  disabledDate,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);

  function handleSelect(date: Date | undefined) {
    onChange(date);
    setOpen(false);
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        disabled={disabled}
        className={cn(
          "flex h-9 items-center gap-2 rounded-md border bg-white px-3 text-sm transition-colors hover:bg-slate-50 disabled:opacity-50",
          !value && "text-slate-400",
          className,
        )}
      >
        <CalendarIcon className="h-4 w-4 text-slate-400 shrink-0" />
        <span className={value ? "text-slate-800" : "text-slate-400"}>
          {value ? format(value, "d MMMM yyyy", { locale: tr }) : placeholder}
        </span>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={handleSelect}
          disabled={disabledDate}
          locale={tr}
        />
      </PopoverContent>
    </Popover>
  );
}

interface TimePickerProps {
  value: string; // "HH:mm"
  onChange: (value: string) => void;
  disabled?: boolean;
  id?: string;
  "aria-label"?: string;
  className?: string;
}

function TimePicker({
  value,
  onChange,
  disabled,
  id,
  "aria-label": ariaLabel,
  className,
}: TimePickerProps) {
  function openPicker(
    e: React.MouseEvent<HTMLInputElement> | React.FocusEvent<HTMLInputElement>,
  ) {
    const input = e.currentTarget as HTMLInputElement & {
      showPicker?: () => void;
    };
    try {
      input.showPicker?.();
    } catch {}
  }

  return (
    <Input
      type="time"
      id={id}
      aria-label={ariaLabel}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onClick={openPicker}
      onFocus={openPicker}
      disabled={disabled}
      className={cn("bg-background", className)}
    />
  );
}

export { DatePicker, TimePicker };
export type { DatePickerProps, TimePickerProps };

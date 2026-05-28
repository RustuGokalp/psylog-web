"use client";

import {
  DAY_ORDER,
  DAY_LABELS,
  STATUS_LABELS,
} from "@/schemas/contact-info.schema";
import type { DayOfWeek, WorkingHour } from "@/types/contact-info";

const JS_DAY_TO_DOW: Record<number, DayOfWeek> = {
  0: "SUNDAY",
  1: "MONDAY",
  2: "TUESDAY",
  3: "WEDNESDAY",
  4: "THURSDAY",
  5: "FRIDAY",
  6: "SATURDAY",
};

function formatTime(time: string): string {
  return time.slice(0, 5); // "HH:mm:ss" → "HH:mm"
}

interface WorkingHoursClientProps {
  workingHours: WorkingHour[] | undefined;
}

export default function WorkingHoursClient({
  workingHours,
}: WorkingHoursClientProps) {
  if (!workingHours || workingHours.length === 0) {
    return (
      <p className="mt-2 text-sm text-muted-foreground">
        Çalışma saatleri henüz eklenmemiş.
      </p>
    );
  }

  const todayDow: DayOfWeek = JS_DAY_TO_DOW[new Date().getDay()];

  const hoursByDay = new Map<DayOfWeek, WorkingHour>(
    workingHours.map((wh) => [wh.dayOfWeek, wh]),
  );

  return (
    <dl className="mt-3 space-y-1">
      {DAY_ORDER.map((day) => {
        const wh: WorkingHour = hoursByDay.get(day) ?? {
          dayOfWeek: day,
          status: "CLOSED",
          startTime: null,
          endTime: null,
        };

        const isToday = day === todayDow;

        let timeLabel: string;
        if (wh.status === "OPEN" && wh.startTime && wh.endTime) {
          timeLabel = `${formatTime(wh.startTime)} – ${formatTime(wh.endTime)}`;
        } else {
          timeLabel = STATUS_LABELS[wh.status];
        }

        return (
          <div
            key={day}
            className={`flex items-center justify-between rounded-lg px-3 py-1.5 ${
              isToday ? "bg-orange-200/60 font-medium" : ""
            }`}
          >
            <dt
              className={`text-sm ${
                isToday ? "text-orange-900" : "text-muted-foreground"
              }`}
            >
              {DAY_LABELS[day]}
            </dt>
            <dd
              className={`text-sm ${
                wh.status === "CLOSED"
                  ? "text-rose-500"
                  : isToday
                    ? "text-orange-900"
                    : "text-foreground"
              }`}
            >
              {timeLabel}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}

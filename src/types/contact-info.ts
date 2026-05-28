export type DayOfWeek =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY";

export type WorkingHourStatus = "OPEN" | "BY_APPOINTMENT" | "CLOSED";

export interface WorkingHour {
  dayOfWeek: DayOfWeek;
  status: WorkingHourStatus;
  startTime: string | null; // "HH:mm:ss"
  endTime: string | null; // "HH:mm:ss"
}

export interface ContactInfo {
  id: number;
  phone: string;
  email: string;
  location: string;
  updatedAt: string;
  workingHours: WorkingHour[];
}

export interface CreateContactInfoRequest {
  phone: string;
  email: string;
  location: string;
  workingHours: WorkingHour[];
}

export interface UpdateContactInfoRequest {
  phone: string;
  email: string;
  location: string;
  workingHours: WorkingHour[];
}

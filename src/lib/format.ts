// "20 Mayıs 2026"
export function formatTurkishDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// "20 May 2026 14:30"
export function formatTurkishDateTime(dateStr: string): string {
  return new Date(dateStr).toLocaleString("tr-TR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// "20 May 2026"
export function formatPublishDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("tr-TR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function formatReadingTime(minutes: number): string {
  if (minutes <= 60) return `${minutes} dk`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}s. ${mins}dk` : `${hours}s.`;
}

export function safeJsonLd(data: unknown): string {
  return JSON.stringify(data)
    .replace(/&/g, "\\u0026")
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e");
}

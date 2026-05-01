export function formatTurkishDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
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

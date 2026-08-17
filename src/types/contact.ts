export interface ContactRequest {
  fullName: string;
  email: string;
  subject: string;
  message: string;
  mobilePhone?: string;
  /** Bot tuzağı alanı — gerçek kullanıcılarda her zaman boş string gönderilir. */
  website: string;
}

export interface ContactMessage {
  id: number;
  fullName: string;
  email: string;
  subject: string;
  message: string;
  mobilePhone: string | null;
  createdAt: string;
}

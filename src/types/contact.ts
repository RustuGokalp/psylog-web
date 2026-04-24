export interface ContactRequest {
  fullName: string;
  email: string;
  subject: string;
  message: string;
  mobilePhone?: string;
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

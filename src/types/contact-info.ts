export interface ContactInfo {
  id: number;
  phone: string;
  email: string;
  location: string;
  updatedAt: string;
}

export interface CreateContactInfoRequest {
  phone: string;
  email: string;
  location: string;
}

export interface UpdateContactInfoRequest {
  phone: string;
  email: string;
  location: string;
}

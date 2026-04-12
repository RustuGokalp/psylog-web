export interface Specialization {
  id: number;
  title: string;
  slug: string;
  summary: string;
  content: string;
  image: string | null;
  displayOrder: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface SpecializationRequest {
  title: string;
  summary: string;
  content: string;
  image?: string | null;
  displayOrder?: number | null;
}

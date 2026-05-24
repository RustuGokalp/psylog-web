import { PostFormValues } from "@/schemas/post.schema";
import { SpecializationFormValues } from "@/schemas/specialization.schema";
import { AboutFormValues } from "@/schemas/about.schema";
import { PostDetail } from "@/types/post";
import { Specialization } from "@/types/specialization";
import { About } from "@/types/about";

export function toPreviewPost(values: PostFormValues): PostDetail {
  const now = new Date().toISOString();
  return {
    id: 0,
    title: values.title,
    slug: "onizleme",
    summary: values.summary,
    content: values.content,
    coverImage: values.coverImage || null,
    tags: values.tags,
    published: false,
    publishAt: null,
    createdAt: now,
    updatedAt: now,
    readingTime:
      values.readingTime !== "" && values.readingTime !== undefined
        ? Number(values.readingTime)
        : null,
    comments: [],
  };
}

export function toPreviewSpecialization(
  values: SpecializationFormValues,
): Specialization {
  const now = new Date().toISOString();
  return {
    id: 0,
    title: values.title,
    slug: "onizleme",
    summary: values.summary,
    content: values.content,
    image: values.image || null,
    displayOrder:
      values.displayOrder !== "" && values.displayOrder !== undefined
        ? Number(values.displayOrder)
        : null,
    createdAt: now,
    updatedAt: now,
  };
}

export function toPreviewAbout(values: AboutFormValues): About {
  const now = new Date().toISOString();
  return {
    id: 0,
    message: values.message,
    profileImage: values.profileImage || null,
    education: values.education,
    workingAreas: values.workingAreas,
    createdAt: now,
    updatedAt: now,
  };
}

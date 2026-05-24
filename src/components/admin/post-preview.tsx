"use client";

import { useEffect, useState } from "react";
import { About } from "@/types/about";
import { PostFormValues } from "@/schemas/post.schema";
import { getAbout } from "@/services/about.service";
import { toPreviewPost } from "@/lib/preview";
import PreviewDialog from "@/components/admin/preview-dialog";
import PostArticle from "@/components/posts/post-article";
import PostCard from "@/components/posts/post-card";

interface PostPreviewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  values: PostFormValues;
  about?: About | null;
}

export default function PostPreview({
  open,
  onOpenChange,
  values,
  about: aboutProp = null,
}: PostPreviewProps) {
  const post = toPreviewPost(values);
  const [about, setAbout] = useState<About | null>(aboutProp);

  useEffect(() => {
    if (!open || about) return;
    let active = true;
    getAbout()
      .then((data) => {
        if (active) setAbout(data);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, [open, about]);

  return (
    <PreviewDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Yazı Önizleme"
      tabs={[
        {
          value: "detail",
          label: "Detay",
          content: (
            <PostArticle post={post} about={about} interactive={false} />
          ),
        },
        {
          value: "list",
          label: "Liste",
          content: (
            <div className="p-6">
              <PostCard post={post} index={0} />
            </div>
          ),
        },
      ]}
    />
  );
}

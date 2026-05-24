"use client";

import { AboutFormValues } from "@/schemas/about.schema";
import { toPreviewAbout } from "@/lib/preview";
import PreviewDialog from "@/components/admin/preview-dialog";
import AboutContent from "@/components/about/about-content";

interface AboutPreviewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  values: AboutFormValues;
}

export default function AboutPreview({
  open,
  onOpenChange,
  values,
}: AboutPreviewProps) {
  const about = toPreviewAbout(values);

  return (
    <PreviewDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Hakkımda Önizleme"
      tabs={[
        {
          value: "about",
          label: "Hakkımda",
          content: <AboutContent about={about} />,
        },
      ]}
    />
  );
}

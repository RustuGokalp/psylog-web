"use client";

import { SpecializationFormValues } from "@/schemas/specialization.schema";
import { toPreviewSpecialization } from "@/lib/preview";
import PreviewDialog from "@/components/admin/preview-dialog";
import SpecializationDetail from "@/components/specializations/specialization-detail";
import SpecializationCard from "@/components/specializations/specialization-card";

interface SpecializationPreviewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  values: SpecializationFormValues;
}

export default function SpecializationPreview({
  open,
  onOpenChange,
  values,
}: SpecializationPreviewProps) {
  const item = toPreviewSpecialization(values);

  return (
    <PreviewDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Çalışma Alanı Önizleme"
      tabs={[
        {
          value: "detail",
          label: "Detay",
          content: <SpecializationDetail item={item} />,
        },
        {
          value: "list",
          label: "Liste",
          content: (
            <div className="bg-violet-50 px-4 py-8 sm:px-6">
              <SpecializationCard item={item} index={0} interactive={false} />
            </div>
          ),
        },
      ]}
    />
  );
}

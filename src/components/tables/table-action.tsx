"use client";

import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export type TableActionTone = "amber" | "red" | "violet" | "blue" | "green";

const TONE_CLASSES: Record<TableActionTone, string> = {
  amber: "text-amber-400 hover:text-amber-500 hover:bg-amber-50",
  red: "text-red-400 hover:text-red-600 hover:bg-red-50",
  violet: "text-violet-400 hover:text-violet-600 hover:bg-violet-50",
  blue: "text-blue-400 hover:text-blue-600 hover:bg-blue-50",
  green: "text-green-500 hover:text-green-700 hover:bg-green-50",
};

interface TableActionProps {
  tooltip: string;
  tone: TableActionTone;
  icon: LucideIcon;
  onClick: () => void;
  disabled?: boolean;
  ariaLabel?: string;
  className?: string;
}

export function TableAction({
  tooltip,
  tone,
  icon: Icon,
  onClick,
  disabled,
  ariaLabel,
  className,
}: TableActionProps) {
  return (
    <TooltipProvider delay={200}>
      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              variant="ghost"
              size="icon"
              onClick={onClick}
              disabled={disabled}
              aria-label={ariaLabel ?? tooltip}
              className={cn("cursor-pointer", TONE_CLASSES[tone], className)}
            >
              <Icon className="h-4 w-4" />
            </Button>
          }
        />
        <TooltipContent>{tooltip}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default TableAction;

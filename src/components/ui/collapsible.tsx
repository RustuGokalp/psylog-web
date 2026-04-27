"use client";

import * as React from "react";
import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible";

const Collapsible = CollapsiblePrimitive.Root;
const CollapsibleTrigger = CollapsiblePrimitive.Trigger;

interface CollapsiblePanelProps {
  open: boolean;
  children?: React.ReactNode;
  className?: string;
}

function CollapsiblePanel({
  open,
  children,
  className,
}: CollapsiblePanelProps) {
  return (
    <div
      className={`grid transition-[grid-template-rows] duration-250 ease-in-out${className ? ` ${className}` : ""}`}
      style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
    >
      <div className="min-h-0 overflow-hidden">{children}</div>
    </div>
  );
}

export { Collapsible, CollapsibleTrigger, CollapsiblePanel };

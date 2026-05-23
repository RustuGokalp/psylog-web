import type { SVGProps } from "react";

export default function PaperPlane({
  className,
  "aria-hidden": ariaHidden = true,
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 64 48"
      fill="currentColor"
      aria-hidden={ariaHidden}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M2 24 L62 4 L44 44 L30 32 Z" opacity="0.9" />
      <path d="M30 32 L44 44 L36 30 Z" opacity="0.55" />
      <path
        d="M2 24 L36 30"
        stroke="currentColor"
        strokeWidth="0.8"
        fill="none"
        opacity="0.35"
      />
    </svg>
  );
}

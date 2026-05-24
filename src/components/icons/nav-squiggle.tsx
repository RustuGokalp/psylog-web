import { SVGProps } from "react";

export default function NavSquiggle({
  className,
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 80 8"
      preserveAspectRatio="none"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      aria-hidden="true"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M2 5 Q 12 1, 22 4 T 42 4 T 62 4 T 78 4"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

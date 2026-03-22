interface LocationSketchProps {
  className?: string;
}

export default function LocationSketch({ className }: LocationSketchProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M50 88 C50 88 20 56 20 36 C20 20 33 10 50 10 C67 10 80 20 80 36 C80 56 50 88 50 88 Z"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Inner circle */}
      <circle cx="50" cy="36" r="10" stroke="currentColor" strokeWidth="3.5" />
    </svg>
  );
}

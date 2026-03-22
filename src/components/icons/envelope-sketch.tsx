interface EnvelopeSketchProps {
  className?: string;
}

export default function EnvelopeSketch({ className }: EnvelopeSketchProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Envelope body — slightly wobbly rectangle */}
      <path
        d="M12 32 C12 29 14 27 17 27 L83 27 C86 27 88 29 88 32 L88 70 C88 73 86 75 83 75 L17 75 C14 75 12 73 12 70 Z"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Flap V lines */}
      <path
        d="M13 29 L50 54 L87 29"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Heart at center of flap */}
      <path
        d="M50 62 C50 62 44 57 44 53 C44 50 47 48 50 51 C53 48 56 50 56 53 C56 57 50 62 50 62 Z"
        fill="currentColor"
      />
    </svg>
  );
}

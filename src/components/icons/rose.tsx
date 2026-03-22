interface RoseProps {
  className?: string;
}

const OUTER_ANGLES = [0, 72, 144, 216, 288];
const INNER_ANGLES = [36, 108, 180, 252, 324];

export default function Rose({ className }: RoseProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer petals — 5 larger petals */}
      {OUTER_ANGLES.map((angle) => (
        <path
          key={`outer-${angle}`}
          d="M 50 50 Q 34 22 50 8 Q 66 22 50 50"
          fill="currentColor"
          fillOpacity="0.25"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          transform={`rotate(${angle} 50 50)`}
        />
      ))}

      {/* Inner petals — 5 smaller petals, offset 36° */}
      {INNER_ANGLES.map((angle) => (
        <path
          key={`inner-${angle}`}
          d="M 50 50 Q 40 34 50 24 Q 60 34 50 50"
          fill="currentColor"
          fillOpacity="0.45"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          transform={`rotate(${angle} 50 50)`}
        />
      ))}

      {/* Center */}
      <circle cx="50" cy="50" r="9" fill="currentColor" opacity="0.7" />
    </svg>
  );
}

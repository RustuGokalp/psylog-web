interface DaisyProps {
  className?: string;
}

export default function Daisy({ className }: DaisyProps) {
  const petals = Array.from({ length: 8 }, (_, i) => i * 45);

  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Petals — 8 ellipses rotated around center */}
      {petals.map((angle) => (
        <ellipse
          key={angle}
          cx="50"
          cy="22"
          rx="6"
          ry="14"
          fill="currentColor"
          opacity="0.9"
          transform={`rotate(${angle} 50 50)`}
        />
      ))}

      {/* Center circle */}
      <circle cx="50" cy="50" r="12" fill="currentColor" opacity="0.7" />
    </svg>
  );
}

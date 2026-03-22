interface BalloonProps {
  className?: string;
}

export default function Balloon({ className }: BalloonProps) {
  return (
    <svg viewBox="0 0 80 130" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Balloon body */}
      <ellipse cx="40" cy="44" rx="30" ry="38" fillOpacity="0.65" />
      {/* Shine highlight */}
      <ellipse cx="30" cy="28" rx="7" ry="10" fill="currentColor" fillOpacity="0.2" />
      {/* Knot */}
      <path d="M36 82 Q40 86 44 82 Q40 78 36 82Z" fillOpacity="0.85" />
      {/* String */}
      <path d="M40 86 Q32 96 38 106 Q44 116 38 124" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

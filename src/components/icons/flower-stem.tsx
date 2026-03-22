interface FlowerStemProps {
  className?: string;
}

export default function FlowerStem({ className }: FlowerStemProps) {
  return (
    <svg viewBox="0 0 120 200" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Stem */}
      <path d="M62 195 Q58 160 60 130 Q62 100 58 70" stroke="#b8845a" strokeWidth="5" fill="none" strokeLinecap="round" />
      {/* Left leaf */}
      <path d="M60 140 Q38 128 30 112 Q44 118 60 130Z" fill="#b8845a" />
      {/* Right leaf */}
      <path d="M60 115 Q84 106 90 90 Q76 100 60 112Z" fill="#b8845a" />
      {/* Petals - 12 petals rotated around center (60, 58) */}
      {Array.from({ length: 12 }).map((_, i) => (
        <ellipse
          key={i}
          cx="60"
          cy="34"
          rx="7"
          ry="18"
          fill="#c8d8b0"
          fillOpacity="0.9"
          transform={`rotate(${i * 30} 60 58)`}
        />
      ))}
      {/* Center white circle */}
      <circle cx="60" cy="58" r="14" fill="#f5f5ee" />
      {/* Center dot */}
      <circle cx="60" cy="58" r="6" fill="#d48050" fillOpacity="0.8" />
    </svg>
  );
}

interface ButterflyProps {
  className?: string;
}

export default function Butterfly({ className }: ButterflyProps) {
  return (
    <svg viewBox="0 0 100 100" fill="currentColor" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Upper left wing */}
      <path d="M50 50 C42 38 24 22 16 32 C10 40 20 54 50 50Z" fillOpacity="0.65" />
      {/* Lower left wing */}
      <path d="M50 50 C32 56 14 66 18 78 C22 88 40 80 50 50Z" fillOpacity="0.45" />
      {/* Upper right wing */}
      <path d="M50 50 C58 38 76 22 84 32 C90 40 80 54 50 50Z" fillOpacity="0.65" />
      {/* Lower right wing */}
      <path d="M50 50 C68 56 86 66 82 78 C78 88 60 80 50 50Z" fillOpacity="0.45" />
      {/* Body */}
      <ellipse cx="50" cy="50" rx="3" ry="14" fillOpacity="0.85" />
      {/* Antennae */}
      <path d="M48 37 C44 28 38 23 36 20" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M52 37 C56 28 62 23 64 20" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <circle cx="35" cy="19" r="2.5" />
      <circle cx="65" cy="19" r="2.5" />
    </svg>
  );
}

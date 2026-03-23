interface StarProps {
  className?: string;
}

export default function Star({ className }: StarProps) {
  return (
    <svg viewBox="0 0 100 100" fill="currentColor" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M50 14 L57 36 L81 37 L63 52 L69 75 L50 62 L31 75 L37 52 L19 37 L43 36 Z"
        fillOpacity="0.85"
      />
    </svg>
  );
}

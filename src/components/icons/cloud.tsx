interface CloudProps {
  className?: string;
  color?: string;
}

export default function Cloud({ className, color = "currentColor" }: CloudProps) {
  return (
    <svg
      viewBox="0 0 120 60"
      fill="none"
      aria-hidden="true"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Main body ellipse */}
      <ellipse cx="55" cy="38" rx="55" ry="22" fill={color} />
      {/* Upper-left bump */}
      <ellipse cx="35" cy="28" rx="28" ry="20" fill={color} />
      {/* Upper-right bump */}
      <ellipse cx="78" cy="30" rx="22" ry="16" fill={color} />
    </svg>
  );
}

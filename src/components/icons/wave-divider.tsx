interface WaveDividerProps {
  className?: string;
  color?: string;
  secondaryColor?: string;
}

export default function WaveDivider({
  className,
  color = "currentColor",
  secondaryColor,
}: WaveDividerProps) {
  const secondary = secondaryColor ?? color;

  return (
    <svg
      viewBox="0 0 1200 70"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 22 Q 200 7, 400 22 T 800 22 T 1200 22"
        stroke={color}
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M0 55 Q 200 40, 400 55 T 800 55 T 1200 55"
        stroke={secondary}
        strokeWidth="2"
        fill="none"
        opacity="0.7"
      />
    </svg>
  );
}

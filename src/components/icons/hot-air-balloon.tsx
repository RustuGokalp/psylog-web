interface HotAirBalloonProps {
  className?: string;
}

export default function HotAirBalloon({ className }: HotAirBalloonProps) {
  return (
    <svg
      viewBox="0 0 200 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id="balloonGrad"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#c2415a" />
          <stop offset="100%" stopColor="#8b7eb8" />
        </linearGradient>
      </defs>

      {/* Small lavender side-balloon */}
      <g opacity="0.4" transform="translate(160 30)">
        <ellipse cx="0" cy="0" rx="10" ry="12" fill="#8b7eb8" />
        <path d="M-4 10 L0 18 L4 10" fill="#5a4750" />
      </g>

      {/* Main balloon group */}
      <g transform="translate(100 84)">
        {/* Balloon body */}
        <ellipse cx="0" cy="0" rx="58" ry="68" fill="url(#balloonGrad)" />

        {/* Ribs */}
        <path
          d="M-20 -60 Q -28 0, -20 62"
          stroke="#fdf8f6"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          opacity="0.7"
        />
        <path
          d="M20 -60 Q 28 0, 20 62"
          stroke="#fdf8f6"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          opacity="0.7"
        />
        <path
          d="M0 -68 L 0 64"
          stroke="#fdf8f6"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          opacity="0.5"
        />

        {/* Highlight band */}
        <path
          d="M-58 0 Q -54 -34, -36 -52"
          stroke="#8b7eb8"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
          opacity="0.5"
        />

        {/* Shine */}
        <ellipse cx="-22" cy="-28" rx="14" ry="22" fill="white" opacity="0.18" />
      </g>

      {/* Ropes */}
      <line
        x1="56" y1="146" x2="76" y2="170"
        stroke="#5a4750" strokeWidth="1.3"
      />
      <line
        x1="144" y1="146" x2="124" y2="170"
        stroke="#5a4750" strokeWidth="1.3"
      />
      <line
        x1="86" y1="148" x2="92" y2="170"
        stroke="#5a4750" strokeWidth="1.3"
      />
      <line
        x1="114" y1="148" x2="108" y2="170"
        stroke="#5a4750" strokeWidth="1.3"
      />

      {/* Basket */}
      <g transform="translate(100 184)">
        {/* Basket body */}
        <path d="M-26 -14 L26 -14 L22 14 L-22 14 Z" fill="#a4734a" />
        {/* Basket highlight */}
        <path d="M-26 -14 L26 -14 L22 14 L-22 14 Z" fill="white" opacity="0.1" />
        {/* Weave lines */}
        <line x1="-22" y1="-6" x2="22" y2="-6" stroke="#7a5435" strokeWidth="0.8" opacity="0.6" />
        <line x1="-20" y1="2" x2="20" y2="2" stroke="#7a5435" strokeWidth="0.8" opacity="0.6" />
        <line x1="-18" y1="10" x2="18" y2="10" stroke="#7a5435" strokeWidth="0.8" opacity="0.6" />
        {/* Rim */}
        <rect x="-28" y="-16" width="56" height="3.5" fill="#7a5435" />
      </g>
    </svg>
  );
}

const NAVY = "oklch(0.4 0.168 260)";
const NAVY_DARK = "oklch(0.26 0.14 260)";
const NAVY_LIGHT = "oklch(0.55 0.196 260)";
const ACCENT = "oklch(0.87 0.116 204)";
const CREAM = "oklch(0.97 0.015 282)";

interface LandmarkProps {
  fill: string;
  accent: string;
}

function windowsGrid(cols: number[], rows: number[], accent: string) {
  return cols.flatMap((x) =>
    rows.map((y) => (
      <rect key={`${x}-${y}`} x={x} y={y} width={7} height={10} fill={accent} opacity={0.7} />
    ))
  );
}

const LANDMARKS: Record<
  string,
  { label: string; render: (p: LandmarkProps) => React.ReactNode }
> = {
  delhi: {
    label: "India Gate",
    render: ({ fill, accent }) => (
      <g>
        <path
          d="M-70 92 L-70 -58 Q-70 -100 -30 -100 L30 -100 Q70 -100 70 -58 L70 92 L46 92 L46 -54 Q46 -76 24 -76 L-24 -76 Q-46 -76 -46 -54 L-46 92 Z"
          fill={fill}
        />
        <rect x="-86" y="86" width="172" height="16" rx="3" fill={fill} />
        <circle cx="0" cy="-108" r="6" fill={accent} />
      </g>
    ),
  },
  gurugram: {
    label: "Cyber Hub Towers",
    render: ({ fill, accent }) => (
      <g>
        <rect x="-92" y="-30" width="42" height="122" rx="3" fill={fill} />
        <rect x="-38" y="-70" width="36" height="162" rx="3" fill={fill} />
        <rect x="8" y="-14" width="40" height="106" rx="3" fill={fill} />
        <rect x="56" y="-50" width="34" height="142" rx="3" fill={fill} />
        {windowsGrid([-84, -68], [-16, 4, 24, 44], accent)}
        {windowsGrid([-30, -14], [-56, -36, -16, 4, 24], accent)}
        {windowsGrid([16, 32], [0, 20, 40, 60], accent)}
        {windowsGrid([64, 78], [-36, -16, 4, 24, 44], accent)}
      </g>
    ),
  },
  noida: {
    label: "DND Flyway",
    render: ({ fill, accent }) => (
      <g>
        <rect x="-92" y="-4" width="38" height="96" rx="3" fill={fill} />
        <rect x="30" y="-38" width="46" height="130" rx="3" fill={fill} />
        {windowsGrid([-84, -70], [10, 30, 50], accent)}
        {windowsGrid([38, 54], [-22, -2, 18, 38, 58], accent)}
        <path d="M-110 56 Q0 4 110 56" stroke={accent} strokeWidth="8" fill="none" opacity="0.85" />
      </g>
    ),
  },
  mumbai: {
    label: "Gateway of India",
    render: ({ fill, accent }) => (
      <g>
        <path d="M-58 92 L-58 -18 A58 58 0 0 1 58 -18 L58 92 Z" fill={fill} />
        <rect x="-72" y="86" width="144" height="16" rx="3" fill={fill} />
        <rect x="-44" y="6" width="88" height="86" fill={NAVY_DARK} opacity="0.35" />
        <path d="M-104 100 Q0 82 104 100" stroke={accent} strokeWidth="4" fill="none" opacity="0.75" />
      </g>
    ),
  },
  bengaluru: {
    label: "Vidhana Soudha",
    render: ({ fill, accent }) => (
      <g>
        <rect x="-92" y="30" width="184" height="62" fill={fill} />
        {[-78, -52, -26, 0, 26, 52, 78].map((x) => (
          <rect key={x} x={x - 5} y={38} width="10" height="48" fill={NAVY_DARK} opacity="0.3" />
        ))}
        <circle cx="0" cy="14" r="36" fill={fill} />
        <rect x="-7" y="-48" width="14" height="42" fill={fill} />
        <polygon points="-16,-48 16,-48 0,-68" fill={fill} />
        <circle cx="0" cy="-72" r="5" fill={accent} />
      </g>
    ),
  },
  pune: {
    label: "Shaniwar Wada",
    render: ({ fill, accent }) => (
      <g>
        <path d="M-100 92 L-52 24 L-4 92 Z" fill={fill} opacity="0.5" />
        <path d="M4 92 L56 14 L108 92 Z" fill={fill} opacity="0.35" />
        <rect x="-34" y="8" width="68" height="84" fill={fill} />
        <path d="M-34 8 Q0 -26 34 8 Z" fill={fill} />
        <rect x="-10" y="46" width="20" height="46" fill={NAVY_DARK} opacity="0.4" />
        <circle cx="0" cy="-24" r="4" fill={accent} />
      </g>
    ),
  },
  hyderabad: {
    label: "Charminar",
    render: ({ fill, accent }) => (
      <g>
        <rect x="-70" y="20" width="140" height="72" rx="4" fill={fill} />
        <rect x="-88" y="88" width="176" height="12" rx="3" fill={fill} />
        {[-82, -28, 28, 82].map((x) => (
          <g key={x} transform={`translate(${x} 20)`}>
            <rect x="-6" y="-58" width="12" height="58" fill={fill} />
            <path d="M-6 -58 Q0 -80 6 -58 Z" fill={fill} />
            <circle cx="0" cy="-72" r="4.5" fill={accent} />
          </g>
        ))}
        <path d="M-24 20 Q0 -8 24 20 Z" fill={fill} />
      </g>
    ),
  },
  chennai: {
    label: "Marina Lighthouse",
    render: ({ fill, accent }) => (
      <g>
        <polygon points="-16,92 16,92 9,-52 -9,-52" fill={fill} />
        <rect x="-20" y="-62" width="40" height="14" rx="3" fill={fill} />
        <circle cx="0" cy="-78" r="9" fill={accent} />
        <path d="M-100 100 Q-50 84 0 100 T100 100" stroke={accent} strokeWidth="4" fill="none" opacity="0.7" />
      </g>
    ),
  },
  kolkata: {
    label: "Howrah Bridge",
    render: ({ fill, accent }) => (
      <g>
        <rect x="-104" y="-30" width="20" height="122" fill={fill} />
        <rect x="84" y="-30" width="20" height="122" fill={fill} />
        <path
          d="M-94 40 L-50 -20 L50 -20 L94 40"
          stroke={accent}
          strokeWidth="8"
          fill="none"
        />
        <path d="M-94 92 L94 92" stroke={fill} strokeWidth="10" />
        {[-60, -30, 0, 30, 60].map((x) => (
          <line key={x} x1={x} y1={92} x2={x} y2={-4} stroke={fill} strokeWidth="3" opacity="0.7" />
        ))}
      </g>
    ),
  },
  ahmedabad: {
    label: "Sabarmati Riverfront",
    render: ({ fill, accent }) => (
      <g>
        <line x1="0" y1="-86" x2="0" y2="86" stroke={fill} strokeWidth="9" />
        {[-72, -44, -18, 18, 44, 72].map((x) => (
          <line key={x} x1="0" y1="-76" x2={x} y2="60" stroke={accent} strokeWidth="3" opacity="0.75" />
        ))}
        <path d="M-100 78 Q0 44 100 78" stroke={fill} strokeWidth="10" fill="none" />
        <polygon points="-58,-70 -40,-46 -58,-22 -76,-46" fill={accent} />
        <polygon points="52,-92 68,-70 52,-48 36,-70" fill={accent} />
      </g>
    ),
  },
};

interface CityIllustrationProps {
  slug: string;
  city: string;
  state: string;
  variant: "tile" | "hero";
  className?: string;
}

export function CityIllustration({
  slug,
  city,
  state,
  variant,
  className,
}: CityIllustrationProps) {
  const landmark = LANDMARKS[slug];
  const gradId = `${slug}-${variant}-sky`;

  if (variant === "hero") {
    return (
      <svg
        viewBox="0 0 1600 520"
        preserveAspectRatio="none"
        className={className}
        role="img"
        aria-labelledby={`${slug}HeroTitle`}
      >
        <title id={`${slug}HeroTitle`}>
          {landmark ? `${landmark.label} skyline illustration of ${city}` : `${city} skyline illustration`}
        </title>
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={NAVY_LIGHT} />
            <stop offset="100%" stopColor={NAVY_DARK} />
          </linearGradient>
        </defs>
        <rect width="1600" height="520" fill={`url(#${gradId})`} />
        <g fill={ACCENT} opacity="0.3">
          {Array.from({ length: 18 }, (_, i) => (
            <circle key={i} cx={40 + ((i * 617) % 1560)} cy={30 + ((i * 217) % 460)} r="2" />
          ))}
        </g>
        {landmark ? (
          <g transform="translate(1180 330) scale(1.7)">
            {landmark.render({ fill: CREAM, accent: ACCENT })}
          </g>
        ) : null}
        <ellipse cx="800" cy="510" rx="900" ry="16" fill={NAVY_DARK} opacity="0.5" />
        {landmark ? (
          <g transform="translate(72 456)">
            <rect x="0" y="0" width={landmark.label.length * 11 + 96} height="44" rx="22" fill={NAVY_DARK} opacity="0.55" />
            <circle cx="24" cy="22" r="6" fill={ACCENT} />
            <text x="42" y="27" fill={CREAM} fontSize="16" fontWeight="600" fontFamily="sans-serif">
              {landmark.label}
            </text>
            <text
              x={landmark.label.length * 11 + 66}
              y="27"
              fill={ACCENT}
              fontSize="14"
              fontFamily="sans-serif"
              textAnchor="end"
            >
              {state}
            </text>
          </g>
        ) : null}
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 320 320"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      role="img"
      aria-labelledby={`${slug}TileTitle`}
    >
      <title id={`${slug}TileTitle`}>
        {landmark ? `${landmark.label} illustration of ${city}` : `${city} illustration`}
      </title>
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={NAVY_LIGHT} />
          <stop offset="100%" stopColor={NAVY_DARK} />
        </linearGradient>
      </defs>
      <rect width="320" height="320" fill={`url(#${gradId})`} />
      <g fill={ACCENT} opacity="0.25">
        {Array.from({ length: 10 }, (_, i) => (
          <circle key={i} cx={20 + ((i * 97) % 300)} cy={16 + ((i * 53) % 140)} r="1.6" />
        ))}
      </g>
      {landmark ? (
        <>
          <g transform="translate(160 160) scale(0.72)">
            {landmark.render({ fill: CREAM, accent: ACCENT })}
          </g>
          <g transform="translate(14 14)">
            <rect
              x="0"
              y="0"
              width={landmark.label.length * 6.1 + 16}
              height="22"
              rx="11"
              fill={NAVY_DARK}
              opacity="0.6"
            />
            <text x="10" y="15" fill={CREAM} fontSize="11" fontWeight="600" fontFamily="sans-serif">
              {landmark.label}
            </text>
          </g>
        </>
      ) : null}
    </svg>
  );
}

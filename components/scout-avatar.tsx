import { SparkMark } from "./icons";

/** The friendly agent mascot shown on the empty state. */
export function ScoutRobot({ className }: { className?: string }) {
  return (
    <div className={`relative ${className ?? ""}`}>
      <div className="absolute inset-0 rounded-full border border-dashed border-line/70" />
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_35%,rgba(242,138,85,0.16),transparent_62%)]" />
      <svg viewBox="0 0 160 170" className="relative h-full w-full">
        {/* antenna */}
        <path
          d="M80 30V16"
          stroke="#25221f"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle cx="80" cy="11" r="6" fill="#f28a55" />

        {/* head */}
        <rect
          x="30"
          y="30"
          width="100"
          height="66"
          rx="24"
          fill="#fffaf2"
          stroke="#25221f"
          strokeWidth="3.4"
        />
        {/* visor */}
        <rect x="46" y="48" width="68" height="30" rx="15" fill="#25221f" />
        <circle cx="64" cy="63" r="7.5" fill="#f28a55" />
        <circle cx="96" cy="63" r="7.5" fill="#f28a55" />

        {/* ears */}
        <rect x="20" y="52" width="10" height="22" rx="5" fill="#f28a55" />
        <rect x="130" y="52" width="10" height="22" rx="5" fill="#f28a55" />

        {/* arms */}
        <path
          d="M32 112c-12 0-16 12-14 24"
          stroke="#25221f"
          strokeWidth="3.4"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M128 112c12 0 16 12 14 24"
          stroke="#25221f"
          strokeWidth="3.4"
          strokeLinecap="round"
          fill="none"
        />

        {/* body */}
        <rect
          x="38"
          y="100"
          width="84"
          height="56"
          rx="22"
          fill="#fffaf2"
          stroke="#25221f"
          strokeWidth="3.4"
        />
        <circle cx="80" cy="126" r="17" fill="#25221f" />
        <SparkMarkInline />
        <circle cx="98" cy="140" r="3.4" fill="#f28a55" />
      </svg>
    </div>
  );
}

function SparkMarkInline() {
  return (
    <g
      transform="translate(80 126) scale(0.62) translate(-12 -12)"
      stroke="#fffaf2"
      strokeWidth="2.2"
      strokeLinecap="round"
    >
      <path d="M12 3.5v17M4.2 7.75l15.6 8.5M19.8 7.75l-15.6 8.5" />
    </g>
  );
}

/** Small circular logo badge used in the rail and on agent messages. */
export function BrandBadge({
  className,
  tone = "dark",
}: {
  className?: string;
  tone?: "dark" | "accent";
}) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full ${
        tone === "dark" ? "bg-ink text-canvas" : "bg-accent/15 text-accent-deep"
      } ${className ?? ""}`}
    >
      <SparkMark className="h-1/2 w-1/2" />
    </span>
  );
}

/**
 * AuditLevel brand icon — a shield with an accessibility checkmark.
 * Combines the visual metaphor of "protection/audit" (shield) with
 * "accessibility" (the universal access figure silhouette merged into a check).
 */
export function AuditLevelIcon({ size = 32, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Shield body */}
      <path
        d="M16 2L4 7V15C4 22.18 9.12 28.84 16 30C22.88 28.84 28 22.18 28 15V7L16 2Z"
        fill="url(#shield-gradient)"
        stroke="rgba(0,0,0,0.15)"
        strokeWidth="0.5"
      />

      {/* Inner highlight */}
      <path
        d="M16 4.5L6 8.75V15C6 21.06 10.44 26.68 16 27.92C21.56 26.68 26 21.06 26 15V8.75L16 4.5Z"
        fill="url(#inner-gradient)"
        opacity="0.4"
      />

      {/* Accessibility figure — head */}
      <circle cx="16" cy="10.5" r="2" fill="#0a0a0a" opacity="0.9" />

      {/* Accessibility figure — body with checkmark arm */}
      <path
        d="M12.5 15.5L14.5 17.5L19.5 12.5"
        stroke="#0a0a0a"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.9"
      />

      {/* Accessibility figure — torso */}
      <path
        d="M16 13V18.5"
        stroke="#0a0a0a"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.9"
      />

      {/* Accessibility figure — legs */}
      <path
        d="M16 18.5L13 23M16 18.5L19 23"
        stroke="#0a0a0a"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.9"
      />

      <defs>
        <linearGradient id="shield-gradient" x1="16" y1="2" x2="16" y2="30" gradientUnits="userSpaceOnUse">
          <stop stopColor="#34d399" />
          <stop offset="1" stopColor="#10b981" />
        </linearGradient>
        <linearGradient id="inner-gradient" x1="16" y1="4.5" x2="16" y2="27.92" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffffff" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  )
}

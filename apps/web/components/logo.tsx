export function Logo({ size = 32, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="512" height="512" rx="112" fill="url(#bg)" />
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="512" y2="512">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
        <linearGradient id="bolt" x1="200" y1="80" x2="320" y2="440">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#e0d4ff" />
        </linearGradient>
      </defs>
      {/* Lightning bolt / forge symbol */}
      <path
        d="M296 80L168 272h80l-48 160 176-224h-96l48-128z"
        fill="url(#bolt)"
      />
      {/* Subtle neural dots */}
      <circle cx="120" cy="160" r="12" fill="white" opacity="0.3" />
      <circle cx="392" cy="352" r="12" fill="white" opacity="0.3" />
      <circle cx="400" cy="140" r="8" fill="white" opacity="0.2" />
      <circle cx="112" cy="372" r="8" fill="white" opacity="0.2" />
    </svg>
  );
}

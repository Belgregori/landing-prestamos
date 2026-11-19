export default function Marca({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <span
      className={`flex items-center justify-center rounded-full border border-white/12 bg-white/[0.04] ${className}`}
      aria-hidden
    >
      <svg viewBox="0 0 32 32" className="h-[60%] w-[60%] text-[#c9d4e8]">
        <path
          fill="currentColor"
          d="M16 4L26 10v12L16 28 6 22V10L16 4zm0 3.2L9.5 11v10L16 24.8 22.5 21V11L16 7.2z"
        />
        <circle cx="16" cy="16" r="3.5" fill="currentColor" opacity="0.55" />
      </svg>
    </span>
  );
}

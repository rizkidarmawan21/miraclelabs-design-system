import { useId } from "react"
import { cn } from "@/lib/utils"

// Orbit mark from the v6 identity kit. `small` is the heavier cut meant for 16-32px.
const MARK =
  "M230.35,91.38 A114,114 0 1 1 148.62,9.65 A58,58 0 0 1 128.11,50.47 A70,70 0 1 0 189.53,111.89 A58,58 0 0 1 230.35,91.38Z M186,14 C191.6,46 194,48.4 226,54 C194,59.6 191.6,62 186,94 C180.4,62 178,59.6 146,54 C178,48.4 180.4,46 186,14Z"
const MARK_SM =
  "M235.8,97.31 A118,118 0 1 1 142.69,4.2 A66,66 0 0 1 120,54 A66,66 0 1 0 186,120 A66,66 0 0 1 235.8,97.31Z M186,0 C193.56,43.2 196.8,46.44 240,54 C196.8,61.56 193.56,64.8 186,108 C178.44,64.8 175.2,61.56 132,54 C175.2,46.44 178.44,43.2 186,0Z"

type MarkProps = {
  /** "orbit" fills with the v6 gradient (same as logo-color.svg), "current" inherits text color */
  tone?: "orbit" | "current"
  small?: boolean
  className?: string
}

function OrbitMark({ tone = "orbit", small = false, className }: MarkProps) {
  const id = useId()
  return (
    <svg viewBox="2 2 236 236" aria-hidden className={cn("size-8 shrink-0", className)}>
      {tone === "orbit" && (
        <defs>
          <linearGradient id={id} x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="var(--ml-violet)" />
            <stop offset=".55" stopColor="var(--ml-magenta)" />
            <stop offset="1" stopColor="var(--ml-orange)" />
          </linearGradient>
        </defs>
      )}
      <path fill={tone === "orbit" ? `url(#${id})` : "currentColor"} d={small ? MARK_SM : MARK} />
    </svg>
  )
}

// Lockup proportions from the kit: mark ~1.5x font size, gap ~0.45x, Inter Tight Medium, -3% tracking.
function Logo({ tone = "orbit", className }: Omit<MarkProps, "small">) {
  return (
    <span className={cn("inline-flex items-center gap-[0.45em] text-xl", className)}>
      <OrbitMark tone={tone} small className="size-[1.5em]" />
      <span className="font-medium tracking-[-0.03em] leading-none">miracle labs</span>
    </span>
  )
}

export { Logo, OrbitMark }

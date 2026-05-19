import { useEffect, useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../ThemeContext'

/* ───────────── Floating Label Tags (like Firecrawl's [ .JSON ], [ SCRAPE ]) ───────────── */

interface FloatingTagProps {
  label: string
  x: string
  y: string
  delay: number
  driftX?: number
  driftY?: number
  duration?: number
}

function FloatingTag({ label, x, y, delay, driftX = 10, driftY = 15, duration = 8 }: FloatingTagProps) {
  const theme = useTheme()
  return (
    <motion.div
      className={`absolute font-mono text-[11px] tracking-wider select-none pointer-events-none whitespace-nowrap ${
        theme === 'dark' ? 'text-white/[0.08]' : 'text-black/[0.07]'
      }`}
      style={{ left: x, top: y }}
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        x: [0, driftX, -driftX / 2, driftX / 3, 0],
        y: [0, -driftY, driftY / 2, -driftY / 3, 0],
      }}
      transition={{
        opacity: { duration: 1, delay },
        x: { repeat: Infinity, duration, ease: 'easeInOut', delay },
        y: { repeat: Infinity, duration: duration * 1.1, ease: 'easeInOut', delay },
      }}
    >
      {label}
    </motion.div>
  )
}

/* ───────────── Small floating dots / squares ───────────── */

interface FloatingDotProps {
  x: string
  y: string
  size: number
  delay: number
  shape?: 'dot' | 'square'
  driftX?: number
  driftY?: number
  duration?: number
}

function FloatingDot({ x, y, size, delay, shape = 'dot', driftX = 8, driftY = 12, duration = 10 }: FloatingDotProps) {
  const theme = useTheme()
  return (
    <motion.div
      className={`absolute pointer-events-none ${
        shape === 'dot' ? 'rounded-full' : 'rounded-[1px]'
      } ${theme === 'dark' ? 'bg-white/[0.08]' : 'bg-black/[0.06]'}`}
      style={{ left: x, top: y, width: size, height: size }}
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0, 1, 1, 0.5, 1],
        x: [0, driftX, -driftX, driftX / 2, 0],
        y: [0, -driftY, driftY / 2, -driftY / 3, 0],
      }}
      transition={{
        opacity: { repeat: Infinity, duration: duration * 1.5, ease: 'easeInOut', delay },
        x: { repeat: Infinity, duration, ease: 'easeInOut', delay },
        y: { repeat: Infinity, duration: duration * 0.9, ease: 'easeInOut', delay },
      }}
    />
  )
}

/* ───────────── Star / cross accent ───────────── */

interface FloatingCrossProps {
  x: string
  y: string
  delay: number
  size?: number
}

function FloatingCross({ x, y, delay, size = 14 }: FloatingCrossProps) {
  const theme = useTheme()
  const color = theme === 'dark' ? 'rgba(16,185,129,0.25)' : 'rgba(16,185,129,0.3)'
  return (
    <motion.svg
      className="absolute pointer-events-none"
      style={{ left: x, top: y }}
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
      initial={{ opacity: 0, rotate: 0 }}
      animate={{
        opacity: [0, 1, 0.6, 1],
        rotate: [0, 90, 180, 270, 360],
        x: [0, 5, -3, 5, 0],
        y: [0, -8, 4, -4, 0],
      }}
      transition={{
        opacity: { repeat: Infinity, duration: 6, ease: 'easeInOut', delay },
        rotate: { repeat: Infinity, duration: 20, ease: 'linear', delay },
        x: { repeat: Infinity, duration: 12, ease: 'easeInOut', delay },
        y: { repeat: Infinity, duration: 10, ease: 'easeInOut', delay },
      }}
    >
      <path
        d="M7 0V14M0 7H14"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </motion.svg>
  )
}

/* ───────────── Inaccessible UI ghost elements ───────────── */

function GhostElements() {
  const theme = useTheme()
  const borderColor = theme === 'dark' ? 'border-white/[0.06]' : 'border-black/[0.05]'
  const bgColor = theme === 'dark' ? 'bg-white/[0.03]' : 'bg-black/[0.02]'
  const textColor = theme === 'dark' ? 'text-red-500/30' : 'text-red-500/25'
  const barColor = theme === 'dark' ? 'bg-white/[0.06]' : 'bg-black/[0.04]'

  return (
    <>
      {/* Ghost button – no aria-label */}
      <motion.div
        className="absolute top-[18%] left-[8%] opacity-100 pointer-events-none"
        animate={{ y: [0, -6, 0], x: [0, 3, 0] }}
        transition={{ repeat: Infinity, duration: 9, ease: 'easeInOut' }}
      >
        <div className={`w-28 h-9 ${bgColor} border ${borderColor} rounded-lg flex items-center justify-center gap-2`}>
          <div className={`w-3 h-3 rounded ${barColor}`} />
          <div className={`w-14 h-2 ${barColor} rounded-full`} />
        </div>
        <span className={`text-[9px] font-mono ${textColor} mt-1 block`}>aria-label: ∅</span>
      </motion.div>

      {/* Ghost input – no label */}
      <motion.div
        className="absolute top-[55%] left-[5%] opacity-100 pointer-events-none"
        animate={{ y: [0, 8, 0], x: [0, -4, 0] }}
        transition={{ repeat: Infinity, duration: 11, ease: 'easeInOut', delay: 2 }}
      >
        <div className={`w-44 h-9 ${bgColor} border ${borderColor} rounded-lg px-3 flex items-center`}>
          <div className={`w-20 h-2 ${barColor} rounded-full`} />
        </div>
        <span className={`text-[9px] font-mono ${textColor} mt-1 block`}>{'<label>: missing'}</span>
      </motion.div>

      {/* Ghost checkbox – not focusable */}
      <motion.div
        className="absolute top-[32%] right-[10%] opacity-100 pointer-events-none"
        animate={{ y: [0, -5, 0], x: [0, 5, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut', delay: 1 }}
      >
        <div className="flex items-center gap-2">
          <div className={`w-4 h-4 ${bgColor} border ${borderColor} rounded-[3px]`} />
          <div className={`w-16 h-2 ${barColor} rounded-full`} />
        </div>
        <span className={`text-[9px] font-mono ${textColor} mt-1 block`}>tabIndex: -1</span>
      </motion.div>

      {/* Ghost text – low contrast */}
      <motion.div
        className="absolute top-[70%] right-[8%] opacity-100 pointer-events-none"
        animate={{ y: [0, 6, 0], x: [0, -3, 0] }}
        transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut', delay: 3 }}
      >
        <div className={`text-[13px] font-medium ${theme === 'dark' ? 'text-zinc-800' : 'text-zinc-300'} tracking-wide`}>
          Aviso Importante
        </div>
        <span className={`text-[9px] font-mono ${textColor} mt-0.5 block`}>contrast: 2.1:1</span>
      </motion.div>

      {/* Ghost link – generic label */}
      <motion.div
        className="absolute top-[85%] left-[12%] opacity-100 pointer-events-none"
        animate={{ y: [0, -7, 0], x: [0, 4, 0] }}
        transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut', delay: 1.5 }}
      >
        <div className={`text-[12px] font-mono ${theme === 'dark' ? 'text-zinc-800 underline decoration-zinc-800' : 'text-zinc-300 underline decoration-zinc-300'}`}>
          clique aqui
        </div>
        <span className={`text-[9px] font-mono ${textColor} mt-0.5 block`}>link text: generic</span>
      </motion.div>
    </>
  )
}

/* ───────────── Moving beams of light ───────────── */

function Beams() {
  const theme = useTheme()
  const c = theme === 'dark' ? '16,185,129' : '5,150,105' // emerald-500 / emerald-600

  return (
    <>
      <motion.div
        initial={{ y: -300, opacity: 0 }}
        animate={{ y: '110vh', opacity: [0, 0.6, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: 'linear', delay: 0.5 }}
        className="absolute top-0 w-[1px] h-48 left-[18%]"
        style={{ background: `linear-gradient(to bottom, transparent, rgba(${c},0.3), transparent)` }}
      />
      <motion.div
        initial={{ y: -300, opacity: 0 }}
        animate={{ y: '110vh', opacity: [0, 0.5, 0] }}
        transition={{ repeat: Infinity, duration: 7, ease: 'linear', delay: 3 }}
        className="absolute top-0 w-[1px] h-64 left-[62%]"
        style={{ background: `linear-gradient(to bottom, transparent, rgba(${c},0.2), transparent)` }}
      />
      <motion.div
        initial={{ y: -300, opacity: 0 }}
        animate={{ y: '110vh', opacity: [0, 0.4, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: 'linear', delay: 1.5 }}
        className="absolute top-0 w-[1px] h-56 left-[88%]"
        style={{ background: `linear-gradient(to bottom, transparent, rgba(${c},0.25), transparent)` }}
      />
      {/* Horizontal beam */}
      <motion.div
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: '110vw', opacity: [0, 0.4, 0] }}
        transition={{ repeat: Infinity, duration: 9, ease: 'linear', delay: 2 }}
        className="absolute left-0 h-[1px] w-48 top-[40%]"
        style={{ background: `linear-gradient(to right, transparent, rgba(${c},0.25), transparent)` }}
      />
    </>
  )
}

/* ───────────── Main AnimatedBackground ───────────── */

export function AnimatedBackground({ theme: _theme }: { theme: 'dark' | 'light' }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Memoize tags to prevent re-renders
  const tags = useMemo(() => [
    { label: '[ WCAG 2.2 ]', x: '5%', y: '12%', delay: 0, driftX: 8, driftY: 10 },
    { label: '[ aria-* ]', x: '82%', y: '8%', delay: 0.5, driftX: -6, driftY: 12 },
    { label: '[ role ]', x: '90%', y: '45%', delay: 1, driftX: 7, driftY: -8 },
    { label: '[ .a11y ]', x: '3%', y: '42%', delay: 1.5, driftX: -5, driftY: 14 },
    { label: '[ tab-order ]', x: '75%', y: '78%', delay: 2, driftX: 10, driftY: -6 },
    { label: '[ contrast ]', x: '8%', y: '80%', delay: 2.5, driftX: -8, driftY: 10 },
    { label: '[ focus-trap ]', x: '88%', y: '62%', delay: 0.8, driftX: 6, driftY: -12 },
    { label: '[ alt="" ]', x: '45%', y: '5%', delay: 1.2, driftX: -4, driftY: 8 },
  ], [])

  const dots = useMemo(() => [
    { x: '25%', y: '15%', size: 4, delay: 0, shape: 'square' as const },
    { x: '70%', y: '20%', size: 3, delay: 0.5, shape: 'dot' as const },
    { x: '15%', y: '35%', size: 5, delay: 1, shape: 'square' as const },
    { x: '85%', y: '30%', size: 3, delay: 1.5, shape: 'dot' as const },
    { x: '55%', y: '90%', size: 4, delay: 2, shape: 'square' as const },
    { x: '35%', y: '60%', size: 3, delay: 0.8, shape: 'dot' as const },
    { x: '92%', y: '85%', size: 4, delay: 1.2, shape: 'square' as const },
    { x: '60%', y: '50%', size: 5, delay: 2.5, shape: 'dot' as const },
    { x: '40%', y: '75%', size: 3, delay: 0.3, shape: 'square' as const },
    { x: '78%', y: '55%', size: 4, delay: 1.8, shape: 'dot' as const },
  ], [])

  const crosses = useMemo(() => [
    { x: '20%', y: '10%', delay: 0.5 },
    { x: '75%', y: '15%', delay: 1.5 },
    { x: '50%', y: '45%', delay: 2.5 },
    { x: '30%', y: '85%', delay: 3.5 },
    { x: '85%', y: '70%', delay: 0.8 },
  ], [])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Grid */}
      <div className={`absolute inset-0 ${_theme === 'dark' ? 'bg-grid-dark' : 'bg-grid-light'} bg-[length:40px_40px] transition-colors duration-300`} />

      {/* Vignette */}
      <div className={`absolute inset-0 ${_theme === 'dark' ? 'bg-radial-vignette-dark' : 'bg-radial-vignette-light'} transition-colors duration-300`} />

      {/* Floating tags like Firecrawl's [ .JSON ] [ SCRAPE ] */}
      {tags.map((tag, i) => (
        <FloatingTag key={i} {...tag} />
      ))}

      {/* Small dots and squares */}
      {dots.map((dot, i) => (
        <FloatingDot key={i} {...dot} />
      ))}

      {/* Cross / star accents */}
      {crosses.map((cross, i) => (
        <FloatingCross key={i} {...cross} />
      ))}

      {/* Beams */}
      <Beams />

      {/* Ghost inaccessible UI elements */}
      <GhostElements />
    </div>
  )
}

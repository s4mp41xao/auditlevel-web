import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon, List, X, ArrowRight, GithubLogo } from '@phosphor-icons/react'
import { useTheme } from '../ThemeContext'

const navLinks = [
  { label: 'Como Funciona', href: '#como-funciona' },
  { label: 'Recursos', href: '#recursos' },
  { label: 'Impacto', href: '#impacto' },
  { label: 'FAQ', href: '#faq' },
]

export function Navbar({ onToggleTheme }: { onToggleTheme: () => void }) {
  const theme = useTheme()
  const d = theme === 'dark'
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? d
              ? 'bg-zinc-950/80 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_1px_12px_rgba(0,0,0,0.4)]'
              : 'bg-white/80 backdrop-blur-xl border-b border-black/[0.06] shadow-[0_1px_12px_rgba(0,0,0,0.06)]'
            : d
              ? 'bg-transparent border-b border-transparent'
              : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-[1400px] mx-auto flex items-center justify-between px-6 h-16">
          {/* Left: Logo + nav links */}
          <div className="flex items-center gap-8">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2.5 group">
              <img src="/auditlevel-icon.png" alt="AuditLevel" className="w-8 h-8 rounded-lg" />
              <span className="text-[17px] font-bold tracking-tight">AuditLevel</span>
            </a>

            {/* Separator */}
            <div className={`hidden md:block w-px h-5 ${d ? 'bg-white/10' : 'bg-black/10'}`} />

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-2 text-[13px] font-medium rounded-lg transition-colors ${
                    d
                      ? 'text-zinc-400 hover:text-white hover:bg-white/[0.06]'
                      : 'text-zinc-500 hover:text-zinc-900 hover:bg-black/[0.04]'
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Right: actions */}
          <div className="flex items-center gap-3">
            {/* MCP Badge - desktop only */}
            <div className={`hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full border text-[11px] font-mono ${
              d ? 'border-emerald-500/20 bg-emerald-500/5 text-emerald-400' : 'border-emerald-500/25 bg-emerald-500/5 text-emerald-600'
            }`}>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              MCP Ready
            </div>

            {/* GitHub link */}
            <a
              href="https://github.com/s4mp41xao/auditlevel-web"
              target="_blank"
              rel="noopener noreferrer"
              className={`hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg text-[13px] font-medium transition-colors ${
                d
                  ? 'text-zinc-400 hover:text-white hover:bg-white/[0.06]'
                  : 'text-zinc-500 hover:text-zinc-900 hover:bg-black/[0.04]'
              }`}
            >
              <GithubLogo weight="fill" size={16} />
              <span className="hidden lg:inline">GitHub</span>
            </a>

            {/* Theme toggle */}
            <button
              onClick={onToggleTheme}
              className={`p-2 rounded-lg transition-colors ${
                d
                  ? 'text-zinc-400 hover:text-white hover:bg-white/[0.06]'
                  : 'text-zinc-500 hover:text-zinc-900 hover:bg-black/[0.04]'
              }`}
              aria-label="Toggle Theme"
            >
              {d ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* CTA Button */}
            <motion.a
              href="#acesso"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="hidden sm:flex items-center gap-2 px-4 py-2 text-[13px] font-semibold rounded-lg bg-emerald-500 text-zinc-950 hover:bg-emerald-400 transition-colors shadow-sm"
            >
              Acesso Antecipado
              <ArrowRight weight="bold" size={14} />
            </motion.a>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`md:hidden p-2 rounded-lg transition-colors ${
                d
                  ? 'text-zinc-400 hover:text-white hover:bg-white/[0.06]'
                  : 'text-zinc-500 hover:text-zinc-900 hover:bg-black/[0.04]'
              }`}
              aria-label="Menu"
            >
              {mobileOpen ? <X size={20} /> : <List size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`fixed top-16 left-0 right-0 z-40 border-b p-4 ${
              d
                ? 'bg-zinc-950/95 backdrop-blur-xl border-white/[0.06]'
                : 'bg-white/95 backdrop-blur-xl border-black/[0.06]'
            }`}
          >
            <div className="flex flex-col gap-1">
              {navLinks.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`px-4 py-3 text-sm font-medium rounded-xl transition-colors ${
                    d
                      ? 'text-zinc-300 hover:bg-white/[0.06]'
                      : 'text-zinc-700 hover:bg-black/[0.04]'
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <div className={`my-2 h-px ${d ? 'bg-white/[0.06]' : 'bg-black/[0.06]'}`} />
              <a
                href="#acesso"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold rounded-xl bg-emerald-500 text-zinc-950"
              >
                Acesso Antecipado
                <ArrowRight weight="bold" size={14} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

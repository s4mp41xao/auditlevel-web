import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate
} from 'framer-motion'
import { useRef, useEffect } from 'react'
import {
  CurrencyDollar,
  Clock,
  ShieldCheck,
  TrendUp,
  Gavel,
  Users
} from '@phosphor-icons/react'
import { useTheme } from '../ThemeContext'

function AnimatedCounter({
  to,
  prefix = '',
  suffix = '',
  duration = 2
}: {
  to: number
  prefix?: string
  suffix?: string
  duration?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(0)
  const rounded = useTransform(motionValue, v => {
    if (to >= 1000)
      return prefix + Math.round(v).toLocaleString('pt-BR') + suffix
    return prefix + Math.round(v) + suffix
  })
  const inViewRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(inViewRef, { once: true, margin: '-100px' })

  useEffect(() => {
    if (isInView) {
      animate(motionValue, to, { duration, ease: 'easeOut' })
    }
  }, [isInView, to, duration, motionValue])

  return (
    <div ref={inViewRef}>
      <motion.span ref={ref}>{rounded}</motion.span>
    </div>
  )
}

const metrics = [
  {
    icon: Gavel,
    iconColor: 'text-red-400',
    iconBg: 'bg-red-500/10 border-red-500/20',
    label: 'Multa média por não conformidade WCAG',
    value: 50000,
    prefix: 'R$ ',
    suffix: '',
    description:
      'Empresas com mais de 20 funcionários podem receber autuações do MTE por barreiras digitais de acessibilidade.',
    highlight: 'Risco evitado'
  },
  {
    icon: Clock,
    iconColor: 'text-blue-400',
    iconBg: 'bg-blue-500/10 border-blue-500/20',
    label: 'Horas de dev economizadas por sprint',
    value: 18,
    prefix: '',
    suffix: 'h',
    description:
      'Auditoria manual de acessibilidade leva em média 3h por componente. Com o AuditLevel integrado ao seu agente de IA, isso cai para minutos.',
    highlight: 'Velocidade de entrega'
  },
  {
    icon: CurrencyDollar,
    iconColor: 'text-emerald-400',
    iconBg: 'bg-emerald-500/10 border-emerald-500/20',
    label: 'Economizado vs auditoria manual anual',
    value: 28000,
    prefix: 'R$ ',
    suffix: '',
    description:
      'Consultorias especializadas em acessibilidade cobram entre R$ 800-2.000 por auditoria. Com o AuditLevel, você audita em tempo real, sem custo adicional.',
    highlight: 'ROI direto'
  },
  {
    icon: Users,
    iconColor: 'text-violet-400',
    iconBg: 'bg-violet-500/10 border-violet-500/20',
    label: 'Brasileiros com alguma deficiência',
    value: 18,
    prefix: '',
    suffix: '%',
    description:
      'Segundo o IBGE, 18% da população brasileira tem algum tipo de deficiência. Ignorar acessibilidade significa excluir 1 em cada 5 usuários potenciais.',
    highlight: 'Mercado ignorado'
  },
  {
    icon: ShieldCheck,
    iconColor: 'text-amber-400',
    iconBg: 'bg-amber-500/10 border-amber-500/20',
    label: 'Critérios WCAG 2.2 cobertos automaticamente',
    value: 87,
    prefix: '',
    suffix: '%',
    description:
      'O AuditLevel verifica automaticamente a grande maioria dos critérios de sucesso do WCAG 2.2, incluindo nível AAA para os mais críticos.',
    highlight: 'Cobertura técnica'
  },
  {
    icon: TrendUp,
    iconColor: 'text-teal-400',
    iconBg: 'bg-teal-500/10 border-teal-500/20',
    label: 'Aumento médio em conversão com acessibilidade',
    value: 23,
    prefix: '+',
    suffix: '%',
    description:
      'Sites acessíveis têm melhor SEO, menor taxa de rejeição e maior taxa de conversão. Acessibilidade não é só ética: é negócio.',
    highlight: 'Impacto em receita'
  }
]

export function RoiPanel() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })
  const theme = useTheme()
  const d = theme === 'dark'

  return (
    <section ref={sectionRef} className="py-24 px-6 max-w-[1200px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-mono mb-4">
          <TrendUp weight="fill" size={12} />
          Impacto para o negócio
        </span>
        <h2 className={`text-3xl md:text-5xl font-bold tracking-tight mb-4 ${d ? 'text-white' : 'text-zinc-900'}`}>
          Acessibilidade e{' '}
          <span className="text-emerald-500">resultado financeiro</span>
        </h2>
        <p className={`text-lg max-w-2xl mx-auto ${d ? 'text-zinc-400' : 'text-zinc-600'}`}>
          Ignorar acessibilidade não é só uma questão ética. É um risco legal,
          uma perda de mercado e um custo de desenvolvimento desnecessário.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {metrics.map((metric, i) => {
          const Icon = metric.icon
          return (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`group relative rounded-2xl p-6 transition-all duration-300 overflow-hidden border ${
                d
                  ? 'bg-zinc-900 border-white/10 hover:border-white/20'
                  : 'bg-white border-zinc-200 hover:border-zinc-300 shadow-sm'
              }`}
            >
              {/* subtle glow on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(circle at 50% 0%, rgba(16,185,129,0.06) 0%, transparent 70%)'
                }}
              />

              <div className="flex items-start justify-between mb-4">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center border ${metric.iconBg}`}
                >
                  <Icon weight="fill" className={metric.iconColor} size={20} />
                </div>
                <span className={`text-[10px] font-mono uppercase tracking-widest border px-2 py-0.5 rounded-full ${
                  d ? 'text-zinc-500 border-white/10' : 'text-zinc-500 border-black/10'
                }`}>
                  {metric.highlight}
                </span>
              </div>

              <div className="mb-2">
                <span className={`text-3xl font-bold tabular-nums ${d ? 'text-white' : 'text-zinc-900'}`}>
                  <AnimatedCounter
                    to={metric.value}
                    prefix={metric.prefix}
                    suffix={metric.suffix}
                  />
                </span>
              </div>

              <p className={`text-sm font-semibold mb-2 leading-snug ${d ? 'text-zinc-300' : 'text-zinc-700'}`}>
                {metric.label}
              </p>
              <p className={`text-xs leading-relaxed ${d ? 'text-zinc-500' : 'text-zinc-500'}`}>
                {metric.description}
              </p>
            </motion.div>
          )
        })}
      </div>

      {/* Bottom CTA bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.55 }}
        className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 p-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/5"
      >
        <div>
          <p className={`font-semibold text-lg ${d ? 'text-white' : 'text-zinc-900'}`}>
            Comece a auditar antes que seja tarde.
          </p>
          <p className={`text-sm mt-1 ${d ? 'text-zinc-400' : 'text-zinc-600'}`}>
            Integre o AuditLevel MCP ao seu agente de IA em menos de 5 minutos.
          </p>
        </div>
        <button className="shrink-0 px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold rounded-xl transition-colors text-sm">
          Solicitar Acesso Antecipado
        </button>
      </motion.div>
    </section>
  )
}

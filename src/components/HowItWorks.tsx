import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  Code,
  Robot,
  Wrench,
  CheckCircle,
  ArrowRight
} from '@phosphor-icons/react'
import { useTheme } from '../ThemeContext'

const steps = [
  {
    number: '01',
    icon: Code,
    iconColor: 'text-blue-400',
    iconBg: 'bg-blue-500/10 border-blue-500/30',
    glowColor: 'rgba(59,130,246,0.15)',
    tag: 'Desenvolvedor',
    tagColor: 'text-blue-400 border-blue-500/30 bg-blue-500/10',
    title: 'Você escreve o código',
    description:
      'No seu fluxo normal de desenvolvimento, você pede ao seu agente de IA (Claude, Cursor, Copilot) para revisar ou criar um componente.',
    detail:
      'Sem instalar plugins na IDE. Sem interrupções no fluxo. Apenas uma conversa natural com sua IA.',
    code: '"Crie um formulário de login acessível"',
    codeLabel: 'Prompt para o agente de IA'
  },
  {
    number: '02',
    icon: Robot,
    iconColor: 'text-violet-400',
    iconBg: 'bg-violet-500/10 border-violet-500/30',
    glowColor: 'rgba(139,92,246,0.15)',
    tag: 'Agente de IA',
    tagColor: 'text-violet-400 border-violet-500/30 bg-violet-500/10',
    title: 'A IA chama o AuditLevel',
    description:
      'O agente de IA, ao gerar ou revisar código, invoca automaticamente o servidor MCP do AuditLevel para auditar o resultado antes de te entregar.',
    detail:
      'O protocolo MCP (Model Context Protocol) da Anthropic permite que agentes de IA chamem ferramentas externas como se fossem funções nativas.',
    code: 'tool_call: AuditLevel_Analyze(component)',
    codeLabel: 'Chamada interna do agente'
  },
  {
    number: '03',
    icon: Wrench,
    iconColor: 'text-emerald-400',
    iconBg: 'bg-emerald-500/10 border-emerald-500/30',
    glowColor: 'rgba(16,185,129,0.15)',
    tag: 'AuditLevel MCP',
    tagColor: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
    title: 'Auditoria + correção em tempo real',
    description:
      'O servidor MCP analisa o código contra os critérios WCAG 2.2, identifica as violações e devolve para o agente um relatório estruturado com as correções.',
    detail:
      'O agente de IA usa esse relatório para corrigir o código automaticamente e te entregar um componente já em conformidade.',
    code: '{ violations: 2, fixed: true, score: 98 }',
    codeLabel: 'Resposta do AuditLevel MCP'
  }
]

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.18, ease: 'easeOut' as const }
  })
}

export function HowItWorks() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const theme = useTheme()
  const d = theme === 'dark'

  return (
    <section
      ref={ref}
      className={`py-24 px-6 max-w-[1200px] mx-auto border-t ${d ? 'border-white/5' : 'border-black/5'}`}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="text-center mb-20"
      >
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-400 text-xs font-mono mb-5">
          <Wrench weight="fill" size={12} />
          Como funciona
        </span>
        <h2 className={`text-3xl md:text-5xl font-bold tracking-tight mb-4 ${d ? 'text-white' : 'text-zinc-900'}`}>
          Do prompt a <span className="text-emerald-500">conformidade</span>, em
          3 passos
        </h2>
        <p className={`text-lg max-w-xl mx-auto ${d ? 'text-zinc-400' : 'text-zinc-600'}`}>
          O AuditLevel se integra de forma invisível ao seu fluxo de IA. Você
          continua programando normalmente.
        </p>
      </motion.div>

      {/* Steps grid */}
      <div className="relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.number}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                className={`group relative flex flex-col gap-5 p-7 rounded-2xl border transition-all duration-300 overflow-hidden ${
                  d
                    ? 'bg-zinc-900 border-white/10 hover:border-white/20'
                    : 'bg-white border-zinc-200 hover:border-zinc-300 shadow-sm'
                }`}
              >
                {/* Card glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${step.glowColor} 0%, transparent 65%)`
                  }}
                />

                {/* Step number + icon */}
                <div className="flex items-center justify-between">
                  <div
                    className={`w-12 h-12 rounded-2xl border flex items-center justify-center ${step.iconBg}`}
                  >
                    <Icon weight="fill" className={step.iconColor} size={22} />
                  </div>
                  <span className={`text-5xl font-black tabular-nums select-none ${d ? 'text-white/5' : 'text-black/[0.04]'}`}>
                    {step.number}
                  </span>
                </div>

                {/* Tag */}
                <span
                  className={`self-start text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full border ${step.tagColor}`}
                >
                  {step.tag}
                </span>

                {/* Title and description */}
                <div>
                  <h3 className={`text-lg font-bold mb-2 leading-snug ${d ? 'text-white' : 'text-zinc-900'}`}>
                    {step.title}
                  </h3>
                  <p className={`text-sm leading-relaxed ${d ? 'text-zinc-400' : 'text-zinc-600'}`}>
                    {step.description}
                  </p>
                </div>

                {/* Code snippet */}
                <div className={`rounded-xl p-3 mt-auto border ${d ? 'bg-black/30 border-white/5' : 'bg-zinc-100 border-black/5'}`}>
                  <p className={`text-[10px] font-mono mb-1.5 uppercase tracking-wider ${d ? 'text-zinc-600' : 'text-zinc-400'}`}>
                    {step.codeLabel}
                  </p>
                  <code className={`text-xs font-mono break-all ${d ? 'text-zinc-300' : 'text-zinc-700'}`}>
                    {step.code}
                  </code>
                </div>

                {/* Detail */}
                <p className={`text-xs leading-relaxed border-t pt-4 ${d ? 'text-zinc-500 border-white/5' : 'text-zinc-500 border-black/5'}`}>
                  {step.detail}
                </p>

                {/* Arrow connector for mobile */}
                {i < steps.length - 1 && (
                  <div className="flex md:hidden justify-center pt-2">
                    <ArrowRight className="text-zinc-700 rotate-90" size={20} />
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Bottom result bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.7 }}
        className={`mt-10 flex flex-col sm:flex-row items-center gap-4 p-5 rounded-2xl border ${
          d
            ? 'border-white/10 bg-zinc-900'
            : 'border-zinc-200 bg-white shadow-sm'
        }`}
      >
        <div className="flex items-center gap-3 flex-1">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
            <CheckCircle weight="fill" className="text-emerald-400" size={20} />
          </div>
          <div>
            <p className={`text-sm font-semibold ${d ? 'text-white' : 'text-zinc-900'}`}>
              Resultado: Código acessível na primeira entrega
            </p>
            <p className={`text-xs mt-0.5 ${d ? 'text-zinc-500' : 'text-zinc-500'}`}>
              Sem retrabalho. Sem ciclos extras de revisão. Sem surpresas no dia
              do deploy.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-6 shrink-0">
          {[
            ['98', 'Accessibility Score'],
            ['0', 'Violações WCAG'],
            ['<2min', 'Tempo de auditoria']
          ].map(([val, lbl]) => (
            <div key={lbl} className="text-center">
              <p className="text-xl font-bold text-emerald-400">{val}</p>
              <p className={`text-[10px] font-mono mt-0.5 ${d ? 'text-zinc-500' : 'text-zinc-500'}`}>
                {lbl}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { User, Robot, Wrench, CheckCircle } from '@phosphor-icons/react'
import { useTheme } from '../ThemeContext'

type Scenario = {
  userMessage: string
  toolName: string
  auditResult: string[]
  aiText: string
  codeOld: string
  codeNew: string
}

const scenarios: Scenario[] = [
  {
    userMessage: 'Pode verificar a acessibilidade do componente Navbar.tsx?',
    toolName: 'AuditLevel_Analyze',
    auditResult: [
      'WCAG 1.4.3: Contraste insuficiente no link de navegação.',
      'WCAG 4.1.2: Menu de hambúrguer sem aria-expanded.'
    ],
    aiText:
      'A auditoria retornou dois pontos de melhoria na sua Navbar. Aqui o código corrigido para garantir conformidade WCAG:',
    codeOld: '<button className="mobile-menu">',
    codeNew: '<button className="mobile-menu" aria-expanded={isOpen}>'
  },
  {
    userMessage:
      'Temos alguma armadilha de teclado (keyboard trap) no fluxo do Modal de Pagamento?',
    toolName: 'AuditLevel_TraceFocus',
    auditResult: [
      'WCAG 2.1.2: Foco preso (Keyboard Trap). O usuário não consegue sair do iframe usando a tecla TAB.'
    ],
    aiText:
      'Sim. A auditoria detectou que o foco fica preso. Sugiro envolver o modal com um FocusTrap para gerenciar a saída do teclado de forma nativa:',
    codeOld: '<div className="payment-modal">\n  <StripeIframe />\n</div>',
    codeNew:
      '<FocusTrap active={isOpen}>\n  <div className="payment-modal">\n    <StripeIframe />\n  </div>\n</FocusTrap>'
  },
  {
    userMessage:
      'O leitor de tela anuncia nosso gráfico SVG apenas como grupo. Como dar contexto real para pessoas com deficiência visual.',
    toolName: 'AuditLevel_AriaTree',
    auditResult: [
      'WCAG 1.1.1: Conteúdo não textual. SVG sem rótulo ou título interno.',
      'WCAG 1.3.1: Informação e Relações. Falta de role estrutural.'
    ],
    aiText:
      'O AuditLevel analisou a árvore de acessibilidade. SVGs precisam da role figure e de um <title> interno para NVDA ou VoiceOver:',
    codeOld: '<svg className="sales-chart">\n  <path d="..." />\n</svg>',
    codeNew:
      '<svg className="sales-chart" role="figure" aria-label="Vendas anuais">\n  <title>Gráfico de vendas</title>\n  <path d="..." />\n</svg>'
  }
]

export function ChatSimulation() {
  const [currentScenario, setCurrentScenario] = useState(0)
  const [step, setStep] = useState(0)
  const theme = useTheme()
  const d = theme === 'dark'

  useEffect(() => {
    let isMounted = true
    const delay = (ms: number) => new Promise<void>(r => setTimeout(r, ms))

    const runSequence = async () => {
      while (isMounted) {
        setStep(0)
        await delay(1000)
        if (!isMounted) break
        setStep(1)
        await delay(3000)
        if (!isMounted) break
        setStep(2)
        await delay(2000)
        if (!isMounted) break
        setStep(3)
        await delay(2500)
        if (!isMounted) break
        setStep(4)
        await delay(6000)
        if (!isMounted) break
        setStep(5)
        await delay(600)
        if (!isMounted) break
        setCurrentScenario(prev => (prev + 1) % scenarios.length)
      }
    }

    runSequence()
    return () => {
      isMounted = false
    }
  }, [currentScenario])

  const scenario = scenarios[currentScenario]

  return (
    <section className={`py-24 px-6 max-w-[1000px] mx-auto border-t ${d ? 'border-white/5' : 'border-black/5'}`}>
      <div className="text-center mb-16">
        <h2 className={`text-3xl md:text-5xl font-bold tracking-tight mb-4 ${d ? 'text-white' : 'text-zinc-900'}`}>
          A verdadeira essência do <span className="text-emerald-500">MCP</span>
        </h2>
        <p className={`text-lg ${d ? 'text-zinc-400' : 'text-zinc-600'}`}>
          Integre o AuditLevel com seus assistentes de IA favoritos e torne a
          acessibilidade parte da conversa.
        </p>
      </div>

      {/* The chat window always uses a dark code-editor style regardless of theme */}
      <div className="w-full bg-[#0d1117] rounded-2xl border border-white/10 shadow-2xl overflow-hidden min-h-[460px] flex flex-col">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/5 shrink-0">
          <Robot weight="fill" className="text-zinc-400" />
          <span className="text-sm font-medium text-zinc-300">
            Assistente de IA Integrado
          </span>
          <div className="ml-auto flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-emerald-400 font-mono">
              AuditLevel MCP conectado
            </span>
          </div>
        </div>

        <div className="p-6 flex flex-col gap-6 flex-1">
          <AnimatePresence mode="wait">
            {step >= 1 && step < 5 && (
              <motion.div
                key={'user-' + currentScenario}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex gap-4 items-start"
              >
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0 border border-blue-500/30 mt-1">
                  <User weight="fill" className="text-blue-400" size={16} />
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-none p-4 text-zinc-300 max-w-[85%] leading-relaxed text-sm">
                  {scenario.userMessage}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {step >= 2 && step < 5 && (
              <motion.div
                key={'ai-' + currentScenario}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex gap-4 items-start"
              >
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 border border-emerald-500/30 mt-1">
                  <Robot weight="fill" className="text-emerald-400" size={16} />
                </div>
                <div className="flex flex-col gap-3 max-w-[90%] w-full">
                  <div className="flex items-center gap-2">
                    <motion.div
                      animate={step === 2 ? { rotate: 360 } : {}}
                      transition={{
                        duration: 1.5,
                        repeat: step === 2 ? Infinity : 0,
                        ease: 'linear'
                      }}
                    >
                      {step === 2 ? (
                        <Wrench
                          weight="fill"
                          className="text-emerald-500"
                          size={14}
                        />
                      ) : (
                        <CheckCircle
                          weight="fill"
                          className="text-emerald-500"
                          size={14}
                        />
                      )}
                    </motion.div>
                    <span
                      className={
                        step === 2
                          ? 'text-emerald-400 font-mono text-xs'
                          : 'text-zinc-500 font-mono text-xs'
                      }
                    >
                      {step === 2
                        ? 'Usando ferramenta: ' + scenario.toolName
                        : 'Auditoria concluida com sucesso'}
                    </span>
                  </div>

                  <AnimatePresence>
                    {step >= 3 && step < 5 && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-black/40 border border-white/5 rounded-xl p-4 overflow-hidden"
                      >
                        <p className="text-xs text-red-400 mb-2 font-mono">
                          [AuditLevel MCP] Problemas criticos detectados:
                        </p>
                        <ul className="text-xs text-zinc-400 font-mono space-y-1.5 list-disc pl-4">
                          {scenario.auditResult.map((res, i) => (
                            <li key={i}>{res}</li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <AnimatePresence>
                    {step >= 4 && step < 5 && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-zinc-300 leading-relaxed"
                      >
                        <p className="mb-3 text-sm">{scenario.aiText}</p>
                        <div className="bg-[#161b22] border border-white/10 rounded-lg p-3 font-mono text-xs overflow-x-auto whitespace-pre">
                          <div className="text-zinc-500 line-through opacity-60 mb-2">
                            {scenario.codeOld}
                          </div>
                          <div className="text-emerald-400 bg-emerald-500/10 p-2 rounded">
                            {scenario.codeNew}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

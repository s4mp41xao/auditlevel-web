import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useState, useRef } from 'react'
import { Plus, Minus, Question } from '@phosphor-icons/react'
import { useTheme } from '../ThemeContext'

const faqs = [
  {
    category: 'Produto',
    question: 'Por que detectar problemas de acessibilidade antes do deploy?',
    answer:
      'Ferramentas de auditoria pontual ajudam a capturar um retrato do estado atual: você roda, recebe um relatório e vai corrigir manualmente. O AuditLevel muda o paradigma: a auditoria acontece DURANTE a geração do código, integrada ao seu agente de IA. O agente recebe o relatório e já corrige sozinho antes de te entregar o componente. É a diferença entre um exame médico mensal e um monitor cardíaco 24h.'
  },
  {
    category: 'Produto',
    question: 'Funciona com qualquer framework? React, Vue, Angular?',
    answer:
      'Sim. O AuditLevel analisa o HTML semântico gerado pelo componente, independente do framework. Seja React, Vue, Angular, Svelte ou HTML puro, a análise de acessibilidade é feita na saída renderizada, não no código-fonte. Isso garante compatibilidade total com qualquer stack.'
  },
  {
    category: 'Produto',
    question: 'Com quais agentes de IA funciona?',
    answer:
      'O AuditLevel implementa o protocolo MCP (Model Context Protocol) da Anthropic, que é adotado nativamente pelo Claude, Cursor IDE, Windsurf, Continue.dev e VS Code com extensões MCP. O suporte ao GitHub Copilot está em roadmap via bridge MCP. Em essência: se o seu agente de IA suporta MCP, ele suporta o AuditLevel.'
  },

  {
    category: 'Legal',
    question: 'A acessibilidade digital é realmente obrigatória no Brasil?',
    answer:
      'Sim, é mais do que muitos pensam. A Lei Brasileira de Inclusão (LBI — Lei 13.146/2015) exige que serviços digitais oferecidos ao público sejam acessíveis. O Decreto 5.296/2004 e o eMAG tornam isso obrigatório para órgãos públicos. O PROCON já multou empresas por sites inacessíveis e a ANPD está consolidando entendimentos sobre não-discriminação digital. O risco legal é real e crescente.'
  },
  {
    category: 'Legal',
    question: 'O AuditLevel garante 100% de conformidade WCAG?',
    answer:
      'Nenhuma ferramenta automatizada pode garantir 100%, pois parte dos critérios WCAG envolve julgamento humano (ex: qualidade de descrição de imagens). O AuditLevel cobre automaticamente ~87% dos critérios WCAG 2.2, incluindo todos os de nível A e AA — os mais críticos e os mais cobrados juridicamente. Para os demais, geramos um checklist de revisão manual.'
  },
  {
    category: 'Técnico',
    question:
      'Quanto tempo leva para integrar o AuditLevel ao meu fluxo de trabalho?',
    answer:
      'Menos de 5 minutos. Você instala o servidor MCP com um comando npm, adiciona duas linhas ao arquivo mcp_config.json do seu agente de IA e reinicia. A partir daí, toda vez que você pedir ao agente para criar ou revisar um componente, o AuditLevel entra em ação automaticamente. Sem configuração adicional, sem onboarding complexo.'
  },
  {
    category: 'Técnico',
    question:
      'Os meus dados de código são enviados para algum servidor externo?',
    answer:
      'Não. O servidor MCP do AuditLevel roda localmente na máquina do desenvolvedor (localhost). O código analisado nunca sai do seu ambiente. A única comunicação com nossos servidores é para validação de licença (planos pagos) e telemetria anônima de uso, que pode ser desativada. Privacidade e segurança de código são prioridade.'
  }
]

const categories = ['Todos', ...Array.from(new Set(faqs.map(f => f.category)))]

const categoryColors: Record<string, string> = {
  Produto: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
  Legal: 'text-red-400 bg-red-500/10 border-red-500/20',
  Técnico: 'text-amber-400 bg-amber-500/10 border-amber-500/20'
}

export function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [activeCategory, setActiveCategory] = useState('Todos')
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const theme = useTheme()
  const d = theme === 'dark'

  const filtered =
    activeCategory === 'Todos'
      ? faqs
      : faqs.filter(f => f.category === activeCategory)

  const toggle = (i: number) => setActiveIndex(prev => (prev === i ? null : i))

  return (
    <section
      ref={ref}
      className={`py-24 px-6 max-w-[900px] mx-auto border-t ${d ? 'border-white/5' : 'border-black/5'}`}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="text-center mb-14"
      >
        <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-mono mb-5 ${
          d ? 'border-white/10 bg-white/5 text-zinc-400' : 'border-black/10 bg-black/5 text-zinc-500'
        }`}>
          <Question weight="fill" size={12} />
          Perguntas frequentes
        </span>
        <h2 className={`text-3xl md:text-5xl font-bold tracking-tight mb-4 ${d ? 'text-white' : 'text-zinc-900'}`}>
          Tudo que você <span className="text-emerald-500">precisa saber</span>
        </h2>
        <p className={`text-lg max-w-xl mx-auto ${d ? 'text-zinc-400' : 'text-zinc-600'}`}>
          Respostas diretas sobre produto, aspectos legais e técnica.
        </p>
      </motion.div>

      {/* Category filter */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-wrap justify-center gap-2 mb-10"
      >
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => {
              setActiveCategory(cat)
              setActiveIndex(null)
            }}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 ${
              activeCategory === cat
                ? 'bg-emerald-500 border-emerald-500 text-zinc-950'
                : d
                  ? 'bg-white/5 border-white/10 text-zinc-400 hover:border-white/20 hover:text-white'
                  : 'bg-black/5 border-black/10 text-zinc-600 hover:border-black/20 hover:text-zinc-900'
            }`}
          >
            {cat}
          </button>
        ))}
      </motion.div>

      {/* Accordion */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="flex flex-col gap-3"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((faq, i) => {
            const isOpen = activeIndex === i
            const colorClass =
              categoryColors[faq.category] ||
              (d ? 'text-zinc-400 bg-white/5 border-white/10' : 'text-zinc-500 bg-black/5 border-black/10')
            return (
              <motion.div
                key={faq.question}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25 }}
                className={`rounded-2xl border overflow-hidden transition-colors duration-200 ${
                  isOpen
                    ? d
                      ? 'border-white/20 bg-zinc-900'
                      : 'border-zinc-300 bg-white'
                    : d
                      ? 'border-white/10 bg-zinc-900/80 hover:bg-zinc-900'
                      : 'border-zinc-200 bg-white/90 hover:bg-white'
                }`}
              >
                {/* Question row */}
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <span
                      className={`shrink-0 text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full border ${colorClass}`}
                    >
                      {faq.category}
                    </span>
                    <span className={`text-sm md:text-base font-medium leading-snug ${d ? 'text-white' : 'text-zinc-900'}`}>
                      {faq.question}
                    </span>
                  </div>
                  <motion.div
                    animate={{ rotate: isOpen ? 0 : 0 }}
                    className={`shrink-0 w-7 h-7 rounded-full border flex items-center justify-center ${
                      d ? 'border-white/10 bg-white/5' : 'border-black/10 bg-black/5'
                    }`}
                  >
                    {isOpen ? (
                      <Minus
                        weight="bold"
                        size={13}
                        className="text-emerald-400"
                      />
                    ) : (
                      <Plus weight="bold" size={13} className={d ? 'text-zinc-400' : 'text-zinc-500'} />
                    )}
                  </motion.div>
                </button>

                {/* Answer */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-1">
                        <div className="border-l-2 border-emerald-500/40 pl-4">
                          <p className={`text-sm leading-relaxed ${d ? 'text-zinc-400' : 'text-zinc-600'}`}>
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </motion.div>

      {/* Bottom note */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.5 }}
        className={`text-center text-xs mt-10 ${d ? 'text-zinc-600' : 'text-zinc-400'}`}
      >
        Ainda tem dúvidas?{' '}
        <span className="text-emerald-500 cursor-pointer hover:underline">
          Fale com o time
        </span>{' '}
        — respondemos em menos de 24h.
      </motion.p>
    </section>
  )
}

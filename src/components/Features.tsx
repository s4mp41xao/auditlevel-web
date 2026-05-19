import { motion } from 'framer-motion'
import { ShieldCheck, Lightning, Terminal } from '@phosphor-icons/react'
import { useTheme } from '../ThemeContext'

const features = [
  {
    icon: Terminal,
    title: 'Integração Nativa',
    description: 'Funciona diretamente na sua IDE através do protocolo MCP, analisando o código no momento em que você escreve.'
  },
  {
    icon: Lightning,
    title: 'Redução de Refação',
    description: 'Evita a dor de cabeça de refatorar componentes visuais na véspera do deploy para passar no Lighthouse.'
  },
  {
    icon: ShieldCheck,
    title: 'Prevenção de Riscos',
    description: 'Garante conformidade com regras WCAG e protege sua empresa contra processos legais de acessibilidade.'
  }
]

export function Features() {
  const theme = useTheme()
  const d = theme === 'dark'

  return (
    <section className={`py-24 px-6 max-w-[1400px] mx-auto border-t ${d ? 'border-white/5' : 'border-black/5'}`}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, i) => {
          const Icon = feature.icon
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ delay: i * 0.1, type: 'spring', stiffness: 50 }}
              className={`group flex flex-col gap-4 p-8 rounded-2xl border transition-colors ${
                d
                  ? 'bg-zinc-900 border-white/5 hover:border-white/10'
                  : 'bg-white border-zinc-200 hover:border-zinc-300 shadow-sm'
              }`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ${
                d ? 'bg-white/5' : 'bg-emerald-500/10'
              }`}>
                <Icon weight="duotone" className="text-3xl text-emerald-500" />
              </div>
              <h3 className={`text-xl font-bold ${d ? 'text-white' : 'text-zinc-900'}`}>{feature.title}</h3>
              <p className={`leading-relaxed ${d ? 'text-zinc-400' : 'text-zinc-600'}`}>{feature.description}</p>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}

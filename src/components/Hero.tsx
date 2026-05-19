import { motion } from 'framer-motion'
import { ArrowRight, Code } from '@phosphor-icons/react'
import { McpSimulation } from './McpSimulation'
import { useTheme } from '../ThemeContext'

export function Hero() {
  const theme = useTheme()
  const d = theme === 'dark'

  return (
    <section className="pt-32 pb-20 px-6 max-w-[1400px] mx-auto min-h-[100dvh] flex flex-col md:grid md:grid-cols-2 gap-12 items-center">
      <motion.div 
        className="flex flex-col gap-6 w-full"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
          }
        }}
      >
        <motion.div 
          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border w-fit ${d ? 'border-white/10 bg-white/5' : 'border-black/10 bg-black/5'}`}
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className={`text-xs font-medium ${d ? 'text-zinc-300' : 'text-zinc-600'}`}>Padrão WCAG 2.1 AA</span>
        </motion.div>

        <motion.h1 
          className={`text-5xl md:text-7xl font-bold tracking-tighter leading-tight ${d ? 'text-white' : 'text-zinc-900'}`}
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
        >
          Acessibilidade <br/>
          <span className="text-emerald-500">Feita na Raiz.</span>
        </motion.h1>

        <motion.p 
          className={`text-lg max-w-[50ch] leading-relaxed ${d ? 'text-zinc-400' : 'text-zinc-600'}`}
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
        >
          O AuditLevel é um plugin inteligente via protocolo MCP que acompanha você enquanto escreve o código, apontando e corrigindo falhas de inclusão em tempo real.
        </motion.p>

        <motion.div 
          className="flex items-center gap-4 pt-4"
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
        >
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-emerald-500 text-zinc-950 font-bold transition-transform"
          >
            Começar Agora <ArrowRight weight="bold" />
          </motion.button>
          
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg border font-medium transition-colors ${d ? 'bg-white/5 border-white/10 text-white hover:bg-white/10' : 'bg-black/5 border-black/10 text-zinc-800 hover:bg-black/10'}`}
          >
            <Code weight="bold" /> Ver Documentação
          </motion.button>
        </motion.div>
      </motion.div>

      <motion.div 
        className="w-full h-full min-h-[400px] flex items-center justify-center relative perspective-[1000px]"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: 'spring', stiffness: 50, damping: 20, delay: 0.2 }}
      >
        <McpSimulation />
      </motion.div>
    </section>
  )
}

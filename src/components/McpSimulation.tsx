import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { WarningCircle, CheckCircle, Robot, CursorClick } from '@phosphor-icons/react'

const scenarios = [
  {
    filename: 'Hero.tsx',
    linesBefore: [
      { type: 'keyword', text: 'export function' },
      { type: 'function', text: ' HeroImage() {' },
      { type: 'indent1', text: 'return (' },
    ],
    buggyLineParts: [
      { type: 'tag', text: '<img ' },
      { type: 'attr', text: 'src=' },
      { type: 'val', text: '"/banner.png"' },
      { type: 'close', text: ' />' }
    ],
    suggestion: '+ alt="Hero banner"',
    fixedAttr: 'alt',
    fixedVal: '"Hero banner"',
    linesAfter: [
      { type: 'indent1', text: ')' },
      { type: 'plain', text: '}' },
    ],
    errorCode: 'WCAG 1.1.1',
    errorMsg: 'Elemento <img> não possui o atributo alt acessível.',
  },
  {
    filename: 'Modal.tsx',
    linesBefore: [
      { type: 'keyword', text: 'export function' },
      { type: 'function', text: ' CloseButton() {' },
      { type: 'indent1', text: 'return (' },
    ],
    buggyLineParts: [
      { type: 'tag', text: '<button ' },
      { type: 'attr', text: 'className=' },
      { type: 'val', text: '"p-2"' },
      { type: 'close', text: '>' }
    ],
    suggestion: '+ aria-label="Fechar modal"',
    fixedAttr: 'aria-label',
    fixedVal: '"Fechar modal"',
    linesAfter: [
      { type: 'indent2', text: '<XIcon />' },
      { type: 'indent1', text: '</button>' },
      { type: 'plain', text: ')' },
      { type: 'plain', text: '}' },
    ],
    errorCode: 'WCAG 4.1.2',
    errorMsg: 'Botão com ícone (sem texto) precisa de um rótulo acessível.',
  },
  {
    filename: 'Newsletter.tsx',
    linesBefore: [
      { type: 'keyword', text: 'export function' },
      { type: 'function', text: ' EmailInput() {' },
      { type: 'indent1', text: 'return (' },
    ],
    buggyLineParts: [
      { type: 'tag', text: '<input ' },
      { type: 'attr', text: 'type=' },
      { type: 'val', text: '"email"' },
      { type: 'close', text: ' />' }
    ],
    suggestion: '+ aria-label="Endereço de email"',
    fixedAttr: 'aria-label',
    fixedVal: '"Endereço de email"',
    linesAfter: [
      { type: 'indent1', text: ')' },
      { type: 'plain', text: '}' },
    ],
    errorCode: 'WCAG 3.3.2',
    errorMsg: 'Campo de formulário sem label visual precisa de aria-label.',
  }
];

export function McpSimulation() {
  const [currentScenario, setCurrentScenario] = useState(0)
  const [step, setStep] = useState(0)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    let isMounted = true;
    const runSequence = async () => {
      while (isMounted) {
        setStep(0);
        await new Promise(r => setTimeout(r, 800));
        
        if (!isMounted) break;
        setStep(1); // Error highlight
        await new Promise(r => setTimeout(r, 1200));
        
        if (!isMounted) break;
        setStep(2); // Popup
        await new Promise(r => setTimeout(r, 1200));
        
        if (!isMounted) break;
        setStep(3); // Mouse move
        await new Promise(r => setTimeout(r, 800));
        
        if (!isMounted) break;
        setIsHovering(true); // Hover button
        await new Promise(r => setTimeout(r, 300));
        
        if (!isMounted) break;
        setIsHovering(false); // Clicked
        setStep(4); // Fixed
        await new Promise(r => setTimeout(r, 2000));
        
        if (!isMounted) break;
        setStep(5); // Outro
        await new Promise(r => setTimeout(r, 800));
        
        if (!isMounted) break;
        setCurrentScenario(prev => (prev + 1) % scenarios.length);
      }
    };
    runSequence();
    return () => { isMounted = false };
  }, [currentScenario]);

  const scenario = scenarios[currentScenario];

  return (
    <div className="w-full max-w-[28rem] rounded-xl border border-white/10 bg-[#0d1117] shadow-2xl shadow-emerald-500/5 relative">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/5 rounded-t-xl">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
        </div>
        <AnimatePresence mode="wait">
          <motion.span 
            key={scenario.filename}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="ml-2 text-xs font-mono text-zinc-500"
          >
            {scenario.filename} — AuditLevel
          </motion.span>
        </AnimatePresence>
      </div>

      <div className="p-6 font-mono text-sm leading-loose relative min-h-[340px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScenario}
            initial={{ opacity: 0, filter: 'blur(4px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, filter: 'blur(4px)' }}
            transition={{ duration: 0.3 }}
          >
            {scenario.linesBefore.map((line, i) => (
              <div key={i} className={line.type === 'indent1' ? 'pl-4' : line.type === 'indent2' ? 'pl-8' : ''}>
                {line.type === 'keyword' && <span className="text-pink-400">{line.text}</span>}
                {line.type === 'function' && <><span className="text-blue-400">{line.text.split('(')[0]}</span><span className="text-zinc-400">(){'{'}</span></>}
                {(line.type === 'indent1' || line.type === 'indent2' || line.type === 'plain') && <span className="text-zinc-400">{line.text}</span>}
              </div>
            ))}
            
            <div className="pl-8 relative">
              <span className="text-zinc-400">{scenario.buggyLineParts[0].text[0]}</span>
              <span className="text-emerald-400">{scenario.buggyLineParts[0].text.slice(1)}</span>
              <span className="text-blue-300">{scenario.buggyLineParts[1].text}</span>
              <span className="text-orange-300">{scenario.buggyLineParts[2].text}</span>
              
              <AnimatePresence mode="popLayout">
                {step >= 4 && step < 5 && (
                  <motion.span 
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    className="inline-block overflow-hidden whitespace-nowrap align-bottom"
                  >
                    <span className="text-blue-300 ml-2">{scenario.fixedAttr}=</span>
                    <span className="text-orange-300">{scenario.fixedVal}</span>
                  </motion.span>
                )}
              </AnimatePresence>
              
              <span className="text-zinc-400">{scenario.buggyLineParts[3].text}</span>

              <AnimatePresence>
                {step >= 1 && step < 4 && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500/50"
                    style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(239,68,68,0.8) 2px, rgba(239,68,68,0.8) 4px)' }}
                  />
                )}
              </AnimatePresence>
            </div>

            {scenario.linesAfter.map((line, i) => (
              <div key={i} className={line.type === 'indent1' ? 'pl-4' : line.type === 'indent2' ? 'pl-8' : ''}>
                <span className="text-zinc-400">{line.text}</span>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        <AnimatePresence>
          {step >= 2 && step < 4 && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, filter: 'blur(4px)' }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              className="absolute right-[-1rem] top-24 w-[300px] rounded-xl backdrop-blur-xl bg-zinc-900/90 border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_8px_32px_rgba(0,0,0,0.4)] overflow-hidden z-10"
            >
              <div className="p-3 border-b border-white/5 flex items-center gap-2 bg-white/5">
                <Robot weight="fill" className="text-emerald-500 text-lg" />
                <span className="text-xs font-semibold text-white">AuditLevel MCP</span>
              </div>
              <div className="p-4 space-y-4">
                <div className="flex items-start gap-2 text-red-400">
                  <WarningCircle weight="fill" className="mt-0.5 shrink-0" />
                  <p className="text-[11px] leading-relaxed font-sans">
                    <strong>{scenario.errorCode}:</strong> {scenario.errorMsg}
                  </p>
                </div>
                <div className="pt-3 border-t border-white/5">
                  <p className="text-[10px] text-zinc-400 uppercase tracking-wider mb-2 font-sans">Sugestão</p>
                  <div className="text-xs font-mono text-emerald-400 bg-emerald-500/10 p-2 rounded border border-emerald-500/20 mb-3">
                    {scenario.suggestion}
                  </div>
                  <motion.button 
                    animate={isHovering ? { scale: 0.98, backgroundColor: '#34d399' } : { scale: 1, backgroundColor: '#10b981' }}
                    className="w-full flex items-center justify-center gap-2 py-2 rounded-lg font-sans text-xs font-bold text-zinc-950 shadow-md shadow-emerald-500/20"
                  >
                    Aceitar Correção
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}

          {step >= 4 && step < 5 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute right-4 bottom-4 flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-full border border-emerald-500/20 shadow-lg shadow-emerald-500/10 backdrop-blur-md"
            >
              <CheckCircle weight="fill" className="text-lg" />
              <span className="text-sm font-medium font-sans">Corrigido e salvo!</span>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {step >= 2 && step < 4 && (
            <motion.div
              initial={{ opacity: 0, x: -50, y: 350 }}
              animate={step >= 3 ? { opacity: 1, x: 230, y: 245 } : { opacity: 1, x: 0, y: 300 }}
              exit={{ opacity: 0 }}
              transition={{ type: 'spring', stiffness: 50, damping: 20 }}
              className="absolute z-50 pointer-events-none left-0 top-0"
            >
              <CursorClick 
                weight="fill" 
                className={"text-3xl drop-shadow-lg transition-all duration-200 " + (isHovering ? 'text-zinc-300 scale-90' : 'text-white')}
                style={{ transform: 'rotate(-15deg)' }}
              />
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  )
}

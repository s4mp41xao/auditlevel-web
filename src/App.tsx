import { useState, useEffect } from 'react'
import { Hero } from './components/Hero'
import { HowItWorks } from './components/HowItWorks'
import { Features } from './components/Features'
import { ChatSimulation } from './components/ChatSimulation'
import { RoiPanel } from './components/RoiPanel'
import { FAQ } from './components/FAQ'
import { AnimatedBackground } from './components/AnimatedBackground'
import { Navbar } from './components/Navbar'
import { ThemeContext } from './ThemeContext'

function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }

  const d = theme === 'dark'

  return (
    <ThemeContext.Provider value={theme}>
      <div className={`min-h-screen ${d ? 'bg-zinc-950 text-zinc-100' : 'bg-zinc-50 text-zinc-900'} font-['Geist_Sans',sans-serif] selection:bg-emerald-500/30 overflow-x-hidden transition-colors duration-300 relative`}>
        <AnimatedBackground theme={theme} />
        <Navbar onToggleTheme={toggleTheme} />
        <main className="relative z-10">
          <Hero />
          <div id="como-funciona"><HowItWorks /></div>
          <ChatSimulation />
          <div id="recursos"><Features /></div>
          <div id="impacto"><RoiPanel /></div>
          <div id="faq"><FAQ /></div>
        </main>
      </div>
    </ThemeContext.Provider>
  )
}

export default App

import { createContext, useContext } from 'react'

type Theme = 'dark' | 'light'

export const ThemeContext = createContext<Theme>('dark')

export function useTheme() {
  return useContext(ThemeContext)
}

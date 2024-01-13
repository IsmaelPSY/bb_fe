// app/providers.tsx
'use client'

import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { Playpen_Sans } from 'next/font/google'

const playpenSans = Playpen_Sans({weight: '400', subsets: ['latin']})
const theme = extendTheme({
  fonts: {
    appFont: playpenSans.style.fontFamily
  },
})  


export function Providers({ children }: { children: React.ReactNode }) {
  return <ChakraProvider resetCSS={true} theme={theme}>{children}</ChakraProvider>
}
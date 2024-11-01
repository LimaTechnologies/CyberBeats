
import type { Metadata } from 'next'
import { Inter, Orbitron } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const orbitron = Orbitron({ subsets: ['latin'], variable: '--font-orbitron' })

export const metadata: Metadata = {
  title: 'CyberBeats - The Future of Music',
  description: 'Experience AI-powered music creation and cybernetic audio enhancements with CyberBeats.',
  keywords: ['music', 'AI', 'cyberpunk', 'audio', 'future'],
  authors: [{ name: 'LimaTechnologies' }]
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${orbitron.variable}`}>
      <body className="bg-black text-white">
        {children}
      </body>
    </html>
  )
}
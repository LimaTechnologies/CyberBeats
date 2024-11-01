'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import ParticleEffect from '@/components/ParticleEffect/ParticleEffect'

export default function Hero() {
    const heroRef = useRef<HTMLDivElement>(null)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        setIsVisible(true)
        const handleMouseMove = (e: MouseEvent) => {
            if (heroRef.current) {
                const { left, top, width, height } = heroRef.current.getBoundingClientRect()
                const x = (e.clientX - left) / width
                const y = (e.clientY - top) / height
                heroRef.current.style.setProperty('--mouse-x', `${x}`)
                heroRef.current.style.setProperty('--mouse-y', `${y}`)
            }
        }

        document.addEventListener('mousemove', handleMouseMove)
        return () => document.removeEventListener('mousemove', handleMouseMove)
    }, [])

    return (
        <section
            ref={heroRef}
            className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black to-purple-900 relative overflow-hidden"
        >
            <ParticleEffect />
            <div className="absolute inset-0 bg-black bg-opacity-60"></div>
            <div className={`container mx-auto px-4 text-center relative z-10 transition-all duration-1000 ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'}`}>
                <h1 className="text-5xl md:text-7xl font-bold mb-6 glitch-effect" data-text="CyberBeats">
                    CyberBeats
                </h1>
                <p className="text-xl md:text-2xl mb-8 neon-text">
                    Unleash Your Inner Cyberpunk with AI-Powered Music
                </p>
                <Link
                    href="#get-started"
                    className="cyber-button inline-block"
                >
                    Jack In Now
                </Link>
            </div>
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'radial-gradient(circle at calc(var(--mouse-x) * 100%) calc(var(--mouse-y) * 100%), rgba(0, 255, 255, 0.15), transparent 40%)',
                }}
            ></div>
        </section>
    )
}
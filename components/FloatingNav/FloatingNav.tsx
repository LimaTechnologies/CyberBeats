'use client'

import { useState, useEffect } from 'react'
import { Home, Zap, Users, Send } from 'lucide-react'
import Link from 'next/link'

export default function FloatingNav() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true)
            } else {
                setIsVisible(false)
            }
        }

        window.addEventListener('scroll', toggleVisibility)

        return () => window.removeEventListener('scroll', toggleVisibility)
    }, [])

    return (
        <div
            className={`fixed right-4 bottom-[50%] z-50 transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
        >
            <div className="bg-black bg-opacity-70 backdrop-filter backdrop-blur-lg p-2 rounded-lg border-2 border-primary">
                <nav className="flex flex-col items-center space-y-2">
                    {[
                        { href: '#', icon: Home, label: 'Home' },
                        { href: '#features', icon: Zap, label: 'Features' },
                        { href: '#testimonials', icon: Users, label: 'Testimonials' },
                        { href: '#get-started', icon: Send, label: 'Get Started' },
                    ].map(({ href, icon: Icon, label }, index) => (
                        <Link
                            key={index}
                            href={href}
                            className="group flex items-center space-x-2 p-2 w-full hover:bg-primary transition-colors rounded"
                        >
                            <Icon size={20} className="text-primary group-hover:text-black" />
                            <span className="text-primary group-hover:text-black text-sm font-bold">{label}</span>
                        </Link>
                    ))}
                </nav>
            </div>
        </div>
    )
}
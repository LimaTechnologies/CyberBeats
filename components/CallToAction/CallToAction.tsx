'use client'

import { useState } from 'react'
import { Loader2 } from 'lucide-react'

export default function CallToAction() {
    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500))
        setIsLoading(false)
        setMessage('Welcome to the future of music! Check your inbox for the next steps.')
        setEmail('')
    }

    return (
        <section id="get-started" className="py-20 bg-gradient-to-r from-purple-900 to-black relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
            <div className="container mx-auto px-4 text-center relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 glitch-effect" data-text="Join the Revolution">
                    Join the Revolution
                </h2>
                <p className="text-xl mb-8 neon-text">
                    Be the first to experience the future of music. Sign up for early access now!
                </p>
                <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="flex-grow px-4 py-2 rounded-full bg-black bg-opacity-50 text-white border border-primary focus:outline-none focus:ring-2 focus:ring-secondary transition-all duration-300"
                            required
                        />
                        <button
                            type="submit"
                            className="cyber-button"
                            disabled={isLoading}
                        >
                            {isLoading ? <Loader2 className="animate-spin mx-auto" /> : 'Get Early Access'}
                        </button>
                    </div>
                </form>
                {message && (
                    <p className="mt-4 text-green-400 animate-pulse">
                        {message}
                    </p>
                )}
            </div>
        </section>
    )
}
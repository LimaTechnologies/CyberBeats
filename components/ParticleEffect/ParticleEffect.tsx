'use client'

import { useEffect, useRef, useState } from 'react'

interface Particle {
    x: number
    y: number
    radius: number
    color: string
    speedX: number
    speedY: number
}

export default function ParticleEffect() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) {
            setError("Canvas element not found")
            return
        }

        const ctx = canvas.getContext('2d')
        if (!ctx) {
            setError("Unable to get 2D context from canvas")
            return
        }

        let animationFrameId: number

        const resizeCanvas = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }

        resizeCanvas()

        const particles: Particle[] = []
        const particleCount = 100

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 2 + 1,
                color: `hsl(${Math.random() * 360}, 100%, 50%)`,
                speedX: Math.random() * 3 - 1.5,
                speedY: Math.random() * 3 - 1.5
            })
        }

        const animate = () => {
            animationFrameId = requestAnimationFrame(animate)
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            particles.forEach((particle) => {
                particle.x += particle.speedX
                particle.y += particle.speedY

                if (particle.x < 0 || particle.x > canvas.width) {
                    particle.speedX *= -1
                }

                if (particle.y < 0 || particle.y > canvas.height) {
                    particle.speedY *= -1
                }

                ctx.beginPath()
                ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
                ctx.fillStyle = particle.color
                ctx.fill()
            })
        }

        animate()

        window.addEventListener('resize', resizeCanvas)

        return () => {
            window.removeEventListener('resize', resizeCanvas)
            cancelAnimationFrame(animationFrameId)
        }
    }, [])

    if (error) {
        return <div className="absolute inset-0 flex items-center justify-center text-red-500">{error}</div>
    }

    return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
}
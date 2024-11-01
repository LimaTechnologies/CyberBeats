'use client'

import React, { useEffect, useRef } from 'react'

interface FallingObject {
    x: number
    y: number
    speed: number
    size: number
    type: 'triangle' | 'square' | 'circle'
    color: string
}

export default function FallingObjects() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        canvas.width = window.innerWidth
        canvas.height = window.innerHeight

        const objects: FallingObject[] = []
        const colors = ['#00ffff', '#ff00ff', '#ffff00']

        const createObject = (): FallingObject => ({
            x: Math.random() * canvas.width,
            y: -20,
            speed: Math.random() * 2 + 1,
            size: Math.random() * 10 + 5,
            type: ['triangle', 'square', 'circle'][Math.floor(Math.random() * 3)] as 'triangle' | 'square' | 'circle',
            color: colors[Math.floor(Math.random() * colors.length)]
        })

        const drawObject = (obj: FallingObject) => {
            ctx.fillStyle = obj.color
            ctx.strokeStyle = obj.color
            ctx.lineWidth = 2

            switch (obj.type) {
                case 'triangle':
                    ctx.beginPath()
                    ctx.moveTo(obj.x, obj.y)
                    ctx.lineTo(obj.x - obj.size / 2, obj.y + obj.size)
                    ctx.lineTo(obj.x + obj.size / 2, obj.y + obj.size)
                    ctx.closePath()
                    ctx.stroke()
                    break
                case 'square':
                    ctx.strokeRect(obj.x - obj.size / 2, obj.y, obj.size, obj.size)
                    break
                case 'circle':
                    ctx.beginPath()
                    ctx.arc(obj.x, obj.y + obj.size / 2, obj.size / 2, 0, Math.PI * 2)
                    ctx.stroke()
                    break
            }
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            if (Math.random() < 0.1) {
                objects.push(createObject())
            }

            objects.forEach((obj, index) => {
                obj.y += obj.speed
                drawObject(obj)

                if (obj.y > canvas.height) {
                    objects.splice(index, 1)
                }
            })

            requestAnimationFrame(animate)
        }

        animate()

        const handleResize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full pointer-events-none z-10"
            aria-hidden="true"
        />
    )
}
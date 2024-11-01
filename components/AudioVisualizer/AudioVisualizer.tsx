'use client'

import React, { useRef, useEffect, useState } from 'react'

export default function AudioVisualizer() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [isListening, setIsListening] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const audioContextRef = useRef<AudioContext | null>(null)
    const analyserRef = useRef<AnalyserNode | null>(null)
    const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null)
    const animationRef = useRef<number | null>(null)

    const initializeAudio = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
            audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
            analyserRef.current = audioContextRef.current.createAnalyser()
            sourceRef.current = audioContextRef.current.createMediaStreamSource(stream)
            sourceRef.current.connect(analyserRef.current)
            analyserRef.current.fftSize = 256
            setIsListening(true)
            setError(null)
            draw()
        } catch (err) {
            console.error('Error accessing microphone:', err)
            setError('Unable to access microphone. Please ensure you have granted the necessary permissions.')
        }
    }

    const draw = () => {
        if (!canvasRef.current || !analyserRef.current) return

        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const width = canvas.width
        const height = canvas.height
        const bufferLength = analyserRef.current.frequencyBinCount
        const dataArray = new Uint8Array(bufferLength)

        const drawVisual = () => {
            animationRef.current = requestAnimationFrame(drawVisual)

            analyserRef.current!.getByteFrequencyData(dataArray)

            ctx.fillStyle = 'rgb(0, 0, 0)'
            ctx.fillRect(0, 0, width, height)

            const barWidth = (width / bufferLength) * 2.5
            let x = 0

            for (let i = 0; i < bufferLength; i++) {
                const barHeight = (dataArray[i] / 255) * height

                const gradient = ctx.createLinearGradient(0, height, 0, height - barHeight)
                gradient.addColorStop(0, '#00ffff')
                gradient.addColorStop(1, '#ff00ff')

                ctx.fillStyle = gradient
                ctx.fillRect(x, height - barHeight, barWidth, barHeight)

                x += barWidth + 1
            }
        }

        drawVisual()
    }

    const handleStartVisualization = () => {
        if (!isListening) {
            initializeAudio()
        }
    }

    useEffect(() => {
        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current)
            }
            if (audioContextRef.current) {
                audioContextRef.current.close()
            }
        }
    }, [])

    return (
        <div className="w-full max-w-2xl mx-auto">
            <canvas
                ref={canvasRef}
                width={800}
                height={200}
                className="w-full h-48 bg-black rounded-lg"
            />
            {error && <p className="text-red-500 mt-2">{error}</p>}
            {!isListening && (
                <button
                    onClick={handleStartVisualization}
                    className="cyber-button mt-4"
                    aria-label="Start audio visualization"
                >
                    Start Visualization
                </button>
            )}
            {isListening && (
                <p className="text-primary mt-2">
                    Visualizing audio... Speak or play music to see the effect!
                </p>
            )}
        </div>
    )
}
'use client'

import { useState, useEffect } from 'react'
import { Cpu, Headphones, Zap, Music } from 'lucide-react'
import AudioVisualizer from '@/components/AudioVisualizer/AudioVisualizer'

const features = [
    {
        icon: Cpu,
        title: 'AI-Powered Mixing',
        description: 'Our quantum AI algorithms create mind-bending beats tailored to your brainwaves.',
    },
    {
        icon: Headphones,
        title: 'Neural Sync',
        description: 'Experience music that adapts in real-time to your neural patterns and emotions.',
    },
    {
        icon: Zap,
        title: 'Cybernetic Enhancements',
        description: 'Unlock hidden tracks and frequencies with our cutting-edge audio implants.',
    },
    {
        icon: Music,
        title: 'Holographic Concerts',
        description: 'Attend live shows in our immersive virtual reality nightclubs.',
    },
]

export default function Features() {
    const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)
    const [visibleFeatures, setVisibleFeatures] = useState<number[]>([])

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setVisibleFeatures((prev) => [...prev, Number(entry.target.id)])
                    }
                })
            },
            { threshold: 0.1 }
        )

        document.querySelectorAll('.feature-item').forEach((el) => observer.observe(el))

        return () => observer.disconnect()
    }, [])

    return (
        <section id="features" className="py-20 bg-black">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center neon-text">
                    Upgrade Your Audio Experience
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            id={index.toString()}
                            className={`feature-item bg-gray-900 p-6 rounded-lg transform transition-all duration-500 hover:scale-105 ${visibleFeatures.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                }`}
                            onMouseEnter={() => setHoveredFeature(index)}
                            onMouseLeave={() => setHoveredFeature(null)}
                        >
                            <feature.icon
                                className={`w-12 h-12 mb-4 ${hoveredFeature === index ? 'text-secondary' : 'text-primary'
                                    } transition-colors duration-300`}
                            />
                            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                            <p className="text-gray-400">{feature.description}</p>
                        </div>
                    ))}
                </div>
                <div className="mt-16">
                    <h3 className="text-2xl font-bold mb-4 text-center neon-text">Experience Our AI-Powered Audio</h3>
                    <div className="bg-gray-900 p-4 rounded-lg">
                        <AudioVisualizer />
                    </div>
                    <p className="text-center mt-4 text-gray-400">
                        Click "Start Visualization" and grant microphone access to see the visualizer in action. This demo uses your microphone input to showcase our real-time audio processing capabilities.
                    </p>
                </div>
            </div>
        </section>
    )
}
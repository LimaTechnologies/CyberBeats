'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { testimonials } from '@/mocks/testimonials'

export default function Testimonials() {
    const [currentTestimonial, setCurrentTestimonial] = useState(0)
    const [isAnimating, setIsAnimating] = useState(false)

    useEffect(() => {
        const interval = setInterval(() => {
            nextTestimonial()
        }, 5000)
        return () => clearInterval(interval)
    }, [currentTestimonial])

    const nextTestimonial = () => {
        if (!isAnimating) {
            setIsAnimating(true)
            setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
            setTimeout(() => setIsAnimating(false), 500)
        }
    }

    const prevTestimonial = () => {
        if (!isAnimating) {
            setIsAnimating(true)
            setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
            setTimeout(() => setIsAnimating(false), 500)
        }
    }

    return (
        <section id="testimonials" className="py-20 bg-gray-900">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center neon-text">
                    What Our Users Say
                </h2>
                <div className="relative h-64 overflow-hidden">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={testimonial.id}
                            className={`absolute top-0 left-0 w-full transition-all duration-500 ${index === currentTestimonial
                                ? 'opacity-100 translate-x-0'
                                : index < currentTestimonial
                                    ? 'opacity-0 -translate-x-full'
                                    : 'opacity-0 translate-x-full'
                                }`}
                        >
                            <div className="bg-black bg-opacity-50 p-6 rounded-lg max-w-2xl mx-auto text-center">
                                <div className="mb-4">
                                    <Image
                                        src={testimonial.avatar}
                                        alt={testimonial.name}
                                        width={64}
                                        height={64}
                                        className="rounded-full mx-auto"
                                    />
                                </div>
                                <p className="text-lg mb-4  italic">"{testimonial.quote}"</p>
                                <p className="font-bold">{testimonial.name}</p>
                                <div className="flex justify-center mt-2">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-600'
                                                }`}
                                            fill={i < testimonial.rating ? 'currentColor' : 'none'}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center mt-8 space-x-4">
                    <button
                        onClick={prevTestimonial}
                        className="cyber-button cyber-button-secondary"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button
                        onClick={nextTestimonial}
                        className="cyber-button cyber-button-secondary"
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>
            </div>
        </section>
    )
}
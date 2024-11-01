import React from 'react';
import Link from 'next/link'
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react'

export default function Footer() {
    return (
        <footer className="bg-black py-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-between items-center">
                    <div className="w-full md:w-auto mb-4 md:mb-0">
                        <Link href="/" className="text-2xl font-bold neon-text">
                            CyberBeats
                        </Link>
                    </div>
                    <nav className="w-full md:w-auto mb-4 md:mb-0">
                        <ul className="flex flex-wrap justify-center md:justify-end space-x-4">
                            <li>
                                <Link href="#features" className="text-gray-400 hover:text-primary transition-colors">
                                    Features
                                </Link>
                            </li>
                            <li>
                                <Link href="#testimonials" className="text-gray-400 hover:text-primary transition-colors">
                                    Testimonials
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-400 hover:text-primary transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-400 hover:text-primary transition-colors">
                                    Terms of Service
                                </Link>
                            </li>
                        </ul>
                    </nav>
                    <div className="w-full md:w-auto">
                        <div className="flex justify-center md:justify-end space-x-4">
                            <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                                <Facebook className="w-6 h-6" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                                <Twitter className="w-6 h-6" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                                <Instagram className="w-6 h-6" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                                <Youtube className="w-6 h-6" />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="mt-8 text-center text-gray-600 text-sm">
                    &copy; {new Date().getFullYear()} CyberBeats. All rights reserved. Powered by AI and human creativity.
                </div>
            </div>
        </footer>
    )
}
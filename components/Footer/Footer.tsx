import Link from 'next/link'
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react'

export default function Footer() {
    return (
        <footer className="bg-black py-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-circuit-pattern opacity-5"></div>
            <div className="container mx-auto px-4 relative z-10">
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
                            {[Facebook, Twitter, Instagram, Youtube].map((Icon, index) => (
                                <a
                                    key={index}
                                    href="#"
                                    className="text-gray-400 hover:text-primary transition-colors transform hover:scale-110"
                                >
                                    <Icon className="w-6 h-6" />
                                </a>
                            ))}
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
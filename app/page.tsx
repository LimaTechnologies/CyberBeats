import Header from '@/components/Header/Header'
import Hero from '@/components/Hero/Hero'
import Features from '@/components/Features/Features'
import Testimonials from '@/components/Testimonials/Testimonials'
import CallToAction from '@/components/CallToAction/CallToAction'
import Footer from '@/components/Footer/Footer'
import FloatingNav from '@/components/FloatingNav/FloatingNav'
import FallingObjects from '@/components/FallingObjects/FallingObjects'

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col relative">
            <FallingObjects />
            <Header />
            <main className="flex-grow">
                <Hero />
                <Features />
                <Testimonials />
                <CallToAction />
            </main>
            <Footer />
            <FloatingNav />
        </div>
    )
}
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';
import Blog from '@/components/Blog';
import Footer from '@/components/Footer';

export default function Home() {
    return (
        <main className="relative">
            <Navigation />
            <Hero />
            <About />
            <Projects />
            <Skills />
            <Blog />
            <Contact />
            <Footer />
        </main>
    );
}

'use client';

export default function Hero() {
    const scrollToProjects = () => {
        const element = document.getElementById('projects');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
            {/* Animated background grid */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-card opacity-50">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'linear-gradient(#00ff9d 1px, transparent 1px), linear-gradient(90deg, #00ff9d 1px, transparent 1px)',
                    backgroundSize: '50px 50px',
                    opacity: 0.03,
                }}></div>
            </div>

            <div className="relative z-10 text-center px-4 animate-fade-in">
                <h1 className="text-5xl md:text-7xl font-bold mb-4">
                    <span className="text-white">Biswajeet</span>{' '}
                    <span className="text-cyber-green">Rout</span>
                </h1>
                <h2 className="text-2xl md:text-3xl text-gray-light mb-6">
                    Cybersecurity Engineer & BTech CSE Student
                </h2>
                <p className="text-lg md:text-xl text-gray-light mb-8 max-w-2xl mx-auto font-mono">
                    "Securing the Digital Frontier, One Line of Code at a Time."
                </p>
                <button
                    onClick={scrollToProjects}
                    className="px-8 py-3 bg-cyber-green text-background font-semibold rounded-lg hover:bg-white hover:shadow-lg hover:shadow-cyber-green/50 transition-all duration-300 transform hover:scale-105"
                >
                    View My Work
                </button>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                <div className="w-6 h-10 border-2 border-cyber-green rounded-full flex justify-center">
                    <div className="w-1 h-3 bg-cyber-green rounded-full mt-2"></div>
                </div>
            </div>
        </section>
    );
}

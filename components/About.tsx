export default function About() {
    return (
        <section id="about" className="min-h-screen flex items-center justify-center py-20 px-4">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center">
                    About <span className="text-cyber-green">Me</span>
                </h2>

                <div className="bg-card p-8 rounded-lg border border-gray-dark hover:border-cyber-green transition-all duration-300">
                    <p className="text-lg text-gray-light mb-6 leading-relaxed">
                        I'm a passionate BTech Computer Science student diving deep into the world of cybersecurity.
                        My focus is on building a strong foundation in C++, network security principles, and understanding
                        system vulnerabilities.
                    </p>

                    <p className="text-lg text-gray-light mb-6 leading-relaxed">
                        I'm actively seeking internships and projects to apply my knowledge in real-world scenarios,
                        where I can contribute to securing digital infrastructure and learn from experienced professionals
                        in the field.
                    </p>

                    <div className="grid md:grid-cols-2 gap-6 mt-8">
                        <div className="bg-background p-6 rounded-lg border border-gray-dark">
                            <h3 className="text-xl font-semibold text-cyber-green mb-3 flex items-center">
                                <span className="mr-2">🎯</span> Current Focus
                            </h3>
                            <ul className="space-y-2 text-gray-light">
                                <li className="flex items-start">
                                    <span className="text-cyber-green mr-2">▹</span>
                                    <span>Advanced C++ Programming</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-cyber-green mr-2">▹</span>
                                    <span>Network Security Principles</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-cyber-green mr-2">▹</span>
                                    <span>System Vulnerability Analysis</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-background p-6 rounded-lg border border-gray-dark">
                            <h3 className="text-xl font-semibold text-cyber-green mb-3 flex items-center">
                                <span className="mr-2">🎓</span> Academic Status
                            </h3>
                            <ul className="space-y-2 text-gray-light">
                                <li className="flex items-start">
                                    <span className="text-cyber-green mr-2">▹</span>
                                    <span>BTech in Computer Science & Engineering</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-cyber-green mr-2">▹</span>
                                    <span>Specialization: Cybersecurity</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-cyber-green mr-2">▹</span>
                                    <span>Actively seeking internship opportunities</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

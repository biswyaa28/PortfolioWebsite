export default function Skills() {
    const skillCategories = [
        {
            category: "Programming Languages",
            skills: ["C++", "Python", "JavaScript", "Bash/Shell"],
        },
        {
            category: "Cybersecurity",
            skills: ["Network Security", "Penetration Testing", "Vulnerability Assessment", "Cryptography"],
        },
        {
            category: "Tools & Technologies",
            skills: ["Wireshark", "Metasploit", "Nmap", "Burp Suite", "Git"],
        },
        {
            category: "Frameworks & Libraries",
            skills: ["React", "Next.js", "Node.js", "TailwindCSS"],
        },
        {
            category: "Operating Systems",
            skills: ["Linux", "Windows", "Kali Linux"],
        },
        {
            category: "Concepts",
            skills: ["System Architecture", "Network Protocols", "Secure Coding", "Threat Modeling"],
        },
    ];

    return (
        <section id="skills" className="min-h-screen flex items-center justify-center py-20 px-4">
            <div className="max-w-6xl mx-auto w-full">
                <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
                    Technical <span className="text-cyber-green">Skills</span>
                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {skillCategories.map((category, index) => (
                        <div
                            key={index}
                            className="bg-card p-6 rounded-lg border border-gray-dark hover:border-cyber-green transition-all duration-300"
                        >
                            <h3 className="text-lg font-semibold mb-4 text-cyber-green flex items-center">
                                <span className="w-2 h-2 bg-cyber-green rounded-full mr-3"></span>
                                {category.category}
                            </h3>
                            <div className="space-y-2">
                                {category.skills.map((skill, skillIndex) => (
                                    <div
                                        key={skillIndex}
                                        className="flex items-center group"
                                    >
                                        <span className="text-cyber-green mr-2 group-hover:mr-3 transition-all">▹</span>
                                        <span className="text-gray-light group-hover:text-white transition-colors">
                                            {skill}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <p className="text-center text-gray-light mt-8 text-sm">
                    💡 <span className="text-cyber-green">Note:</span> Update your skills in{' '}
                    <code className="bg-card px-2 py-1 rounded text-xs font-mono">components/Skills.tsx</code>
                </p>
            </div>
        </section>
    );
}

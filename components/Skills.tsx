'use client';

import { motion } from 'framer-motion';

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
                <motion.h2
                    className="text-4xl md:text-5xl font-bold mb-12 text-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    Technical <span className="text-cyber-green">Skills</span>
                </motion.h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {skillCategories.map((category, index) => (
                        <motion.div
                            key={index}
                            className="bg-card p-6 rounded-lg border border-gray-dark hover:border-cyber-green transition-all duration-300 group"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            whileHover={{
                                y: -5,
                                boxShadow: "0 10px 30px rgba(0, 255, 157, 0.1)"
                            }}
                        >
                            <h3 className="text-lg font-semibold mb-4 text-cyber-green flex items-center">
                                <span className="w-2 h-2 bg-cyber-green rounded-full mr-3 group-hover:animate-pulse"></span>
                                {category.category}
                            </h3>
                            <div className="space-y-2">
                                {category.skills.map((skill, skillIndex) => (
                                    <motion.div
                                        key={skillIndex}
                                        className="flex items-center group/skill"
                                        initial={{ x: -10, opacity: 0 }}
                                        whileInView={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 0.2 + (skillIndex * 0.1) }}
                                    >
                                        <span className="text-cyber-green mr-2 group-hover/skill:mr-3 transition-all">▹</span>
                                        <span className="text-gray-light group-hover/skill:text-white transition-colors">
                                            {skill}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}

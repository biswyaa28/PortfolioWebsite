"use client";

import { motion } from "framer-motion";

import RetroWindow from "./RetroWindow";

export default function About() {
  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center py-20 px-4"
    >
      <div className="max-w-4xl mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          About <span className="text-cyber-blue">Me</span>
        </motion.h2>

        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
        >
            <RetroWindow title="~/about-me -- bash">
                <motion.p
                    className="text-lg text-gray-light mb-6 leading-relaxed"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                >
                    I&apos;m a passionate BTech Computer Science student diving deep into the world of cybersecurity.
                    My focus is on building a strong foundation in C++, network security principles, and understanding
                    system vulnerabilities.
                </motion.p>

          <motion.p
            className="text-lg text-gray-light mb-6 leading-relaxed"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            I&apos;m actively seeking internships and projects to apply my
            knowledge in real-world scenarios, where I can contribute to
            securing digital infrastructure and learn from experienced
            professionals in the field.
          </motion.p>

                    <div className="grid md:grid-cols-2 gap-6 mt-8">
                        <motion.div
                            className="bg-background/60 backdrop-blur-sm p-6 border border-stone-800 ring-1 ring-blue-500/20"
                            style={{ boxShadow: "inset 0 0 30px rgba(59, 130, 246, 0.05)" }}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.6 }}
                            whileHover={{ scale: 1.02 }}
                        >
                            <h3 className="text-xl font-semibold text-cyber-blue mb-3 flex items-center">
                                <span className="mr-2">🎯</span> Current Focus
                            </h3>
                            <ul className="space-y-2 text-gray-light">
                                <li className="flex items-start">
                                    <span className="text-cyber-blue mr-2">▹</span>
                                    <span>Advanced C++ Programming</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-cyber-blue mr-2">▹</span>
                                    <span>Network Security Principles</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-cyber-blue mr-2">▹</span>
                                    <span>System Vulnerability Analysis</span>
                                </li>
                            </ul>
                        </motion.div>

                        <motion.div
                            className="bg-background/60 backdrop-blur-sm p-6 border border-stone-800 ring-1 ring-blue-500/20"
                            style={{ boxShadow: "inset 0 0 30px rgba(59, 130, 246, 0.05)" }}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.7 }}
                            whileHover={{ scale: 1.02 }}
                        >
                            <h3 className="text-xl font-semibold text-cyber-blue mb-3 flex items-center">
                                <span className="mr-2">🎓</span> Academic Status
                            </h3>
                            <ul className="space-y-2 text-gray-light">
                                <li className="flex items-start">
                                    <span className="text-cyber-blue mr-2">▹</span>
                                    <span>BTech in Computer Science & Engineering</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-cyber-blue mr-2">▹</span>
                                    <span>Specialization: Cybersecurity</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-cyber-blue mr-2">▹</span>
                                    <span>Actively seeking internship opportunities</span>
                                </li>
                            </ul>
                        </motion.div>
                    </div>
            </RetroWindow>
        </motion.div>
      </div>
    </section>
  );
}

'use client';

import { motion } from 'framer-motion';

export default function Blog() {
    return (
        <section id="blog" className="min-h-screen flex items-center justify-center py-20 px-4">
            <div className="max-w-4xl mx-auto w-full text-center">
                <motion.h2
                    className="text-4xl md:text-5xl font-bold mb-8"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="text-cyber-green">Blog</span> & Articles
                </motion.h2>

                <motion.div
                    className="bg-card p-12 rounded-lg border border-gray-dark"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    whileHover={{ borderColor: "#00ff9d" }}
                >
                    <motion.div
                        className="mb-6"
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <span className="text-6xl">📝</span>
                    </motion.div>

                    <h3 className="text-2xl font-semibold mb-4 text-white">Coming Soon</h3>
                    <p className="text-gray-light mb-6 max-w-2xl mx-auto">
                        I&apos;m working on sharing my knowledge and experiences in cybersecurity, programming,
                        and technology. Stay tuned for insightful articles and tutorials!
                    </p>

                    <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-light">
                        {["Cybersecurity Tips", "C++ Tutorials", "Network Security", "Project Walkthroughs"].map((tag, index) => (
                            <motion.span
                                key={index}
                                className="px-4 py-2 bg-background rounded-full border border-gray-dark cursor-default"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4 + (index * 0.1) }}
                                whileHover={{ scale: 1.1, borderColor: "#00ff9d", color: "#fff" }}
                            >
                                {tag}
                            </motion.span>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

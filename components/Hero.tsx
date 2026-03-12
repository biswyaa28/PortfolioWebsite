'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
    const scrollToProjects = () => {
        const element = document.getElementById('projects');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const [particles, setParticles] = useState<{ x: number; y: number; duration: number; delay: number }[]>([]);

    useEffect(() => {
        const newParticles = Array.from({ length: 20 }).map(() => ({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            duration: Math.random() * 10 + 10,
            delay: Math.random() * 5
        }));
        setParticles(newParticles);
    }, []);

    return (
        <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
            {/* Animated background grid */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-b from-background via-background to-card opacity-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ duration: 1 }}
            >
                <div className="absolute inset-0" style={{
                    backgroundImage: 'linear-gradient(#00ff9d 1px, transparent 1px), linear-gradient(90deg, #00ff9d 1px, transparent 1px)',
                    backgroundSize: '50px 50px',
                    opacity: 0.03,
                }}></div>
            </motion.div>

            {/* Floating particles */}
            {particles.map((particle, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-cyber-green rounded-full"
                    initial={{
                        x: particle.x,
                        y: particle.y,
                        opacity: 0
                    }}
                    animate={{
                        y: [null, Math.random() * window.innerHeight], // This might still be risky for re-renders, but usually safe if just animation target. Better to use strict value.
                        opacity: [0, 0.5, 0]
                    }}
                    transition={{
                        duration: particle.duration,
                        repeat: Infinity,
                        ease: "linear",
                        delay: particle.delay
                    }}
                />
            ))}

            <div className="relative z-10 text-center px-4">
                <motion.h1
                    className="text-5xl md:text-7xl font-bold mb-4"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <motion.span
                        className="text-white inline-block"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        Biswajeet
                    </motion.span>{' '}
                    <motion.span
                        className="text-cyber-green inline-block"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                    >
                        Rout
                    </motion.span>
                </motion.h1>

                <motion.h2
                    className="text-2xl md:text-3xl text-gray-light mb-6"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                >
                    Cybersecurity Engineer & BTech CSE Student
                </motion.h2>

                <motion.p
                    className="text-lg md:text-xl text-gray-light mb-8 max-w-2xl mx-auto font-mono"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 1 }}
                >
                    &quot;Securing the Digital Frontier, One Line of Code at a Time.&quot;
                </motion.p>

                <motion.button
                    onClick={scrollToProjects}
                    className="px-8 py-3 bg-cyber-green text-background font-semibold rounded-lg transition-all duration-300"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1, duration: 0.5 }}
                    whileHover={{
                        scale: 1.05,
                        boxShadow: "0 0 20px rgba(0, 255, 157, 0.5)"
                    }}
                    whileTap={{ scale: 0.95 }}
                >
                    View My Work
                </motion.button>
            </div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
            >
                <motion.div
                    className="w-6 h-10 border-2 border-cyber-green rounded-full flex justify-center"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <motion.div
                        className="w-1 h-3 bg-cyber-green rounded-full mt-2"
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                </motion.div>
            </motion.div>
        </section>
    );
}

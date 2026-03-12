'use client';

import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            // EmailJS configuration
            // You'll need to replace these with your actual EmailJS credentials
            const serviceId = 'service_4y39mid';
            const templateId = 'template_sg3l0ak';
            const publicKey = 'jV09gRvRyABD43Odt';

            await emailjs.send(
                serviceId,
                templateId,
                {
                    from_name: formData.name,
                    from_email: formData.email,
                    message: formData.message,
                    to_email: 'biswajeetrout2006@gmail.com',
                },
                publicKey
            );

            setSubmitStatus('success');
            setFormData({ name: '', email: '', message: '' }); // Clear form
        } catch (error) {
            console.error('Email send failed:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <section id="contact" className="min-h-screen flex items-center justify-center py-20 px-4">
            <div className="max-w-4xl mx-auto w-full">
                <motion.h2
                    className="text-4xl md:text-5xl font-bold mb-12 text-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    Get In <span className="text-cyber-green">Touch</span>
                </motion.h2>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Contact Form */}
                    <motion.div
                        className="bg-card p-8 rounded-lg border border-gray-dark"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h3 className="text-2xl font-semibold mb-6 text-cyber-green">Ring me up</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-light mb-2">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 bg-background border border-gray-dark rounded-lg focus:outline-none focus:border-cyber-green transition-colors text-white"
                                    placeholder="Your Name"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-light mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 bg-background border border-gray-dark rounded-lg focus:outline-none focus:border-cyber-green transition-colors text-white"
                                    placeholder="your.email@example.com"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-light mb-2">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={5}
                                    className="w-full px-4 py-2 bg-background border border-gray-dark rounded-lg focus:outline-none focus:border-cyber-green transition-colors text-white resize-none"
                                    placeholder="Your message..."
                                />
                            </div>
                            <motion.button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full px-6 py-3 bg-cyber-green text-background font-semibold rounded-lg hover:bg-white transition-all duration-300 transform disabled:opacity-50 disabled:cursor-not-allowed"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                            </motion.button>

                            {submitStatus === 'success' && (
                                <motion.p
                                    className="text-cyber-green text-sm mt-2"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    ✓ Message sent successfully!
                                </motion.p>
                            )}
                            {submitStatus === 'error' && (
                                <motion.p
                                    className="text-red-500 text-sm mt-2"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    ✗ Failed to send. Please try again or email directly.
                                </motion.p>
                            )}
                        </form>
                    </motion.div>

                    {/* Contact Information */}
                    <div className="space-y-6">
                        <motion.div
                            className="bg-card p-8 rounded-lg border border-gray-dark hover:border-cyber-green transition-all duration-300 h-full"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            <h3 className="text-2xl font-semibold mb-6 text-cyber-green">Contact Information</h3>
                            <div className="space-y-4">
                                <div className="flex items-start">
                                    <span className="text-cyber-green mr-3 mt-1">📧</span>
                                    <div>
                                        <p className="text-sm text-gray-light">Email</p>
                                        <p className="text-white">biswajeetrout2006@gmail.com</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <span className="text-cyber-green mr-3 mt-1">📍</span>
                                    <div>
                                        <p className="text-sm text-gray-light">Location</p>
                                        <p className="text-white">Thane,India</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <span className="text-cyber-green mr-3 mt-1">💼</span>
                                    <div>
                                        <p className="text-sm text-gray-light">Status</p>
                                        <p className="text-white">Available for Internships</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}

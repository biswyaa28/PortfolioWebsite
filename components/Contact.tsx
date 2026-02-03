'use client';

import { useState } from 'react';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const mailtoLink = `mailto:your.email@example.com?subject=Portfolio Contact from ${formData.name}&body=${formData.message}%0D%0A%0D%0AFrom: ${formData.name}%0D%0AEmail: ${formData.email}`;
        window.location.href = mailtoLink;
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
                <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
                    Get In <span className="text-cyber-green">Touch</span>
                </h2>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Contact Form */}
                    <div className="bg-card p-8 rounded-lg border border-gray-dark">
                        <h3 className="text-2xl font-semibold mb-6 text-cyber-green">Send a Message</h3>
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
                            <button
                                type="submit"
                                className="w-full px-6 py-3 bg-cyber-green text-background font-semibold rounded-lg hover:bg-white transition-all duration-300 transform hover:scale-105"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-6">
                        <div className="bg-card p-8 rounded-lg border border-gray-dark hover:border-cyber-green transition-all duration-300">
                            <h3 className="text-2xl font-semibold mb-6 text-cyber-green">Contact Information</h3>
                            <div className="space-y-4">
                                <div className="flex items-start">
                                    <span className="text-cyber-green mr-3 mt-1">📧</span>
                                    <div>
                                        <p className="text-sm text-gray-light">Email</p>
                                        <p className="text-white">your.email@example.com</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <span className="text-cyber-green mr-3 mt-1">📍</span>
                                    <div>
                                        <p className="text-sm text-gray-light">Location</p>
                                        <p className="text-white">India</p>
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
                        </div>

                        <div className="bg-card p-8 rounded-lg border border-gray-dark">
                            <p className="text-gray-light text-sm">
                                💡 <span className="text-cyber-green">Note:</span> Update your email in{' '}
                                <code className="bg-background px-2 py-1 rounded text-xs font-mono">components/Contact.tsx</code>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

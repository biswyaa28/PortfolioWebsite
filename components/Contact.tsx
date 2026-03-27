"use client";

import { useState, useEffect, useRef, type ChangeEvent, type FormEvent } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import anime from "animejs";
import { transmitSuccess, transmitError } from "@/lib/retroAlert";
import { useConsoleLogger } from "@/lib/ConsoleLogger";

export default function Contact() {
  const { log } = useConsoleLogger();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const btnTextRef = useRef<HTMLSpanElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  // Anime.js "TRANSMITTING..." text scramble animation
  useEffect(() => {
    if (!isSubmitting || !btnTextRef.current) return;

    const el = btnTextRef.current;
    const chars = "█▓▒░╔╗╚╝║═╠╣╬";
    let frame = 0;

    const anim = anime({
      targets: {},
      duration: Infinity,
      loop: true,
      update: () => {
        frame++;
        const dots = ".".repeat((frame % 9) / 3);
        const scramble = Array.from({ length: 6 }, () =>
          chars[Math.floor(Math.random() * chars.length)]
        ).join("");
        el.textContent = `>> ${scramble} TRANSMITTING${dots}`;
      },
    });

    return () => anim.pause();
  }, [isSubmitting]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    log("FORM", "Uplink handshake initiated");

    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "";
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "";
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "";

      log("FORM", `Encrypting payload -> ${serviceId}`);
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: "biswajeetrout2006@gmail.com",
        },
        publicKey,
      );

      log("FORM", "Data packet delivered — ACK received");
      await transmitSuccess();
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      log("ERROR", "Uplink terminated — packet lost");
      console.error("Email send failed:", error);
      await transmitError();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section
      id="contact"
      className="min-h-screen pt-32 pb-20 px-4"
    >
      <div className="max-w-6xl mx-auto w-full">
        <div className="max-w-4xl mx-auto w-full">
        <div className="text-center mb-12">
          <h2 className="section-heading text-3xl md:text-4xl text-foreground">
            Uplink
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Transmission Form */}
          <motion.div
            className="uplink-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <div className="uplink-card-header">
              <span className="uplink-card-indicator" />
              <span className="uplink-card-label">SECURE CHANNEL OPEN</span>
            </div>

            <div className="uplink-card-body">
              <h3 className="uplink-card-title">&gt; Encode Transmission</h3>

              <form onSubmit={handleSubmit} className="uplink-form">
                <div className="uplink-field">
                  <label htmlFor="name" className="uplink-label">
                    CALLSIGN
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="uplink-input"
                    placeholder="ENTER_NAME"
                  />
                  <div className="uplink-line" />
                </div>

                <div className="uplink-field">
                  <label htmlFor="email" className="uplink-label">
                    UPLINK ADDRESS
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="uplink-input"
                    placeholder="NODE@DOMAIN.COM"
                  />
                  <div className="uplink-line" />
                </div>

                <div className="uplink-field">
                  <label htmlFor="message" className="uplink-label">
                    PAYLOAD
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="uplink-input uplink-textarea"
                    placeholder="ENCODE MESSAGE..."
                  />
                  <div className="uplink-line" />
                </div>

                <button
                  ref={btnRef}
                  type="submit"
                  disabled={isSubmitting}
                  className="uplink-transmit-btn"
                >
                  <span ref={btnTextRef} className="uplink-transmit-text">
                    {isSubmitting
                      ? ">> TRANSMITTING..."
                      : ">> TRANSMIT DATA"}
                  </span>
                </button>
              </form>
            </div>
          </motion.div>

          {/* Node Details */}
          <motion.div
            className="uplink-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <div className="uplink-card-header">
              <span className="uplink-card-indicator" />
              <span className="uplink-card-label">NODE INFO</span>
            </div>

            <div className="uplink-card-body">
              <h3 className="uplink-card-title">&gt; Destination Node</h3>

              <div className="uplink-node-info">
                <div className="uplink-node-row">
                  <span className="uplink-node-key">EMAIL_UPLINK:</span>
                  <span className="uplink-node-val">biswajeetrout2006@gmail.com</span>
                </div>
                <div className="uplink-node-row">
                  <span className="uplink-node-key">COORDINATES:</span>
                  <span className="uplink-node-val">Thane, India</span>
                </div>
                <div className="uplink-node-row">
                  <span className="uplink-node-key">STATUS:</span>
                  <span className="uplink-node-val uplink-node-val--green">Available for Internships</span>
                </div>
                <div className="uplink-node-row">
                  <span className="uplink-node-key">ENCRYPTION:</span>
                  <span className="uplink-node-val">AES-256-GCM</span>
                </div>
                <div className="uplink-node-row">
                  <span className="uplink-node-key">PROTOCOL:</span>
                  <span className="uplink-node-val">SECURE UPLINK v3.1</span>
                </div>
                <div className="uplink-node-divider" />
                <div className="uplink-node-row">
                  <span className="uplink-node-key">LATENCY:</span>
                  <span className="uplink-node-val">12ms</span>
                </div>
                <div className="uplink-node-row">
                  <span className="uplink-node-key">PACKET_LOSS:</span>
                  <span className="uplink-node-val">0.0%</span>
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

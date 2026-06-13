"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import Modal from "@/components/Modal";
import { useParallax, useChildParallax } from "@/hooks/useParallax";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [modalOpen, setModalOpen] = useState(false);
  const [emailError, setEmailError] = useState("");

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const statusMessage =
    formStatus === "sending"
      ? "Sending message."
      : formStatus === "success"
        ? "Your message was sent successfully."
        : formStatus === "error"
          ? "There was an issue sending your message."
          : "";

  const { ref, y, opacity, scrollYProgress } = useParallax({
    speed: 0.1,
    fadeIn: true,
  });

  const leftY = useChildParallax(scrollYProgress, 0.06);
  const rightY = useChildParallax(scrollYProgress, -0.04);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === "email") setEmailError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(formData.email)) {
      setEmailError("Please enter a valid email address");
      return;
    }
    setFormStatus("sending");
    setModalOpen(true);

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => {
          setFormStatus("idle");
          setModalOpen(false);
        }, 3000);
      } else {
        setFormStatus("error");
        setTimeout(() => setFormStatus("idle"), 3000);
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setFormStatus("error");
      setTimeout(() => setFormStatus("idle"), 3000);
    }
  };

  return (
    <>
      <motion.section
        ref={ref}
        id="contact"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ y, opacity }}
        className="py-32 border-t border-emerald-500/10 relative"
      >
        {/* Ambient neon glow */}
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[400px] bg-emerald-500/[0.06] rounded-full blur-[140px] pointer-events-none glow-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <motion.div className="md:col-span-4" style={{ y: leftY }}>
            <h2 className="text-4xl font-extrabold text-white tracking-tighter mb-4">
              Contact.
            </h2>
            <p className="text-zinc-500 mb-8">
              Let&apos;s build something together.
            </p>

            <div className="flex flex-col gap-4 text-sm text-zinc-400">
              <a
                href="mailto:logan.panucat2@gmail.com"
                className="hover:text-emerald-400 transition-colors flex items-center gap-2"
              >
                <EnvelopeIcon className="w-4 h-4" /> logan.panucat2@gmail.com
              </a>
              <a
                href="https://github.com/Ezgaminglogan"
                target="_blank"
                rel="noreferrer"
                className="hover:text-emerald-400 transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/logan-panucat-b319562a9/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-emerald-400 transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
                LinkedIn
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            style={{ y: rightY }}
            className="md:col-span-8"
          >
            <p className="sr-only" role="status" aria-live="polite">
              {statusMessage}
            </p>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-6"
              aria-busy={formStatus === "sending"}
            >
              <div className="grid md:grid-cols-2 gap-6">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Name"
                  autoComplete="name"
                  className="bg-transparent border-b border-emerald-500/15 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-400 transition-colors"
                />
                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="Email"
                    autoComplete="email"
                    aria-invalid={!!emailError}
                    aria-describedby={emailError ? "email-error" : undefined}
                    className={`bg-transparent border-b py-3 text-white placeholder:text-zinc-600 focus:outline-none transition-colors w-full ${
                      emailError ? "border-red-500/50 focus:border-red-500" : "border-emerald-500/15 focus:border-emerald-400"
                    }`}
                  />
                  {emailError && (
                    <p id="email-error" role="alert" className="text-red-400 text-xs mt-2">
                      {emailError}
                    </p>
                  )}
                </div>
              </div>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                required
                placeholder="Subject"
                autoComplete="off"
                className="bg-transparent border-b border-emerald-500/15 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-400 transition-colors"
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={4}
                placeholder="Message"
                autoComplete="off"
                className="bg-transparent border-b border-emerald-500/15 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-400 transition-colors resize-none"
              ></textarea>

              <button
                type="submit"
                disabled={formStatus === "sending"}
                className="self-start bg-emerald-500 text-black px-8 py-4 rounded-full text-sm font-semibold hover:bg-emerald-400 transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 mt-4 hover:shadow-[0_0_24px_rgba(52,211,153,0.3)]"
              >
                {formStatus === "sending" ? "Sending..." : "Send Message"}
              </button>
            </form>
          </motion.div>
        </div>
      </motion.section>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={
          formStatus === "sending"
            ? "Sending..."
            : formStatus === "success"
              ? "Sent"
              : "Error"
        }
        message={
          formStatus === "success"
            ? "Your message was sent successfully."
            : "There was an issue sending your message."
        }
        type={
          formStatus === "sending"
            ? "loading"
            : (formStatus as "success" | "error")
        }
      />
    </>
  );
}

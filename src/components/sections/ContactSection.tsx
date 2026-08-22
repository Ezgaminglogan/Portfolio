"use client";
import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import {
  EnvelopeIcon,
  CheckIcon,
  DocumentDuplicateIcon,
  ArrowTopRightOnSquareIcon,
  MapPinIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import Modal from "@/components/Modal";
import { useParallax, useChildParallax } from "@/hooks/useParallax";
import AnimatedSectionHeading from "@/components/ui/AnimatedSectionHeading";
import { contactApi, type ContactPayload } from "~features/contact/api/contactApi";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const isValidEmail = (email: string): boolean => EMAIL_REGEX.test(email);

export default function ContactSection() {
  const [formData, setFormData] = useState<ContactPayload>({
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
  const [copiedEmail, setCopiedEmail] = useState(false);

  const copyEmailToClipboard = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText("logan.panucat2@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const statusMessage =
    formStatus === "sending"
      ? "Sending message..."
      : formStatus === "success"
        ? "Your message was sent successfully."
        : formStatus === "error"
          ? "There was an issue sending your message."
          : "";

  const { ref, y, opacity, scrollYProgress } = useParallax({
    speed: 0.1,
    fadeIn: true,
  });

  const leftY = useChildParallax(scrollYProgress, 0.05);
  const rightY = useChildParallax(scrollYProgress, -0.03);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      if (name === "email") setEmailError("");
    },
    []
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!isValidEmail(formData.email)) {
        setEmailError("Please enter a valid email address");
        return;
      }
      setFormStatus("sending");
      setModalOpen(true);

      try {
        await contactApi.sendMessage(formData);
        setFormStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => {
          setFormStatus("idle");
          setModalOpen(false);
        }, 3000);
      } catch (error) {
        console.error("Error sending email:", error);
        setFormStatus("error");
        setTimeout(() => setFormStatus("idle"), 3000);
      }
    },
    [formData]
  );

  return (
    <>
      <motion.section
        ref={ref}
        id="contact"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ y, opacity }}
        className="py-24 sm:py-32 border-t border-slate-200/80 relative"
      >
        <AnimatedSectionHeading
          title="Contact."
          label="Direct Inquiries"
          subtitle="Let's build high-performance systems together. Send an email or connect directly."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 w-full">
          {/* Left Column: High-Craft Direct Channels */}
          <motion.div className="lg:col-span-5 flex flex-col justify-between gap-6" style={{ y: leftY }}>
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-700 font-mono text-[11px] font-bold uppercase tracking-wider mb-4 shadow-2xs">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 animate-ping opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                </span>
                Active Developer • Fast Response
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-slate-950 mb-2 tracking-tight">
                Direct Channels
              </h3>
              <p className="text-slate-600 mb-6 text-sm leading-relaxed">
                Available for full-stack developer roles, software consulting, and production systems development.
              </p>

              {/* Tactile Channel Cards Matrix */}
              <div className="flex flex-col gap-3.5">
                {/* 01: Direct Email Card */}
                <div className="group relative flex items-center justify-between p-4 rounded-2xl border border-slate-200/90 bg-white hover:border-blue-300 hover:shadow-[0_10px_25px_rgba(37,99,235,0.08)] transition-all duration-300 shadow-2xs overflow-hidden">
                  <a
                    href="mailto:logan.panucat2@gmail.com"
                    className="flex items-center gap-3.5 min-w-0 flex-1 cursor-pointer"
                  >
                    <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-xs">
                      <EnvelopeIcon className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-blue-700">
                        01 // Direct Email
                      </div>
                      <div className="text-sm sm:text-base font-bold text-slate-900 truncate group-hover:text-blue-700 transition-colors">
                        logan.panucat2@gmail.com
                      </div>
                    </div>
                  </a>

                  {/* Copy to Clipboard Micro Button */}
                  <button
                    type="button"
                    onClick={copyEmailToClipboard}
                    className="ml-2 p-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-blue-300 text-slate-600 hover:text-blue-600 transition-all duration-200 shadow-2xs cursor-pointer shrink-0"
                    title="Copy email address"
                  >
                    {copiedEmail ? (
                      <span className="flex items-center gap-1 text-[11px] font-mono text-emerald-600 font-bold px-1">
                        <CheckIcon className="w-4 h-4" />
                        <span className="hidden sm:inline">Copied!</span>
                      </span>
                    ) : (
                      <DocumentDuplicateIcon className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* 02: GitHub Profile Card */}
                <a
                  href="https://github.com/Ezgaminglogan"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between p-4 rounded-2xl border border-slate-200/90 bg-white hover:border-slate-400 hover:shadow-[0_10px_25px_rgba(0,0,0,0.06)] transition-all duration-300 shadow-2xs cursor-pointer"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-11 h-11 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 text-white shadow-xs group-hover:scale-105 transition-transform">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path
                          fillRule="evenodd"
                          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500">
                        02 // GitHub Repository
                      </div>
                      <div className="text-sm sm:text-base font-bold text-slate-900 truncate group-hover:text-slate-700 transition-colors">
                        @Ezgaminglogan
                      </div>
                    </div>
                  </div>
                  <ArrowTopRightOnSquareIcon className="w-4 h-4 text-slate-400 group-hover:text-slate-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-2" />
                </a>

                {/* 03: LinkedIn Profile Card */}
                <a
                  href="https://github.com/Ezgaminglogan"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between p-4 rounded-2xl border border-slate-200/90 bg-white hover:border-blue-400 hover:shadow-[0_10px_25px_rgba(37,99,235,0.08)] transition-all duration-300 shadow-2xs cursor-pointer"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-11 h-11 rounded-xl bg-[#0077B5] flex items-center justify-center shrink-0 text-white shadow-xs group-hover:scale-105 transition-transform">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-blue-700">
                        03 // LinkedIn Network
                      </div>
                      <div className="text-sm sm:text-base font-bold text-slate-900 truncate group-hover:text-blue-700 transition-colors">
                        Logan Panucat
                      </div>
                    </div>
                  </div>
                  <ArrowTopRightOnSquareIcon className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-2" />
                </a>
              </div>
            </div>

            {/* Micro Telemetry Dispatch Footer */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-slate-600 shadow-2xs">
              <div className="flex items-center gap-2">
                <MapPinIcon className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Cebu, PH (GMT+8)</span>
              </div>
              <div className="flex items-center gap-2 text-slate-500">
                <ClockIcon className="w-4 h-4 text-slate-400 shrink-0" />
                <span>Mon – Sat Active</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Contact Inquiry Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            style={{ y: rightY }}
            className="lg:col-span-7 bg-white p-7 sm:p-9 rounded-3xl border border-slate-200/90 shadow-[0_10px_35px_rgba(0,0,0,0.03)] flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                <div>
                  <h4 className="text-lg font-bold text-slate-950 tracking-tight">
                    Send a Message
                  </h4>
                  <p className="text-xs text-slate-500">
                    Direct delivery to logan.panucat2@gmail.com
                  </p>
                </div>
                <span className="text-[11px] font-mono font-bold text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
                  FORM // DISPATCH
                </span>
              </div>

              <p className="sr-only" role="status" aria-live="polite">
                {statusMessage}
              </p>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-5"
                aria-busy={formStatus === "sending"}
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5 font-mono uppercase tracking-wider">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Your Name"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5 font-mono uppercase tracking-wider">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="Your Email"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all text-sm"
                    />
                    {emailError && (
                      <p className="text-red-600 text-xs mt-1">{emailError}</p>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5 font-mono uppercase tracking-wider">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    placeholder="Subject / Project Inquiry"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5 font-mono uppercase tracking-wider">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    placeholder="Describe your project, systems scope, or role inquiry..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all resize-none text-sm"
                  />
                </div>

                <button
                  type="submit"
                  disabled={formStatus === "sending"}
                  className="self-start bg-blue-600 text-white px-8 py-3.5 rounded-full font-bold hover:bg-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_8px_25px_rgba(37,99,235,0.3)] hover:shadow-[0_12px_30px_rgba(37,99,235,0.45)] cursor-pointer text-sm"
                >
                  {formStatus === "sending" ? "Sending..." : "Send Message ➔"}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={
          formStatus === "sending"
            ? "Sending Message"
            : formStatus === "success"
              ? "Message Sent"
              : "Sending Failed"
        }
        message={statusMessage}
        type={
          formStatus === "sending"
            ? "loading"
            : formStatus === "success"
              ? "success"
              : "error"
        }
      />
    </>
  );
}

"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import {
  EnvelopeIcon,
  Bars3Icon,
  XMarkIcon,
  ArrowDownTrayIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";
import Modal from "@/components/Modal";
import ImageCarousel from "@/components/ImageCarousel";
import { skills, projects, experiences, sqliteImages } from "./data";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [formStatus, setFormStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [modalOpen, setModalOpen] = useState(false);

  // Project modal handlers
  const openProjectModal = (index: number) => {
    setSelectedProject(index);
    document.body.style.overflow = "hidden";
  };
  const closeProjectModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = "";
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeProjectModal();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  useEffect(() => {
    const sections = [
      "home",
      "about",
      "skills",
      "projects",
      "sqlite-portable",
      "experience",
      "certificates",
      "contact",
    ];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
    <div className="min-h-screen bg-zinc-950 text-zinc-200 font-sans selection:bg-zinc-800 selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-zinc-950/80 backdrop-blur-md z-50 border-b border-zinc-900/50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-lg font-semibold tracking-tight text-white hover:text-zinc-300 transition-colors">
            Logan
          </span>

          {/* Desktop Nav */}
          <div className="hidden lg:flex gap-8 text-sm font-medium">
            {[
              "Home",
              "About",
              "Skills",
              "Projects",
              "Experience",
              "Contact",
            ].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`transition-colors py-2 ${
                  activeSection === item.toLowerCase()
                    ? "text-white"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {item}
              </a>
            ))}
          </div>

          <button
            className="lg:hidden p-2 -mr-2 text-zinc-400 hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <XMarkIcon className="w-5 h-5" />
            ) : (
              <Bars3Icon className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="lg:hidden px-6 py-4 bg-zinc-950 border-t border-zinc-900/50 flex flex-col gap-4 text-sm">
            {[
              "Home",
              "About",
              "Skills",
              "Projects",
              "Experience",
              "Contact",
            ].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-zinc-400 hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}
          </div>
        )}
      </nav>

      <main className="max-w-6xl mx-auto px-6">
        {/* Hero Section */}
        <section
          id="home"
          className="min-h-screen flex flex-col justify-center pt-20 pb-32"
        >
          <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-16">
            <div className="max-w-2xl text-center lg:text-left flex flex-col items-center lg:items-start">
              <span className="text-zinc-500 font-medium tracking-wide text-sm mb-4 block">
                AVAILABLE FOR WORK
              </span>
              <h1 className="text-5xl sm:text-7xl font-bold text-white tracking-tight mb-6 leading-tight">
                Logan M. <span className="text-zinc-500">Panucat</span>
              </h1>
              <p className="text-lg sm:text-xl text-zinc-400 leading-relaxed mb-10 max-w-xl">
                A Full Stack Developer specializing in PHP, MySQL, C#, ASP.NET
                MVC, and .NET. Building clean, intuitive digital experiences.
              </p>
              <div className="flex items-center justify-center lg:justify-start gap-4">
                <a
                  href="#projects"
                  className="bg-white text-black px-6 py-3 rounded-full text-sm font-medium hover:bg-zinc-200 transition-colors"
                >
                  View Work
                </a>
                <a
                  href="#contact"
                  className="px-6 py-3 rounded-full text-sm font-medium text-white border border-zinc-800 hover:bg-zinc-900 transition-colors"
                >
                  Get in Touch
                </a>
              </div>
            </div>
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-72 lg:h-72 flex-shrink-0">
              <Image
                src="/image/profile.jpg"
                alt="Logan Panucat"
                fill
                className="object-cover rounded-2xl transition-all duration-700"
                priority
              />
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-32 border-t border-zinc-900/50">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <h2 className="text-3xl font-bold text-white tracking-tight">
                About Me.
              </h2>
            </div>
            <div className="md:col-span-8 flex flex-col gap-10 text-zinc-400 text-lg leading-relaxed">
              <p>
                I&apos;m a 4th-year IT student at Cebu Technological University
                — Naga Extension Campus, passionate about building practical
                software solutions.
              </p>
              <p>
                My expertise spans PHP, MySQL, C#, and ASP.NET MVC. With the
                help of AI assistance, I enjoy transforming complex requirements
                into functional, clean implementations, whether it&apos;s an
                educational system or an industrial supply platform.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-zinc-900">
                <div>
                  <div className="text-3xl font-bold text-white mb-1">4th</div>
                  <div className="text-xs text-zinc-500 uppercase tracking-wider">
                    Year Student
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white mb-1">3+</div>
                  <div className="text-xs text-zinc-500 uppercase tracking-wider">
                    Major Projects
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white mb-1">Cebu</div>
                  <div className="text-xs text-zinc-500 uppercase tracking-wider">
                    Based In
                  </div>
                </div>
              </div>

              <a
                href="/CV_Portfolio/Resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm text-white hover:text-zinc-300 w-fit border-b border-zinc-800 pb-1 mt-4 transition-colors"
              >
                <ArrowDownTrayIcon className="w-4 h-4" /> Download Resume
              </a>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-32 border-t border-zinc-900/50">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <h2 className="text-3xl font-bold text-white tracking-tight mb-4">
                Skills.
              </h2>
              <p className="text-zinc-500">
                Core technologies and tools I work with.
              </p>
            </div>
            <div className="md:col-span-8 grid sm:grid-cols-2 gap-6">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="p-6 rounded-2xl border border-zinc-900 bg-zinc-950/50 hover:border-zinc-800 transition-colors"
                >
                  <skill.icon className="w-6 h-6 text-zinc-400 mb-4" />
                  <h3 className="text-white font-medium mb-1">{skill.name}</h3>
                  <p className="text-sm text-zinc-500 mb-6">{skill.subtitle}</p>
                  <div className="flex flex-wrap gap-2">
                    {skill.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 text-xs rounded-full bg-zinc-900 font-medium text-zinc-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-32 border-t border-zinc-900/50">
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-white tracking-tight mb-4">
              Selected Work.
            </h2>
            <p className="text-zinc-500">
              A curation of my recent development projects.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            {projects.map((project, index) => (
              <div
                key={index}
                onClick={() => openProjectModal(index)}
                className="group cursor-pointer flex flex-col gap-6"
              >
                <div className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl bg-zinc-900">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover object-top transition-all duration-700 ease-in-out group-hover:scale-105"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs uppercase tracking-wider text-zinc-500">
                      {project.type}
                    </span>
                  </div>
                  <h3 className="text-xl font-medium text-white mb-3 group-hover:text-zinc-300 transition-colors">
                    {project.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span key={t} className="text-xs text-zinc-500">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SQLite Portable Section */}
        <section
          id="sqlite-portable"
          className="py-32 border-t border-zinc-900/50"
        >
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="w-16 h-16 mx-auto mb-6 relative">
              <Image
                src="/image/sqlite-portables/SQLite-Portable.png"
                alt="SQLite Portable"
                fill
                className="object-contain"
              />
            </div>
            <h2 className="text-3xl font-bold text-white tracking-tight mb-4">
              SQLite Portable.
            </h2>
            <p className="text-zinc-400 text-lg mb-8">
              A lightweight SQLite database management desktop application
              featuring multiple language integrations and schema design tools.
            </p>
            <a
              href="https://www.mediafire.com/file/2pu0bqxgr979uam/SQLitePortableSetup.zip/file"
              target="_blank"
              rel="noreferrer"
              className="inline-block bg-white text-black px-6 py-3 rounded-full text-sm font-medium hover:bg-zinc-200 transition-colors"
            >
              Download Now
            </a>
          </div>
          <div className="rounded-2xl overflow-hidden border border-zinc-900">
            <ImageCarousel images={sqliteImages} autoplayInterval={4000} />
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-32 border-t border-zinc-900/50">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <h2 className="text-3xl font-bold text-white tracking-tight">
                Timeline.
              </h2>
            </div>
            <div className="md:col-span-8 flex flex-col gap-12">
              {experiences.map((exp, i) => (
                <div
                  key={i}
                  className="flex flex-col sm:flex-row gap-4 sm:gap-12 group"
                >
                  <div className="sm:w-32 flex-shrink-0 text-zinc-500 text-sm pt-1">
                    {exp.period}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white mb-1 group-hover:text-zinc-300 transition-colors">
                      {exp.title}
                    </h3>
                    <p className="text-sm text-zinc-400 mb-4">{exp.company}</p>
                    <p className="text-zinc-500 leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-32 border-t border-zinc-900/50">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <h2 className="text-3xl font-bold text-white tracking-tight mb-4">
                Contact.
              </h2>
              <p className="text-zinc-500 mb-8">
                Let&apos;s build something together.
              </p>

              <div className="flex flex-col gap-4 text-sm text-zinc-400">
                <a
                  href="mailto:logan.panucat2@gmail.com"
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  <EnvelopeIcon className="w-4 h-4" /> logan.panucat2@gmail.com
                </a>
                <a
                  href="https://github.com/Ezgaminglogan"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
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
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                  LinkedIn
                </a>
              </div>
            </div>

            <div className="md:col-span-8">
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Name"
                    className="bg-transparent border-b border-zinc-800 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 transition-colors"
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="Email"
                    className="bg-transparent border-b border-zinc-800 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 transition-colors"
                  />
                </div>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  placeholder="Subject"
                  className="bg-transparent border-b border-zinc-800 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 transition-colors"
                />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  placeholder="Message"
                  className="bg-transparent border-b border-zinc-800 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 transition-colors resize-none"
                ></textarea>

                <button
                  type="submit"
                  disabled={formStatus === "sending"}
                  className="self-start bg-white text-black px-8 py-3 rounded-full text-sm font-medium hover:bg-zinc-200 transition-colors disabled:opacity-50 mt-4"
                >
                  {formStatus === "sending" ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-12 border-t border-zinc-900/50 flex flex-col items-center gap-6 text-xs text-zinc-600">
        <div className="flex gap-8 text-sm font-medium">
          <a
            href="https://github.com/Ezgaminglogan"
            target="_blank"
            rel="noreferrer"
            className="text-zinc-500 hover:text-white transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/logan-panucat-b319562a9/"
            target="_blank"
            rel="noreferrer"
            className="text-zinc-500 hover:text-white transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="#"
            target="_blank"
            rel="noreferrer"
            className="text-zinc-500 hover:text-white transition-colors"
          >
            Facebook
          </a>
        </div>
        <p>© {new Date().getFullYear()} Logan Panucat. Minimalist Redesign.</p>
      </footer>

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors z-50"
        >
          <ChevronUpIcon className="w-5 h-5" />
        </button>
      )}

      {selectedProject !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
          onClick={closeProjectModal}
        >
          <div
            className="relative w-full max-w-2xl bg-zinc-950 border border-zinc-900 rounded-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeProjectModal}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
            <div className="relative w-full aspect-[16/9] bg-zinc-900">
              <Image
                src={projects[selectedProject].image}
                alt={projects[selectedProject].title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-8">
              <div className="text-xs uppercase tracking-widest text-zinc-500 mb-2">
                {projects[selectedProject].type}
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">
                {projects[selectedProject].title}
              </h3>
              <p className="text-zinc-400 leading-relaxed mb-6">
                {projects[selectedProject].description}
              </p>
              <div className="flex flex-wrap gap-2">
                {projects[selectedProject].tech.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 bg-zinc-900 text-zinc-400 text-xs rounded-full"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

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
    </div>
  );
}

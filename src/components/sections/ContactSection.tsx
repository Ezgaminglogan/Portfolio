import { DocumentTextIcon, EnvelopeIcon, MapPinIcon } from "@heroicons/react/24/outline";
import SectionHeading from "@/components/ui/SectionHeading";
import CopyButton from "@/components/ui/CopyButton";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/icons";
import { AUTHOR_EMAIL, AUTHOR_GITHUB, AUTHOR_LINKEDIN, RESUME_PATH } from "@/constants/seo";
import ContactForm from "./ContactForm";

const CHANNEL =
  "flex min-h-14 items-center gap-3 rounded-md border-2 border-ink bg-white px-4 py-3 text-sm font-semibold shadow-hard-sm transition-colors hover:bg-sage";

export default function ContactSection() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="section border-t-2 border-ink bg-porcelain">
      <div className="shell grid gap-10 lg:grid-cols-[2fr_3fr]">
        <div>
          <SectionHeading
            id="contact-title"
            eyebrow="Contact"
            title="Let's work together"
            description="Open to full-stack developer roles and project work. Send a message or reach me directly."
          />
          <ul className="grid gap-3">
            <li className="flex items-center gap-2">
              <a href={`mailto:${AUTHOR_EMAIL}`} className={`${CHANNEL} min-w-0 flex-1`}>
                <EnvelopeIcon className="h-5 w-5 shrink-0 text-emerald" aria-hidden="true" />
                <span className="truncate">{AUTHOR_EMAIL}</span>
              </a>
              <CopyButton value={AUTHOR_EMAIL} label="email address" />
            </li>
            <li>
              <a href={AUTHOR_GITHUB} target="_blank" rel="noreferrer" className={CHANNEL}>
                <GitHubIcon className="h-5 w-5 shrink-0 text-ink" />
                GitHub · @Ezgaminglogan
              </a>
            </li>
            <li>
              <a href={AUTHOR_LINKEDIN} target="_blank" rel="noreferrer" className={CHANNEL}>
                <LinkedInIcon className="h-5 w-5 shrink-0 text-ink" />
                LinkedIn · Logan Panucat
              </a>
            </li>
            <li>
              <a href={RESUME_PATH} target="_blank" rel="noreferrer" className={CHANNEL}>
                <DocumentTextIcon className="h-5 w-5 shrink-0 text-emerald" aria-hidden="true" />
                Resume (PDF)
              </a>
            </li>
          </ul>
          <p className="mt-6 flex items-center gap-2 text-sm text-muted">
            <MapPinIcon className="h-4 w-4 text-emerald" aria-hidden="true" />
            Cebu, Philippines · GMT+8
          </p>
        </div>
        <div className="lg:pt-24">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

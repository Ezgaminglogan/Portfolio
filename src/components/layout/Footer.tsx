import { EnvelopeIcon, DocumentTextIcon } from "@heroicons/react/24/outline";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/icons";
import { AUTHOR_EMAIL, AUTHOR_GITHUB, AUTHOR_LINKEDIN, AUTHOR_NAME, RESUME_PATH } from "@/constants/seo";

const LINKS = [
  { label: "GitHub", href: AUTHOR_GITHUB, icon: <GitHubIcon className="h-4 w-4" /> },
  { label: "LinkedIn", href: AUTHOR_LINKEDIN, icon: <LinkedInIcon className="h-4 w-4" /> },
  { label: "Email", href: `mailto:${AUTHOR_EMAIL}`, icon: <EnvelopeIcon className="h-4 w-4" aria-hidden="true" /> },
  { label: "Resume (PDF)", href: RESUME_PATH, icon: <DocumentTextIcon className="h-4 w-4" aria-hidden="true" /> },
];

export default function Footer() {
  return (
    <footer className="on-forest border-t-2 border-ink bg-forest text-white">
      <div className="shell flex flex-col gap-8 py-12 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-lg font-bold">{AUTHOR_NAME}</p>
          <p className="mt-1 text-sm text-white/75">Full-stack developer · Cebu, Philippines</p>
        </div>
        <ul className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
          {LINKS.map(({ label, href, icon }) => (
            <li key={label}>
              <a
                href={href}
                {...(href.startsWith("http") && { target: "_blank", rel: "noreferrer" })}
                className="inline-flex min-h-11 items-center gap-2 text-white/80 hover:text-white"
              >
                {icon}
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="border-t-2 border-mint">
        <div className="shell flex items-center justify-between py-5 text-xs text-white/70">
          <p>© {new Date().getFullYear()} {AUTHOR_NAME}</p>
          <a href="#top" className="inline-flex min-h-11 items-center hover:text-white">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}

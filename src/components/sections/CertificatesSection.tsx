import Image from "next/image";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { certificates } from "@/data";
import SectionHeading from "@/components/ui/SectionHeading";
import Dialog from "@/components/ui/Dialog";

export default function CertificatesSection() {
  return (
    <section id="certificates" aria-labelledby="certificates-title" className="section">
      <div className="shell">
        <SectionHeading
          id="certificates-title"
          eyebrow="Certificates"
          title="Deployments and courses"
          description="Certificates of deployment from a client, and completed online courses."
        />
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {certificates.map((cert) => (
            <li key={cert.title} className="card card-lift reveal flex overflow-hidden sm:flex-col">
              {/* Small thumbnail beside the text on phones, full preview from sm up. */}
              <div className="relative m-3 mr-0 aspect-[4/3] w-28 shrink-0 self-start rounded-md border-2 border-ink bg-porcelain sm:m-0 sm:w-full sm:self-auto sm:rounded-none sm:border-0 sm:border-b-2">
                <Image
                  src={cert.image}
                  alt={cert.alt}
                  fill
                  sizes="(min-width: 1024px) 22rem, (min-width: 640px) 50vw, 7rem"
                  className="object-contain p-1.5 sm:p-3"
                />
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-1 p-4 sm:p-5">
                <p className="font-mono text-xs font-semibold text-muted">{cert.kind}</p>
                <h3 className="font-black leading-snug">{cert.title}</h3>
                <p className="text-sm text-muted">
                  {cert.issuer} · {cert.date}
                </p>
                <div className="mt-auto flex flex-wrap gap-2 pt-4">
                  <Dialog
                    title={cert.title}
                    triggerClassName="btn btn-outline"
                    trigger={
                      <>
                        View certificate<span className="sr-only">: {cert.title}</span>
                      </>
                    }
                  >
                    <Image
                      src={cert.image}
                      alt={cert.alt}
                      width={2000}
                      height={1400}
                      sizes="(min-width: 1024px) 56rem, 100vw"
                      className="h-auto max-h-[70vh] w-full rounded-md border-2 border-ink object-contain"
                    />
                    <p className="mt-4 text-sm text-muted">
                      {cert.issuer} · {cert.date}
                    </p>
                    {cert.note && <p className="mt-2 text-sm">{cert.note}</p>}
                  </Dialog>
                  {cert.verifyUrl && (
                    <a href={cert.verifyUrl} target="_blank" rel="noreferrer" className="btn btn-outline">
                      <ArrowTopRightOnSquareIcon className="h-4 w-4" aria-hidden="true" />
                      Verify<span className="sr-only"> {cert.title} on {cert.issuer}</span>
                    </a>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

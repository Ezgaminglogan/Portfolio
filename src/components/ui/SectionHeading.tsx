export default function SectionHeading({
  id,
  eyebrow,
  title,
  description,
}: {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="reveal mb-10 max-w-2xl sm:mb-12">
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id} className="mt-4 text-4xl font-black tracking-tight text-ink sm:text-5xl">
        {title}
      </h2>
      {description && <p className="mt-3 text-base leading-relaxed text-muted">{description}</p>}
    </div>
  );
}

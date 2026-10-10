import { techIconPath } from "@/constants/tech-icons";

export default function TechBadge({ name }: { name: string }) {
  const icon = techIconPath(name);
  return (
    <span className="badge">
      {icon && (
        /* eslint-disable-next-line @next/next/no-img-element -- tiny local SVGs */
        <img src={icon} alt="" width={14} height={14} loading="lazy" className="h-3.5 w-3.5 object-contain" />
      )}
      {name}
    </span>
  );
}

export default function Footer() {
  return (
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
  );
}

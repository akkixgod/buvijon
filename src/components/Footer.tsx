export function Footer() {
  return (
    <footer className="bg-[var(--bg-section)] border-t border-[var(--border-subtle)] py-12">
      <div className="container-1100 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-[13px] text-[var(--text-muted)]">
        <p>© 2026 Buvijon. Made with care for families in Uzbekistan.</p>
        <div className="flex gap-7">
          <a href="mailto:hello@buvijon.com" className="hover:text-[var(--text-primary)] transition-colors">Contact</a>
          <a href="https://t.me/buvijon" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text-primary)] transition-colors">Telegram</a>
        </div>
      </div>
    </footer>
  );
}

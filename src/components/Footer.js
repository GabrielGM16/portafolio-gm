import React from 'react';
import { profile, navLinks } from '../data/profile';

const Footer = () => (
  <footer className="border-t border-line bg-canvas px-6 py-12 md:px-10">
    <div className="mx-auto w-full max-w-content">
      <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="font-display text-lg font-medium tracking-tighter2 text-ink">
            {profile.name}
          </p>
          <p className="mt-1.5 max-w-md text-sm leading-snug text-ink-muted">{profile.headline}</p>
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-2">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className="text-sm text-ink-muted transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      <div className="mt-10 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ink-faint">
          © {new Date().getFullYear()} {profile.shortName} · {profile.location}
        </p>
        <div className="flex flex-wrap gap-x-5 gap-y-1">
          <a
            href="https://nexobajio.com.mx/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ink-muted transition-colors hover:text-ink"
          >
            Nexo Bajío
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ink-muted transition-colors hover:text-ink"
          >
            LinkedIn
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ink-muted transition-colors hover:text-ink"
          >
            GitHub
          </a>
          <a
            href={profile.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ink-muted transition-colors hover:text-ink"
          >
            X
          </a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;

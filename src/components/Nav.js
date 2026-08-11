import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { profile, navLinks } from '../data/profile';

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Evita el scroll del fondo mientras el menú móvil está abierto
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-5 focus:py-2 focus:text-sm focus:text-canvas"
      >
        Saltar al contenido
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-editorial ${
          scrolled
            ? 'border-b border-line bg-canvas/85 backdrop-blur-md'
            : 'border-b border-transparent'
        }`}
      >
        <div className="mx-auto flex w-full max-w-content items-center justify-between px-6 py-4 md:px-10 md:py-5">
          <a href="#inicio" className="group flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 font-mono text-[0.6875rem] tracking-[0.08em] text-ink">
              {profile.initials}
            </span>
            <span className="hidden leading-tight sm:block">
              <span className="block font-display text-sm font-medium tracking-tighter2 text-ink">
                {profile.shortName}
              </span>
              <span className="block font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-muted">
                Dirección técnica
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-7 lg:flex">
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

          <div className="flex items-center gap-3">
            <a
              href={profile.cv}
              download
              className="hidden rounded-full border border-ink/20 px-4 py-2 text-sm text-ink transition-colors hover:border-ink hover:bg-ink hover:text-canvas md:inline-block"
            >
              Currículum
            </a>
            <a
              href="#contacto"
              className="hidden rounded-full bg-ink px-5 py-2 text-sm text-canvas transition-opacity hover:opacity-85 sm:inline-block"
            >
              Hablemos
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={open}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/20 text-ink lg:hidden"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-40 bg-canvas px-6 pt-24 lg:hidden">
          <nav className="flex flex-col divide-y divide-line border-y border-line">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={() => setOpen(false)}
                className="py-5 font-display text-2xl tracking-tighter2 text-ink"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="mt-8 flex flex-col gap-3">
            <a
              href="#contacto"
              onClick={() => setOpen(false)}
              className="rounded-full bg-ink px-6 py-3 text-center text-sm text-canvas"
            >
              Hablemos
            </a>
            <a
              href={profile.cv}
              download
              onClick={() => setOpen(false)}
              className="rounded-full border border-ink/20 px-6 py-3 text-center text-sm text-ink"
            >
              Descargar currículum
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default Nav;

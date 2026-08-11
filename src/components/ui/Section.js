import React from 'react';
import Reveal from './Reveal';

/**
 * Encabezado de sección con numeración editorial (01 · TRAYECTORIA),
 * el mismo recurso que estructura el sitio de Nexo Bajío.
 */
export const SectionHeader = ({ index, eyebrow, title, lead, dark = false }) => (
  <header className="mb-14 md:mb-20">
    <Reveal>
      <div className="flex items-center gap-3">
        <span className={`font-mono text-[0.6875rem] tracking-[0.18em] ${dark ? 'text-accent-bright' : 'text-accent'}`}>
          {index}
        </span>
        <span className={`h-px w-8 ${dark ? 'bg-line-dark' : 'bg-line-strong'}`} />
        <span
          className={`font-mono text-[0.6875rem] uppercase tracking-[0.18em] ${
            dark ? 'text-canvas/65' : 'text-ink-muted'
          }`}
        >
          {eyebrow}
        </span>
      </div>
    </Reveal>

    <Reveal delay={0.06}>
      <h2
        className={`h-section mt-6 max-w-3xl ${dark ? 'text-canvas' : 'text-ink'}`}
      >
        {title}
      </h2>
    </Reveal>

    {lead && (
      <Reveal delay={0.12}>
        <p
          className={`mt-6 max-w-prose2 text-[1.0625rem] leading-relaxed md:text-lg ${
            dark ? 'text-canvas/70' : 'text-ink-muted'
          }`}
        >
          {lead}
        </p>
      </Reveal>
    )}
  </header>
);

const Section = ({ id, dark = false, className = '', children }) => (
  <section
    id={id}
    className={`px-6 py-24 md:px-10 md:py-32 ${
      dark ? 'bg-ink text-canvas' : 'bg-canvas text-ink-soft'
    } ${className}`}
  >
    <div className="mx-auto w-full max-w-content">{children}</div>
  </section>
);

export default Section;

import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import Section, { SectionHeader } from './ui/Section';
import Reveal from './ui/Reveal';
import { currentRoles, formatRange, formatDuration, monthsBetween } from '../data/profile';

const CurrentRoles = () => (
  <Section id="hoy" dark>
    <SectionHeader
      dark
      index="01"
      eyebrow="Hoy"
      title="Dos frentes, una misma disciplina."
      lead="Dirijo el desarrollo de software de una empresa industrial con 35 años de operación y, en paralelo, mi propia firma de tecnología. Son responsabilidades distintas que se alimentan de lo mismo: entender la operación antes de escribir una línea de código."
    />

    <div className="grid gap-px overflow-hidden rounded-2xl border border-line-dark bg-[rgba(226,232,240,0.16)] lg:grid-cols-2">
      {currentRoles.map((role, i) => (
        <Reveal key={role.company} delay={i * 0.1} className="bg-ink">
          <article className="flex h-full flex-col p-8 md:p-10">
            <div className="flex items-start justify-between gap-6">
              <div>
                <h3 className="font-display text-2xl font-medium tracking-tighter2 text-canvas md:text-[1.75rem]">
                  {role.company}
                </h3>
                <p className="mt-1.5 text-sm text-accent-bright">{role.role}</p>
              </div>
              {role.url && (
                <a
                  href={role.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visitar el sitio de ${role.company}`}
                  className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-line-dark text-canvas/70 transition-colors hover:border-accent-bright hover:text-accent-bright"
                >
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              )}
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-canvas/60">
              <span>{formatRange(role.start, role.end)}</span>
              <span className="text-canvas/25">·</span>
              <span>{formatDuration(monthsBetween(role.start, role.end))}</span>
            </div>
            <p className="mt-2 text-xs text-canvas/60">{role.kind}</p>

            {role.tagline && (
              <p className="mt-6 border-l border-accent-bright/40 pl-4 font-display text-sm italic text-canvas/60">
                {role.tagline}
              </p>
            )}

            <p className="mt-6 text-[0.9375rem] leading-relaxed text-canvas/75">{role.summary}</p>

            <ul className="mt-7 space-y-3 border-t border-line-dark pt-7">
              {role.duties.map((duty) => (
                <li key={duty} className="flex gap-3 text-sm text-canvas/70">
                  <span className="mt-[0.5rem] h-1 w-1 flex-shrink-0 rounded-full bg-accent-bright" />
                  <span>{duty}</span>
                </li>
              ))}
            </ul>
          </article>
        </Reveal>
      ))}
    </div>
  </Section>
);

export default CurrentRoles;

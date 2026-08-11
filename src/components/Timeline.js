import React from 'react';
import { ArrowUpRight, TrendingUp } from 'lucide-react';
import Section, { SectionHeader } from './ui/Section';
import Reveal from './ui/Reveal';
import {
  timeline,
  formatRange,
  formatDuration,
  monthsBetween,
  careerMonths,
} from '../data/profile';

const Timeline = () => (
  <Section id="trayectoria">
    <SectionHeader
      index="02"
      eyebrow="Trayectoria"
      title="Una progresión que se puede verificar."
      lead={`${formatDuration(
        careerMonths
      )} de experiencia profesional continua. En Envasadora Aguida entré como becario de sistemas y diez meses después dirigía el área de desarrollo de software: cuatro cargos en menos de un año.`}
    />

    <div className="space-y-px overflow-hidden rounded-2xl border border-line bg-line">
      {timeline.map((entry, i) => (
        <Reveal key={entry.company} delay={i * 0.06} className="bg-canvas-50">
          <article className="grid gap-8 p-8 md:grid-cols-[15rem,1fr] md:gap-12 md:p-10">
            {/* Columna de empresa */}
            <div className="md:sticky md:top-28 md:self-start">
              <div className="flex items-start gap-3">
                <h3 className="font-display text-xl font-medium tracking-tighter2 text-ink">
                  {entry.company}
                </h3>
                {entry.url && (
                  <a
                    href={entry.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visitar el sitio de ${entry.company}`}
                    className="mt-1 text-ink-faint transition-colors hover:text-ink"
                  >
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>

              <p className="mt-2 text-sm text-ink-muted">{entry.kind}</p>
              <p className="mt-0.5 text-sm text-ink-faint">{entry.location}</p>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-ink-faint">
                  {formatDuration(monthsBetween(entry.start, entry.end))}
                </span>
                {entry.current && (
                  <span className="rounded-full bg-accent-soft px-2.5 py-0.5 font-mono text-[0.625rem] uppercase tracking-[0.1em] text-accent">
                    Activo
                  </span>
                )}
              </div>

              {entry.note && (
                <p className="mt-4 inline-flex items-start gap-2 rounded-lg bg-accent-soft px-3 py-2 text-xs leading-snug text-ink-soft">
                  <TrendingUp className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" />
                  {entry.note}
                </p>
              )}
            </div>

            {/* Columna de cargos */}
            <ol className="relative border-l border-line-strong pl-7">
              {entry.positions.map((position, j) => (
                <li key={position.role} className={j === 0 ? 'pb-8 last:pb-0' : 'pb-8 pt-0 last:pb-0'}>
                  <span
                    className={`absolute -left-[4.5px] mt-2 h-2 w-2 rounded-full ${
                      j === 0 && entry.current ? 'bg-accent' : 'bg-line-strong'
                    }`}
                  />
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h4 className="font-display text-lg font-medium tracking-tighter2 text-ink">
                      {position.role}
                    </h4>
                    <span className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-ink-faint">
                      {formatRange(position.start, position.end)}
                      {' · '}
                      {formatDuration(monthsBetween(position.start, position.end))}
                    </span>
                  </div>
                  <p className="mt-2.5 max-w-prose2 text-[0.9375rem] leading-relaxed text-ink-muted">
                    {position.description}
                  </p>
                </li>
              ))}
            </ol>
          </article>
        </Reveal>
      ))}
    </div>
  </Section>
);

export default Timeline;

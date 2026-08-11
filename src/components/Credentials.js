import React from 'react';
import Section, { SectionHeader } from './ui/Section';
import Reveal from './ui/Reveal';
import { education, certifications } from '../data/profile';

const Credentials = () => (
  <Section id="formacion">
    <SectionHeader
      index="05"
      eyebrow="Formación"
      title="Base académica y certificación."
      lead="Formación continua en desarrollo de software, con una maestría en inteligencia artificial en curso y certificaciones de Cisco en redes, Linux y ciberseguridad."
    />

    <div className="grid gap-12 lg:grid-cols-[1.2fr,1fr] lg:gap-20">
      <div>
        <h3 className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-ink-faint">
          Estudios
        </h3>
        <ol className="mt-7 border-t border-line">
          {education.map((item, i) => (
            <Reveal key={item.degree} delay={i * 0.06}>
              <li className="grid gap-2 border-b border-line py-7 md:grid-cols-[1fr,9rem] md:gap-8">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h4 className="font-display text-lg font-medium tracking-tighter2 text-ink">
                      {item.degree}
                    </h4>
                    {item.status && (
                      <span className="rounded-full bg-accent-soft px-2.5 py-0.5 font-mono text-[0.625rem] uppercase tracking-[0.1em] text-accent">
                        {item.status}
                      </span>
                    )}
                  </div>
                  <p className="mt-1.5 text-sm text-ink-muted">{item.school}</p>
                </div>
                <p className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-ink-faint md:text-right">
                  {item.period}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>

      <div>
        <h3 className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-ink-faint">
          Certificaciones
        </h3>
        <ul className="mt-7 border-t border-line">
          {certifications.map((cert, i) => (
            <Reveal key={cert.name} delay={i * 0.05}>
              <li className="flex items-baseline justify-between gap-6 border-b border-line py-4">
                <div>
                  <p className="text-[0.9375rem] leading-snug text-ink-soft">{cert.name}</p>
                  <p className="mt-0.5 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-ink-faint">
                    {cert.org}
                  </p>
                </div>
                <span className="font-mono text-[0.6875rem] text-ink-faint">{cert.year}</span>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </div>
  </Section>
);

export default Credentials;

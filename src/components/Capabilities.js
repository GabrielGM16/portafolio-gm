import React from 'react';
import Section, { SectionHeader } from './ui/Section';
import Reveal from './ui/Reveal';
import { capabilities } from '../data/profile';

const Capabilities = () => (
  <Section id="capacidades">
    <SectionHeader
      index="04"
      eyebrow="Capacidades"
      title="Lo que sé hacer, agrupado por responsabilidad."
      lead="Sin porcentajes ni barras de nivel: son herramientas que uso en sistemas que hoy están en producción y de los que respondo cuando algo falla."
    />

    <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
      {capabilities.map((group, i) => (
        <Reveal key={group.area} delay={i * 0.05} className="bg-canvas-50">
          <div className="flex h-full flex-col p-8">
            <h3 className="font-display text-lg font-medium tracking-tighter2 text-ink">
              {group.area}
            </h3>
            <p className="mt-2 text-sm leading-snug text-ink-faint">{group.detail}</p>

            <ul className="mt-6 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-line-strong bg-canvas px-3 py-1.5 text-[0.8125rem] text-ink-soft"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      ))}

      {/* Celda de cierre: contexto sobre cómo trabajo, no otra lista */}
      <Reveal delay={0.3} className="bg-ink">
        <div className="flex h-full flex-col justify-between p-8">
          <p className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-accent-bright">
            Criterio de trabajo
          </p>
          <p className="mt-6 font-display text-xl font-medium leading-snug tracking-tighter2 text-canvas">
            Primero entiendo la operación. Después elijo la tecnología.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-canvas/60">
            La herramienta correcta es la que el equipo puede sostener cuando yo no estoy en la sala.
          </p>
        </div>
      </Reveal>
    </div>
  </Section>
);

export default Capabilities;

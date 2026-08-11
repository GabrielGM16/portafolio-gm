import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Minus, Plus } from 'lucide-react';
import Section, { SectionHeader } from './ui/Section';
import Reveal from './ui/Reveal';
import { cases } from '../data/profile';

const Block = ({ label, children }) => (
  <div>
    <p className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-ink-faint">{label}</p>
    <div className="mt-3 text-[0.9375rem] leading-relaxed text-ink-muted">{children}</div>
  </div>
);

const CaseRow = ({ item, isOpen, onToggle }) => (
  <article className="bg-canvas-50">
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={isOpen}
      aria-controls={`caso-${item.id}`}
      className="group flex w-full items-start gap-6 p-8 text-left md:p-10"
    >
      <span className="mt-1 font-mono text-[0.6875rem] tracking-[0.1em] text-accent">
        {item.index}
      </span>

      <span className="flex-1">
        <span className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-muted">
            {item.client}
          </span>
          <span className="rounded-full border border-line-strong px-2.5 py-0.5 font-mono text-[0.625rem] uppercase tracking-[0.1em] text-ink-faint">
            {item.status}
          </span>
        </span>

        <span className="mt-3 block font-display text-2xl font-medium leading-tight tracking-tighter2 text-ink md:text-[2rem]">
          {item.title}
        </span>

        <span className="mt-3 block font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-ink-faint">
          {item.period}
        </span>
      </span>

      <span className="mt-1 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors group-hover:border-ink group-hover:bg-ink group-hover:text-canvas">
        {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
      </span>
    </button>

    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          id={`caso-${item.id}`}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden"
        >
          <div className="border-t border-line px-8 py-9 md:px-10 md:pl-[4.75rem]">
            <div className="grid gap-9 lg:grid-cols-2 lg:gap-14">
              <div className="space-y-8">
                <Block label="Contexto">{item.context}</Block>
                <Block label="Reto">{item.challenge}</Block>
              </div>

              <div className="space-y-8">
                <Block label="Mi intervención">
                  <ul className="space-y-2.5">
                    {item.work.map((task) => (
                      <li key={task} className="flex gap-3">
                        <span className="mt-[0.5rem] h-1 w-1 flex-shrink-0 rounded-full bg-accent" />
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>
                </Block>
                <Block label="Resultado">
                  <p className="text-ink-soft">{item.outcome}</p>
                </Block>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-2 border-t border-line pt-7">
              {item.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-line-strong px-3 py-1 font-mono text-[0.6875rem] text-ink-muted"
                >
                  {tech}
                </span>
              ))}
              {item.url && (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-canvas transition-opacity hover:opacity-85"
                >
                  Ver sitio
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </article>
);

const Cases = () => {
  // El primer caso abierto por defecto: es el que mejor representa el nivel de responsabilidad.
  const [openId, setOpenId] = useState(cases[0].id);

  return (
    <Section id="casos">
      <SectionHeader
        index="03"
        eyebrow="Casos"
        title="Trabajo con nombre, cliente y resultado."
        lead="Cada caso está descrito por lo que resolvió, no por la tecnología que usó. Los sistemas bajo acuerdo de confidencialidad se presentan sin detalle interno."
      />

      <div className="space-y-px overflow-hidden rounded-2xl border border-line bg-line">
        {cases.map((item) => (
          <Reveal key={item.id}>
            <CaseRow
              item={item}
              isOpen={openId === item.id}
              onToggle={() => setOpenId(openId === item.id ? null : item.id)}
            />
          </Reveal>
        ))}
      </div>
    </Section>
  );
};

export default Cases;

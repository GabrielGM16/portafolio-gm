import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { profile, intro, metrics, careerMonths, formatDuration } from '../data/profile';

const rise = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, delay: 0.1 + i * 0.08, ease: [0.16, 1, 0.3, 1] },
  }),
};

const Hero = () => (
  <section id="inicio" className="relative overflow-hidden bg-canvas px-6 pb-20 pt-32 md:px-10 md:pb-28 md:pt-40">
    {/* Retícula tenue de fondo: estructura sin decorar */}
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-[0.55]"
      style={{
        backgroundImage:
          'linear-gradient(to right, #E2E6ED 1px, transparent 1px), linear-gradient(to bottom, #E2E6ED 1px, transparent 1px)',
        backgroundSize: '80px 80px',
        maskImage: 'radial-gradient(ellipse 90% 60% at 50% 0%, #000 30%, transparent 75%)',
        WebkitMaskImage: 'radial-gradient(ellipse 90% 60% at 50% 0%, #000 30%, transparent 75%)',
      }}
    />

    <div className="relative mx-auto w-full max-w-content">
      <motion.div variants={rise} initial="hidden" animate="show" custom={0}>
        <span className="inline-flex items-center gap-2.5 rounded-full border border-line-strong bg-canvas-50 px-4 py-1.5">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
          <span className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-ink-muted">
            {intro.eyebrow}
          </span>
        </span>
      </motion.div>

      <h1 className="mt-8 font-display text-[clamp(2.6rem,8vw,6.25rem)] font-medium leading-[0.98] tracking-tightest text-ink">
        {intro.title.map((line, i) => (
          <motion.span
            key={line}
            variants={rise}
            initial="hidden"
            animate="show"
            custom={i + 1}
            className="block"
          >
            {i === 1 ? <span className="text-ink-muted">{line}</span> : line}
          </motion.span>
        ))}
      </h1>

      <div className="mt-12 grid gap-12 md:mt-16 lg:grid-cols-[1.35fr,1fr] lg:gap-20">
        <motion.div variants={rise} initial="hidden" animate="show" custom={3}>
          <p className="max-w-prose2 text-lg leading-relaxed text-ink-soft md:text-xl">
            {intro.lead}
          </p>
          <p className="mt-5 max-w-prose2 text-base leading-relaxed text-ink-muted">
            {intro.supporting}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href="#contacto"
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm text-canvas transition-opacity hover:opacity-85"
            >
              Hablemos de tu operación
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="#casos"
              className="group inline-flex items-center gap-2 rounded-full border border-ink/20 px-6 py-3.5 text-sm text-ink transition-colors hover:border-ink"
            >
              Ver casos de trabajo
              <ArrowDownRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
            </a>
          </div>
        </motion.div>

        {/* Ficha profesional: los datos duros, sin adornos */}
        <motion.aside
          variants={rise}
          initial="hidden"
          animate="show"
          custom={4}
          className="self-start rounded-2xl border border-line bg-canvas-50 p-7"
        >
          <p className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-ink-faint">
            Ficha profesional
          </p>
          <dl className="mt-6 divide-y divide-line">
            {[
              ['Nombre', profile.name],
              ['Cargos actuales', 'Director Fundador · Jefe de Desarrollo de Software'],
              ['Experiencia', formatDuration(careerMonths)],
              ['Base', profile.location],
              ['Modalidad', profile.region],
            ].map(([term, value]) => (
              <div
                key={term}
                className="grid grid-cols-1 gap-1 py-3.5 sm:grid-cols-[7.5rem,1fr] sm:gap-4"
              >
                <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-ink-faint">
                  {term}
                </dt>
                <dd className="text-sm leading-snug text-ink-soft">{value}</dd>
              </div>
            ))}
          </dl>
        </motion.aside>
      </div>

      {/* Cifras verificables */}
      <motion.div
        variants={rise}
        initial="hidden"
        animate="show"
        custom={5}
        className="mt-20 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4 md:mt-24"
      >
        {metrics.map((metric) => (
          <div key={metric.value} className="bg-canvas-50 p-7">
            <p className="font-display text-3xl font-medium tracking-tighter2 text-ink md:text-[2.5rem]">
              {metric.value}
            </p>
            <p className="mt-3 text-sm leading-snug text-ink-muted">{metric.label}</p>
          </div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default Hero;

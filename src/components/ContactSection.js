import React from 'react';
import { ArrowUpRight, Download, Github, Linkedin, Mail, MapPin } from 'lucide-react';
import Section, { SectionHeader } from './ui/Section';
import Reveal from './ui/Reveal';
import { profile } from '../data/profile';

const paths = [
  {
    tag: 'Para tu empresa',
    title: '¿Qué está frenando a tu operación?',
    body:
      'Si tu equipo pierde tiempo en fallas recurrentes, tus procesos dependen de Excel y mensajes, o necesitas desarrollar una idea sin montar un área completa, esa conversación la atiendo desde Nexo Bajío.',
    actions: [
      {
        label: 'Plantear el problema',
        href: `mailto:${profile.email}?subject=${encodeURIComponent('Consulta para Nexo Bajío')}`,
        icon: Mail,
        primary: true,
      },
      { label: 'Conocer Nexo Bajío', href: 'https://nexobajio.com.mx/', icon: ArrowUpRight, external: true },
    ],
  },
  {
    tag: 'Para oportunidades profesionales',
    title: 'Dirección técnica y arquitectura.',
    body:
      'Si buscas a alguien que se haga responsable de un sistema completo —de la arquitectura al servidor donde corre— y que pueda hablar con dirección y con operación en el mismo día, escríbeme directo.',
    actions: [
      { label: 'Enviar correo', href: `mailto:${profile.email}`, icon: Mail, primary: true },
      { label: 'Descargar currículum', href: profile.cv, icon: Download, download: true },
    ],
  },
];

const channels = [
  { icon: Mail, label: 'Correo', value: profile.email, href: `mailto:${profile.email}` },
  { icon: MapPin, label: 'Ubicación', value: profile.location, href: null },
];

const socials = [
  { icon: Linkedin, label: 'LinkedIn', value: 'Perfil profesional', href: profile.linkedin },
  { icon: Github, label: 'GitHub', value: profile.githubHandle, href: profile.github },
];

const ContactSection = () => (
  <Section id="contacto" dark>
    <SectionHeader
      dark
      index="06"
      eyebrow="Contacto"
      title="Empecemos por una conversación."
      lead="No necesitas llegar con la solución definida. Basta con saber qué está costando tiempo o dinero hoy."
    />

    <div className="grid gap-px overflow-hidden rounded-2xl border border-line-dark bg-[rgba(226,232,240,0.16)] lg:grid-cols-2">
      {paths.map((path, i) => (
        <Reveal key={path.tag} delay={i * 0.1} className="bg-ink">
          <div className="flex h-full flex-col p-8 md:p-10">
            <p className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-accent-bright">
              {path.tag}
            </p>
            <h3 className="mt-5 font-display text-2xl font-medium leading-snug tracking-tighter2 text-canvas">
              {path.title}
            </h3>
            <p className="mt-4 flex-1 text-[0.9375rem] leading-relaxed text-canvas/65">{path.body}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              {path.actions.map((action) => (
                <a
                  key={action.label}
                  href={action.href}
                  download={action.download || undefined}
                  target={action.external ? '_blank' : undefined}
                  rel={action.external ? 'noopener noreferrer' : undefined}
                  className={`group inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm transition-all ${
                    action.primary
                      ? 'bg-accent-bright text-ink hover:opacity-85'
                      : 'border border-line-dark text-canvas hover:border-canvas/50'
                  }`}
                >
                  <action.icon className="h-4 w-4" />
                  {action.label}
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      ))}
    </div>

    {/* Datos directos */}
    <div className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-line-dark bg-[rgba(226,232,240,0.16)] sm:grid-cols-2 lg:grid-cols-4">
      {[...channels, ...socials].map((item, i) => {
        const Wrapper = item.href ? 'a' : 'div';
        return (
          <Reveal key={item.label} delay={i * 0.04} className="bg-ink">
            <Wrapper
              href={item.href || undefined}
              target={item.href && item.href.startsWith('http') ? '_blank' : undefined}
              rel={item.href && item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className={`flex h-full flex-col gap-3 p-6 ${
                item.href ? 'transition-colors hover:bg-[#122038]' : ''
              }`}
            >
              <item.icon className="h-4 w-4 text-accent-bright" />
              <div>
                <p className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-canvas/60">
                  {item.label}
                </p>
                <p className="mt-1 break-words text-sm text-canvas/85">{item.value}</p>
              </div>
            </Wrapper>
          </Reveal>
        );
      })}
    </div>
  </Section>
);

export default ContactSection;

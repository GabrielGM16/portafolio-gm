/**
 * Fuente única de verdad del contenido del sitio.
 * Las fechas se guardan como 'YYYY-MM' y las duraciones se calculan en tiempo real,
 * de modo que la trayectoria nunca queda desactualizada.
 */

const MONTHS_ABBR = [
  'ene', 'feb', 'mar', 'abr', 'may', 'jun',
  'jul', 'ago', 'sep', 'oct', 'nov', 'dic',
];

function toDate(value) {
  if (!value) return new Date();
  const [year, month] = value.split('-').map(Number);
  return new Date(year, month - 1, 1);
}

/** Meses transcurridos, contando el mes inicial y el final (mismo criterio que LinkedIn). */
export function monthsBetween(start, end) {
  const from = toDate(start);
  const to = toDate(end);
  return (to.getFullYear() - from.getFullYear()) * 12 + (to.getMonth() - from.getMonth()) + 1;
}

export function formatDuration(months) {
  if (months < 12) return `${months} ${months === 1 ? 'mes' : 'meses'}`;
  const years = Math.floor(months / 12);
  const rest = months % 12;
  const yearLabel = `${years} ${years === 1 ? 'año' : 'años'}`;
  if (rest === 0) return yearLabel;
  return `${yearLabel} ${rest} ${rest === 1 ? 'mes' : 'meses'}`;
}

function formatMonth(value) {
  const date = toDate(value);
  return `${MONTHS_ABBR[date.getMonth()]}. ${date.getFullYear()}`;
}

export function formatRange(start, end) {
  return `${formatMonth(start)} — ${end ? formatMonth(end) : 'Actualidad'}`;
}

/** Inicio de la trayectoria profesional formal (Optimen). */
export const CAREER_START = '2023-04';

export const careerMonths = monthsBetween(CAREER_START, null);
export const careerYears = Math.floor(careerMonths / 12);

export const profile = {
  name: 'Martín Gabriel Godínez Morales',
  shortName: 'Martín Godínez',
  initials: 'MG',
  headline: 'Director Fundador de Nexo Bajío · Jefe de Desarrollo de Software en Envasadora Aguida',
  location: 'Dolores Hidalgo, Guanajuato, México',
  region: 'Región Bajío · presencial y remoto',
  email: 'gmoficial16@gmail.com',
  phone: '[dato removido]',
  phoneHref: 'tel:[dato removido]',
  whatsapp: '[dato removido]',
  github: 'https://github.com/GabrielGM16',
  githubHandle: '@GabrielGM16',
  linkedin: 'https://www.linkedin.com/in/martin-gabriel-godinez-morales-39a48327b',
  twitter: 'https://x.com/GabrielGM162',
  twitterHandle: '@GabrielGM162',
  cv: '/CV_MartinGabrielGodinezMorales.pdf',
};

export const intro = {
  eyebrow: 'Dirección técnica · Región Bajío',
  title: ['Software que sostiene', 'operaciones reales.'],
  lead:
    'Soy Martín Godínez. Dirijo el desarrollo de software de Envasadora Aguida y fundé Nexo Bajío, la firma con la que llevo soporte, consultoría y desarrollo a empresas de la región.',
  supporting:
    'No entrego demos. Entrego sistemas que entran a producción, se mantienen y responden por la operación de quien los usa.',
};

export const metrics = [
  {
    value: `${careerYears}+ años`,
    label: 'De experiencia profesional continua desde 2023',
  },
  {
    value: '12+ módulos',
    label: 'Integrados y en producción en el ERP corporativo de Aguida',
  },
  {
    value: '10 meses',
    label: 'De becario de sistemas a Jefe de Desarrollo de Software',
  },
  {
    value: '2026',
    label: 'Fundación de Nexo Bajío, hoy con clientes en operación',
  },
];

export const currentRoles = [
  {
    company: 'Nexo Bajío',
    role: 'Director Fundador',
    start: '2026-02',
    end: null,
    kind: 'Firma propia · Profesional independiente',
    url: 'https://nexobajio.com.mx/',
    tagline: 'Tecnología que sí resuelve',
    summary:
      'Fundé Nexo Bajío para resolver algo que veía todos los días: empresas de la región operando con tecnología que no las acompaña. Dirijo la firma en tres frentes —soporte, consultoría y desarrollo— y respondo personalmente por cada entrega.',
    duties: [
      'Dirección de la firma y relación directa con los clientes',
      'Diagnóstico operativo y definición del plan tecnológico',
      'Desarrollo de software a la medida e integraciones',
      'Soporte remoto y en sitio, con seguimiento posterior a la entrega',
    ],
  },
  {
    company: 'Envasadora Aguida',
    role: 'Jefe de Desarrollo de Software',
    start: '2025-11',
    end: null,
    kind: 'Jornada completa · San Luis de la Paz, Gto.',
    url: 'https://aguida.com/',
    tagline: '35 años envasando bebidas y alimentos en tecnología aséptica Tetra Pak',
    summary:
      'Dirijo la arquitectura, el desarrollo y la refactorización continua del ERP corporativo que soporta la logística y la producción de una envasadora que maquila para algunas de las principales compañías de alimentos del país.',
    duties: [
      'Arquitectura y evolución del ERP corporativo',
      'Refactorización continua enfocada en logística y producción',
      'Administración del servidor Linux + Apache de producción',
      'Estándares de desarrollo, control de versiones y documentación',
    ],
  },
];

export const timeline = [
  {
    company: 'Nexo Bajío',
    kind: 'Profesional independiente',
    location: 'Dolores Hidalgo, Gto.',
    url: 'https://nexobajio.com.mx/',
    start: '2026-02',
    end: null,
    current: true,
    positions: [
      {
        role: 'Director Fundador',
        start: '2026-02',
        end: null,
        description:
          'Fundación y dirección de una firma de tecnología especializada en convertir problemas operativos en soluciones que funcionan: soporte, consultoría y desarrollo de software.',
      },
    ],
  },
  {
    company: 'Envasadora Aguida',
    kind: 'Jornada completa',
    location: 'San Luis de la Paz, Gto.',
    url: 'https://aguida.com/',
    start: '2025-01',
    end: null,
    current: true,
    note: 'Cuatro promociones en menos de un año.',
    positions: [
      {
        role: 'Jefe de Desarrollo de Software',
        start: '2025-11',
        end: null,
        description:
          'Arquitectura de software: desarrollo y refactorización continua del ERP corporativo para optimizar logística y producción.',
      },
      {
        role: 'Ingeniero Asistente de Sistemas',
        start: '2025-08',
        end: '2025-11',
        description:
          'Desarrollo de módulos del ERP y responsabilidad creciente sobre la infraestructura de sistemas.',
      },
      {
        role: 'Auxiliar de Sistemas',
        start: '2025-04',
        end: '2025-08',
        description:
          'Soporte técnico, mantenimiento de infraestructura y desarrollo de herramientas internas.',
      },
      {
        role: 'Becario de Sistemas de la Información',
        start: '2025-01',
        end: '2025-04',
        description:
          'Incorporación al área de sistemas: infraestructura de software, desarrollo front end y soporte a la operación.',
      },
    ],
  },
  {
    company: 'Luis Guerrero González y Asociados',
    kind: 'Despacho jurídico · Contrato temporal',
    location: 'Dolores Hidalgo, Gto.',
    url: null,
    start: '2024-01',
    end: null,
    current: true,
    positions: [
      {
        role: 'Consultor Técnico',
        start: '2024-01',
        end: null,
        description:
          'Resolución continua de consultas sobre tecnología, ciberseguridad, infraestructura y software, sirviendo como puente de comunicación entre el rigor técnico y el marco legal.',
      },
    ],
  },
  {
    company: 'Optimen',
    kind: 'Jornada completa',
    location: 'León, Gto.',
    url: null,
    start: '2023-04',
    end: '2023-10',
    current: false,
    positions: [
      {
        role: 'Software Developer Training',
        start: '2023-04',
        end: '2023-10',
        description:
          'Colaboración en el desarrollo, pruebas y mantenimiento de módulos web corporativos, utilizando React.js y servicios en la nube de AWS.',
      },
    ],
  },
];

export const cases = [
  {
    id: 'erp-aguida',
    index: '01',
    title: 'ERP corporativo de logística y producción',
    client: 'Envasadora Aguida',
    period: '2025 — Actualidad',
    status: 'En producción',
    url: 'https://aguida.com/',
    context:
      'Envasadora Aguida maquila bebidas y alimentos en tecnología aséptica Tetra Pak para algunas de las principales compañías de alimentos de México, además de operar su propia marca. Su logística y su producción se apoyaban en procesos dispersos entre áreas.',
    challenge:
      'Unificar en un solo sistema el control de logística, producción y procesos internos, con trazabilidad por área y reportes que sirvieran a dirección, no únicamente al equipo de sistemas.',
    work: [
      'Diseño y desarrollo del ERP desde cero, con más de 12 módulos integrados',
      'Perfiles diferenciados para dirección, administración y operación',
      'Generación de reportes en PDF con TCPDF y mPDF, y flujos internos de validación',
      'Administración del servidor Linux + Apache donde corre en producción',
      'Refactorización continua de los módulos críticos de logística y producción',
    ],
    outcome:
      'El sistema está en producción y en evolución permanente. Desde noviembre de 2025 dirijo su arquitectura como Jefe de Desarrollo de Software, después de haber entrado a la empresa como becario diez meses antes.',
    stack: ['PHP', 'React', 'MySQL', 'JavaScript', 'Apache', 'Linux', 'TCPDF / mPDF'],
  },
  {
    id: 'saniplagas',
    index: '02',
    title: 'Presencia digital y captación de clientes',
    client: 'SaniPlagas — vía Nexo Bajío',
    period: '2026 — Actualidad',
    status: 'En operación',
    url: 'https://www.saniplagas.mx/',
    context:
      'SaniPlagas ofrece control profesional de plagas para empresas, hoteles, escuelas, almacenes y residencias, con cobertura en San Miguel de Allende, Irapuato, San Luis de la Paz y Dolores Hidalgo.',
    challenge:
      'Pasar de una operación que dependía de la recomendación de boca en boca a un canal digital capaz de generar solicitudes de inspección de forma constante y medible.',
    work: [
      'Diseño y desarrollo del sitio web, construido alrededor de una sola acción: solicitar inspección',
      'Estructura por servicio, sector y sucursal, con contacto directo por WhatsApp',
      'Administración de campañas de Google Ads con seguimiento de conversiones',
      'Soporte continuo y ajustes sobre el sitio en operación',
    ],
    outcome:
      'Sitio publicado y en operación, con captación activa por formulario y WhatsApp, cobertura diferenciada por sucursal y campañas bajo administración de Nexo Bajío.',
    stack: ['React', 'Diseño de producto', 'Google Ads', 'Seguimiento de conversiones', 'Soporte continuo'],
  },
  {
    id: 'consultoria-legal',
    index: '03',
    title: 'Consultoría técnica en contexto jurídico',
    client: 'Luis Guerrero González y Asociados',
    period: '2024 — Actualidad',
    status: 'Colaboración vigente',
    url: null,
    context:
      'Despacho jurídico que requiere criterio técnico en asuntos donde la infraestructura y la evidencia digital forman parte del caso.',
    challenge:
      'Traducir material técnico —metadatos, geolocalización, información extraída de dispositivos— a un lenguaje que abogados y peritos puedan sostener dentro del marco legal, sin perder rigor.',
    work: [
      'Resolución continua de consultas sobre tecnología, ciberseguridad, infraestructura y software',
      'Análisis y revisión de información digital de dispositivos móviles',
      'Evaluación técnica de datos de geolocalización y metadatos',
      'Elaboración de reportes técnicos para uso del equipo legal',
    ],
    outcome:
      'Colaboración vigente desde enero de 2024, actuando como puente permanente entre el rigor técnico y el marco legal. Trabajo sujeto a confidencialidad.',
    stack: ['Análisis de información digital', 'Metadatos', 'Geolocalización', 'Ciberseguridad', 'Reportes técnicos'],
  },
  {
    id: 'optimen',
    index: '04',
    title: 'Módulos web corporativos, IoT y análisis geoespacial',
    client: 'Optimen',
    period: '2023',
    status: 'Concluido',
    url: null,
    context:
      'Área de innovación tecnológica enfocada en soluciones para los sectores hídrico, aeroespacial e industrial.',
    challenge:
      'Incorporarme a un equipo de desarrollo en operación y aportar en módulos corporativos y en el procesamiento de datos de campo.',
    work: [
      'Desarrollo, pruebas y mantenimiento de módulos web corporativos con React.js',
      'Trabajo con servicios en la nube de AWS e integración de dispositivos IoT',
      'Procesamiento y análisis de datos geoespaciales y vectoriales con Python',
      'Apoyo en prototipado y mejora de sistemas para clientes industriales',
    ],
    outcome:
      'Primera experiencia formal en desarrollo profesional: siete meses trabajando sobre código en uso, con prácticas de equipo, pruebas y despliegue en la nube.',
    stack: ['React', 'Python', 'AWS', 'IoT', 'Análisis geoespacial'],
  },
];

export const capabilities = [
  {
    area: 'Dirección técnica',
    detail: 'Cómo se decide y se sostiene un sistema en el tiempo.',
    items: [
      'Arquitectura de software',
      'Definición de alcance y prioridades',
      'Estándares y documentación',
      'Refactorización de sistemas en producción',
      'Interlocución con dirección y áreas operativas',
    ],
  },
  {
    area: 'Backend y datos',
    detail: 'La capa donde vive la operación.',
    items: ['PHP', 'MySQL / MariaDB', 'Node.js', 'Express', 'Composer', 'REST APIs', 'TCPDF / mPDF / PHPOffice'],
  },
  {
    area: 'Frontend',
    detail: 'Interfaces pensadas para quien trabaja con ellas todos los días.',
    items: ['React', 'Next.js', 'JavaScript', 'HTML5 / CSS3', 'Tailwind CSS', 'Bootstrap', 'Diseño responsivo', 'PWA'],
  },
  {
    area: 'Infraestructura y operación',
    detail: 'Los sistemas que dirijo también los administro.',
    items: ['Linux', 'Apache', 'Administración de servidores', 'Git / GitHub', 'Vercel', 'AWS', 'Respaldos y continuidad'],
  },
  {
    area: 'En formación',
    detail: 'Hacia dónde estoy llevando mi práctica.',
    items: ['Inteligencia artificial aplicada', 'Python', 'Ciberseguridad', 'Automatización de procesos'],
  },
];

export const education = [
  {
    degree: 'Maestría en Inteligencia Artificial',
    school: 'Universidad Virtual del Estado de Guanajuato (UVEG)',
    period: '2026 — 2027',
    status: 'En curso',
  },
  {
    degree: 'Ingeniería en Desarrollo y Gestión de Software',
    school: 'Universidad Tecnológica del Norte de Guanajuato',
    period: '2023 — 2025',
    status: null,
  },
  {
    degree: 'TSU en Desarrollo de Software Multiplataforma',
    school: 'Universidad Tecnológica del Norte de Guanajuato',
    period: '2021 — 2023',
    status: null,
  },
];

export const certifications = [
  { name: 'Ciberseguridad Esencial', org: 'Cisco', year: '2024' },
  { name: 'Introducción a la Ciberseguridad', org: 'Cisco', year: '2024' },
  { name: 'Introducción a las Redes', org: 'Cisco', year: '2023' },
  { name: 'Curso de Linux', org: 'Cisco', year: '2023' },
  { name: 'IT Essentials: PC Hardware and Software', org: 'Cisco', year: '2022' },
];

export const navLinks = [
  { id: 'hoy', label: 'Hoy' },
  { id: 'trayectoria', label: 'Trayectoria' },
  { id: 'casos', label: 'Casos' },
  { id: 'capacidades', label: 'Capacidades' },
  { id: 'formacion', label: 'Formación' },
  { id: 'contacto', label: 'Contacto' },
];

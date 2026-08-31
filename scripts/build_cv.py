# -*- coding: utf-8 -*-
"""
Genera el CV de Martín Gabriel Godínez Morales en español e inglés.
Bilingual CV generator — Spanish and English share one layout.

    python scripts/build_cv.py          # ambos / both
    python scripts/build_cv.py es
    python scripts/build_cv.py en

Misma identidad visual que el portafolio: marino #0A1628, acento #1D4ED8.
Las duraciones se calculan al vuelo desde fechas 'YYYY-MM' con el mismo
criterio inclusivo que usa LinkedIn, así que el CV nunca contradice al perfil.
"""
import sys
from datetime import date

from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_JUSTIFY
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import cm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    BaseDocTemplate, Flowable, Frame, KeepTogether, NextPageTemplate,
    PageTemplate, Paragraph, Spacer,
)

# --------------------------------------------------------------------------
# Identidad visual
# --------------------------------------------------------------------------
INK       = HexColor('#0A1628')
INK_SOFT  = HexColor('#1B2A41')
INK_MUTED = HexColor('#4A5A73')
INK_FAINT = HexColor('#5F6F87')
ACCENT    = HexColor('#1D4ED8')
ACCENT_BR = HexColor('#7FA8FF')
LINE      = HexColor('#E2E6ED')
WHITE     = HexColor('#FFFFFF')
HEAD_DIM  = HexColor('#B8C4D6')

# Corbel y Consolas ya vienen con Windows y son lo más cercano a DM Sans e
# IBM Plex Mono del portafolio: así el build no depende de ninguna descarga.
F = 'C:/Windows/Fonts/'
pdfmetrics.registerFont(TTFont('Body',   F + 'corbel.ttf'))
pdfmetrics.registerFont(TTFont('Body-B', F + 'corbelb.ttf'))
pdfmetrics.registerFont(TTFont('Body-I', F + 'corbeli.ttf'))
pdfmetrics.registerFont(TTFont('Mono',   F + 'consola.ttf'))
pdfmetrics.registerFont(TTFont('Mono-B', F + 'consolab.ttf'))
pdfmetrics.registerFontFamily('Body', normal='Body', bold='Body-B', italic='Body-I')

PAGE_W, PAGE_H = letter
MARGIN = 1.55 * cm
HEADER_H = 3.45 * cm
CONTENT_W = PAGE_W - 2 * MARGIN
HOY = date.today()

# --------------------------------------------------------------------------
# Fechas y duraciones
# --------------------------------------------------------------------------
MESES = {
    'es': ['ene', 'feb', 'mar', 'abr', 'may', 'jun',
           'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
    'en': ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
           'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
}


def _d(v):
    if v is None:
        return HOY
    y, m = map(int, v.split('-'))
    return date(y, m, 1)


def meses(ini, fin=None):
    """Meses transcurridos contando el inicial y el final, como LinkedIn."""
    a, b = _d(ini), _d(fin)
    return (b.year - a.year) * 12 + (b.month - a.month) + 1


def dur(n, lang):
    if lang == 'en':
        if n < 12:
            return f'{n} mo' if n == 1 else f'{n} mos'
        y, r = divmod(n, 12)
        s = f'{y} yr' if y == 1 else f'{y} yrs'
        return s if r == 0 else f'{s} {r} mo' if r == 1 else f'{s} {r} mos'
    if n < 12:
        return f'{n} {"mes" if n == 1 else "meses"}'
    y, r = divmod(n, 12)
    s = f'{y} {"año" if y == 1 else "años"}'
    return s if r == 0 else f'{s} {r} {"mes" if r == 1 else "meses"}'


def mes_txt(v, lang):
    d = _d(v)
    punto = '.' if lang == 'es' else ''
    return f'{MESES[lang][d.month - 1]}{punto} {d.year}'


def rango(ini, fin, lang):
    hoy_txt = 'Actualidad' if lang == 'es' else 'Present'
    fin_txt = hoy_txt if fin is None else mes_txt(fin, lang)
    return f'{mes_txt(ini, lang)} — {fin_txt}'


CARRERA_INICIO = '2023-04'

# --------------------------------------------------------------------------
# Estilos
# --------------------------------------------------------------------------
def S(name, **kw):
    base = dict(fontName='Body', fontSize=9.1, leading=12.6, textColor=INK_SOFT)
    base.update(kw)
    return ParagraphStyle(name, **base)


st_perfil  = S('perfil', fontSize=9.4, leading=13.6, alignment=TA_JUSTIFY)
st_rol     = S('rol', fontName='Body-B', fontSize=11.2, leading=13, textColor=INK)
st_empresa = S('empresa', fontName='Body-B', fontSize=9.6, leading=12, textColor=ACCENT)
st_meta    = S('meta', fontName='Mono', fontSize=6.9, leading=9.4, textColor=INK_FAINT)
st_bullet  = S('bullet', textColor=INK_MUTED, leftIndent=9, firstLineIndent=-9)
st_sub     = S('sub', fontName='Body-B', fontSize=9.3, leading=12)
st_body    = S('body', textColor=INK_MUTED)
st_tag     = S('tag', fontSize=8.8, leading=12.2, textColor=INK_MUTED)


class SectionTitle(Flowable):
    """Encabezado numerado, el mismo recurso editorial que el portafolio."""

    def __init__(self, num, text):
        Flowable.__init__(self)
        self.num, self.text = num, text
        self.height = 0.86 * cm

    def wrap(self, aw, ah):
        return (CONTENT_W, self.height)

    def draw(self):
        c = self.canv
        y = 0.30 * cm
        c.setFont('Mono-B', 7.2)
        c.setFillColor(ACCENT)
        c.drawString(0, y, self.num)
        c.setFont('Mono-B', 7.8)
        c.setFillColor(INK)
        c.drawString(0.86 * cm, y, self.text.upper())
        tw = c.stringWidth(self.text.upper(), 'Mono-B', 7.8) + 0.86 * cm
        c.setStrokeColor(LINE)
        c.setLineWidth(0.7)
        c.line(tw + 0.28 * cm, y + 0.09 * cm, CONTENT_W, y + 0.09 * cm)


def bullet(txt):
    return Paragraph(f'<font color="#7FA8FF">\u2022</font>&nbsp;&nbsp;{txt}', st_bullet)


# --------------------------------------------------------------------------
# Contenido
# --------------------------------------------------------------------------
NOMBRE = 'Martín Gabriel Godínez Morales'
CONTACTO_1 = 'gmoficial16@gmail.com   ·   {ciudad}'
CONTACTO_2 = ('portafolio-gm-ogvv.onrender.com   ·   '
              'linkedin.com/in/martin-gabriel-godinez-morales-39a48327b   ·   '
              'github.com/GabrielGM16')

C = {}

C['es'] = dict(
    salida='CV_MartinGabrielGodinezMorales_2026.pdf',
    cargo='Director Fundador · Jefe de Desarrollo de Software',
    ciudad='Dolores Hidalgo, Guanajuato, México',
    pie_pagina='PÁGINA', pie_act='ACTUALIZADO',
    sec=['Perfil', 'Experiencia profesional', 'Casos destacados',
         'Capacidades técnicas', 'Formación académica', 'Certificaciones'],
    previos='Cargos previos en la misma empresa',
    trayectoria='TRAYECTORIA EN LA EMPRESA: ',
    resultado='Resultado:',
    perfil=(
        'Director Fundador de <b>Nexo Bajío</b> y Jefe de Desarrollo de Software en '
        '<b>Envasadora Aguida</b>. {exp} de experiencia profesional continua diseñando, '
        'construyendo y operando sistemas que sostienen la operación de empresas industriales '
        'y de servicios: arquitectura de software, sistemas ERP, infraestructura Linux y '
        'desarrollo a la medida. En Envasadora Aguida pasé de becario de sistemas a jefe del '
        'área de desarrollo en diez meses. Respondo por los sistemas que dirijo, desde la '
        'arquitectura hasta el servidor donde corren. Cursando Maestría en Inteligencia Artificial.'),
    experiencia=[
        dict(rol='Director Fundador', empresa='Nexo Bajío',
             extra='Firma propia · Profesional independiente', lugar='Dolores Hidalgo, Gto.',
             ini='2026-02', fin=None,
             puntos=[
                 'Fundación y dirección de una firma de tecnología especializada en convertir '
                 'problemas operativos en soluciones funcionales: soporte, consultoría y desarrollo.',
                 'Dirección comercial y relación directa con clientes; diagnóstico operativo y '
                 'definición del plan tecnológico.',
                 'Desarrollo de software a la medida, integraciones y administración de presencia '
                 'digital de clientes.']),
        dict(rol='Jefe de Desarrollo de Software', empresa='Envasadora Aguida',
             extra='Jornada completa · Envasado aséptico Tetra Pak',
             lugar='San Luis de la Paz, Gto.', ini='2025-11', fin=None, grupo='2025-01',
             puntos=[
                 'Arquitectura, desarrollo y refactorización continua del <b>ERP corporativo</b> '
                 'que soporta la logística y la producción de la planta.',
                 'Diseño del sistema desde cero: más de 12 módulos integrados, perfiles '
                 'diferenciados para dirección, administración y operación.',
                 'Administración del servidor Linux + Apache de producción; estándares de '
                 'desarrollo, control de versiones y documentación.'],
             previos=[('Ingeniero Asistente de Sistemas', '2025-08', '2025-11'),
                      ('Auxiliar de Sistemas', '2025-04', '2025-08'),
                      ('Becario de Sistemas de la Información', '2025-01', '2025-04')]),
        dict(rol='Consultor Técnico', empresa='Luis Guerrero González y Asociados',
             extra='Despacho jurídico · Contrato temporal', lugar='Dolores Hidalgo, Gto.',
             ini='2024-01', fin=None,
             puntos=[
                 'Resolución continua de consultas sobre tecnología, ciberseguridad, '
                 'infraestructura y software, sirviendo como puente entre el rigor técnico y '
                 'el marco legal.',
                 'Análisis y revisión de información digital de dispositivos móviles; evaluación '
                 'técnica de datos de geolocalización y metadatos.',
                 'Elaboración de reportes técnicos para uso del equipo legal. Trabajo sujeto a '
                 'confidencialidad.']),
        dict(rol='Software Developer Training', empresa='Optimen',
             extra='Jornada completa', lugar='León, Gto.', ini='2023-04', fin='2023-10',
             puntos=[
                 'Desarrollo, pruebas y mantenimiento de módulos web corporativos con React.js '
                 'y servicios en la nube de AWS.',
                 'Procesamiento y análisis de datos geoespaciales y vectoriales con Python para '
                 'los sectores hídrico y aeroespacial.',
                 'Apoyo en prototipado y mejora de sistemas para clientes del sector industrial.']),
    ],
    casos=[
        ('ERP corporativo de logística y producción', 'Envasadora Aguida',
         '2025 — Actualidad', 'En producción',
         'Sistema diseñado y construido desde cero para unificar el control de logística, '
         'producción y procesos internos de una planta de envasado aséptico, con trazabilidad '
         'por área y reportes de dirección. {res} en producción y en refactorización continua; '
         'dirijo su arquitectura desde noviembre de 2025.',
         'PHP · React · MySQL · Apache · Linux · TCPDF / mPDF'),
        ('Presencia digital y captación de clientes', 'SaniPlagas — vía Nexo Bajío',
         '2026 — Actualidad', 'En operación',
         'Sitio web y campañas de Google Ads con seguimiento de conversiones para una empresa '
         'de control de plagas con cobertura en cuatro ciudades del Bajío, construido alrededor '
         'de una sola acción: solicitar inspección. {res} captación activa por formulario y '
         'WhatsApp, con campañas bajo administración continua.',
         'React · Google Ads · Analítica y conversiones · Soporte continuo'),
        ('Consultoría técnica en contexto jurídico', 'Luis Guerrero González y Asociados',
         '2024 — Actualidad', 'Colaboración vigente',
         'Traducción de material técnico —metadatos, geolocalización, información de '
         'dispositivos— a un lenguaje que abogados y peritos puedan sostener dentro del marco '
         'legal, sin perder rigor. {res} colaboración continua desde 2024. Trabajo sujeto a '
         'confidencialidad.',
         'Análisis de información digital · Metadatos · Ciberseguridad · Reportes técnicos'),
    ],
    capacidades=[
        ('Dirección técnica',
         'Arquitectura de software · Definición de alcance y prioridades · Refactorización de '
         'sistemas en producción · Estándares y documentación · Interlocución con dirección y '
         'áreas operativas'),
        ('Backend y datos',
         'PHP · MySQL / MariaDB · Node.js · Express · Composer · REST APIs · TCPDF / mPDF / PHPOffice'),
        ('Frontend',
         'React · Next.js · JavaScript · HTML5 / CSS3 · Tailwind CSS · Bootstrap · Diseño responsivo · PWA'),
        ('Infraestructura',
         'Linux · Apache · Administración de servidores · Git / GitHub · Vercel · AWS · Respaldos y continuidad'),
        ('En formación',
         'Inteligencia artificial aplicada · Python · Ciberseguridad · Automatización de procesos'),
    ],
    formacion=[
        ('Maestría en Inteligencia Artificial',
         'Universidad Virtual del Estado de Guanajuato (UVEG)', '2026 — 2027', 'En curso'),
        ('Ingeniería en Desarrollo y Gestión de Software',
         'Universidad Tecnológica del Norte de Guanajuato', '2023 — 2025', None),
        ('TSU en Desarrollo de Software Multiplataforma',
         'Universidad Tecnológica del Norte de Guanajuato', '2021 — 2023', None),
    ],
    certs=[('Ciberseguridad Esencial', 'Cisco', '2024'),
           ('Introducción a la Ciberseguridad', 'Cisco', '2024'),
           ('Introducción a las Redes', 'Cisco', '2023'),
           ('Curso de Linux', 'Cisco', '2023'),
           ('IT Essentials: PC Hardware and Software', 'Cisco', '2022')],
)

C['en'] = dict(
    salida='CV_MartinGabrielGodinezMorales_2026_EN.pdf',
    cargo='Founder & Director · Head of Software Development',
    ciudad='Dolores Hidalgo, Guanajuato, Mexico',
    pie_pagina='PAGE', pie_act='UPDATED',
    sec=['Profile', 'Professional experience', 'Selected work',
         'Technical capabilities', 'Education', 'Certifications'],
    previos='Previous roles at the same company',
    trayectoria='TOTAL TENURE: ',
    resultado='Outcome:',
    perfil=(
        'Founder & Director of <b>Nexo Bajío</b> and Head of Software Development at '
        '<b>Envasadora Aguida</b>. {exp} of continuous professional experience designing, '
        'building and operating the systems that keep industrial and service companies running: '
        'software architecture, ERP systems, Linux infrastructure and custom development. At '
        'Envasadora Aguida I went from systems intern to head of the development area in ten '
        'months. I am accountable for the systems I lead, from the architecture down to the '
        'server they run on. Currently pursuing a Master\'s degree in Artificial Intelligence.'),
    experiencia=[
        dict(rol='Founder & Director', empresa='Nexo Bajío',
             extra='Own firm · Self-employed', lugar='Dolores Hidalgo, Mexico',
             ini='2026-02', fin=None,
             puntos=[
                 'Founded and lead a technology firm that turns operational problems into working '
                 'solutions: support, consulting and software development.',
                 'Business development and direct client relationships; operational assessment and '
                 'definition of the technology roadmap.',
                 'Custom software development, systems integration and management of client '
                 'digital presence.']),
        dict(rol='Head of Software Development', empresa='Envasadora Aguida',
             extra='Full-time · Tetra Pak aseptic packaging', lugar='San Luis de la Paz, Mexico',
             ini='2025-11', fin=None, grupo='2025-01',
             puntos=[
                 'Architecture, development and continuous refactoring of the <b>corporate ERP</b> '
                 'that supports the plant\'s logistics and production.',
                 'Designed the system from scratch: 12+ integrated modules with distinct profiles '
                 'for management, administration and operations.',
                 'Administration of the production Linux + Apache server; development standards, '
                 'version control and documentation.'],
             previos=[('Assistant Systems Engineer', '2025-08', '2025-11'),
                      ('Systems Assistant', '2025-04', '2025-08'),
                      ('Information Systems Intern', '2025-01', '2025-04')]),
        dict(rol='Technical Consultant', empresa='Luis Guerrero González y Asociados',
             extra='Law firm · Fixed-term contract', lugar='Dolores Hidalgo, Mexico',
             ini='2024-01', fin=None,
             puntos=[
                 'Ongoing advisory on technology, cybersecurity, infrastructure and software, '
                 'acting as the bridge between technical rigour and the legal framework.',
                 'Analysis and review of digital information from mobile devices; technical '
                 'assessment of geolocation data and metadata.',
                 'Preparation of technical reports for the legal team. Work subject to '
                 'confidentiality.']),
        dict(rol='Software Developer Trainee', empresa='Optimen',
             extra='Full-time', lugar='León, Mexico', ini='2023-04', fin='2023-10',
             puntos=[
                 'Development, testing and maintenance of corporate web modules using React.js '
                 'and AWS cloud services.',
                 'Processing and analysis of geospatial and vector data with Python for the water '
                 'and aerospace sectors.',
                 'Support in prototyping and system improvement for industrial clients.']),
    ],
    casos=[
        ('Corporate ERP for logistics and production', 'Envasadora Aguida',
         '2025 — Present', 'In production',
         'System designed and built from scratch to unify logistics, production and internal '
         'process control at an aseptic packaging plant, with traceability by area and reporting '
         'for management. {res} live in production and under continuous refactoring; I have led '
         'its architecture since November 2025.',
         'PHP · React · MySQL · Apache · Linux · TCPDF / mPDF'),
        ('Digital presence and client acquisition', 'SaniPlagas — via Nexo Bajío',
         '2026 — Present', 'Live',
         'Website and Google Ads campaigns with conversion tracking for a pest control company '
         'operating across four cities in the Bajío region, built around a single action: '
         'booking an inspection. {res} active acquisition through the form and WhatsApp, with '
         'campaigns under ongoing management.',
         'React · Google Ads · Analytics & conversions · Ongoing support'),
        ('Technical consulting in a legal context', 'Luis Guerrero González y Asociados',
         '2024 — Present', 'Ongoing',
         'Translating technical material —metadata, geolocation, device information— into '
         'language that lawyers and expert witnesses can defend within the legal framework, '
         'without losing rigour. {res} ongoing collaboration since 2024. Work subject to '
         'confidentiality.',
         'Digital information analysis · Metadata · Cybersecurity · Technical reporting'),
    ],
    capacidades=[
        ('Technical leadership',
         'Software architecture · Scope and priority definition · Refactoring live systems · '
         'Standards and documentation · Communication with management and operations'),
        ('Backend & data',
         'PHP · MySQL / MariaDB · Node.js · Express · Composer · REST APIs · TCPDF / mPDF / PHPOffice'),
        ('Frontend',
         'React · Next.js · JavaScript · HTML5 / CSS3 · Tailwind CSS · Bootstrap · Responsive design · PWA'),
        ('Infrastructure',
         'Linux · Apache · Server administration · Git / GitHub · Vercel · AWS · Backups and continuity'),
        ('Currently learning',
         'Applied artificial intelligence · Python · Cybersecurity · Process automation'),
    ],
    formacion=[
        ("Master's Degree in Artificial Intelligence",
         'Universidad Virtual del Estado de Guanajuato (UVEG)', '2026 — 2027', 'In progress'),
        ('B.Eng. in Software Development and Management',
         'Universidad Tecnológica del Norte de Guanajuato', '2023 — 2025', None),
        ('Advanced Technical Degree (TSU) in Multiplatform Software Development',
         'Universidad Tecnológica del Norte de Guanajuato', '2021 — 2023', None),
    ],
    certs=[('Cybersecurity Essentials', 'Cisco', '2024'),
           ('Introduction to Cybersecurity', 'Cisco', '2024'),
           ('Introduction to Networks', 'Cisco', '2023'),
           ('Linux Course', 'Cisco', '2023'),
           ('IT Essentials: PC Hardware and Software', 'Cisco', '2022')],
)


# --------------------------------------------------------------------------
# Construcción
# --------------------------------------------------------------------------
def build(lang, outdir='public'):
    d = C[lang]
    cargo = d['cargo']
    contacto_1 = CONTACTO_1.format(ciudad=d['ciudad'])

    def cabecera(c, doc):
        c.saveState()
        c.setFillColor(INK)
        c.rect(0, PAGE_H - HEADER_H, PAGE_W, HEADER_H, stroke=0, fill=1)
        c.setFillColor(ACCENT)
        c.rect(0, PAGE_H - HEADER_H, PAGE_W, 0.09 * cm, stroke=0, fill=1)
        c.setFillColor(WHITE)
        c.setFont('Body-B', 20.5)
        c.drawString(MARGIN, PAGE_H - 1.42 * cm, NOMBRE)
        c.setFillColor(ACCENT_BR)
        c.setFont('Mono', 8.0)
        c.drawString(MARGIN, PAGE_H - 1.97 * cm, cargo.upper())
        c.setFillColor(HEAD_DIM)
        c.setFont('Body', 8.2)
        c.drawString(MARGIN, PAGE_H - 2.55 * cm, contacto_1)
        c.setFont('Body', 7.5)
        c.drawString(MARGIN, PAGE_H - 3.02 * cm, CONTACTO_2)
        c.restoreState()
        pie(c, doc)

    def pie(c, doc):
        c.saveState()
        c.setStrokeColor(LINE)
        c.setLineWidth(0.7)
        c.line(MARGIN, 1.15 * cm, PAGE_W - MARGIN, 1.15 * cm)
        c.setFillColor(INK_FAINT)
        c.setFont('Mono', 6.8)
        c.drawString(MARGIN, 0.78 * cm, NOMBRE.upper())
        sello = (f"{d['pie_pagina']} {doc.page}   ·   {d['pie_act']} "
                 f"{MESES[lang][HOY.month - 1].upper()}{'.' if lang == 'es' else ''} {HOY.year}")
        c.drawRightString(PAGE_W - MARGIN, 0.78 * cm, sello)
        c.restoreState()

    def encabezado_simple(c, doc):
        c.saveState()
        c.setFillColor(INK)
        c.rect(0, PAGE_H - 0.95 * cm, PAGE_W, 0.95 * cm, stroke=0, fill=1)
        c.setFillColor(WHITE)
        c.setFont('Body-B', 8.6)
        c.drawString(MARGIN, PAGE_H - 0.62 * cm, NOMBRE)
        c.setFillColor(ACCENT_BR)
        c.setFont('Mono', 6.8)
        c.drawRightString(PAGE_W - MARGIN, PAGE_H - 0.60 * cm, cargo.upper())
        c.restoreState()
        pie(c, doc)

    story = [NextPageTemplate('resto')]

    # 01 Perfil
    story.append(SectionTitle('01', d['sec'][0]))
    story.append(Paragraph(
        d['perfil'].format(exp=dur(meses(CARRERA_INICIO), lang)), st_perfil))
    story.append(Spacer(1, 0.42 * cm))

    # 02 Experiencia
    story.append(SectionTitle('02', d['sec'][1]))
    for e in d['experiencia']:
        bloque = [Paragraph(e['rol'], st_rol), Spacer(1, 0.05 * cm)]
        bloque.append(Paragraph(
            f"{e['empresa']} &nbsp;<font color='#8794AB' size='8'>|</font>&nbsp; "
            f"<font color='#4A5A73' size='8.6'>{e['extra']}</font>", st_empresa))
        bloque.append(Spacer(1, 0.09 * cm))

        meta = (f"{rango(e['ini'], e['fin'], lang)}  ·  "
                f"{dur(meses(e['ini'], e['fin']), lang)}  ·  {e['lugar'].upper()}")
        if e.get('grupo'):
            meta += f"    [ {d['trayectoria']}{dur(meses(e['grupo']), lang)} ]"
        bloque.append(Paragraph(meta.upper(), st_meta))
        bloque.append(Spacer(1, 0.16 * cm))
        bloque.extend(bullet(p) for p in e['puntos'])

        if e.get('previos'):
            bloque.append(Spacer(1, 0.18 * cm))
            bloque.append(Paragraph(d['previos'], st_sub))
            bloque.append(Spacer(1, 0.06 * cm))
            for rol, i, f2 in e['previos']:
                bloque.append(Paragraph(
                    f"<font color='#7FA8FF'>\u2022</font>&nbsp;&nbsp;<b>{rol}</b> "
                    f"<font face='Mono' size='7' color='#5F6F87'>"
                    f"{rango(i, f2, lang).upper()} · {dur(meses(i, f2), lang).upper()}</font>",
                    st_bullet))

        bloque.append(Spacer(1, 0.34 * cm))
        story.append(KeepTogether(bloque))

    # 03 Casos
    casos = [SectionTitle('03', d['sec'][2])]
    for titulo, cliente, periodo, estado, desc, stack in d['casos']:
        casos.append(KeepTogether([
            Paragraph(f"<font face='Body-B' color='#0A1628' size='10.2'>{titulo}</font>", st_tag),
            Spacer(1, 0.04 * cm),
            Paragraph(
                f"<font face='Body-B' color='#1D4ED8' size='9'>{cliente}</font>"
                f"<font face='Mono' color='#5F6F87' size='6.9'>&nbsp;&nbsp;"
                f"{periodo.upper()} · {estado.upper()}</font>", st_tag),
            Spacer(1, 0.09 * cm),
            Paragraph(desc.format(res=f"<b>{d['resultado']}</b>"), st_body),
            Spacer(1, 0.06 * cm),
            Paragraph(f"<font face='Mono' color='#5F6F87' size='7'>{stack.upper()}</font>", st_tag),
            Spacer(1, 0.30 * cm),
        ]))
    story.append(KeepTogether(casos[:2]))
    story.extend(casos[2:])
    story.append(Spacer(1, 0.06 * cm))

    # 04 Capacidades
    cap = [SectionTitle('04', d['sec'][3])]
    for titulo, lista in d['capacidades']:
        cap.append(Paragraph(
            f"<font face='Body-B' color='#1B2A41'>{titulo}</font>"
            f"<font color='#8794AB'>&nbsp;&nbsp;—&nbsp;&nbsp;</font>{lista}", st_tag))
        cap.append(Spacer(1, 0.11 * cm))
    story.append(KeepTogether(cap))
    story.append(Spacer(1, 0.30 * cm))

    # 05 Formación
    form = [SectionTitle('05', d['sec'][4])]
    for grado, escuela, periodo, estado in d['formacion']:
        et = (f"&nbsp;&nbsp;<font face='Mono' size='6.6' color='#1D4ED8'>[{estado.upper()}]</font>"
              if estado else '')
        form.append(Paragraph(
            f"<font face='Body-B' color='#0A1628' size='9.5'>{grado}</font>{et}<br/>"
            f"<font color='#4A5A73' size='8.7'>{escuela}</font>"
            f"<font face='Mono' color='#5F6F87' size='7'>&nbsp;&nbsp;·&nbsp;&nbsp;{periodo}</font>",
            st_tag))
        form.append(Spacer(1, 0.16 * cm))
    story.append(KeepTogether(form))
    story.append(Spacer(1, 0.24 * cm))

    # 06 Certificaciones
    cert = [SectionTitle('06', d['sec'][5])]
    for nombre, org, anio in d['certs']:
        cert.append(Paragraph(
            f"<font color='#7FA8FF'>\u2022</font>&nbsp;&nbsp;<font color='#1B2A41'>{nombre}</font>"
            f"<font face='Mono' color='#5F6F87' size='7'>&nbsp;&nbsp;{org.upper()} · {anio}</font>",
            st_tag))
        cert.append(Spacer(1, 0.055 * cm))
    story.append(KeepTogether(cert))

    salida = f"{outdir}/{d['salida']}"
    doc = BaseDocTemplate(
        salida, pagesize=letter,
        leftMargin=MARGIN, rightMargin=MARGIN,
        topMargin=MARGIN, bottomMargin=1.45 * cm,
        title=f'{"CV" if lang == "es" else "Résumé"} — {NOMBRE}',
        author=NOMBRE, subject=cargo,
        keywords=('software architecture, ERP, PHP, React, MySQL, Linux, '
                  'technical leadership, Nexo Bajío'),
        creator='',
    )
    doc.addPageTemplates([
        PageTemplate(id='primera', frames=[Frame(
            MARGIN, 1.45 * cm, CONTENT_W, PAGE_H - HEADER_H - 1.90 * cm, id='p1',
            leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0)],
            onPage=cabecera),
        PageTemplate(id='resto', frames=[Frame(
            MARGIN, 1.45 * cm, CONTENT_W, PAGE_H - 3.10 * cm, id='pn',
            leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0)],
            onPage=encabezado_simple),
    ])
    doc.build(story)
    print(f'OK [{lang}] -> {salida}')
    return salida


if __name__ == '__main__':
    idiomas = sys.argv[1:] or ['es', 'en']
    for l in idiomas:
        build(l)

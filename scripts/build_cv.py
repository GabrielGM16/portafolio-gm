# -*- coding: utf-8 -*-
"""
Genera el CV de Martín Gabriel Godínez Morales en PDF.
Misma identidad visual que el portafolio: marino #0A1628, acento #1D4ED8.
Las duraciones se calculan al vuelo con el mismo criterio que LinkedIn.
"""
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
# Identidad
# --------------------------------------------------------------------------
INK        = HexColor('#0A1628')
INK_SOFT   = HexColor('#1B2A41')
INK_MUTED  = HexColor('#4A5A73')
INK_FAINT  = HexColor('#5F6F87')
ACCENT     = HexColor('#1D4ED8')
ACCENT_BR  = HexColor('#7FA8FF')
LINE       = HexColor('#E2E6ED')
WHITE      = HexColor('#FFFFFF')

F = 'C:/Windows/Fonts/'
pdfmetrics.registerFont(TTFont('Body',      F + 'corbel.ttf'))
pdfmetrics.registerFont(TTFont('Body-B',    F + 'corbelb.ttf'))
pdfmetrics.registerFont(TTFont('Body-I',    F + 'corbeli.ttf'))
pdfmetrics.registerFont(TTFont('Mono',      F + 'consola.ttf'))
pdfmetrics.registerFont(TTFont('Mono-B',    F + 'consolab.ttf'))
pdfmetrics.registerFontFamily('Body', normal='Body', bold='Body-B', italic='Body-I')

PAGE_W, PAGE_H = letter
MARGIN = 1.55 * cm
HEADER_H = 3.45 * cm
CONTENT_W = PAGE_W - 2 * MARGIN

# --------------------------------------------------------------------------
# Duraciones
# --------------------------------------------------------------------------
MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun',
         'jul', 'ago', 'sep', 'oct', 'nov', 'dic']
HOY = date.today()


def _d(v):
    if v is None:
        return HOY
    y, m = map(int, v.split('-'))
    return date(y, m, 1)


def meses(ini, fin=None):
    a, b = _d(ini), _d(fin)
    return (b.year - a.year) * 12 + (b.month - a.month) + 1


def dur(n):
    if n < 12:
        return f'{n} {"mes" if n == 1 else "meses"}'
    y, r = divmod(n, 12)
    s = f'{y} {"año" if y == 1 else "años"}'
    return s if r == 0 else f'{s} {r} {"mes" if r == 1 else "meses"}'


def rango(ini, fin=None):
    a = _d(ini)
    ini_s = f'{MESES[a.month - 1]}. {a.year}'
    if fin is None:
        return f'{ini_s} — Actualidad'
    b = _d(fin)
    return f'{ini_s} — {MESES[b.month - 1]}. {b.year}'


CARRERA = meses('2023-04')

# --------------------------------------------------------------------------
# Estilos
# --------------------------------------------------------------------------
def S(name, **kw):
    base = dict(fontName='Body', fontSize=9.1, leading=12.6, textColor=INK_SOFT)
    base.update(kw)
    return ParagraphStyle(name, **base)


st_perfil   = S('perfil', fontSize=9.4, leading=13.6, textColor=INK_SOFT, alignment=TA_JUSTIFY)
st_rol      = S('rol', fontName='Body-B', fontSize=11.2, leading=13, textColor=INK)
st_empresa  = S('empresa', fontName='Body-B', fontSize=9.6, leading=12, textColor=ACCENT)
st_meta     = S('meta', fontName='Mono', fontSize=6.9, leading=9.4, textColor=INK_FAINT)
st_bullet   = S('bullet', fontSize=9.1, leading=12.5, textColor=INK_MUTED,
                leftIndent=9, firstLineIndent=-9)
st_sub      = S('sub', fontName='Body-B', fontSize=9.3, leading=12, textColor=INK_SOFT)
st_body     = S('body', textColor=INK_MUTED)
st_tag      = S('tag', fontSize=8.8, leading=12.2, textColor=INK_MUTED)
st_tag_lbl  = S('taglbl', fontName='Body-B', fontSize=8.8, leading=12.2, textColor=INK_SOFT)


class Rule(Flowable):
    """Filete horizontal de 1 pt."""

    def __init__(self, w=CONTENT_W, color=LINE, thickness=0.7, space=0):
        Flowable.__init__(self)
        self.w, self.color, self.t, self.space = w, color, thickness, space
        self.height = thickness + space

    def wrap(self, aw, ah):
        return (self.w, self.height)

    def draw(self):
        self.canv.setStrokeColor(self.color)
        self.canv.setLineWidth(self.t)
        self.canv.line(0, self.space, self.w, self.space)


class SectionTitle(Flowable):
    """Encabezado de sección numerado, igual que en el portafolio."""

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


def bullets(items, style=st_bullet):
    return [Paragraph(f'<font color="#7FA8FF">\u2022</font>&nbsp;&nbsp;{i}', style)
            for i in items]


# --------------------------------------------------------------------------
# Cabecera y pie
# --------------------------------------------------------------------------
NOMBRE = 'Martín Gabriel Godínez Morales'
CARGO  = 'Director Fundador · Jefe de Desarrollo de Software'
CONTACTO_1 = 'gmoficial16@gmail.com   ·   [dato removido]   ·   Dolores Hidalgo, Guanajuato, México'
CONTACTO_2 = 'portafolio-gm-ogvv.onrender.com   ·   linkedin.com/in/martin-gabriel-godinez-morales-39a48327b   ·   github.com/GabrielGM16'


def cabecera(c, doc):
    c.saveState()
    c.setFillColor(INK)
    c.rect(0, PAGE_H - HEADER_H, PAGE_W, HEADER_H, stroke=0, fill=1)
    # Filete de acento al pie de la banda
    c.setFillColor(ACCENT)
    c.rect(0, PAGE_H - HEADER_H, PAGE_W, 0.09 * cm, stroke=0, fill=1)

    c.setFillColor(WHITE)
    c.setFont('Body-B', 20.5)
    c.drawString(MARGIN, PAGE_H - 1.42 * cm, NOMBRE)

    c.setFillColor(ACCENT_BR)
    c.setFont('Mono', 8.0)
    c.drawString(MARGIN, PAGE_H - 1.97 * cm, CARGO.upper())

    c.setFillColor(HexColor('#B8C4D6'))
    c.setFont('Body', 8.2)
    c.drawString(MARGIN, PAGE_H - 2.55 * cm, CONTACTO_1)
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
    c.drawRightString(PAGE_W - MARGIN, 0.78 * cm,
                      f'PÁGINA {doc.page}   ·   ACTUALIZADO {MESES[HOY.month - 1].upper()}. {HOY.year}')
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
    c.drawRightString(PAGE_W - MARGIN, PAGE_H - 0.60 * cm, CARGO.upper())
    c.restoreState()
    pie(c, doc)


# --------------------------------------------------------------------------
# Contenido
# --------------------------------------------------------------------------
story = []

# A partir de la página 2 se usa la cabecera compacta, no la banda completa.
story.append(NextPageTemplate('resto'))

# ---- Perfil
story.append(SectionTitle('01', 'Perfil'))
story.append(Paragraph(
    'Director Fundador de <b>Nexo Bajío</b> y Jefe de Desarrollo de Software en <b>Envasadora Aguida</b>. '
    f'{dur(CARRERA)} de experiencia profesional continua diseñando, construyendo y operando sistemas que '
    'sostienen la operación de empresas industriales y de servicios: arquitectura de software, sistemas ERP, '
    'infraestructura Linux y desarrollo a la medida. En Envasadora Aguida pasé de becario de sistemas a jefe '
    'del área de desarrollo en diez meses. Respondo por los sistemas que dirijo, desde la arquitectura hasta '
    'el servidor donde corren. Cursando Maestría en Inteligencia Artificial.',
    st_perfil))
story.append(Spacer(1, 0.42 * cm))

# ---- Experiencia
story.append(SectionTitle('02', 'Experiencia profesional'))

EXPERIENCIA = [
    dict(
        rol='Director Fundador',
        empresa='Nexo Bajío',
        extra='Firma propia · Profesional independiente',
        lugar='Dolores Hidalgo, Gto.',
        ini='2026-02', fin=None,
        puntos=[
            'Fundación y dirección de una firma de tecnología especializada en convertir problemas operativos '
            'en soluciones funcionales: soporte, consultoría y desarrollo de software.',
            'Dirección comercial y relación directa con clientes; diagnóstico operativo y definición del plan tecnológico.',
            'Desarrollo de software a la medida, integraciones y administración de presencia digital de clientes.',
        ],
    ),
    dict(
        rol='Jefe de Desarrollo de Software',
        empresa='Envasadora Aguida',
        extra='Jornada completa · Envasado aséptico Tetra Pak',
        lugar='San Luis de la Paz, Gto.',
        ini='2025-11', fin=None,
        grupo=('Trayectoria en la empresa: ', '2025-01'),
        puntos=[
            'Arquitectura, desarrollo y refactorización continua del <b>ERP corporativo</b> que soporta la '
            'logística y la producción de la planta.',
            'Diseño del sistema desde cero: más de 12 módulos integrados, perfiles diferenciados para dirección, '
            'administración y operación.',
            'Administración del servidor Linux + Apache de producción; estándares de desarrollo, control de '
            'versiones y documentación.',
        ],
        previos=[
            ('Ingeniero Asistente de Sistemas', '2025-08', '2025-11'),
            ('Auxiliar de Sistemas', '2025-04', '2025-08'),
            ('Becario de Sistemas de la Información', '2025-01', '2025-04'),
        ],
    ),
    dict(
        rol='Consultor Técnico',
        empresa='Luis Guerrero González y Asociados',
        extra='Despacho jurídico · Contrato temporal',
        lugar='Dolores Hidalgo, Gto.',
        ini='2024-01', fin=None,
        puntos=[
            'Resolución continua de consultas sobre tecnología, ciberseguridad, infraestructura y software, '
            'sirviendo como puente entre el rigor técnico y el marco legal.',
            'Análisis y revisión de información digital de dispositivos móviles; evaluación técnica de datos '
            'de geolocalización y metadatos.',
            'Elaboración de reportes técnicos para uso del equipo legal. Trabajo sujeto a confidencialidad.',
        ],
    ),
    dict(
        rol='Software Developer Training',
        empresa='Optimen',
        extra='Jornada completa',
        lugar='León, Gto.',
        ini='2023-04', fin='2023-10',
        puntos=[
            'Desarrollo, pruebas y mantenimiento de módulos web corporativos con React.js y servicios en la nube de AWS.',
            'Procesamiento y análisis de datos geoespaciales y vectoriales con Python para los sectores hídrico y aeroespacial.',
            'Apoyo en prototipado y mejora de sistemas para clientes del sector industrial.',
        ],
    ),
]

for e in EXPERIENCIA:
    bloque = [Paragraph(e['rol'], st_rol), Spacer(1, 0.05 * cm)]
    bloque.append(Paragraph(
        f"{e['empresa']} &nbsp;<font color='#8794AB' size='8'>|</font>&nbsp; "
        f"<font color='#4A5A73' size='8.6'>{e['extra']}</font>", st_empresa))
    bloque.append(Spacer(1, 0.09 * cm))

    meta = f"{rango(e['ini'], e['fin'])}  ·  {dur(meses(e['ini'], e['fin']))}  ·  {e['lugar'].upper()}"
    if 'grupo' in e:
        etq, desde = e['grupo']
        meta += f"    [ {etq}{dur(meses(desde))} ]"
    bloque.append(Paragraph(meta.upper(), st_meta))
    bloque.append(Spacer(1, 0.16 * cm))
    bloque.extend(bullets(e['puntos']))

    if 'previos' in e:
        bloque.append(Spacer(1, 0.18 * cm))
        bloque.append(Paragraph('Cargos previos en la misma empresa', st_sub))
        bloque.append(Spacer(1, 0.06 * cm))
        for rol, i, f in e['previos']:
            bloque.append(Paragraph(
                f"<font color='#7FA8FF'>\u2022</font>&nbsp;&nbsp;<b>{rol}</b> "
                f"<font face='Mono' size='7' color='#5F6F87'>{rango(i, f).upper()} · "
                f"{dur(meses(i, f)).upper()}</font>", st_bullet))

    bloque.append(Spacer(1, 0.34 * cm))
    story.append(KeepTogether(bloque))

# ---- Casos destacados
CASOS = [
    ('ERP corporativo de logística y producción', 'Envasadora Aguida', '2025 — Actualidad', 'En producción',
     'Sistema diseñado y construido desde cero para unificar el control de logística, producción y procesos '
     'internos de una planta de envasado aséptico, con trazabilidad por área y reportes de dirección. '
     '<b>Resultado:</b> en producción y en refactorización continua; dirijo su arquitectura desde noviembre de 2025.',
     'PHP · React · MySQL · Apache · Linux · TCPDF / mPDF'),
    ('Presencia digital y captación de clientes', 'SaniPlagas — vía Nexo Bajío', '2026 — Actualidad', 'En operación',
     'Sitio web y campañas de Google Ads con seguimiento de conversiones para una empresa de control de plagas '
     'con cobertura en cuatro ciudades del Bajío, construido alrededor de una sola acción: solicitar inspección. '
     '<b>Resultado:</b> captación activa por formulario y WhatsApp, con campañas bajo administración continua.',
     'React · Google Ads · Analítica y conversiones · Soporte continuo'),
    ('Consultoría técnica en contexto jurídico', 'Luis Guerrero González y Asociados', '2024 — Actualidad',
     'Colaboración vigente',
     'Traducción de material técnico —metadatos, geolocalización, información de dispositivos— a un lenguaje '
     'que abogados y peritos puedan sostener dentro del marco legal, sin perder rigor. '
     '<b>Resultado:</b> colaboración continua desde 2024. Trabajo sujeto a confidencialidad.',
     'Análisis de información digital · Metadatos · Ciberseguridad · Reportes técnicos'),
]

_casos = [SectionTitle('03', 'Casos destacados')]
for titulo, cliente, periodo, estado, desc, stack in CASOS:
    bloque = [
        Paragraph(f"<font face='Body-B' color='#0A1628' size='10.2'>{titulo}</font>", st_tag),
        Spacer(1, 0.04 * cm),
        Paragraph(
            f"<font face='Body-B' color='#1D4ED8' size='9'>{cliente}</font>"
            f"<font face='Mono' color='#5F6F87' size='6.9'>&nbsp;&nbsp;{periodo.upper()} · {estado.upper()}</font>",
            st_tag),
        Spacer(1, 0.09 * cm),
        Paragraph(desc, st_body),
        Spacer(1, 0.06 * cm),
        Paragraph(f"<font face='Mono' color='#5F6F87' size='7'>{stack.upper()}</font>", st_tag),
        Spacer(1, 0.30 * cm),
    ]
    _casos.append(KeepTogether(bloque))
story.append(KeepTogether(_casos[:4]))
story.extend(_casos[4:])
story.append(Spacer(1, 0.06 * cm))

# ---- Capacidades
CAPACIDADES = [
    ('Dirección técnica',
     'Arquitectura de software · Definición de alcance y prioridades · Refactorización de sistemas en '
     'producción · Estándares y documentación · Interlocución con dirección y áreas operativas'),
    ('Backend y datos',
     'PHP · MySQL / MariaDB · Node.js · Express · Composer · REST APIs · TCPDF / mPDF / PHPOffice'),
    ('Frontend',
     'React · Next.js · JavaScript · HTML5 / CSS3 · Tailwind CSS · Bootstrap · Diseño responsivo · PWA'),
    ('Infraestructura',
     'Linux · Apache · Administración de servidores · Git / GitHub · Vercel · AWS · Respaldos y continuidad'),
    ('En formación',
     'Inteligencia artificial aplicada · Python · Ciberseguridad · Automatización de procesos'),
]
def cap_par(titulo, lista):
    return Paragraph(
        f"<font face='Body-B' color='#1B2A41'>{titulo}</font>"
        f"<font color='#8794AB'>&nbsp;&nbsp;—&nbsp;&nbsp;</font>{lista}", st_tag)


# El título nunca debe quedar solo al pie de una página: viaja con su contenido.
_cap = [SectionTitle('04', 'Capacidades técnicas')]
for titulo, lista in CAPACIDADES:
    _cap.append(cap_par(titulo, lista))
    _cap.append(Spacer(1, 0.11 * cm))
story.append(KeepTogether(_cap))
story.append(Spacer(1, 0.30 * cm))

# ---- Formación
FORMACION = [
    ('Maestría en Inteligencia Artificial', 'Universidad Virtual del Estado de Guanajuato (UVEG)',
     '2026 — 2027', 'En curso'),
    ('Ingeniería en Desarrollo y Gestión de Software',
     'Universidad Tecnológica del Norte de Guanajuato', '2023 — 2025', None),
    ('TSU en Desarrollo de Software Multiplataforma',
     'Universidad Tecnológica del Norte de Guanajuato', '2021 — 2023', None),
]
_form = [SectionTitle('05', 'Formación académica')]
for grado, escuela, periodo, estado in FORMACION:
    et = (f"&nbsp;&nbsp;<font face='Mono' size='6.6' color='#1D4ED8'>[{estado.upper()}]</font>"
          if estado else '')
    _form.append(Paragraph(
        f"<font face='Body-B' color='#0A1628' size='9.5'>{grado}</font>{et}<br/>"
        f"<font color='#4A5A73' size='8.7'>{escuela}</font>"
        f"<font face='Mono' color='#5F6F87' size='7'>&nbsp;&nbsp;·&nbsp;&nbsp;{periodo}</font>",
        st_tag))
    _form.append(Spacer(1, 0.16 * cm))
story.append(KeepTogether(_form))
story.append(Spacer(1, 0.24 * cm))

# ---- Certificaciones
CERTS = [
    ('Ciberseguridad Esencial', 'Cisco', '2024'),
    ('Introducción a la Ciberseguridad', 'Cisco', '2024'),
    ('Introducción a las Redes', 'Cisco', '2023'),
    ('Curso de Linux', 'Cisco', '2023'),
    ('IT Essentials: PC Hardware and Software', 'Cisco', '2022'),
]
_cert = [SectionTitle('06', 'Certificaciones')]
for nombre, org, anio in CERTS:
    _cert.append(Paragraph(
        f"<font color='#7FA8FF'>\u2022</font>&nbsp;&nbsp;<font color='#1B2A41'>{nombre}</font>"
        f"<font face='Mono' color='#5F6F87' size='7'>&nbsp;&nbsp;{org.upper()} · {anio}</font>",
        st_tag))
    _cert.append(Spacer(1, 0.055 * cm))
story.append(KeepTogether(_cert))

# --------------------------------------------------------------------------
# Documento
# --------------------------------------------------------------------------
SALIDA = 'C:/Personal/portafolio-gm/public/CV_MartinGabrielGodinezMorales_2026.pdf'

doc = BaseDocTemplate(
    SALIDA, pagesize=letter,
    leftMargin=MARGIN, rightMargin=MARGIN,
    topMargin=MARGIN, bottomMargin=1.45 * cm,
    title=f'CV — {NOMBRE}', author=NOMBRE,
    subject=CARGO,
    keywords='desarrollo de software, ERP, arquitectura, PHP, React, MySQL, Linux, Nexo Bajío',
    creator='',
)

frame_1 = Frame(MARGIN, 1.45 * cm, CONTENT_W,
                PAGE_H - HEADER_H - 1.45 * cm - 0.45 * cm, id='p1',
                leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0)
frame_n = Frame(MARGIN, 1.45 * cm, CONTENT_W,
                PAGE_H - 0.95 * cm - 1.45 * cm - 0.7 * cm, id='pn',
                leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0)

doc.addPageTemplates([
    PageTemplate(id='primera', frames=[frame_1], onPage=cabecera),
    PageTemplate(id='resto', frames=[frame_n], onPage=encabezado_simple),
])

doc.build(story)
print(f'OK -> {SALIDA}')

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Briefcase,
  Mail,
  Github,
  Linkedin,
  Download,
  ChevronDown,
  Code,
  Zap,
  Award,
  ExternalLink,
  User,
  GraduationCap
} from 'lucide-react';

const LandingPage = ({ onEnterPortfolio, onOpenWindow }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [showExpandedContent, setShowExpandedContent] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const expandedContentRef = useRef(null);

  const handleEnter = () => {
    setIsVisible(false);
    setTimeout(() => onEnterPortfolio(), 500);
  };

  const handleExploreMore = () => {
    setShowExpandedContent(true);
    setTimeout(() => {
      expandedContentRef.current?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }, 100);
  };

  const quickActions = [
    {
      icon: Briefcase,
      title: 'Ver Proyectos',
      description: 'Explora mi portafolio de proyectos',
      color: 'from-blue-500 to-cyan-500',
      action: () => onOpenWindow('portfolio')
    },
    {
      icon: User,
      title: 'Sobre Mí',
      description: 'Conoce mi historia y experiencia',
      color: 'from-green-500 to-emerald-500',
      action: () => setShowAboutModal(true)
    },
    {
      icon: Download,
      title: 'Descargar CV',
      description: 'Obtén mi currículum en PDF',
      color: 'from-purple-500 to-pink-500',
      action: () => {
        const link = document.createElement('a');
        link.href = '/ CV_GabrielGM.pdf';
        link.download = ' CV_GabrielGM.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    },
    {
      icon: Mail,
      title: 'Contacto',
      description: 'Hablemos sobre oportunidades',
      color: 'from-orange-500 to-red-500',
      action: () => onOpenWindow('contact')
    }
  ];

  const skills = [
    { name: 'PHP', level: 95 },
    { name: 'MySQL', level: 90 },
    { name: 'JavaScript', level: 90 },
    { name: 'React', level: 85 },
    { name: 'Next.js', level: 80 },
    { name: 'Python', level: 80 },
    { name: 'AWS', level: 75 },
    { name: 'Linux/Apache', level: 80 }
  ];

  const stats = [
    { icon: Code, label: 'Proyectos', value: '10+' },
    { icon: Zap, label: 'Experiencia', value: '2 años+' },
    { icon: Award, label: 'Clientes', value: '5+' }
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 overflow-auto"
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)'
          }}
        >
          {/* Animated Background */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute w-96 h-96 bg-white/10 rounded-full blur-3xl -top-48 -left-48 animate-pulse" />
            <div className="absolute w-96 h-96 bg-white/10 rounded-full blur-3xl -bottom-48 -right-48 animate-pulse" style={{ animationDelay: '1s' }} />
          </div>

          <div className="relative min-h-screen flex flex-col">
            {/* Header */}
            <motion.header
              initial={{ y: -100 }}
              animate={{ y: 0 }}
              className="p-6 flex justify-between items-center"
            >
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">MG</span>
                </div>
                <div className="text-white">
                  <h1 className="font-bold text-lg">Martin Godinez</h1>
                  <p className="text-sm text-white/80">Full Stack Developer</p>
                </div>
              </div>

              <div className="flex space-x-3">
                <a href="https://github.com/GabrielGM16" target="_blank" rel="noopener noreferrer"
                   className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors">
                  <Github className="w-5 h-5 text-white" />
                </a>
                <a href="https://www.linkedin.com/in/martin-gabriel-godinez-morales-39a48327b" target="_blank" rel="noopener noreferrer"
                   className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors">
                  <Linkedin className="w-5 h-5 text-white" />
                </a>
                <a href="mailto:gmoficial16@gmail.com"
                   className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors">
                  <Mail className="w-5 h-5 text-white" />
                </a>
              </div>
            </motion.header>

            {/* Hero Section */}
            <div className="flex-1 flex items-center justify-center px-6 py-12">
              <div className="max-w-6xl w-full">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-center mb-12"
                >
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="inline-block mb-4 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full"
                  >
                    <span className="text-white font-medium">👋 Bienvenido a mi portafolio</span>
                  </motion.div>

                  <motion.h2
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-5xl md:text-7xl font-bold text-white mb-6"
                  >
                    Creo experiencias
                    <br />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-pink-200">
                      digitales increíbles
                    </span>
                  </motion.h2>

                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-xl text-white/90 mb-8 max-w-2xl mx-auto"
                  >
                    Desarrollador Full-Stack especializado en PHP y JavaScript, con enfoque en sistemas ERP,
                    arquitectura modular y despliegue en servidores Linux. Actualmente desarrollo el ERP  
                    para Envasadora Aguida, con más de 12 módulos en producción.
                  </motion.p>

                  {/* Stats */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="flex justify-center space-x-8 mb-8"
                  >
                    {stats.map((stat, index) => (
                      <div key={index} className="text-center">
                        <div className="w-16 h-16 mx-auto mb-2 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
                          <stat.icon className="w-8 h-8 text-white" />
                        </div>
                        <div className="text-2xl font-bold text-white">{stat.value}</div>
                        <div className="text-sm text-white/80">{stat.label}</div>
                      </div>
                    ))}
                  </motion.div>

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="flex justify-center space-x-4"
                  >
                    <button
                      onClick={handleExploreMore}
                      className="px-8 py-4 bg-white text-purple-600 rounded-xl font-semibold hover:shadow-2xl transform hover:scale-105 transition-all duration-200 flex items-center space-x-2"
                    >
                      <span>Explorar Portafolio</span>
                      <ExternalLink className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => onOpenWindow('contact')}
                      className="px-8 py-4 bg-white/20 backdrop-blur-md text-white rounded-xl font-semibold hover:bg-white/30 transition-all duration-200"
                    >
                      Contactar
                    </button>
                  </motion.div>
                </motion.div>

                {/* Quick Actions Grid */}
                <motion.div
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
                >
                  {quickActions.map((action, index) => (
                    <motion.button
                      key={index}
                      onClick={action.action}
                      whileHover={{ y: -5, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-left hover:bg-white/20 transition-all duration-200 group"
                    >
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${action.color} flex items-center justify-center mb-4 group-hover:shadow-xl transition-shadow`}>
                        <action.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-white font-semibold text-lg mb-2">{action.title}</h3>
                      <p className="text-white/70 text-sm">{action.description}</p>
                    </motion.button>
                  ))}
                </motion.div>

                {/* Skills Preview */}
                <motion.div
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.9 }}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-8"
                >
                  <h3 className="text-white font-semibold text-xl mb-6 text-center">Tecnologías Principales</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {skills.map((skill, index) => (
                      <div key={index}>
                        <div className="flex justify-between mb-2">
                          <span className="text-white font-medium">{skill.name}</span>
                          <span className="text-white/70">{skill.level}%</span>
                        </div>
                        <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.level}%` }}
                            transition={{ delay: 1 + index * 0.1, duration: 1 }}
                            className="h-full bg-gradient-to-r from-yellow-400 to-pink-400"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="text-center pb-8"
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="inline-flex flex-col items-center text-white/70 cursor-pointer"
                onClick={handleExploreMore}
              >
                <span className="text-sm mb-2">Explorar más</span>
                <ChevronDown className="w-6 h-6" />
              </motion.div>
            </motion.div>

            {/* Expanded Content Section */}
            <AnimatePresence>
              {showExpandedContent && (
                <motion.div
                  ref={expandedContentRef}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 50 }}
                  transition={{ duration: 0.6 }}
                  className="px-6 py-12"
                >
                  <div className="max-w-6xl mx-auto">
                    {/* Projects Section */}
                    <motion.div
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="mb-16"
                    >
                      <h3 className="text-4xl font-bold text-white text-center mb-12">
                        Proyectos Destacados
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                          {
                            title: 'Sistema Empresarial Integral',
                            description: 'Sistema de gestión empresarial con múltiples módulos para Envasadora Aguida. Servidor Linux + Apache en producción.',
                            tech: ['PHP', 'MySQL', 'JavaScript', 'Apache'],
                            color: 'from-indigo-500 to-blue-700'
                          },
                          {
                            title: 'Plataforma IoT de Monitoreo',
                            description: 'Monitoreo de dispositivos IoT para el sector hídrico e industrial con dashboard en tiempo real.',
                            tech: ['React', 'Python', 'AWS'],
                            color: 'from-green-500 to-teal-600'
                          },
                          {
                            title: 'Análisis Geoespacial',
                            description: 'Procesamiento de datos vectoriales y geoespaciales para los sectores hídrico y aeroespacial.',
                            tech: ['Python', 'AWS'],
                            color: 'from-orange-500 to-red-600'
                          }
                        ].map((project, index) => (
                          <motion.div
                            key={index}
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 + index * 0.1 }}
                            className="bg-white/10 backdrop-blur-md rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 group"
                          >
                            <div className={`w-full h-32 rounded-xl bg-gradient-to-r ${project.color} mb-4 flex items-center justify-center group-hover:shadow-xl transition-shadow`}>
                              <Code className="w-12 h-12 text-white" />
                            </div>
                            <h4 className="text-white font-semibold text-xl mb-3">{project.title}</h4>
                            <p className="text-white/80 mb-4">{project.description}</p>
                            <div className="flex flex-wrap gap-2">
                              {project.tech.map((tech, techIndex) => (
                                <span
                                  key={techIndex}
                                  className="px-3 py-1 bg-white/20 rounded-full text-white/90 text-sm"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>

                    {/* Experience Section */}
                    <motion.div
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-16"
                    >
                      <h3 className="text-3xl font-bold text-white text-center mb-8">
                        Experiencia Profesional
                      </h3>
                      <div className="space-y-8">
                        <div className="border-l-4 border-green-400 pl-6">
                          <h4 className="text-white font-semibold text-xl">Desarrollador Full-Stack</h4>
                          <p className="text-white/80 mb-2">Envasadora Aguida • Enero 2025 - Actualidad</p>
                          <p className="text-white/60 mb-3 text-sm">📍 San Luis de la Paz, Guanajuato</p>
                          <div className="text-white/70 space-y-2">
                            <p>• Diseño y desarrollo desde cero del sistema  , un ERP industrial con más de 12 módulos integrados</p>
                            <p>• Implementación de módulos para distintos perfiles de usuario (administrador, operador, gerencia)</p>
                            <p>• Generación de reportes PDF y flujos de validación internos con TCPDF/mPDF</p>
                            <p>• Administración y mantenimiento de servidor Linux con Apache</p>
                            <p>• Desarrollo de múltiples sistemas adicionales en PHP y React para la misma empresa</p>
                            <p className="text-green-300 font-medium mt-3">🛠️ Tecnologías: PHP, React, MySQL, JavaScript, HTML/CSS, Apache, Linux</p>
                          </div>
                        </div>
                        
                        <div className="border-l-4 border-blue-400 pl-6">
                          <h4 className="text-white font-semibold text-xl">Consultor Técnico - Análisis Digital</h4>
                          <p className="text-white/80 mb-2">Despacho Jurídico • 2024 - 2025</p>
                          <p className="text-white/60 mb-3 text-sm">⚖️ Proceso Legal - Consultoría Técnica Digital</p>
                          <div className="text-white/70 space-y-2">
                            <p>• Consultoría técnica especializada para apoyo en proceso legal</p>
                            <p>• Análisis y revisión de información digital extraída de dispositivos móviles</p>
                            <p>• Evaluación técnica de datos de geolocalización y metadatos</p>
                            <p>• Elaboración de reportes técnicos de análisis de información</p>
                            <p>• Apoyo técnico especializado a equipos legales en interpretación de datos</p>
                            <p className="text-blue-300 font-medium mt-3">🔍 Especialidades: Análisis de información digital, Consultoría técnica, Evaluación de datos móviles, Comunicación técnica-legal</p>
                          </div>
                        </div>

                        <div className="border-l-4 border-purple-400 pl-6">
                          <h4 className="text-white font-semibold text-xl">Practicante en Innovación Tecnológica</h4>
                          <p className="text-white/80 mb-2">Optimen • Abril 2023 - Octubre 2023</p>
                          <p className="text-white/60 mb-3 text-sm">📍 León, Guanajuato</p>
                          <div className="text-white/70 space-y-2">
                            <p>• Integración en el área de innovación, desarrollando soluciones con React y Python</p>
                            <p>• Participación en proyectos de IoT e infraestructura con AWS</p>
                            <p>• Aplicación de análisis de datos geoespaciales y vectores para el sector hídrico y aeroespacial</p>
                            <p>• Apoyo en pruebas, prototipado y mejora de sistemas para clientes del sector industrial</p>
                            <p className="text-purple-300 font-medium mt-3">🚀 Tecnologías: React, Python, AWS, IoT, Análisis geoespacial</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Call to Action */}
                    <motion.div
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.7 }}
                      className="text-center"
                    >
                      <h3 className="text-3xl font-bold text-white mb-6">
                        ¿Listo para trabajar juntos?
                      </h3>
                      <div className="flex justify-center space-x-4">
                        <button
                          onClick={() => onOpenWindow('contact')}
                          className="px-8 py-4 bg-white text-purple-600 rounded-xl font-semibold hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
                        >
                          Contactar Ahora
                        </button>
                        <button
                          onClick={() => onOpenWindow('portfolio')}
                          className="px-8 py-4 bg-white/20 backdrop-blur-md text-white rounded-xl font-semibold hover:bg-white/30 transition-all duration-200"
                        >
                          Ver Todos los Proyectos
                        </button>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}

      {/* Modal Sobre Mí */}
      <AnimatePresence>
        {showAboutModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowAboutModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-gradient-to-br from-purple-900/90 to-blue-900/90 backdrop-blur-md rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-4xl font-bold text-white">Sobre Mí</h2>
                <button
                  onClick={() => setShowAboutModal(false)}
                  className="text-white/70 hover:text-white text-2xl font-bold w-10 h-10 rounded-full hover:bg-white/10 transition-all duration-200"
                >
                  ×
                </button>
              </div>

              <div className="space-y-8">
                {/* Sección Personal */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-6"
                >
                  <div className="flex items-center mb-4">
                    <User className="w-8 h-8 text-green-400 mr-3" />
                    <h3 className="text-2xl font-bold text-white">¿Quién soy?</h3>
                  </div>
                  <p className="text-white/90 text-lg leading-relaxed">
                    Soy Martín Gabriel Godínez Morales, Desarrollador Full-Stack con experiencia sólida en sistemas
                    ERP empresariales y aplicaciones web robustas. Especializado en PHP y JavaScript con enfoque en
                    arquitectura modular y despliegue en servidores Linux. Actualmente curso una Maestría en
                    Inteligencia Artificial, con interés en aplicar IA a sistemas reales.
                  </p>
                </motion.div>

                {/* Sección Valores */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-6"
                >
                  <div className="flex items-center mb-4">
                    <Award className="w-8 h-8 text-blue-400 mr-3" />
                    <h3 className="text-2xl font-bold text-white">Mis Valores</h3>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                        <span className="text-white/90"><strong>Excelencia:</strong> Busco la calidad en cada línea de código</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                        <span className="text-white/90"><strong>Colaboración:</strong> Creo en el poder del trabajo en equipo</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                        <span className="text-white/90"><strong>Innovación:</strong> Siempre busco nuevas formas de hacer las cosas</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-orange-400 rounded-full mr-3"></div>
                        <span className="text-white/90"><strong>Integridad:</strong> Honestidad y transparencia en todo lo que hago</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Sección Pasión por la Tecnología */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-6"
                >
                  <div className="flex items-center mb-4">
                    <Code className="w-8 h-8 text-purple-400 mr-3" />
                    <h3 className="text-2xl font-bold text-white">Mi Pasión por la Tecnología</h3>
                  </div>
                  <p className="text-white/90 text-lg leading-relaxed mb-4">
                    Desde pequeño me fascinó cómo funcionan las cosas. Esta curiosidad me llevó al mundo de la programación,
                    donde encontré la combinación perfecta entre lógica y creatividad. Cada sistema que construyo
                    es una oportunidad de resolver un problema real con tecnología.
                  </p>
                  <p className="text-white/90 text-lg leading-relaxed">
                    Me especializo en arquitectura de sistemas ERP, desarrollo PHP avanzado y aplicaciones con React
                    y Next.js. Actualmente me adentro también en Inteligencia Artificial y machine learning a través
                    de mi Maestría en IA en la UVEG.
                  </p>
                </motion.div>

                {/* Sección Intereses Personales */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-6"
                >
                  <div className="flex items-center mb-4">
                    <Zap className="w-8 h-8 text-yellow-400 mr-3" />
                    <h3 className="text-2xl font-bold text-white">Más Allá del Código</h3>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-xl font-semibold text-white mb-3">Intereses</h4>
                      <ul className="space-y-2 text-white/90">
                        <li>• Filosofía</li>
                        <li>• Lectura</li>
                        <li>• Psicología</li>
                        <li>• Ciberseguridad</li>
                        <li>• Innovación en todos los aspectos</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-white mb-3">Filosofía de Trabajo</h4>
                      <p className="text-white/90">
                        "Como dijo una vez un sabio: si puedes imaginarlo, puedes programarlo"
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Sección Formación Académica */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.45 }}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-6"
                >
                  <div className="flex items-center mb-4">
                    <GraduationCap className="w-8 h-8 text-cyan-400 mr-3" />
                    <h3 className="text-2xl font-bold text-white">Formación Académica</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="border-l-2 border-cyan-400 pl-4">
                      <p className="text-white font-semibold">Maestría en Inteligencia Artificial <span className="text-cyan-300 text-sm font-normal">(en curso)</span></p>
                      <p className="text-white/60 text-sm">Universidad Virtual del Estado de Guanajuato (UVEG) • 2026 – 2027</p>
                    </div>
                    <div className="border-l-2 border-blue-400 pl-4">
                      <p className="text-white font-semibold">Ingeniería en Desarrollo y Gestión de Software</p>
                      <p className="text-white/60 text-sm">Universidad Tecnológica del Norte de Guanajuato • 2023 – 2025</p>
                    </div>
                    <div className="border-l-2 border-purple-400 pl-4">
                      <p className="text-white font-semibold">TSU en Desarrollo de Software Multiplataforma</p>
                      <p className="text-white/60 text-sm">Universidad Tecnológica del Norte de Guanajuato • 2021 – 2023</p>
                    </div>
                  </div>
                </motion.div>

                {/* Sección Certificaciones */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-6"
                >
                  <div className="flex items-center mb-4">
                    <Award className="w-8 h-8 text-yellow-400 mr-3" />
                    <h3 className="text-2xl font-bold text-white">Certificaciones</h3>
                  </div>
                  <div className="grid md:grid-cols-2 gap-3">
                    {[
                      { name: 'IT Essentials: PC Hardware and Software', org: 'Cisco', year: '2022' },
                      { name: 'Curso Linux', org: 'Cisco', year: '2023' },
                      { name: 'Introducción a las Redes', org: 'Cisco', year: '2023' },
                      { name: 'Ciberseguridad Esencial', org: 'Cisco', year: '2024' },
                      { name: 'Introducción a la Ciberseguridad', org: 'Cisco', year: '2024' },
                    ].map((cert, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <span className="text-white/90 text-sm font-medium">{cert.name}</span>
                          <span className="text-white/50 text-xs block">{cert.org} • {cert.year}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Sección Call to Action */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.55 }}
                  className="text-center pt-4"
                >
                  <p className="text-white/90 text-lg mb-6">
                    ¿Te gustaría conocer más sobre mi trabajo o colaborar en un proyecto?
                  </p>
                  <div className="flex justify-center space-x-4">
                    <button
                      onClick={() => {
                        setShowAboutModal(false);
                        onOpenWindow('contact');
                      }}
                      className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold transition-all duration-200 transform hover:scale-105"
                    >
                      Hablemos
                    </button>
                    <button
                      onClick={() => {
                        setShowAboutModal(false);
                        onOpenWindow('portfolio');
                      }}
                      className="px-6 py-3 bg-white/20 backdrop-blur-md text-white rounded-xl font-semibold hover:bg-white/30 transition-all duration-200"
                    >
                      Ver Proyectos
                    </button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AnimatePresence>
  );
};

export default LandingPage;
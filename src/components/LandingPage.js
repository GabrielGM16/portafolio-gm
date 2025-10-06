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
  User
} from 'lucide-react';

const LandingPage = ({ onEnterPortfolio, onOpenWindow }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [showExpandedContent, setShowExpandedContent] = useState(false);
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
      action: () => handleExploreMore()
    },
    {
      icon: Download,
      title: 'Descargar CV',
      description: 'Obtén mi currículum en PDF',
      color: 'from-purple-500 to-pink-500',
      action: () => window.open('#', '_blank')
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
    { name: 'React', level: 95 },
    { name: 'Node.js', level: 90 },
    { name: 'TypeScript', level: 85 },
    { name: 'Python', level: 80 },
    { name: 'MongoDB', level: 85 },
    { name: 'AWS', level: 75 }
  ];

  const stats = [
    { icon: Code, label: 'Proyectos', value: '15+' },
    { icon: Zap, label: 'Experiencia', value: '4 años' },
    { icon: Award, label: 'Clientes', value: '20+' }
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
                <a href="https://github.com" target="_blank" rel="noopener noreferrer"
                   className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors">
                  <Github className="w-5 h-5 text-white" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
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
                    Full Stack Developer especializado en React, Node.js y arquitecturas escalables.
                    Transformo ideas en productos digitales de alto impacto.
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
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
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
                            title: 'E-commerce Platform',
                            description: 'Plataforma completa de comercio electrónico con React y Node.js',
                            tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
                            color: 'from-blue-500 to-purple-600'
                          },
                          {
                            title: 'Task Management App',
                            description: 'Aplicación de gestión de tareas con funcionalidades avanzadas',
                            tech: ['React', 'TypeScript', 'Firebase'],
                            color: 'from-green-500 to-teal-600'
                          },
                          {
                            title: 'Real-time Chat',
                            description: 'Sistema de chat en tiempo real con Socket.io',
                            tech: ['React', 'Socket.io', 'Express'],
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
                      <div className="space-y-6">
                        <div className="border-l-4 border-yellow-400 pl-6">
                          <h4 className="text-white font-semibold text-xl">Senior Full Stack Developer</h4>
                          <p className="text-white/80 mb-2">Tech Solutions Inc. • 2022 - Presente</p>
                          <p className="text-white/70">
                            Desarrollo de aplicaciones web escalables usando React, Node.js y AWS. 
                            Liderazgo de equipo de 5 desarrolladores.
                          </p>
                        </div>
                        <div className="border-l-4 border-blue-400 pl-6">
                          <h4 className="text-white font-semibold text-xl">Full Stack Developer</h4>
                          <p className="text-white/80 mb-2">Digital Agency • 2020 - 2022</p>
                          <p className="text-white/70">
                            Desarrollo de sitios web y aplicaciones para clientes diversos. 
                            Especialización en e-commerce y sistemas de gestión.
                          </p>
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
    </AnimatePresence>
  );
};

export default LandingPage;
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Filter, 
  ExternalLink, 
  Github, 
  Code, 
  Calendar,
  Tag,
  Star,
  Eye,
  Search
} from 'lucide-react';

const Portfolio = ({ onClose }) => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const technologies = [
    { id: 'all', name: 'Todos', color: 'bg-gray-500' },
    { id: 'php', name: 'PHP', color: 'bg-indigo-600' },
    { id: 'mysql', name: 'MySQL', color: 'bg-blue-700' },
    { id: 'javascript', name: 'JavaScript', color: 'bg-yellow-500' },
    { id: 'react', name: 'React', color: 'bg-blue-500' },
    { id: 'nextjs', name: 'Next.js', color: 'bg-gray-800' },
    { id: 'python', name: 'Python', color: 'bg-green-500' },
    { id: 'aws', name: 'AWS', color: 'bg-orange-500' }
  ];

  const projects = [
    {
      id: 1,
      title: 'ERP   – Envasadora Aguida',
      description: 'Sistema ERP industrial desarrollado desde cero con más de 12 módulos integrados para la industria alimentaria. PHP + React en producción.',
      longDescription: '  es un ERP industrial completo desarrollado desde cero en PHP y React para Envasadora Aguida. Cuenta con más de 12 módulos integrados para distintos perfiles de usuario (administrador, operador, gerencia), generación de reportes PDF con TCPDF/mPDF, flujos de validación internos y administración de procesos empresariales. El servidor Linux + Apache es administrado de forma independiente. Sistema actualmente en producción.',
      image: null,
      technologies: ['php', 'react', 'mysql', 'javascript'],
      category: 'ERP / Sistemas Empresariales',
      date: '2025',
      status: 'En producción',
      github: 'https://github.com/GabrielGM16',
      demo: null,
      features: [
        'Más de 12 módulos integrados',
        'Múltiples perfiles de usuario',
        'Generación de reportes PDF (TCPDF/mPDF)',
        'Flujos de validación internos',
        'Servidor Linux + Apache administrado',
        'Base de datos MySQL optimizada'
      ]
    },
    {
      id: 2,
      title: 'Sistemas Internos – Aguida (Proyectos Paralelos)',
      description: 'Desarrollo de múltiples sistemas adicionales en PHP y React para procesos internos de Envasadora Aguida.',
      longDescription: 'Además del ERP  , se desarrollaron sistemas paralelos para cubrir necesidades específicas de Envasadora Aguida. Estos proyectos incluyeron módulos de seguimiento de procesos, gestión de reportes operativos y herramientas internas, todos desarrollados en PHP con MySQL y React, manteniendo la misma arquitectura modular del sistema principal.',
      image: null,
      technologies: ['php', 'react', 'mysql', 'javascript'],
      category: 'Sistemas Empresariales',
      date: '2025',
      status: 'En producción',
      github: 'https://github.com/GabrielGM16',
      demo: null,
      features: [
        'Arquitectura modular reutilizable',
        'Integración con ERP  ',
        'Gestión de procesos internos',
        'Reportes operativos',
        'Control de acceso por roles',
        'PHP + React + MySQL'
      ]
    },
    {
      id: 3,
      title: 'Plataforma IoT de Monitoreo',
      description: 'Plataforma de monitoreo IoT para el sector hídrico e industrial con visualización de datos en tiempo real.',
      longDescription: 'Proyecto desarrollado durante la práctica en Optimen, orientado al monitoreo de dispositivos IoT en sectores hídrico e industrial. Incluye dashboard interactivo con React, procesamiento de datos con Python, integración con AWS IoT y alertas en tiempo real. Apoyó en la mejora de sistemas para clientes del sector industrial.',
      image: null,
      technologies: ['react', 'python', 'aws'],
      category: 'IoT / Industrial',
      date: '2023',
      status: 'Completado',
      github: 'https://github.com/GabrielGM16',
      demo: null,
      features: [
        'Dashboard en tiempo real',
        'Integración con AWS IoT',
        'Alertas y notificaciones',
        'Procesamiento de datos con Python',
        'Visualización de métricas',
        'Soporte multi-dispositivo'
      ]
    },
    {
      id: 4,
      title: 'Análisis Geoespacial y Vectorial',
      description: 'Herramienta de análisis de datos geoespaciales y vectoriales para los sectores hídrico y aeroespacial.',
      longDescription: 'Proyecto de análisis de datos geoespaciales desarrollado en Optimen con Python y AWS. Aplica procesamiento de vectores y análisis de datos satelitales para el sector hídrico y aeroespacial. Incluye visualización de mapas, análisis de cobertura y generación de informes técnicos. Orientado a clientes del sector industrial y gubernamental.',
      image: null,
      technologies: ['python', 'aws'],
      category: 'Data Science',
      date: '2023',
      status: 'Completado',
      github: 'https://github.com/GabrielGM16',
      demo: null,
      features: [
        'Procesamiento de datos vectoriales',
        'Análisis de datos satelitales',
        'Visualización de mapas interactivos',
        'Generación de informes técnicos',
        'Integración con AWS',
        'Análisis de cobertura geográfica'
      ]
    },
    {
      id: 5,
      title: 'Consultoría Técnica Digital',
      description: 'Análisis forense de información digital extraída de dispositivos móviles para apoyo en proceso legal.',
      longDescription: 'Consultoría técnica especializada para un despacho jurídico durante 2024-2025. Involucró el análisis y revisión de información digital de dispositivos móviles, evaluación de datos de geolocalización y metadatos, elaboración de reportes técnicos y comunicación de hallazgos a equipos legales. Requirió alta precisión, discreción y capacidad para traducir conceptos técnicos complejos a lenguaje accesible para peritos y abogados.',
      image: null,
      technologies: ['python'],
      category: 'Consultoría Técnica',
      date: '2024',
      status: 'Completado',
      github: null,
      demo: null,
      features: [
        'Análisis de metadatos digitales',
        'Evaluación de geolocalización',
        'Extracción de datos móviles',
        'Reportes técnicos periciales',
        'Comunicación técnica-legal',
        'Manejo de información confidencial'
      ]
    },
    {
      id: 6,
      title: 'Portal Web Corporativo',
      description: 'Desarrollo de portal web con autenticación, gestión de contenido y panel administrativo en PHP y MySQL.',
      longDescription: 'Portal web corporativo desarrollado con PHP y MySQL que incluye sistema de autenticación seguro, gestión de contenido dinámica, panel administrativo completo y diseño responsive. Implementa buenas prácticas de seguridad (prevención de SQL injection, XSS), control de sesiones y administración de usuarios por roles.',
      image: null,
      technologies: ['php', 'mysql', 'javascript'],
      category: 'Web Development',
      date: '2024',
      status: 'Completado',
      github: 'https://github.com/GabrielGM16',
      demo: null,
      features: [
        'Autenticación segura',
        'Gestión de contenido dinámico',
        'Panel administrativo',
        'Control de roles y permisos',
        'Diseño responsive',
        'Prevención de vulnerabilidades'
      ]
    }
  ];

  const filteredProjects = projects.filter(project => {
    const matchesFilter = selectedFilter === 'all' || project.technologies.includes(selectedFilter);
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completado':
        return 'bg-green-100 text-green-800';
      case 'En producción':
        return 'bg-blue-100 text-blue-800';
      case 'En desarrollo':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <h2 className="text-3xl font-bold mb-2">Mi Portafolio</h2>
          <p className="text-white/90">Explora mis proyectos y trabajos destacados</p>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Filters and Search */}
          <div className="mb-8 space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar proyectos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Technology Filters */}
            <div className="flex flex-wrap gap-2">
              <Filter className="w-5 h-5 text-gray-500 mt-2 mr-2" />
              {technologies.map((tech) => (
                <button
                  key={tech.id}
                  onClick={() => setSelectedFilter(tech.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedFilter === tech.id
                      ? `${tech.color} text-white`
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {tech.name}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                {/* Project Image */}
                <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 relative overflow-hidden">
                  {project.image && (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentNode.querySelector('.img-fallback').style.display = 'flex';
                      }}
                    />
                  )}
                  <div className={`img-fallback absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center ${project.image ? 'hidden' : ''}`}>
                    <Code className="w-16 h-16 text-white" />
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-semibold text-gray-800 line-clamp-2">{project.title}</h3>
                    <Eye className="w-5 h-5 text-gray-400 flex-shrink-0 ml-2" />
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{project.description}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {project.date}
                    </span>
                    <span className="flex items-center">
                      <Tag className="w-4 h-4 mr-1" />
                      {project.category}
                    </span>
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => {
                      const techInfo = technologies.find(t => t.id === tech);
                      return (
                        <span
                          key={tech}
                          className={`px-2 py-1 ${techInfo?.color || 'bg-gray-500'} text-white text-xs rounded-full`}
                        >
                          {techInfo?.name || tech}
                        </span>
                      );
                    })}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex-1 bg-gray-800 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-gray-900 transition-colors flex items-center justify-center space-x-1"
                      >
                        <Github className="w-4 h-4" />
                        <span>Código</span>
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-1"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <Code className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No se encontraron proyectos</h3>
              <p className="text-gray-500">Intenta cambiar los filtros o el término de búsqueda</p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white relative">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <h3 className="text-2xl font-bold mb-2">{selectedProject.title}</h3>
                <p className="text-white/90">{selectedProject.category} • {selectedProject.date}</p>
              </div>

              {/* Modal Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Project Image */}
                  <div className="h-64 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl overflow-hidden relative">
                    {selectedProject.image && (
                      <img
                        src={selectedProject.image}
                        alt={selectedProject.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.parentNode.querySelector('.img-fallback').style.display = 'flex';
                        }}
                      />
                    )}
                    <div className={`img-fallback absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center ${selectedProject.image ? 'hidden' : ''}`}>
                      <Code className="w-16 h-16 text-white" />
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">Descripción</h4>
                      <p className="text-gray-600">{selectedProject.longDescription}</p>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">Tecnologías</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.technologies.map((tech) => {
                          const techInfo = technologies.find(t => t.id === tech);
                          return (
                            <span
                              key={tech}
                              className={`px-3 py-1 ${techInfo?.color || 'bg-gray-500'} text-white text-sm rounded-full`}
                            >
                              {techInfo?.name || tech}
                            </span>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">Estado</h4>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedProject.status)}`}>
                        {selectedProject.status}
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-3 pt-4">
                      {selectedProject.github && (
                        <a
                          href={selectedProject.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 bg-gray-800 text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-900 transition-colors flex items-center justify-center space-x-2"
                        >
                          <Github className="w-5 h-5" />
                          <span>Ver Código</span>
                        </a>
                      )}
                      {selectedProject.demo && (
                        <a
                          href={selectedProject.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                        >
                          <ExternalLink className="w-5 h-5" />
                          <span>Ver Demo</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="mt-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-3">Características principales</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {selectedProject.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span className="text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Portfolio;
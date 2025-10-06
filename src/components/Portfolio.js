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
    { id: 'react', name: 'React', color: 'bg-blue-500' },
    { id: 'nodejs', name: 'Node.js', color: 'bg-green-500' },
    { id: 'typescript', name: 'TypeScript', color: 'bg-blue-600' },
    { id: 'python', name: 'Python', color: 'bg-yellow-500' },
    { id: 'mongodb', name: 'MongoDB', color: 'bg-green-600' },
    { id: 'aws', name: 'AWS', color: 'bg-orange-500' }
  ];

  const projects = [
    {
      id: 1,
      title: 'E-commerce Platform',
      description: 'Plataforma completa de comercio electrónico con carrito de compras, pagos y gestión de inventario.',
      longDescription: 'Una plataforma de e-commerce completa desarrollada con React y Node.js. Incluye autenticación de usuarios, carrito de compras, procesamiento de pagos con Stripe, panel de administración, gestión de inventario y sistema de reseñas. La aplicación está optimizada para SEO y cuenta con un diseño responsive.',
      image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20e-commerce%20website%20interface%20with%20shopping%20cart%20and%20product%20grid&image_size=landscape_4_3',
      technologies: ['react', 'nodejs', 'mongodb'],
      category: 'Web Development',
      date: '2024',
      status: 'Completado',
      github: 'https://github.com/GabrielGM16',
      demo: 'https://demo.com',
      features: [
        'Autenticación de usuarios',
        'Carrito de compras',
        'Procesamiento de pagos',
        'Panel de administración',
        'Gestión de inventario',
        'Sistema de reseñas'
      ]
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'Aplicación de gestión de tareas con funcionalidades avanzadas de colaboración y seguimiento.',
      longDescription: 'Una aplicación de gestión de tareas moderna con funcionalidades de colaboración en tiempo real. Permite crear proyectos, asignar tareas, establecer fechas límite, comentarios y notificaciones. Desarrollada con React, TypeScript y Firebase para sincronización en tiempo real.',
      image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=task%20management%20dashboard%20with%20kanban%20board%20and%20project%20cards&image_size=landscape_4_3',
      technologies: ['react', 'typescript'],
      category: 'Productivity',
      date: '2024',
      status: 'En desarrollo',
      github: 'https://github.com/GabrielGM16',
      demo: 'https://demo.com',
      features: [
        'Tableros Kanban',
        'Colaboración en tiempo real',
        'Notificaciones push',
        'Gestión de equipos',
        'Reportes y analytics',
        'Integración con calendario'
      ]
    },
    {
      id: 3,
      title: 'Real-time Chat Application',
      description: 'Sistema de chat en tiempo real con salas, mensajes privados y compartir archivos.',
      longDescription: 'Una aplicación de chat en tiempo real desarrollada con Socket.io y React. Incluye salas de chat públicas y privadas, mensajes directos, compartir archivos, emojis, notificaciones y historial de mensajes. La aplicación soporta múltiples usuarios simultáneos.',
      image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20chat%20application%20interface%20with%20message%20bubbles%20and%20user%20list&image_size=landscape_4_3',
      technologies: ['react', 'nodejs'],
      category: 'Communication',
      date: '2023',
      status: 'Completado',
      github: 'https://github.com/GabrielGM16',
      demo: 'https://demo.com',
      features: [
        'Chat en tiempo real',
        'Salas públicas y privadas',
        'Compartir archivos',
        'Emojis y reacciones',
        'Historial de mensajes',
        'Notificaciones'
      ]
    },
    {
      id: 4,
      title: 'Data Analytics Dashboard',
      description: 'Dashboard interactivo para análisis de datos con gráficos y reportes personalizables.',
      longDescription: 'Un dashboard completo para análisis de datos desarrollado con React y Python. Incluye visualizaciones interactivas, filtros avanzados, exportación de reportes y conexión a múltiples fuentes de datos. Utiliza D3.js para gráficos personalizados.',
      image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=data%20analytics%20dashboard%20with%20charts%20graphs%20and%20statistics&image_size=landscape_4_3',
      technologies: ['react', 'python', 'aws'],
      category: 'Data Science',
      date: '2023',
      status: 'Completado',
      github: 'https://github.com/GabrielGM16',
      demo: 'https://demo.com',
      features: [
        'Visualizaciones interactivas',
        'Filtros avanzados',
        'Exportación de reportes',
        'Múltiples fuentes de datos',
        'Gráficos personalizados',
        'Análisis predictivo'
      ]
    },
    {
      id: 5,
      title: 'API REST Microservices',
      description: 'Arquitectura de microservicios con API REST, autenticación JWT y documentación automática.',
      longDescription: 'Una arquitectura de microservicios robusta desarrollada con Node.js y MongoDB. Incluye autenticación JWT, documentación automática con Swagger, rate limiting, logging y monitoreo. Desplegada en AWS con Docker y Kubernetes.',
      image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=microservices%20architecture%20diagram%20with%20api%20endpoints%20and%20databases&image_size=landscape_4_3',
      technologies: ['nodejs', 'mongodb', 'aws'],
      category: 'Backend',
      date: '2023',
      status: 'Completado',
      github: 'https://github.com/GabrielGM16',
      demo: null,
      features: [
        'Arquitectura de microservicios',
        'Autenticación JWT',
        'Documentación Swagger',
        'Rate limiting',
        'Logging y monitoreo',
        'Despliegue con Docker'
      ]
    },
    {
      id: 6,
      title: 'Machine Learning Model',
      description: 'Modelo de machine learning para predicción de precios con interfaz web interactiva.',
      longDescription: 'Un modelo de machine learning desarrollado con Python y scikit-learn para predicción de precios. Incluye preprocesamiento de datos, entrenamiento del modelo, evaluación de métricas y una interfaz web para hacer predicciones en tiempo real.',
      image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=machine%20learning%20interface%20with%20data%20visualization%20and%20prediction%20charts&image_size=landscape_4_3',
      technologies: ['python', 'aws'],
      category: 'Machine Learning',
      date: '2022',
      status: 'Completado',
      github: 'https://github.com/GabrielGM16',
      demo: 'https://demo.com',
      features: [
        'Modelo predictivo',
        'Preprocesamiento de datos',
        'Evaluación de métricas',
        'Interfaz web interactiva',
        'API para predicciones',
        'Visualización de resultados'
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
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center" style={{ display: 'none' }}>
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
                  <div className="h-64 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl overflow-hidden">
                    <img
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center" style={{ display: 'none' }}>
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
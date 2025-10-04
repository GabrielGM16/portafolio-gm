import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ExternalLink, 
  Github, 
  Star,
  Eye,
  Code,
  Zap,
  Search,
  Filter,
  X
} from 'lucide-react';

const ImprovedPortfolio = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const projects = [
    {
      id: 1,
      title: "Ubuntu Portfolio",
      description: "Portafolio interactivo que simula un entorno Ubuntu Linux completo con terminal funcional y explorador de archivos.",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
      technologies: ["React", "Tailwind CSS", "Framer Motion", "Context API"],
      category: "web",
      featured: true,
      stats: {
        stars: 124,
        views: "2.5k"
      },
      links: {
        live: "https://example.com",
        github: "https://github.com"
      },
      highlights: [
        "Sistema de ventanas arrastrable",
        "Terminal con comandos reales",
        "Sistema de archivos virtual",
        "Diseño responsive"
      ]
    },
    {
      id: 2,
      title: "E-Commerce Platform",
      description: "Plataforma completa de comercio electrónico con gestión de productos, carrito y sistema de pagos integrado.",
      image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80",
      technologies: ["React", "Node.js", "MongoDB", "Stripe", "Redux"],
      category: "fullstack",
      featured: true,
      stats: {
        stars: 89,
        views: "1.8k"
      },
      links: {
        live: "https://example.com",
        github: "https://github.com"
      },
      highlights: [
        "Pasarela de pagos segura",
        "Panel de administración",
        "Sistema de inventario",
        "Notificaciones en tiempo real"
      ]
    },
    {
      id: 3,
      title: "Task Management App",
      description: "Aplicación de gestión de proyectos con colaboración en tiempo real y sistema de notificaciones.",
      image: "https://images.unsplash.com/photo-1611224885990-ab7363d1f2a3?w=800&q=80",
      technologies: ["Vue.js", "Firebase", "Vuetify", "Vuex"],
      category: "web",
      featured: false,
      stats: {
        stars: 56,
        views: "980"
      },
      links: {
        live: "https://example.com",
        github: "https://github.com"
      },
      highlights: [
        "Colaboración en tiempo real",
        "Sistema de comentarios",
        "Tableros Kanban",
        "Calendario integrado"
      ]
    },
    {
      id: 4,
      title: "Weather Dashboard",
      description: "Dashboard meteorológico con visualización de datos y pronósticos utilizando APIs de clima.",
      image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&q=80",
      technologies: ["React", "Chart.js", "OpenWeather API", "Tailwind"],
      category: "web",
      featured: false,
      stats: {
        stars: 42,
        views: "750"
      },
      links: {
        live: "https://example.com",
        github: "https://github.com"
      },
      highlights: [
        "Gráficos interactivos",
        "Pronóstico extendido",
        "Mapas de temperatura",
        "Alertas meteorológicas"
      ]
    },
    {
      id: 5,
      title: "Social Media API",
      description: "API RESTful completa para red social con autenticación, posts, likes y sistema de seguimiento.",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80",
      technologies: ["Node.js", "Express", "MongoDB", "JWT", "Socket.io"],
      category: "backend",
      featured: false,
      stats: {
        stars: 78,
        views: "1.2k"
      },
      links: {
        live: "https://example.com",
        github: "https://github.com"
      },
      highlights: [
        "Autenticación JWT",
        "WebSockets para chat",
        "Sistema de notificaciones",
        "Rate limiting y seguridad"
      ]
    },
    {
      id: 6,
      title: "AI Image Generator",
      description: "Generador de imágenes con IA utilizando DALL-E API, con galería y sistema de favoritos.",
      image: "https://images.unsplash.com/photo-1547954575-855750c57bd3?w=800&q=80",
      technologies: ["React", "OpenAI API", "Node.js", "PostgreSQL"],
      category: "fullstack",
      featured: true,
      stats: {
        stars: 156,
        views: "3.1k"
      },
      links: {
        live: "https://example.com",
        github: "https://github.com"
      },
      highlights: [
        "Integración con DALL-E",
        "Galería de imágenes",
        "Sistema de prompts",
        "Descarga en HD"
      ]
    }
  ];

  const categories = [
    { id: 'all', label: 'Todos', count: projects.length },
    { id: 'web', label: 'Web', count: projects.filter(p => p.category === 'web').length },
    { id: 'fullstack', label: 'Full Stack', count: projects.filter(p => p.category === 'fullstack').length },
    { id: 'backend', label: 'Backend', count: projects.filter(p => p.category === 'backend').length },
    { id: 'featured', label: 'Destacados', count: projects.filter(p => p.featured).length }
  ];

  const filteredProjects = projects.filter(project => {
    const matchesFilter = filter === 'all' || 
                         project.category === filter || 
                         (filter === 'featured' && project.featured);
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const ProjectCard = ({ project }) => (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -8 }}
      className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group"
      onClick={() => setSelectedProject(project)}
    >
      <div className="relative overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
            <div className="flex space-x-2">
              <a 
                href={project.links.live} 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-2 bg-white/90 rounded-lg hover:bg-white transition-colors"
              >
                <ExternalLink className="w-4 h-4 text-gray-900" />
              </a>
              <a 
                href={project.links.github} 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-2 bg-white/90 rounded-lg hover:bg-white transition-colors"
              >
                <Github className="w-4 h-4 text-gray-900" />
              </a>
            </div>
          </div>
        </div>
        {project.featured && (
          <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full text-xs font-semibold text-white flex items-center space-x-1">
            <Star className="w-3 h-3 fill-current" />
            <span>Destacado</span>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
          {project.title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 3).map((tech, index) => (
            <span 
              key={index}
              className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-xs rounded-lg font-medium"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-lg font-medium">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1">
              <Star className="w-4 h-4" />
              <span>{project.stats.stars}</span>
            </span>
            <span className="flex items-center space-x-1">
              <Eye className="w-4 h-4" />
              <span>{project.stats.views}</span>
            </span>
          </div>
          <motion.span 
            className="text-purple-600 dark:text-purple-400 font-medium flex items-center space-x-1"
            whileHover={{ x: 4 }}
          >
            <span>Ver más</span>
            <ExternalLink className="w-4 h-4" />
          </motion.span>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="h-full bg-gradient-to-br from-gray-50 to-purple-50 dark:from-gray-900 dark:to-purple-900/20 overflow-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-8">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="max-w-7xl mx-auto"
        >
          <h1 className="text-4xl font-bold mb-2 flex items-center">
            <Code className="w-10 h-10 mr-3" />
            Mi Portafolio
          </h1>
          <p className="text-white/90 text-lg">
            Explora mis proyectos más destacados y soluciones innovadoras
          </p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Filters and Search */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar proyectos, tecnologías..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 dark:text-white"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setFilter(category.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === category.id
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-gray-700'
                }`}
              >
                {category.label} <span className="text-sm opacity-75">({category.count})</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* No Results */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Filter className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No se encontraron proyectos
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Intenta con otros términos de búsqueda o filtros
            </p>
          </motion.div>
        )}
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-auto"
            >
              <div className="relative">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title}
                  className="w-full h-64 object-cover"
                />
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 p-2 bg-white/90 dark:bg-gray-900/90 rounded-lg hover:bg-white dark:hover:bg-gray-900 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                {selectedProject.featured && (
                  <div className="absolute top-4 left-4 px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full text-sm font-semibold text-white flex items-center space-x-2">
                    <Star className="w-4 h-4 fill-current" />
                    <span>Proyecto Destacado</span>
                  </div>
                )}
              </div>

              <div className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                      {selectedProject.title}
                    </h2>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                      <span className="flex items-center space-x-1">
                        <Star className="w-4 h-4" />
                        <span>{selectedProject.stats.stars} estrellas</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span>{selectedProject.stats.views} vistas</span>
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  {selectedProject.description}
                </p>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                    <Zap className="w-5 h-5 mr-2 text-purple-600" />
                    Características Principales
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedProject.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-start space-x-2 text-gray-700 dark:text-gray-300">
                        <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                    <Code className="w-5 h-5 mr-2 text-purple-600" />
                    Tecnologías Utilizadas
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-4">
                  <a
                    href={selectedProject.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center space-x-2"
                  >
                    <ExternalLink className="w-5 h-5" />
                    <span>Ver Demo</span>
                  </a>
                  <a
                    href={selectedProject.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-6 py-3 bg-gray-900 dark:bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Github className="w-5 h-5" />
                    <span>Ver Código</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ImprovedPortfolio;
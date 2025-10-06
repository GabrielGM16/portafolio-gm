import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Briefcase, 
  FileText, 
  Mail, 
  Download,
  X,
  ExternalLink,
  Github,
  Linkedin,
  Code,
  Award,
  Sparkles
} from 'lucide-react';

const QuickAccessMenu = ({ onOpenWindow, onClose }) => {
  const [hoveredItem, setHoveredItem] = useState(null);

  const menuItems = [
    {
      id: 'about',
      icon: Sparkles,
      title: 'Sobre Mí',
      description: 'Conoce mi perfil profesional',
      color: 'from-blue-500 to-cyan-500',
      action: () => onOpenWindow('about')
    },
    {
      id: 'portfolio',
      icon: Briefcase,
      title: 'Proyectos',
      description: 'Explora mi portafolio completo',
      color: 'from-purple-500 to-pink-500',
      action: () => onOpenWindow('portfolio')
    },
    {
      id: 'resume',
      icon: FileText,
      title: 'Currículum',
      description: 'Ver y descargar mi CV',
      color: 'from-orange-500 to-red-500',
      action: () => onOpenWindow('about')
    },
    {
      id: 'skills',
      icon: Code,
      title: 'Habilidades',
      description: 'Stack tecnológico completo',
      color: 'from-green-500 to-emerald-500',
      action: () => onOpenWindow('about')
    },
    {
      id: 'contact',
      icon: Mail,
      title: 'Contacto',
      description: 'Hablemos de oportunidades',
      color: 'from-indigo-500 to-purple-500',
      action: () => onOpenWindow('about')
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      label: 'GitHub',
      url: 'https://github.com/GabrielGM16',
      color: 'hover:bg-gray-800'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/martin-gabriel-godinez-morales-39a48327b',
      color: 'hover:bg-blue-600'
    },
    {
      icon: Download,
      label: 'CV PDF',
      url: '#',
      color: 'hover:bg-orange-600'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl max-w-4xl w-full overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center space-x-4 mb-2">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
              <span className="text-2xl font-bold">MG</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold">Martin Godinez</h2>
              <p className="text-white/90">Full Stack Developer</p>
            </div>
          </div>

          <p className="text-white/80 text-sm mt-2">
            4+ años de experiencia • React • Node.js • MongoDB • AWS
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-3 text-center">
              <div className="text-2xl font-bold">15+</div>
              <div className="text-xs text-white/80">Proyectos</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-3 text-center">
              <div className="text-2xl font-bold">20+</div>
              <div className="text-xs text-white/80">Clientes</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-3 text-center">
              <div className="text-2xl font-bold">100%</div>
              <div className="text-xs text-white/80">Satisfacción</div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Award className="w-5 h-5 mr-2 text-purple-600" />
              Acceso Rápido
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {menuItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => {
                    item.action();
                    onClose();
                  }}
                  onHoverStart={() => setHoveredItem(item.id)}
                  onHoverEnd={() => setHoveredItem(null)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative bg-gray-50 dark:bg-gray-800 rounded-xl p-4 text-left hover:shadow-lg transition-all duration-200 overflow-hidden group"
                >
                  {/* Gradient Background on Hover */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredItem === item.id ? 0.1 : 0 }}
                    className={`absolute inset-0 bg-gradient-to-r ${item.color}`}
                  />
                  
                  <div className="relative flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${item.color} flex items-center justify-center flex-shrink-0 group-hover:shadow-lg transition-shadow`}>
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1 flex items-center">
                        {item.title}
                        <ExternalLink className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
              Conéctate conmigo
            </h3>
            
            <div className="flex space-x-3">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-gray-900 dark:bg-gray-800 text-white rounded-lg ${link.color} transition-colors`}
                >
                  <link.icon className="w-5 h-5" />
                  <span className="font-medium text-sm">{link.label}</span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                  ¿Listo para hablar?
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Estoy disponible para nuevas oportunidades
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  onOpenWindow('about');
                  onClose();
                }}
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-shadow"
              >
                Contactar
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default QuickAccessMenu;
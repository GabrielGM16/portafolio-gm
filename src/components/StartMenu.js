import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Settings, 
  Power,
  User,
  Grid3X3,
  Clock,
  Star
} from 'lucide-react';

// Hooks de contexto
import { useApplications } from '../contexts/ApplicationContext';

function StartMenu({ onClose }) {
  const { applications, getFavoriteApplications, getRecentApplications } = useApplications();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('favorites');
  const menuRef = useRef(null);
  const searchRef = useRef(null);

  // Enfocar búsqueda al abrir
  useEffect(() => {
    if (searchRef.current) {
      searchRef.current.focus();
    }
  }, []);

  // Cerrar menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  // Aplicaciones por categoría
  const categorizedApps = {
    favorites: getFavoriteApplications(),
    recent: getRecentApplications(),
    all: Object.values(applications)
  };

  // Filtrar aplicaciones por búsqueda
  const filteredApps = searchTerm
    ? Object.values(applications).filter(app => 
        app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.description?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : categorizedApps[activeCategory] || [];

  // Manejar lanzamiento de aplicación
  const handleLaunchApp = (appId) => {
    console.log(`Launch app: ${appId} - window system removed`);
    onClose();
  };

  // Categorías del menú
  const categories = [
    { id: 'favorites', label: 'Favoritos', icon: Star },
    { id: 'recent', label: 'Recientes', icon: Clock },
    { id: 'all', label: 'Todas', icon: Grid3X3 }
  ];

  // Acciones rápidas
  const quickActions = [
    {
      id: 'shutdown',
      label: 'Apagar',
      icon: Power,
      action: () => {
        console.log('Apagar sistema');
        onClose();
      }
    },
    {
      id: 'settings',
      label: 'Configuración',
      icon: Settings,
      action: () => handleLaunchApp('settings')
    },
    {
      id: 'user',
      label: 'Usuario',
      icon: User,
      action: () => {
        console.log('Configuración de usuario');
        onClose();
      }
    }
  ];

  return (
    <motion.div
      ref={menuRef}
      className="start-menu fixed bottom-14 left-2 z-40"
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <div className="menu-container w-96 h-[32rem] bg-white/95 dark:bg-ubuntu-dark-surface/95 backdrop-blur-md rounded-xl shadow-2xl border border-white/20 dark:border-white/10 overflow-hidden">
        
        {/* Header con búsqueda */}
        <div className="header p-4 border-b border-gray-200/50 dark:border-white/10">
          <div className="search-container relative">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
            <input
              ref={searchRef}
              type="text"
              placeholder="Buscar aplicaciones..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-ubuntu-dark-bg rounded-lg border-none outline-none focus:ring-2 focus:ring-ubuntu-orange/50 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200"
            />
          </div>
        </div>

        {/* Contenido principal */}
        <div className="content flex flex-1 h-full">
          
          {/* Sidebar con categorías */}
          {!searchTerm && (
            <div className="sidebar w-24 bg-gray-50/50 dark:bg-ubuntu-dark-bg/50 border-r border-gray-200/50 dark:border-white/10 p-2">
              <div className="categories space-y-2">
                {categories.map((category) => {
                  const IconComponent = category.icon;
                  const isActive = activeCategory === category.id;
                  
                  return (
                    <motion.button
                      key={category.id}
                      className={`
                        category-button w-full flex flex-col items-center justify-center
                        p-3 rounded-lg transition-all duration-200
                        ${
                          isActive
                            ? 'bg-ubuntu-orange text-white shadow-lg'
                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200/50 dark:hover:bg-white/5 hover:text-gray-800 dark:hover:text-white'
                        }
                      `}
                      onClick={() => setActiveCategory(category.id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <IconComponent size={20} className="mb-1" />
                      <span className="text-xs font-medium">{category.label}</span>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Lista de aplicaciones */}
          <div className="apps-container flex-1 p-4">
            <div className="apps-grid grid grid-cols-3 gap-3 max-h-80 overflow-y-auto">
              <AnimatePresence mode="popLayout">
                {filteredApps.map((app, index) => {
                  const IconComponent = app.icon;
                  
                  return (
                    <motion.button
                      key={app.id}
                      className="app-item flex flex-col items-center justify-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-all duration-200 group"
                      onClick={() => handleLaunchApp(app.id)}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.2, delay: index * 0.02 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      layout
                    >
                      <div className="icon-container mb-2 p-2 rounded-lg bg-gradient-to-br from-ubuntu-orange-light to-ubuntu-orange group-hover:shadow-lg transition-all duration-200">
                        <IconComponent size={24} className="text-white" />
                      </div>
                      <span className="text-xs font-medium text-gray-800 dark:text-white text-center leading-tight">
                        {app.name}
                      </span>
                    </motion.button>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Mensaje cuando no hay resultados */}
            {filteredApps.length === 0 && (
              <div className="no-results flex flex-col items-center justify-center h-40 text-gray-500 dark:text-gray-400">
                <Search size={32} className="mb-2 opacity-50" />
                <p className="text-sm">
                  {searchTerm ? 'No se encontraron aplicaciones' : 'No hay aplicaciones en esta categoría'}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer con acciones rápidas */}
        <div className="footer border-t border-gray-200/50 dark:border-white/10 p-3">
          <div className="quick-actions flex justify-between items-center">
            {quickActions.map((action) => {
              const IconComponent = action.icon;
              
              return (
                <motion.button
                  key={action.id}
                  className="quick-action flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-800 dark:hover:text-white transition-all duration-200"
                  onClick={action.action}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <IconComponent size={16} />
                  <span className="text-sm font-medium">{action.label}</span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default StartMenu;
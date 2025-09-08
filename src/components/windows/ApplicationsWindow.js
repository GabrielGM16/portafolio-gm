import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Grid3X3, 
  List, 
  Star, 
  Clock, 
  Download, 
  Trash2,
  Settings,
  Play,
  Pause,
  Square,
  MoreVertical,
  Filter,
  SortAsc,
  SortDesc,
  Terminal,
  Folder,
  FileText,
  Image,
  Music,
  Video,
  Code,
  Globe,
  Calculator,
  Calendar,
  Mail,
  Camera,
  Gamepad2,
  Palette,
  Database,
  Shield,
  Wifi,
  Battery,
  Volume2
} from 'lucide-react';

// Hooks de contexto
import { useApplications } from '../../contexts/ApplicationContext';
import { useWindowManager } from '../../contexts/WindowManagerContext';
import { useTheme } from '../../contexts/ThemeContext';

function ApplicationsWindow({ windowId }) {
  const { applications, installedApps, installApp, uninstallApp, launchApp } = useApplications();
  const { openWindow } = useWindowManager();
  const { theme } = useTheme();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name'); // 'name' | 'date' | 'size' | 'rating'
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' | 'desc'
  const [selectedApps, setSelectedApps] = useState([]);
  const [showContextMenu, setShowContextMenu] = useState(null);

  // Aplicaciones disponibles del sistema
  const systemApps = [
    {
      id: 'terminal',
      name: 'Terminal',
      description: 'Emulador de terminal con comandos personalizados',
      icon: Terminal,
      category: 'system',
      version: '1.0.0',
      size: '2.4 MB',
      rating: 4.8,
      installed: true,
      running: false,
      favorite: true,
      lastUsed: new Date('2024-01-15T10:30:00')
    },
    {
      id: 'file-manager',
      name: 'Explorador de Archivos',
      description: 'Navegador de archivos con funciones avanzadas',
      icon: Folder,
      category: 'system',
      version: '2.1.0',
      size: '5.2 MB',
      rating: 4.6,
      installed: true,
      running: false,
      favorite: true,
      lastUsed: new Date('2024-01-15T09:15:00')
    },
    {
      id: 'settings',
      name: 'Configuración',
      description: 'Panel de control del sistema',
      icon: Settings,
      category: 'system',
      version: '1.5.0',
      size: '3.8 MB',
      rating: 4.5,
      installed: true,
      running: false,
      favorite: false,
      lastUsed: new Date('2024-01-14T16:45:00')
    },
    {
      id: 'text-editor',
      name: 'Editor de Texto',
      description: 'Editor de texto con resaltado de sintaxis',
      icon: FileText,
      category: 'productivity',
      version: '3.2.1',
      size: '8.1 MB',
      rating: 4.7,
      installed: true,
      running: false,
      favorite: true,
      lastUsed: new Date('2024-01-15T14:20:00')
    },
    {
      id: 'image-viewer',
      name: 'Visor de Imágenes',
      description: 'Visualizador y editor básico de imágenes',
      icon: Image,
      category: 'media',
      version: '2.0.3',
      size: '12.5 MB',
      rating: 4.4,
      installed: false,
      running: false,
      favorite: false,
      lastUsed: null
    },
    {
      id: 'music-player',
      name: 'Reproductor de Música',
      description: 'Reproductor de audio con ecualizador',
      icon: Music,
      category: 'media',
      version: '1.8.2',
      size: '15.3 MB',
      rating: 4.6,
      installed: false,
      running: false,
      favorite: false,
      lastUsed: null
    },
    {
      id: 'video-player',
      name: 'Reproductor de Video',
      description: 'Reproductor multimedia avanzado',
      icon: Video,
      category: 'media',
      version: '4.1.0',
      size: '28.7 MB',
      rating: 4.8,
      installed: true,
      running: false,
      favorite: false,
      lastUsed: new Date('2024-01-13T20:30:00')
    },
    {
      id: 'code-editor',
      name: 'Editor de Código',
      description: 'IDE completo para desarrollo',
      icon: Code,
      category: 'development',
      version: '5.3.1',
      size: '45.2 MB',
      rating: 4.9,
      installed: true,
      running: false,
      favorite: true,
      lastUsed: new Date('2024-01-15T11:45:00')
    },
    {
      id: 'web-browser',
      name: 'Navegador Web',
      description: 'Navegador web rápido y seguro',
      icon: Globe,
      category: 'internet',
      version: '98.0.1',
      size: '67.8 MB',
      rating: 4.5,
      installed: true,
      running: false,
      favorite: true,
      lastUsed: new Date('2024-01-15T08:30:00')
    },
    {
      id: 'calculator',
      name: 'Calculadora',
      description: 'Calculadora científica avanzada',
      icon: Calculator,
      category: 'utilities',
      version: '2.4.0',
      size: '1.8 MB',
      rating: 4.3,
      installed: true,
      running: false,
      favorite: false,
      lastUsed: new Date('2024-01-12T15:20:00')
    },
    {
      id: 'calendar',
      name: 'Calendario',
      description: 'Organizador personal con recordatorios',
      icon: Calendar,
      category: 'productivity',
      version: '1.9.5',
      size: '6.4 MB',
      rating: 4.2,
      installed: false,
      running: false,
      favorite: false,
      lastUsed: null
    },
    {
      id: 'email-client',
      name: 'Cliente de Email',
      description: 'Gestor de correo electrónico',
      icon: Mail,
      category: 'internet',
      version: '3.7.2',
      size: '22.1 MB',
      rating: 4.4,
      installed: false,
      running: false,
      favorite: false,
      lastUsed: null
    }
  ];

  const categories = [
    { id: 'all', name: 'Todas', count: systemApps.length },
    { id: 'favorites', name: 'Favoritas', count: systemApps.filter(app => app.favorite).length },
    { id: 'installed', name: 'Instaladas', count: systemApps.filter(app => app.installed).length },
    { id: 'system', name: 'Sistema', count: systemApps.filter(app => app.category === 'system').length },
    { id: 'productivity', name: 'Productividad', count: systemApps.filter(app => app.category === 'productivity').length },
    { id: 'media', name: 'Multimedia', count: systemApps.filter(app => app.category === 'media').length },
    { id: 'development', name: 'Desarrollo', count: systemApps.filter(app => app.category === 'development').length },
    { id: 'internet', name: 'Internet', count: systemApps.filter(app => app.category === 'internet').length },
    { id: 'utilities', name: 'Utilidades', count: systemApps.filter(app => app.category === 'utilities').length }
  ];

  // Filtrar aplicaciones
  const filteredApps = systemApps.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = activeCategory === 'all' ||
                           (activeCategory === 'favorites' && app.favorite) ||
                           (activeCategory === 'installed' && app.installed) ||
                           app.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'name':
        comparison = a.name.localeCompare(b.name);
        break;
      case 'date':
        const dateA = a.lastUsed || new Date(0);
        const dateB = b.lastUsed || new Date(0);
        comparison = dateB.getTime() - dateA.getTime();
        break;
      case 'size':
        const sizeA = parseFloat(a.size.replace(/[^0-9.]/g, ''));
        const sizeB = parseFloat(b.size.replace(/[^0-9.]/g, ''));
        comparison = sizeA - sizeB;
        break;
      case 'rating':
        comparison = b.rating - a.rating;
        break;
      default:
        comparison = 0;
    }
    
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  // Manejar doble clic en aplicación
  const handleAppDoubleClick = (app) => {
    if (app.installed) {
      // Lanzar aplicación
      switch (app.id) {
        case 'terminal':
          openWindow('terminal', 'Terminal', 'TerminalWindow');
          break;
        case 'file-manager':
          openWindow('file-manager', 'Explorador de Archivos', 'FileManagerWindow');
          break;
        case 'settings':
          openWindow('settings', 'Configuración', 'SettingsWindow');
          break;
        case 'text-editor':
        case 'code-editor':
        case 'web-browser':
        case 'calculator':
        case 'video-player':
          // Simular lanzamiento de aplicación
          console.log(`Lanzando ${app.name}...`);
          break;
        default:
          console.log(`Aplicación ${app.name} no implementada`);
      }
    }
  };

  // Manejar clic derecho
  const handleContextMenu = (e, app) => {
    e.preventDefault();
    setShowContextMenu({
      x: e.clientX,
      y: e.clientY,
      app
    });
  };

  // Cerrar menú contextual
  useEffect(() => {
    const handleClickOutside = () => setShowContextMenu(null);
    const handleEscape = (e) => {
      if (e.key === 'Escape') setShowContextMenu(null);
    };

    if (showContextMenu) {
      document.addEventListener('click', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [showContextMenu]);

  // Componente de aplicación en vista de cuadrícula
  const AppGridItem = ({ app }) => {
    const Icon = app.icon;
    
    return (
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`
          relative p-4 rounded-lg border cursor-pointer transition-all duration-200
          ${selectedApps.includes(app.id)
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
            : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600'
          }
        `}
        onClick={() => {
          if (selectedApps.includes(app.id)) {
            setSelectedApps(selectedApps.filter(id => id !== app.id));
          } else {
            setSelectedApps([...selectedApps, app.id]);
          }
        }}
        onDoubleClick={() => handleAppDoubleClick(app)}
        onContextMenu={(e) => handleContextMenu(e, app)}
      >
        {/* Icono */}
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-4">
          <Icon className="w-6 h-6 text-white" />
        </div>

        {/* Información principal */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 truncate">
              {app.name}
            </h3>
            {app.favorite && (
              <Star className="w-4 h-4 text-yellow-500 fill-current flex-shrink-0" />
            )}
            {!app.installed && (
              <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0" />
            )}
            {app.running && (
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse flex-shrink-0" />
            )}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 truncate mb-1">
            {app.description}
          </p>
          <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-500">
            <span>v{app.version}</span>
            <span>{app.size}</span>
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(app.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300 dark:text-gray-600'
                  }`}
                />
              ))}
              <span className="ml-1">{app.rating}</span>
            </div>
            {app.lastUsed && (
              <span>Usado: {app.lastUsed.toLocaleDateString()}</span>
            )}
          </div>
        </div>

        {/* Acciones */}
        <div className="flex items-center space-x-2">
          {app.installed ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAppDoubleClick(app);
              }}
              className="px-4 py-2 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600 transition-colors"
            >
              Abrir
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                console.log(`Instalando ${app.name}...`);
              }}
              className="px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-1"
            >
              <Download className="w-4 h-4" />
              <span>Instalar</span>
            </button>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleContextMenu(e, app);
            }}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="h-full flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Barra de herramientas */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center justify-between mb-4">
          {/* Búsqueda */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar aplicaciones..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Controles de vista */}
          <div className="flex items-center space-x-2">
            {/* Ordenamiento */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm"
            >
              <option value="name">Nombre</option>
              <option value="date">Fecha de uso</option>
              <option value="size">Tamaño</option>
              <option value="rating">Calificación</option>
            </select>
            
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
            >
              {sortOrder === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
            </button>

            {/* Modo de vista */}
            <div className="flex border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${
                  viewMode === 'grid'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                } transition-colors`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${
                  viewMode === 'list'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                } transition-colors`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Información de selección */}
        {selectedApps.length > 0 && (
          <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <span className="text-sm text-blue-700 dark:text-blue-300">
              {selectedApps.length} aplicación(es) seleccionada(s)
            </span>
            <div className="flex space-x-2">
              <button className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors">
                Instalar seleccionadas
              </button>
              <button 
                onClick={() => setSelectedApps([])}
                className="px-3 py-1 bg-gray-500 text-white text-sm rounded hover:bg-gray-600 transition-colors"
              >
                Deseleccionar
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar de categorías */}
        <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Categorías
          </h3>
          <div className="space-y-1">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`
                  w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors
                  ${activeCategory === category.id
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }
                `}
              >
                <span>{category.name}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  activeCategory === category.id
                    ? 'bg-blue-400 text-white'
                    : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-400'
                }`}>
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Área de contenido */}
        <div className="flex-1 overflow-y-auto p-6">
          {filteredApps.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                No se encontraron aplicaciones
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Intenta cambiar los filtros o términos de búsqueda
              </p>
            </div>
          ) : (
            <motion.div
              layout
              className={`
                ${viewMode === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                  : 'space-y-3'
                }
              `}
            >
              {filteredApps.map((app) => (
                viewMode === 'grid' ? (
                  <AppGridItem key={app.id} app={app} />
                ) : (
                  <AppListItem key={app.id} app={app} />
                )
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* Menú contextual */}
      {showContextMenu && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="fixed bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-2 z-50"
          style={{
            left: Math.min(showContextMenu.x, window.innerWidth - 200),
            top: Math.min(showContextMenu.y, window.innerHeight - 200)
          }}
        >
          {showContextMenu.app.installed ? (
            <>
              <button
                onClick={() => {
                  handleAppDoubleClick(showContextMenu.app);
                  setShowContextMenu(null);
                }}
                className="w-full px-4 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2"
              >
                <Play className="w-4 h-4" />
                <span>Abrir</span>
              </button>
              <button
                onClick={() => {
                  console.log(`Desinstalando ${showContextMenu.app.name}...`);
                  setShowContextMenu(null);
                }}
                className="w-full px-4 py-2 text-left text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center space-x-2"
              >
                <Trash2 className="w-4 h-4" />
                <span>Desinstalar</span>
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                console.log(`Instalando ${showContextMenu.app.name}...`);
                setShowContextMenu(null);
              }}
              className="w-full px-4 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Instalar</span>
            </button>
          )}
          <hr className="my-1 border-gray-200 dark:border-gray-700" />
          <button
            onClick={() => {
              console.log(`Agregando ${showContextMenu.app.name} a favoritos...`);
              setShowContextMenu(null);
            }}
            className="w-full px-4 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2"
          >
            <Star className="w-4 h-4" />
            <span>{showContextMenu.app.favorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}</span>
          </button>
        </motion.div>
      )}
    </div>
  );
}

export default ApplicationsWindow;/20'
            : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600'
          }
        `}
        onClick={() => {
          if (selectedApps.includes(app.id)) {
            setSelectedApps(selectedApps.filter(id => id !== app.id));
          } else {
            setSelectedApps([...selectedApps, app.id]);
          }
        }}
        onDoubleClick={() => handleAppDoubleClick(app)}
        onContextMenu={(e) => handleContextMenu(e, app)}
      >
        {/* Estado de instalación */}
        <div className="absolute top-2 right-2 flex space-x-1">
          {app.favorite && (
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
          )}
          {!app.installed && (
            <div className="w-2 h-2 bg-red-500 rounded-full" />
          )}
          {app.running && (
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          )}
        </div>

        {/* Icono de la aplicación */}
        <div className="flex justify-center mb-3">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <Icon className="w-8 h-8 text-white" />
          </div>
        </div>

        {/* Información de la aplicación */}
        <div className="text-center">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1 truncate">
            {app.name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
            {app.description}
          </p>
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-500">
            <span>v{app.version}</span>
            <span>{app.size}</span>
          </div>
          
          {/* Rating */}
          <div className="flex items-center justify-center mt-2 space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${
                  i < Math.floor(app.rating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300 dark:text-gray-600'
                }`}
              />
            ))}
            <span className="text-xs text-gray-600 dark:text-gray-400 ml-1">
              {app.rating}
            </span>
          </div>
        </div>

        {/* Botón de acción */}
        <div className="mt-3">
          {app.installed ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAppDoubleClick(app);
              }}
              className="w-full px-3 py-2 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600 transition-colors"
            >
              Abrir
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                // Simular instalación
                console.log(`Instalando ${app.name}...`);
              }}
              className="w-full px-3 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center space-x-1"
            >
              <Download className="w-4 h-4" />
              <span>Instalar</span>
            </button>
          )}
        </div>
      </motion.div>
    );
  };

  // Componente de aplicación en vista de lista
  const AppListItem = ({ app }) => {
    const Icon = app.icon;
    
    return (
      <motion.div
        layout
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className={`
          flex items-center p-4 rounded-lg border cursor-pointer transition-all duration-200
          ${selectedApps.includes(app.id)
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  RefreshCw, 
  Settings, 
  Terminal, 
  FolderOpen, 
  Image, 
  Palette,
  Monitor,
  Info
} from 'lucide-react';

// Hooks de contexto
import { useTheme } from '../contexts/ThemeContext';
import { useApplications } from '../contexts/ApplicationContext';

function ContextMenu({ x, y, onClose }) {
  const { theme, toggleTheme } = useTheme();
  const { launchApplication } = useApplications();
  const menuRef = useRef(null);

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

  // Ajustar posición del menú para que no se salga de la pantalla
  const adjustPosition = () => {
    if (!menuRef.current) return { x, y };
    
    const menuRect = menuRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    let adjustedX = x;
    let adjustedY = y;
    
    // Ajustar X si se sale por la derecha
    if (x + menuRect.width > viewportWidth) {
      adjustedX = viewportWidth - menuRect.width - 10;
    }
    
    // Ajustar Y si se sale por abajo
    if (y + menuRect.height > viewportHeight) {
      adjustedY = viewportHeight - menuRect.height - 10;
    }
    
    return { x: adjustedX, y: adjustedY };
  };

  // Manejar acciones del menú
  const handleAction = (action, data = {}) => {
    switch (action) {
      case 'refresh':
        window.location.reload();
        break;
      case 'open-terminal':
        console.log('Terminal action - window system removed');
        break;
      case 'open-files':
        console.log('Files action - window system removed');
        break;
      case 'change-wallpaper':
        // Implementar cambio de fondo de pantalla
        console.log('Cambiar fondo de pantalla');
        break;
      case 'display-settings':
        console.log('Settings action - window system removed');
        break;
      case 'toggle-theme':
        toggleTheme();
        break;
      case 'about':
        console.log('About action - window system removed');
        break;
      default:
        break;
    }
    onClose();
  };

  // Opciones del menú contextual
  const menuItems = [
    {
      id: 'refresh',
      label: 'Actualizar',
      icon: RefreshCw,
      action: () => handleAction('refresh')
    },
    { type: 'separator' },
    {
      id: 'open-terminal',
      label: 'Abrir Terminal',
      icon: Terminal,
      action: () => handleAction('open-terminal')
    },
    {
      id: 'open-files',
      label: 'Abrir Archivos',
      icon: FolderOpen,
      action: () => handleAction('open-files')
    },
    { type: 'separator' },
    {
      id: 'change-wallpaper',
      label: 'Cambiar fondo',
      icon: Image,
      action: () => handleAction('change-wallpaper')
    },
    {
      id: 'toggle-theme',
      label: theme === 'light' ? 'Tema oscuro' : 'Tema claro',
      icon: Palette,
      action: () => handleAction('toggle-theme')
    },
    {
      id: 'display-settings',
      label: 'Configuración de pantalla',
      icon: Monitor,
      action: () => handleAction('display-settings')
    },
    { type: 'separator' },
    {
      id: 'about',
      label: 'Acerca de Ubuntu',
      icon: Info,
      action: () => handleAction('about')
    }
  ];

  const position = adjustPosition();

  return (
    <motion.div
      ref={menuRef}
      className="context-menu fixed z-50"
      style={{
        left: position.x,
        top: position.y
      }}
      initial={{ opacity: 0, scale: 0.95, y: -10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -10 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
    >
      <div className="menu-container min-w-48 bg-white/95 dark:bg-ubuntu-dark-surface/95 backdrop-blur-md rounded-lg shadow-2xl border border-white/20 dark:border-white/10 py-2">
        {menuItems.map((item, index) => {
          if (item.type === 'separator') {
            return (
              <div 
                key={`separator-${index}`} 
                className="h-px bg-gray-200/50 dark:bg-white/10 mx-2 my-1" 
              />
            );
          }

          const IconComponent = item.icon;

          return (
            <motion.button
              key={item.id}
              className="menu-item w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-ubuntu-orange/10 dark:hover:bg-ubuntu-orange/20 transition-colors duration-150 text-gray-800 dark:text-white"
              onClick={item.action}
              whileHover={{ x: 2 }}
              whileTap={{ scale: 0.98 }}
            >
              <IconComponent size={16} className="text-gray-600 dark:text-gray-300" />
              <span className="text-sm font-medium">{item.label}</span>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}

export default ContextMenu;
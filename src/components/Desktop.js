import React, { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Terminal, 
  FolderOpen, 
  Settings, 
  Info, 
  Briefcase,
  FileText
} from 'lucide-react';

// Hooks de contexto
import { useWindowManager } from '../contexts/WindowManagerContext';
import { useApplications } from '../contexts/ApplicationContext';

// Componentes
import Taskbar from './Taskbar';
import ContextMenu from './ContextMenu';

function Desktop() {
  const { openWindow } = useWindowManager();
  const { launchApplication, getFavoriteApplications } = useApplications();
  
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0 });
  const [selectedIcons, setSelectedIcons] = useState([]);

  // Iconos del escritorio (aplicaciones favoritas) - memoized to prevent recreation
  const desktopIcons = useMemo(() => [
    {
      id: 'terminal',
      name: 'Terminal',
      icon: Terminal,
      position: { x: 50, y: 50 }
    },
    {
      id: 'fileManager',
      name: 'Archivos',
      icon: FolderOpen,
      position: { x: 50, y: 150 }
    },
    {
      id: 'portfolio',
      name: 'Portafolio',
      icon: Briefcase,
      position: { x: 50, y: 250 }
    },
    {
      id: 'textEditor',
      name: 'Editor',
      icon: FileText,
      position: { x: 50, y: 350 }
    },
    {
      id: 'settings',
      name: 'Configuración',
      icon: Settings,
      position: { x: 150, y: 50 }
    },
    {
      id: 'about',
      name: 'Acerca de',
      icon: Info,
      position: { x: 150, y: 150 }
    }
  ], []);

  // Manejar doble clic en icono
  const handleIconDoubleClick = useCallback((iconId) => {
    console.log('Double click detected on icon:', iconId);
    const windowId = `${iconId}-${Date.now()}`;
    
    // Mapear IDs de iconos a tipos de componentes
    const componentMap = {
      'terminal': 'terminal',
      'fileManager': 'fileManager',
      'portfolio': 'portfolio',
      'textEditor': 'textEditor',
      'settings': 'settings',
      'about': 'about'
    };
    
    const componentType = componentMap[iconId] || iconId;
    const iconData = desktopIcons.find(icon => icon.id === iconId);
    const title = iconData?.name || iconId;
    
    console.log('Opening window with type:', componentType);
    
    // Lanzar aplicación para tracking
    launchApplication(iconId, windowId);
    
    // Abrir ventana
    openWindow({
      id: windowId,
      type: componentType,
      title: title,
      component: componentType
    });
  }, [launchApplication, openWindow, desktopIcons]);

  // Manejar clic derecho en el escritorio
  const handleContextMenu = useCallback((e) => {
    e.preventDefault();
    setContextMenu({
      visible: true,
      x: e.clientX,
      y: e.clientY
    });
  }, []);

  // Cerrar menú contextual
  const closeContextMenu = useCallback(() => {
    setContextMenu({ visible: false, x: 0, y: 0 });
  }, []);

  // Manejar clic en el escritorio
  const handleDesktopClick = useCallback((e) => {
    if (e.target === e.currentTarget) {
      setSelectedIcons([]);
      closeContextMenu();
    }
  }, [closeContextMenu]);

  // Componente de icono del escritorio
  const DesktopIcon = ({ icon, onDoubleClick, isSelected }) => {
    const IconComponent = icon.icon;
    
    const handleClick = useCallback((e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log('Icon clicked:', icon.id);
      onDoubleClick(icon.id);
    }, [icon.id, onDoubleClick]);
    
    return (
      <motion.div
        className={`
          desktop-icon group cursor-pointer select-none
          flex flex-col items-center justify-center
          w-20 h-20 p-2 rounded-lg
          transition-all duration-200
          hover:bg-white/10 dark:hover:bg-black/20
          ${isSelected ? 'bg-ubuntu-orange/20 dark:bg-ubuntu-orange/30' : ''}
        `}
        style={{
          position: 'absolute',
          left: icon.position.x,
          top: icon.position.y
        }}
        onClick={handleClick}
        onDoubleClick={handleClick}
        tabIndex={0}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="icon-container mb-1" style={{ pointerEvents: 'none' }}>
          <IconComponent 
            size={32} 
            className="text-white drop-shadow-lg group-hover:text-ubuntu-orange transition-colors duration-200" 
          />
        </div>
        <span className="text-xs text-white font-medium text-center drop-shadow-md leading-tight" style={{ pointerEvents: 'none' }}>
          {icon.name}
        </span>
      </motion.div>
    );
  };

  return (
    <div 
      className="desktop relative w-full h-screen overflow-hidden"
      onClick={handleDesktopClick}
      onContextMenu={handleContextMenu}
    >
      {/* Fondo del escritorio con patrón Ubuntu */}
      <div className="absolute inset-0 bg-gradient-to-br from-ubuntu-orange-light via-ubuntu-purple-light to-ubuntu-orange-dark dark:from-ubuntu-dark-bg dark:via-ubuntu-dark-surface dark:to-ubuntu-dark-bg" />
      
      {/* Patrón de puntos sutil */}
      <div 
        className="absolute inset-0 opacity-10 dark:opacity-5"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}
      />

      {/* Iconos del escritorio */}
      <div className="desktop-icons relative z-10">
        <AnimatePresence>
          {desktopIcons.map((icon) => (
            <DesktopIcon
              key={icon.id}
              icon={icon}
              onDoubleClick={handleIconDoubleClick}
              isSelected={selectedIcons.includes(icon.id)}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Menú contextual */}
      <AnimatePresence>
        {contextMenu.visible && (
          <ContextMenu
            x={contextMenu.x}
            y={contextMenu.y}
            onClose={closeContextMenu}
          />
        )}
      </AnimatePresence>

      {/* Barra de tareas */}
      <Taskbar />
    </div>
  );
}

export default Desktop;

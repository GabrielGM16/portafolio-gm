import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  Settings, 
  Wifi, 
  Volume2, 
  Battery
} from 'lucide-react';

// Hooks de contexto
import { useTheme } from '../contexts/ThemeContext';
import { useWindowManager } from '../contexts/WindowManagerContext';

// Componentes
import StartMenu from './StartMenu';
import SystemTray from './SystemTray';

function Taskbar() {
  const { currentTheme, toggleTheme } = useTheme();
  const { windows, focusWindow, minimizeWindow } = useWindowManager();
  
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showSystemTray, setShowSystemTray] = useState(false);

  // Actualizar reloj cada segundo
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Formatear hora
  const formatTime = (date) => {
    return date.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  // Formatear fecha
  const formatDate = (date) => {
    return date.toLocaleDateString('es-ES', {
      weekday: 'short',
      day: 'numeric',
      month: 'short'
    });
  };

  // Manejar clic en ventana de la taskbar
  const handleWindowClick = (windowId) => {
    const window = windows.find(w => w.id === windowId);
    if (window) {
      if (window.isMinimized) {
        // Si está minimizada, restaurarla y enfocarla
        focusWindow(windowId);
      } else if (window.zIndex === Math.max(...windows.map(w => w.zIndex))) {
        // Si ya está enfocada, minimizarla
        minimizeWindow(windowId);
      } else {
        // Si no está enfocada, enfocarla
        focusWindow(windowId);
      }
    }
  };

  // Obtener ventanas visibles (no minimizadas)
  const visibleWindows = windows.filter(w => !w.isMinimized);
  const activeWindow = windows.find(w => w.zIndex === Math.max(...windows.map(win => win.zIndex)));

  return (
    <>
      {/* Barra de tareas principal */}
      <motion.div 
        className="taskbar fixed bottom-0 left-0 right-0 z-50"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="taskbar-container h-12 backdrop-blur-md border-t shadow-2xl" style={{
          backgroundColor: `${currentTheme.colors.surface}E6`,
          borderColor: `${currentTheme.colors.border}40`,
          boxShadow: `0 -4px 20px ${currentTheme.colors.shadow}`
        }}>
          <div className="flex items-center justify-between h-full px-2">
            
            {/* Lado izquierdo - Botón de inicio y ventanas */}
            <div className="flex items-center space-x-1">
              {/* Botón de inicio (Activities) */}
              <motion.button
                className="start-button flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200"
                style={{
                  backgroundColor: showStartMenu ? currentTheme.colors.primary : 'transparent',
                  color: showStartMenu ? '#FFFFFF' : currentTheme.colors.text + 'CC'
                }}
                onMouseEnter={(e) => {
                  if (!showStartMenu) {
                    e.target.style.backgroundColor = currentTheme.colors.text + '1A';
                    e.target.style.color = currentTheme.colors.text;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!showStartMenu) {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.color = currentTheme.colors.text + 'CC';
                  }
                }}
                onClick={() => setShowStartMenu(!showStartMenu)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Menu size={20} />
              </motion.button>

              {/* Separador */}
              <div className="w-px h-6" style={{ backgroundColor: currentTheme.colors.border + '40' }} />

              {/* Ventanas abiertas */}
              <div className="flex items-center space-x-1">
                {windows.map((window) => {
                  const isActive = activeWindow?.id === window.id;
                  const isMinimized = window.isMinimized;
                  
                  return (
                    <motion.button
                      key={window.id}
                      className="window-button flex items-center space-x-2 px-3 py-1.5 rounded-lg transition-all duration-200 max-w-48 min-w-16 border"
                      style={{
                        backgroundColor: isActive && !isMinimized
                          ? currentTheme.colors.primary + '33'
                          : isMinimized
                          ? currentTheme.colors.text + '0D'
                          : currentTheme.colors.text + '1A',
                        color: isActive && !isMinimized
                          ? currentTheme.colors.text
                          : isMinimized
                          ? currentTheme.colors.textSecondary
                          : currentTheme.colors.text + 'CC',
                        borderColor: isActive && !isMinimized
                          ? currentTheme.colors.primary + '4D'
                          : currentTheme.colors.border + '40'
                      }}
                      onClick={() => handleWindowClick(window.id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      layout
                    >
                      {/* Indicador de estado */}
                      <div 
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{
                          backgroundColor: isActive && !isMinimized
                            ? currentTheme.colors.primary
                            : isMinimized
                            ? currentTheme.colors.text + '4D'
                            : currentTheme.colors.text + '80'
                        }}
                      />
                      
                      {/* Título de la ventana */}
                      <span className="text-sm font-medium truncate">
                        {window.title}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Lado derecho - System Tray y reloj */}
            <div className="flex items-center space-x-2">
              {/* Indicadores del sistema */}
              <div className="flex items-center space-x-1" style={{ color: currentTheme.colors.textSecondary }}>
                <Wifi size={16} className="transition-colors cursor-pointer hover:opacity-100" style={{ opacity: 0.7 }} />
                <Volume2 size={16} className="transition-colors cursor-pointer hover:opacity-100" style={{ opacity: 0.7 }} />
                <Battery size={16} className="transition-colors cursor-pointer hover:opacity-100" style={{ opacity: 0.7 }} />
              </div>

              {/* Separador */}
              <div className="w-px h-6" style={{ backgroundColor: currentTheme.colors.border + '40' }} />

              {/* Reloj y fecha */}
              <motion.button
                className="clock-container flex flex-col items-end px-2 py-1 rounded-lg transition-all duration-200"
                style={{ color: currentTheme.colors.text }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = currentTheme.colors.text + '1A';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                }}
                onClick={() => setShowSystemTray(!showSystemTray)}
                whileHover={{ scale: 1.02 }}
              >
                <span className="text-sm font-medium" style={{ color: currentTheme.colors.text }}>
                  {formatTime(currentTime)}
                </span>
                <span className="text-xs" style={{ color: currentTheme.colors.textSecondary }}>
                  {formatDate(currentTime)}
                </span>
              </motion.button>

              {/* Botón de configuración */}
              <motion.button
                className="settings-button flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200"
                style={{ color: currentTheme.colors.textSecondary }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = currentTheme.colors.text + '1A';
                  e.target.style.color = currentTheme.colors.text;
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = currentTheme.colors.textSecondary;
                }}
                onClick={toggleTheme}
                whileHover={{ scale: 1.05, rotate: 90 }}
                whileTap={{ scale: 0.95 }}
              >
                <Settings size={16} />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Menú de inicio */}
      <AnimatePresence>
        {showStartMenu && (
          <StartMenu 
            onClose={() => setShowStartMenu(false)}
          />
        )}
      </AnimatePresence>

      {/* System Tray */}
      <AnimatePresence>
        {showSystemTray && (
          <SystemTray 
            onClose={() => setShowSystemTray(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default Taskbar;
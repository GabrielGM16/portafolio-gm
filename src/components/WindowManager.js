import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';

// Hooks de contexto
import { useWindowManager } from '../contexts/WindowManagerContext';
import { useTheme } from '../contexts/ThemeContext';

// Componentes
import LinuxWindow from './LinuxWindow';

// Componentes de ventanas
import TerminalWindow from './windows/TerminalWindow';
import FileManagerWindow from './windows/FileManagerWindow';
import SettingsWindow from './windows/SettingsWindow';
import AboutWindow from './windows/AboutWindow';
import PortfolioWindow from './windows/PortfolioWindow';
import TextEditorWindow from './windows/TextEditorWindow';

function WindowManager() {
  const { windows, updateWindow, updateWindowPosition, closeWindow, focusWindow, minimizeWindow, maximizeWindow } = useWindowManager();
  const { theme } = useTheme();
  
  // Estado solo para resize (drag se maneja localmente en cada ventana)
  const [resizeState, setResizeState] = useState({
    isResizing: false,
    windowId: null,
    startPos: { x: 0, y: 0 },
    startSize: { width: 0, height: 0 },
    direction: null
  });

  // Componentes de ventanas disponibles
  const windowComponents = {
    terminal: TerminalWindow,
    fileManager: FileManagerWindow,
    settings: SettingsWindow,
    about: AboutWindow,
    portfolio: PortfolioWindow,
    textEditor: TextEditorWindow
  };
  
  console.log('Available window components:', Object.keys(windowComponents));
  console.log('Current windows:', windows.map(w => ({ id: w.id, type: w.type, component: w.component })));

  // Manejar finalización de arrastre (optimizado para evitar re-renders)
  const handleDragEnd = useCallback((e, windowId, finalPosition) => {
    // Actualizar posición directamente usando updateWindowPosition
    if (finalPosition) {
      updateWindowPosition(windowId, finalPosition);
      return;
    }
  }, [updateWindowPosition]);

  // Manejar inicio de redimensionamiento
  const handleResizeStart = useCallback((e, windowId, direction) => {
    e.preventDefault();
    e.stopPropagation();
    
    const window = windows.find(w => w.id === windowId);
    if (!window || window.isMaximized) return;

    setResizeState({
      isResizing: true,
      windowId,
      startPos: { x: e.clientX, y: e.clientY },
      startSize: { width: window.size.width, height: window.size.height },
      direction
    });
    
    focusWindow(windowId);
  }, [windows, focusWindow]);

  // Referencias para evitar re-renders excesivos (solo para resize)
  const resizeStateRef = useRef(resizeState);
  const windowsRef = useRef(windows);
  const updateWindowRef = useRef(updateWindow);
  
  // Actualizar referencias
  useEffect(() => {
    resizeStateRef.current = resizeState;
    windowsRef.current = windows;
    updateWindowRef.current = updateWindow;
  });

  // Manejar movimiento del mouse optimizado (solo para resize)
  useEffect(() => {
    const handleMouseMove = (e) => {
      const currentResizeState = resizeStateRef.current;
      const currentWindows = windowsRef.current;
      const currentUpdateWindow = updateWindowRef.current;
      
      // Manejar redimensionamiento
      if (currentResizeState.isResizing && currentResizeState.windowId) {
        const deltaX = e.clientX - currentResizeState.startPos.x;
        const deltaY = e.clientY - currentResizeState.startPos.y;
        
        const targetWindow = currentWindows.find(w => w.id === currentResizeState.windowId);
        if (!targetWindow) return;
        
        let newWidth = currentResizeState.startSize.width;
        let newHeight = currentResizeState.startSize.height;
        let newX = targetWindow.position.x;
        let newY = targetWindow.position.y;
        
        // Aplicar cambios según la dirección
        if (currentResizeState.direction.includes('right')) {
          newWidth = Math.max(300, currentResizeState.startSize.width + deltaX);
        }
        if (currentResizeState.direction.includes('left')) {
          newWidth = Math.max(300, currentResizeState.startSize.width - deltaX);
          newX = targetWindow.position.x + (currentResizeState.startSize.width - newWidth);
        }
        if (currentResizeState.direction.includes('bottom')) {
          newHeight = Math.max(200, currentResizeState.startSize.height + deltaY);
        }
        if (currentResizeState.direction.includes('top')) {
          newHeight = Math.max(200, currentResizeState.startSize.height - deltaY);
          newY = targetWindow.position.y + (currentResizeState.startSize.height - newHeight);
        }
        
        // Limitar a los bordes de la pantalla
        newWidth = Math.min(newWidth, window.innerWidth - newX);
        newHeight = Math.min(newHeight, window.innerHeight - newY);
        
        // Usar requestAnimationFrame para suavizar las actualizaciones
        requestAnimationFrame(() => {
          currentUpdateWindow(currentResizeState.windowId, {
            size: { width: newWidth, height: newHeight },
            position: { x: newX, y: newY }
          });
        });
      }
    };

    const handleMouseUp = () => {
      setResizeState({
        isResizing: false,
        windowId: null,
        startPos: { x: 0, y: 0 },
        startSize: { width: 0, height: 0 },
        direction: null
      });
    };

    if (resizeState.isResizing) {
      document.addEventListener('mousemove', handleMouseMove, { passive: true });
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'resizing';
      document.body.style.userSelect = 'none';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [resizeState.isResizing]);

  // Calcular el zIndex máximo una sola vez
  const maxZIndex = useMemo(() => {
    return Math.max(...windows.map(w => w.zIndex));
  }, [windows]);

  // Handlers optimizados para controles de ventana
  const handleMinimize = useCallback((windowId) => (e) => {
    e.stopPropagation();
    minimizeWindow(windowId);
  }, [minimizeWindow]);

  const handleMaximize = useCallback((windowId) => (e) => {
    e.stopPropagation();
    maximizeWindow(windowId);
  }, [maximizeWindow]);

  const handleClose = useCallback((windowId) => (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Cerrando ventana:', windowId);
    closeWindow(windowId);
  }, [closeWindow]);

  const handleMouseDown = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  // Componente de ventana individual optimizado con estilo Linux
  const Window = React.memo(({ window }) => {
    const WindowComponent = windowComponents[window.component] || windowComponents[window.type];
    const isActive = window.zIndex === maxZIndex;
    
    return (
      <LinuxWindow
        window={window}
        isActive={isActive}
        onDragEnd={handleDragEnd}
        onResizeStart={handleResizeStart}
        onFocus={focusWindow}
        onMinimize={handleMinimize}
        onMaximize={handleMaximize}
        onClose={handleClose}
      >
        {WindowComponent ? (
          <WindowComponent windowId={window.id} {...window.props} />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
            Componente no encontrado: {window.component || window.type}
          </div>
        )}
      </LinuxWindow>
    );
  }, (prevProps, nextProps) => {
    // Comparación personalizada para evitar re-renders innecesarios
    const prev = prevProps.window;
    const next = nextProps.window;
    
    return (
      prev.id === next.id &&
      prev.position.x === next.position.x &&
      prev.position.y === next.position.y &&
      prev.size.width === next.size.width &&
      prev.size.height === next.size.height &&
      prev.state === next.state &&
      prev.zIndex === next.zIndex &&
      prev.title === next.title
    );
  });

  return (
    <div className="window-manager fixed inset-0 pointer-events-none">
      <AnimatePresence mode="popLayout">
        {windows
          .sort((a, b) => a.zIndex - b.zIndex)
          .map((window) => (
            <div key={window.id} className="pointer-events-auto">
              <Window window={window} />
            </div>
          ))
        }
      </AnimatePresence>
    </div>
  );
}

export default WindowManager
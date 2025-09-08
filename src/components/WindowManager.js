import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Minus, 
  Square, 
  X, 
  Maximize2, 
  Minimize2
} from 'lucide-react';

// Hooks de contexto
import { useWindowManager } from '../contexts/WindowManagerContext';
import { useTheme } from '../contexts/ThemeContext';

// Componentes de ventanas
import TerminalWindow from './windows/TerminalWindow';
import FileManagerWindow from './windows/FileManagerWindow';
import SettingsWindow from './windows/SettingsWindow';
import AboutWindow from './windows/AboutWindow';
import PortfolioWindow from './windows/PortfolioWindow';
import TextEditorWindow from './windows/TextEditorWindow';

function WindowManager() {
  const { windows, updateWindow, closeWindow, focusWindow, minimizeWindow, maximizeWindow } = useWindowManager();
  const { theme } = useTheme();
  
  const [dragState, setDragState] = useState({
    isDragging: false,
    windowId: null,
    startPos: { x: 0, y: 0 },
    startWindowPos: { x: 0, y: 0 }
  });
  
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

  // Manejar inicio de arrastre optimizado
  const handleDragStart = useCallback((e, windowId) => {
    e.preventDefault();
    const window = windows.find(w => w.id === windowId);
    if (!window || window.isMaximized) return;

    setDragState({
      isDragging: true,
      windowId,
      startPos: { x: e.clientX, y: e.clientY },
      startWindowPos: { x: window.position.x, y: window.position.y }
    });
    
    focusWindow(windowId);
  }, [windows, focusWindow]);

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

  // Referencias para evitar re-renders excesivos
  const dragStateRef = useRef(dragState);
  const resizeStateRef = useRef(resizeState);
  const windowsRef = useRef(windows);
  const updateWindowRef = useRef(updateWindow);
  
  // Actualizar referencias
  useEffect(() => {
    dragStateRef.current = dragState;
    resizeStateRef.current = resizeState;
    windowsRef.current = windows;
    updateWindowRef.current = updateWindow;
  });

  // Manejar movimiento del mouse optimizado
  useEffect(() => {
    const handleMouseMove = (e) => {
      const currentDragState = dragStateRef.current;
      const currentResizeState = resizeStateRef.current;
      const currentWindows = windowsRef.current;
      const currentUpdateWindow = updateWindowRef.current;
      
      // Manejar arrastre
      if (currentDragState.isDragging && currentDragState.windowId) {
        const deltaX = e.clientX - currentDragState.startPos.x;
        const deltaY = e.clientY - currentDragState.startPos.y;
        
        const newX = Math.max(0, Math.min(
          window.innerWidth - 200,
          currentDragState.startWindowPos.x + deltaX
        ));
        const newY = Math.max(0, Math.min(
          window.innerHeight - 100,
          currentDragState.startWindowPos.y + deltaY
        ));
        
        // Usar requestAnimationFrame para suavizar las actualizaciones
        requestAnimationFrame(() => {
          currentUpdateWindow(currentDragState.windowId, {
            position: { x: newX, y: newY }
          });
        });
      }
      
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
      setDragState({
        isDragging: false,
        windowId: null,
        startPos: { x: 0, y: 0 },
        startWindowPos: { x: 0, y: 0 }
      });
      
      setResizeState({
        isResizing: false,
        windowId: null,
        startPos: { x: 0, y: 0 },
        startSize: { width: 0, height: 0 },
        direction: null
      });
    };

    if (dragState.isDragging || resizeState.isResizing) {
      document.addEventListener('mousemove', handleMouseMove, { passive: true });
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = dragState.isDragging ? 'grabbing' : 'resizing';
      document.body.style.userSelect = 'none';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [dragState.isDragging, resizeState.isResizing]);

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

  // Componente de ventana individual optimizado
  const Window = React.memo(({ window }) => {
    const WindowComponent = windowComponents[window.component] || windowComponents[window.type];
    const isActive = window.zIndex === maxZIndex;
    
    if (window.state === 'minimized') return null;

    return (
      <motion.div
        className={`
          window fixed select-none
          ${isActive ? 'z-50' : 'z-40'}
        `}
        style={{
          left: window.position.x,
          top: window.position.y,
          width: window.state === 'maximized' ? '100vw' : window.size.width,
          height: window.state === 'maximized' ? '100vh' : window.size.height,
          zIndex: window.zIndex
        }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ 
          opacity: 1, 
          scale: 1,
          x: window.state === 'maximized' ? -window.position.x : 0,
          y: window.state === 'maximized' ? -window.position.y : 0
        }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        onClick={() => focusWindow(window.id)}
      >
        {/* Barra de título */}
        <div 
          className={`
            window-header flex items-center justify-between
            h-10 px-4 bg-ubuntu-dark-surface dark:bg-ubuntu-dark-bg
            border-b border-white/10 cursor-grab active:cursor-grabbing
            ${isActive ? 'bg-opacity-100' : 'bg-opacity-80'}
          `}
          onMouseDown={(e) => {
            // No iniciar drag si se hace click en los controles
            if (e.target.closest('.window-controls')) {
              return;
            }
            handleDragStart(e, window.id);
          }}
        >
          <div className="window-title flex items-center space-x-2">
            <div className="window-icon w-4 h-4 bg-ubuntu-orange rounded-sm" />
            <span className="text-sm font-medium text-white truncate">
              {window.title}
            </span>
          </div>
          
          <div className="window-controls flex items-center space-x-1">
            <button
              className="control-button w-6 h-6 flex items-center justify-center rounded hover:bg-yellow-500 transition-colors duration-150"
              onClick={handleMinimize(window.id)}
            >
              <Minus size={12} className="text-white" />
            </button>
            
            <button
              className="control-button w-6 h-6 flex items-center justify-center rounded hover:bg-green-500 transition-colors duration-150"
              onClick={handleMaximize(window.id)}
            >
              {window.state === 'maximized' ? (
                <Minimize2 size={12} className="text-white" />
              ) : (
                <Maximize2 size={12} className="text-white" />
              )}
            </button>
            
            <button
              className="control-button w-6 h-6 flex items-center justify-center rounded hover:bg-red-500 transition-colors duration-150"
              onClick={handleClose(window.id)}
              onMouseDown={handleMouseDown}
            >
              <X size={12} className="text-white" />
            </button>
          </div>
        </div>

        {/* Contenido de la ventana */}
        <div className="window-content h-full bg-white dark:bg-ubuntu-dark-surface overflow-hidden">
          {WindowComponent ? (
            <WindowComponent windowId={window.id} {...window.props} />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
              Componente no encontrado: {window.component || window.type}
            </div>
          )}
        </div>

        {/* Bordes de redimensionamiento */}
        {window.state !== 'maximized' && (
          <>
            {/* Bordes */}
            <div 
              className="absolute top-0 left-0 right-0 h-1 cursor-n-resize"
              onMouseDown={(e) => handleResizeStart(e, window.id, 'top')}
            />
            <div 
              className="absolute bottom-0 left-0 right-0 h-1 cursor-s-resize"
              onMouseDown={(e) => handleResizeStart(e, window.id, 'bottom')}
            />
            <div 
              className="absolute top-0 bottom-0 left-0 w-1 cursor-w-resize"
              onMouseDown={(e) => handleResizeStart(e, window.id, 'left')}
            />
            <div 
              className="absolute top-0 bottom-0 right-0 w-1 cursor-e-resize"
              onMouseDown={(e) => handleResizeStart(e, window.id, 'right')}
            />
            
            {/* Esquinas */}
            <div 
              className="absolute top-0 left-0 w-2 h-2 cursor-nw-resize"
              onMouseDown={(e) => handleResizeStart(e, window.id, 'top-left')}
            />
            <div 
              className="absolute top-0 right-0 w-2 h-2 cursor-ne-resize"
              onMouseDown={(e) => handleResizeStart(e, window.id, 'top-right')}
            />
            <div 
              className="absolute bottom-0 left-0 w-2 h-2 cursor-sw-resize"
              onMouseDown={(e) => handleResizeStart(e, window.id, 'bottom-left')}
            />
            <div 
              className="absolute bottom-0 right-0 w-2 h-2 cursor-se-resize"
              onMouseDown={(e) => handleResizeStart(e, window.id, 'bottom-right')}
            />
          </>
        )}
      </motion.div>
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
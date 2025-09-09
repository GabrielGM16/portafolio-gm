import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Minus, 
  Square, 
  X,
  Maximize2,
  Minimize2,
  MoreHorizontal
} from 'lucide-react';

// Componente de ventana individual con estilo Linux completamente optimizado
const LinuxWindow = React.memo(({ 
  window, 
  isActive, 
  onDragEnd, 
  onResizeStart, 
  onFocus, 
  onMinimize, 
  onMaximize, 
  onClose,
  children 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  // Eliminar estados que causan re-renders durante drag
  const headerRef = useRef(null);
  const windowRef = useRef(null);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);
  const dragOffsetRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef(null);

  const handleMouseDown = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  // Optimized drag handling with pure CSS transforms - NO re-renders
  const handleDragMove = useCallback((e) => {
    if (!isDraggingRef.current) return;
    
    const deltaX = e.clientX - dragStartPos.current.x;
    const deltaY = e.clientY - dragStartPos.current.y;
    
    // Store offset in ref to avoid state updates
    dragOffsetRef.current = { x: deltaX, y: deltaY };
    
    // Use CSS transform for immediate visual feedback without re-renders
    if (windowRef.current) {
      windowRef.current.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    }
  }, []);

  const handleDragEnd = useCallback(() => {
    if (!isDraggingRef.current) return;
    
    // Reset transform and update actual position
    if (windowRef.current) {
      windowRef.current.style.transform = '';
    }
    
    // Validar valores de entrada y calcular nueva posición segura
    const currentX = typeof window.position?.x === 'number' && !isNaN(window.position.x) ? window.position.x : 100;
    const currentY = typeof window.position?.y === 'number' && !isNaN(window.position.y) ? window.position.y : 100;
    const offsetX = typeof dragOffsetRef.current?.x === 'number' && !isNaN(dragOffsetRef.current.x) ? dragOffsetRef.current.x : 0;
    const offsetY = typeof dragOffsetRef.current?.y === 'number' && !isNaN(dragOffsetRef.current.y) ? dragOffsetRef.current.y : 0;
    
    // Calculate final position using ref values
    let newX = Math.max(0, Math.min(
      window.innerWidth - 200,
      currentX + offsetX
    ));
    let newY = Math.max(0, Math.min(
      window.innerHeight - 100,
      currentY + offsetY
    ));
    
    // Validar que la nueva posición sea válida
    if (isNaN(newX) || isNaN(newY)) {
      console.warn('Invalid position calculated, using fallback values');
      newX = isNaN(newX) ? currentX : newX;
      newY = isNaN(newY) ? currentY : newY;
    }
    
    // Update window position in context (single state update)
    onDragEnd({ clientX: 0, clientY: 0 }, window.id, { x: newX, y: newY });
    
    // Reset refs without triggering re-renders
    isDraggingRef.current = false;
    dragOffsetRef.current = { x: 0, y: 0 };
  }, [window.position, window.id, onDragEnd]);

  // Create stable references for event handlers
  const dragMoveRef = useRef();
  const dragEndRef = useRef();
  
  dragMoveRef.current = handleDragMove;
  dragEndRef.current = handleDragEnd;

  const handleHeaderMouseDown = useCallback((e) => {
    // No iniciar drag si se hace click en los controles
    if (e.target.closest('.window-controls') || e.target.closest('.window-menu')) {
      return;
    }
    
    // Prevent default drag behavior
    e.preventDefault();
    e.stopPropagation();
    
    // Start optimized drag using refs - NO state updates
    isDraggingRef.current = true;
    dragStartPos.current = { x: e.clientX, y: e.clientY };
    
    // Create stable event handlers using refs
    const handleMove = (e) => {
      if (dragMoveRef.current) {
        dragMoveRef.current(e);
      }
    };
    
    const handleEnd = () => {
      // Clean up event listeners first
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseup', handleEnd);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      
      // Then call the drag end handler
      if (dragEndRef.current) {
        dragEndRef.current();
      }
    };
    
    // Add event listeners for drag
    document.addEventListener('mousemove', handleMove, { passive: true });
    document.addEventListener('mouseup', handleEnd);
    document.body.style.cursor = 'grabbing';
    document.body.style.userSelect = 'none';
    
    // Focus window
    onFocus(window.id);
  }, [window.id, onFocus]);

  const handleDoubleClick = useCallback((e) => {
    if (e.target.closest('.window-controls') || e.target.closest('.window-menu')) {
      return;
    }
    onMaximize(window.id)(e);
  }, [onMaximize, window.id]);

  if (window.state === 'minimized') return null;

  // Validar y asegurar valores numéricos válidos para posición
  const safePosition = {
    x: typeof window.position?.x === 'number' && !isNaN(window.position.x) ? window.position.x : 100,
    y: typeof window.position?.y === 'number' && !isNaN(window.position.y) ? window.position.y : 100
  };

  // Validar y asegurar valores numéricos válidos para tamaño
  const safeSize = {
    width: typeof window.size?.width === 'number' && !isNaN(window.size.width) ? window.size.width : 800,
    height: typeof window.size?.height === 'number' && !isNaN(window.size.height) ? window.size.height : 600
  };

  return (
    <motion.div
      ref={windowRef}
      className={`
        linux-window fixed select-none shadow-2xl
        ${isActive ? 'z-[100]' : 'z-[90]'}
        ${window.state === 'maximized' ? '' : 'rounded-lg overflow-hidden'}
      `}
      style={{
        left: safePosition.x,
        top: safePosition.y,
        width: window.state === 'maximized' ? '100vw' : safeSize.width,
        height: window.state === 'maximized' ? '100vh' : safeSize.height,
        zIndex: isActive ? 100 : 90,
        willChange: 'auto' // Remove dynamic willChange to prevent re-renders
      }}
      initial={{ opacity: 0, scale: 0.95, y: -20 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        y: 0,
        x: window.state === 'maximized' ? -safePosition.x : 0
      }}
      exit={{ opacity: 0, scale: 0.95, y: -20 }}
      transition={{ duration: 0.25, ease: "easeOut" }} // Static transition
      onClick={() => onFocus(window.id)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Borde exterior para ventanas activas */}
      {isActive && window.state !== 'maximized' && (
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg blur-sm" />
      )}

      {/* Contenedor principal de la ventana */}
      <div className={`
        relative h-full bg-white dark:bg-gray-800
        ${window.state === 'maximized' ? '' : 'rounded-lg'}
        ${isActive ? 'ring-1 ring-blue-500/30' : 'ring-1 ring-gray-300/20 dark:ring-gray-600/20'}
        overflow-hidden
      `}>
        {/* Barra de título estilo Linux */}
        <div 
          ref={headerRef}
          className={`
            window-header flex items-center justify-between
            h-10 px-3 cursor-grab active:cursor-grabbing
            bg-gradient-to-r 
            ${isActive 
              ? 'from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600' 
              : 'from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700'
            }
            border-b border-gray-200 dark:border-gray-600
            ${window.state === 'maximized' ? '' : 'rounded-t-lg'}
          `}
          onMouseDown={handleHeaderMouseDown}
          onDoubleClick={handleDoubleClick}
        >
          {/* Lado izquierdo - Controles de ventana estilo Linux */}
          <div className="window-controls flex items-center space-x-2">
            {/* Botón cerrar (rojo) */}
            <button
              className={`
                control-button w-3 h-3 rounded-full transition-all duration-200
                ${isHovered || isActive 
                  ? 'bg-red-500 hover:bg-red-600 shadow-sm' 
                  : 'bg-gray-300 dark:bg-gray-600'
                }
                flex items-center justify-center group
              `}
              onClick={onClose(window.id)}
              onMouseDown={handleMouseDown}
              title="Cerrar"
            >
              {(isHovered || isActive) && (
                <X size={8} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              )}
            </button>
            
            {/* Botón minimizar (amarillo) */}
            <button
              className={`
                control-button w-3 h-3 rounded-full transition-all duration-200
                ${isHovered || isActive 
                  ? 'bg-yellow-500 hover:bg-yellow-600 shadow-sm' 
                  : 'bg-gray-300 dark:bg-gray-600'
                }
                flex items-center justify-center group
              `}
              onClick={onMinimize(window.id)}
              title="Minimizar"
            >
              {(isHovered || isActive) && (
                <Minus size={8} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              )}
            </button>
            
            {/* Botón maximizar (verde) */}
            <button
              className={`
                control-button w-3 h-3 rounded-full transition-all duration-200
                ${isHovered || isActive 
                  ? 'bg-green-500 hover:bg-green-600 shadow-sm' 
                  : 'bg-gray-300 dark:bg-gray-600'
                }
                flex items-center justify-center group
              `}
              onClick={onMaximize(window.id)}
              title={window.state === 'maximized' ? 'Restaurar' : 'Maximizar'}
            >
              {(isHovered || isActive) && (
                window.state === 'maximized' ? (
                  <Minimize2 size={8} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                ) : (
                  <Square size={6} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                )
              )}
            </button>
          </div>

          {/* Centro - Título de la ventana */}
          <div className="window-title flex-1 flex items-center justify-center px-4">
            <div className="flex items-center space-x-2 max-w-full">
              {/* Icono de la aplicación */}
              <div className={`
                window-icon w-4 h-4 rounded-sm flex-shrink-0
                ${isActive 
                  ? 'bg-blue-500' 
                  : 'bg-gray-400 dark:bg-gray-500'
                }
              `} />
              <span className={`
                text-sm font-medium truncate
                ${isActive 
                  ? 'text-gray-800 dark:text-gray-100' 
                  : 'text-gray-600 dark:text-gray-400'
                }
              `}>
                {window.title}
              </span>
            </div>
          </div>

          {/* Lado derecho - Menú de ventana */}
          <div className="window-menu flex items-center">
            <button
              className={`
                menu-button w-6 h-6 flex items-center justify-center rounded
                transition-colors duration-150
                ${isActive 
                  ? 'hover:bg-gray-200 dark:hover:bg-gray-600' 
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }
              `}
              title="Menú de ventana"
            >
              <MoreHorizontal size={14} className={`
                ${isActive 
                  ? 'text-gray-600 dark:text-gray-300' 
                  : 'text-gray-400 dark:text-gray-500'
                }
              `} />
            </button>
          </div>
        </div>

        {/* Contenido de la ventana */}
        <div className="window-content flex-1 bg-white dark:bg-gray-800 overflow-hidden" style={{ height: 'calc(100% - 2.5rem)' }}>
          {children}
        </div>

        {/* Bordes de redimensionamiento */}
        {window.state !== 'maximized' && (
          <>
            {/* Bordes */}
            <div 
              className="absolute top-0 left-2 right-2 h-1 cursor-n-resize hover:bg-blue-500/20 transition-colors"
              onMouseDown={(e) => onResizeStart(e, window.id, 'top')}
            />
            <div 
              className="absolute bottom-0 left-2 right-2 h-1 cursor-s-resize hover:bg-blue-500/20 transition-colors"
              onMouseDown={(e) => onResizeStart(e, window.id, 'bottom')}
            />
            <div 
              className="absolute top-2 bottom-2 left-0 w-1 cursor-w-resize hover:bg-blue-500/20 transition-colors"
              onMouseDown={(e) => onResizeStart(e, window.id, 'left')}
            />
            <div 
              className="absolute top-2 bottom-2 right-0 w-1 cursor-e-resize hover:bg-blue-500/20 transition-colors"
              onMouseDown={(e) => onResizeStart(e, window.id, 'right')}
            />
            
            {/* Esquinas */}
            <div 
              className="absolute top-0 left-0 w-3 h-3 cursor-nw-resize hover:bg-blue-500/20 transition-colors rounded-tl-lg"
              onMouseDown={(e) => onResizeStart(e, window.id, 'top-left')}
            />
            <div 
              className="absolute top-0 right-0 w-3 h-3 cursor-ne-resize hover:bg-blue-500/20 transition-colors rounded-tr-lg"
              onMouseDown={(e) => onResizeStart(e, window.id, 'top-right')}
            />
            <div 
              className="absolute bottom-0 left-0 w-3 h-3 cursor-sw-resize hover:bg-blue-500/20 transition-colors rounded-bl-lg"
              onMouseDown={(e) => onResizeStart(e, window.id, 'bottom-left')}
            />
            <div 
              className="absolute bottom-0 right-0 w-3 h-3 cursor-se-resize hover:bg-blue-500/20 transition-colors rounded-br-lg"
              onMouseDown={(e) => onResizeStart(e, window.id, 'bottom-right')}
            />
          </>
        )}
      </div>
    </motion.div>
  );
}, (prevProps, nextProps) => {
  // Optimized comparison to prevent unnecessary re-renders
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
    prev.title === next.title &&
    prevProps.isActive === nextProps.isActive
  );
});

export default LinuxWindow;
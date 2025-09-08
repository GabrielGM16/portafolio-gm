export const makeDraggable = (element, onDrag) => {
  let isDragging = false;
  let startX, startY, initialX, initialY;
  let animationId = null;
  let lastUpdateTime = 0;
  const throttleDelay = 16; // ~60fps

  const handleMouseDown = (e) => {
    // Prevenir selección de texto durante el arrastre
    e.preventDefault();
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    initialX = parseInt(element.style.left) || 0;
    initialY = parseInt(element.style.top) || 0;
    
    // Cambiar cursor inmediatamente
    document.body.style.cursor = 'grabbing';
    document.body.style.userSelect = 'none';
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    // Throttling para mejorar rendimiento
    const now = Date.now();
    if (now - lastUpdateTime < throttleDelay) {
      return;
    }
    lastUpdateTime = now;
    
    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;
    const newX = initialX + deltaX;
    const newY = initialY + deltaY;
    
    // Usar requestAnimationFrame para suavizar las actualizaciones
    if (animationId) {
      cancelAnimationFrame(animationId);
    }
    
    animationId = requestAnimationFrame(() => {
      // Aplicar transformación CSS en lugar de cambiar left/top para mejor rendimiento
      element.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
      
      if (onDrag) {
        onDrag({ x: newX, y: newY });
      }
    });
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    
    isDragging = false;
    
    // Limpiar animación pendiente
    if (animationId) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }
    
    // Restaurar cursor y selección
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
    
    // Aplicar posición final
    const deltaX = parseInt(element.style.transform.match(/translateX?\(([^)]+)px\)/)?.[1]) || 0;
    const deltaY = parseInt(element.style.transform.match(/translateY?\(([^)]+)px\)/)?.[1]) || 0;
    
    element.style.left = `${initialX + deltaX}px`;
    element.style.top = `${initialY + deltaY}px`;
    element.style.transform = '';
  };

  // Usar passive listeners para mejor rendimiento
  element.addEventListener('mousedown', handleMouseDown);
  document.addEventListener('mousemove', handleMouseMove, { passive: true });
  document.addEventListener('mouseup', handleMouseUp);
  
  // Función de limpieza
  return () => {
    element.removeEventListener('mousedown', handleMouseDown);
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
    
    if (animationId) {
      cancelAnimationFrame(animationId);
    }
  };
};
  
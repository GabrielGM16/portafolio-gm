import React, { createContext, useContext, useReducer, useCallback } from 'react';

// Estado inicial del gestor de ventanas
const initialState = {
  windows: [],
  activeWindowId: null,
  nextZIndex: 100,
  minimizedWindows: []
};

// Reducer para manejar acciones de ventanas
function windowManagerReducer(state, action) {
  switch (action.type) {
    case 'OPEN_WINDOW': {
      console.log('Reducer: OPEN_WINDOW action received with payload:', action.payload);
      const { id, type, title, props = {}, position, size, component } = action.payload;
      
      // Verificar si la ventana ya existe
      const existingWindow = state.windows.find(w => w.id === id);
      if (existingWindow) {
        console.log('Reducer: Window already exists, bringing to front:', id);
        // Si existe, traerla al frente
        return {
          ...state,
          activeWindowId: id,
          windows: state.windows.map(w => 
            w.id === id 
              ? { ...w, zIndex: state.nextZIndex, state: 'normal' }
              : w
          ),
          nextZIndex: state.nextZIndex + 1,
          minimizedWindows: state.minimizedWindows.filter(wId => wId !== id)
        };
      }

      // Crear nueva ventana
      const newWindow = {
        id,
        type,
        component: component || type,
        title,
        position: position || { x: 100 + (state.windows.length * 30), y: 50 + (state.windows.length * 30) },
        size: size || { width: 800, height: 600 },
        state: 'normal', // 'normal', 'minimized', 'maximized'
        zIndex: state.nextZIndex,
        isResizable: true,
        isDraggable: true,
        props
      };
      
      console.log('Reducer: Creating new window:', newWindow);

      const newState = {
        ...state,
        windows: [...state.windows, newWindow],
        activeWindowId: id,
        nextZIndex: state.nextZIndex + 1
      };
      
      console.log('Reducer: New state after OPEN_WINDOW:', newState);
      return newState;
    }

    case 'CLOSE_WINDOW': {
      const windowId = action.payload;
      const newWindows = state.windows.filter(w => w.id !== windowId);
      
      return {
        ...state,
        windows: newWindows,
        activeWindowId: state.activeWindowId === windowId 
          ? (newWindows.length > 0 ? newWindows[newWindows.length - 1].id : null)
          : state.activeWindowId,
        minimizedWindows: state.minimizedWindows.filter(wId => wId !== windowId)
      };
    }

    case 'MINIMIZE_WINDOW': {
      const windowId = action.payload;
      return {
        ...state,
        windows: state.windows.map(w => 
          w.id === windowId ? { ...w, state: 'minimized' } : w
        ),
        minimizedWindows: [...state.minimizedWindows, windowId],
        activeWindowId: state.activeWindowId === windowId ? null : state.activeWindowId
      };
    }

    case 'MAXIMIZE_WINDOW': {
      const windowId = action.payload;
      return {
        ...state,
        windows: state.windows.map(w => 
          w.id === windowId 
            ? { 
                ...w, 
                state: w.state === 'maximized' ? 'normal' : 'maximized',
                zIndex: state.nextZIndex
              } 
            : w
        ),
        activeWindowId: windowId,
        nextZIndex: state.nextZIndex + 1,
        minimizedWindows: state.minimizedWindows.filter(wId => wId !== windowId)
      };
    }

    case 'FOCUS_WINDOW': {
      const windowId = action.payload;
      return {
        ...state,
        windows: state.windows.map(w => 
          w.id === windowId ? { ...w, zIndex: state.nextZIndex } : w
        ),
        activeWindowId: windowId,
        nextZIndex: state.nextZIndex + 1
      };
    }

    case 'UPDATE_WINDOW_POSITION': {
      const { windowId, position } = action.payload;
      return {
        ...state,
        windows: state.windows.map(w => 
          w.id === windowId ? { ...w, position } : w
        )
      };
    }

    case 'UPDATE_WINDOW_SIZE': {
      const { windowId, size } = action.payload;
      return {
        ...state,
        windows: state.windows.map(w => 
          w.id === windowId ? { ...w, size } : w
        )
      };
    }

    case 'UPDATE_WINDOW': {
      const { windowId, updates } = action.payload;
      return {
        ...state,
        windows: state.windows.map(w => 
          w.id === windowId ? { ...w, ...updates } : w
        )
      };
    }

    case 'RESTORE_WINDOW': {
      const windowId = action.payload;
      return {
        ...state,
        windows: state.windows.map(w => 
          w.id === windowId 
            ? { ...w, state: 'normal', zIndex: state.nextZIndex }
            : w
        ),
        activeWindowId: windowId,
        nextZIndex: state.nextZIndex + 1,
        minimizedWindows: state.minimizedWindows.filter(wId => wId !== windowId)
      };
    }

    case 'LOAD_WINDOW_STATE': {
      try {
        const savedState = JSON.parse(action.payload);
        return {
          ...state,
          ...savedState,
          nextZIndex: Math.max(state.nextZIndex, savedState.nextZIndex || 100)
        };
      } catch {
        return state;
      }
    }

    default:
      return state;
  }
}

// Crear contexto
const WindowManagerContext = createContext();

// Hook personalizado para usar el contexto
export const useWindowManager = () => {
  const context = useContext(WindowManagerContext);
  if (!context) {
    throw new Error('useWindowManager debe ser usado dentro de un WindowManagerProvider');
  }
  return context;
};

// Provider del contexto
export const WindowManagerProvider = ({ children }) => {
  const [state, dispatch] = useReducer(windowManagerReducer, initialState);

  // Funciones de utilidad
  const openWindow = useCallback((windowConfig) => {
    console.log('WindowManagerContext: openWindow called with config:', windowConfig);
    dispatch({ type: 'OPEN_WINDOW', payload: windowConfig });
    console.log('WindowManagerContext: dispatch completed');
  }, []);

  const closeWindow = useCallback((windowId) => {
    dispatch({ type: 'CLOSE_WINDOW', payload: windowId });
  }, []);

  const minimizeWindow = useCallback((windowId) => {
    dispatch({ type: 'MINIMIZE_WINDOW', payload: windowId });
  }, []);

  const maximizeWindow = useCallback((windowId) => {
    dispatch({ type: 'MAXIMIZE_WINDOW', payload: windowId });
  }, []);

  const focusWindow = useCallback((windowId) => {
    dispatch({ type: 'FOCUS_WINDOW', payload: windowId });
  }, []);

  const restoreWindow = useCallback((windowId) => {
    dispatch({ type: 'RESTORE_WINDOW', payload: windowId });
  }, []);

  const updateWindowPosition = useCallback((windowId, position) => {
    dispatch({ type: 'UPDATE_WINDOW_POSITION', payload: { windowId, position } });
  }, []);

  const updateWindowSize = useCallback((windowId, size) => {
    dispatch({ type: 'UPDATE_WINDOW_SIZE', payload: { windowId, size } });
  }, []);

  const updateWindow = useCallback((windowId, updates) => {
    dispatch({ type: 'UPDATE_WINDOW', payload: { windowId, updates } });
  }, []);

  const getWindow = useCallback((windowId) => {
    return state.windows.find(w => w.id === windowId);
  }, [state.windows]);

  const getVisibleWindows = useCallback(() => {
    return state.windows.filter(w => w.state !== 'minimized');
  }, [state.windows]);

  const getMinimizedWindows = useCallback(() => {
    return state.windows.filter(w => w.state === 'minimized');
  }, [state.windows]);

  // Guardar estado en sessionStorage
  React.useEffect(() => {
    try {
      const stateToSave = {
        windows: state.windows.map(w => ({
          ...w,
          // No guardar props complejas que no se pueden serializar
          props: {}
        })),
        activeWindowId: state.activeWindowId,
        nextZIndex: state.nextZIndex,
        minimizedWindows: state.minimizedWindows
      };
      sessionStorage.setItem('window-manager-state', JSON.stringify(stateToSave));
    } catch (error) {
      console.warn('Error guardando estado de ventanas:', error);
    }
  }, [state]);

  // Cargar estado guardado al inicializar
  React.useEffect(() => {
    try {
      const savedState = sessionStorage.getItem('window-manager-state');
      if (savedState) {
        dispatch({ type: 'LOAD_WINDOW_STATE', payload: savedState });
      }
    } catch (error) {
      console.warn('Error cargando estado de ventanas:', error);
    }
  }, []);

  const value = {
    ...state,
    openWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    focusWindow,
    restoreWindow,
    updateWindowPosition,
    updateWindowSize,
    updateWindow,
    getWindow,
    getVisibleWindows,
    getMinimizedWindows
  };

  return (
    <WindowManagerContext.Provider value={value}>
      {children}
    </WindowManagerContext.Provider>
  );
};

export default WindowManagerContext;
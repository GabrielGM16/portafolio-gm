import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { 
  Terminal, 
  FolderOpen, 
  FileText, 
  Calculator, 
  Settings, 
  Info, 
  Briefcase, 
  Image,
  Wrench,
  Globe,
  Palette,
  Code
} from 'lucide-react';

// Definición de aplicaciones disponibles
const systemApplications = {
  terminal: {
    id: 'terminal',
    name: 'Terminal',
    icon: Terminal,
    category: 'system',
    description: 'Emulador de terminal Ubuntu',
    executable: 'gnome-terminal',
    windowComponent: 'TerminalWindow',
    defaultSize: { width: 800, height: 500 },
    minSize: { width: 400, height: 300 },
    resizable: true,
    maximizable: true
  },
  fileManager: {
    id: 'fileManager',
    name: 'Explorador de Archivos',
    icon: FolderOpen,
    category: 'system',
    description: 'Navegador de archivos del sistema',
    executable: 'nautilus',
    windowComponent: 'FileManagerWindow',
    defaultSize: { width: 900, height: 600 },
    minSize: { width: 500, height: 400 },
    resizable: true,
    maximizable: true
  },
  textEditor: {
    id: 'textEditor',
    name: 'Editor de Texto',
    icon: FileText,
    category: 'accessories',
    description: 'Editor de texto simple',
    executable: 'gedit',
    windowComponent: 'TextEditorWindow',
    defaultSize: { width: 700, height: 500 },
    minSize: { width: 400, height: 300 },
    resizable: true,
    maximizable: true
  },
  calculator: {
    id: 'calculator',
    name: 'Calculadora',
    icon: Calculator,
    category: 'accessories',
    description: 'Calculadora del sistema',
    executable: 'gnome-calculator',
    windowComponent: 'CalculatorWindow',
    defaultSize: { width: 300, height: 400 },
    minSize: { width: 250, height: 350 },
    resizable: false,
    maximizable: false
  },
  settings: {
    id: 'settings',
    name: 'Configuración',
    icon: Settings,
    category: 'system',
    description: 'Configuración del sistema',
    executable: 'gnome-control-center',
    windowComponent: 'SettingsWindow',
    defaultSize: { width: 800, height: 600 },
    minSize: { width: 600, height: 500 },
    resizable: true,
    maximizable: true
  },
  about: {
    id: 'about',
    name: 'Acerca de',
    icon: Info,
    category: 'system',
    description: 'Información del sistema y desarrollador',
    executable: 'gnome-system-monitor',
    windowComponent: 'AboutWindow',
    defaultSize: { width: 600, height: 500 },
    minSize: { width: 500, height: 400 },
    resizable: true,
    maximizable: false
  },
  portfolio: {
    id: 'portfolio',
    name: 'Portafolio',
    icon: Briefcase,
    category: 'internet',
    description: 'Portafolio profesional de Martin Godinez',
    executable: 'firefox',
    windowComponent: 'PortfolioWindow',
    defaultSize: { width: 1000, height: 700 },
    minSize: { width: 600, height: 500 },
    resizable: true,
    maximizable: true
  },
  imageViewer: {
    id: 'imageViewer',
    name: 'Visor de Imágenes',
    icon: Image,
    category: 'graphics',
    description: 'Visor de imágenes del sistema',
    executable: 'eog',
    windowComponent: 'ImageViewerWindow',
    defaultSize: { width: 600, height: 500 },
    minSize: { width: 400, height: 300 },
    resizable: true,
    maximizable: true
  }
};

// Categorías de aplicaciones
const applicationCategories = {
  system: {
    name: 'Sistema',
    icon: Settings,
    color: 'text-orange-500'
  },
  accessories: {
    name: 'Accesorios',
    icon: Wrench,
    color: 'text-blue-500'
  },
  internet: {
    name: 'Internet',
    icon: Globe,
    color: 'text-green-500'
  },
  graphics: {
    name: 'Gráficos',
    icon: Palette,
    color: 'text-purple-500'
  },
  office: {
    name: 'Oficina',
    icon: FileText,
    color: 'text-indigo-500'
  },
  development: {
    name: 'Desarrollo',
    icon: Code,
    color: 'text-red-500'
  }
};

// Estado inicial
const initialState = {
  applications: systemApplications,
  categories: applicationCategories,
  runningApplications: [],
  recentApplications: [],
  favoriteApplications: ['terminal', 'fileManager', 'textEditor', 'settings'],
  searchQuery: '',
  selectedCategory: null
};

// Reducer para manejar acciones de aplicaciones
function applicationReducer(state, action) {
  switch (action.type) {
    case 'LAUNCH_APPLICATION': {
      const { appId, windowId } = action.payload;
      const app = state.applications[appId];
      
      if (!app) return state;

      const runningApp = {
        id: windowId,
        appId,
        name: app.name,
        icon: app.icon,
        launchedAt: new Date(),
        windowComponent: app.windowComponent
      };

      // Agregar a aplicaciones en ejecución
      const newRunningApps = [...state.runningApplications, runningApp];
      
      // Actualizar aplicaciones recientes
      const newRecentApps = [
        appId,
        ...state.recentApplications.filter(id => id !== appId)
      ].slice(0, 10);

      return {
        ...state,
        runningApplications: newRunningApps,
        recentApplications: newRecentApps
      };
    }

    case 'CLOSE_APPLICATION': {
      const { windowId } = action.payload;
      
      return {
        ...state,
        runningApplications: state.runningApplications.filter(
          app => app.id !== windowId
        )
      };
    }

    case 'SET_SEARCH_QUERY': {
      return {
        ...state,
        searchQuery: action.payload
      };
    }

    case 'SET_SELECTED_CATEGORY': {
      return {
        ...state,
        selectedCategory: action.payload
      };
    }

    case 'ADD_TO_FAVORITES': {
      const { appId } = action.payload;
      
      if (state.favoriteApplications.includes(appId)) {
        return state;
      }

      return {
        ...state,
        favoriteApplications: [...state.favoriteApplications, appId]
      };
    }

    case 'REMOVE_FROM_FAVORITES': {
      const { appId } = action.payload;
      
      return {
        ...state,
        favoriteApplications: state.favoriteApplications.filter(
          id => id !== appId
        )
      };
    }

    case 'CLEAR_RECENT': {
      return {
        ...state,
        recentApplications: []
      };
    }

    default:
      return state;
  }
}

// Crear contexto
const ApplicationContext = createContext();

// Hook personalizado para usar el contexto
export const useApplications = () => {
  const context = useContext(ApplicationContext);
  if (!context) {
    throw new Error('useApplications debe ser usado dentro de un ApplicationProvider');
  }
  return context;
};

// Provider del contexto
export const ApplicationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(applicationReducer, initialState);

  // Función para lanzar una aplicación
  const launchApplication = useCallback((appId, windowId) => {
    dispatch({
      type: 'LAUNCH_APPLICATION',
      payload: { appId, windowId }
    });
  }, []);

  // Función para cerrar una aplicación
  const closeApplication = useCallback((windowId) => {
    dispatch({
      type: 'CLOSE_APPLICATION',
      payload: { windowId }
    });
  }, []);

  // Función para buscar aplicaciones
  const searchApplications = useCallback((query) => {
    dispatch({
      type: 'SET_SEARCH_QUERY',
      payload: query
    });
  }, []);

  // Función para seleccionar categoría
  const selectCategory = useCallback((category) => {
    dispatch({
      type: 'SET_SELECTED_CATEGORY',
      payload: category
    });
  }, []);

  // Función para agregar a favoritos
  const addToFavorites = useCallback((appId) => {
    dispatch({
      type: 'ADD_TO_FAVORITES',
      payload: { appId }
    });
  }, []);

  // Función para remover de favoritos
  const removeFromFavorites = useCallback((appId) => {
    dispatch({
      type: 'REMOVE_FROM_FAVORITES',
      payload: { appId }
    });
  }, []);

  // Función para limpiar aplicaciones recientes
  const clearRecentApplications = useCallback(() => {
    dispatch({ type: 'CLEAR_RECENT' });
  }, []);

  // Función para obtener aplicaciones filtradas
  const getFilteredApplications = useCallback(() => {
    let apps = Object.values(state.applications);

    // Filtrar por categoría
    if (state.selectedCategory) {
      apps = apps.filter(app => app.category === state.selectedCategory);
    }

    // Filtrar por búsqueda
    if (state.searchQuery) {
      const query = state.searchQuery.toLowerCase();
      apps = apps.filter(app => 
        app.name.toLowerCase().includes(query) ||
        app.description.toLowerCase().includes(query)
      );
    }

    return apps;
  }, [state.applications, state.selectedCategory, state.searchQuery]);

  // Función para obtener aplicaciones por categoría
  const getApplicationsByCategory = useCallback(() => {
    const appsByCategory = {};
    
    Object.values(state.applications).forEach(app => {
      if (!appsByCategory[app.category]) {
        appsByCategory[app.category] = [];
      }
      appsByCategory[app.category].push(app);
    });

    return appsByCategory;
  }, [state.applications]);

  // Función para obtener aplicaciones favoritas
  const getFavoriteApplications = useCallback(() => {
    return state.favoriteApplications
      .map(appId => state.applications[appId])
      .filter(Boolean);
  }, [state.favoriteApplications, state.applications]);

  // Función para obtener aplicaciones recientes
  const getRecentApplications = useCallback(() => {
    return state.recentApplications
      .map(appId => state.applications[appId])
      .filter(Boolean);
  }, [state.recentApplications, state.applications]);

  // Función para verificar si una aplicación está en favoritos
  const isApplicationFavorite = useCallback((appId) => {
    return state.favoriteApplications.includes(appId);
  }, [state.favoriteApplications]);

  // Función para obtener información de una aplicación
  const getApplicationInfo = useCallback((appId) => {
    return state.applications[appId] || null;
  }, [state.applications]);

  const value = {
    ...state,
    launchApplication,
    closeApplication,
    searchApplications,
    selectCategory,
    addToFavorites,
    removeFromFavorites,
    clearRecentApplications,
    getFilteredApplications,
    getApplicationsByCategory,
    getFavoriteApplications,
    getRecentApplications,
    isApplicationFavorite,
    getApplicationInfo
  };

  return (
    <ApplicationContext.Provider value={value}>
      {children}
    </ApplicationContext.Provider>
  );
};

export default ApplicationContext;
import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Definición de temas Ubuntu
const themes = {
  'ubuntu-light': {
    id: 'ubuntu-light',
    name: 'Ubuntu Light',
    type: 'light',
    colors: {
      primary: '#E95420',
      secondary: '#772953',
      background: '#F7F7F7',
      surface: '#FFFFFF',
      text: '#2C001E',
      textSecondary: '#666666',
      accent: '#77216F',
      border: '#E0E0E0',
      shadow: 'rgba(0, 0, 0, 0.1)'
    },
    wallpaper: 'linear-gradient(135deg, #F7F7F7 0%, #E8E8E8 100%)',
    fonts: {
      system: 'Ubuntu, sans-serif',
      monospace: 'Fira Code, monospace'
    }
  },
  'ubuntu-dark': {
    id: 'ubuntu-dark',
    name: 'Ubuntu Dark',
    type: 'dark',
    colors: {
      primary: '#E95420',
      secondary: '#AE7C14',
      background: '#2C001E',
      surface: '#3C2415',
      text: '#F7F7F7',
      textSecondary: '#CCCCCC',
      accent: '#E95420',
      border: '#555555',
      shadow: 'rgba(0, 0, 0, 0.3)'
    },
    wallpaper: 'linear-gradient(135deg, #4A148C 0%, #7B1FA2 50%, #8E24AA 100%)',
    fonts: {
      system: 'Ubuntu, sans-serif',
      monospace: 'Fira Code, monospace'
    }
  }
};

// Estado inicial
const initialState = {
  currentTheme: themes['ubuntu-dark'],
  availableThemes: Object.values(themes),
  customizations: {}
};

// Reducer para manejar acciones del tema
function themeReducer(state, action) {
  switch (action.type) {
    case 'SET_THEME':
      return {
        ...state,
        currentTheme: themes[action.payload] || state.currentTheme
      };
    case 'TOGGLE_THEME':
      const newThemeId = state.currentTheme.type === 'light' ? 'ubuntu-dark' : 'ubuntu-light';
      return {
        ...state,
        currentTheme: themes[newThemeId]
      };
    case 'UPDATE_CUSTOMIZATIONS':
      return {
        ...state,
        customizations: { ...state.customizations, ...action.payload }
      };
    case 'LOAD_SAVED_THEME':
      return {
        ...state,
        currentTheme: action.payload.theme || state.currentTheme,
        customizations: action.payload.customizations || {}
      };
    default:
      return state;
  }
}

// Crear contexto
const ThemeContext = createContext();

// Hook personalizado para usar el contexto
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme debe ser usado dentro de un ThemeProvider');
  }
  return context;
};

// Provider del contexto
export const ThemeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(themeReducer, initialState);

  // Cargar tema guardado al inicializar
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('portfolio-theme');
      const savedCustomizations = localStorage.getItem('portfolio-customizations');
      
      if (savedTheme || savedCustomizations) {
        dispatch({
          type: 'LOAD_SAVED_THEME',
          payload: {
            theme: savedTheme ? themes[JSON.parse(savedTheme)] : null,
            customizations: savedCustomizations ? JSON.parse(savedCustomizations) : {}
          }
        });
      }
    } catch (error) {
      console.warn('Error cargando tema guardado:', error);
    }
  }, []);

  // Guardar tema cuando cambie
  useEffect(() => {
    try {
      localStorage.setItem('portfolio-theme', JSON.stringify(state.currentTheme.id));
      localStorage.setItem('portfolio-customizations', JSON.stringify(state.customizations));
      
      // Aplicar clase de tema al documento
      document.documentElement.className = state.currentTheme.type;
      
      // Aplicar variables CSS personalizadas
      const root = document.documentElement;
      Object.entries(state.currentTheme.colors).forEach(([key, value]) => {
        root.style.setProperty(`--color-${key}`, value);
      });
      
      root.style.setProperty('--wallpaper', state.currentTheme.wallpaper);
      root.style.setProperty('--font-system', state.currentTheme.fonts.system);
      root.style.setProperty('--font-monospace', state.currentTheme.fonts.monospace);
      
    } catch (error) {
      console.warn('Error guardando tema:', error);
    }
  }, [state.currentTheme, state.customizations]);

  // Funciones de utilidad
  const setTheme = (themeId) => {
    dispatch({ type: 'SET_THEME', payload: themeId });
  };

  const toggleTheme = () => {
    dispatch({ type: 'TOGGLE_THEME' });
  };

  const updateCustomizations = (customizations) => {
    dispatch({ type: 'UPDATE_CUSTOMIZATIONS', payload: customizations });
  };

  const value = {
    ...state,
    setTheme,
    toggleTheme,
    updateCustomizations,
    isDark: state.currentTheme.type === 'dark'
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
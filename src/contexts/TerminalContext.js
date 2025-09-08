import React, { createContext, useContext, useReducer, useCallback } from 'react';
import VirtualFileSystem from '../utils/virtualFileSystem';
import TerminalCommands from '../utils/terminalCommands';

// Inicializar el sistema de archivos virtual y comandos
const fileSystem = new VirtualFileSystem();
const terminalCommands = new TerminalCommands(fileSystem);

// Los comandos ahora se manejan a través de TerminalCommands.js

// Estado inicial
const initialState = {
  sessions: {},
  activeSessionId: null,
  commandHistory: [],
  historyIndex: -1
};

// Reducer para manejar acciones del terminal
function terminalReducer(state, action) {
  switch (action.type) {
    case 'CREATE_SESSION': {
      const { sessionId } = action.payload;
      const newSession = {
        id: sessionId,
        history: [
          {
            id: Date.now(),
            type: 'welcome',
            content: `Bienvenido al Terminal de Martin Godinez\nUbuntu 22.04 LTS - Portfolio Edition\n\nEscribe 'help' para ver los comandos disponibles.\nEscribe 'about' para conocer más sobre mí.\n`,
            timestamp: new Date()
          }
        ],
        currentPath: '/home/martin',
      // environment: {
          USER: 'martin',
          HOME: '/home/martin',
          PWD: '/home/martin',
          SHELL: '/bin/bash',
          TERM: 'xterm-256color'
        }
      };

      return {
        ...state,
        sessions: {
          ...state.sessions,
          [sessionId]: newSession
        },
        activeSessionId: sessionId
      };
    }

    case 'CLOSE_SESSION': {
      const { sessionId } = action.payload;
      const newSessions = { ...state.sessions };
      delete newSessions[sessionId];

      return {
        ...state,
        sessions: newSessions,
        activeSessionId: state.activeSessionId === sessionId ? null : state.activeSessionId
      };
    }

    case 'SET_ACTIVE_SESSION': {
      return {
        ...state,
        activeSessionId: action.payload
      };
    }

    case 'ADD_TO_HISTORY': {
      const { sessionId, entry } = action.payload;
      const session = state.sessions[sessionId];
      
      if (!session) return state;

      const updatedSession = {
        ...session,
        history: [...session.history, entry]
      };

      return {
        ...state,
        sessions: {
          ...state.sessions,
          [sessionId]: updatedSession
        }
      };
    }

    case 'CLEAR_SESSION': {
      const { sessionId } = action.payload;
      const session = state.sessions[sessionId];
      
      if (!session) return state;

      const updatedSession = {
        ...session,
        history: []
      };

      return {
        ...state,
        sessions: {
          ...state.sessions,
          [sessionId]: updatedSession
        }
      };
    }

    case 'UPDATE_COMMAND_HISTORY': {
      const { command } = action.payload;
      
      // No agregar comandos vacíos o duplicados consecutivos
      if (!command.trim() || (state.commandHistory.length > 0 && state.commandHistory[state.commandHistory.length - 1] === command)) {
        return state;
      }

      return {
        ...state,
        commandHistory: [...state.commandHistory, command].slice(-100), // Mantener solo los últimos 100 comandos
        historyIndex: -1
      };
    }

    case 'SET_HISTORY_INDEX': {
      return {
        ...state,
        historyIndex: action.payload
      };
    }

    case 'UPDATE_SESSION_PATH': {
      const { sessionId, session } = action.payload;
      return {
        ...state,
        sessions: {
          ...state.sessions,
          [sessionId]: session
        }
      };
    }

    default:
      return state;
  }
}

// Crear contexto
const TerminalContext = createContext();

// Hook personalizado para usar el contexto
export const useTerminal = () => {
  const context = useContext(TerminalContext);
  if (!context) {
    throw new Error('useTerminal debe ser usado dentro de un TerminalProvider');
  }
  return context;
};

// Provider del contexto
export const TerminalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(terminalReducer, initialState);

  // Función para crear una nueva sesión
  const createSession = useCallback((sessionId) => {
    const id = sessionId || `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    dispatch({
      type: 'CREATE_SESSION',
      payload: { sessionId: id }
    });
    return id;
  }, []);

  // Función para cerrar una sesión
  const closeSession = useCallback((sessionId) => {
    dispatch({
      type: 'CLOSE_SESSION',
      payload: { sessionId }
    });
  }, []);

  // Función para establecer la sesión activa
  const setActiveSession = useCallback((sessionId) => {
    dispatch({
      type: 'SET_ACTIVE_SESSION',
      payload: sessionId
    });
  }, []);

  // Función para ejecutar un comando
  const executeCommand = useCallback((sessionId, command) => {
    const session = state.sessions[sessionId];
    if (!session) return;

    // Agregar comando al historial
    const commandEntry = {
      id: Date.now(),
      type: 'command',
      content: command,
      timestamp: new Date()
    };

    dispatch({
      type: 'ADD_TO_HISTORY',
      payload: { sessionId, entry: commandEntry }
    });

    // Actualizar historial de comandos
    dispatch({
      type: 'UPDATE_COMMAND_HISTORY',
      payload: { command }
    });

    // Parsear comando
    const trimmedCommand = command.trim();
    if (!trimmedCommand) {
      return;
    }

    let result;
    
    try {
      // Usar TerminalCommands para ejecutar el comando
      result = terminalCommands.execute(trimmedCommand);
      
      // Si el comando cambió el directorio, actualizar el estado de la sesión
      if (result.currentPath && result.currentPath !== session.currentPath) {
        // Actualizar el currentPath en la sesión
        const updatedSession = {
          ...session,
          currentPath: result.currentPath,
          environment: {
            ...session.environment,
            PWD: result.currentPath
          }
        };
        
        // Actualizar el estado con la nueva sesión
        dispatch({
          type: 'UPDATE_SESSION_PATH',
          payload: { sessionId, session: updatedSession }
        });
      }
    } catch (error) {
      result = {
        output: `Error ejecutando comando: ${error.message}`,
        type: 'error'
      };
    }

    // Manejar comando clear
    if (result.type === 'clear') {
      dispatch({
        type: 'CLEAR_SESSION',
        payload: { sessionId }
      });
      return;
    }

    // Agregar resultado al historial
    if (result.output) {
      const outputEntry = {
        id: Date.now() + 1,
        type: result.type || 'output',
        content: result.output,
        timestamp: new Date()
      };

      dispatch({
        type: 'ADD_TO_HISTORY',
        payload: { sessionId, entry: outputEntry }
      });
    }
  }, [state.sessions]);

  // Función para limpiar una sesión
  const clearSession = useCallback((sessionId) => {
    dispatch({
      type: 'CLEAR_SESSION',
      payload: { sessionId }
    });
  }, []);

  // Función para navegar en el historial de comandos
  const navigateHistory = useCallback((direction) => {
    const maxIndex = state.commandHistory.length - 1;
    let newIndex = state.historyIndex;

    if (direction === 'up' && newIndex < maxIndex) {
      newIndex++;
    } else if (direction === 'down' && newIndex > -1) {
      newIndex--;
    }

    dispatch({
      type: 'SET_HISTORY_INDEX',
      payload: newIndex
    });

    return newIndex >= 0 ? state.commandHistory[state.commandHistory.length - 1 - newIndex] : '';
  }, [state.commandHistory, state.historyIndex]);

  // Función para obtener una sesión
  const getSession = useCallback((sessionId) => {
    return state.sessions[sessionId] || null;
  }, [state.sessions]);

  // Función para obtener la sesión activa
  const getActiveSession = useCallback(() => {
    return state.activeSessionId ? state.sessions[state.activeSessionId] : null;
  }, [state.sessions, state.activeSessionId]);

  const value = {
    ...state,
    createSession,
    closeSession,
    setActiveSession,
    executeCommand,
    clearSession,
    navigateHistory,
    getSession,
    getActiveSession,
    availableCommands: terminalCommands.getAvailableCommands()
  };

  return (
    <TerminalContext.Provider value={value}>
      {children}
    </TerminalContext.Provider>
  );
};

export default TerminalContext;
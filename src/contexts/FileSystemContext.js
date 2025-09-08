import React, { createContext, useContext, useReducer, useCallback } from 'react';

// Datos iniciales del sistema de archivos
const initialFileSystem = {
  id: 'root',
  name: '/',
  type: 'directory',
  path: '/',
  parentId: null,
  metadata: {
    size: 0,
    created: new Date(),
    modified: new Date(),
    permissions: 'drwxr-xr-x'
  },
  children: [
    {
      id: 'home',
      name: 'home',
      type: 'directory',
      path: '/home',
      parentId: 'root',
      metadata: { size: 0, created: new Date(), modified: new Date(), permissions: 'drwxr-xr-x' },
      children: [
        {
          id: 'martin',
          name: 'martin',
          type: 'directory',
          path: '/home/martin',
          parentId: 'home',
          metadata: { size: 0, created: new Date(), modified: new Date(), permissions: 'drwxr-xr-x' },
          children: [
            {
              id: 'about',
              name: 'about.txt',
              type: 'file',
              path: '/home/martin/about.txt',
              parentId: 'martin',
              content: 'Martin Gabriel Godinez Morales\n\nDesarrollador Full Stack especializado en:\n• Desarrollo Web (React, Node.js, JavaScript)\n• Ciberseguridad (Penetration Testing, OWASP)\n• Administración de Servidores Linux\n• DevOps y automatización\n\nExperiencia en tecnologías modernas y mejores prácticas de seguridad.\nApasionado por crear soluciones robustas y seguras.',
              metadata: { size: 256, created: new Date(), modified: new Date(), permissions: '-rw-r--r--', mimeType: 'text/plain' }
            },
            {
              id: 'skills',
              name: 'skills.json',
              type: 'file',
              path: '/home/martin/skills.json',
              parentId: 'martin',
              content: JSON.stringify({
                frontend: ['React', 'JavaScript', 'TypeScript', 'Tailwind CSS', 'Next.js', 'HTML5', 'CSS3'],
                backend: ['Node.js', 'Express', 'Python', 'FastAPI', 'RESTful APIs', 'GraphQL'],
                database: ['PostgreSQL', 'MongoDB', 'Redis', 'MySQL'],
                security: ['Penetration Testing', 'OWASP Top 10', 'Nmap', 'Burp Suite', 'Metasploit', 'Wireshark'],
                devops: ['Docker', 'Linux', 'Nginx', 'Apache', 'CI/CD', 'Git', 'Bash Scripting'],
                tools: ['VS Code', 'Postman', 'Figma', 'Jira', 'Slack']
              }, null, 2),
              metadata: { size: 512, created: new Date(), modified: new Date(), permissions: '-rw-r--r--', mimeType: 'application/json' }
            },
            {
              id: 'contact',
              name: 'contact.txt',
              type: 'file',
              path: '/home/martin/contact.txt',
              parentId: 'martin',
              content: 'Información de Contacto\n========================\n\nEmail: gmoficial16@gmail.com\nLinkedIn: /in/martin-godinez\nGitHub: /martin-godinez\nUbicación: México\n\nDisponible para proyectos freelance y oportunidades laborales.\nEspecializado en desarrollo web seguro y administración de sistemas.',
              metadata: { size: 256, created: new Date(), modified: new Date(), permissions: '-rw-r--r--', mimeType: 'text/plain' }
            },
            {
              id: 'projects',
              name: 'projects',
              type: 'directory',
              path: '/home/martin/projects',
              parentId: 'martin',
              metadata: { size: 0, created: new Date(), modified: new Date(), permissions: 'drwxr-xr-x' },
              children: [
                {
                  id: 'ecommerce-project',
                  name: 'ecommerce-platform.md',
                  type: 'file',
                  path: '/home/martin/projects/ecommerce-platform.md',
                  parentId: 'projects',
                  content: '# E-commerce Platform\n\n## Descripción\nPlataforma de comercio electrónico completa desarrollada con React y Node.js.\n\n## Tecnologías\n- Frontend: React, Redux, Tailwind CSS\n- Backend: Node.js, Express, MongoDB\n- Autenticación: JWT\n- Pagos: Stripe API\n\n## Características\n- Carrito de compras\n- Sistema de usuarios\n- Panel de administración\n- Procesamiento de pagos seguro\n- Responsive design',
                  metadata: { size: 512, created: new Date(), modified: new Date(), permissions: '-rw-r--r--', mimeType: 'text/markdown' }
                },
                {
                  id: 'security-scanner',
                  name: 'security-scanner.md',
                  type: 'file',
                  path: '/home/martin/projects/security-scanner.md',
                  parentId: 'projects',
                  content: '# Security Scanner Tool\n\n## Descripción\nHerramienta de escaneo de seguridad desarrollada en Python para auditorías de red.\n\n## Tecnologías\n- Python 3.9+\n- Nmap\n- Scapy\n- Threading\n\n## Funcionalidades\n- Escaneo de puertos\n- Detección de servicios\n- Análisis de vulnerabilidades\n- Reportes detallados\n- Interfaz CLI intuitiva',
                  metadata: { size: 384, created: new Date(), modified: new Date(), permissions: '-rw-r--r--', mimeType: 'text/markdown' }
                }
              ]
            },
            {
              id: 'documents',
              name: 'documents',
              type: 'directory',
              path: '/home/martin/documents',
              parentId: 'martin',
              metadata: { size: 0, created: new Date(), modified: new Date(), permissions: 'drwxr-xr-x' },
              children: [
                {
                  id: 'resume',
                  name: 'resume.txt',
                  type: 'file',
                  path: '/home/martin/documents/resume.txt',
                  parentId: 'documents',
                  content: 'CURRICULUM VITAE\n================\n\nMartin Gabriel Godinez Morales\nDesarrollador Full Stack & Especialista en Ciberseguridad\n\nEXPERIENCIA PROFESIONAL\n-----------------------\n• Desarrollo de aplicaciones web con React y Node.js\n• Implementación de medidas de seguridad en aplicaciones\n• Administración de servidores Linux\n• Auditorías de seguridad y penetration testing\n\nEDUCACIÓN\n---------\n• Ingeniería en Sistemas Computacionales\n• Certificaciones en Ciberseguridad\n• Cursos especializados en desarrollo web',
                  metadata: { size: 768, created: new Date(), modified: new Date(), permissions: '-rw-r--r--', mimeType: 'text/plain' }
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'usr',
      name: 'usr',
      type: 'directory',
      path: '/usr',
      parentId: 'root',
      metadata: { size: 0, created: new Date(), modified: new Date(), permissions: 'drwxr-xr-x' },
      children: []
    },
    {
      id: 'var',
      name: 'var',
      type: 'directory',
      path: '/var',
      parentId: 'root',
      metadata: { size: 0, created: new Date(), modified: new Date(), permissions: 'drwxr-xr-x' },
      children: []
    }
  ]
};

// Estado inicial
const initialState = {
  currentPath: '/home/martin',
  fileTree: initialFileSystem,
  selectedFiles: [],
  clipBoard: {
    operation: null, // 'copy' | 'cut' | null
    files: []
  },
  history: ['/home/martin'],
  historyIndex: 0
};

// Reducer para manejar acciones del sistema de archivos
function fileSystemReducer(state, action) {
  switch (action.type) {
    case 'CHANGE_DIRECTORY': {
      const newPath = action.payload;
      const newHistory = [...state.history.slice(0, state.historyIndex + 1), newPath];
      
      return {
        ...state,
        currentPath: newPath,
        selectedFiles: [],
        history: newHistory,
        historyIndex: newHistory.length - 1
      };
    }

    case 'GO_BACK': {
      if (state.historyIndex > 0) {
        const newIndex = state.historyIndex - 1;
        return {
          ...state,
          currentPath: state.history[newIndex],
          historyIndex: newIndex,
          selectedFiles: []
        };
      }
      return state;
    }

    case 'GO_FORWARD': {
      if (state.historyIndex < state.history.length - 1) {
        const newIndex = state.historyIndex + 1;
        return {
          ...state,
          currentPath: state.history[newIndex],
          historyIndex: newIndex,
          selectedFiles: []
        };
      }
      return state;
    }

    case 'SELECT_FILES': {
      return {
        ...state,
        selectedFiles: action.payload
      };
    }

    case 'COPY_FILES': {
      return {
        ...state,
        clipBoard: {
          operation: 'copy',
          files: [...action.payload]
        }
      };
    }

    case 'CUT_FILES': {
      return {
        ...state,
        clipBoard: {
          operation: 'cut',
          files: [...action.payload]
        }
      };
    }

    case 'CLEAR_CLIPBOARD': {
      return {
        ...state,
        clipBoard: {
          operation: null,
          files: []
        }
      };
    }

    default:
      return state;
  }
}

// Crear contexto
const FileSystemContext = createContext();

// Hook personalizado para usar el contexto
export const useFileSystem = () => {
  const context = useContext(FileSystemContext);
  if (!context) {
    throw new Error('useFileSystem debe ser usado dentro de un FileSystemProvider');
  }
  return context;
};

// Provider del contexto
export const FileSystemProvider = ({ children }) => {
  const [state, dispatch] = useReducer(fileSystemReducer, initialState);

  // Función para encontrar un nodo por path
  const findNodeByPath = useCallback((path, node = state.fileTree) => {
    if (node.path === path) {
      return node;
    }
    
    if (node.children) {
      for (const child of node.children) {
        const found = findNodeByPath(path, child);
        if (found) return found;
      }
    }
    
    return null;
  }, [state.fileTree]);

  // Función para obtener el contenido del directorio actual
  const getCurrentDirectoryContent = useCallback(() => {
    const currentNode = findNodeByPath(state.currentPath);
    return currentNode?.children || [];
  }, [state.currentPath, findNodeByPath]);

  // Función para navegar a un directorio
  const changeDirectory = useCallback((path) => {
    const node = findNodeByPath(path);
    if (node && node.type === 'directory') {
      dispatch({ type: 'CHANGE_DIRECTORY', payload: path });
      return true;
    }
    return false;
  }, [findNodeByPath]);

  // Función para navegar hacia atrás
  const goBack = useCallback(() => {
    dispatch({ type: 'GO_BACK' });
  }, []);

  // Función para navegar hacia adelante
  const goForward = useCallback(() => {
    dispatch({ type: 'GO_FORWARD' });
  }, []);

  // Función para navegar al directorio padre
  const goUp = useCallback(() => {
    const pathParts = state.currentPath.split('/').filter(Boolean);
    if (pathParts.length > 0) {
      pathParts.pop();
      const parentPath = '/' + pathParts.join('/');
      changeDirectory(parentPath === '/' ? '/' : parentPath);
    }
  }, [state.currentPath, changeDirectory]);

  // Función para seleccionar archivos
  const selectFiles = useCallback((fileIds) => {
    dispatch({ type: 'SELECT_FILES', payload: fileIds });
  }, []);

  // Función para copiar archivos
  const copyFiles = useCallback((fileIds) => {
    dispatch({ type: 'COPY_FILES', payload: fileIds });
  }, []);

  // Función para cortar archivos
  const cutFiles = useCallback((fileIds) => {
    dispatch({ type: 'CUT_FILES', payload: fileIds });
  }, []);

  // Función para limpiar el portapapeles
  const clearClipboard = useCallback(() => {
    dispatch({ type: 'CLEAR_CLIPBOARD' });
  }, []);

  // Función para obtener información de un archivo
  const getFileInfo = useCallback((path) => {
    return findNodeByPath(path);
  }, [findNodeByPath]);

  // Función para obtener el contenido de un archivo
  const getFileContent = useCallback((path) => {
    const node = findNodeByPath(path);
    return node?.type === 'file' ? node.content : null;
  }, [findNodeByPath]);

  // Función para obtener la ruta del directorio padre
  const getParentPath = useCallback((path) => {
    const pathParts = path.split('/').filter(Boolean);
    if (pathParts.length <= 1) return '/';
    pathParts.pop();
    return '/' + pathParts.join('/');
  }, []);

  const value = {
    ...state,
    findNodeByPath,
    getCurrentDirectoryContent,
    changeDirectory,
    goBack,
    goForward,
    goUp,
    selectFiles,
    copyFiles,
    cutFiles,
    clearClipboard,
    getFileInfo,
    getFileContent,
    getParentPath,
    canGoBack: state.historyIndex > 0,
    canGoForward: state.historyIndex < state.history.length - 1
  };

  return (
    <FileSystemContext.Provider value={value}>
      {children}
    </FileSystemContext.Provider>
  );
};

export default FileSystemContext;
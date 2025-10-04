import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Desktop from './components/Desktop';
import WindowManager from './components/WindowManager';
import LandingPage from './components/LandingPage';
import QuickAccessMenu from './components/QuickAccessMenu';
import LoadingScreen from './components/LoadingScreen';

// Context Providers
import { ThemeProvider } from './contexts/ThemeContext';
import { WindowManagerProvider, useWindowManager } from './contexts/WindowManagerContext';
import { FileSystemProvider } from './contexts/FileSystemContext';
import { ApplicationProvider } from './contexts/ApplicationContext';
import { TerminalProvider } from './contexts/TerminalContext';

import './App.css';

// Componente interno que usa los contexts
function AppContent() {
  const { openWindow } = useWindowManager();
  
  const [showLanding, setShowLanding] = useState(true);
  const [showQuickAccess, setShowQuickAccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Simular carga inicial
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Función para manejar la apertura de ventanas desde la landing page
  const handleOpenWindowFromLanding = (windowType) => {
    console.log('Opening window from landing:', windowType);
    
    // Primero cerramos la landing page
    setShowLanding(false);
    
    // Esperamos un momento para que la animación se complete
    setTimeout(() => {
      openWindowByType(windowType);
    }, 300);
  };

  // Función para abrir ventanas específicas
  const openWindowByType = (type) => {
    const windowId = `${type}-${Date.now()}`;
    
    const windowConfigs = {
      terminal: {
        id: windowId,
        type: 'terminal',
        title: 'Terminal',
        component: 'terminal',
        position: { x: 100, y: 100 },
        size: { width: 800, height: 500 }
      },
      portfolio: {
        id: windowId,
        type: 'portfolio',
        title: 'Portafolio',
        component: 'portfolio',
        position: { x: 150, y: 100 },
        size: { width: 1000, height: 700 }
      },
      about: {
        id: windowId,
        type: 'about',
        title: 'Acerca de',
        component: 'about',
        position: { x: 200, y: 150 },
        size: { width: 800, height: 600 }
      },
      contact: {
        id: windowId,
        type: 'about',
        title: 'Contacto',
        component: 'about',
        position: { x: 250, y: 150 },
        size: { width: 700, height: 500 }
      },
      fileManager: {
        id: windowId,
        type: 'fileManager',
        title: 'Explorador de Archivos',
        component: 'fileManager',
        position: { x: 150, y: 150 },
        size: { width: 900, height: 600 }
      },
      settings: {
        id: windowId,
        type: 'settings',
        title: 'Configuración',
        component: 'settings',
        position: { x: 200, y: 100 },
        size: { width: 800, height: 600 }
      },
      textEditor: {
        id: windowId,
        type: 'textEditor',
        title: 'Editor de Texto',
        component: 'textEditor',
        position: { x: 180, y: 120 },
        size: { width: 700, height: 500 }
      }
    };

    const config = windowConfigs[type] || windowConfigs.about;
    
    console.log('Opening window with config:', config);
    openWindow(config);
  };

  // Función para entrar al portafolio (cerrar landing)
  const handleEnterPortfolio = () => {
    setShowLanding(false);
  };

  // Mostrar loading screen
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="App min-h-screen bg-gradient-to-br from-ubuntu-orange-light to-ubuntu-purple-light dark:from-ubuntu-dark-bg dark:to-ubuntu-dark-surface transition-colors duration-300">
      <AnimatePresence mode="wait">
        {showLanding ? (
          <LandingPage 
            key="landing"
            onEnterPortfolio={handleEnterPortfolio}
            onOpenWindow={handleOpenWindowFromLanding}
          />
        ) : (
          <React.Fragment key="desktop">
            {/* El escritorio con los íconos */}
            <Desktop 
              onShowQuickAccess={() => setShowQuickAccess(true)}
            />

            {/* Contenedor para las ventanas */}
            <WindowManager />

            {/* Quick Access Menu */}
            <AnimatePresence>
              {showQuickAccess && (
                <QuickAccessMenu 
                  onOpenWindow={openWindowByType}
                  onClose={() => setShowQuickAccess(false)}
                />
              )}
            </AnimatePresence>
          </React.Fragment>
        )}
      </AnimatePresence>
    </div>
  );
}

// Componente principal con todos los providers
function App() {
  return (
    <ThemeProvider>
      <ApplicationProvider>
        <FileSystemProvider>
          <TerminalProvider>
            <WindowManagerProvider>
              <AppContent />
            </WindowManagerProvider>
          </TerminalProvider>
        </FileSystemProvider>
      </ApplicationProvider>
    </ThemeProvider>
  );
}

export default App;
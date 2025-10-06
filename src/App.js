import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import LandingPage from './components/LandingPage';
import QuickAccessMenu from './components/QuickAccessMenu';
import LoadingScreen from './components/LoadingScreen';

// Context Providers
import { ThemeProvider } from './contexts/ThemeContext';
import { ApplicationProvider } from './contexts/ApplicationContext';

import './App.css';

// Componente interno que usa los contexts
function AppContent() {
  
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
    
    // Simplemente cerramos la landing page
    setShowLanding(false);
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
            {/* Fondo del escritorio */}
            <div className="desktop relative w-full h-screen overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-ubuntu-orange-light via-ubuntu-purple-light to-ubuntu-orange-dark dark:from-ubuntu-dark-bg dark:via-ubuntu-dark-surface dark:to-ubuntu-dark-bg" />
              
              {/* Patrón de puntos sutil */}
              <div 
                className="absolute inset-0 opacity-10 dark:opacity-5"
                style={{
                  backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)',
                  backgroundSize: '20px 20px'
                }}
              />
            </div>

            {/* Quick Access Menu */}
            <AnimatePresence>
              {showQuickAccess && (
                <QuickAccessMenu 
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
        <AppContent />
      </ApplicationProvider>
    </ThemeProvider>
  );
}

export default App;
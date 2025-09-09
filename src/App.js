import React from 'react';
import Desktop from './components/Desktop';
import WindowManager from './components/WindowManager';

// Context Providers
import { ThemeProvider } from './contexts/ThemeContext';
import { WindowManagerProvider } from './contexts/WindowManagerContext';
import { FileSystemProvider } from './contexts/FileSystemContext';
import { ApplicationProvider } from './contexts/ApplicationContext';
import { TerminalProvider } from './contexts/TerminalContext';

import './App.css';

function App() {
  return (
    <ThemeProvider>
      <ApplicationProvider>
        <FileSystemProvider>
          <TerminalProvider>
            <WindowManagerProvider>
              <div className="App min-h-screen bg-gradient-to-br from-ubuntu-orange-light to-ubuntu-purple-light dark:from-ubuntu-dark-bg dark:to-ubuntu-dark-surface transition-colors duration-300">
                {/* El escritorio con los íconos */}
                <Desktop />

                {/* Contenedor para las ventanas */}
                <WindowManager />
              </div>
            </WindowManagerProvider>
          </TerminalProvider>
        </FileSystemProvider>
      </ApplicationProvider>
    </ThemeProvider>
  );
}

export default App;

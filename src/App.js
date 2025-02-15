import React, { useState } from 'react';
import Desktop from './components/Desktop';
import WindowContainer from './components/WindowContainer';
import './App.css';


function App() {
  // Este estado maneja las ventanas abiertas.
  const [windows, setWindows] = useState([]);

  // Función para abrir una ventana. "type" puede ser "terminal", "explorer", "help", "note", etc.
  const openWindow = (type, props = {}) => {
    setWindows((prev) => [
      ...prev,
      { type, props, id: Date.now() + Math.random() },
    ]);
  };

  // Función para cerrar una ventana por su id.
  const closeWindow = (id) => {
    setWindows((prev) => prev.filter((win) => win.id !== id));
  };

  return (
    <div className="App">
      {/* El escritorio con los íconos */}
      <Desktop openWindow={openWindow} />

      {/* Contenedor para las ventanas */}
      <WindowContainer windows={windows} closeWindow={closeWindow} openWindow={openWindow} />
    </div>
  );
}

export default App;

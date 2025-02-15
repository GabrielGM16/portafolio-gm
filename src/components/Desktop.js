import React from 'react';

function Desktop({ openWindow }) {
  return (
    <div id="desktop">
      {/* Ícono de Terminal */}
      <button className="button" onClick={() => openWindow('terminal')}>
        <div className="container">
          <div className="terminal-icon">
            <span className="prompt">&gt;_</span>
          </div>
        </div>
        <div className="active_line"></div>
        <span className="text">Terminal</span>
      </button>

      {/* Ícono de Explorador */}
      <button className="button" onClick={() => openWindow('explorer')}>
        <div className="container">
          <div className="folder folder_one"></div>
          <div className="folder folder_two"></div>
          <div className="folder folder_three"></div>
          <div className="folder folder_four"></div>
        </div>
        <div className="active_line"></div>
        <span className="text">File Explorer</span>
      </button>

      {/* Ícono de Ayuda */}
      <button className="button" onClick={() => openWindow('help')}>
        <div className="container">
          <div className="help-icon">
            <span className="question-mark">?</span>
          </div>
        </div>
        <div className="active_line"></div>
        <span className="text">Help</span>
      </button>

      {/* Ícono de Notas */}
      <button className="button" onClick={() => openWindow('note', { 
        title: "Nota", 
        content: "Esta es una nota interactiva sobre mi trabajo y proyectos.", 
        // Puedes agregar propiedades para posicionarla o contenido extra
      })}>
        <div className="container">
          <div className="note-icon">
            <span className="note-letter">N</span>
          </div>
        </div>
        <div className="active_line"></div>
        <span className="text">Notas</span>
      </button>
    </div>
  );
}

export default Desktop;

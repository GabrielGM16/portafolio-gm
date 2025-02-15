import React from 'react';
import TerminalWindow from './TerminalWindow';
import ExplorerWindow from './ExplorerWindow';
import HelpWindow from './HelpWindow';
import NoteWindow from './NoteWindow';

function WindowContainer({ windows, closeWindow, openWindow }) {
  return (
    <div id="window-container">
      {windows.map((win) => {
        // Según el tipo, renderiza el componente adecuado
        switch (win.type) {
          case 'terminal':
            return <TerminalWindow key={win.id} id={win.id} closeWindow={closeWindow} />;
          case 'explorer':
            return <ExplorerWindow key={win.id} id={win.id} closeWindow={closeWindow} />;
          case 'help':
            return <HelpWindow key={win.id} id={win.id} closeWindow={closeWindow} />;
          case 'note':
            return <NoteWindow key={win.id} id={win.id} closeWindow={closeWindow} {...win.props} />;
          default:
            return null;
        }
      })}
    </div>
  );
}

export default WindowContainer;

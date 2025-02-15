import React, { useEffect, useRef } from 'react';
import { makeDraggable } from '../utils/draggable';

// Lista de comandos
const commandsList = [
  "ls - listar directorio",
  "cd <directorio> - cambiar directorio",
  "pwd - mostrar ruta actual",
  "cat <archivo> - ver contenido de un archivo",
  "explorer - abrir explorador de archivos",
  "about - sobre mí",
  "projects - mis proyectos",
  "contact - información de contacto",
  "clear - limpiar terminal",
  "help - mostrar esta ayuda"
];

function HelpWindow({ id, closeWindow, openTerminalWindow }) {
  const helpRef = useRef(null);
  const toolbarRef = useRef(null);

  useEffect(() => {
    // Permite arrastrar la ventana
    if (helpRef.current && toolbarRef.current) {
      makeDraggable(helpRef.current, toolbarRef.current);
    }
  }, []);

  // Lógica al hacer clic en un comando
  const handleCommandClick = (cmd) => {
    // Intentamos encontrar la ventana de la Terminal
    const termWindow = document.getElementById("terminal-window");
    
    if (!termWindow) {
      // Si no está abierta, la abrimos
      if (openTerminalWindow) {
        openTerminalWindow(); // Llamada a la función que abre la Terminal
      }
      // Esperamos un momento a que se monte la Terminal y creamos el input
      setTimeout(() => {
        const inputField = document.querySelector(".commandInput");
        if (inputField) {
          // Tomamos la primera palabra del comando (por ejemplo, "ls")
          inputField.value = cmd.split(" ")[0];
          inputField.focus();
        }
      }, 300);
    } else {
      // Si la Terminal ya está abierta, solo ajustamos el input
      const inputField = termWindow.querySelector(".commandInput");
      if (inputField) {
        inputField.value = cmd.split(" ")[0];
        inputField.focus();
      }
    }
  };

  return (
    <div
      className="card"
      id="help-card"
      ref={helpRef}
      style={{ top: "200px", left: "200px", zIndex: 200 }}
    >
      {/* Barra superior con los "semáforos" */}
      <div className="tools" ref={toolbarRef}>
        <div className="circle">
          <span
            className="box red"
            onClick={() => closeWindow(id)}
          ></span>
        </div>
        <div className="circle">
          <span className="box yellow"></span>
        </div>
        <div className="circle">
          <span className="box green"></span>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="card__content">
        <div className="help-body">
          <ul>
            {commandsList.map((cmd, index) => (
              <li key={index} onClick={() => handleCommandClick(cmd)}>
                {cmd}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default HelpWindow;

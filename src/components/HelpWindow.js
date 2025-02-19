import React, { useEffect, useRef } from "react";
import { makeDraggable } from "../utils/draggable";

// Lista de comandos disponibles
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
  "help - mostrar esta ayuda",
];

let currentZIndex = 200; // Control global del Z-Index

function HelpWindow({ id, closeWindow, openTerminalWindow }) {
  const helpRef = useRef(null);
  const toolbarRef = useRef(null);

  useEffect(() => {
    if (helpRef.current && toolbarRef.current) {
      makeDraggable(helpRef.current, toolbarRef.current);
    }
    bringToFront();
  }, []);

  // Lleva la ventana al frente cuando se hace clic en ella
  function bringToFront() {
    if (helpRef.current) {
      helpRef.current.style.zIndex = ++currentZIndex;
    }
  }

  // Lógica para manejar el clic en los comandos
  const handleCommandClick = (cmd) => {
    const termWindow = document.getElementById("terminal-window");

    if (!termWindow) {
      if (openTerminalWindow) {
        openTerminalWindow();
      }
      setTimeout(() => {
        const inputField = document.querySelector(".commandInput");
        if (inputField) {
          inputField.value = cmd.split(" ")[0];
          inputField.focus();
        }
      }, 300);
    } else {
      const inputField = termWindow.querySelector(".commandInput");
      if (inputField) {
        inputField.value = cmd.split(" ")[0];
        inputField.focus();
      }
      termWindow.style.zIndex = ++currentZIndex;
    }
  };

  return (
    <div
      className="window help-window"
      ref={helpRef}
      style={{
        top: "200px",
        left: "200px",
        width: "400px",
        height: "300px",
        zIndex: currentZIndex,
      }}
      onMouseDown={bringToFront}
    >
      {/* Barra superior */}
      <div className="toolbar" ref={toolbarRef}>
        <div className="button-group">
          <div className="circle-12 red" onClick={() => closeWindow(id)}></div>
          <div className="circle-12 yellow"></div>
          <div className="circle-12 green"></div>
        </div>
        <span className="window-title">Ayuda</span>
      </div>

      {/* Cuerpo de la ventana de ayuda */}
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
  );
}

export default HelpWindow;

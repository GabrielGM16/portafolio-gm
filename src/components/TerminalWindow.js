import React, { useEffect, useRef } from 'react';
import { makeDraggable } from '../utils/draggable'; // Asegúrate de tener esta función en utils

// SISTEMA DE ARCHIVOS
const fileSystem = {
  home: {
    "about.txt": "Soy Martin Gabriel Godinez Morales, desarrollador de software.",
    projects: {
      "project1.txt": "Descripción del proyecto 1",
      "project2.txt": "Descripción del proyecto 2"
    },
    "contact.txt": "gmoficial16@gmail.com"
  }
};

let currentPath = ["home"];

function getDirectory(pathArray) {
  let dir = fileSystem;
  for (let i = 0; i < pathArray.length; i++) {
    if (dir && Object.prototype.hasOwnProperty.call(dir, pathArray[i])) {
      dir = dir[pathArray[i]];
    } else {
      return null;
    }
  }
  return dir;
}

// UTILIDADES PARA VENTANAS
let currentZIndex = 200;
function getNextZIndex() {
  return ++currentZIndex;
}

function TerminalWindow({ id, closeWindow }) {
  const terminalRef = useRef(null);
  const toolbarRef = useRef(null);

  useEffect(() => {
    if (terminalRef.current && toolbarRef.current) {
      makeDraggable(terminalRef.current, toolbarRef.current);
    }
    // Inicia la terminal con la lógica de prompt
    const terminalBody = terminalRef.current.querySelector('.terminal-body');
    setupTerminal(terminalBody);
  }, []);

  // Lógica de la terminal (adaptada de tu código original)
  function setupTerminal(terminalBody) {
    const promptText = "gmorales@portafolio:~$";
    let commandHistory = [];
    let historyIndex = 0;

    function typeLine(text, callback) {
      const p = document.createElement("p");
      terminalBody.appendChild(p);
      let index = 0;
      function typeChar() {
        if (index < text.length) {
          p.innerHTML += text.charAt(index);
          index++;
          setTimeout(typeChar, 20);
        } else {
          if (callback) callback();
        }
        terminalBody.scrollTop = terminalBody.scrollHeight;
      }
      typeChar();
    }

    function createPrompt() {
      const container = document.createElement("div");
      container.classList.add("command-line");
      container.innerHTML = `
        <span class="prompt">${promptText}</span>
        <input type="text" class="commandInput" autocomplete="off" autofocus />
      `;
      terminalBody.appendChild(container);
      terminalBody.scrollTop = terminalBody.scrollHeight;
      
      const inputField = container.querySelector(".commandInput");
      inputField.focus();
      
      inputField.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
          event.preventDefault();
          const command = inputField.value.trim().toLowerCase();
          container.innerHTML = `<span class="prompt">${promptText}</span><span class="typed-command">${command}</span>`;
          commandHistory.push(command);
          historyIndex = commandHistory.length;
          processCommand(command, terminalBody, createPrompt);
        } else if (event.key === "ArrowUp") {
          if (commandHistory.length > 0 && historyIndex > 0) {
            historyIndex--;
            inputField.value = commandHistory[historyIndex];
          }
          event.preventDefault();
        } else if (event.key === "ArrowDown") {
          if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
            historyIndex++;
            inputField.value = commandHistory[historyIndex];
          } else {
            historyIndex = commandHistory.length;
            inputField.value = "";
          }
          event.preventDefault();
        }
      });
    }

    function listDirectory() {
      const dir = getDirectory(currentPath);
      let result = "";
      for (const key in dir) {
        if (typeof dir[key] === "object") {
          result += key + "/  ";
        } else {
          result += key + "  ";
        }
      }
      typeLine(result, createPrompt);
    }

    function changeDirectory(dirName) {
      if (dirName === "..") {
        if (currentPath.length > 1) {
          currentPath.pop();
          typeLine("Directorio cambiado a /" + currentPath.join("/"), createPrompt);
        } else {
          typeLine("No se puede retroceder más.", createPrompt);
        }
      } else {
        const dir = getDirectory(currentPath);
        if (dir && Object.prototype.hasOwnProperty.call(dir, dirName) && typeof dir[dirName] === "object") {
          currentPath.push(dirName);
          typeLine("Directorio cambiado a /" + currentPath.join("/"), createPrompt);
        } else {
          typeLine("Directorio no encontrado.", createPrompt);
        }
      }
    }

    function printWorkingDirectory() {
      typeLine("/" + currentPath.join("/"), createPrompt);
    }

    function catFile(fileName) {
      const dir = getDirectory(currentPath);
      if (dir && Object.prototype.hasOwnProperty.call(dir, fileName) && typeof dir[fileName] === "string") {
        typeLine(dir[fileName], createPrompt);
      } else {
        typeLine("Archivo no encontrado o es un directorio.", createPrompt);
      }
    }

    function processCommand(command, terminalBody, createPrompt) {
      if (command === "") {
        createPrompt();
        return;
      }
      const tokens = command.split(" ");
      const fsCommands = ["ls", "cd", "pwd", "cat", "explorer"];

      // Comandos especiales
      if (tokens[0] === "contact") {
        // Aquí podrías integrar openContactWindow() si lo tienes definido, o simplemente mostrar información.
        typeLine("Contacto: gmoficial16@gmail.com", createPrompt);
        return;
      }
      if (tokens[0] === "about") {
        catFile("about.txt");
        return;
      }
      if (tokens[0] === "projects") {
        // Si tienes la función openExplorerWindow, podrías llamarla; en este ejemplo, listamos el directorio.
        listDirectory();
        return;
      }
      
      if (fsCommands.includes(tokens[0])) {
        handleFileSystemCommand(tokens, createPrompt);
      } else if (command === "clear") {
        terminalBody.innerHTML = "";
        createPrompt();
      } else if (command === "help") {
        typeLine("Comandos disponibles: ls - cd - pwd - cat - explorer - about - projects - contact - clear", createPrompt);
      } else {
        typeLine("Comando no reconocido. Escribe 'help' para ver los comandos disponibles.", createPrompt);
      }
    }

    function handleFileSystemCommand(tokens, createPrompt) {
      const cmd = tokens[0];
      if (cmd === "ls") {
        listDirectory();
      } else if (cmd === "cd") {
        if (tokens.length < 2) {
          typeLine("Uso: cd <directorio>", createPrompt);
        } else {
          changeDirectory(tokens[1]);
        }
      } else if (cmd === "pwd") {
        printWorkingDirectory();
      } else if (cmd === "cat") {
        if (tokens.length < 2) {
          typeLine("Uso: cat <archivo>", createPrompt);
        } else {
          catFile(tokens[1]);
        }
      } else if (cmd === "explorer") {
        // Si se usa el comando explorer, puedes listar el directorio o disparar otra función.
        listDirectory();
      } else {
        typeLine("Comando no reconocido.", createPrompt);
      }
    }

    function printWelcomeMessage() {
      const messages = [
        "Bienvenido a mi portafolio interactivo.",
        "Escribe 'help' para ver los comandos disponibles."
      ];
      let i = 0;
      function printNext() {
        if (i < messages.length) {
          typeLine(messages[i], () => {
            i++;
            printNext();
          });
        } else {
          createPrompt();
        }
      }
      printNext();
    }

    printWelcomeMessage();
  }

  return (
    <div
      className="window"
      id="terminal-window"
      ref={terminalRef}
      style={{ top: "50px", left: "100px", width: "800px", height: "400px" }}
    >
      <div className="terminal-toolbar" ref={toolbarRef}>
        <div className="toolbar-header">
          <div className="button-group">
            <div className="circle-12 red" onClick={() => closeWindow(id)}></div>
            <div className="circle-12 yellow"></div>
            <div className="circle-12 green"></div>
          </div>
          <span className="terminal-title">
            Terminal - Martin Gabriel Godinez Morales
          </span>
        </div>
      </div>
      <div className="terminal-body">
        {/* El contenido de la terminal se generará dinámicamente */}
      </div>
    </div>
  );
}

export default TerminalWindow;

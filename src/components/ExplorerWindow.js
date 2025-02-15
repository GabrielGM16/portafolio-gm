import React, { useEffect, useRef, useState } from 'react';
import { makeDraggable } from '../utils/draggable';

// Sistema de archivos de ejemplo
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

// Función para navegar en el sistema de archivos
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

function ExplorerWindow({ id, closeWindow }) {
  const explorerRef = useRef(null);
  const toolbarRef = useRef(null);

  // Estado local para la ruta actual en el explorador
  const [explorerPath, setExplorerPath] = useState(["home"]);
  // Estado para la lista de items (archivos/carpetas)
  const [items, setItems] = useState([]);

  // Efecto: Hacer draggable la ventana (se ejecuta solo una vez al montar)
  useEffect(() => {
    if (explorerRef.current && toolbarRef.current) {
      makeDraggable(explorerRef.current, toolbarRef.current);
      console.log("Draggable attached to ExplorerWindow");
    }
  }, []);

  // Efecto: Actualizar los items cada vez que cambie la ruta
  useEffect(() => {
    updateExplorerBody();
  }, [explorerPath]);

  // Actualiza la lista de items en función de la ruta actual
  function updateExplorerBody() {
    const dir = getDirectory(explorerPath);
    if (!dir) return;

    const entries = [];
    // Si no estamos en la raíz, agregamos un item para subir un nivel
    if (explorerPath.length > 1) {
      entries.push({ name: "..", isFolder: true, isUp: true });
    }
    // Agregamos los items del directorio actual
    for (const key in dir) {
      if (typeof dir[key] === "object") {
        entries.push({ name: key, isFolder: true, content: dir[key] });
      } else {
        entries.push({ name: key, isFolder: false, content: dir[key] });
      }
    }
    setItems(entries);
  }

  // Maneja el clic en un item (carpeta o archivo)
  function handleItemClick(item) {
    if (item.isUp) {
      // Subir un nivel
      setExplorerPath((prev) => prev.slice(0, prev.length - 1));
      return;
    }
    if (item.isFolder) {
      // Bajar a la carpeta seleccionada
      setExplorerPath((prev) => [...prev, item.name]);
    } else {
      // Si es archivo, abrir su contenido (puedes reemplazar alert por otra lógica)
      alert(`Contenido de ${item.name}:\n\n${item.content}`);
    }
  }

  return (
    <div
      className="card"
      id="explorer-card"
      ref={explorerRef}
      style={{ top: "150px", left: "150px", zIndex: 200 }}
    >
      {/* Barra superior: este es el handle para arrastrar */}
      <div className="tools" ref={toolbarRef} style={{ cursor: "move" }}>
        <div className="circle">
          <span className="box red" onClick={() => closeWindow(id)}></span>
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
        <div className="explorer-body">
          {items.map((item, index) => (
            <div
              key={index}
              className={`explorer-item ${item.isFolder ? "folder" : "file"}`}
              onClick={() => handleItemClick(item)}
            >
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ExplorerWindow;

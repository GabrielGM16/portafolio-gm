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
  // Estado para forzar re-render cuando la ruta cambie
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (explorerRef.current && toolbarRef.current) {
      makeDraggable(explorerRef.current, toolbarRef.current);
    }
    // Cada vez que el componente se monte o se actualice la ruta, actualizamos el contenido
    updateExplorerBody();
    // eslint-disable-next-line
  }, [explorerPath]);

  // Función para actualizar la lista de items (archivos y carpetas)
  function updateExplorerBody() {
    const dir = getDirectory(explorerPath);
    if (!dir) return;

    // Creamos un array de nombres de archivos/carpetas
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

  // Función para manejar clic en un item (carpeta o archivo)
  function handleItemClick(item) {
    // Si es "..", subimos un nivel
    if (item.isUp) {
      setExplorerPath((prev) => prev.slice(0, prev.length - 1));
      return;
    }
    // Si es carpeta, bajamos a ese subdirectorio
    if (item.isFolder) {
      setExplorerPath((prev) => [...prev, item.name]);
    } else {
      // Si es archivo, abrimos su contenido
      // Aquí podrías usar openFileWindow(item.name, item.content) en lugar de alert
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
      {/* Barra superior */}
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

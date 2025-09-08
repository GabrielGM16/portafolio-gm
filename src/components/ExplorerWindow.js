import React, { useEffect, useRef, useState, useCallback } from "react";
import { makeDraggable } from "../utils/draggable";

// Sistema de archivos
const fileSystem = {
  home: {
    "about.txt": "Soy Martin Gabriel Godinez Morales, desarrollador de software.",
    projects: {
      "project1.txt": "Descripción del proyecto 1",
      "project2.txt": "Descripción del proyecto 2",
    },
    "contact.txt": "gmoficial16@gmail.com",
  },
};

// Utilidad para obtener el directorio según la ruta actual
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

let currentZIndex = 200; // Manejo de apilamiento dinámico

function ExplorerWindow({ id, closeWindow }) {
  const explorerRef = useRef(null);
  const toolbarRef = useRef(null);

  const [explorerPath, setExplorerPath] = useState(["home"]);
  const [items, setItems] = useState([]);

  const bringToFront = useCallback(() => {
    if (explorerRef.current) {
      explorerRef.current.style.zIndex = ++currentZIndex;
    }
  }, []);

  const updateExplorerBody = useCallback(() => {
    const dir = getDirectory(explorerPath);
    if (!dir) return;
    const entries = [];

    if (explorerPath.length > 1) {
      entries.push({ name: "..", isFolder: true, isUp: true });
    }

    for (const key in dir) {
      if (typeof dir[key] === "object") {
        entries.push({ name: key, isFolder: true, content: dir[key] });
      } else {
        entries.push({ name: key, isFolder: false, content: dir[key] });
      }
    }
    setItems(entries);
  }, [explorerPath]);

  useEffect(() => {
    if (explorerRef.current && toolbarRef.current) {
      makeDraggable(explorerRef.current, toolbarRef.current);
    }
    bringToFront(); // Asegurar que inicia en el frente
  }, [bringToFront]);

  useEffect(() => {
    updateExplorerBody();
  }, [updateExplorerBody]);

  function handleItemClick(item) {
    if (item.isUp) {
      setExplorerPath((prev) => prev.slice(0, prev.length - 1));
      return;
    }
    if (item.isFolder) {
      setExplorerPath((prev) => [...prev, item.name]);
    } else {
      alert(`Contenido de ${item.name}:\n\n${item.content}`);
    }
  }

  return (
    <div
      className="window explorer-window"
      ref={explorerRef}
      style={{
        top: "150px",
        left: "150px",
        width: "500px",
        height: "350px",
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
        <span className="window-title">Explorador de Archivos</span>
      </div>

      {/* Cuerpo del explorador */}
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
  );
}

export default ExplorerWindow;

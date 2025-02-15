import React, { useEffect, useRef } from 'react';
import { makeDraggable } from '../utils/draggable';

function NoteWindow({ id, closeWindow, title, content, posX = 300, posY = 300 }) {
  const noteRef = useRef(null);
  const toolbarRef = useRef(null);

  useEffect(() => {
    if (noteRef.current && toolbarRef.current) {
      makeDraggable(noteRef.current, toolbarRef.current);
    }
  }, []);

  return (
    <div
      className="note-window"
      id={`note-window-${id}`}
      ref={noteRef}
      style={{ top: posY + "px", left: posX + "px" }}
    >
      {/* Barra superior: título y botón de cierre */}
      <div className="note-tools" ref={toolbarRef}>
        <div className="note-title">{title}</div>
        <div className="note-close" onClick={() => closeWindow(id)}></div>
      </div>

      {/* Sección para la foto del desarrollador */}
      <div className="note-header" style={{ textAlign: "center", padding: "5px" }}>
        <img
          src="img/mi-foto.jpg"
          alt="Mi Foto"
          style={{ width: "50px", height: "50px", borderRadius: "50%" }}
        />
      </div>

      {/* Contenido de la nota */}
      <div className="note-content">
        <p>{content}</p>
      </div>
    </div>
  );
}

export default NoteWindow;

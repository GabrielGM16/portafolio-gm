import React, { useEffect, useRef } from "react";
import { makeDraggable } from "../utils/draggable";

let currentZIndex = 200; // Control global del Z-Index

function NoteWindow({ id, closeWindow, title, content, posX = 300, posY = 300 }) {
  const noteRef = useRef(null);
  const toolbarRef = useRef(null);

  useEffect(() => {
    if (noteRef.current && toolbarRef.current) {
      makeDraggable(noteRef.current, toolbarRef.current);
    }
    bringToFront();
  }, []);

  // Lleva la ventana al frente cuando se hace clic en ella
  function bringToFront() {
    if (noteRef.current) {
      noteRef.current.style.zIndex = ++currentZIndex;
    }
  }

  return (
    <div
      className="window note-window"
      ref={noteRef}
      style={{
        top: `${posY}px`,
        left: `${posX}px`,
        width: "400px",
        height: "300px",
        zIndex: currentZIndex,
      }}
      onMouseDown={bringToFront}
    >
      {/* Barra superior */}
      <div className="toolbar" ref={toolbarRef}>
        <span className="window-title">{title}</span>
        <div className="button-group">
          <div className="circle-12 red" onClick={() => closeWindow(id)}></div>
        </div>
      </div>

      {/* Sección para la foto del desarrollador */}
      <div className="note-header" style={{ textAlign: "center", padding: "10px" }}>
        <img
          src="img/mi-foto.jpg"
          alt="Mi Foto"
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
          }}
        />
      </div>

      {/* Contenido de la nota */}
      <div className="note-content" style={{ padding: "10px", textAlign: "center" }}>
        <p>{content}</p>
      </div>
    </div>
  );
}

export default NoteWindow;

export function makeDraggable(win, handle) {
    handle.addEventListener("mousedown", function (e) {
      e.preventDefault(); // Evita que se active la selección de texto u otros eventos por defecto
      const offsetX = e.clientX - win.offsetLeft;
      const offsetY = e.clientY - win.offsetTop;
      
      function mouseMoveHandler(e) {
        win.style.left = (e.clientX - offsetX) + "px";
        win.style.top = (e.clientY - offsetY) + "px";
        // Opcional: actualizar z-index si lo deseas
      }
      
      function mouseUpHandler() {
        document.removeEventListener("mousemove", mouseMoveHandler);
        document.removeEventListener("mouseup", mouseUpHandler);
      }
      
      document.addEventListener("mousemove", mouseMoveHandler);
      document.addEventListener("mouseup", mouseUpHandler);
    });
  }
  
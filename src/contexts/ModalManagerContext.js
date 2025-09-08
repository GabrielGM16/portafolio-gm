import React, { createContext, useContext, useCallback } from 'react';
import { createRoot } from 'react-dom/client';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

// Componentes que se mostrarán en los modales
import TerminalWindow from '../components/windows/TerminalWindow';
import FileManagerWindow from '../components/windows/FileManagerWindow';
import PortfolioWindow from '../components/windows/PortfolioWindow';
import AboutWindow from '../components/windows/AboutWindow';
import ApplicationsWindow from '../components/windows/ApplicationsWindow';
import TextEditorWindow from '../components/windows/TextEditorWindow';

const MySwal = withReactContent(Swal);

const ModalManagerContext = createContext();

export const useModalManager = () => {
  const context = useContext(ModalManagerContext);
  if (!context) {
    throw new Error('useModalManager debe ser usado dentro de un ModalManagerProvider');
  }
  return context;
};

export const ModalManagerProvider = ({ children }) => {
  // Configuración base para los modales
  const getModalConfig = useCallback((type, title) => {
    const baseConfig = {
      title: title,
      showCloseButton: true,
      showConfirmButton: false,
      showCancelButton: false,
      allowOutsideClick: true,
      allowEscapeKey: true,
      customClass: {
        popup: 'modal-popup',
        title: 'modal-title',
        closeButton: 'modal-close-btn'
      },
      didOpen: () => {
        // Aplicar estilos personalizados cuando se abre el modal
        const popup = Swal.getPopup();
        if (popup) {
          popup.style.backgroundColor = '#2d3748';
          popup.style.color = '#ffffff';
          popup.style.borderRadius = '12px';
          popup.style.border = '2px solid #4a5568';
        }
      }
    };

    // Configuraciones específicas por tipo de modal
    switch (type) {
      case 'terminal':
        return {
          ...baseConfig,
          width: '90%',
          height: '80%',
          padding: '0',
          background: '#1a202c'
        };
      case 'fileManager':
        return {
          ...baseConfig,
          width: '85%',
          height: '75%',
          padding: '20px'
        };
      case 'portfolio':
        return {
          ...baseConfig,
          width: '90%',
          height: '85%',
          padding: '20px'
        };
      case 'textEditor':
        return {
          ...baseConfig,
          width: '85%',
          height: '80%',
          padding: '10px'
        };
      case 'settings':
        return {
          ...baseConfig,
          width: '70%',
          height: '70%',
          padding: '20px'
        };
      case 'about':
        return {
          ...baseConfig,
          width: '60%',
          height: '60%',
          padding: '20px'
        };
      default:
        return baseConfig;
    }
  }, []);

  // Función para abrir modales
  const openModal = useCallback(async (modalData) => {
    const { type, title, component } = modalData;
    
    let ComponentToRender;
    
    // Mapear el tipo de componente
    switch (type) {
      case 'terminal':
        ComponentToRender = TerminalWindow;
        break;
      case 'fileManager':
        ComponentToRender = FileManagerWindow;
        break;
      case 'portfolio':
        ComponentToRender = PortfolioWindow;
        break;
      case 'textEditor':
        ComponentToRender = TextEditorWindow;
        break;
      case 'settings':
        ComponentToRender = ApplicationsWindow;
        break;
      case 'about':
        ComponentToRender = AboutWindow;
        break;
      default:
        console.warn(`Tipo de modal desconocido: ${type}`);
        return;
    }

    const config = getModalConfig(type, title);
    
    try {
      // Crear un contenedor div para el componente React
      const container = document.createElement('div');
      container.style.width = '100%';
      container.style.height = '100%';
      
      await MySwal.fire({
        ...config,
        html: container,
        didOpen: () => {
          // Aplicar estilos personalizados cuando se abre el modal
          const popup = Swal.getPopup();
          if (popup) {
            popup.style.backgroundColor = '#2d3748';
            popup.style.color = '#ffffff';
            popup.style.borderRadius = '12px';
            popup.style.border = '2px solid #4a5568';
          }
          
          // Renderizar el componente React en el contenedor
          const root = createRoot(container);
          root.render(
            React.createElement(ComponentToRender, {
              isModal: true,
              onClose: () => Swal.close()
            })
          );
        }
      });
    } catch (error) {
      console.error('Error al abrir modal:', error);
    }
  }, [getModalConfig]);

  // Función para cerrar el modal actual
  const closeModal = useCallback(() => {
    Swal.close();
  }, []);

  // Función para mostrar alertas simples
  const showAlert = useCallback(async (options) => {
    const {
      title = 'Información',
      text = '',
      icon = 'info',
      confirmButtonText = 'OK'
    } = options;

    return await Swal.fire({
      title,
      text,
      icon,
      confirmButtonText,
      customClass: {
        popup: 'alert-popup',
        confirmButton: 'alert-confirm-btn'
      }
    });
  }, []);

  // Función para mostrar confirmaciones
  const showConfirm = useCallback(async (options) => {
    const {
      title = 'Confirmar',
      text = '¿Estás seguro?',
      icon = 'question',
      confirmButtonText = 'Sí',
      cancelButtonText = 'No'
    } = options;

    return await Swal.fire({
      title,
      text,
      icon,
      showCancelButton: true,
      confirmButtonText,
      cancelButtonText,
      customClass: {
        popup: 'confirm-popup',
        confirmButton: 'confirm-btn',
        cancelButton: 'cancel-btn'
      }
    });
  }, []);

  const value = {
    openModal,
    closeModal,
    showAlert,
    showConfirm
  };

  return (
    <ModalManagerContext.Provider value={value}>
      {children}
    </ModalManagerContext.Provider>
  );
};

export default ModalManagerContext;
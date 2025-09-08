import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Folder, 
  File, 
  Home, 
  ChevronLeft, 
  ChevronRight, 
  ChevronUp,
  Search,
  Grid3X3,
  List,
  MoreVertical,
  Copy,
  Scissors,
  Trash2,
  Download,
  Eye,
  Edit3
} from 'lucide-react';

// Hooks de contexto
import { useFileSystem } from '../../contexts/FileSystemContext';
import { useTheme } from '../../contexts/ThemeContext';

function FileManagerWindow({ windowId }) {
  const { 
    currentPath, 
    fileSystem, 
    navigateToPath, 
    goBack, 
    goForward, 
    goUp, 
    canGoBack, 
    canGoForward,
    copyFile,
    cutFile,
    pasteFile,
    deleteFile,
    createFolder,
    clipboard
  } = useFileSystem();
  const { theme } = useTheme();
  
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [contextMenu, setContextMenu] = useState(null);
  const [showNewFolderDialog, setShowNewFolderDialog] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');

  // Obtener contenido del directorio actual
  const getCurrentDirectoryContent = () => {
    const pathParts = currentPath.split('/').filter(Boolean);
    let current = fileSystem;
    
    for (const part of pathParts) {
      if (current.children && current.children[part]) {
        current = current.children[part];
      } else {
        return [];
      }
    }
    
    if (!current.children) return [];
    
    return Object.entries(current.children).map(([name, item]) => ({
      name,
      ...item
    }));
  };

  const directoryContent = getCurrentDirectoryContent();
  
  // Filtrar contenido por búsqueda
  const filteredContent = directoryContent.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Manejar selección de elementos
  const handleItemClick = (item, event) => {
    if (event.ctrlKey) {
      setSelectedItems(prev => 
        prev.includes(item.name) 
          ? prev.filter(name => name !== item.name)
          : [...prev, item.name]
      );
    } else {
      setSelectedItems([item.name]);
    }
  };

  // Manejar doble clic
  const handleItemDoubleClick = (item) => {
    if (item.type === 'directory') {
      const newPath = currentPath === '/' ? `/${item.name}` : `${currentPath}/${item.name}`;
      navigateToPath(newPath);
    } else {
      // Abrir archivo (aquí podrías abrir un editor de texto, visor de imágenes, etc.)
      console.log('Abriendo archivo:', item.name);
    }
  };

  // Manejar menú contextual
  const handleContextMenu = (event, item = null) => {
    event.preventDefault();
    setContextMenu({
      x: event.clientX,
      y: event.clientY,
      item
    });
  };

  // Cerrar menú contextual
  useEffect(() => {
    const handleClick = () => setContextMenu(null);
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  // Obtener icono según tipo de archivo
  const getFileIcon = (item) => {
    if (item.type === 'directory') {
      return <Folder className="w-6 h-6 text-blue-500" />;
    }
    
    const extension = item.name.split('.').pop()?.toLowerCase();
    const iconClass = "w-6 h-6";
    
    switch (extension) {
      case 'txt':
      case 'md':
        return <File className={`${iconClass} text-gray-600`} />;
      case 'json':
        return <File className={`${iconClass} text-yellow-600`} />;
      case 'js':
      case 'jsx':
        return <File className={`${iconClass} text-yellow-500`} />;
      case 'css':
        return <File className={`${iconClass} text-blue-600`} />;
      case 'html':
        return <File className={`${iconClass} text-orange-600`} />;
      case 'png':
      case 'jpg':
      case 'jpeg':
      case 'gif':
        return <File className={`${iconClass} text-green-600`} />;
      default:
        return <File className={`${iconClass} text-gray-500`} />;
    }
  };

  // Crear nueva carpeta
  const handleCreateFolder = () => {
    if (newFolderName.trim()) {
      createFolder(currentPath, newFolderName.trim());
      setNewFolderName('');
      setShowNewFolderDialog(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-900">
      {/* Barra de herramientas */}
      <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        {/* Navegación */}
        <div className="flex items-center space-x-2">
          <button
            onClick={goBack}
            disabled={!canGoBack}
            className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={goForward}
            disabled={!canGoForward}
            className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <button
            onClick={goUp}
            disabled={currentPath === '/'}
            className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronUp className="w-4 h-4" />
          </button>
          <button
            onClick={() => navigateToPath('/home/martin')}
            className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <Home className="w-4 h-4" />
          </button>
        </div>

        {/* Barra de dirección */}
        <div className="flex-1 mx-4">
          <div className="flex items-center bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-3 py-1">
            <span className="text-sm text-gray-600 dark:text-gray-300 truncate">
              {currentPath}
            </span>
          </div>
        </div>

        {/* Controles de vista */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-600'}`}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-600'}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Barra de búsqueda */}
      <div className="p-3 border-b border-gray-200 dark:border-gray-700">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar archivos y carpetas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 overflow-auto p-4" onContextMenu={(e) => handleContextMenu(e)}>
        {filteredContent.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400">
            <Folder className="w-16 h-16 mb-4 opacity-50" />
            <p className="text-lg font-medium mb-2">Carpeta vacía</p>
            <p className="text-sm">No hay archivos en este directorio</p>
          </div>
        ) : (
          <div className={viewMode === 'grid' ? 'grid grid-cols-4 gap-4' : 'space-y-1'}>
            {filteredContent.map((item) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`
                  ${viewMode === 'grid' 
                    ? 'flex flex-col items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer'
                    : 'flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer'
                  }
                  ${selectedItems.includes(item.name) ? 'bg-blue-100 dark:bg-blue-900' : ''}
                `}
                onClick={(e) => handleItemClick(item, e)}
                onDoubleClick={() => handleItemDoubleClick(item)}
                onContextMenu={(e) => handleContextMenu(e, item)}
              >
                {viewMode === 'grid' ? (
                  <>
                    <div className="mb-2">
                      {getFileIcon(item)}
                    </div>
                    <span className="text-sm text-center text-gray-700 dark:text-gray-300 truncate w-full">
                      {item.name}
                    </span>
                  </>
                ) : (
                  <>
                    <div className="mr-3">
                      {getFileIcon(item)}
                    </div>
                    <span className="flex-1 text-sm text-gray-700 dark:text-gray-300 truncate">
                      {item.name}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 ml-4">
                      {item.type === 'directory' ? 'Carpeta' : 'Archivo'}
                    </span>
                  </>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Menú contextual */}
      <AnimatePresence>
        {contextMenu && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-2 z-50"
            style={{ left: contextMenu.x, top: contextMenu.y }}
          >
            {contextMenu.item ? (
              // Menú para elemento específico
              <>
                <button className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2">
                  <Eye className="w-4 h-4" />
                  <span>Abrir</span>
                </button>
                <button 
                  onClick={() => copyFile(currentPath, contextMenu.item.name)}
                  className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2"
                >
                  <Copy className="w-4 h-4" />
                  <span>Copiar</span>
                </button>
                <button 
                  onClick={() => cutFile(currentPath, contextMenu.item.name)}
                  className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2"
                >
                  <Scissors className="w-4 h-4" />
                  <span>Cortar</span>
                </button>
                <button 
                  onClick={() => deleteFile(currentPath, contextMenu.item.name)}
                  className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2 text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Eliminar</span>
                </button>
              </>
            ) : (
              // Menú para área vacía
              <>
                {clipboard && (
                  <button 
                    onClick={() => pasteFile(currentPath)}
                    className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Pegar</span>
                  </button>
                )}
                <button 
                  onClick={() => setShowNewFolderDialog(true)}
                  className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2"
                >
                  <Folder className="w-4 h-4" />
                  <span>Nueva carpeta</span>
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Diálogo nueva carpeta */}
      <AnimatePresence>
        {showNewFolderDialog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 w-80"
            >
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
                Nueva carpeta
              </h3>
              <input
                type="text"
                placeholder="Nombre de la carpeta"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCreateFolder()}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                autoFocus
              />
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => {
                    setShowNewFolderDialog(false);
                    setNewFolderName('');
                  }}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleCreateFolder}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Crear
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Barra de estado */}
      <div className="px-4 py-2 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-600 dark:text-gray-400 flex justify-between">
        <span>{filteredContent.length} elementos</span>
        <span>{selectedItems.length} seleccionados</span>
      </div>
    </div>
  );
}

export default FileManagerWindow;
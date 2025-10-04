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
  Edit3,
  Star,
  Clock,
  FolderPlus,
  FilePlus,
  Image,
  FileText,
  Code,
  Archive,
  Music,
  Video,
  Zap
} from 'lucide-react';

import { useFileSystem } from '../../contexts/FileSystemContext';

function FileManagerWindow({ windowId, isModal = false, onClose }) {
  const { 
    currentPath, 
    getCurrentDirectoryContent,
    changeDirectory,
    goBack, 
    goForward, 
    goUp, 
    canGoBack, 
    canGoForward,
    copyFiles,
    cutFiles,
    clipBoard
  } = useFileSystem();
  
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [contextMenu, setContextMenu] = useState(null);
  const [showNewFolderDialog, setShowNewFolderDialog] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [sortBy, setSortBy] = useState('name');

  const directoryContent = getCurrentDirectoryContent() || [];
  
  const filteredContent = directoryContent
    .filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'date') return new Date(b.modified) - new Date(a.modified);
      if (sortBy === 'type') return a.type.localeCompare(b.type);
      if (sortBy === 'size') return (b.size || 0) - (a.size || 0);
      return 0;
    });

  useEffect(() => {
    const handleClickOutside = () => setContextMenu(null);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const getFileIcon = (item) => {
    if (item.type === 'directory') {
      return <Folder className="w-6 h-6 text-blue-500" />;
    }
    
    const extension = item.name.split('.').pop()?.toLowerCase();
    const iconProps = { className: "w-6 h-6" };
    
    const iconMap = {
      'txt': { icon: FileText, color: 'text-gray-600' },
      'md': { icon: FileText, color: 'text-blue-600' },
      'json': { icon: Code, color: 'text-yellow-600' },
      'js': { icon: Code, color: 'text-yellow-500' },
      'jsx': { icon: Code, color: 'text-cyan-500' },
      'ts': { icon: Code, color: 'text-blue-600' },
      'tsx': { icon: Code, color: 'text-blue-500' },
      'css': { icon: Code, color: 'text-pink-600' },
      'html': { icon: Code, color: 'text-orange-600' },
      'png': { icon: Image, color: 'text-green-600' },
      'jpg': { icon: Image, color: 'text-green-600' },
      'jpeg': { icon: Image, color: 'text-green-600' },
      'gif': { icon: Image, color: 'text-purple-600' },
      'svg': { icon: Image, color: 'text-indigo-600' },
      'mp3': { icon: Music, color: 'text-purple-600' },
      'wav': { icon: Music, color: 'text-purple-600' },
      'mp4': { icon: Video, color: 'text-red-600' },
      'avi': { icon: Video, color: 'text-red-600' },
      'zip': { icon: Archive, color: 'text-gray-600' },
      'rar': { icon: Archive, color: 'text-gray-600' }
    };

    const { icon: Icon = File, color = 'text-gray-500' } = iconMap[extension] || {};
    return <Icon className={`w-6 h-6 ${color}`} />;
  };

  const handleItemClick = (item, event) => {
    if (event.ctrlKey || event.metaKey) {
      setSelectedItems(prev => 
        prev.includes(item.name) 
          ? prev.filter(name => name !== item.name)
          : [...prev, item.name]
      );
    } else {
      setSelectedItems([item.name]);
    }
  };

  const handleItemDoubleClick = (item) => {
    if (item.type === 'directory') {
      changeDirectory(item.path);
      setSelectedItems([]);
    } else {
      console.log('Opening file:', item.name);
    }
  };

  const handleContextMenu = (event, item = null) => {
    event.preventDefault();
    setContextMenu({ x: event.clientX, y: event.clientY, item });
  };

  const formatFileSize = (bytes) => {
    if (!bytes || bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const quickAccess = [
    { name: 'Inicio', path: '/home/martin', icon: Home },
    { name: 'Documentos', path: '/home/martin/Documents', icon: FileText },
    { name: 'Descargas', path: '/home/martin/Downloads', icon: Download },
    { name: 'Imágenes', path: '/home/martin/Pictures', icon: Image }
  ];

  return (
    <div className="h-full flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Toolbar */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center justify-between mb-4">
          {/* Navigation */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg">
              <button
                onClick={goBack}
                disabled={!canGoBack}
                className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-l-lg transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={goForward}
                disabled={!canGoForward}
                className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <button
                onClick={goUp}
                disabled={currentPath === '/'}
                className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-r-lg transition-colors"
              >
                <ChevronUp className="w-5 h-5" />
              </button>
            </div>

            <button
              onClick={() => changeDirectory('/home/martin')}
              className="p-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-shadow"
            >
              <Home className="w-5 h-5" />
            </button>
          </div>

          {/* View Controls */}
          <div className="flex items-center space-x-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 bg-gray-100 dark:bg-gray-700 border-none rounded-lg text-sm focus:ring-2 focus:ring-purple-500"
            >
              <option value="name">Nombre</option>
              <option value="date">Fecha</option>
              <option value="type">Tipo</option>
              <option value="size">Tamaño</option>
            </select>

            <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-purple-600 text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-600'} rounded-l-lg transition-colors`}
              >
                <Grid3X3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-purple-600 text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-600'} rounded-r-lg transition-colors`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Address Bar & Search */}
        <div className="flex items-center space-x-4">
          <div className="flex-1 flex items-center bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2">
            <Folder className="w-5 h-5 text-gray-400 mr-2" />
            <span className="text-sm text-gray-600 dark:text-gray-300 truncate">
              {currentPath}
            </span>
          </div>

          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar archivos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Quick Actions */}
        {selectedItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg"
          >
            <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
              {selectedItems.length} elemento(s) seleccionado(s)
            </span>
            <div className="flex space-x-2">
              <button className="px-3 py-1 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                Copiar
              </button>
              <button className="px-3 py-1 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                Mover
              </button>
              <button className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors">
                Eliminar
              </button>
            </div>
          </motion.div>
        )}
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4 overflow-y-auto">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
            <Zap className="w-4 h-4 mr-2 text-purple-600" />
            Acceso Rápido
          </h3>
          <div className="space-y-1">
            {quickAccess.map((item, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  changeDirectory(item.path);
                  setSelectedItems([]);
                }}
                whileHover={{ x: 4 }}
                className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors group"
              >
                <item.icon className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-purple-600 transition-colors" />
                <span className="text-sm text-gray-700 dark:text-gray-300">{item.name}</span>
              </motion.button>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
              <Star className="w-4 h-4 mr-2 text-yellow-600" />
              Favoritos
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Sin favoritos aún
            </p>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
              <Clock className="w-4 h-4 mr-2 text-blue-600" />
              Recientes
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Sin archivos recientes
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-6" onContextMenu={handleContextMenu}>
          {filteredContent.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400">
              <Folder className="w-16 h-16 mb-4 opacity-50" />
              <p className="text-lg font-medium mb-2">
                {searchQuery ? 'No se encontraron resultados' : 'Carpeta vacía'}
              </p>
              <p className="text-sm">
                {searchQuery ? 'Intenta con otros términos de búsqueda' : 'No hay archivos en este directorio'}
              </p>
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                  {filteredContent.map((item) => (
                    <motion.div
                      key={item.name}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      whileHover={{ scale: 1.05 }}
                      className={`
                        group cursor-pointer p-4 rounded-xl transition-all duration-200
                        ${selectedItems.includes(item.name)
                          ? 'bg-purple-100 dark:bg-purple-900/30 ring-2 ring-purple-500'
                          : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'
                        }
                      `}
                      onClick={(e) => handleItemClick(item, e)}
                      onDoubleClick={() => handleItemDoubleClick(item)}
                      onContextMenu={(e) => handleContextMenu(e, item)}
                    >
                      <div className="flex flex-col items-center text-center">
                        <div className="mb-3 p-3 bg-gray-100 dark:bg-gray-700 rounded-xl group-hover:bg-purple-100 dark:group-hover:bg-purple-900/30 transition-colors">
                          {getFileIcon(item)}
                        </div>
                        <span className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate w-full">
                          {item.name}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {item.type === 'directory' ? 'Carpeta' : formatFileSize(item.size)}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="space-y-1">
                  {filteredContent.map((item) => (
                    <motion.div
                      key={item.name}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className={`
                        flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all
                        ${selectedItems.includes(item.name)
                          ? 'bg-purple-100 dark:bg-purple-900/30'
                          : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'
                        }
                      `}
                      onClick={(e) => handleItemClick(item, e)}
                      onDoubleClick={() => handleItemDoubleClick(item)}
                      onContextMenu={(e) => handleContextMenu(e, item)}
                    >
                      <div className="flex items-center space-x-3 flex-1 min-w-0">
                        <div className="flex-shrink-0">
                          {getFileIcon(item)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                            {item.name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {formatDate(item.modified)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                        <span className="w-20 text-right">
                          {item.type === 'directory' ? '-' : formatFileSize(item.size)}
                        </span>
                        <span className="w-24 text-right">
                          {item.type === 'directory' ? 'Carpeta' : 'Archivo'}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </AnimatePresence>
          )}
        </div>
      </div>

      {/* Status Bar */}
      <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-6 py-2">
        <div className="flex justify-between items-center text-xs text-gray-600 dark:text-gray-400">
          <span>{filteredContent.length} elemento(s)</span>
          <span>{selectedItems.length} seleccionado(s)</span>
        </div>
      </div>

      {/* Context Menu */}
      <AnimatePresence>
        {contextMenu && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl py-2 z-50 min-w-48"
            style={{
              left: Math.min(contextMenu.x, window.innerWidth - 200),
              top: Math.min(contextMenu.y, window.innerHeight - 300)
            }}
          >
            {contextMenu.item ? (
              <>
                <button className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2 text-sm">
                  <Eye className="w-4 h-4" />
                  <span>Abrir</span>
                </button>
                <button className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2 text-sm">
                  <Copy className="w-4 h-4" />
                  <span>Copiar</span>
                </button>
                <button className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2 text-sm">
                  <Scissors className="w-4 h-4" />
                  <span>Cortar</span>
                </button>
                <button className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2 text-sm">
                  <Edit3 className="w-4 h-4" />
                  <span>Renombrar</span>
                </button>
                <div className="h-px bg-gray-200 dark:bg-gray-700 my-1" />
                <button className="w-full px-4 py-2 text-left hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center space-x-2 text-sm text-red-600">
                  <Trash2 className="w-4 h-4" />
                  <span>Eliminar</span>
                </button>
              </>
            ) : (
              <>
                {clipBoard && clipBoard.files.length > 0 && (
                  <>
                    <button className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2 text-sm">
                      <Download className="w-4 h-4" />
                      <span>Pegar</span>
                    </button>
                    <div className="h-px bg-gray-200 dark:bg-gray-700 my-1" />
                  </>
                )}
                <button className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2 text-sm">
                  <FolderPlus className="w-4 h-4" />
                  <span>Nueva carpeta</span>
                </button>
                <button className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2 text-sm">
                  <FilePlus className="w-4 h-4" />
                  <span>Nuevo archivo</span>
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default FileManagerWindow;
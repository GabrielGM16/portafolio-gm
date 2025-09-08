import React, { useState, useRef, useEffect } from 'react';
import { 
  Save, 
  FileText, 
  Bold, 
  Italic, 
  Underline, 
  AlignLeft, 
  AlignCenter, 
  AlignRight,
  Undo,
  Redo,
  Search,
  Replace
} from 'lucide-react';

const TextEditorWindow = () => {
  const [content, setContent] = useState('# Bienvenido al Editor de Texto\n\nEste es un editor de texto simple con funcionalidades básicas.\n\nPuedes escribir aquí tu contenido...');
  const [fileName, setFileName] = useState('documento.txt');
  const [isModified, setIsModified] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [replaceTerm, setReplaceTerm] = useState('');
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [content]);

  const handleContentChange = (e) => {
    setContent(e.target.value);
    setIsModified(true);
  };

  const handleSave = () => {
    // Simular guardado
    setIsModified(false);
    console.log('Archivo guardado:', fileName);
  };

  const handleFormatText = (format) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    
    if (selectedText) {
      let formattedText = selectedText;
      
      switch (format) {
        case 'bold':
          formattedText = `**${selectedText}**`;
          break;
        case 'italic':
          formattedText = `*${selectedText}*`;
          break;
        case 'underline':
          formattedText = `<u>${selectedText}</u>`;
          break;
        default:
          break;
      }
      
      const newContent = content.substring(0, start) + formattedText + content.substring(end);
      setContent(newContent);
      setIsModified(true);
    }
  };

  const handleSearch = () => {
    if (!searchTerm) return;
    
    const textarea = textareaRef.current;
    if (!textarea) return;

    const text = textarea.value;
    const index = text.toLowerCase().indexOf(searchTerm.toLowerCase());
    
    if (index !== -1) {
      textarea.focus();
      textarea.setSelectionRange(index, index + searchTerm.length);
    }
  };

  const handleReplace = () => {
    if (!searchTerm || !replaceTerm) return;
    
    const newContent = content.replace(new RegExp(searchTerm, 'gi'), replaceTerm);
    setContent(newContent);
    setIsModified(true);
  };

  const getWordCount = () => {
    return content.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  const getCharCount = () => {
    return content.length;
  };

  return (
    <div className="h-full bg-white dark:bg-gray-900 flex flex-col">
      {/* Toolbar */}
      <div className="border-b border-gray-200 dark:border-gray-700 p-2">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <FileText size={16} className="text-gray-600 dark:text-gray-400" />
            <input
              type="text"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              className="bg-transparent text-sm font-medium text-gray-800 dark:text-gray-200 border-none outline-none"
            />
            {isModified && <span className="text-orange-500 text-xs">●</span>}
          </div>
          <button
            onClick={handleSave}
            className="flex items-center space-x-1 px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded transition-colors"
          >
            <Save size={14} />
            <span>Guardar</span>
          </button>
        </div>
        
        {/* Formatting toolbar */}
        <div className="flex items-center space-x-1">
          <button
            onClick={() => handleFormatText('bold')}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
            title="Negrita"
          >
            <Bold size={16} className="text-gray-600 dark:text-gray-400" />
          </button>
          <button
            onClick={() => handleFormatText('italic')}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
            title="Cursiva"
          >
            <Italic size={16} className="text-gray-600 dark:text-gray-400" />
          </button>
          <button
            onClick={() => handleFormatText('underline')}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
            title="Subrayado"
          >
            <Underline size={16} className="text-gray-600 dark:text-gray-400" />
          </button>
          
          <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-2"></div>
          
          <button
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
            title="Alinear izquierda"
          >
            <AlignLeft size={16} className="text-gray-600 dark:text-gray-400" />
          </button>
          <button
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
            title="Centrar"
          >
            <AlignCenter size={16} className="text-gray-600 dark:text-gray-400" />
          </button>
          <button
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
            title="Alinear derecha"
          >
            <AlignRight size={16} className="text-gray-600 dark:text-gray-400" />
          </button>
          
          <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-2"></div>
          
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
            title="Buscar"
          >
            <Search size={16} className="text-gray-600 dark:text-gray-400" />
          </button>
        </div>
        
        {/* Search panel */}
        {showSearch && (
          <div className="mt-2 p-2 bg-gray-50 dark:bg-gray-800 rounded border">
            <div className="flex items-center space-x-2 mb-2">
              <input
                type="text"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              />
              <button
                onClick={handleSearch}
                className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded transition-colors"
              >
                Buscar
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Reemplazar con..."
                value={replaceTerm}
                onChange={(e) => setReplaceTerm(e.target.value)}
                className="flex-1 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              />
              <button
                onClick={handleReplace}
                className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white text-sm rounded transition-colors"
              >
                Reemplazar
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Editor area */}
      <div className="flex-1 p-4">
        <textarea
          ref={textareaRef}
          value={content}
          onChange={handleContentChange}
          className="w-full h-full resize-none border-none outline-none bg-transparent text-gray-800 dark:text-gray-200 font-mono text-sm leading-relaxed"
          placeholder="Comienza a escribir..."
          spellCheck={false}
        />
      </div>

      {/* Status bar */}
      <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-2 bg-gray-50 dark:bg-gray-800">
        <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
          <div className="flex items-center space-x-4">
            <span>Líneas: {content.split('\n').length}</span>
            <span>Palabras: {getWordCount()}</span>
            <span>Caracteres: {getCharCount()}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>UTF-8</span>
            <span>●</span>
            <span>Texto plano</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextEditorWindow;
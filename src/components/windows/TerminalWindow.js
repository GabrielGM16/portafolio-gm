import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Terminal, 
  ChevronRight, 
  Maximize2, 
  Minimize2, 
  Copy, 
  Trash2,
  Settings,
  Info
} from 'lucide-react';

import { useTerminal } from '../../contexts/TerminalContext';

function TerminalWindow({ windowId, isModal = false, onClose }) {
  const { 
    sessions, 
    createSession, 
    executeCommand, 
    navigateHistory 
  } = useTerminal();
  
  const [activeSessionId, setActiveSessionId] = useState(null);
  const [currentInput, setCurrentInput] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);
  const [fontSize, setFontSize] = useState(14);
  const [opacity, setOpacity] = useState(95);
  
  const inputRef = useRef(null);
  const terminalRef = useRef(null);
  const session = Object.values(sessions).find(s => s.id === activeSessionId);

  useEffect(() => {
    if (!activeSessionId) {
      const sessionId = createSession();
      setActiveSessionId(sessionId);
    }
  }, [activeSessionId, createSession]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [activeSessionId]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [session?.history]);

  const handleKeyDown = (e) => {
    if (!session) return;

    switch (e.key) {
      case 'Enter':
        e.preventDefault();
        if (currentInput.trim()) {
          executeCommand(activeSessionId, currentInput.trim());
          setCurrentInput('');
        } else {
          executeCommand(activeSessionId, '');
        }
        break;
        
      case 'ArrowUp':
        e.preventDefault();
        const prevCommand = navigateHistory(activeSessionId, 'up');
        if (prevCommand !== null) {
          setCurrentInput(prevCommand);
        }
        break;
        
      case 'ArrowDown':
        e.preventDefault();
        const nextCommand = navigateHistory(activeSessionId, 'down');
        if (nextCommand !== null) {
          setCurrentInput(nextCommand);
        }
        break;
        
      case 'Tab':
        e.preventDefault();
        const commands = ['help', 'clear', 'pwd', 'ls', 'cat', 'cd', 'about', 'skills', 'projects', 'contact'];
        const matches = commands.filter(cmd => cmd.startsWith(currentInput));
        if (matches.length === 1) {
          setCurrentInput(matches[0]);
        }
        break;
        
      case 'l':
        if (e.ctrlKey) {
          e.preventDefault();
          executeCommand(activeSessionId, 'clear');
        }
        break;
        
      case 'c':
        if (e.ctrlKey) {
          e.preventDefault();
          setCurrentInput('');
        }
        break;
    }
  };

  const renderOutputLine = (line, index) => {
    if (line.type === 'command') {
      return (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center space-x-2 mt-2"
        >
          <span className="text-green-400 font-semibold">martin@ubuntu</span>
          <span className="text-white">:</span>
          <span className="text-blue-400 font-semibold">~</span>
          <span className="text-white">$</span>
          <span className="text-white ml-2">{line.content}</span>
        </motion.div>
      );
    }
    
    if (line.type === 'output') {
      return (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-1 whitespace-pre-wrap"
        >
          {line.content.split('\n').map((textLine, lineIndex) => {
            if (textLine.includes('Error:') || textLine.includes('error:')) {
              return (
                <div key={lineIndex} className="text-red-400">
                  {textLine}
                </div>
              );
            }
            if (textLine.includes('Warning:') || textLine.includes('warning:')) {
              return (
                <div key={lineIndex} className="text-yellow-400">
                  {textLine}
                </div>
              );
            }
            if (textLine.startsWith('  ')) {
              return (
                <div key={lineIndex} className="text-gray-300 ml-4">
                  {textLine.trim()}
                </div>
              );
            }
            return (
              <div key={lineIndex} className="text-gray-200">
                {textLine}
              </div>
            );
          })}
        </motion.div>
      );
    }
    
    return null;
  };

  if (!session) {
    return (
      <div className="h-full flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <Terminal className="w-12 h-12 mx-auto mb-4 text-green-400 animate-pulse" />
          <p>Iniciando terminal...</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="h-full flex flex-col bg-black text-white font-mono"
      style={{ fontSize: `${fontSize}px`, opacity: opacity / 100 }}
    >
      {/* Header moderno */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-900 border-b border-gray-800">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Terminal className="w-5 h-5 text-green-400" />
            <span className="font-semibold text-sm">Terminal</span>
          </div>
          <div className="h-4 w-px bg-gray-700" />
          <span className="text-xs text-gray-400">Session: {activeSessionId?.slice(-8)}</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setFontSize(prev => Math.max(10, prev - 1))}
            className="px-2 py-1 text-xs bg-gray-800 hover:bg-gray-700 rounded transition-colors"
          >
            A-
          </button>
          <button
            onClick={() => setFontSize(prev => Math.min(20, prev + 1))}
            className="px-2 py-1 text-xs bg-gray-800 hover:bg-gray-700 rounded transition-colors"
          >
            A+
          </button>
          <div className="h-4 w-px bg-gray-700" />
          <button
            onClick={() => executeCommand(activeSessionId, 'clear')}
            className="p-1.5 bg-gray-800 hover:bg-gray-700 rounded transition-colors"
            title="Limpiar (Ctrl+L)"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <button
            className="p-1.5 bg-gray-800 hover:bg-gray-700 rounded transition-colors"
            title="Configuración"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Terminal content con scroll personalizado */}
      <div 
        ref={terminalRef}
        className="flex-1 p-4 overflow-y-auto custom-scrollbar"
        onClick={() => inputRef.current?.focus()}
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: '#4B5563 transparent'
        }}
      >
        {/* Welcome message */}
        {session.history.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4"
          >
            <div className="flex items-center space-x-2 mb-3">
              <Terminal className="w-6 h-6 text-green-400" />
              <span className="text-green-400 font-bold text-lg">Ubuntu Terminal</span>
            </div>
            <div className="text-gray-400 text-sm space-y-1 border-l-2 border-green-400 pl-3">
              <p>¡Bienvenido al terminal interactivo de Martin Godinez!</p>
              <p>Escribe <span className="text-green-400 font-semibold">help</span> para ver los comandos disponibles.</p>
              <p>Usa <span className="text-blue-400 font-semibold">about</span>, <span className="text-blue-400 font-semibold">skills</span>, <span className="text-blue-400 font-semibold">projects</span> para explorar.</p>
            </div>
            <div className="mt-4 border-t border-gray-800 pt-3">
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="bg-gray-900 p-2 rounded">
                  <span className="text-gray-500">Sistema:</span>
                  <span className="text-white ml-1">Ubuntu 22.04</span>
                </div>
                <div className="bg-gray-900 p-2 rounded">
                  <span className="text-gray-500">Shell:</span>
                  <span className="text-white ml-1">bash</span>
                </div>
                <div className="bg-gray-900 p-2 rounded">
                  <span className="text-gray-500">Usuario:</span>
                  <span className="text-white ml-1">martin</span>
                </div>
              </div>
            </div>
            <div className="mt-4 border-b border-gray-800 pb-4" />
          </motion.div>
        )}

        {/* History */}
        <div className="space-y-1">
          {session.history.map((line, index) => renderOutputLine(line, index))}
        </div>

        {/* Input line */}
        <div className="flex items-center space-x-2 mt-2">
          <ChevronRight className="w-4 h-4 text-green-400" />
          <span className="text-green-400 font-semibold">martin@ubuntu</span>
          <span className="text-white">:</span>
          <span className="text-blue-400 font-semibold">~</span>
          <span className="text-white">$</span>
          <div className="flex-1 flex items-center ml-2">
            <input
              ref={inputRef}
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="bg-transparent border-none outline-none text-white flex-1"
              autoComplete="off"
              spellCheck={false}
            />
            <motion.span
              animate={{ opacity: cursorVisible ? 1 : 0 }}
              className="w-2 h-5 bg-green-400 ml-1"
            />
          </div>
        </div>
      </div>

      {/* Footer con información útil */}
      <div className="px-4 py-2 bg-gray-900 border-t border-gray-800 text-xs">
        <div className="flex justify-between items-center text-gray-400">
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1">
              <Info className="w-3 h-3" />
              <span>Comandos: {session.history.filter(h => h.type === 'command').length}</span>
            </span>
            <span>|</span>
            <span>Ctrl+L: Limpiar</span>
            <span>|</span>
            <span>Ctrl+C: Cancelar</span>
            <span>|</span>
            <span>Tab: Autocompletar</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span>Online</span>
            </div>
            <span>|</span>
            <span>Ubuntu 22.04 LTS</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #4B5563;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #6B7280;
        }
      `}</style>
    </div>
  );
}

export default TerminalWindow;
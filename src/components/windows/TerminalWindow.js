import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Terminal, ChevronRight } from 'lucide-react';

// Hooks de contexto
import { useTerminal } from '../../contexts/TerminalContext';
import { useTheme } from '../../contexts/ThemeContext';

function TerminalWindow({ windowId }) {
  const { 
    sessions, 
    createSession, 
    closeSession, 
    executeCommand, 
    navigateHistory 
  } = useTerminal();
  const { theme } = useTheme();
  
  const [activeSessionId, setActiveSessionId] = useState(null);
  const [currentInput, setCurrentInput] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);
  
  const inputRef = useRef(null);
  const terminalRef = useRef(null);
  const session = Object.values(sessions).find(s => s.id === activeSessionId);

  // Crear sesión inicial
  useEffect(() => {
    if (!activeSessionId) {
      const sessionId = createSession();
      setActiveSessionId(sessionId);
    }
  }, [activeSessionId, createSession]);

  // Auto-focus en el input
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [activeSessionId]);

  // Cursor parpadeante
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll al final
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [session?.history]);

  // Manejar entrada de comandos
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
        // Auto-completar comandos básicos
        const commands = ['help', 'clear', 'pwd', 'ls', 'cat', 'whoami', 'date', 'uname', 'echo', 'about', 'skills', 'projects', 'contact', 'neofetch'];
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

  // Renderizar línea de salida
  const renderOutputLine = (line, index) => {
    if (line.type === 'command') {
      return (
        <div key={index} className="flex items-center space-x-2 text-green-400">
          <span className="text-ubuntu-orange font-semibold">martin@ubuntu</span>
          <span className="text-white">:</span>
          <span className="text-blue-400 font-semibold">{session.currentPath}</span>
          <span className="text-white">$</span>
          <span className="text-white ml-2">{line.content}</span>
        </div>
      );
    }
    
    if (line.type === 'output') {
      return (
        <div key={index} className="whitespace-pre-wrap">
          {line.content.split('\n').map((textLine, lineIndex) => {
            // Colorear diferentes tipos de contenido
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
        </div>
      );
    }
    
    return null;
  };

  if (!session) {
    return (
      <div className="h-full flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <Terminal className="w-12 h-12 mx-auto mb-4 text-ubuntu-orange" />
          <p>Iniciando terminal...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-black text-white font-mono text-sm">
      {/* Header de la terminal */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <Terminal className="w-4 h-4 text-ubuntu-orange" />
          <span className="text-sm font-medium">Terminal</span>
        </div>
        <div className="flex items-center space-x-2 text-xs text-gray-400">
          <span>Session: {activeSessionId?.slice(-8)}</span>
        </div>
      </div>

      {/* Contenido de la terminal */}
      <div 
        ref={terminalRef}
        className="flex-1 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent"
        onClick={() => inputRef.current?.focus()}
      >
        {/* Mensaje de bienvenida */}
        {session.history.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-4 text-gray-300"
          >
            <div className="text-ubuntu-orange font-bold text-lg mb-2">
              ¡Bienvenido a Ubuntu Terminal!
            </div>
            <div className="text-sm space-y-1">
              <p>Escribe <span className="text-green-400 font-semibold">help</span> para ver los comandos disponibles.</p>
              <p>Usa <span className="text-blue-400 font-semibold">about</span>, <span className="text-blue-400 font-semibold">skills</span>, <span className="text-blue-400 font-semibold">projects</span> para conocer más sobre mí.</p>
            </div>
            <div className="mt-4 border-b border-gray-700 pb-2" />
          </motion.div>
        )}

        {/* Historial de comandos */}
        <div className="space-y-1">
          {session.history.map((line, index) => renderOutputLine(line, index))}
        </div>

        {/* Línea de entrada actual */}
        <div className="flex items-center space-x-2 mt-2">
          <span className="text-ubuntu-orange font-semibold">martin@ubuntu</span>
          <span className="text-white">:</span>
          <span className="text-blue-400 font-semibold">{session.currentPath}</span>
          <span className="text-white">$</span>
          <div className="flex-1 flex items-center">
            <input
              ref={inputRef}
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="bg-transparent border-none outline-none text-white flex-1 ml-2"
              autoComplete="off"
              spellCheck={false}
            />
            <span className={`w-2 h-5 bg-white ml-1 ${cursorVisible ? 'opacity-100' : 'opacity-0'} transition-opacity`} />
          </div>
        </div>
      </div>

      {/* Footer con información */}
      <div className="px-4 py-1 bg-gray-800 border-t border-gray-700 text-xs text-gray-400 flex justify-between">
        <span>Ctrl+L: Limpiar | Ctrl+C: Cancelar | Tab: Autocompletar</span>
        <span>Ubuntu 22.04 LTS</span>
      </div>
    </div>
  );
}

export default TerminalWindow
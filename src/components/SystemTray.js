import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Wifi, 
  Volume2, 
  Battery, 
  Bluetooth,
  Settings,
  Power,
  Sun,
  Moon,
  VolumeX,
  Volume1,
  WifiOff
} from 'lucide-react';

// Hooks de contexto
import { useTheme } from '../contexts/ThemeContext';

function SystemTray({ onClose }) {
  const { theme, toggleTheme } = useTheme();
  const trayRef = useRef(null);
  
  // Estados del sistema
  const [systemStatus, setSystemStatus] = useState({
    wifi: {
      connected: true,
      strength: 85,
      network: 'Mi Red WiFi'
    },
    volume: {
      level: 75,
      muted: false
    },
    battery: {
      level: 68,
      charging: false,
      timeRemaining: '3h 24m'
    },
    bluetooth: {
      enabled: true,
      connected: false
    },
    brightness: 80
  });

  // Cerrar tray al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (trayRef.current && !trayRef.current.contains(event.target)) {
        onClose();
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  // Manejar cambios en el sistema
  const handleSystemChange = (type, value) => {
    setSystemStatus(prev => ({
      ...prev,
      [type]: { ...prev[type], ...value }
    }));
  };

  // Componente de control deslizante
  const Slider = ({ value, onChange, icon: Icon, label, max = 100 }) => (
    <div className="slider-control space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Icon size={16} className="text-gray-600 dark:text-gray-400" />
          <span className="text-sm font-medium text-gray-800 dark:text-white">{label}</span>
        </div>
        <span className="text-sm text-gray-600 dark:text-gray-400">{value}%</span>
      </div>
      <div className="relative">
        <input
          type="range"
          min="0"
          max={max}
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
        />
        <style jsx>{`
          .slider::-webkit-slider-thumb {
            appearance: none;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: #e95420;
            cursor: pointer;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          }
          .slider::-moz-range-thumb {
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: #e95420;
            cursor: pointer;
            border: none;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          }
        `}</style>
      </div>
    </div>
  );

  // Componente de toggle
  const Toggle = ({ enabled, onChange, icon: Icon, label, description }) => (
    <motion.button
      className={`
        toggle-control w-full flex items-center justify-between p-3 rounded-lg
        transition-all duration-200 hover:bg-gray-100 dark:hover:bg-white/5
        ${enabled ? 'bg-ubuntu-orange/10 dark:bg-ubuntu-orange/20' : ''}
      `}
      onClick={() => onChange(!enabled)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center space-x-3">
        <div className={`
          p-2 rounded-lg transition-colors duration-200
          ${enabled ? 'bg-ubuntu-orange text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'}
        `}>
          <Icon size={16} />
        </div>
        <div className="text-left">
          <div className="text-sm font-medium text-gray-800 dark:text-white">{label}</div>
          {description && (
            <div className="text-xs text-gray-600 dark:text-gray-400">{description}</div>
          )}
        </div>
      </div>
      <div className={`
        w-12 h-6 rounded-full transition-all duration-200 relative
        ${enabled ? 'bg-ubuntu-orange' : 'bg-gray-300 dark:bg-gray-600'}
      `}>
        <div className={`
          absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-200 shadow-sm
          ${enabled ? 'left-7' : 'left-1'}
        `} />
      </div>
    </motion.button>
  );

  return (
    <motion.div
      ref={trayRef}
      className="system-tray fixed bottom-14 right-2 z-40"
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <div className="tray-container w-80 bg-white/95 dark:bg-ubuntu-dark-surface/95 backdrop-blur-md rounded-xl shadow-2xl border border-white/20 dark:border-white/10 overflow-hidden">
        
        {/* Header */}
        <div className="header p-4 border-b border-gray-200/50 dark:border-white/10">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Sistema</h3>
            <motion.button
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-colors duration-200"
              onClick={onClose}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Settings size={16} className="text-gray-600 dark:text-gray-400" />
            </motion.button>
          </div>
        </div>

        {/* Controles principales */}
        <div className="controls p-4 space-y-4">
          
          {/* Conectividad */}
          <div className="connectivity space-y-3">
            <Toggle
              enabled={systemStatus.wifi.connected}
              onChange={(enabled) => handleSystemChange('wifi', { connected: enabled })}
              icon={systemStatus.wifi.connected ? Wifi : WifiOff}
              label="Wi-Fi"
              description={systemStatus.wifi.connected ? systemStatus.wifi.network : 'Desconectado'}
            />
            
            <Toggle
              enabled={systemStatus.bluetooth.enabled}
              onChange={(enabled) => handleSystemChange('bluetooth', { enabled })}
              icon={Bluetooth}
              label="Bluetooth"
              description={systemStatus.bluetooth.connected ? 'Conectado' : 'Disponible'}
            />
          </div>

          {/* Separador */}
          <div className="h-px bg-gray-200/50 dark:bg-white/10" />

          {/* Controles de audio y brillo */}
          <div className="audio-brightness space-y-4">
            <Slider
              value={systemStatus.volume.level}
              onChange={(level) => handleSystemChange('volume', { level })}
              icon={systemStatus.volume.muted ? VolumeX : systemStatus.volume.level > 50 ? Volume2 : Volume1}
              label="Volumen"
            />
            
            <Slider
              value={systemStatus.brightness}
              onChange={(brightness) => setSystemStatus(prev => ({ ...prev, brightness }))}
              icon={theme === 'light' ? Sun : Moon}
              label="Brillo"
            />
          </div>

          {/* Separador */}
          <div className="h-px bg-gray-200/50 dark:bg-white/10" />

          {/* Estado de la batería */}
          <div className="battery-status p-3 bg-gray-50 dark:bg-ubuntu-dark-bg rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Battery 
                  size={16} 
                  className={`
                    ${systemStatus.battery.level < 20 ? 'text-red-500' : 'text-gray-600 dark:text-gray-400'}
                  `} 
                />
                <span className="text-sm font-medium text-gray-800 dark:text-white">Batería</span>
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {systemStatus.battery.level}%
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
              <div 
                className={`
                  h-2 rounded-full transition-all duration-300
                  ${systemStatus.battery.level < 20 ? 'bg-red-500' : 'bg-ubuntu-orange'}
                `}
                style={{ width: `${systemStatus.battery.level}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
              <span>{systemStatus.battery.charging ? 'Cargando' : 'Descargando'}</span>
              <span>{systemStatus.battery.timeRemaining}</span>
            </div>
          </div>
        </div>

        {/* Footer con acciones */}
        <div className="footer border-t border-gray-200/50 dark:border-white/10 p-3">
          <div className="flex justify-between items-center">
            <motion.button
              className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-800 dark:hover:text-white transition-all duration-200"
              onClick={toggleTheme}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
              <span className="text-sm font-medium">
                {theme === 'light' ? 'Modo oscuro' : 'Modo claro'}
              </span>
            </motion.button>
            
            <motion.button
              className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-red-100 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-all duration-200"
              onClick={() => {
                console.log('Apagar sistema');
                onClose();
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Power size={16} />
              <span className="text-sm font-medium">Apagar</span>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default SystemTray;
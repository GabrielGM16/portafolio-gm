import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, 
  Monitor, 
  Palette, 
  Volume2, 
  Wifi, 
  Battery, 
  User, 
  Shield, 
  Globe, 
  Keyboard, 
  Mouse, 
  Bluetooth,
  Sun,
  Moon,
  Laptop,
  Smartphone,
  Headphones,
  Speaker
} from 'lucide-react';

// Hooks de contexto
import { useTheme } from '../../contexts/ThemeContext';
import { useWindowManager } from '../../contexts/WindowManagerContext';

function SettingsWindow({ windowId }) {
  const { theme, toggleTheme, setTheme } = useTheme();
  const { windows } = useWindowManager();
  
  const [activeCategory, setActiveCategory] = useState('appearance');
  const [settings, setSettings] = useState({
    // Apariencia
    wallpaper: 'ubuntu-default',
    iconTheme: 'ubuntu',
    fontSize: 'medium',
    animations: true,
    
    // Audio
    masterVolume: 75,
    notificationSounds: true,
    systemSounds: true,
    
    // Red
    wifi: true,
    bluetooth: true,
    
    // Energía
    batteryMode: 'balanced',
    screenBrightness: 80,
    
    // Privacidad
    locationServices: false,
    analytics: false,
    
    // Teclado y ratón
    keyboardLayout: 'es',
    mouseSpeed: 'medium',
    
    // Idioma
    language: 'es',
    region: 'ES'
  });

  const categories = [
    {
      id: 'appearance',
      name: 'Apariencia',
      icon: Palette,
      description: 'Temas, fondos de pantalla y personalización'
    },
    {
      id: 'display',
      name: 'Pantalla',
      icon: Monitor,
      description: 'Resolución, brillo y configuración de pantalla'
    },
    {
      id: 'audio',
      name: 'Audio',
      icon: Volume2,
      description: 'Volumen, dispositivos de audio y sonidos'
    },
    {
      id: 'network',
      name: 'Red',
      icon: Wifi,
      description: 'Wi-Fi, Bluetooth y conexiones'
    },
    {
      id: 'power',
      name: 'Energía',
      icon: Battery,
      description: 'Batería, suspensión y ahorro de energía'
    },
    {
      id: 'accounts',
      name: 'Cuentas',
      icon: User,
      description: 'Usuarios y cuentas del sistema'
    },
    {
      id: 'privacy',
      name: 'Privacidad',
      icon: Shield,
      description: 'Permisos y configuración de privacidad'
    },
    {
      id: 'input',
      name: 'Entrada',
      icon: Keyboard,
      description: 'Teclado, ratón y dispositivos de entrada'
    },
    {
      id: 'language',
      name: 'Idioma',
      icon: Globe,
      description: 'Idioma del sistema y región'
    }
  ];

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const renderAppearanceSettings = () => (
    <div className="space-y-6">
      {/* Tema */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Tema del sistema
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => setTheme('light')}
            className={`
              p-4 rounded-lg border-2 transition-all duration-200
              ${theme === 'light' 
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900' 
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              }
            `}
          >
            <Sun className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
            <p className="font-medium text-gray-900 dark:text-gray-100">Claro</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Tema claro de Ubuntu</p>
          </button>
          
          <button
            onClick={() => setTheme('dark')}
            className={`
              p-4 rounded-lg border-2 transition-all duration-200
              ${theme === 'dark' 
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900' 
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              }
            `}
          >
            <Moon className="w-8 h-8 mx-auto mb-2 text-blue-400" />
            <p className="font-medium text-gray-900 dark:text-gray-100">Oscuro</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Tema oscuro de Ubuntu</p>
          </button>
        </div>
      </div>

      {/* Fondo de pantalla */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Fondo de pantalla
        </h3>
        <div className="grid grid-cols-3 gap-4">
          {['ubuntu-default', 'ubuntu-purple', 'ubuntu-orange'].map((wallpaper) => (
            <button
              key={wallpaper}
              onClick={() => updateSetting('wallpaper', wallpaper)}
              className={`
                aspect-video rounded-lg border-2 transition-all duration-200
                ${settings.wallpaper === wallpaper 
                  ? 'border-blue-500' 
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }
                ${wallpaper === 'ubuntu-default' ? 'bg-gradient-to-br from-purple-600 to-orange-500' :
                  wallpaper === 'ubuntu-purple' ? 'bg-gradient-to-br from-purple-800 to-purple-400' :
                  'bg-gradient-to-br from-orange-600 to-red-500'
                }
              `}
            />
          ))}
        </div>
      </div>

      {/* Animaciones */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Animaciones
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Habilitar animaciones de ventanas y transiciones
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.animations}
              onChange={(e) => updateSetting('animations', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>
    </div>
  );

  const renderAudioSettings = () => (
    <div className="space-y-6">
      {/* Volumen principal */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Volumen principal
        </h3>
        <div className="flex items-center space-x-4">
          <Volume2 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          <input
            type="range"
            min="0"
            max="100"
            value={settings.masterVolume}
            onChange={(e) => updateSetting('masterVolume', parseInt(e.target.value))}
            className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
          <span className="text-sm font-medium text-gray-900 dark:text-gray-100 w-12">
            {settings.masterVolume}%
          </span>
        </div>
      </div>

      {/* Dispositivos de audio */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Dispositivos de audio
        </h3>
        <div className="space-y-3">
          {[
            { name: 'Altavoces internos', icon: Speaker, active: true },
            { name: 'Auriculares Bluetooth', icon: Headphones, active: false },
            { name: 'Monitor HDMI', icon: Monitor, active: false }
          ].map((device, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
              <div className="flex items-center space-x-3">
                <device.icon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <span className="text-gray-900 dark:text-gray-100">{device.name}</span>
              </div>
              {device.active && (
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                  Activo
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderNetworkSettings = () => (
    <div className="space-y-6">
      {/* Wi-Fi */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Wifi className="w-6 h-6 text-blue-500" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Wi-Fi</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Conectado a "Red-Casa"</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.wifi}
              onChange={(e) => updateSetting('wifi', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>

      {/* Bluetooth */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Bluetooth className="w-6 h-6 text-blue-500" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Bluetooth</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Dispositivos disponibles</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.bluetooth}
              onChange={(e) => updateSetting('bluetooth', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>
    </div>
  );

  const renderPowerSettings = () => (
    <div className="space-y-6">
      {/* Modo de energía */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Modo de energía
        </h3>
        <div className="grid grid-cols-3 gap-4">
          {[
            { id: 'performance', name: 'Rendimiento', icon: Laptop, desc: 'Máximo rendimiento' },
            { id: 'balanced', name: 'Equilibrado', icon: Battery, desc: 'Equilibrio entre rendimiento y batería' },
            { id: 'power-saver', name: 'Ahorro', icon: Battery, desc: 'Máximo ahorro de batería' }
          ].map((mode) => (
            <button
              key={mode.id}
              onClick={() => updateSetting('batteryMode', mode.id)}
              className={`
                p-4 rounded-lg border-2 transition-all duration-200 text-left
                ${settings.batteryMode === mode.id 
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900' 
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }
              `}
            >
              <mode.icon className="w-6 h-6 mb-2 text-gray-600 dark:text-gray-400" />
              <p className="font-medium text-gray-900 dark:text-gray-100">{mode.name}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">{mode.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Brillo de pantalla */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Brillo de pantalla
        </h3>
        <div className="flex items-center space-x-4">
          <Sun className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          <input
            type="range"
            min="10"
            max="100"
            value={settings.screenBrightness}
            onChange={(e) => updateSetting('screenBrightness', parseInt(e.target.value))}
            className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
          <span className="text-sm font-medium text-gray-900 dark:text-gray-100 w-12">
            {settings.screenBrightness}%
          </span>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeCategory) {
      case 'appearance':
        return renderAppearanceSettings();
      case 'audio':
        return renderAudioSettings();
      case 'network':
        return renderNetworkSettings();
      case 'power':
        return renderPowerSettings();
      default:
        return (
          <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
            <div className="text-center">
              <Settings className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium mb-2">Configuración en desarrollo</p>
              <p className="text-sm">Esta sección estará disponible próximamente</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="h-full flex bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
        <div className="p-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Configuración
          </h2>
          <div className="space-y-1">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`
                    w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors duration-150
                    ${activeCategory === category.id 
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <div className="flex-1">
                    <p className="font-medium">{category.name}</p>
                    <p className="text-xs opacity-75">{category.description}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {renderContent()}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default SettingsWindow;
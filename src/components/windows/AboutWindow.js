import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Info, 
  Monitor, 
  Cpu, 
  HardDrive, 
  Wifi, 
  Battery,
  User,
  Code,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Download,
  Heart
} from 'lucide-react';

// Hooks de contexto
import { useTheme } from '../../contexts/ThemeContext';

function AboutWindow({ windowId }) {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('system');
  const [systemInfo, setSystemInfo] = useState({
    uptime: '2:34:12',
    memory: { used: 4.2, total: 16 },
    storage: { used: 256, total: 512 },
    cpu: 'Intel Core i7-12700H',
    gpu: 'NVIDIA GeForce RTX 3060',
    network: 'Conectado via Wi-Fi'
  });

  // Simular actualización del tiempo de actividad
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      setSystemInfo(prev => ({
        ...prev,
        uptime: `${hours}:${minutes}:${seconds}`
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const tabs = [
    { id: 'system', name: 'Sistema', icon: Monitor },
    { id: 'developer', name: 'Desarrollador', icon: User },
    { id: 'portfolio', name: 'Portafolio', icon: Code }
  ];

  const renderSystemInfo = () => (
    <div className="space-y-6">
      {/* Logo y versión de Ubuntu */}
      <div className="text-center py-8">
        <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-2xl">U</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Ubuntu 22.04.3 LTS
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Jammy Jellyfish
        </p>
      </div>

      {/* Información del sistema */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Hardware */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100 flex items-center">
            <Cpu className="w-5 h-5 mr-2 text-blue-500" />
            Hardware
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Procesador:</span>
              <span className="text-gray-900 dark:text-gray-100 font-medium">{systemInfo.cpu}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Gráficos:</span>
              <span className="text-gray-900 dark:text-gray-100 font-medium">{systemInfo.gpu}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Memoria:</span>
              <span className="text-gray-900 dark:text-gray-100 font-medium">
                {systemInfo.memory.used} GB / {systemInfo.memory.total} GB
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(systemInfo.memory.used / systemInfo.memory.total) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Almacenamiento */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100 flex items-center">
            <HardDrive className="w-5 h-5 mr-2 text-green-500" />
            Almacenamiento
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Disco principal:</span>
              <span className="text-gray-900 dark:text-gray-100 font-medium">
                {systemInfo.storage.used} GB / {systemInfo.storage.total} GB
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(systemInfo.storage.used / systemInfo.storage.total) * 100}%` }}
              />
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {systemInfo.storage.total - systemInfo.storage.used} GB disponibles
            </div>
          </div>
        </div>

        {/* Red */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100 flex items-center">
            <Wifi className="w-5 h-5 mr-2 text-purple-500" />
            Red
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Estado:</span>
              <span className="text-green-600 dark:text-green-400 font-medium">
                {systemInfo.network}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">IP Local:</span>
              <span className="text-gray-900 dark:text-gray-100 font-medium">192.168.1.100</span>
            </div>
          </div>
        </div>

        {/* Sistema */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100 flex items-center">
            <Battery className="w-5 h-5 mr-2 text-yellow-500" />
            Sistema
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Tiempo activo:</span>
              <span className="text-gray-900 dark:text-gray-100 font-medium">{systemInfo.uptime}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Kernel:</span>
              <span className="text-gray-900 dark:text-gray-100 font-medium">5.15.0-78-generic</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Arquitectura:</span>
              <span className="text-gray-900 dark:text-gray-100 font-medium">x86_64</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDeveloperInfo = () => (
    <div className="space-y-6">
      {/* Perfil del desarrollador */}
      <div className="text-center py-8">
        <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
          <User className="w-16 h-16 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Martín González
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
          Desarrollador Full Stack
        </p>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Apasionado por crear experiencias digitales excepcionales. Especializado en 
          desarrollo web moderno con React, Node.js y tecnologías emergentes. 
          Siempre buscando nuevos desafíos y oportunidades para crecer profesionalmente.
        </p>
      </div>

      {/* Habilidades técnicas */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Habilidades Técnicas
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'JavaScript', level: 90, color: 'bg-yellow-500' },
            { name: 'React', level: 85, color: 'bg-blue-500' },
            { name: 'Node.js', level: 80, color: 'bg-green-500' },
            { name: 'Python', level: 75, color: 'bg-blue-600' },
            { name: 'TypeScript', level: 70, color: 'bg-blue-700' },
            { name: 'MongoDB', level: 65, color: 'bg-green-600' },
            { name: 'Docker', level: 60, color: 'bg-blue-400' },
            { name: 'AWS', level: 55, color: 'bg-orange-500' }
          ].map((skill) => (
            <div key={skill.name} className="text-center">
              <div className="relative w-16 h-16 mx-auto mb-2">
                <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-gray-200 dark:text-gray-700"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className={skill.color.replace('bg-', 'text-')}
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeDasharray={`${skill.level}, 100`}
                    strokeLinecap="round"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-semibold text-gray-900 dark:text-gray-100">
                    {skill.level}%
                  </span>
                </div>
              </div>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {skill.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Enlaces sociales */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Conecta conmigo
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              name: 'GitHub',
              icon: Github,
              url: 'https://github.com/martin-gonzalez',
              description: 'Proyectos y código abierto',
              color: 'hover:bg-gray-100 dark:hover:bg-gray-700'
            },
            {
              name: 'LinkedIn',
              icon: Linkedin,
              url: 'https://linkedin.com/in/martin-gonzalez',
              description: 'Perfil profesional',
              color: 'hover:bg-blue-50 dark:hover:bg-blue-900'
            },
            {
              name: 'Email',
              icon: Mail,
              url: 'mailto:martin@example.com',
              description: 'Contacto directo',
              color: 'hover:bg-green-50 dark:hover:bg-green-900'
            }
          ].map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`
                flex items-center p-4 rounded-lg border border-gray-200 dark:border-gray-700 
                transition-all duration-200 ${social.color}
              `}
            >
              <social.icon className="w-8 h-8 mr-4 text-gray-600 dark:text-gray-400" />
              <div className="flex-1">
                <p className="font-semibold text-gray-900 dark:text-gray-100">
                  {social.name}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {social.description}
                </p>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-400" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPortfolioInfo = () => (
    <div className="space-y-6">
      {/* Información del proyecto */}
      <div className="text-center py-8">
        <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
          <Code className="w-12 h-12 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Ubuntu Portfolio
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Versión 1.0.0 - Desarrollado con React
        </p>
      </div>

      {/* Tecnologías utilizadas */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Tecnologías Utilizadas
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { name: 'React 18', description: 'Biblioteca de UI' },
            { name: 'Tailwind CSS', description: 'Framework de CSS' },
            { name: 'Framer Motion', description: 'Animaciones' },
            { name: 'Lucide React', description: 'Iconos' },
            { name: 'Context API', description: 'Gestión de estado' },
            { name: 'Vite', description: 'Build tool' }
          ].map((tech) => (
            <div key={tech.name} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <p className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                {tech.name}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {tech.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Características */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Características del Proyecto
        </h3>
        <div className="space-y-3">
          {[
            'Interfaz Ubuntu auténtica con temas claro y oscuro',
            'Sistema de ventanas con arrastrar y redimensionar',
            'Terminal funcional con comandos personalizados',
            'Explorador de archivos con sistema virtual',
            'Gestión de aplicaciones y configuración',
            'Animaciones fluidas y transiciones suaves',
            'Diseño responsive y accesible',
            'Persistencia de datos en localStorage'
          ].map((feature, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
              <p className="text-gray-700 dark:text-gray-300">{feature}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Créditos */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Créditos y Agradecimientos
        </h3>
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Desarrollado con <Heart className="inline w-4 h-4 text-red-500 mx-1" /> por Martín González
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            Inspirado en el diseño de Ubuntu Desktop Environment
          </p>
          <div className="mt-4 flex justify-center space-x-4">
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              <Download className="w-4 h-4" />
              <span>Descargar CV</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <Github className="w-4 h-4" />
              <span>Ver código</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'system':
        return renderSystemInfo();
      case 'developer':
        return renderDeveloperInfo();
      case 'portfolio':
        return renderPortfolioInfo();
      default:
        return renderSystemInfo();
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="flex">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center space-x-2 px-6 py-4 font-medium transition-colors duration-150
                  ${activeTab === tab.id 
                    ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20' 
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }
                `}
              >
                <Icon className="w-5 h-5" />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Contenido */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6">
          <motion.div
            key={activeTab}
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

export default AboutWindow;
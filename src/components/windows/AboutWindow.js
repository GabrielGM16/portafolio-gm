import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  Heart,
  MapPin,
  Calendar,
  Briefcase,
  Award,
  Coffee,
  Terminal,
  Zap,
  Star,
  TrendingUp,
  Target
} from 'lucide-react';

function AboutWindow({ windowId, isModal = false, onClose }) {
  const [activeTab, setActiveTab] = useState('profile');
  const [systemInfo, setSystemInfo] = useState({
    uptime: '2:34:12',
    memory: { used: 4.2, total: 16 },
    storage: { used: 256, total: 512 }
  });

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
    { id: 'profile', name: 'Perfil', icon: User },
    { id: 'experience', name: 'Experiencia', icon: Briefcase },
    { id: 'skills', name: 'Habilidades', icon: Code },
    { id: 'system', name: 'Sistema', icon: Monitor }
  ];

  const skills = [
    { name: 'React.js', level: 95, color: 'from-blue-500 to-cyan-500' },
    { name: 'Node.js', level: 90, color: 'from-green-500 to-emerald-500' },
    { name: 'TypeScript', level: 85, color: 'from-blue-600 to-blue-400' },
    { name: 'Python', level: 80, color: 'from-yellow-500 to-orange-500' },
    { name: 'MongoDB', level: 85, color: 'from-green-600 to-green-400' },
    { name: 'PostgreSQL', level: 80, color: 'from-blue-700 to-blue-500' },
    { name: 'Docker', level: 75, color: 'from-blue-500 to-blue-300' },
    { name: 'AWS', level: 70, color: 'from-orange-500 to-yellow-500' }
  ];

  const experiences = [
    {
      title: 'Senior Full Stack Developer',
      company: 'Tech Solutions Inc.',
      period: '2022 - Presente',
      location: 'Remote',
      description: 'Liderando el desarrollo de aplicaciones web escalables con React y Node.js.',
      achievements: [
        'Desarrollé 3 aplicaciones principales con más de 10k usuarios',
        'Reduje el tiempo de carga en 40% optimizando el rendimiento',
        'Mentoricé a 5 desarrolladores junior'
      ],
      color: 'from-purple-600 to-pink-600'
    },
    {
      title: 'Full Stack Developer',
      company: 'Digital Innovations',
      period: '2020 - 2022',
      location: 'Buenos Aires, AR',
      description: 'Desarrollo de soluciones web con tecnologías modernas.',
      achievements: [
        'Implementé arquitectura microservicios',
        'Creé sistema de autenticación con JWT',
        'Participé en revisiones de código y pair programming'
      ],
      color: 'from-blue-600 to-cyan-600'
    },
    {
      title: 'Junior Developer',
      company: 'StartupXYZ',
      period: '2019 - 2020',
      location: 'Buenos Aires, AR',
      description: 'Desarrollo de features para MVP de startup.',
      achievements: [
        'Construí componentes reutilizables en React',
        'Aprendí metodologías ágiles',
        'Colaboré con equipo multidisciplinario'
      ],
      color: 'from-green-600 to-emerald-600'
    }
  ];

  const stats = [
    { icon: Code, label: 'Proyectos', value: '15+', color: 'text-blue-600' },
    { icon: Coffee, label: 'Cafés', value: '1000+', color: 'text-orange-600' },
    { icon: Award, label: 'Certificados', value: '8', color: 'text-purple-600' },
    { icon: Star, label: 'Reviews 5★', value: '98%', color: 'text-yellow-600' }
  ];

  const socialLinks = [
    {
      icon: Github,
      label: 'GitHub',
      url: 'https://github.com',
      username: '@martin-gonzalez',
      color: 'hover:bg-gray-800',
      followers: '234'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      url: 'https://linkedin.com',
      username: '/in/martin-gonzalez',
      color: 'hover:bg-blue-600',
      followers: '1.2k'
    },
    {
      icon: Mail,
      label: 'Email',
      url: 'mailto:gmoficial16@gmail.com',
      username: 'gmoficial16@gmail.com',
      color: 'hover:bg-red-600',
      followers: ''
    }
  ];

  const renderProfile = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center ring-4 ring-white/30">
                <User className="w-12 h-12" />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-1">Martin Gabriel Godinez</h2>
                <p className="text-white/90 text-lg">Full Stack Developer</p>
                <div className="flex items-center space-x-4 mt-2 text-sm text-white/80">
                  <span className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    Argentina
                  </span>
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    4+ años exp.
                  </span>
                </div>
              </div>
            </div>
            <motion.a
              href="#"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-white text-purple-600 rounded-lg font-semibold flex items-center space-x-2 hover:shadow-xl transition-shadow"
            >
              <Download className="w-4 h-4" />
              <span>Descargar CV</span>
            </motion.a>
          </div>

          <p className="text-white/90 leading-relaxed mb-4">
            Desarrollador Full Stack apasionado por crear soluciones web innovadoras y experiencias 
            de usuario excepcionales. Especializado en React, Node.js y arquitecturas escalables.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center"
              >
                <stat.icon className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-white/80">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <Zap className="w-5 h-5 mr-2 text-purple-600" />
          Conéctate Conmigo
        </h3>
        <div className="space-y-3">
          {socialLinks.map((link, index) => (
            <motion.a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02, x: 4 }}
              className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:shadow-lg transition-all group"
            >
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 bg-gray-900 dark:bg-gray-600 rounded-xl flex items-center justify-center ${link.color} transition-colors`}>
                  <link.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">{link.label}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{link.username}</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {link.followers && (
                  <span className="text-sm text-gray-500 dark:text-gray-400">{link.followers} seguidores</span>
                )}
                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-purple-600 transition-colors" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>

      {/* Quick Facts */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Datos Rápidos</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-3">
            <Target className="w-5 h-5 text-purple-600" />
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Disponibilidad</div>
              <div className="font-semibold text-gray-900 dark:text-white">Disponible</div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Rate</div>
              <div className="font-semibold text-gray-900 dark:text-white">$50-80/hr</div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Terminal className="w-5 h-5 text-blue-600" />
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Setup</div>
              <div className="font-semibold text-gray-900 dark:text-white">Ubuntu 22.04</div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Coffee className="w-5 h-5 text-orange-600" />
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Zona Horaria</div>
              <div className="font-semibold text-gray-900 dark:text-white">GMT-3</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderExperience = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-600 via-blue-600 to-green-600" />
        
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative pl-20"
            >
              {/* Timeline dot */}
              <div className={`absolute left-6 top-6 w-5 h-5 rounded-full bg-gradient-to-r ${exp.color} ring-4 ring-white dark:ring-gray-900`} />
              
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                      {exp.title}
                    </h3>
                    <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                      <Briefcase className="w-4 h-4" />
                      <span className="font-medium">{exp.company}</span>
                      <span>•</span>
                      <MapPin className="w-4 h-4" />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 bg-gradient-to-r ${exp.color} text-white text-sm rounded-full font-medium`}>
                    {exp.period}
                  </span>
                </div>
                
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {exp.description}
                </p>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center">
                    <Award className="w-4 h-4 mr-2 text-purple-600" />
                    Logros Destacados
                  </h4>
                  <ul className="space-y-1">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start space-x-2 text-sm text-gray-700 dark:text-gray-300">
                        <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 flex-shrink-0" />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );

  const renderSkills = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 text-white">
        <h3 className="text-2xl font-bold mb-2">Stack Tecnológico</h3>
        <p className="text-white/90">Mis principales habilidades y nivel de expertise</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="font-semibold text-gray-900 dark:text-white">{skill.name}</span>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">{skill.level}%</span>
            </div>
            
            <div className="relative h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${skill.level}%` }}
                transition={{ duration: 1, delay: index * 0.1 }}
                className={`absolute inset-y-0 left-0 bg-gradient-to-r ${skill.color} rounded-full`}
              />
            </div>
            
            <div className="mt-2 flex items-center space-x-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(skill.level / 20)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300 dark:text-gray-600'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  const renderSystem = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* System Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border-2 border-blue-200 dark:border-blue-800">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
            <Cpu className="w-5 h-5 mr-2 text-blue-600" />
            Hardware
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Procesador:</span>
              <span className="font-medium text-gray-900 dark:text-white">Intel Core i7-12700H</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Memoria:</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {systemInfo.memory.used}GB / {systemInfo.memory.total}GB
              </span>
            </div>
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-300"
                style={{ width: `${(systemInfo.memory.used / systemInfo.memory.total) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border-2 border-green-200 dark:border-green-800">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
            <HardDrive className="w-5 h-5 mr-2 text-green-600" />
            Almacenamiento
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Disco SSD:</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {systemInfo.storage.used}GB / {systemInfo.storage.total}GB
              </span>
            </div>
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-300"
                style={{ width: `${(systemInfo.storage.used / systemInfo.storage.total) * 100}%` }}
              />
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {systemInfo.storage.total - systemInfo.storage.used}GB disponibles
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border-2 border-purple-200 dark:border-purple-800">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
            <Wifi className="w-5 h-5 mr-2 text-purple-600" />
            Red
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Estado:</span>
              <span className="text-green-600 font-medium">Conectado</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">IP Local:</span>
              <span className="font-medium text-gray-900 dark:text-white">192.168.1.100</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border-2 border-orange-200 dark:border-orange-800">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
            <Battery className="w-5 h-5 mr-2 text-orange-600" />
            Sistema
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Uptime:</span>
              <span className="font-medium text-gray-900 dark:text-white">{systemInfo.uptime}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">OS:</span>
              <span className="font-medium text-gray-900 dark:text-white">Ubuntu 22.04 LTS</span>
            </div>
          </div>
        </div>
      </div>

      {/* Ubuntu Logo Section */}
      <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl p-8 text-white text-center">
        <div className="w-20 h-20 mx-auto mb-4 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
          <span className="text-3xl font-bold">U</span>
        </div>
        <h3 className="text-2xl font-bold mb-2">Ubuntu 22.04.3 LTS</h3>
        <p className="text-white/90">Jammy Jellyfish</p>
        <div className="mt-4 text-sm text-white/80">
          Kernel: 5.15.0-78-generic • Architecture: x86_64
        </div>
      </div>
    </motion.div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return renderProfile();
      case 'experience':
        return renderExperience();
      case 'skills':
        return renderSkills();
      case 'system':
        return renderSystem();
      default:
        return renderProfile();
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6">
        <div className="flex space-x-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  relative flex items-center space-x-2 px-4 py-4 font-medium transition-all duration-200
                  ${activeTab === tab.id 
                    ? 'text-purple-600 dark:text-purple-400' 
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  }
                `}
              >
                <Icon className="w-5 h-5" />
                <span>{tab.name}</span>
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <AnimatePresence mode="wait">
          <div key={activeTab}>
            {renderContent()}
          </div>
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>Hecho con pasión por Martin Godinez</span>
          </div>
          <span className="text-gray-500 dark:text-gray-500">
            © 2024 • Versión 1.0.0
          </span>
        </div>
      </div>
    </div>
  );
}

export default AboutWindow;
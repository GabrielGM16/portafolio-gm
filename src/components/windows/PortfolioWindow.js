import React from 'react';
import { User, Code, Briefcase, Mail, Github, Linkedin, ExternalLink } from 'lucide-react';

const PortfolioWindow = () => {
  const projects = [
    {
      id: 1,
      title: "Sistema de Gestión Web",
      description: "Aplicación web completa con React y Node.js",
      technologies: ["React", "Node.js", "MongoDB", "Express"],
      status: "Completado"
    },
    {
      id: 2,
      title: "Aplicación Móvil",
      description: "App móvil desarrollada con React Native",
      technologies: ["React Native", "Firebase", "Redux"],
      status: "En desarrollo"
    },
    {
      id: 3,
      title: "Dashboard Analytics",
      description: "Panel de control con visualización de datos",
      technologies: ["Vue.js", "D3.js", "Python", "FastAPI"],
      status: "Completado"
    }
  ];

  const skills = [
    { category: "Frontend", items: ["React", "Vue.js", "JavaScript", "TypeScript", "HTML/CSS"] },
    { category: "Backend", items: ["Node.js", "Python", "Express", "FastAPI", "MongoDB"] },
    { category: "Herramientas", items: ["Git", "Docker", "AWS", "Linux", "VS Code"] }
  ];

  return (
    <div className="h-full bg-gray-50 dark:bg-gray-900 overflow-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <User size={32} />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Desarrollador Full Stack</h1>
            <p className="text-blue-100">Especialista en tecnologías web modernas</p>
          </div>
        </div>
        <div className="flex space-x-4 mt-4">
          <button className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors">
            <Github size={16} />
            <span>GitHub</span>
          </button>
          <button className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors">
            <Linkedin size={16} />
            <span>LinkedIn</span>
          </button>
          <button className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors">
            <Mail size={16} />
            <span>Contacto</span>
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Sobre mí */}
        <section>
          <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200 flex items-center">
            <User className="mr-2" size={20} />
            Sobre mí
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Desarrollador Full Stack con experiencia en tecnologías web modernas. 
              Apasionado por crear soluciones innovadoras y eficientes que mejoren 
              la experiencia del usuario. Especializado en React, Node.js y arquitecturas 
              escalables.
            </p>
          </div>
        </section>

        {/* Habilidades */}
        <section>
          <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200 flex items-center">
            <Code className="mr-2" size={20} />
            Habilidades Técnicas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {skills.map((skillGroup, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
                <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">
                  {skillGroup.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-md"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Proyectos */}
        <section>
          <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200 flex items-center">
            <Briefcase className="mr-2" size={20} />
            Proyectos Destacados
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project) => (
              <div key={project.id} className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-gray-800 dark:text-gray-200">
                    {project.title}
                  </h3>
                  <ExternalLink size={16} className="text-gray-400 hover:text-gray-600 cursor-pointer" />
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <span className={`text-xs px-2 py-1 rounded ${
                    project.status === 'Completado' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                  }`}>
                    {project.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experiencia */}
        <section>
          <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
            Experiencia
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-medium text-gray-800 dark:text-gray-200">
                  Desarrollador Full Stack Senior
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">2022 - Presente</p>
                <p className="text-gray-600 dark:text-gray-300 mt-1">
                  Desarrollo de aplicaciones web escalables utilizando React, Node.js y tecnologías cloud.
                </p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="font-medium text-gray-800 dark:text-gray-200">
                  Desarrollador Frontend
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">2020 - 2022</p>
                <p className="text-gray-600 dark:text-gray-300 mt-1">
                  Creación de interfaces de usuario modernas y responsivas con React y Vue.js.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PortfolioWindow;
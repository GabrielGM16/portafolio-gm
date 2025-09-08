// Sistema de archivos virtual para simular estructura Linux

class VirtualFileSystem {
  constructor() {
    this.currentPath = '/home/martin';
    this.fileSystem = this.initializeFileSystem();
    this.clipboard = null;
  }

  initializeFileSystem() {
    return {
      '/': {
        type: 'directory',
        name: '/',
        children: {
          'home': {
            type: 'directory',
            name: 'home',
            children: {
              'martin': {
                type: 'directory',
                name: 'martin',
                children: {
                  'Desktop': {
                    type: 'directory',
                    name: 'Desktop',
                    children: {
                      'README.txt': {
                        type: 'file',
                        name: 'README.txt',
                        content: 'Bienvenido al escritorio de Martin Gonzalez\n\nEste es un portafolio interactivo que simula un entorno Ubuntu Linux.\n\nNavega por los archivos y carpetas para conocer más sobre mi trabajo y experiencia.',
                        size: 245,
                        modified: new Date('2024-01-15')
                      }
                    }
                  },
                  'Documents': {
                    type: 'directory',
                    name: 'Documents',
                    children: {
                      'CV': {
                        type: 'directory',
                        name: 'CV',
                        children: {
                          'curriculum_vitae.pdf': {
                            type: 'file',
                            name: 'curriculum_vitae.pdf',
                            content: 'Archivo PDF del Curriculum Vitae',
                            size: 2048,
                            modified: new Date('2024-01-10')
                          },
                          'cover_letter.txt': {
                            type: 'file',
                            name: 'cover_letter.txt',
                            content: 'Estimado/a reclutador/a,\n\nSoy Martin Gonzalez, desarrollador full-stack con experiencia en tecnologías modernas...\n\nAtentamente,\nMartin Gonzalez',
                            size: 512,
                            modified: new Date('2024-01-08')
                          }
                        }
                      },
                      'Projects': {
                        type: 'directory',
                        name: 'Projects',
                        children: {
                          'web_portfolio': {
                            type: 'directory',
                            name: 'web_portfolio',
                            children: {
                              'README.md': {
                                type: 'file',
                                name: 'README.md',
                                content: '# Portafolio Web\n\nPortafolio personal desarrollado con React y diseño Ubuntu.\n\n## Características\n- Interfaz Ubuntu auténtica\n- Sistema de ventanas interactivo\n- Terminal funcional\n- Explorador de archivos\n\n## Tecnologías\n- React\n- Tailwind CSS\n- Framer Motion',
                                size: 384,
                                modified: new Date('2024-01-12')
                              },
                              'package.json': {
                                type: 'file',
                                name: 'package.json',
                                content: '{\n  "name": "ubuntu-portfolio",\n  "version": "1.0.0",\n  "dependencies": {\n    "react": "^18.0.0",\n    "framer-motion": "^10.0.0"\n  }\n}',
                                size: 156,
                                modified: new Date('2024-01-11')
                              }
                            }
                          },
                          'ecommerce_app': {
                            type: 'directory',
                            name: 'ecommerce_app',
                            children: {
                              'description.txt': {
                                type: 'file',
                                name: 'description.txt',
                                content: 'Aplicación de comercio electrónico desarrollada con MERN Stack.\n\nCaracterísticas:\n- Autenticación de usuarios\n- Carrito de compras\n- Procesamiento de pagos\n- Panel de administración\n\nTecnologías: MongoDB, Express, React, Node.js',
                                size: 298,
                                modified: new Date('2024-01-05')
                              }
                            }
                          }
                        }
                      },
                      'Skills': {
                        type: 'directory',
                        name: 'Skills',
                        children: {
                          'frontend.txt': {
                            type: 'file',
                            name: 'frontend.txt',
                            content: 'HABILIDADES FRONTEND\n\n• React.js - Avanzado\n• Vue.js - Intermedio\n• JavaScript ES6+ - Avanzado\n• TypeScript - Intermedio\n• HTML5/CSS3 - Avanzado\n• Tailwind CSS - Avanzado\n• Bootstrap - Intermedio\n• Sass/SCSS - Intermedio',
                            size: 256,
                            modified: new Date('2024-01-07')
                          },
                          'backend.txt': {
                            type: 'file',
                            name: 'backend.txt',
                            content: 'HABILIDADES BACKEND\n\n• Node.js - Avanzado\n• Express.js - Avanzado\n• Python - Intermedio\n• Django - Básico\n• MongoDB - Intermedio\n• PostgreSQL - Intermedio\n• MySQL - Básico\n• REST APIs - Avanzado\n• GraphQL - Básico',
                            size: 234,
                            modified: new Date('2024-01-07')
                          },
                          'tools.txt': {
                            type: 'file',
                            name: 'tools.txt',
                            content: 'HERRAMIENTAS Y TECNOLOGÍAS\n\n• Git/GitHub - Avanzado\n• Docker - Intermedio\n• AWS - Básico\n• Vercel - Intermedio\n• Netlify - Intermedio\n• Figma - Intermedio\n• VS Code - Avanzado\n• Linux/Ubuntu - Intermedio',
                            size: 198,
                            modified: new Date('2024-01-07')
                          }
                        }
                      }
                    }
                  },
                  'Downloads': {
                    type: 'directory',
                    name: 'Downloads',
                    children: {}
                  },
                  'Pictures': {
                    type: 'directory',
                    name: 'Pictures',
                    children: {
                      'profile.jpg': {
                        type: 'file',
                        name: 'profile.jpg',
                        content: 'Imagen de perfil profesional',
                        size: 1024,
                        modified: new Date('2024-01-01')
                      },
                      'projects': {
                        type: 'directory',
                        name: 'projects',
                        children: {
                          'portfolio_screenshot.png': {
                            type: 'file',
                            name: 'portfolio_screenshot.png',
                            content: 'Captura de pantalla del portafolio',
                            size: 2048,
                            modified: new Date('2024-01-12')
                          }
                        }
                      }
                    }
                  },
                  '.bashrc': {
                    type: 'file',
                    name: '.bashrc',
                    content: '# ~/.bashrc: executed by bash(1) for non-login shells\n\n# Alias personalizados\nalias ll="ls -alF"\nalias la="ls -A"\nalias l="ls -CF"\n\n# Prompt personalizado\nPS1="\\u@\\h:\\w\\$ "\n\nexport PATH=$PATH:/usr/local/bin',
                    size: 256,
                    modified: new Date('2024-01-01')
                  }
                }
              }
            }
          },
          'usr': {
            type: 'directory',
            name: 'usr',
            children: {
              'bin': {
                type: 'directory',
                name: 'bin',
                children: {}
              }
            }
          },
          'etc': {
            type: 'directory',
            name: 'etc',
            children: {}
          },
          'var': {
            type: 'directory',
            name: 'var',
            children: {}
          }
        }
      }
    };
  }

  // Navegación
  getCurrentPath() {
    return this.currentPath;
  }

  setCurrentPath(path) {
    if (this.exists(path)) {
      this.currentPath = path;
      return true;
    }
    return false;
  }

  // Utilidades de ruta
  normalizePath(path) {
    if (!path.startsWith('/')) {
      path = this.joinPath(this.currentPath, path);
    }
    
    const parts = path.split('/').filter(part => part !== '');
    const normalized = [];
    
    for (const part of parts) {
      if (part === '..') {
        normalized.pop();
      } else if (part !== '.') {
        normalized.push(part);
      }
    }
    
    return '/' + normalized.join('/');
  }

  joinPath(...paths) {
    return this.normalizePath(paths.join('/'));
  }

  getParentPath(path) {
    const normalized = this.normalizePath(path);
    if (normalized === '/') return '/';
    return normalized.substring(0, normalized.lastIndexOf('/')) || '/';
  }

  getBaseName(path) {
    const normalized = this.normalizePath(path);
    return normalized.substring(normalized.lastIndexOf('/') + 1) || '/';
  }

  // Operaciones de archivos
  exists(path) {
    return this.getNode(path) !== null;
  }

  getNode(path) {
    const normalized = this.normalizePath(path);
    if (normalized === '/') return this.fileSystem['/'];
    
    const parts = normalized.split('/').filter(part => part !== '');
    let current = this.fileSystem['/'];
    
    for (const part of parts) {
      if (!current.children || !current.children[part]) {
        return null;
      }
      current = current.children[part];
    }
    
    return current;
  }

  isDirectory(path) {
    const node = this.getNode(path);
    return node && node.type === 'directory';
  }

  isFile(path) {
    const node = this.getNode(path);
    return node && node.type === 'file';
  }

  // Listar contenido
  listDirectory(path = this.currentPath) {
    const node = this.getNode(path);
    if (!node || node.type !== 'directory') {
      return null;
    }
    
    return Object.values(node.children || {}).map(child => ({
      name: child.name,
      type: child.type,
      size: child.size || 0,
      modified: child.modified || new Date(),
      path: this.joinPath(path, child.name)
    }));
  }

  // Leer archivo
  readFile(path) {
    const node = this.getNode(path);
    if (!node || node.type !== 'file') {
      return null;
    }
    return node.content || '';
  }

  // Crear directorio
  createDirectory(path, name) {
    const parentNode = this.getNode(path);
    if (!parentNode || parentNode.type !== 'directory') {
      return false;
    }
    
    if (parentNode.children[name]) {
      return false; // Ya existe
    }
    
    parentNode.children[name] = {
      type: 'directory',
      name: name,
      children: {},
      modified: new Date()
    };
    
    return true;
  }

  // Crear archivo
  createFile(path, name, content = '') {
    const parentNode = this.getNode(path);
    if (!parentNode || parentNode.type !== 'directory') {
      return false;
    }
    
    if (parentNode.children[name]) {
      return false; // Ya existe
    }
    
    parentNode.children[name] = {
      type: 'file',
      name: name,
      content: content,
      size: content.length,
      modified: new Date()
    };
    
    return true;
  }

  // Eliminar
  delete(path) {
    const parentPath = this.getParentPath(path);
    const name = this.getBaseName(path);
    const parentNode = this.getNode(parentPath);
    
    if (!parentNode || !parentNode.children || !parentNode.children[name]) {
      return false;
    }
    
    delete parentNode.children[name];
    return true;
  }

  // Copiar
  copy(sourcePath, targetPath) {
    const sourceNode = this.getNode(sourcePath);
    if (!sourceNode) return false;
    
    const targetParentPath = this.getParentPath(targetPath);
    const targetName = this.getBaseName(targetPath);
    const targetParentNode = this.getNode(targetParentPath);
    
    if (!targetParentNode || targetParentNode.type !== 'directory') {
      return false;
    }
    
    // Clonar el nodo
    const clonedNode = JSON.parse(JSON.stringify(sourceNode));
    clonedNode.name = targetName;
    clonedNode.modified = new Date();
    
    targetParentNode.children[targetName] = clonedNode;
    return true;
  }

  // Mover
  move(sourcePath, targetPath) {
    if (this.copy(sourcePath, targetPath)) {
      return this.delete(sourcePath);
    }
    return false;
  }

  // Clipboard operations
  copyToClipboard(path) {
    const node = this.getNode(path);
    if (node) {
      this.clipboard = {
        type: 'copy',
        path: path,
        node: JSON.parse(JSON.stringify(node))
      };
      return true;
    }
    return false;
  }

  cutToClipboard(path) {
    const node = this.getNode(path);
    if (node) {
      this.clipboard = {
        type: 'cut',
        path: path,
        node: JSON.parse(JSON.stringify(node))
      };
      return true;
    }
    return false;
  }

  pasteFromClipboard(targetPath) {
    if (!this.clipboard) return false;
    
    const targetNode = this.getNode(targetPath);
    if (!targetNode || targetNode.type !== 'directory') {
      return false;
    }
    
    const newName = this.clipboard.node.name;
    if (targetNode.children[newName]) {
      return false; // Ya existe
    }
    
    const clonedNode = JSON.parse(JSON.stringify(this.clipboard.node));
    clonedNode.modified = new Date();
    targetNode.children[newName] = clonedNode;
    
    if (this.clipboard.type === 'cut') {
      this.delete(this.clipboard.path);
      this.clipboard = null;
    }
    
    return true;
  }

  // Búsqueda
  search(query, searchPath = this.currentPath) {
    const results = [];
    const searchRecursive = (node, currentPath) => {
      if (node.name.toLowerCase().includes(query.toLowerCase())) {
        results.push({
          name: node.name,
          type: node.type,
          path: currentPath,
          size: node.size || 0,
          modified: node.modified || new Date()
        });
      }
      
      if (node.type === 'directory' && node.children) {
        Object.values(node.children).forEach(child => {
          searchRecursive(child, this.joinPath(currentPath, child.name));
        });
      }
    };
    
    const startNode = this.getNode(searchPath);
    if (startNode) {
      searchRecursive(startNode, searchPath);
    }
    
    return results;
  }
}

export default VirtualFileSystem;
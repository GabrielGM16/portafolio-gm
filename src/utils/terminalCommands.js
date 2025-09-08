// Comandos personalizados del terminal para el portafolio

class TerminalCommands {
  constructor(fileSystem) {
    this.fs = fileSystem;
    this.history = [];
    this.aliases = {
      'll': 'ls -la',
      'la': 'ls -a',
      'l': 'ls',
      'cls': 'clear',
      'dir': 'ls'
    };
  }

  // Ejecutar comando
  execute(input, currentPath) {
    const trimmed = input.trim();
    if (!trimmed) return { output: '', error: false };

    // Agregar al historial
    this.history.push(trimmed);

    // Procesar aliases
    let command = trimmed;
    for (const [alias, replacement] of Object.entries(this.aliases)) {
      if (command.startsWith(alias + ' ') || command === alias) {
        command = command.replace(new RegExp(`^${alias}`), replacement);
        break;
      }
    }

    // Parsear comando y argumentos
    const parts = command.split(' ').filter(part => part.length > 0);
    const cmd = parts[0];
    const args = parts.slice(1);

    // Ejecutar comando
    try {
      switch (cmd) {
        case 'help':
          return this.help();
        case 'about':
          return this.about();
        case 'skills':
          return this.skills();
        case 'projects':
          return this.projects();
        case 'contact':
          return this.contact();
        case 'experience':
          return this.experience();
        case 'education':
          return this.education();
        case 'ls':
          return this.ls(args, currentPath);
        case 'cd':
          return this.cd(args, currentPath);
        case 'pwd':
          return this.pwd(currentPath);
        case 'cat':
          return this.cat(args, currentPath);
        case 'mkdir':
          return this.mkdir(args, currentPath);
        case 'touch':
          return this.touch(args, currentPath);
        case 'rm':
          return this.rm(args, currentPath);
        case 'cp':
          return this.cp(args, currentPath);
        case 'mv':
          return this.mv(args, currentPath);
        case 'find':
          return this.find(args, currentPath);
        case 'grep':
          return this.grep(args, currentPath);
        case 'whoami':
          return this.whoami();
        case 'date':
          return this.date();
        case 'uptime':
          return this.uptime();
        case 'uname':
          return this.uname();
        case 'clear':
          return { output: 'CLEAR', error: false };
        case 'history':
          return this.historyCmd();
        case 'echo':
          return this.echo(args);
        case 'tree':
          return this.tree(args, currentPath);
        default:
          return {
            output: `bash: ${cmd}: command not found\nType 'help' for available commands.`,
            error: true
          };
      }
    } catch (error) {
      return {
        output: `Error executing command: ${error.message}`,
        error: true
      };
    }
  }

  // Comandos del portafolio
  help() {
    return {
      output: `Ubuntu Portfolio Terminal - Available Commands:\n\n` +
        `Portfolio Commands:\n` +
        `  about      - Show information about Martin Gonzalez\n` +
        `  skills     - Display technical skills and expertise\n` +
        `  projects   - List portfolio projects\n` +
        `  contact    - Show contact information\n` +
        `  experience - Display work experience\n` +
        `  education  - Show educational background\n\n` +
        `File System Commands:\n` +
        `  ls [path]  - List directory contents\n` +
        `  cd [path]  - Change directory\n` +
        `  pwd        - Print working directory\n` +
        `  cat [file] - Display file contents\n` +
        `  mkdir [dir]- Create directory\n` +
        `  touch [file] - Create empty file\n` +
        `  rm [path]  - Remove file or directory\n` +
        `  cp [src] [dest] - Copy file or directory\n` +
        `  mv [src] [dest] - Move file or directory\n` +
        `  find [name] - Search for files\n` +
        `  tree [path] - Display directory tree\n\n` +
        `System Commands:\n` +
        `  whoami     - Display current user\n` +
        `  date       - Show current date and time\n` +
        `  uptime     - Show system uptime\n` +
        `  uname      - Show system information\n` +
        `  history    - Show command history\n` +
        `  clear      - Clear terminal screen\n` +
        `  echo [text] - Display text\n\n` +
        `Use 'command --help' for more information about specific commands.`,
      error: false
    };
  }

  about() {
    return {
      output: `╭─────────────────────────────────────────────────────────╮\n` +
        `│                    MARTIN GONZALEZ                     │\n` +
        `│                 Full-Stack Developer                   │\n` +
        `╰─────────────────────────────────────────────────────────╯\n\n` +
        `👨‍💻 Desarrollador Full-Stack apasionado por crear soluciones\n` +
        `   web innovadoras y experiencias de usuario excepcionales.\n\n` +
        `🎯 Especializado en tecnologías modernas como React, Node.js,\n` +
        `   y bases de datos tanto SQL como NoSQL.\n\n` +
        `🚀 Siempre en busca de nuevos desafíos y oportunidades para\n` +
        `   aprender y crecer profesionalmente.\n\n` +
        `📍 Ubicación: Argentina\n` +
        `💼 Estado: Disponible para nuevas oportunidades\n` +
        `🎓 Formación: Ingeniería en Sistemas\n\n` +
        `Type 'contact' for contact information.`,
      error: false
    };
  }

  skills() {
    return {
      output: `╭─────────────────────────────────────────────────────────╮\n` +
        `│                   TECHNICAL SKILLS                     │\n` +
        `╰─────────────────────────────────────────────────────────╯\n\n` +
        `🎨 FRONTEND DEVELOPMENT:\n` +
        `   ▓▓▓▓▓▓▓▓▓░ React.js (Advanced)\n` +
        `   ▓▓▓▓▓▓▓░░░ Vue.js (Intermediate)\n` +
        `   ▓▓▓▓▓▓▓▓▓░ JavaScript ES6+ (Advanced)\n` +
        `   ▓▓▓▓▓▓▓░░░ TypeScript (Intermediate)\n` +
        `   ▓▓▓▓▓▓▓▓▓░ HTML5/CSS3 (Advanced)\n` +
        `   ▓▓▓▓▓▓▓▓░░ Tailwind CSS (Advanced)\n\n` +
        `⚙️  BACKEND DEVELOPMENT:\n` +
        `   ▓▓▓▓▓▓▓▓░░ Node.js (Advanced)\n` +
        `   ▓▓▓▓▓▓▓▓░░ Express.js (Advanced)\n` +
        `   ▓▓▓▓▓▓░░░░ Python (Intermediate)\n` +
        `   ▓▓▓▓░░░░░░ Django (Basic)\n\n` +
        `🗄️  DATABASES:\n` +
        `   ▓▓▓▓▓▓▓░░░ MongoDB (Intermediate)\n` +
        `   ▓▓▓▓▓▓▓░░░ PostgreSQL (Intermediate)\n` +
        `   ▓▓▓▓▓░░░░░ MySQL (Basic)\n\n` +
        `🛠️  TOOLS & TECHNOLOGIES:\n` +
        `   ▓▓▓▓▓▓▓▓▓░ Git/GitHub (Advanced)\n` +
        `   ▓▓▓▓▓▓░░░░ Docker (Intermediate)\n` +
        `   ▓▓▓▓░░░░░░ AWS (Basic)\n` +
        `   ▓▓▓▓▓▓▓░░░ Vercel/Netlify (Intermediate)`,
      error: false
    };
  }

  projects() {
    return {
      output: `╭─────────────────────────────────────────────────────────╮\n` +
        `│                  PORTFOLIO PROJECTS                    │\n` +
        `╰─────────────────────────────────────────────────────────╯\n\n` +
        `🖥️  UBUNTU PORTFOLIO (Current Project)\n` +
        `    Interactive portfolio simulating Ubuntu Linux environment\n` +
        `    Tech: React, Tailwind CSS, Framer Motion\n` +
        `    Features: Window management, virtual file system, terminal\n\n` +
        `🛒 E-COMMERCE APPLICATION\n` +
        `    Full-stack online store with modern features\n` +
        `    Tech: MERN Stack (MongoDB, Express, React, Node.js)\n` +
        `    Features: User auth, shopping cart, payment processing\n\n` +
        `📱 TASK MANAGEMENT APP\n` +
        `    Collaborative project management tool\n` +
        `    Tech: Vue.js, Firebase, Vuetify\n` +
        `    Features: Real-time updates, team collaboration\n\n` +
        `🎮 GAME COLLECTION TRACKER\n` +
        `    Personal game library management system\n` +
        `    Tech: React, Node.js, PostgreSQL\n` +
        `    Features: Game database, reviews, wishlist\n\n` +
        `📊 DATA VISUALIZATION DASHBOARD\n` +
        `    Interactive charts and analytics platform\n` +
        `    Tech: D3.js, React, Express, MongoDB\n` +
        `    Features: Real-time data, custom charts\n\n` +
        `Use 'cd ~/Documents/Projects' to explore project files.`,
      error: false
    };
  }

  contact() {
    return {
      output: `╭─────────────────────────────────────────────────────────╮\n` +
        `│                 CONTACT INFORMATION                    │\n` +
        `╰─────────────────────────────────────────────────────────╯\n\n` +
        `📧 Email: martin.gonzalez.dev@gmail.com\n` +
        `🔗 LinkedIn: linkedin.com/in/martin-gonzalez-dev\n` +
        `🐙 GitHub: github.com/martin-gonzalez\n` +
        `🌐 Portfolio: martin-gonzalez.dev\n` +
        `📱 Phone: +54 11 1234-5678\n` +
        `📍 Location: Buenos Aires, Argentina\n\n` +
        `💬 Available for:\n` +
        `   • Full-time positions\n` +
        `   • Freelance projects\n` +
        `   • Consulting opportunities\n` +
        `   • Technical collaborations\n\n` +
        `🕒 Response time: Usually within 24 hours\n` +
        `🌍 Time zone: GMT-3 (Argentina)`,
      error: false
    };
  }

  experience() {
    return {
      output: `╭─────────────────────────────────────────────────────────╮\n` +
        `│                  WORK EXPERIENCE                       │\n` +
        `╰─────────────────────────────────────────────────────────╯\n\n` +
        `💼 SENIOR FULL-STACK DEVELOPER\n` +
        `   TechCorp Solutions | 2022 - Present\n` +
        `   • Led development of 3 major web applications\n` +
        `   • Mentored junior developers and code reviews\n` +
        `   • Implemented CI/CD pipelines and testing strategies\n` +
        `   • Technologies: React, Node.js, PostgreSQL, AWS\n\n` +
        `💻 FRONTEND DEVELOPER\n` +
        `   Digital Innovations | 2020 - 2022\n` +
        `   • Developed responsive web applications\n` +
        `   • Collaborated with UX/UI designers\n` +
        `   • Optimized application performance\n` +
        `   • Technologies: Vue.js, JavaScript, Sass, Firebase\n\n` +
        `🚀 JUNIOR DEVELOPER\n` +
        `   StartupXYZ | 2019 - 2020\n` +
        `   • Built features for MVP products\n` +
        `   • Participated in agile development processes\n` +
        `   • Learned modern development practices\n` +
        `   • Technologies: React, Express, MongoDB\n\n` +
        `📚 FREELANCE DEVELOPER\n` +
        `   Various Clients | 2018 - 2019\n` +
        `   • Developed custom websites and applications\n` +
        `   • Managed client relationships and project timelines\n` +
        `   • Gained experience in diverse technologies`,
      error: false
    };
  }

  education() {
    return {
      output: `╭─────────────────────────────────────────────────────────╮\n` +
        `│                     EDUCATION                          │\n` +
        `╰─────────────────────────────────────────────────────────╯\n\n` +
        `🎓 INGENIERÍA EN SISTEMAS\n` +
        `   Universidad Tecnológica Nacional | 2015 - 2019\n` +
        `   • Graduated with honors (GPA: 8.5/10)\n` +
        `   • Specialized in software development\n` +
        `   • Thesis: "Modern Web Application Architecture"\n\n` +
        `📜 CERTIFICATIONS:\n` +
        `   ✓ AWS Certified Developer Associate (2023)\n` +
        `   ✓ React Developer Certification - Meta (2022)\n` +
        `   ✓ Node.js Application Development - IBM (2021)\n` +
        `   ✓ MongoDB Certified Developer (2021)\n\n` +
        `📚 CONTINUOUS LEARNING:\n` +
        `   • Advanced React Patterns (2024)\n` +
        `   • Microservices Architecture (2023)\n` +
        `   • DevOps Fundamentals (2023)\n` +
        `   • GraphQL & Apollo (2022)\n\n` +
        `🏆 ACHIEVEMENTS:\n` +
        `   • Dean's List (4 semesters)\n` +
        `   • Programming Contest Winner (2018)\n` +
        `   • Best Final Project Award (2019)`,
      error: false
    };
  }

  // Comandos del sistema de archivos
  ls(args, currentPath) {
    const flags = args.filter(arg => arg.startsWith('-'));
    const paths = args.filter(arg => !arg.startsWith('-'));
    const targetPath = paths.length > 0 ? paths[0] : currentPath;
    
    const resolvedPath = this.fs.normalizePath(this.fs.joinPath(currentPath, targetPath));
    
    if (!this.fs.exists(resolvedPath)) {
      return { output: `ls: cannot access '${targetPath}': No such file or directory`, error: true };
    }
    
    if (!this.fs.isDirectory(resolvedPath)) {
      return { output: this.fs.getBaseName(resolvedPath), error: false };
    }
    
    const items = this.fs.listDirectory(resolvedPath);
    if (!items) {
      return { output: `ls: cannot access '${targetPath}': Permission denied`, error: true };
    }
    
    const showAll = flags.includes('-a') || flags.includes('-la') || flags.includes('-al');
    const showLong = flags.includes('-l') || flags.includes('-la') || flags.includes('-al');
    
    let filteredItems = showAll ? items : items.filter(item => !item.name.startsWith('.'));
    
    if (showLong) {
      const formatSize = (size) => {
        if (size < 1024) return `${size}B`;
        if (size < 1024 * 1024) return `${Math.round(size / 1024)}K`;
        return `${Math.round(size / (1024 * 1024))}M`;
      };
      
      const formatDate = (date) => {
        return date.toLocaleDateString('en-US', {
          month: 'short',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        });
      };
      
      const output = filteredItems.map(item => {
        const permissions = item.type === 'directory' ? 'drwxr-xr-x' : '-rw-r--r--';
        const size = formatSize(item.size);
        const date = formatDate(item.modified);
        return `${permissions} 1 martin martin ${size.padStart(6)} ${date} ${item.name}`;
      }).join('\n');
      
      return { output, error: false };
    } else {
      const output = filteredItems.map(item => {
        return item.type === 'directory' ? `\x1b[34m${item.name}/\x1b[0m` : item.name;
      }).join('  ');
      
      return { output, error: false };
    }
  }

  cd(args, currentPath) {
    if (args.length === 0) {
      return { output: '', error: false, newPath: '/home/martin' };
    }
    
    const targetPath = this.fs.normalizePath(this.fs.joinPath(currentPath, args[0]));
    
    if (!this.fs.exists(targetPath)) {
      return { output: `cd: ${args[0]}: No such file or directory`, error: true };
    }
    
    if (!this.fs.isDirectory(targetPath)) {
      return { output: `cd: ${args[0]}: Not a directory`, error: true };
    }
    
    return { output: '', error: false, newPath: targetPath };
  }

  pwd(currentPath) {
    return { output: currentPath, error: false };
  }

  cat(args, currentPath) {
    if (args.length === 0) {
      return { output: 'cat: missing file operand', error: true };
    }
    
    const filePath = this.fs.normalizePath(this.fs.joinPath(currentPath, args[0]));
    
    if (!this.fs.exists(filePath)) {
      return { output: `cat: ${args[0]}: No such file or directory`, error: true };
    }
    
    if (!this.fs.isFile(filePath)) {
      return { output: `cat: ${args[0]}: Is a directory`, error: true };
    }
    
    const content = this.fs.readFile(filePath);
    return { output: content, error: false };
  }

  mkdir(args, currentPath) {
    if (args.length === 0) {
      return { output: 'mkdir: missing operand', error: true };
    }
    
    const dirName = args[0];
    const success = this.fs.createDirectory(currentPath, dirName);
    
    if (!success) {
      return { output: `mkdir: cannot create directory '${dirName}': File exists`, error: true };
    }
    
    return { output: '', error: false };
  }

  touch(args, currentPath) {
    if (args.length === 0) {
      return { output: 'touch: missing file operand', error: true };
    }
    
    const fileName = args[0];
    const success = this.fs.createFile(currentPath, fileName, '');
    
    if (!success) {
      return { output: `touch: cannot create file '${fileName}': File exists`, error: true };
    }
    
    return { output: '', error: false };
  }

  rm(args, currentPath) {
    if (args.length === 0) {
      return { output: 'rm: missing operand', error: true };
    }
    
    const targetPath = this.fs.normalizePath(this.fs.joinPath(currentPath, args[0]));
    
    if (!this.fs.exists(targetPath)) {
      return { output: `rm: cannot remove '${args[0]}': No such file or directory`, error: true };
    }
    
    const success = this.fs.delete(targetPath);
    
    if (!success) {
      return { output: `rm: cannot remove '${args[0]}': Permission denied`, error: true };
    }
    
    return { output: '', error: false };
  }

  cp(args, currentPath) {
    if (args.length < 2) {
      return { output: 'cp: missing destination file operand', error: true };
    }
    
    const sourcePath = this.fs.normalizePath(this.fs.joinPath(currentPath, args[0]));
    const targetPath = this.fs.normalizePath(this.fs.joinPath(currentPath, args[1]));
    
    if (!this.fs.exists(sourcePath)) {
      return { output: `cp: cannot stat '${args[0]}': No such file or directory`, error: true };
    }
    
    const success = this.fs.copy(sourcePath, targetPath);
    
    if (!success) {
      return { output: `cp: cannot create '${args[1]}': File exists or permission denied`, error: true };
    }
    
    return { output: '', error: false };
  }

  mv(args, currentPath) {
    if (args.length < 2) {
      return { output: 'mv: missing destination file operand', error: true };
    }
    
    const sourcePath = this.fs.normalizePath(this.fs.joinPath(currentPath, args[0]));
    const targetPath = this.fs.normalizePath(this.fs.joinPath(currentPath, args[1]));
    
    if (!this.fs.exists(sourcePath)) {
      return { output: `mv: cannot stat '${args[0]}': No such file or directory`, error: true };
    }
    
    const success = this.fs.move(sourcePath, targetPath);
    
    if (!success) {
      return { output: `mv: cannot move '${args[0]}' to '${args[1]}': Permission denied`, error: true };
    }
    
    return { output: '', error: false };
  }

  find(args, currentPath) {
    if (args.length === 0) {
      return { output: 'find: missing search term', error: true };
    }
    
    const searchTerm = args[0];
    const results = this.fs.search(searchTerm, currentPath);
    
    if (results.length === 0) {
      return { output: `find: no files found matching '${searchTerm}'`, error: false };
    }
    
    const output = results.map(result => result.path).join('\n');
    return { output, error: false };
  }

  grep(args, currentPath) {
    return { output: 'grep: command not fully implemented yet', error: true };
  }

  tree(args, currentPath) {
    const targetPath = args.length > 0 ? 
      this.fs.normalizePath(this.fs.joinPath(currentPath, args[0])) : 
      currentPath;
    
    if (!this.fs.exists(targetPath)) {
      return { output: `tree: ${args[0]}: No such file or directory`, error: true };
    }
    
    if (!this.fs.isDirectory(targetPath)) {
      return { output: this.fs.getBaseName(targetPath), error: false };
    }
    
    const buildTree = (path, prefix = '', isLast = true) => {
      const items = this.fs.listDirectory(path) || [];
      const name = this.fs.getBaseName(path);
      let result = prefix + (isLast ? '└── ' : '├── ') + name + '\n';
      
      items.forEach((item, index) => {
        const isLastItem = index === items.length - 1;
        const newPrefix = prefix + (isLast ? '    ' : '│   ');
        
        if (item.type === 'directory') {
          result += buildTree(item.path, newPrefix, isLastItem);
        } else {
          result += newPrefix + (isLastItem ? '└── ' : '├── ') + item.name + '\n';
        }
      });
      
      return result;
    };
    
    const output = this.fs.getBaseName(targetPath) + '\n' + 
      buildTree(targetPath, '', true).split('\n').slice(1, -1).join('\n');
    
    return { output, error: false };
  }

  // Comandos del sistema
  whoami() {
    return { output: 'martin', error: false };
  }

  date() {
    const now = new Date();
    return { output: now.toString(), error: false };
  }

  uptime() {
    const uptime = Math.floor(Math.random() * 86400); // Simular uptime
    const hours = Math.floor(uptime / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    return { output: `up ${hours}:${minutes.toString().padStart(2, '0')}`, error: false };
  }

  uname() {
    return { output: 'Linux ubuntu-portfolio 5.15.0-generic #72-Ubuntu SMP x86_64 GNU/Linux', error: false };
  }

  historyCmd() {
    const output = this.history.map((cmd, index) => `${(index + 1).toString().padStart(4)} ${cmd}`).join('\n');
    return { output, error: false };
  }

  echo(args) {
    return { output: args.join(' '), error: false };
  }

  // Obtener historial
  getHistory() {
    return this.history;
  }

  // Limpiar historial
  clearHistory() {
    this.history = [];
  }

  // Obtener lista de comandos disponibles
  getAvailableCommands() {
    return [
      'help', 'clear', 'about', 'skills', 'projects', 'contact', 'experience', 'education',
      'ls', 'cd', 'pwd', 'cat', 'mkdir', 'touch', 'rm', 'cp', 'mv', 'find', 'tree',
      'whoami', 'date', 'uptime', 'uname', 'history', 'echo'
    ];
  }
}

export default TerminalCommands;
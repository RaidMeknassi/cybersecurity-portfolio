(function () {
  'use strict';

  /* ---------- Content ---------- */
  var PS1 = 'guest@raid-meknassi:~$';

  var DATA = {
    about: [
      'Senior Security Analyst at IBM in Budapest with 4+ years of experience in IT',
      'infrastructure and cybersecurity operations, specializing in Microsoft Azure',
      'security environments.',
      '',
      'I handle both cloud and on-premises incident response using Microsoft Sentinel',
      'and Microsoft Defender for Endpoint, Cloud, and Apps.',
      '',
      'Strengths: structured problem solving, monitoring, secure infrastructure',
      'operations. Passionate about digital defense, continuous learning and',
      'knowledge sharing.'
    ],
    experience: [
      {
        title: 'Senior Security Analyst', org: 'IBM, Budapest', when: 'Mar 2026 - Present',
        points: [
          'Cloud and on-premises security incident response with Microsoft Sentinel and Defender for Endpoint, Cloud, and Apps.',
          'Work with IBM QRadar and write KQL queries to investigate and triage security alerts.',
          'On-site role in the Budapest metropolitan area.'
        ]
      },
      {
        title: 'Senior IT Infrastructure and Cybersecurity Operation Analyst', org: 'DEKRA, Budapest', when: 'Jan 2023 - Mar 2026',
        points: [
          'Support for infrastructure: servers, storage, network, and cybersecurity tools.',
          'Monitored systems using ITSM tools; responded to alerts and performed escalation.',
          'Supported major incident communication and documentation updates.',
          'Handled global cybersecurity alerts and incident triage.'
        ]
      },
      { title: 'Global IT (Intern)', org: 'DEKRA, Budapest', when: 'Mar 2022 - Mar 2023', points: [] },
      {
        title: 'PhD Researcher', org: 'University of Miskolc, Hungary', when: '2019 - 2023',
        points: ['Research on advanced automotive security and cyber-physical systems.']
      },
      {
        title: 'Security Engineer (Intern)', org: "Fertial SPA, Societe des Fertilisants d'Algerie", when: 'Mar 2017 - Mar 2018',
        points: []
      }
    ],
    certs: [
      'SC-200  Microsoft Security Operations Analyst',
      'SC-900  Microsoft Security, Compliance, and Identity Fundamentals',
      'AZ-900  Microsoft Azure Fundamentals',
      'CompTIA Security+',
      'ITIL v4  IT Service Management',
      'Microsoft OpenHack',
      'Google IT Support Certificate'
    ],
    education: [
      ['PhD (Doctor of Philosophy), Engineering', 'University of Miskolc, Hungary', '2019 - 2023'],
      ['Master’s Degree in Science & Technology', 'Guelma University, Algeria', '2017 - 2019']
    ],
    skills: [
      ['cloud-sec', 'Azure Cloud Security (Microsoft Sentinel, Defender)'],
      ['siem', 'IBM QRadar (SIEM)'],
      ['query', 'KQL (Kusto Query Language) for Sentinel and Defender queries'],
      ['incident', 'Incident Management (Cloud & On-Premises)'],
      ['monitoring', 'Security Monitoring & Threat Detection'],
      ['docs', 'Documentation & Knowledge Base Development'],
      ['web', 'HTML & CSS (web fundamentals)']
    ],
    languages: [['English', 'C1'], ['French', 'B1'], ['German', 'A2']],
    contact: [
      ['email', 'raidrawda@gmail.com', 'mailto:raidrawda@gmail.com'],
      ['linkedin', 'linkedin.com/in/raid-meknassi-70898b204', 'https://www.linkedin.com/in/raid-meknassi-70898b204/'],
      ['github', 'github.com/RaidMeknassi', 'https://github.com/RaidMeknassi']
    ]
  };

  var THEMES = ['matrix', 'amber', 'cyberpunk', 'ice'];
  var FILES = {
    'about.txt': 'about',
    'experience.log': 'experience',
    'certs.txt': 'certs',
    'education.txt': 'education',
    'skills.conf': 'skills',
    'languages.txt': 'languages',
    'contact.txt': 'contact'
  };

  /* ---------- DOM helpers ---------- */
  var out = document.getElementById('output');
  var input = document.getElementById('cmd');
  var form = document.getElementById('prompt');
  var boot = document.getElementById('boot');
  var hero = document.getElementById('hero');
  var chips = document.getElementById('chips');
  var screen = document.getElementById('screen');

  function line(text, cls) {
    var d = document.createElement('div');
    d.className = 'line' + (cls ? ' ' + cls : '');
    d.textContent = text === undefined ? '' : text;
    out.appendChild(d);
    return d;
  }
  function head(text) {
    line('', '');
    line(text.toUpperCase(), 'h');
    line(new Array(Math.min(text.length, 40) + 1).join('='), 'rule');
  }
  function kv(key, value, href) {
    var d = document.createElement('div');
    d.className = 'line';
    var k = document.createElement('span');
    k.className = 'key';
    k.textContent = key;
    d.appendChild(k);
    if (href) {
      var a = document.createElement('a');
      a.href = href;
      a.textContent = value;
      if (href.indexOf('http') === 0) { a.target = '_blank'; a.rel = 'noopener noreferrer'; }
      d.appendChild(a);
    } else {
      d.appendChild(document.createTextNode(value));
    }
    out.appendChild(d);
  }
  function scrollDown() {
    window.scrollTo(0, document.body.scrollHeight);
  }

  /* ---------- Commands ---------- */
  var history = [];
  var histIdx = 0;

  var COMMANDS = {
    help: function () {
      head('Available commands');
      [
        ['help', 'show this menu'],
        ['about', 'who I am'],
        ['experience', 'work history'],
        ['education', 'degrees'],
        ['certs', 'certifications'],
        ['skills', 'technical skills'],
        ['languages', 'spoken languages'],
        ['contact', 'email, LinkedIn, GitHub'],
        ['whoami', 'short summary'],
        ['neofetch', 'system-style profile card'],
        ['ls', 'list files'],
        ['cat <file>', 'print a file, e.g. cat about.txt'],
        ['themes', 'list color themes'],
        ['theme <name>', 'switch theme: ' + THEMES.join(', ')],
        ['history', 'show command history'],
        ['clear', 'clear the screen']
      ].forEach(function (r) { kv(r[0], r[1]); });
      line('');
      line('Tip: Tab completes, Up/Down browses history.', 'dim');
    },
    about: function () {
      head('About');
      DATA.about.forEach(function (t) { line(t); });
    },
    whoami: function () {
      line('Raid Meknassi - Senior Security Analyst @ IBM - Budapest, Hungary');
    },
    experience: function () {
      head('Work experience');
      DATA.experience.forEach(function (e) {
        line('');
        line(e.title, 'h');
        line(e.org + '  |  ' + e.when, 'dim');
        e.points.forEach(function (p) { line('  - ' + p); });
      });
    },
    education: function () {
      head('Education');
      DATA.education.forEach(function (e) {
        line('');
        line(e[0], 'h');
        line(e[1] + '  |  ' + e[2], 'dim');
      });
    },
    certs: function () {
      head('Certifications');
      DATA.certs.forEach(function (c) { line('  [x] ' + c); });
    },
    skills: function () {
      head('Technical skills');
      DATA.skills.forEach(function (s) { kv(s[0], s[1]); });
    },
    languages: function () {
      head('Languages');
      DATA.languages.forEach(function (l) { kv(l[0], l[1]); });
    },
    contact: function () {
      head('Contact');
      DATA.contact.forEach(function (c) { kv(c[0], c[1], c[2]); });
    },
    neofetch: function () {
      line('');
      kv('user', 'raid@meknassi');
      line('-----------------', 'rule');
      kv('role', 'Senior Security Analyst');
      kv('employer', 'IBM');
      kv('location', 'Budapest, Hungary');
      kv('siem', 'Microsoft Sentinel, IBM QRadar');
      kv('query', 'KQL');
      kv('edr', 'Microsoft Defender');
      kv('certs', 'SC-200, SC-900, AZ-900, Security+');
      kv('shell', 'portfolio.sh');
      kv('theme', document.documentElement.getAttribute('data-theme'));
    },
    ls: function () {
      line(Object.keys(FILES).join('   '));
    },
    cat: function (args) {
      if (!args[0]) { line('usage: cat <file>', 'warn'); return; }
      var name = FILES[args[0]];
      if (!name) { line('cat: ' + args[0] + ': No such file or directory', 'warn'); return; }
      COMMANDS[name]();
    },
    themes: function () {
      head('Themes');
      var cur = document.documentElement.getAttribute('data-theme');
      THEMES.forEach(function (t) { line((t === cur ? '* ' : '  ') + t); });
      line('');
      line('Use: theme <name>', 'dim');
    },
    theme: function (args) {
      var t = (args[0] || '').toLowerCase();
      if (THEMES.indexOf(t) === -1) {
        line('Unknown theme. Available: ' + THEMES.join(', '), 'warn');
        return;
      }
      document.documentElement.setAttribute('data-theme', t);
      try { localStorage.setItem('portfolio-theme', t); } catch (e) {}
      line('Theme set to ' + t + '.');
    },
    history: function () {
      if (!history.length) { line('(empty)', 'dim'); return; }
      history.forEach(function (h, i) { line(String(i + 1).padStart(3, ' ') + '  ' + h); });
    },
    clear: function () { out.textContent = ''; },
    sudo: function () { line('guest is not in the sudoers file. This incident will be reported.', 'warn'); },
    exit: function () { line('There is no escape. Try "help".', 'dim'); },
    pwd: function () { line('/home/guest'); },
    date: function () { line(new Date().toString()); }
  };

  function run(raw) {
    var text = raw.trim();
    var c = document.createElement('div');
    c.className = 'line cmdline';
    var p = document.createElement('span');
    p.className = 'ps1';
    p.textContent = PS1 + ' ';
    c.appendChild(p);
    c.appendChild(document.createTextNode(raw));
    out.appendChild(c);

    if (!text) { return; }
    history.push(text);
    histIdx = history.length;

    var parts = text.split(/\s+/);
    var name = parts[0].toLowerCase();
    if (name === 'clear') { COMMANDS.clear(); return; }
    if (Object.prototype.hasOwnProperty.call(COMMANDS, name)) {
      COMMANDS[name](parts.slice(1));
    } else {
      line(name + ': command not found. Type "help".', 'warn');
    }
  }

  /* ---------- Input handling ---------- */
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var v = input.value;
    input.value = '';
    run(v);
    scrollDown();
  });

  input.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (histIdx > 0) { histIdx--; input.value = history[histIdx]; }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (histIdx < history.length - 1) { histIdx++; input.value = history[histIdx]; }
      else { histIdx = history.length; input.value = ''; }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      var parts = input.value.split(/\s+/);
      var last = parts[parts.length - 1].toLowerCase();
      if (!last) { return; }
      var pool = parts.length === 1
        ? Object.keys(COMMANDS)
        : (parts[0] === 'cat' ? Object.keys(FILES) : (parts[0] === 'theme' ? THEMES : []));
      var m = pool.filter(function (x) { return x.indexOf(last) === 0; });
      if (m.length === 1) {
        parts[parts.length - 1] = m[0];
        input.value = parts.join(' ') + ' ';
      }
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      COMMANDS.clear();
    }
  });

  chips.addEventListener('click', function (e) {
    var b = e.target.closest('button[data-cmd]');
    if (!b) { return; }
    run(b.getAttribute('data-cmd'));
    scrollDown();
  });

  screen.addEventListener('click', function (e) {
    if (e.target.closest('a, button')) { return; }
    var sel = window.getSelection && window.getSelection().toString();
    if (!sel && !form.hidden) { input.focus(); }
  });

  /* ---------- Theme restore ---------- */
  try {
    var saved = localStorage.getItem('portfolio-theme');
    if (saved && THEMES.indexOf(saved) !== -1) {
      document.documentElement.setAttribute('data-theme', saved);
    }
  } catch (e) {}

  /* ---------- Boot sequence ---------- */
  var BOOT = [
    'Initializing portfolio system...',
    'Loading analyst profile...',
    'Mounting experience database...',
    'Starting SIEM modules (Sentinel, QRadar)...',
    'Loading KQL query engine...',
    'Verifying certifications...'
  ];
  var started = performance.now();
  var finished = false;

  function stamp() {
    return '[' + ((performance.now() - started) / 1000).toFixed(3).padStart(8, ' ') + '] ';
  }

  function finishBoot() {
    if (finished) { return; }
    finished = true;
    boot.textContent = '';
    hero.hidden = false;
    form.hidden = false;
    chips.hidden = false;
    line('System ready. Welcome!', 'ok');
    line('Type "help" to see available commands.', 'dim');
    input.focus();
  }

  function bootStep(i) {
    if (finished) { return; }
    if (i >= BOOT.length) { setTimeout(finishBoot, 350); return; }
    var row = document.createElement('div');
    row.className = 'row';
    var span = document.createElement('span');
    span.className = 'ok';
    span.textContent = ' [ OK ]';
    row.textContent = stamp() + BOOT[i];
    row.appendChild(span);
    boot.appendChild(row);
    setTimeout(function () { bootStep(i + 1); }, 260);
  }

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) { finishBoot(); } else {
    bootStep(0);
    document.addEventListener('keydown', finishBoot, { once: true });
    document.addEventListener('pointerdown', finishBoot, { once: true });
  }

  /* ---------- Matrix rain ---------- */
  var canvas = document.getElementById('rain');
  if (canvas && !reduce) {
    var ctx = canvas.getContext('2d');
    var cols, drops, size = 16;
    var glyphs = '01ABCDEF<>/{}[]$#';

    var resize = function () {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      cols = Math.floor(canvas.width / size);
      drops = [];
      for (var i = 0; i < cols; i++) { drops[i] = Math.random() * -50; }
    };
    resize();
    window.addEventListener('resize', resize);

    var color = function () {
      return getComputedStyle(document.documentElement).getPropertyValue('--fg').trim() || '#33ff66';
    };

    setInterval(function () {
      ctx.fillStyle = 'rgba(0,0,0,0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = color();
      ctx.font = size + 'px monospace';
      for (var i = 0; i < drops.length; i++) {
        var ch = glyphs.charAt(Math.floor(Math.random() * glyphs.length));
        ctx.fillText(ch, i * size, drops[i] * size);
        if (drops[i] * size > canvas.height && Math.random() > 0.975) { drops[i] = 0; }
        drops[i]++;
      }
    }, 70);
  }
})();

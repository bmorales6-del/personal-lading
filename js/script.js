// CURSOR
  const cursor = document.getElementById('cursor');
  const ring = document.getElementById('cursorRing');
  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  function animateCursor() {
    cursor.style.left = mx + 'px'; cursor.style.top = my + 'px';
    rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();
  document.querySelectorAll('a, button, .project-card, .colab-card').forEach(el => {
    el.addEventListener('mouseenter', () => { cursor.style.transform = 'translate(-50%,-50%) scale(2.5)'; ring.style.opacity = '0.3'; });
    el.addEventListener('mouseleave', () => { cursor.style.transform = 'translate(-50%,-50%) scale(1)'; ring.style.opacity = '0.5'; });
  });

  // SCROLL REVEAL
  const reveals = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 80);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach(r => obs.observe(r));

  // MENU MOBILE
  function toggleMenu() {
    const links = document.getElementById('navLinks');
    links.classList.toggle('open');
  }
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', () => document.getElementById('navLinks').classList.remove('open'));
  });

  // NAV scroll transparente
  window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    nav.style.background = window.scrollY > 50
      ? 'rgba(10,6,18,0.95)'
      : 'linear-gradient(180deg, rgba(10,6,18,0.95) 0%, transparent 100%)';
  });

  // SKILL BARS via IntersectionObserver
  const skillObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.skill-fill').forEach((bar, i) => {
          bar.style.animationDelay = (i * 0.1) + 's';
          bar.style.animationPlayState = 'running';
        });
        skillObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  document.querySelectorAll('.skills-grid').forEach(g => {
    g.querySelectorAll('.skill-fill').forEach(b => b.style.animationPlayState = 'paused');
    skillObs.observe(g);
  });



const RESPONSES = {
  'quien':    '¡Soy Bayron Linares! 🚀 Estudiante de 5° semestre de Publicidad y Marketing Digital en la UDI Bucaramanga. Creativo, estratega y apasionado por transformar ideas en marcas poderosas.',
  'proyect':  '📁 He trabajado en proyectos increíbles: el Pabellón Colombia en Expo Dubai 2020, contenidos para Rocha Brothers USA, estrategia creativa para Ruitoque Golf Club y más. ¡Desplázate a la sección Proyectos para verlos!',
  'contrat':  '💼 Ofrezco servicios de: Marketing Digital, Branding, Fotografía, Producción Audiovisual, Estrategia de Contenidos e IA Creativa. ¡Escríbeme al WhatsApp 316 340 2997!',
  'contact':  '📲 Puedes contactarme por:
• WhatsApp: 316 340 2997
• Email: bayronlin008@gmail.com
• Instagram: @bayronlin
• LinkedIn: Bayron Linares',
  'udi':      '🎓 Estudio en la Universidad de Investigación y Desarrollo (UDI) en Bucaramanga, Colombia. Actualmente en 5° semestre de Publicidad y Marketing Digital.',
  'servic':   '✨ Mis servicios incluyen Social Media, Branding, Fotografía, Producción Audiovisual, Campañas Publicitarias, Pauta Digital y uso de IA generativa para contenidos.',
  'default':  '¡Gracias por tu mensaje! 💜 Para una atención más personalizada, escríbeme directamente al WhatsApp <strong>316 340 2997</strong> o al email <strong>bayronlin008@gmail.com</strong>.'
};

function getReply(txt) {
  const t = txt.toLowerCase();
  if (/quien|bayron|eres|sobre/.test(t))    return RESPONSES.quien;
  if (/proyect|trabajo|portafolio/.test(t)) return RESPONSES.proyect;
  if (/contrat|precio|costo|valor|servic/.test(t)) return RESPONSES.contrat;
  if (/contact|whatsapp|email|llam|escrib/.test(t)) return RESPONSES.contact;
  if (/udi|univer|estudi|carrer/.test(t))  return RESPONSES.udi;
  return RESPONSES.default;
}

function toggleChat() {
  const w = document.getElementById('chat-window');
  w.classList.toggle('open');
  if (w.classList.contains('open')) {
    setTimeout(() => document.getElementById('chatInput').focus(), 300);
  }
}

function appendMsg(text, role) {
  const box = document.getElementById('chatMessages');
  const div = document.createElement('div');
  div.className = 'msg ' + role;
  div.innerHTML = text.replace(/
/g,'<br>');
  box.appendChild(div);
  box.scrollTop = box.scrollHeight;
  return div;
}

function showTyping() {
  const box = document.getElementById('chatMessages');
  const div = document.createElement('div');
  div.className = 'msg bot typing';
  div.innerHTML = '<div class="dot"></div><div class="dot"></div><div class="dot"></div>';
  box.appendChild(div);
  box.scrollTop = box.scrollHeight;
  return div;
}

function sendMsg() {
  const inp = document.getElementById('chatInput');
  const txt = inp.value.trim();
  if (!txt) return;
  inp.value = '';
  document.getElementById('chatSugs').style.display = 'none';
  appendMsg(txt, 'user');
  const typing = showTyping();
  setTimeout(() => {
    typing.remove();
    appendMsg(getReply(txt), 'bot');
  }, 900 + Math.random() * 400);
}

function sendSug(btn) {
  const txt = btn.textContent;
  document.getElementById('chatSugs').style.display = 'none';
  appendMsg(txt, 'user');
  const typing = showTyping();
  setTimeout(() => {
    typing.remove();
    appendMsg(getReply(txt), 'bot');
  }, 900 + Math.random() * 400);
}
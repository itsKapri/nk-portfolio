// ============================================
// NILESH KAPRI - PORTFOLIO JAVASCRIPT
// Typed animation, particles, scroll effects
// ============================================

// ===== TYPED TEXT ANIMATION =====
const typedRoles = [
  'Full Stack Engineer',
  'SDK Architect',
  'NBA Platform Builder',
  'Performance Optimizer',
  'Multi-Tenant SaaS Dev',
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedEl = document.getElementById('typed-text');

function typeWrite() {
  if (!typedEl) return;
  const currentRole = typedRoles[roleIndex];
  if (isDeleting) {
    typedEl.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typedEl.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
  }
  let speed = isDeleting ? 50 : 90;
  if (!isDeleting && charIndex === currentRole.length) {
    speed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % typedRoles.length;
    speed = 400;
  }
  setTimeout(typeWrite, speed);
}

setTimeout(typeWrite, 800);

// ===== PARTICLE CANVAS BACKGROUND =====
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let particles = [];
const PARTICLE_COUNT = 80;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 0.5;
    this.speedX = (Math.random() - 0.5) * 0.5;
    this.speedY = (Math.random() - 0.5) * 0.5;
    this.opacity = Math.random() * 0.4 + 0.1;
    this.color = Math.random() > 0.5 ? '108,99,255' : '0,212,255';
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.color},${this.opacity})`;
    ctx.fill();
  }
}

function initParticles() {
  particles = [];
  for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());
}

function drawConnections() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(108,99,255,${0.08 * (1 - dist / 120)})`;
        ctx.lineWidth = 0.8;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  drawConnections();
  requestAnimationFrame(animateParticles);
}

resizeCanvas();
initParticles();
animateParticles();
window.addEventListener('resize', () => { resizeCanvas(); initParticles(); });

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  // Active nav link
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) current = section.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
  });
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navList = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navList.classList.toggle('open');
});

// Close menu on link click
navList.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navList.classList.remove('open');
  });
});

// ===== ANIMATED COUNTERS =====
function animateCounter(el, target, decimals = 0) {
  const duration = 2000;
  const start = performance.now();
  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = eased * target;
    el.textContent = decimals > 0 ? value.toFixed(decimals) : Math.floor(value);
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

let countersStarted = false;

function startCounters() {
  if (countersStarted) return;
  const statCards = document.querySelectorAll('.stat-card');
  const heroSection = document.getElementById('hero');
  const heroRect = heroSection.getBoundingClientRect();
  if (heroRect.top < window.innerHeight * 0.8) {
    countersStarted = true;
    document.querySelectorAll('.stat-number').forEach(el => {
      const target = parseFloat(el.getAttribute('data-target'));
      const decimals = target % 1 !== 0 ? 1 : 0;
      animateCounter(el, target, decimals);
    });
  }
}

window.addEventListener('scroll', startCounters);
startCounters();

// ===== SCROLL REVEAL ANIMATIONS =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('animate-in');
      }, entry.target.dataset.delay || 0);
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('[data-animate]').forEach((el, index) => {
  el.dataset.delay = index * 80;
  observer.observe(el);
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ===== CURSOR GLOW EFFECT =====
const glow = document.createElement('div');
glow.style.cssText = `
  position: fixed;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(108,99,255,0.04) 0%, transparent 70%);
  pointer-events: none;
  z-index: 0;
  transform: translate(-50%, -50%);
  transition: left 0.15s ease, top 0.15s ease;
`;
document.body.appendChild(glow);

document.addEventListener('mousemove', (e) => {
  glow.style.left = e.clientX + 'px';
  glow.style.top = e.clientY + 'px';
});

// ===== SKILL TAGS HOVER GLOW =====
document.querySelectorAll('.skill-tag').forEach(tag => {
  tag.addEventListener('mouseenter', () => {
    tag.style.boxShadow = '0 0 12px rgba(108,99,255,0.4)';
  });
  tag.addEventListener('mouseleave', () => {
    tag.style.boxShadow = '';
  });
});

// ===== CODE WINDOW TYPING EFFECT =====
const codeLines = document.querySelectorAll('.code-content code');
// Already rendered, but add a subtle entrance
if (codeLines.length) {
  const codeWindow = document.querySelector('.code-window');
  if (codeWindow) {
    codeWindow.style.opacity = '0';
    codeWindow.style.transform = 'translateY(20px)';
    setTimeout(() => {
      codeWindow.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      codeWindow.style.opacity = '1';
      codeWindow.style.transform = 'translateY(0)';
    }, 600);
  }
}

console.log('%c🚀 Nilesh Kapri — Full Stack Engineer', 'color:#6c63ff;font-size:16px;font-weight:bold;');
console.log('%cworkwithnileshkapri@gmail.com', 'color:#00d4ff;font-size:12px;');

// ===== CONTACT FORM VALIDATION =====
const contactForm = document.getElementById('contact-form');

if (contactForm) {
  const nameInput  = document.getElementById('cf-name');
  const emailInput = document.getElementById('cf-email');
  const msgInput   = document.getElementById('cf-message');
  const errName    = document.getElementById('err-name');
  const errEmail   = document.getElementById('err-email');
  const errMsg     = document.getElementById('err-message');
  const submitBtn  = document.getElementById('submit-btn');
  const submitText = document.getElementById('submit-text');
  const successEl  = document.getElementById('form-success');

  function setError(input, errEl, msg) {
    input.classList.add('input-error');
    errEl.textContent = msg;
  }
  function clearError(input, errEl) {
    input.classList.remove('input-error');
    errEl.textContent = '';
  }

  // Live clear on input
  nameInput.addEventListener('input',  () => clearError(nameInput, errName));
  emailInput.addEventListener('input', () => clearError(emailInput, errEmail));
  msgInput.addEventListener('input',   () => clearError(msgInput, errMsg));

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    const name    = nameInput.value.trim();
    const email   = emailInput.value.trim();
    const message = msgInput.value.trim();

    // Validate
    if (!name) { setError(nameInput, errName, 'Please enter your name.'); valid = false; }
    if (!email) {
      setError(emailInput, errEmail, 'Please enter your email.'); valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError(emailInput, errEmail, 'Please enter a valid email address.'); valid = false;
    }
    if (!message) { setError(msgInput, errMsg, 'Message cannot be empty.'); valid = false; }

    if (!valid) return;

    // Loading state
    submitBtn.disabled = true;
    submitText.textContent = 'Sending...';

    // Simulate send → open mailto
    setTimeout(() => {
      const subject = document.getElementById('cf-subject').value.trim() || 'Portfolio Contact';
      const body = `Hi Nilesh,\n\n${message}\n\n— ${name} (${email})`;
      const mailtoUrl = `mailto:workwithnileshkapri@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailtoUrl;

      // Show success
      submitBtn.disabled = false;
      submitText.textContent = 'Send Message';
      successEl.classList.add('show');
      contactForm.reset();

      // Hide success after 6s
      setTimeout(() => successEl.classList.remove('show'), 6000);
    }, 900);
  });
}

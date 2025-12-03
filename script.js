// Matrix Rain Effect
document.addEventListener('DOMContentLoaded', function() {
  const matrixCanvas = document.getElementById('matrixCanvas');
  if (!matrixCanvas) return;
  
  const matrixCtx = matrixCanvas.getContext('2d');
  
  // Matrix characters
    const matrixChars = "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const fontSize = 14;
  let matrixColumns = 0;
  const matrixDrops = [];
  
  function initMatrix() {
    matrixCanvas.width = window.innerWidth;
    matrixCanvas.height = window.innerHeight;
    matrixColumns = Math.floor(matrixCanvas.width / fontSize);
    
    matrixDrops.length = 0;
    for (let i = 0; i < matrixColumns; i++) {
      matrixDrops[i] = Math.random() * -100;
    }
  }
  
  function drawMatrix() {
    // Semi-transparent black for trail effect
    matrixCtx.fillStyle = 'rgba(15, 23, 42, 0.05)';
    matrixCtx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
    
    // Set font
    matrixCtx.font = `${fontSize}px 'Courier New', monospace`;
    
    // Draw characters
    for (let i = 0; i < matrixColumns; i++) {
            const text = matrixChars.charAt(Math.floor(Math.random() * matrixChars.length));
      const x = i * fontSize;
      const y = matrixDrops[i] * fontSize;
      
      // Gradient effect - brighter at top, dimmer at bottom
      const brightness = Math.max(20, 100 - (matrixDrops[i] * 0.5));
      const opacity = Math.min(1, brightness / 100);
      
      // Use blue/cyan colors
      const hue = 191 + Math.random() * 20; // Blue-cyan range
      matrixCtx.fillStyle = `hsla(${hue}, 100%, ${brightness}%, ${opacity})`;
      
      matrixCtx.fillText(text, x, y);
      
      // Reset drop when it reaches bottom
      if (y > matrixCanvas.height && Math.random() > 0.975) {
        matrixDrops[i] = 0;
      }
      
      matrixDrops[i]++;
    }
  }
  
  // Initialize and animate matrix
  initMatrix();
  window.addEventListener('resize', initMatrix);
  setInterval(drawMatrix, 35);
});

// Navigation scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  lastScroll = currentScroll;
});

// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const menuOverlay = document.getElementById('menuOverlay');

function toggleMenu() {
  const isActive = navMenu.classList.contains('active');
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
  menuOverlay.classList.toggle('active');
  document.body.style.overflow = isActive ? '' : 'hidden';
}

hamburger.addEventListener('click', toggleMenu);

// Close menu when clicking overlay
menuOverlay.addEventListener('click', toggleMenu);

// Close menu when clicking on a link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    menuOverlay.classList.remove('active');
    document.body.style.overflow = '';
  });
});

// Close menu on escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navMenu.classList.contains('active')) {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    menuOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// Typing effect for hero subtitle
const typingText = document.getElementById('typingText');
const texts = [
  'Desenvolvedor Full-Stack',
  'Técnico em TI',
  'Especialista em Cybersecurity',
  'Criador de Soluções'
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeEffect() {
  const currentText = texts[textIndex];
  
  if (isDeleting) {
    typingText.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
    typingSpeed = 50;
            } else {
    typingText.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
    typingSpeed = 100;
  }
  
  if (!isDeleting && charIndex === currentText.length) {
    typingSpeed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % texts.length;
    typingSpeed = 500;
  }
  
  setTimeout(typeEffect, typingSpeed);
}

// Start typing effect when page loads
if (typingText) {
  setTimeout(typeEffect, 1000);
}

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe all sections and cards
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section');
  const cards = document.querySelectorAll('.project-card, .contact-item, .skill-category');
  
  sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
  });
  
  cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
  });
});

// Active navigation link highlight
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  const scrollY = window.pageYOffset;
  
  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute('id');
    const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
    
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinks.forEach(link => link.classList.remove('active'));
      if (navLink) {
        navLink.classList.add('active');
      }
    }
  });
});

// Add active class styling
const style = document.createElement('style');
style.textContent = `
  .nav-link.active {
    color: var(--text-primary);
  }
  .nav-link.active::after {
    width: 100%;
  }
`;
document.head.appendChild(style);

// Parallax effect for hero background
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const heroBackground = document.querySelector('.hero-background');
  if (heroBackground) {
    heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});

// Project cards hover effect enhancement
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-10px) scale(1.02)';
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
  });
});

// Social links animation
const socialLinks = document.querySelectorAll('.social-link, .social-card');
socialLinks.forEach((link, index) => {
  link.style.animationDelay = `${index * 0.1}s`;
});

// Form validation (if contact form is added in future)
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Performance optimization: Lazy load images
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        imageObserver.unobserve(img);
      }
    });
  });
  
  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// Add loading animation
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

// Console message
console.log('%c👋 Olá! Bem-vindo ao meu portfólio!', 'color: #6366f1; font-size: 20px; font-weight: bold;');
console.log('%cDesenvolvido por Artur Maciel Cacau', 'color: #8b5cf6; font-size: 14px;');
console.log('%cGitHub: https://github.com/pycacau', 'color: #94a3b8; font-size: 12px;');

// Add smooth reveal animation on scroll
const revealElements = document.querySelectorAll('.section-header, .section-description');
revealElements.forEach((el, index) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  
  revealObserver.observe(el);
});

// Add cursor trail effect (optional, can be disabled for performance)
let cursorTrail = [];
const maxTrailLength = 10;

document.addEventListener('mousemove', (e) => {
  if (window.innerWidth > 768) { // Only on desktop
    cursorTrail.push({ x: e.clientX, y: e.clientY, time: Date.now() });
    
    if (cursorTrail.length > maxTrailLength) {
      cursorTrail.shift();
    }
    
    // Remove old trail points
    cursorTrail = cursorTrail.filter(point => Date.now() - point.time < 500);
  }
});

// Add scroll progress indicator
const scrollProgress = document.createElement('div');
scrollProgress.style.cssText = `
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  background: linear-gradient(90deg, #6366f1, #8b5cf6, #ec4899);
  z-index: 9999;
  transform-origin: left;
  width: 0%;
  transition: width 0.1s ease;
`;
document.body.appendChild(scrollProgress);

window.addEventListener('scroll', () => {
  const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (window.pageYOffset / windowHeight) * 100;
  scrollProgress.style.width = scrolled + '%';
});

// Projects Carousel - Swipe Indicator
document.addEventListener('DOMContentLoaded', function() {
  const projectsContainer = document.querySelector('.projects-container');
  const swipeIndicator = document.querySelector('.swipe-indicator');
  
  if (projectsContainer && swipeIndicator) {
    let hasScrolled = false;
    let scrollTimeout;
    
    // Only show on mobile
    function isMobile() {
      return window.innerWidth <= 768;
    }
    
    // Hide indicator after user scrolls
    function hideIndicator() {
      if (!hasScrolled && isMobile()) {
        hasScrolled = true;
        projectsContainer.classList.add('scrolled');
        
        // Remove indicator after animation
        setTimeout(() => {
          if (swipeIndicator) {
            swipeIndicator.style.display = 'none';
          }
        }, 500);
      }
    }
    
    // Show/hide based on screen size
    function checkScreenSize() {
      if (isMobile()) {
        if (!hasScrolled) {
          swipeIndicator.style.display = 'flex';
        }
      } else {
        swipeIndicator.style.display = 'none';
      }
    }
    
    // Initial check
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    // Detect scroll on projects container
    projectsContainer.addEventListener('scroll', () => {
      if (projectsContainer.scrollLeft > 10) {
        hideIndicator();
      }
    }, { passive: true });
    
    // Detect touch/swipe
    let touchStartX = 0;
    let touchEndX = 0;
    
    projectsContainer.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    projectsContainer.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      if (Math.abs(touchEndX - touchStartX) > 30) {
        hideIndicator();
      }
    }, { passive: true });
    
    // Hide indicator after 8 seconds if user doesn't interact
    setTimeout(() => {
      if (!hasScrolled && isMobile()) {
        swipeIndicator.style.opacity = '0.6';
      }
    }, 8000);
  }
});

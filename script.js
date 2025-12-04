const menu = document.getElementById("menu");
const closeButton = document.getElementById("close-mobile");
const nav = document.getElementById("nav-mobile");
const navLink = document.querySelectorAll(".nav-link");

menu.addEventListener("click", () => {
  nav.classList.add("show");
});

closeButton.addEventListener("click", () => {
  nav.classList.remove("show");
});

navLink.forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("show");
  });
});

// Carrossel de Projetos e Tecnologias
const projectsCarousel = document.getElementById("projectsCarousel");
const skillsCarousel = document.getElementById("skillsCarousel");
const projectsIndicator = document.getElementById("projectsIndicator");
const skillsIndicator = document.getElementById("skillsIndicator");

// Função para detectar swipe e ocultar indicador
function setupCarousel(carousel, indicator) {
  if (!carousel || !indicator) return;

  let startX = 0;
  let scrollLeft = 0;
  let isDown = false;
  let hasScrolled = false;

  // Touch events
  carousel.addEventListener("touchstart", (e) => {
    startX = e.touches[0].pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
  });

  carousel.addEventListener("touchmove", (e) => {
    if (!hasScrolled) {
      hasScrolled = true;
      indicator.style.opacity = "0";
      indicator.style.transition = "opacity 0.5s ease";
      setTimeout(() => {
        indicator.style.display = "none";
      }, 500);
    }
  });

  // Mouse events para desktop (caso queira testar)
  carousel.addEventListener("mousedown", (e) => {
    isDown = true;
    startX = e.pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
  });

  carousel.addEventListener("mouseleave", () => {
    isDown = false;
  });

  carousel.addEventListener("mouseup", () => {
    isDown = false;
  });

  carousel.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    if (!hasScrolled) {
      hasScrolled = true;
      indicator.style.opacity = "0";
      indicator.style.transition = "opacity 0.5s ease";
      setTimeout(() => {
        indicator.style.display = "none";
      }, 500);
    }
    const x = e.pageX - carousel.offsetLeft;
    const walk = (x - startX) * 2;
    carousel.scrollLeft = scrollLeft - walk;
  });

  // Scroll event para detectar scroll manual
  carousel.addEventListener("scroll", () => {
    if (!hasScrolled) {
      hasScrolled = true;
      indicator.style.opacity = "0";
      indicator.style.transition = "opacity 0.5s ease";
      setTimeout(() => {
        indicator.style.display = "none";
      }, 500);
    }
  });
}

// Inicializar carrosséis
setupCarousel(projectsCarousel, projectsIndicator);
setupCarousel(skillsCarousel, skillsIndicator);

// Ocultar indicadores em telas grandes
function checkScreenSize() {
  if (window.innerWidth > 768) {
    if (projectsIndicator) projectsIndicator.style.display = "none";
    if (skillsIndicator) skillsIndicator.style.display = "none";
  } else {
    if (projectsIndicator) projectsIndicator.style.display = "flex";
    if (skillsIndicator) skillsIndicator.style.display = "flex";
  }
}

window.addEventListener("resize", checkScreenSize);
checkScreenSize();
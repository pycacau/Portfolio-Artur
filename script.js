// Configuração do efeito Matrix (chuva de caracteres)
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('matrixRain');
    const ctx = canvas.getContext('2d');

    // Configurações do efeito Matrix
    const matrixChars = "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const fontSize = 14;
    let columns = Math.floor(window.innerWidth / fontSize);

    // Array para armazenar a posição Y de cada coluna
    const drops = [];
    function initDrops() {
        columns = Math.floor(canvas.width / fontSize) || 1;
        drops.length = 0;
        for (let i = 0; i < columns; i++) {
            drops[i] = Math.floor(Math.random() * -100); // Posição inicial aleatória
        }
    }

    // Configuração do estilo do texto
    ctx.font = `${fontSize}px 'Courier New'`;

    function drawMatrix() {
        // Fundo semi-transparente para criar rastro
        ctx.fillStyle = 'rgba(0, 8, 20, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Desenha os caracteres caindo
        for (let i = 0; i < columns; i++) {
            // Seleciona um caractere aleatório
            const text = matrixChars.charAt(Math.floor(Math.random() * matrixChars.length));

            // Cor do texto (com variação de brilho)
            const brightness = Math.floor(Math.random() * 50) + 30; // 30-80% de brilho
            ctx.fillStyle = `hsl(191, 100%, ${brightness}%)`;

            // Desenha o caractere
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            // Reinicia a coluna quando chegar ao final e com certa probabilidade
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++; // Move para baixo
        }
    }

    // Ajustar canvas quando a janela for redimensionada
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        ctx.font = `${fontSize}px 'Courier New'`;
        initDrops();
    }

    // Inicializar o canvas
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Iniciar animação
    const matrixInterval = setInterval(drawMatrix, 50);

    // Efeito de glitch ocasional
    const glitchEffect = document.getElementById('glitchEffect');
    setInterval(() => {
        if (Math.random() > 0.95) {
            glitchEffect.style.display = 'block';
            setTimeout(() => {
                glitchEffect.style.display = 'none';
            }, 100);
        }
    }, 5000);

    // Efeito de digitação para o título
    function typeEffect(element, text, speed) {
        let i = 0;
        element.innerHTML = '';

        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                element.innerHTML += '<span style="animation: blink 1s step-end infinite;">_</span>';
            }
        }
        type();
    }

    // Aplicar efeito de digitação ao título
    const title = document.querySelector('h1');
    if (title) {
        const originalTitle = title.textContent.trim();
        typeEffect(title, originalTitle, 80);
    }

    // Centralizar verticalmente o conteúdo (se necessário)
    function centerContent() {
        const headerHeight = document.querySelector('header') ? document.querySelector('header').offsetHeight : 0;
        const projectsHeight = document.getElementById('projetos') ? document.getElementById('projetos').offsetHeight : 0;
        const footerHeight = document.querySelector('footer') ? document.querySelector('footer').offsetHeight : 0;
        const totalHeight = headerHeight + projectsHeight + footerHeight;
        const windowHeight = window.innerHeight;

        const container = document.querySelector('.main-container');
        if (container) {
            if (totalHeight < windowHeight) {
                container.style.marginTop = ((windowHeight - totalHeight) / 4) + 'px';
            } else {
                container.style.marginTop = '';
            }
        }
    }

    centerContent();
    window.addEventListener('resize', centerContent);


    /* ================== CARROSSEL: scroll vertical -> horizontal, drag to scroll ================== */
    const carousel = document.querySelector('.carousel');

    if (carousel) {
        // Convert vertical wheel to horizontal scroll when pointer is over carousel
        carousel.addEventListener('wheel', function(e) {
            // Only act on vertical delta
            if (Math.abs(e.deltaY) < Math.abs(e.deltaX)) return;
            e.preventDefault();
            // Multiply for comfortable speed
            const speed = 1.2;
            carousel.scrollLeft += e.deltaY * speed;
        }, { passive: false });

        // Mouse drag to scroll (desktop)
        let isDown = false;
        let startX;
        let scrollLeftStart;

        carousel.addEventListener('mousedown', (e) => {
            isDown = true;
            carousel.classList.add('dragging');
            startX = e.pageX - carousel.getBoundingClientRect().left;
            scrollLeftStart = carousel.scrollLeft;
        });

        window.addEventListener('mouseup', () => {
            if (isDown) {
                isDown = false;
                carousel.classList.remove('dragging');
            }
        });

        carousel.addEventListener('mouseleave', () => {
            if (isDown) {
                isDown = false;
                carousel.classList.remove('dragging');
            }
        });

        carousel.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - carousel.getBoundingClientRect().left;
            const walk = (x - startX) * 1.6; // scroll speed multiplier
            carousel.scrollLeft = scrollLeftStart - walk;
        });

        // Keyboard navigation while focused (accessibility)
        carousel.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') {
                carousel.scrollBy({ left: 340, behavior: 'smooth' });
            } else if (e.key === 'ArrowLeft') {
                carousel.scrollBy({ left: -340, behavior: 'smooth' });
            }
            const carousel = document.querySelector('.carousel');

if (carousel) {
  // Destacar o card mais central visível
  function updateActiveCard() {
    const cards = carousel.querySelectorAll('.card');
    let closest = null;
    let closestDistance = Infinity;
    const carouselCenter = carousel.scrollLeft + (carousel.offsetWidth / 2);

    cards.forEach(card => {
      const cardCenter = card.offsetLeft + (card.offsetWidth / 2);
      const dist = Math.abs(cardCenter - carouselCenter);
      if (dist < closestDistance) {
        closestDistance = dist;
        closest = card;
      }
    });

    cards.forEach(c => c.classList.remove('active'));
    if (closest) closest.classList.add('active');
  }

  carousel.addEventListener('scroll', () => {
    window.requestAnimationFrame(updateActiveCard);
  });

  updateActiveCard();
}

        });

        // Improve touch inertia (optional): no extra code required, browser handles it
    }

    /* ====================== end carousel code ====================== */

}); // DOMContentLoaded end

// Configuração do efeito Matrix (chuva de caracteres)
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('matrixRain');
    const ctx = canvas.getContext('2d');
    
    // Configurações do efeito Matrix
    const matrixChars = "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const fontSize = 14;
    let columns = Math.floor(canvas.width / fontSize);
    
    // Array para armazenar a posição Y de cada coluna
    const drops = [];
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.floor(Math.random() * -100); // Posição inicial aleatória
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
            const brightness = Math.floor(Math.random() * 50) + 50; // 50-100% de brilho
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
        
        // Recalcular colunas
        columns = Math.floor(canvas.width / fontSize);
        
        // Ajustar array de drops para o novo número de colunas
        while (drops.length < columns) {
            drops.push(Math.floor(Math.random() * -100));
        }
        drops.length = columns;
    }
    
    // Inicializar o canvas
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Iniciar animação
    setInterval(drawMatrix, 50);
    
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
    const originalTitle = title.textContent;
    typeEffect(title, originalTitle, 100);
    
    // Centralizar verticalmente o conteúdo
    function centerContent() {
        const headerHeight = document.querySelector('header').offsetHeight;
        const projectsHeight = document.getElementById('projetos').offsetHeight;
        const footerHeight = document.querySelector('footer').offsetHeight;
        const totalHeight = headerHeight + projectsHeight + footerHeight;
        const windowHeight = window.innerHeight;
        
        if (totalHeight < windowHeight) {
            const container = document.querySelector('.main-container');
            container.style.marginTop = ((windowHeight - totalHeight) / 3) + 'px';
        }
    }
    
    // Chamar a centralização e adicionar listener para redimensionamento
    centerContent();
    window.addEventListener('resize', centerContent);
});
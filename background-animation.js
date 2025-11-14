// background-animation.js

(function () {
    /**
     * Script para criar os logos flutuantes no fundo da página.
     */
    function createFloatingLogos() {
        const container = document.getElementById('logo-container');
        if (!container) return; // Se não houver container, não faz nada

        const numLogos = 15; // Quantidade de logos na tela

        for (let i = 0; i < numLogos; i++) {
            const logo = document.createElement('img');
            logo.src = './img/LogoMsCriacoes.png';
            logo.alt = ''; // Imagem puramente decorativa
            logo.classList.add('logo-flutuante');

            // Variações para um efeito mais natural e orgânico
            logo.style.width = `${Math.random() * 100 + 30}px`; // Tamanho entre 30px e 130px
            logo.style.top = `${Math.random() * 90}vh`; // Posição vertical aleatória
            logo.style.left = `${Math.random() * 100}vw`; // Posição horizontal aleatória
            logo.style.animationDuration = `${Math.random() * 15 + 15}s`; // Duração entre 15s e 30s
            logo.style.animationDelay = `-${Math.random() * 20}s`; // Atraso negativo para iniciar em pontos diferentes do ciclo

            container.appendChild(logo);
        }
    }

    document.addEventListener('DOMContentLoaded', createFloatingLogos);
})();
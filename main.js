// main.js — Versão limpa e corrigida
(function () {
    // --- Utils
    const qs = s => document.querySelector(s);
    const qsa = s => Array.from(document.querySelectorAll(s));
 
    // Destacar link ativo no menu
    (function highlightActiveLink() {
        const navLinks = qsa('header nav a');
        const currentPath = window.location.pathname.split('/').pop();
        // Trata 'index.html' como a raiz para destacar o link 'Início' corretamente.
        const normalizedPath = (currentPath === 'index.html' || currentPath === '') ? 'index.html' : currentPath;
 
        function normalizeHref(href) {
            if (!href) return '';
            return href.split('/').pop().split('#')[0].split('?')[0];
        }
 
        navLinks.forEach(link => {
            const href = normalizeHref(link.getAttribute('href'));
            const linkPath = (href === 'index.html' || href === '') ? 'index.html' : href;
            if (linkPath === normalizedPath) {
                link.classList.add('ativo');
            }
        });
    })();
 
    // Observer para revelar elementos ao rolar
    (function setupObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visivel'); });
        }, { threshold: 0.1 }); // Reduzi o threshold para 0.1 para acionar a animação um pouco antes
        qsa('.cartao, .sobre-conteudo, .servico-item, .processo-passo, .depoimento-cartao').forEach(el => observer.observe(el));
    })();
 
    // Carrossel: apenas imagem + título principal, com autoplay e dots
    (function elegantCarousel() {
        qsa('.carrossel').forEach(carrossel => {
            let wrap = carrossel.querySelector('.carrossel-inner-wrap');
            const interno = carrossel.querySelector('.carrossel-interno');
            if (!interno) return;
            if (!wrap) { wrap = document.createElement('div'); wrap.className = 'carrossel-inner-wrap'; carrossel.insertBefore(wrap, interno); wrap.appendChild(interno); }
 
            const itens = Array.from(interno.querySelectorAll('.carrossel-item'));
            if (itens.length <= 1) return; // Não inicializa se não houver slides suficientes
 
            const prev = carrossel.querySelector('.controle-carrossel.prev');
            const next = carrossel.querySelector('.controle-carrossel.next');
 
            // O carrossel do hero usa legendas, os outros não.
            const useCaptions = carrossel.id === 'inicio-hero';
 
            // criar dots
            const dotsWrap = document.createElement('div'); dotsWrap.className = 'carrossel-dots';
            const dots = [];
            itens.forEach((_, i) => { const btn = document.createElement('button'); btn.type = 'button'; if (i === 0) btn.classList.add('ativo'); btn.addEventListener('click', () => { showSlide(i); restartAutoplay(); }); dotsWrap.appendChild(btn); dots.push(btn); });
            carrossel.appendChild(dotsWrap);
 
            let currentIndex = 0; let autoplayId = null; const AUTOPLAY_DELAY = 4500;
 
            function showSlide(i) {
                currentIndex = (i + itens.length) % itens.length;
                itens.forEach((it, idx) => it.classList.toggle('ativo', idx === currentIndex));
                dots.forEach((d, idx) => d.classList.toggle('ativo', idx === currentIndex));
            }
 
            function nextSlide() { showSlide(currentIndex + 1); }
            function prevSlide() { showSlide(currentIndex - 1); }
 
            function startAutoplay() { stopAutoplay(); autoplayId = setInterval(nextSlide, AUTOPLAY_DELAY); }
            function stopAutoplay() { if (autoplayId) { clearInterval(autoplayId); autoplayId = null; } }
            function restartAutoplay() { stopAutoplay(); startAutoplay(); }
 
            if (next) next.addEventListener('click', () => { nextSlide(); restartAutoplay(); });
            if (prev) prev.addEventListener('click', () => { prevSlide(); restartAutoplay(); });
 
            wrap.addEventListener('mouseenter', stopAutoplay);
            wrap.addEventListener('mouseleave', startAutoplay);
 
            showSlide(0);
            startAutoplay();
        });
    })();
 
    // Efeito 3D nos cards (suave)
    (function card3DEffect() {
        const maxRotation = 6; // graus (reduzido para um efeito mais sutil)
        qsa('.cartao, .equipe-cartao').forEach(card => {
            card.style.willChange = 'transform';
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;
                const ry = (x * maxRotation).toFixed(2);
                const rx = (-y * maxRotation).toFixed(2);
                card.style.transform = `perspective(1000px) rotateY(${ry}deg) rotateX(${rx}deg) scale(1.02)`;
            });
            card.addEventListener('mouseleave', () => { card.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) scale(1)'; });
        });
    })();
 
    // Atualizar ano no rodapé
    (function updateFooterYear() {
        const yearSpan = qs('#current-year');
        if (yearSpan) {
            yearSpan.textContent = new Date().getFullYear();
        }
    })();
 
})();
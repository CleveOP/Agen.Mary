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
        qsa('section h2, .cartao, .sobre-conteudo, .servico-item, .processo-passo, .depoimento-cartao, .missao-item, .equipe-cartao').forEach(el => observer.observe(el));
    })();
 
    // Carrossel: apenas imagem + título principal, com autoplay e dots
    (function elegantCarousel() {
        qsa('.carrossel').forEach(carrossel => {
            const interno = carrossel.querySelector('.carrossel-interno');
            if (!interno) return;
 
            const itens = Array.from(interno.querySelectorAll('.carrossel-item'));
            if (itens.length <= 1) return; // Não inicializa se não houver slides suficientes
 
            const prev = carrossel.querySelector('.controle-carrossel.prev');
            const next = carrossel.querySelector('.controle-carrossel.next');
            const dotsContainer = carrossel.querySelector('.carrossel-dots');
 
            // O carrossel do hero usa legendas, os outros não.
            const useCaptions = carrossel.id === 'inicio-hero';
 
            let currentIndex = 0; let autoplayId = null; const AUTOPLAY_DELAY = 4500;
 
            // Cria os dots de paginação
            if (dotsContainer) {
                itens.forEach((_, i) => {
                    const dot = document.createElement('button');
                    dot.setAttribute('aria-label', `Ir para o slide ${i + 1}`);
                    dot.addEventListener('click', () => {
                        showSlide(i);
                        restartAutoplay();
                    });
                    dotsContainer.appendChild(dot);
                });
            }
            const dots = dotsContainer ? Array.from(dotsContainer.children) : [];

            function showSlide(i) {
                currentIndex = (i + itens.length) % itens.length;
                itens.forEach((it, idx) => it.classList.toggle('ativo', idx === currentIndex));
                if (dots.length > 0) {
                    dots.forEach((dot, idx) => dot.classList.toggle('ativo', idx === currentIndex));
                }
            }
 
            function nextSlide() { showSlide(currentIndex + 1); }
            function prevSlide() { showSlide(currentIndex - 1); }
 
            function startAutoplay() { stopAutoplay(); autoplayId = setInterval(nextSlide, AUTOPLAY_DELAY); }
            function stopAutoplay() { if (autoplayId) { clearInterval(autoplayId); autoplayId = null; } }
            function restartAutoplay() { stopAutoplay(); startAutoplay(); }
 
            if (next) next.addEventListener('click', () => { nextSlide(); restartAutoplay(); });
            if (prev) prev.addEventListener('click', () => { prevSlide(); restartAutoplay(); });
 
            carrossel.addEventListener('mouseenter', stopAutoplay);
            carrossel.addEventListener('mouseleave', startAutoplay);
 
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

    // Cursor Personalizado
    (function customCursor() {
        const cursor = qs('.custom-cursor');
        if (!cursor) return;

        // Move o cursor com o mouse
        document.addEventListener('mousemove', e => {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
        });

        // Adiciona efeito de hover em elementos clicáveis
        qsa('a, button, .botao-cta, .controle-carrossel, .cartao-link').forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        });
    })();
 
    // Menu Hambúrguer para Mobile
    (function setupMobileMenu() {
        const menuButton = qs('#menu-hamburguer');
        const nav = qs('#nav-principal');
        if (!menuButton || !nav) return;

        menuButton.addEventListener('click', () => {
            const isOpened = nav.classList.toggle('menu-aberto');
            menuButton.setAttribute('aria-expanded', isOpened);
            
            // Troca o ícone para 'X' quando o menu está aberto
            const icon = menuButton.querySelector('i');
            if (isOpened) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    })();

    // Menu Vertical Flutuante ao Rolar
    (function setupVerticalMenu() {
        const verticalMenu = qs('#menu-vertical');
        // Adiciona uma verificação extra para garantir que o menu exista no DOM
        if (!verticalMenu) {
            console.warn('Elemento #menu-vertical não encontrado nesta página.');
            return;
        }

        // Mostra ou esconde o menu baseado na posição de rolagem
        window.addEventListener('scroll', () => {
            // Mostra o menu após rolar 250 pixels para baixo
            if (window.scrollY > 250) {
                verticalMenu.classList.remove('menu-vertical-oculto');
            } else {
                verticalMenu.classList.add('menu-vertical-oculto');
            }
        });
    })();

})();
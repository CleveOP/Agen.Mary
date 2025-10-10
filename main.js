// main.js — Versão limpa e corrigida
// main.js — Versão limpa e corrigida
(function () {
    // --- Utils
    const qs = s => document.querySelector(s);
    const qsa = s => Array.from(document.querySelectorAll(s));

    // Destacar link ativo no menu
    (function highlightActiveLink() {
        const navLinks = qsa('header nav a');
        const currentPath = window.location.pathname.split('/').pop();
        function normalizeHref(href) {
            if (!href) return '';
            return href.split('/').pop().split('#')[0].split('?')[0];
        }
        navLinks.forEach(link => {
            const href = normalizeHref(link.getAttribute('href'));
            if (href === currentPath || (href === '' && currentPath === '')) link.classList.add('ativo');
            // main.js — Versão limpa e corrigida
            (function () {
                // --- Utils
                const qs = s => document.querySelector(s);
                const qsa = s => Array.from(document.querySelectorAll(s));

                // Destacar link ativo no menu
                (function highlightActiveLink() {
                    const navLinks = qsa('header nav a');
                    const currentPath = window.location.pathname.split('/').pop();
                    function normalizeHref(href) { if (!href) return ''; return href.split('/').pop().split('#')[0].split('?')[0]; }
                    navLinks.forEach(link => {
                        const href = normalizeHref(link.getAttribute('href'));
                        if (href === currentPath || (href === '' && currentPath === '')) link.classList.add('ativo');
                    });
                })();

                // Observer para revelar elementos ao rolar
                (function setupObserver() {
                    const observer = new IntersectionObserver((entries) => {
                        entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visivel'); });
                    }, { threshold: 0.18 });
                    qsa('.cartao, .sobre-conteudo, .servico-item').forEach(el => observer.observe(el));
                })();

                // Carrossel: apenas imagem + título principal, com autoplay e dots
                (function elegantCarousel() {
                    qsa('.carrossel').forEach(carrossel => {
                        // garantir wrapper
                        let wrap = carrossel.querySelector('.carrossel-inner-wrap');
                        const interno = carrossel.querySelector('.carrossel-interno');
                        if (!interno) return;
                        if (!wrap) { wrap = document.createElement('div'); wrap.className = 'carrossel-inner-wrap'; carrossel.insertBefore(wrap, interno); wrap.appendChild(interno); }

                        const itens = Array.from(interno.querySelectorAll('.carrossel-item'));
                        const prev = carrossel.querySelector('.controle-carrossel.prev');
                        const next = carrossel.querySelector('.controle-carrossel.next');

                        // esconder legendas internas (se existirem) e coletar título principal
                        const titles = itens.map(it => {
                            const caption = it.querySelector('.carrossel-legenda, .legenda, .caption');
                            if (caption) caption.style.display = 'none';
                            const title = (it.dataset.title && it.dataset.title.trim()) || (it.querySelector('h1,h2,h3,.titulo')?.textContent || '').trim();
                            return title;
                        });

                        // criar dots
                        const dotsWrap = document.createElement('div'); dotsWrap.className = 'carrossel-dots';
                        const dots = [];
                        itens.forEach((it, i) => { const btn = document.createElement('button'); btn.type = 'button'; if (i === 0) btn.classList.add('ativo'); btn.addEventListener('click', () => showSlide(i)); dotsWrap.appendChild(btn); dots.push(btn); });
                        carrossel.appendChild(dotsWrap);

                        // criar elemento de título principal sobreposto
                        let titleEl = carrossel.querySelector('.carrossel-main-title');
                        if (!titleEl) { titleEl = document.createElement('div'); titleEl.className = 'carrossel-main-title'; wrap.appendChild(titleEl); }

                        let currentIndex = 0; let autoplayId = null; const AUTOPLAY_DELAY = 4500;

                        function updateTitle(i) { const t = titles[i] || ''; titleEl.textContent = t; titleEl.style.display = t ? 'block' : 'none'; }

                        function showSlide(i) { currentIndex = (i + itens.length) % itens.length; itens.forEach((it, idx) => it.classList.toggle('ativo', idx === currentIndex)); dots.forEach((d, idx) => d.classList.toggle('ativo', idx === currentIndex)); updateTitle(currentIndex); }

                        function nextSlide() { showSlide(currentIndex + 1); }
                        function prevSlide() { showSlide(currentIndex - 1); }

                        if (next) next.addEventListener('click', () => { nextSlide(); restartAutoplay(); });
                        if (prev) prev.addEventListener('click', () => { prevSlide(); restartAutoplay(); });

                        function startAutoplay() { stopAutoplay(); autoplayId = setInterval(nextSlide, AUTOPLAY_DELAY); }
                        function stopAutoplay() { if (autoplayId) { clearInterval(autoplayId); autoplayId = null; } }
                        function restartAutoplay() { stopAutoplay(); startAutoplay(); }

                        wrap.addEventListener('mouseenter', stopAutoplay); wrap.addEventListener('mouseleave', startAutoplay);

                        // iniciar
                        showSlide(0); startAutoplay();
                    });
                })();

                // Efeito 3D nos cards (suave)
                (function card3DEffect() {
                    const maxRotation = 8; // graus
                    qsa('.cartao').forEach(card => {
                        card.style.willChange = 'transform';
                        card.addEventListener('mousemove', (e) => {
                            const rect = card.getBoundingClientRect();
                            const x = (e.clientX - rect.left) / rect.width - 0.5;
                            const y = (e.clientY - rect.top) / rect.height - 0.5;
                            const ry = (x * maxRotation).toFixed(2);
                            const rx = (-y * maxRotation).toFixed(2);
                            card.style.transform = `rotateY(${ry}deg) rotateX(${rx}deg) translateZ(0)`;
                        });
                        card.addEventListener('mouseleave', () => { card.style.transform = ''; });
                    });
                })();

            })();
            function stopAutoplay() { if (autoplayId) { clearInterval(autoplayId); autoplayId = null; } }

            function restartAutoplay() { stopAutoplay(); startAutoplay(); }

        });
    })();
})();
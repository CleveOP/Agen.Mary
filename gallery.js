document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');

    let currentImageIndex;
    let visibleImages = [];

    // --- Lógica de Filtragem ---
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Gerencia o estado ativo do botão
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            // Mostra ou esconde os itens da galeria
            galleryItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.classList.remove('hide');
                } else {
                    item.classList.add('hide');
                }
            });
        });
    });

    // --- Lógica do Lightbox ---
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            // Atualiza a lista de imagens visíveis para a navegação
            visibleImages = Array.from(galleryItems).filter(i => !i.classList.contains('hide'));
            const clickedImg = item.querySelector('img');
            currentImageIndex = visibleImages.indexOf(item);
            
            openLightbox(clickedImg.src, clickedImg.dataset.caption);
        });
    });

    function openLightbox(src, caption) {
        lightboxImg.src = src;
        lightboxCaption.textContent = caption;
        lightbox.classList.add('show');
        document.body.style.overflow = 'hidden'; // Impede o scroll do fundo
    }

    function closeLightbox() {
        lightbox.classList.remove('show');
        document.body.style.overflow = 'auto'; // Restaura o scroll
    }

    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % visibleImages.length;
        const nextItem = visibleImages[currentImageIndex];
        const nextImg = nextItem.querySelector('img');
        openLightbox(nextImg.src, nextImg.dataset.caption);
    }

    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + visibleImages.length) % visibleImages.length;
        const prevItem = visibleImages[currentImageIndex];
        const prevImg = prevItem.querySelector('img');
        openLightbox(prevImg.src, prevImg.dataset.caption);
    }

    // Event Listeners do Lightbox
    closeBtn.addEventListener('click', closeLightbox);
    nextBtn.addEventListener('click', showNextImage);
    prevBtn.addEventListener('click', showPrevImage);

    // Fecha o lightbox clicando fora da imagem
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Navegação com as setas do teclado
    document.addEventListener('keydown', (e) => {
        if (lightbox.classList.contains('show')) {
            if (e.key === 'ArrowRight') showNextImage();
            if (e.key === 'ArrowLeft') showPrevImage();
            if (e.key === 'Escape') closeLightbox();
        }
    });
});

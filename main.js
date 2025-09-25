// --- 1. Lógica para destacar o link do menu da página ativa ---

// Pega o caminho da página atual (ex: "/services.html")
const currentPage = window.location.pathname;

// Seleciona todos os links dentro da navegação do cabeçalho
const navLinks = document.querySelectorAll('header nav a');

// Itera sobre cada link do menu
navLinks.forEach(link => {
    // Verifica se o href do link corresponde à página atual
    if (link.getAttribute('href').endsWith(currentPage.substring(currentPage.lastIndexOf('/')))) {
        // Adiciona a classe 'active' ao link correspondente
        link.classList.add('active');
    }
});


// --- 2. Lógica para animação de fade-in ao rolar a página ---

// Seleciona todos os elementos que queremos animar
const elementsToAnimate = document.querySelectorAll('.card, .about-content');

// Configura o "observador" que vai verificar quando um elemento entra na tela
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        // Se o elemento está visível na tela
        if (entry.isIntersecting) {
            // Adiciona a classe 'visible' para ativar a animação
            entry.target.classList.add('visible');
            // Para a observação deste elemento para não repetir a animação
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 }); // A animação começa quando 10% do elemento estiver visível

// Pede ao observador para "vigiar" cada um dos elementos selecionados
elementsToAnimate.forEach(element => observer.observe(element));


// --- 3. Lógica para o Carrossel ---

// Verifica se existe um carrossel na página antes de executar o código
const carousel = document.querySelector('.carousel');
if (carousel) {
    const carouselInner = carousel.querySelector('.carousel-inner');
    const carouselItems = carousel.querySelectorAll('.carousel-item');
    const prevButton = carousel.querySelector('.carousel-control.prev');
    const nextButton = carousel.querySelector('.carousel-control.next');
    let currentIndex = 0;

    function showSlide(index) {
        // Esconde todos os slides
        carouselItems.forEach(item => item.classList.remove('active'));
        // Mostra o slide correto
        carouselItems[index].classList.add('active');
        // Move o container (para animação de slide, se usada)
        carouselInner.style.transform = `translateX(-${index * 100}%)`;
    }

    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % carouselItems.length;
        showSlide(currentIndex);
    });

    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
        showSlide(currentIndex);
    });
}
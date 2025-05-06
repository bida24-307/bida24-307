// ===================================================================
// Portfolio Slider Functionality (Self-Contained)
// ===================================================================
(() => {
    const portfolioSliderContainer = document.querySelector('.slider-container');

    if (!portfolioSliderContainer) {
        console.log('Portfolio slider container not found. Skipping portfolio slider initialization.');
        return;
    }

    console.log('Portfolio slider container found. Initializing portfolio slider.');

    const slides = portfolioSliderContainer.querySelectorAll('.slide');
    const dots = portfolioSliderContainer.querySelectorAll('.slider-nav .dot');
    const prevButton = portfolioSliderContainer.querySelector('.arrow-left');
    const nextButton = portfolioSliderContainer.querySelector('.arrow-right');
    const track = portfolioSliderContainer.querySelector('.slider');

    if (!slides.length || !dots.length || !prevButton || !nextButton || !track) {
        console.error('One or more required portfolio slider elements not found.', { slides, dots, prevButton, nextButton, track });
        return;
    }

    let currentSlide = 0;
    let autoSlideInterval;
    const intervalTime = 3500; // 3.5 seconds

    function showSlide(n) {
        clearInterval(autoSlideInterval);

        currentSlide = (n + slides.length) % slides.length;
        console.log('Portfolio Slider: Showing slide', currentSlide);

        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        slides[currentSlide].classList.add('active');
        if (dots[currentSlide]) dots[currentSlide].classList.add('active');

        if (track) {
            track.style.transform = `translateX(-${currentSlide * 100}%)`;
        } else {
            console.warn("Portfolio slider track element not found for transform.");
        }

        startAutoSlide();
    }

    function showNextSlide() {
        showSlide(currentSlide + 1);
    }

    function showPrevSlide() {
        showSlide(currentSlide - 1);
    }

    function startAutoSlide() {
        stopAutoSlide();
        autoSlideInterval = setInterval(showNextSlide, intervalTime);
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    // Event Listeners
    prevButton.addEventListener('click', showPrevSlide);
    nextButton.addEventListener('click', showNextSlide);
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showSlide(index));
    });

    portfolioSliderContainer.addEventListener('mouseenter', stopAutoSlide);
    portfolioSliderContainer.addEventListener('mouseleave', startAutoSlide);

    // Initialize
    showSlide(0);
    startAutoSlide();
})();

// ===================================================================
// Mobile Navigation Menu Functionality
// ===================================================================
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu .nav-link');

    if (!hamburger || !navMenu) {
        console.log("Hamburger or Nav Menu not found. Mobile menu script not initialized.");
        return;
    }

    // Toggle menu open/close
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('is-active');
        navMenu.classList.toggle('nav-menu--open');
    });

    // Close menu when a nav link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('is-active');
            navMenu.classList.remove('nav-menu--open');
        });
    });
});

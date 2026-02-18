// Auto Slider Configuration
const sliderConfig = {
    slides: document.querySelectorAll('.hero-slide'),
    currentSlide: 0,
    interval: 5000,
    autoPlay: true
};

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initSlider();
});

// Initialize Auto Slider
function initSlider() {
    showSlide(sliderConfig.currentSlide);
    if (sliderConfig.autoPlay) {
        startAutoSlider();
    }
}

// Show specific slide
function showSlide(index) {
    sliderConfig.slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
}

// Next slide
function nextSlide() {
    sliderConfig.currentSlide = (sliderConfig.currentSlide + 1) % sliderConfig.slides.length;
    showSlide(sliderConfig.currentSlide);
}

// Auto slider timer
let slideTimer;
function startAutoSlider() {
    slideTimer = setInterval(nextSlide, sliderConfig.interval);
}

function stopAutoSlider() {
    clearInterval(slideTimer);
}

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for ALL navigation links INCLUDING VISION
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active navigation link on scroll (NOW WORKS WITH VISION)
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 200;

    sections.forEach(section => {
        if (scrollPosition >= section.offsetTop) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// WhatsApp animations & slider pause on hover
const whatsappBtn = document.querySelector('.whatsapp-btn');
if (whatsappBtn) {
    whatsappBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1) rotate(5deg)';
    });
    whatsappBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
}

const heroSlider = document.querySelector('.hero-slider');
if (heroSlider) {
    heroSlider.addEventListener('mouseenter', stopAutoSlider);
    heroSlider.addEventListener('mouseleave', startAutoSlider);
}

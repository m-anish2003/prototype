/* ================================
   Navbar Toggle Functionality
================================== */
function toggleMenu() {
    const navbar = document.getElementById('navbar');
    navbar.classList.toggle('active');
}


/* ================================
   Hero Image Carousel
   - Auto-play every 4 seconds
   - Manual navigation support
================================== */
let currentSlide = 0;
const slides = document.querySelectorAll(".carousel-image");
const dots = document.querySelectorAll(".dot");

// Show a specific slide
function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle("active", i === index);
        dots[i].classList.toggle("active", i === index);
    });
    currentSlide = index;
}

// Show next slide
function nextSlide() {
    showSlide((currentSlide + 1) % slides.length);
}

// Show previous slide
function prevSlide() {
    showSlide((currentSlide - 1 + slides.length) % slides.length);
}

// Set slide manually (e.g., via dot click)
function setSlide(index) {
    showSlide(index);
}

// Auto-play
setInterval(nextSlide, 4000);


/* ================================
   DOM Ready Logic:
   - Initialize Swiper for News
   - Expandable "Read More" Cards
================================== */
document.addEventListener('DOMContentLoaded', function () {

    // Initialize Swiper.js for News Section
    if (document.querySelector('.news-swiper')) {
        new Swiper('.news-swiper', {
            loop: true,
            autoplay: { delay: 5000 },
            slidesPerView: 1,
            spaceBetween: 20,
            pagination: { el: '.swiper-pagination' },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            },
            breakpoints: {
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 }
            }
        });
    }

    // Expand/Collapse News Card Text
    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('read-more')) {
            const excerpt = e.target.closest('.news-content').querySelector('.news-excerpt');
            excerpt.classList.toggle('expanded');
            e.target.textContent = excerpt.classList.contains('expanded') ? 'Read Less' : 'Read More';
        }
    });
});

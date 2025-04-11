/* ===========================
   Responsive Navbar Toggle
=========================== */
function toggleMenu() {
    const navbar = document.getElementById('navbar');
    navbar.classList.toggle('active');
}


/* ===========================
   Hero Carousel Logic
=========================== */
let currentSlide = 0;
const slides = document.querySelectorAll(".carousel-image");
const dots = document.querySelectorAll(".dot");

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle("active", i === index);
        dots[i].classList.toggle("active", i === index);
    });
    currentSlide = index;
}

function nextSlide() {
    let next = (currentSlide + 1) % slides.length;
    showSlide(next);
}

function prevSlide() {
    let prev = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(prev);
}

function setSlide(index) {
    showSlide(index);
}

setInterval(nextSlide, 4000); // Auto-play every 4 seconds


/* ===========================
   DOM Content Loaded: News Swiper + Expandable Cards
=========================== */
document.addEventListener('DOMContentLoaded', function () {
    // News Slider using Swiper
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

    // Expandable Read More / Read Less
    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('read-more')) {
            const excerpt = e.target.closest('.news-content').querySelector('.news-excerpt');
            excerpt.classList.toggle('expanded');
            e.target.textContent = excerpt.classList.contains('expanded')
                ? 'Read Less'
                : 'Read More';
        }
    });
});

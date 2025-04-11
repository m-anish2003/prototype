function toggleMenu() {
    const navbar = document.getElementById('navbar');
    navbar.classList.toggle('active');
}

// Initialize Swiper when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // News Slider
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

    // Expandable Cards
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('read-more')) {
            const excerpt = e.target.closest('.news-content').querySelector('.news-excerpt');
            excerpt.classList.toggle('expanded');
            e.target.textContent = excerpt.classList.contains('expanded') 
                ? 'Read Less' 
                : 'Read More';
        }
    });
});

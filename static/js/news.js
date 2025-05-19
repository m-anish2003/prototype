document.addEventListener('DOMContentLoaded', function() {
    // Initialize Swiper
    const newsSwiper = new Swiper('.news-swiper', {
        loop: true,
        autoplay: { 
            delay: 5000,
            disableOnInteraction: false
        },
        slidesPerView: 1,
        spaceBetween: 20,
        pagination: { 
            el: '.swiper-pagination',
            clickable: true
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        breakpoints: {
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
        }
    });

    // Enhanced Read More/Less functionality
    document.querySelectorAll('.read-more').forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.news-card');
            card.classList.toggle('expanded');
            
            // Update button text and icon
            if (card.classList.contains('expanded')) {
                this.innerHTML = 'Read Less <i class="fas fa-chevron-up"></i>';
            } else {
                this.innerHTML = 'Read More <i class="fas fa-chevron-down"></i>';
            }
            
            // Update swiper layout
            newsSwiper.update();
        });
    });

    // Enhanced Search functionality
    const newsSearch = document.getElementById('newsSearch');
    if (newsSearch) {
        const allNewsCards = document.querySelectorAll('.swiper-slide');
        const announcements = document.querySelectorAll('.announcement-card');
        const noResultsTemplate = document.getElementById('noResultsTemplate');
        const noResultsMessage = noResultsTemplate.cloneNode(true);
        noResultsMessage.id = '';
        noResultsMessage.style.display = 'none';
        document.querySelector('.news-swiper').parentNode.insertBefore(noResultsMessage, document.querySelector('.announcements-section'));

        newsSearch.addEventListener('input', function() {
            const searchTerm = this.value.trim().toLowerCase();
            let hasResults = false;
            let newsHasResults = false;

            // Search through news cards
            allNewsCards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const excerpt = card.querySelector('.news-excerpt').textContent.toLowerCase();
                const fullText = card.querySelector('.news-full-text').textContent.toLowerCase();
                const date = card.querySelector('.news-date-badge').textContent.toLowerCase();
                
                const matches = title.includes(searchTerm) || 
                              excerpt.includes(searchTerm) || 
                              fullText.includes(searchTerm) ||
                              date.includes(searchTerm);

                card.style.display = matches ? '' : 'none';
                if (matches) newsHasResults = true;
            });

            // Search through announcements
            let announcementsHasResults = false;
            announcements.forEach(announcement => {
                const text = announcement.querySelector('.announcement-text').textContent.toLowerCase();
                const matches = text.includes(searchTerm);
                
                announcement.style.display = matches ? '' : 'none';
                if (matches) announcementsHasResults = true;
            });

            // Show/hide sections based on results
            document.querySelector('.news-swiper').style.display = newsHasResults ? '' : 'none';
            document.querySelector('.announcements-section').style.display = announcementsHasResults ? '' : 'none';
            
            // Show no results message if nothing matches
            hasResults = newsHasResults || announcementsHasResults;
            noResultsMessage.style.display = hasResults ? 'none' : 'block';
            
            // Update swiper after search
            newsSwiper.update();
        });
    }
});
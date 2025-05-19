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

    // Enhanced Read More/Less functionality with animation
    document.querySelectorAll('.read-more').forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.news-card');
            const textContainer = card.querySelector('.news-text');
            const excerpt = card.querySelector('.news-excerpt');
            const fullText = card.querySelector('.news-full-text');
            
            const isExpanded = card.classList.contains('expanded');
            
            if (!isExpanded) {
                const startHeight = textContainer.offsetHeight;
                excerpt.style.display = 'none';
                fullText.style.display = 'block';
                const endHeight = textContainer.offsetHeight;
                
                textContainer.style.height = startHeight + 'px';
                textContainer.style.overflow = 'hidden';
                textContainer.offsetHeight; // Trigger reflow
                
                textContainer.style.height = endHeight + 'px';
                
                setTimeout(() => {
                    textContainer.style.height = '';
                    textContainer.style.overflow = '';
                    card.classList.add('expanded');
                    this.innerHTML = 'Read Less <i class="fas fa-chevron-up"></i>';
                    newsSwiper.update();
                }, 300);
            } else {
                const startHeight = textContainer.offsetHeight;
                fullText.style.display = 'none';
                excerpt.style.display = 'block';
                const endHeight = textContainer.offsetHeight;
                
                textContainer.style.height = startHeight + 'px';
                textContainer.style.overflow = 'hidden';
                textContainer.offsetHeight; // Trigger reflow
                
                textContainer.style.height = endHeight + 'px';
                
                setTimeout(() => {
                    textContainer.style.height = '';
                    textContainer.style.overflow = '';
                    card.classList.remove('expanded');
                    this.innerHTML = 'Read More <i class="fas fa-chevron-down"></i>';
                    newsSwiper.update();
                }, 300);
            }
        });
    });

    // Enhanced Search functionality
    const newsSearch = document.getElementById('newsSearch');
    if (newsSearch) {
        const allNewsSlides = document.querySelectorAll('.swiper-slide');
        const announcements = document.querySelectorAll('.announcement-card');
        const noResultsMessage = document.getElementById('noResultsTemplate').cloneNode(true);
        noResultsMessage.id = '';
        noResultsMessage.style.display = 'none';
        document.querySelector('.news-swiper').parentNode.insertBefore(noResultsMessage, document.querySelector('.announcements-section'));

        function debounce(func, wait) {
            let timeout;
            return function() {
                const context = this, args = arguments;
                clearTimeout(timeout);
                timeout = setTimeout(() => func.apply(context, args), wait);
            };
        }

        newsSearch.addEventListener('input', debounce(function() {
            const searchTerm = this.value.trim().toLowerCase();
            let hasNewsResults = false;
            let hasAnnouncementResults = false;

            allNewsSlides.forEach(slide => {
                const title = slide.dataset.title || '';
                const date = slide.dataset.date || '';
                const content = slide.dataset.content || '';
                
                const matches = title.includes(searchTerm) || 
                              content.includes(searchTerm) ||
                              date.includes(searchTerm);

                slide.style.display = matches ? '' : 'none';
                if (matches) hasNewsResults = true;

                if (matches && searchTerm) {
                    highlightText(slide, searchTerm);
                } else {
                    removeHighlights(slide);
                }
            });

            announcements.forEach(announcement => {
                const text = announcement.querySelector('.announcement-text').textContent.toLowerCase();
                const matches = text.includes(searchTerm);
                
                announcement.style.display = matches ? '' : 'none';
                if (matches) hasAnnouncementResults = true;

                if (matches && searchTerm) {
                    highlightText(announcement.querySelector('.announcement-text'), searchTerm);
                } else {
                    removeHighlights(announcement.querySelector('.announcement-text'));
                }
            });

            document.querySelector('.news-swiper').style.display = hasNewsResults ? '' : 'none';
            document.querySelector('.announcements-section').style.display = hasAnnouncementResults ? '' : 'none';
            
            noResultsMessage.style.display = (hasNewsResults || hasAnnouncementResults) ? 'none' : 'block';
            newsSwiper.update();
        }, 300));

        function highlightText(element, searchTerm) {
            const regex = new RegExp(searchTerm, 'gi');
            const textNodes = [];
            
            const walker = document.createTreeWalker(
                element,
                NodeFilter.SHOW_TEXT,
                null,
                false
            );
            
            let node;
            while (node = walker.nextNode()) {
                textNodes.push(node);
            }
            
            textNodes.forEach(node => {
                if (node.parentNode.classList && 
                    (node.parentNode.classList.contains('highlight-text') || 
                     node.parentNode.classList.contains('highlight'))) {
                    return;
                }
                
                const text = node.nodeValue;
                if (regex.test(text)) {
                    const span = document.createElement('span');
                    span.className = 'highlight-text';
                    span.innerHTML = text.replace(regex, match => `<span class="highlight">${match}</span>`);
                    node.parentNode.replaceChild(span, node);
                }
            });
        }

        function removeHighlights(element) {
            const highlights = element.querySelectorAll('.highlight-text');
            highlights.forEach(highlight => {
                const parent = highlight.parentNode;
                while (highlight.firstChild) {
                    parent.insertBefore(highlight.firstChild, highlight);
                }
                parent.removeChild(highlight);
            });
        }
    }
});
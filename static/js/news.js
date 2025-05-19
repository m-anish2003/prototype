// news.js => Handles the search bar

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Swiper
    const newsSwiper = new Swiper('.news-swiper', {
        loop: true,
        slidesPerView: 1,
        spaceBetween: 20,
        pagination: { el: '.swiper-pagination', clickable: true },
        navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
        breakpoints: { 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }
    });

    // Read More/Less Functionality
    document.querySelector('.news-swiper').addEventListener('click', function(e) {
        const readMoreBtn = e.target.closest('.read-more');
        if (!readMoreBtn) return;

        const card = readMoreBtn.closest('.news-card');
        const fullText = card.querySelector('.news-full-text');
        const isExpanded = card.classList.toggle('expanded');

        fullText.style.display = isExpanded ? 'block' : 'none';
        readMoreBtn.innerHTML = isExpanded 
            ? 'Read Less <i class="fas fa-chevron-up"></i>' 
            : 'Read More <i class="fas fa-chevron-down"></i>';
        
        newsSwiper.update();
    });

    // Search Functionality
    const newsSearch = document.getElementById('newsSearch');
    if (newsSearch) {
        const allNewsSlides = Array.from(document.querySelectorAll('.swiper-slide'));
        const allAnnouncements = Array.from(document.querySelectorAll('.announcement-card'));
        const noResultsMessage = document.getElementById('noResultsTemplate').cloneNode(true);
        noResultsMessage.id = '';
        document.querySelector('.news-swiper').parentNode.insertBefore(noResultsMessage, document.querySelector('.announcements-section'));

        // Store original HTML to restore when search is cleared
        const originalContents = {
            news: allNewsSlides.map(slide => ({
                element: slide,
                html: slide.innerHTML
            })),
            announcements: allAnnouncements.map(ann => ({
                element: ann,
                html: ann.innerHTML
            }))
        };

        newsSearch.addEventListener('input', debounce(function(e) {
            const term = e.target.value.trim().toLowerCase();
            let hasResults = false;

            // Restore original content first (to remove any previous highlights)
            originalContents.news.forEach(item => {
                item.element.innerHTML = item.html;
            });
            originalContents.announcements.forEach(item => {
                item.element.innerHTML = item.html;
            });

            // If search is empty, show all and exit
            if (term === '') {
                allNewsSlides.forEach(slide => slide.style.display = '');
                allAnnouncements.forEach(ann => ann.style.display = '');
                noResultsMessage.style.display = 'none';
                document.querySelector('.news-swiper').style.display = '';
                document.querySelector('.announcements-section').style.display = '';
                newsSwiper.update();
                return;
            }

            // Search News
            originalContents.news.forEach(item => {
                const slideData = {
                    title: item.element.dataset.title || '',
                    content: item.element.dataset.content || '',
                    date: item.element.dataset.date || ''
                };
                
                const match = slideData.title.includes(term) ||
                             slideData.content.includes(term) ||
                             slideData.date.includes(term);
                
                item.element.style.display = match ? '' : 'none';
                if (match) hasResults = true;
                if (match) highlightText(item.element, term);
            });

            // Search Announcements
            originalContents.announcements.forEach(item => {
                const annData = {
                    text: item.element.dataset.text || '',
                    date: item.element.dataset.date || ''
                };
                
                const match = annData.text.includes(term) ||
                             annData.date.includes(term);
                
                item.element.style.display = match ? '' : 'none';
                if (match) hasResults = true;
                if (match) highlightText(item.element, term);
            });

            // Show/hide sections
            document.querySelector('.news-swiper').style.display = 
                originalContents.news.some(item => item.element.style.display !== 'none') ? '' : 'none';
            document.querySelector('.announcements-section').style.display = 
                originalContents.announcements.some(item => item.element.style.display !== 'none') ? '' : 'none';
            
            noResultsMessage.style.display = hasResults ? 'none' : 'block';
            newsSwiper.update();
        }, 300));

        function highlightText(element, term) {
            if (!term) return;
            
            // Create a tree walker to find all text nodes
            const treeWalker = document.createTreeWalker(
                element,
                NodeFilter.SHOW_TEXT,
                null,
                false
            );
            
            const textNodes = [];
            let currentNode;
            while (currentNode = treeWalker.nextNode()) {
                textNodes.push(currentNode);
            }
            
            // Process each text node
            textNodes.forEach(node => {
                if (node.parentNode.nodeName === 'SCRIPT' || 
                    node.parentNode.nodeName === 'STYLE' ||
                    node.parentNode.classList.contains('highlight')) {
                    return;
                }
                
                const text = node.nodeValue;
                if (text.toLowerCase().includes(term)) {
                    const span = document.createElement('span');
                    span.innerHTML = text.replace(
                        new RegExp(term, 'gi'),
                        match => `<span class="highlight">${match}</span>`
                    );
                    node.parentNode.replaceChild(span, node);
                }
            });
        }

        function debounce(func, delay) {
            let timeout;
            return function() {
                clearTimeout(timeout);
                timeout = setTimeout(() => func.apply(this, arguments), delay);
            };
        }
    }
});
document.addEventListener('DOMContentLoaded', function () {
    // Tab switching: Publication type buttons
    const buttons = document.querySelectorAll('.pub-type-btn');
    const sections = document.querySelectorAll('.pub-section');

    buttons.forEach(btn => {
        btn.addEventListener('click', function () {
            // Update active button
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Show corresponding publication section
            const type = btn.getAttribute('data-type');
            sections.forEach(sec => sec.classList.remove('active'));
            document.getElementById(`${type}-pubs`).classList.add('active');
        });
    });

    // ==============================
    // Filter publications by year and topic
    // ==============================
    const yearFilter = document.getElementById('year-filter');
    const topicFilter = document.getElementById('topic-filter');
    const pubCards = document.querySelectorAll('.pub-card');
    const pubYearGroups = document.querySelectorAll('.pub-year-group');

    function applyFilters() {
        const selectedYear = yearFilter.value;
        const selectedTopic = topicFilter.value.toLowerCase();

        pubYearGroups.forEach(group => {
            const groupYear = group.dataset.year;

            // Filter by year
            if (selectedYear === 'all' || groupYear === selectedYear) {
                group.style.display = 'block';

                let hasVisibleCards = false;

                // Filter individual cards by topic
                group.querySelectorAll('.pub-card').forEach(card => {
                    const cardTopics = card.dataset.topics.toLowerCase();
                    const showCard = (selectedTopic === 'all' || cardTopics.includes(selectedTopic));
                    
                    card.style.display = showCard ? 'block' : 'none';
                    if (showCard) hasVisibleCards = true;
                });

                // Hide year label if no cards are visible
                group.querySelector('.pub-year').style.display = hasVisibleCards ? 'block' : 'none';
            } else {
                group.style.display = 'none';
            }
        });
    }

    yearFilter.addEventListener('change', applyFilters);
    topicFilter.addEventListener('change', applyFilters);

    // ==============================
    // BibTeX modal pop-up
    // ==============================
    const modal = document.getElementById('bibtex-modal');
    const bibtexBtns = document.querySelectorAll('.pub-bibtex');
    const bibtexContent = document.getElementById('bibtex-content');
    const closeModal = document.querySelector('.close-modal');
    const copyBtn = document.getElementById('copy-bibtex');

    // Open modal and show BibTeX
    bibtexBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            bibtexContent.textContent = this.dataset.bibtex;
            modal.style.display = 'block';
        });
    });

    // Close modal on close button click
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    // Copy BibTeX to clipboard
    copyBtn.addEventListener('click', function() {
        navigator.clipboard.writeText(bibtexContent.textContent)
            .then(() => {
                this.textContent = 'Copied!';
                setTimeout(() => {
                    this.textContent = 'Copy to Clipboard';
                }, 2000);
            });
    });

    // Close modal when clicking outside of it
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});



// ==============================
// Search functionality
// ==============================
document.addEventListener('DOMContentLoaded', function () {
    // Initialize variables after DOM is loaded
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const pubCards = document.querySelectorAll('.pub-card');
    const pubYearGroups = document.querySelectorAll('.pub-year-group');
    const activePubSection = document.querySelector('.pub-section.active');

    function performSearch() {
        const query = searchInput.value.toLowerCase().trim();
        const activeSection = document.querySelector('.pub-section.active');
        
        if (!query) {
            // If search is empty, show all publications in active section
            activeSection.querySelectorAll('.pub-card').forEach(card => {
                card.style.display = 'block';
            });
            activeSection.querySelectorAll('.pub-year-group').forEach(group => {
                group.style.display = 'block';
                const hasVisibleCards = group.querySelector('.pub-card[style="display: block;"]') !== null;
                group.querySelector('.pub-year').style.display = hasVisibleCards ? 'block' : 'none';
            });
            return;
        }

        let anyResultsFound = false;
        
        activeSection.querySelectorAll('.pub-year-group').forEach(group => {
            let hasVisibleCardsInGroup = false;
            
            group.querySelectorAll('.pub-card').forEach(card => {
                const title = card.querySelector('.pub-title').textContent.toLowerCase();
                const authors = card.querySelector('.pub-authors').textContent.toLowerCase();
                const venue = card.querySelector('.pub-venue').textContent.toLowerCase();
                const topics = card.dataset.topics.toLowerCase();
                
                const matches = title.includes(query) || 
                                authors.includes(query) || 
                                venue.includes(query) || 
                                topics.includes(query);
                
                card.style.display = matches ? 'block' : 'none';
                if (matches) {
                    hasVisibleCardsInGroup = true;
                    anyResultsFound = true;
                }
            });

            // Show/hide year group based on matches
            group.style.display = hasVisibleCardsInGroup ? 'block' : 'none';
            group.querySelector('.pub-year').style.display = hasVisibleCardsInGroup ? 'block' : 'none';
        });

        // Show "No results" message if needed
        const noResultsMsg = document.getElementById('no-results-message');
        if (noResultsMsg) {
            noResultsMsg.style.display = anyResultsFound ? 'none' : 'block';
        }
    }

    // Search on button click
    searchBtn.addEventListener('click', performSearch);

    // Search on Enter key
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // Clear search when switching between journal/conference tabs
    const pubTypeBtns = document.querySelectorAll('.pub-type-btn');
    pubTypeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            searchInput.value = '';
            performSearch(); // This will reset the view
        });
    });
});
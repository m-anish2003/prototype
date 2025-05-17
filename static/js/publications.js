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
            
            // Clear search when switching tabs
            searchInput.value = '';
            applyFilters();
        });
    });

    // ==============================
    // Combined filter and search functionality
    // ==============================
    const yearFilter = document.getElementById('year-filter');
    const topicFilter = document.getElementById('topic-filter');
    const searchInput = document.getElementById('search-input');
    const pubYearGroups = document.querySelectorAll('.pub-year-group');
    const noResultsMsg = document.getElementById('no-results-message');

    function applyFilters() {
        const selectedYear = yearFilter.value;
        const selectedTopic = topicFilter.value.toLowerCase();
        const searchQuery = searchInput.value.toLowerCase().trim();
        const activeSection = document.querySelector('.pub-section.active');
        
        let anyResultsFound = false;

        pubYearGroups.forEach(group => {
            // Skip groups not in active section
            if (!activeSection.contains(group)) return;

            const groupYear = group.dataset.year;
            let hasVisibleCardsInGroup = false;

            // Filter by year
            if (selectedYear === 'all' || groupYear === selectedYear) {
                group.style.display = 'block';

                // Filter individual cards by topic and search
                group.querySelectorAll('.pub-card').forEach(card => {
                    const cardTopics = card.dataset.topics.toLowerCase();
                    const title = card.querySelector('.pub-title').textContent.toLowerCase();
                    const authors = card.querySelector('.pub-authors').textContent.toLowerCase();
                    const venue = card.querySelector('.pub-venue').textContent.toLowerCase();
                    
                    // Check topic match
                    const matchesTopic = selectedTopic === 'all' || cardTopics.includes(selectedTopic);
                    
                    // Check search match
                    const matchesSearch = searchQuery === '' || 
                                         title.includes(searchQuery) || 
                                         authors.includes(searchQuery) || 
                                         venue.includes(searchQuery) || 
                                         cardTopics.includes(searchQuery);
                    
                    const showCard = matchesTopic && matchesSearch;
                    card.style.display = showCard ? 'block' : 'none';
                    
                    if (showCard) {
                        hasVisibleCardsInGroup = true;
                        anyResultsFound = true;
                    }
                });

                // Show/hide year group based on matches
                group.style.display = hasVisibleCardsInGroup ? 'block' : 'none';
                group.querySelector('.pub-year').style.display = hasVisibleCardsInGroup ? 'block' : 'none';
            } else {
                group.style.display = 'none';
            }
        });

        // Show "No results" message if needed
        if (noResultsMsg) {
            noResultsMsg.style.display = anyResultsFound ? 'none' : 'block';
        }
    }

    // Event listeners for all filters and search
    yearFilter.addEventListener('change', applyFilters);
    topicFilter.addEventListener('change', applyFilters);
    
    // Dynamic search on input with debounce
    let searchTimeout;
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(applyFilters, 300);
    });

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

    // Initialize
    applyFilters();
});
document.addEventListener('DOMContentLoaded', function () {
    // DOM Elements
    const buttons = document.querySelectorAll('.pub-type-btn');
    const sections = document.querySelectorAll('.pub-section');
    const yearFilter = document.getElementById('year-filter');
    const topicFilter = document.getElementById('topic-filter');
    const searchInput = document.getElementById('search-input');
    const pubYearGroups = document.querySelectorAll('.pub-year-group');
    const noResultsMsg = document.getElementById('no-results-message');
    const modal = document.getElementById('bibtex-modal');
    const bibtexBtns = document.querySelectorAll('.pub-bibtex');
    const bibtexContent = document.getElementById('bibtex-content');
    const closeModal = document.querySelector('.close-modal');
    const copyBtn = document.getElementById('copy-bibtex');
    const refreshBtn = document.getElementById('refresh-btn');

    // Tab switching functionality
    function setupTabSwitching() {
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
                if (searchInput) searchInput.value = '';
                applyFilters();
            });
        });
    }

    // Filter and search functionality
    function applyFilters() {
        if (!yearFilter || !topicFilter || !searchInput || !pubYearGroups) return;

        const selectedYear = yearFilter.value;
        const selectedTopic = topicFilter.value.toLowerCase();
        const searchQuery = searchInput.value.toLowerCase().trim();
        const activeSection = document.querySelector('.pub-section.active');
        
        let anyResultsFound = false;

        pubYearGroups.forEach(group => {
            // Skip groups not in active section
            if (!activeSection || !activeSection.contains(group)) return;

            const groupYear = group.dataset.year;
            let hasVisibleCardsInGroup = false;

            // Filter by year
            if (selectedYear === 'all' || groupYear === selectedYear) {
                group.style.display = 'block';

                // Filter individual cards by topic and search
                group.querySelectorAll('.pub-card').forEach(card => {
                    const cardTopics = card.dataset.topics?.toLowerCase() || '';
                    const title = card.querySelector('.pub-title')?.textContent.toLowerCase() || '';
                    const authors = card.querySelector('.pub-authors')?.textContent.toLowerCase() || '';
                    const venue = card.querySelector('.pub-venue')?.textContent.toLowerCase() || '';
                    
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
                const yearElement = group.querySelector('.pub-year');
                if (yearElement) {
                    yearElement.style.display = hasVisibleCardsInGroup ? 'block' : 'none';
                }
            } else {
                group.style.display = 'none';
            }
        });

        // Show "No results" message if needed
        if (noResultsMsg) {
            noResultsMsg.style.display = anyResultsFound ? 'none' : 'block';
        }
    }

    function setupFilters() {
        if (!yearFilter || !topicFilter || !searchInput) return;

        // Event listeners for all filters and search
        yearFilter.addEventListener('change', applyFilters);
        topicFilter.addEventListener('change', applyFilters);
        
        // Dynamic search on input with debounce
        let searchTimeout;
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(applyFilters, 300);
        });
    }

    // BibTeX modal functionality
    function setupBibtexModal() {
        if (!modal || !bibtexBtns || !bibtexContent || !closeModal || !copyBtn) return;

        // Open modal and show BibTeX
        bibtexBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                if (this.dataset.bibtex) {
                    bibtexContent.textContent = this.dataset.bibtex;
                    modal.style.display = 'block';
                }
            });
        });

        // Close modal on close button click
        closeModal.addEventListener('click', function() {
            modal.style.display = 'none';
        });

        // Copy BibTeX to clipboard
        copyBtn.addEventListener('click', async function() {
            try {
                await navigator.clipboard.writeText(bibtexContent.textContent);
                const originalText = this.textContent;
                this.textContent = 'Copied!';
                setTimeout(() => {
                    this.textContent = originalText;
                }, 2000);
            } catch (err) {
                console.error('Failed to copy text: ', err);
            }
        });

        // Close modal when clicking outside of it
        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    }

    // Refresh publications functionality
    async function refreshPublications() {
        if (!refreshBtn) return;

        try {
            refreshBtn.classList.add('refreshing');
            refreshBtn.disabled = true;
            
            const response = await fetch('/refresh_publications', {
                method: 'POST'
            });
            
            if (response.ok) {
                window.location.reload();
            } else {
                alert('Failed to refresh publications. Please try again.');
            }
        } catch (error) {
            console.error('Refresh error:', error);
            alert('An error occurred while refreshing publications.');
        } finally {
            refreshBtn.classList.remove('refreshing');
            refreshBtn.disabled = false;
        }
    }

    function setupRefreshButton() {
        if (refreshBtn) {
            refreshBtn.addEventListener('click', refreshPublications);
        }
    }

    // Initialize all functionality
    function init() {
        setupTabSwitching();
        setupFilters();
        setupBibtexModal();
        setupRefreshButton();
        applyFilters(); // Initial filter application
    }

    init();
});

// Publications Chart
function renderPublicationsChart() {
    // Count publications by year
    const yearCounts = {};
    
    // Get all publication cards
    document.querySelectorAll('.pub-card').forEach(card => {
        const year = card.querySelector('.pub-venue').textContent.match(/\d{4}/)?.[0];
        if (year) {
            yearCounts[year] = (yearCounts[year] || 0) + 1;
        }
    });
    
    // Prepare data for chart
    const years = Object.keys(yearCounts).sort();
    const counts = years.map(year => yearCounts[year]);
    
    // Create chart
    const ctx = document.getElementById('publicationsChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: years,
            datasets: [{
                label: 'Number of Publications',
                data: counts,
                backgroundColor: '#2874A6',
                borderColor: '#1F618D',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.parsed.y} publication${context.parsed.y !== 1 ? 's' : ''}`;
                        }
                    }
                }
            }
        }
    });
}

// Call this after the page loads
document.addEventListener('DOMContentLoaded', renderPublicationsChart);
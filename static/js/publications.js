// publications.js => Handles all the filters, search bar and chart related functions.

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

    // Enhanced refresh publications functionality with mobile support
    async function refreshPublications(event) {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }

        if (!refreshBtn) return;

        try {
            // Visual feedback
            refreshBtn.classList.add('refreshing');
            refreshBtn.disabled = true;
            refreshBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Refreshing...';
            
            const response = await fetch('/refresh_publications', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                },
                credentials: 'same-origin'
            });
            
            if (response.ok) {
                refreshBtn.innerHTML = '<i class="fas fa-check"></i> Success!';
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            } else {
                throw new Error('Server response not OK');
            }
        } catch (error) {
            console.error('Refresh error:', error);
            refreshBtn.innerHTML = '<i class="fas fa-exclamation-circle"></i> Failed';
            setTimeout(() => {
                resetRefreshButton();
            }, 2000);
        }
    }

    function resetRefreshButton() {
        if (refreshBtn) {
            refreshBtn.classList.remove('refreshing');
            refreshBtn.disabled = false;
            refreshBtn.innerHTML = '<i class="fas fa-sync-alt"></i> Refresh Publications';
        }
    }

    function setupRefreshButton() {
        if (!refreshBtn) return;

        // State management
        let isRefreshing = false;
        let lastTap = 0;
        const tapDelay = 1000; // 1 second cooldown

        // Unified handler for all interaction types
        function handleRefresh(event) {
            event.preventDefault();
            event.stopPropagation();
            
            // Prevent double triggers
            if (isRefreshing) return;
            
            // Mobile double-tap prevention
            const now = Date.now();
            if (now - lastTap < tapDelay) return;
            lastTap = now;

            // Visual feedback
            refreshBtn.classList.add('touch-active');
            isRefreshing = true;

            // Execute refresh
            refreshPublications(event).finally(() => {
                refreshBtn.classList.remove('touch-active');
                isRefreshing = false;
            });
        }

        // Universal event listeners
        refreshBtn.addEventListener('click', handleRefresh);
        refreshBtn.addEventListener('touchend', handleRefresh);

        // Cleanup lingering states
        refreshBtn.addEventListener('touchcancel', () => {
            refreshBtn.classList.remove('touch-active');
            isRefreshing = false;
        });
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

// Publications chart rendering
function renderPublicationsChart() {
    // Count publications by year
    const yearCounts = {};
    
    document.querySelectorAll('.pub-year-group').forEach(group => {
        const year = group.dataset.year;
        if (year) {
            const pubCount = group.querySelectorAll('.pub-card').length;
            yearCounts[year] = (yearCounts[year] || 0) + pubCount;
        }
    });

    // Prepare data for chart
    const years = Object.keys(yearCounts).sort();
    const counts = years.map(year => yearCounts[year]);
    
    // Get the chart canvas
    const ctx = document.getElementById('publicationsChart');
    if (!ctx) return;
    
    // Destroy previous chart instance if it exists
    if (ctx.chart) {
        ctx.chart.destroy();
    }

    // Create new chart
    ctx.chart = new Chart(ctx.getContext('2d'), {
        type: 'bar',
        data: {
            labels: years,
            datasets: [{
                label: 'Publications',
                data: counts,
                backgroundColor: '#2874A6',
                borderColor: '#1F618D',
                borderWidth: 1,
                borderRadius: 4,
                barPercentage: 0.8,
                categoryPercentage: 0.9
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
                }
            }
        }
    });
}

// Initialize chart when DOM is loaded
document.addEventListener('DOMContentLoaded', renderPublicationsChart);
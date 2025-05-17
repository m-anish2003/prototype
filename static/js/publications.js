document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('.pub-type-btn');
    const sections = document.querySelectorAll('.pub-section');

    buttons.forEach(btn => {
        btn.addEventListener('click', function () {
            // Activate selected button
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Show corresponding section
            const type = btn.getAttribute('data-type');
            sections.forEach(sec => sec.classList.remove('active'));
            document.getElementById(`${type}-pubs`).classList.add('active');
        });
    });

    // Filter functionality
    const yearFilter = document.getElementById('year-filter');
    const topicFilter = document.getElementById('topic-filter');
    const pubCards = document.querySelectorAll('.pub-card');
    const pubYearGroups = document.querySelectorAll('.pub-year-group');

    function applyFilters() {
        const selectedYear = yearFilter.value;
        const selectedTopic = topicFilter.value.toLowerCase();
        
        pubYearGroups.forEach(group => {
            const groupYear = group.dataset.year;
            
            if (selectedYear === 'all' || groupYear === selectedYear) {
                group.style.display = 'block';
                
                let hasVisibleCards = false;
                group.querySelectorAll('.pub-card').forEach(card => {
                    const cardTopics = card.dataset.topics.toLowerCase();
                    const showCard = (selectedTopic === 'all' || cardTopics.includes(selectedTopic));
                    
                    card.style.display = showCard ? 'block' : 'none';
                    if (showCard) hasVisibleCards = true;
                });
                
                group.querySelector('.pub-year').style.display = hasVisibleCards ? 'block' : 'none';
            } else {
                group.style.display = 'none';
            }
        });
    }

    yearFilter.addEventListener('change', applyFilters);
    topicFilter.addEventListener('change', applyFilters);

    // BibTeX modal functionality
    const modal = document.getElementById('bibtex-modal');
    const bibtexBtns = document.querySelectorAll('.pub-bibtex');
    const bibtexContent = document.getElementById('bibtex-content');
    const closeModal = document.querySelector('.close-modal');
    const copyBtn = document.getElementById('copy-bibtex');

    bibtexBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            bibtexContent.textContent = this.dataset.bibtex;
            modal.style.display = 'block';
        });
    });

    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    copyBtn.addEventListener('click', function() {
        navigator.clipboard.writeText(bibtexContent.textContent)
            .then(() => {
                this.textContent = 'Copied!';
                setTimeout(() => {
                    this.textContent = 'Copy to Clipboard';
                }, 2000);
            });
    });

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});
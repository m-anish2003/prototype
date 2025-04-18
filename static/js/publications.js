document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('.pub-type-btn');
    const sections = document.querySelectorAll('.pub-section');
    const filters = document.querySelector('.filters');

    buttons.forEach(btn => {
        btn.addEventListener('click', function () {
            // Activate selected button
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Show corresponding section
            const type = btn.getAttribute('data-type');
            sections.forEach(sec => sec.classList.remove('active'));
            document.getElementById(`${type}-pubs`).classList.add('active');

            // Show/hide filters
            if (type === 'journal' || type === 'conference') {
                filters.style.display = 'flex';
            } else {
                filters.style.display = 'none';
            }
        });
    });

    // INITIAL STATE: Ensure filters are shown only for journal
    const initialType = document.querySelector('.pub-type-btn.active').getAttribute('data-type');
    if (initialType === 'journal' || initialType === 'conference') {
        filters.style.display = 'flex';
    } else {
        filters.style.display = 'none';
    }
});




// Filter functionality
const yearFilter = document.getElementById('year-filter'); // Select the year filter dropdown
const topicFilter = document.getElementById('topic-filter'); // Select the topic filter dropdown
const pubCards = document.querySelectorAll('.pub-card'); // Select all publication cards
const pubYearGroups = document.querySelectorAll('.pub-year-group'); // Select all publication year groups

// Function to apply the selected filters
function applyFilters() {
    const selectedYear = yearFilter.value; // Get selected year from dropdown
    const selectedTopic = topicFilter.value.toLowerCase(); // Get selected topic from dropdown (lowercased)
    
    // Loop through each year group
    pubYearGroups.forEach(group => {
        const groupYear = group.dataset.year; // Get the year of the group
        
        // If selected year matches or is 'all', display the group
        if (selectedYear === 'all' || groupYear === selectedYear) {
            group.style.display = 'block'; // Show the group
            
            let hasVisibleCards = false; // Flag to track if there are visible cards in the group
            group.querySelectorAll('.pub-card').forEach(card => {
                const cardTopics = card.dataset.topics.toLowerCase(); // Get topics of the card
                const showCard = (selectedTopic === 'all' || cardTopics.includes(selectedTopic)); // Check if card matches the selected topic
                
                // Show or hide the card based on the filter
                card.style.display = showCard ? 'block' : 'none';
                if (showCard) hasVisibleCards = true; // Update flag if the card is visible
            });
            
            // Hide the year heading if no cards are visible in the group
            group.querySelector('.pub-year').style.display = hasVisibleCards ? 'block' : 'none';
        } else {
            group.style.display = 'none'; // Hide the group if the year does not match
        }
    });
}

// Event listeners for the filter dropdowns to apply the filter on change
yearFilter.addEventListener('change', applyFilters);
topicFilter.addEventListener('change', applyFilters);

// BibTeX modal functionality
const modal = document.getElementById('bibtex-modal'); // Select the BibTeX modal
const bibtexBtns = document.querySelectorAll('.pub-bibtex'); // Select all BibTeX buttons
const bibtexContent = document.getElementById('bibtex-content'); // Select the element for displaying BibTeX content
const closeModal = document.querySelector('.close-modal'); // Select the close button for the modal
const copyBtn = document.getElementById('copy-bibtex'); // Select the copy button

// Add event listeners to each BibTeX button
bibtexBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        bibtexContent.textContent = this.dataset.bibtex; // Set the BibTeX content in the modal
        modal.style.display = 'block'; // Show the modal
    });
});

// Close the modal when the close button is clicked
closeModal.addEventListener('click', function() {
    modal.style.display = 'none'; // Hide the modal
});

// Copy BibTeX content to clipboard and update button text
copyBtn.addEventListener('click', function() {
    navigator.clipboard.writeText(bibtexContent.textContent) // Copy content to clipboard
        .then(() => {
            this.textContent = 'Copied!'; // Change button text after copying
            setTimeout(() => {
                this.textContent = 'Copy to Clipboard'; // Reset button text after 2 seconds
            }, 2000);
        });
});

// Close the modal if the user clicks outside the modal area
window.addEventListener('click', function(event) {
    if (event.target === modal) {
        modal.style.display = 'none'; // Hide the modal if clicked outside
    }
});
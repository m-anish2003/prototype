// talks.js - Handles search filter for talks

// Wait until the full page content is loaded
document.addEventListener("DOMContentLoaded", () => {
    // Get reference to the search input field
    const searchInput = document.getElementById("searchInput");

    // Get all talk entries from the page
    const talkEntries = document.querySelectorAll(".talk-entry");

    // Add input event listener to the search field
    searchInput.addEventListener("input", () => {
        // Convert the user's search term to lowercase for case-insensitive matching
        const searchTerm = searchInput.value.toLowerCase();

        // Loop through each talk entry and toggle its visibility based on search match
        talkEntries.forEach(entry => {
            // Get the text content of the talk entry and convert to lowercase
            const text = entry.innerText.toLowerCase();

            // Check if the entry contains the search term
            const isVisible = text.includes(searchTerm);

            // Show or hide the entry based on whether it matches
            entry.style.display = isVisible ? "block" : "none";
        });

        // For each year section, check if it has any visible talk entries
        const yearSections = document.querySelectorAll(".year-section");
        yearSections.forEach(section => {
            // Select visible talk entries within the current section
            const visibleItems = section.querySelectorAll(".talk-entry:not([style*='display: none'])");

            // Show the section only if it contains at least one visible entry
            section.style.display = visibleItems.length ? "block" : "none";
        });
    });
});

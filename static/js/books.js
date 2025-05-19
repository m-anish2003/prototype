// books.js => Handles the search bar

document.addEventListener("DOMContentLoaded", function () {
    // Get DOM elements for search input, book cards, page info, and navigation buttons
    const searchInput = document.getElementById("searchInput");
    const bookCards = document.querySelectorAll(".book-card");
    const pageInfo = document.getElementById("pageInfo");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    // Set up pagination parameters
    const booksPerPage = 4;
    let currentPage = 1;

    // Function to filter books based on search query
    function filterBooks() {
      const query = searchInput.value.toLowerCase(); // Get the lowercase search query
      bookCards.forEach(card => {
        const title = card.getAttribute("data-title").toLowerCase(); // Get book title for comparison
        card.style.display = title.includes(query) ? "block" : "none"; // Show or hide based on title match
      });
      paginateBooks(); // Call pagination after filtering
    }

    // Function to handle pagination logic
    function paginateBooks() {
      const visibleCards = Array.from(bookCards).filter(card => card.style.display !== "none"); // Get visible books
      const totalPages = Math.ceil(visibleCards.length / booksPerPage); // Calculate total number of pages

      // Display only the books for the current page
      visibleCards.forEach((card, index) => {
        card.style.display = (index >= (currentPage - 1) * booksPerPage && index < currentPage * booksPerPage) ? "block" : "none";
      });

      // Update page info (e.g., "Page 1 of 3")
      pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;

      // Enable/disable the pagination buttons based on current page
      prevBtn.disabled = currentPage === 1;
      nextBtn.disabled = currentPage === totalPages;
    }

    // Event listener for search input (to filter books)
    searchInput.addEventListener("input", () => {
      currentPage = 1; // Reset to the first page on new search
      filterBooks(); // Re-filter the books
    });

    // Event listener for previous page button
    prevBtn.addEventListener("click", () => {
      currentPage--; // Decrease current page
      paginateBooks(); // Update pagination
    });

    // Event listener for next page button
    nextBtn.addEventListener("click", () => {
      currentPage++; // Increase current page
      paginateBooks(); // Update pagination
    });

    // Initial render of filtered and paginated books
    filterBooks();
});

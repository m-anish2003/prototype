function filterEntries(type) {
  const entries = document.querySelectorAll('.entry-item');
  const buttons = document.querySelectorAll('.filter-buttons button');

  // Update entries visibility
  entries.forEach(entry => {
      entry.style.display = (type === 'all' || entry.classList.contains(type)) ? 'block' : 'none';
  });

  // Highlight active button
  buttons.forEach(button => {
      button.classList.remove('active');
      if (button.textContent.toLowerCase().includes(type)) {
          button.classList.add('active');
      }
  });

  // Special case for 'All'
  if (type === 'all') {
      buttons.forEach(button => {
          if (button.textContent.toLowerCase() === 'all') {
              button.classList.add('active');
          }
      });
  }
}

// 👇 Call when page is loaded to highlight "All" by default
document.addEventListener('DOMContentLoaded', () => {
  filterEntries('all');
});

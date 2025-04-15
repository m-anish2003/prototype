/* ===========================
   Responsive Navbar Toggle
=========================== */
function toggleMenu() {
    const navbar = document.getElementById('navbar');
    navbar.classList.toggle('active');
}


/* ===========================
   Hero Carousel Logic
=========================== */
let currentSlide = 0;
const slides = document.querySelectorAll(".carousel-image");
const dots = document.querySelectorAll(".dot");

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle("active", i === index);
        dots[i].classList.toggle("active", i === index);
    });
    currentSlide = index;
}

function nextSlide() {
    let next = (currentSlide + 1) % slides.length;
    showSlide(next);
}

function prevSlide() {
    let prev = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(prev);
}

function setSlide(index) {
    showSlide(index);
}

setInterval(nextSlide, 4000); // Auto-play every 4 seconds


/* ===========================
   DOM Content Loaded: News Swiper + Expandable Cards
=========================== */
document.addEventListener('DOMContentLoaded', function () {
    // News Slider using Swiper
    if (document.querySelector('.news-swiper')) {
        new Swiper('.news-swiper', {
            loop: true,
            autoplay: { delay: 5000 },
            slidesPerView: 1,
            spaceBetween: 20,
            pagination: { el: '.swiper-pagination' },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            },
            breakpoints: {
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 }
            }
        });
    }

    // Expandable Read More / Read Less
    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('read-more')) {
            const excerpt = e.target.closest('.news-content').querySelector('.news-excerpt');
            excerpt.classList.toggle('expanded');
            e.target.textContent = excerpt.classList.contains('expanded')
                ? 'Read Less'
                : 'Read More';
        }
    });
});

// This is for the toggle button on research and projects page
function showSection(section) {
    document.getElementById('researchSection').style.display = section === 'research' ? 'block' : 'none';
    document.getElementById('projectsSection').style.display = section === 'projects' ? 'block' : 'none';

    document.getElementById('researchBtn').classList.toggle('active', section === 'research');
    document.getElementById('projectsBtn').classList.toggle('active', section === 'projects');
}


// This is for the toggle button on the talks and writings page
function showEngage(section) {
    const sections = ['seminars', 'talks', 'blogs'];
    sections.forEach(s => {
        document.getElementById(s + 'Section').style.display = section === s ? 'block' : 'none';
        document.getElementById(s + 'Btn').classList.toggle('active', section === s);
    });
}


// Enhanced Project Filtering
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        // Update active button
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        const filter = this.dataset.filter;
        const projects = document.querySelectorAll('.project-card');
        
        projects.forEach(project => {
            const status = project.dataset.status;
            const type = project.dataset.type;
            
            if (filter === 'all' || 
                status === filter || 
                type.includes(filter)) {
                project.style.display = 'block';
                setTimeout(() => {
                    project.style.opacity = '1';
                    project.style.transform = 'translateY(0)';
                }, 50);
            } else {
                project.style.opacity = '0';
                project.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    project.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Publication type switching
    const pubTypeBtns = document.querySelectorAll('.pub-type-btn');
    const pubSections = document.querySelectorAll('.pub-section');
    
    pubTypeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            pubTypeBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const type = this.dataset.type;
            pubSections.forEach(section => {
                section.classList.remove('active');
                if (section.id === `${type}-pubs`) {
                    section.classList.add('active');
                }
            });
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
                
                // Hide year heading if no cards visible
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

/*Books .js code from here*/
document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("searchInput");
    const bookCards = document.querySelectorAll(".book-card");
    const pageInfo = document.getElementById("pageInfo");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
  
    const booksPerPage = 4;
    let currentPage = 1;
  
    function filterBooks() {
      const query = searchInput.value.toLowerCase();
      bookCards.forEach(card => {
        const title = card.getAttribute("data-title");
        card.style.display = title.includes(query) ? "block" : "none";
      });
      paginateBooks();
    }
  
    function paginateBooks() {
      const visibleCards = Array.from(bookCards).filter(card => card.style.display !== "none");
      const totalPages = Math.ceil(visibleCards.length / booksPerPage);
  
      visibleCards.forEach((card, index) => {
        card.style.display = (index >= (currentPage - 1) * booksPerPage && index < currentPage * booksPerPage) ? "block" : "none";
      });
  
      pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
      prevBtn.disabled = currentPage === 1;
      nextBtn.disabled = currentPage === totalPages;
    }
  
    searchInput.addEventListener("input", () => {
      currentPage = 1;
      filterBooks();
    });
  
    prevBtn.addEventListener("click", () => {
      currentPage--;
      paginateBooks();
    });
  
    nextBtn.addEventListener("click", () => {
      currentPage++;
      paginateBooks();
    });
  
    // Initial render
    filterBooks();
  });
  


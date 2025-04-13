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

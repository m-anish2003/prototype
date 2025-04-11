/* ===========================
   Responsive Navbar Toggle
=========================== */
function toggleMenu() {
    const navbar = document.getElementById('navbar');
    navbar.classList.toggle('active');
}


/* ===========================
   Carousel Logic
=========================== */
let currentSlide = 0;
const slides = document.querySelectorAll(".carousel-image");
const dots = document.querySelectorAll(".dot");

// Show the slide at the specified index
function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle("active", i === index);
        dots[i].classList.toggle("active", i === index);
    });
    currentSlide = index;
}

// Show next slide (loops back to first)
function nextSlide() {
    let next = (currentSlide + 1) % slides.length;
    showSlide(next);
}

// Show previous slide (loops to last if at start)
function prevSlide() {
    let prev = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(prev);
}

// Set slide manually (used by dots)
function setSlide(index) {
    showSlide(index);
}

// ===========================
// Auto-play every 4 seconds
// ===========================
setInterval(nextSlide, 4000);

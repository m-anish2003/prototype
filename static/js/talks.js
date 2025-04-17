// Toggle visibility of engagement sections and update active button
function showEngage(section) {
    const sections = ['seminars', 'talks', 'blogs'];

    sections.forEach(s => {
        document.getElementById(s + 'Section').style.display = section === s ? 'block' : 'none';
        document.getElementById(s + 'Btn').classList.toggle('active', section === s);
    });
}

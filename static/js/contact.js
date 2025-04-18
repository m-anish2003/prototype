// contact.js

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const messageDisplay = document.getElementById('formMessage');
  
    form.addEventListener('submit', function (e) {
      e.preventDefault();
  
      const name = form.name.value.trim();
      const subject = form.subject.value.trim();
      const message = form.message.value.trim();
  
      if (!name || !subject || !message) {
        messageDisplay.textContent = "Please fill in all fields.";
        messageDisplay.style.color = "#e74c3c";
        return;
      }
  
      // Simulate successful submission
      messageDisplay.textContent = "Your message has been sent successfully!";
      messageDisplay.style.color = "#27ae60";
  
      // Reset form
      form.reset();
    });
  });
  
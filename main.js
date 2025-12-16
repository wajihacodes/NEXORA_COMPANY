document.addEventListener('DOMContentLoaded', function () {
  // Intersection Observer for scroll animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // Only animate once
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll('.reveal');
  animatedElements.forEach((el) => observer.observe(el));

  // Navbar background change on scroll
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('shadow-lg');
      navbar.style.background = 'rgba(10, 11, 20, 0.6)'; // Scrolled: Semi-transparent dark
    } else {
      navbar.classList.remove('shadow-lg');
      navbar.style.background = 'rgba(10, 11, 20, 0.2)'; // Top: Transparent dark
    }
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    });
  });

  // Contact Form Submission -> Direct SMS
  const contactForm = document.querySelector('form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = document.getElementById('nameInput').value;
      const email = document.getElementById('emailInput').value;
      const details = document.getElementById('floatingTextarea2').value;

      // Construct SMS Message
      const phoneNumber = '+923177760506';
      const text = `New Project Inquiry\n\nName: ${name}\nEmail: ${email}\nDetails: ${details}`;
      const encodedText = encodeURIComponent(text);

      // Determine separator based on device (rough check) or stick to standard ?body=
      // iOS often needs &body=, others ?body=.
      // A safe bet for modern browsers/OS handling is often just trying one.
      // Let's use the standard ?body=
      const smsUrl = `sms:${phoneNumber}?body=${encodedText}`;

      // Button Animation
      const btn = this.querySelector('button[type="submit"]');
      const originalText = btn.innerText;

      btn.innerText = 'Opening Messages...';
      btn.disabled = true;

      // Redirect
      setTimeout(() => {
        window.location.href = smsUrl; // Window.open might be blocked for custom protocols, location usually works better for SMS

        // Reset Button
        btn.innerText = 'Message Opened!';
        setTimeout(() => {
          this.reset();
          btn.innerText = originalText;
          btn.disabled = false;
        }, 2000);
      }, 1000);
    });
  }
});

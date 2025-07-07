// Smooth scroll for nav links
const navLinks = document.querySelectorAll('.nav-links a');
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Sticky navbar effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Back to top button
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTop.style.display = 'block';
  } else {
    backToTop.style.display = 'none';
  }
});
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Section fade-in on scroll
const sections = document.querySelectorAll('section');
const fadeInOnScroll = () => {
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      section.style.opacity = 1;
      section.style.transform = 'none';
    }
  });
};
window.addEventListener('scroll', fadeInOnScroll);
window.addEventListener('load', fadeInOnScroll);

// Animate headline on load
window.addEventListener('DOMContentLoaded', () => {
  const headline = document.querySelector('.dynamic-headline');
  if (headline) {
    headline.style.opacity = 0;
    setTimeout(() => {
      headline.style.opacity = 1;
    }, 400);
  }
});

// Typing animation for hero section
const phrases = [
  'AIML Enthusiast',
  'Software Developer',
  'Data Analyst',
  'Machine Learning Engineer',
];
let currentPhrase = 0;
let currentChar = 0;
let isDeleting = false;
const typedText = document.getElementById('typed-text');
const cursor = document.querySelector('.typed-cursor');

function typeLoop() {
  if (!typedText) return;
  const fullText = phrases[currentPhrase];
  if (isDeleting) {
    typedText.textContent = fullText.substring(0, currentChar - 1);
    currentChar--;
    if (currentChar === 0) {
      isDeleting = false;
      currentPhrase = (currentPhrase + 1) % phrases.length;
      setTimeout(typeLoop, 500);
      return;
    }
  } else {
    typedText.textContent = fullText.substring(0, currentChar + 1);
    currentChar++;
    if (currentChar === fullText.length) {
      isDeleting = true;
      setTimeout(typeLoop, 1200);
      return;
    }
  }
  setTimeout(typeLoop, isDeleting ? 40 : 80);
}

window.addEventListener('DOMContentLoaded', () => {
  if (typedText) {
    typedText.textContent = '';
    currentPhrase = 0;
    currentChar = 0;
    isDeleting = false;
    typeLoop();
  }
});

document.addEventListener('DOMContentLoaded', function () {
  const aboutCards = document.querySelectorAll('.about-card');
  if (aboutCards.length) {
    // Ensure all cards start with fade-out
    aboutCards.forEach(card => card.classList.add('fade-out'));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-up');
          entry.target.classList.remove('fade-out');
        } else {
          entry.target.classList.remove('fade-in-up');
          entry.target.classList.add('fade-out');
        }
      });
    }, {
      threshold: 0.3
    });
    aboutCards.forEach(card => {
      observer.observe(card);
    });
  }
}); 

// === Skill Cards Pop Animation ===
document.addEventListener('DOMContentLoaded', function () {
  const skillsSection = document.querySelector('.skills-section');
  const skillCards = document.querySelectorAll('.skills-section .skill-card');
  const skillsHeading = document.querySelector('.skills-section .section-title');
  if (skillsSection && skillCards.length === 4 && skillsHeading) {
    // Set initial state
    skillCards.forEach((card, i) => {
      card.classList.remove('pop-in-left', 'pop-in-right', 'pop-out-left', 'pop-out-right');
      if (i < 2) {
        card.classList.add('pop-out-left');
      } else {
        card.classList.add('pop-out-right');
      }
    });
    skillsHeading.classList.remove('zoom-in');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Animate in
          skillCards.forEach((card, i) => {
            card.classList.remove('pop-out-left', 'pop-out-right');
            if (i < 2) {
              card.classList.add('pop-in-left');
            } else {
              card.classList.add('pop-in-right');
            }
          });
          skillsHeading.classList.add('zoom-in');
        } else {
          // Animate out
          skillCards.forEach((card, i) => {
            card.classList.remove('pop-in-left', 'pop-in-right');
            if (i < 2) {
              card.classList.add('pop-out-left');
            } else {
              card.classList.add('pop-out-right');
            }
          });
          skillsHeading.classList.remove('zoom-in');
        }
      });
    }, {
      threshold: 0.3
    });
    observer.observe(skillsSection);
  }
}); 

// === Certificate Image Zoom Modal ===
document.addEventListener('DOMContentLoaded', function () {
  const certImages = document.querySelectorAll('.cert-img');
  const modal = document.getElementById('cert-modal');
  const modalImg = document.getElementById('cert-modal-img');
  const modalClose = document.getElementById('cert-modal-close');

  certImages.forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', function () {
      modal.style.display = 'flex';
      modalImg.src = this.src;
      modalImg.alt = this.alt;
    });
  });

  modalClose.addEventListener('click', function () {
    modal.style.display = 'none';
    modalImg.src = '';
  });

  // Close modal when clicking outside the image
  modal.addEventListener('click', function (e) {
    if (e.target === modal) {
      modal.style.display = 'none';
      modalImg.src = '';
    }
  });
}); 

// Animate contact section columns on scroll
// (Fade-in and slide-up)
document.addEventListener('DOMContentLoaded', function () {
  const contactLeft = document.querySelector('.contact-left');
  const contactRight = document.querySelector('.contact-right');
  function animateContact() {
    const section = document.getElementById('contact');
    if (!section) return;
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      contactLeft.classList.add('contact-animate');
      contactRight.classList.add('contact-animate');
      window.removeEventListener('scroll', animateContact);
    }
  }
  window.addEventListener('scroll', animateContact);
  animateContact();
}); 

// === Services Accordion ===
document.addEventListener('DOMContentLoaded', function () {
  const accordions = document.querySelectorAll('.service-accordion');
  accordions.forEach(acc => {
    const header = acc.querySelector('.service-header');
    header.addEventListener('click', function () {
      // Close all other accordions
      accordions.forEach(other => {
        if (other !== acc) other.classList.remove('active');
      });
      // Toggle this one
      acc.classList.toggle('active');
    });
  });
}); 

// === Contact Form Validation and Submission ===
document.addEventListener('DOMContentLoaded', function () {
  const contactForm = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const btnText = submitBtn.querySelector('.btn-text');
  const btnLoading = submitBtn.querySelector('.btn-loading');
  const successMessage = document.getElementById('successMessage');
  const formError = document.getElementById('formError');

  // Form validation
  function validateField(field, errorElement) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    // Remove previous error state
    field.classList.remove('error');
    errorElement.classList.remove('show');

    // Validation rules
    if (!value) {
      isValid = false;
      errorMessage = 'This field is required';
    } else if (field.type === 'email' && !isValidEmail(value)) {
      isValid = false;
      errorMessage = 'Please enter a valid email address';
    } else if (field.id === 'message' && value.length < 10) {
      isValid = false;
      errorMessage = 'Message must be at least 10 characters long';
    }

    // Show error if invalid
    if (!isValid) {
      field.classList.add('error');
      errorElement.textContent = errorMessage;
      errorElement.classList.add('show');
    }

    return isValid;
  }

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Real-time validation
  const formFields = ['name', 'email', 'subject', 'message'];
  formFields.forEach(fieldId => {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(fieldId + 'Error');
    
    field.addEventListener('blur', () => {
      validateField(field, errorElement);
    });
    
    field.addEventListener('input', () => {
      if (field.classList.contains('error')) {
        validateField(field, errorElement);
      }
    });
  });

  // Form submission
  contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    // Hide previous messages
    successMessage.style.display = 'none';
    formError.style.display = 'none';

    // Validate all fields
    let isFormValid = true;
    formFields.forEach(fieldId => {
      const field = document.getElementById(fieldId);
      const errorElement = document.getElementById(fieldId + 'Error');
      if (!validateField(field, errorElement)) {
        isFormValid = false;
      }
    });

    if (!isFormValid) {
      return;
    }

    // Show loading state
    submitBtn.disabled = true;
    btnText.style.display = 'none';
    btnLoading.style.display = 'flex';

    try {
      const formData = new FormData(contactForm);
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        // Success
        successMessage.style.display = 'flex';
        contactForm.reset();
        formFields.forEach(fieldId => {
          const field = document.getElementById(fieldId);
          const errorElement = document.getElementById(fieldId + 'Error');
          field.classList.remove('error');
          errorElement.classList.remove('show');
        });
      } else {
        // Error
        formError.style.display = 'flex';
      }
    } catch (error) {
      // Network error
      formError.style.display = 'flex';
    } finally {
      // Reset button state
      submitBtn.disabled = false;
      btnText.style.display = 'inline';
      btnLoading.style.display = 'none';
    }
  });
}); 
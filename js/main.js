// Main JavaScript file

// DOM Elements
const loader = document.getElementById('loader');
const header = document.getElementById('header');
const hamburgerMenu = document.querySelector('.hamburger-menu');
const mainNav = document.getElementById('main-nav');
const scrollAnimElements = document.querySelectorAll('.animate-on-scroll');

// Page Load
document.addEventListener('DOMContentLoaded', () => {
  // Hide loader after page is fully loaded
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.style.opacity = '0';
      setTimeout(() => {
        loader.style.display = 'none';
      }, 300);
    }, 800);
  });

  // Initialize scroll animations
  initScrollAnimations();

  // Initialize navigation
  initNavigation();

  // Set current year in footer copyright
  document.querySelectorAll('.copyright').forEach(el => {
    const yearSpan = el.querySelector('p');
    if (yearSpan) {
      yearSpan.innerHTML = yearSpan.innerHTML.replace('2025', new Date().getFullYear());
    }
  });
});

// Navigation functions
function initNavigation() {
  // Hamburger menu toggle
  hamburgerMenu.addEventListener('click', () => {
    hamburgerMenu.classList.toggle('active');
    mainNav.classList.toggle('active');
    
    // Toggle hamburger menu animation
    const bars = hamburgerMenu.querySelectorAll('.bar');
    if (hamburgerMenu.classList.contains('active')) {
      bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
      bars[1].style.opacity = '0';
      bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
    } else {
      bars[0].style.transform = 'none';
      bars[1].style.opacity = '1';
      bars[2].style.transform = 'none';
    }
  });

  // Close mobile menu when clicking a link
  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        hamburgerMenu.classList.remove('active');
        mainNav.classList.remove('active');
        
        // Reset hamburger icon
        const bars = hamburgerMenu.querySelectorAll('.bar');
        bars[0].style.transform = 'none';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'none';
      }
    });
  });

  // Header scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Trigger scroll event on page load to set initial state
  window.dispatchEvent(new Event('scroll'));
}

// Scroll animations
function initScrollAnimations() {
  // Initial check for elements in viewport
  checkScrollAnimations();

  // Check on scroll
  window.addEventListener('scroll', () => {
    checkScrollAnimations();
  });
}

function checkScrollAnimations() {
  scrollAnimElements.forEach(element => {
    if (isElementInViewport(element)) {
      element.classList.add('visible');
    }
  });
}

function isElementInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
    rect.bottom >= 0
  );
}

// Form validation helper functions
function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function showError(inputElement, message) {
  const errorElement = inputElement.nextElementSibling;
  if (errorElement && errorElement.classList.contains('error-message')) {
    errorElement.textContent = message;
    inputElement.classList.add('error');
  }
}

function clearError(inputElement) {
  const errorElement = inputElement.nextElementSibling;
  if (errorElement && errorElement.classList.contains('error-message')) {
    errorElement.textContent = '';
    inputElement.classList.remove('error');
  }
}

// Form submission handler (generic)
function handleFormSubmit(form, callback) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Validate form fields
    let isValid = true;
    const formData = {};
    
    // Process each input
    form.querySelectorAll('input, select, textarea').forEach(input => {
      formData[input.name] = input.value;
      
      if (input.hasAttribute('required') && !input.value.trim()) {
        isValid = false;
        showError(input, 'This field is required');
      } else if (input.type === 'email' && input.value && !validateEmail(input.value)) {
        isValid = false;
        showError(input, 'Please enter a valid email address');
      } else {
        clearError(input);
      }
    });
    
    // If form is valid, process submission
    if (isValid) {
      callback(formData);
    }
  });
}

// Date format helper
function formatDate(date) {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString('en-US', options);
}

// Accessibility helper - add keyboard navigation for interactive elements
function addKeyboardAccessibility() {
  const interactiveElements = document.querySelectorAll('[role="button"], .accordion-header, .tab-btn, .menu-tab, .category-tab');
  
  interactiveElements.forEach(element => {
    element.setAttribute('tabindex', '0');
    
    element.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        element.click();
      }
    });
  });
}
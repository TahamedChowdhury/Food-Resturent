// About page specific JavaScript

document.addEventListener('DOMContentLoaded', () => {
  // Initialize menu tabs
  initMenuTabs();
  
  // Initialize gallery interactions
  initGallery();
});

// Menu Tabs
function initMenuTabs() {
  const menuTabs = document.querySelectorAll('.menu-tab');
  const menuSections = document.querySelectorAll('.menu-section');
  
  menuTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active class from all tabs
      menuTabs.forEach(t => t.classList.remove('active'));
      
      // Add active class to clicked tab
      tab.classList.add('active');
      
      // Hide all menu sections
      menuSections.forEach(section => section.classList.remove('active'));
      
      // Show the selected menu section
      const menuType = tab.getAttribute('data-menu');
      document.getElementById(menuType).classList.add('active');
    });
  });
}

// Gallery interactions
function initGallery() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  galleryItems.forEach(item => {
    // Add click event to open a larger view (modal) in a real implementation
    item.addEventListener('click', () => {
      const imgSrc = item.querySelector('img').src;
      const alt = item.querySelector('img').alt;
      
      // Simple alert for demo purposes - in a real implementation, this would open a modal
      console.log(`Gallery image clicked: ${alt}`, imgSrc);
    });
  });
}

// Counter animation for stats
document.addEventListener('DOMContentLoaded', () => {
  const statNumbers = document.querySelectorAll('.stat-number');
  
  const animateValue = (element, start, end, duration) => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const value = Math.floor(progress * (end - start) + start);
      element.textContent = value + (element.textContent.endsWith('%') ? '%' : '');
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  };
  
  // Intersection Observer to trigger animation when stats come into view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const value = el.textContent;
        const isPercentage = value.endsWith('%');
        const targetValue = parseInt(value, 10);
        
        // Animate from 0 to the target value
        animateValue(el, 0, targetValue, 1500);
        
        // Unobserve after animation
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  
  // Observe all stat numbers
  statNumbers.forEach(stat => {
    observer.observe(stat);
  });
});
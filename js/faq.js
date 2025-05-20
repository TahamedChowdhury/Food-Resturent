// FAQ page specific JavaScript

document.addEventListener('DOMContentLoaded', () => {
  // Initialize FAQ accordion
  initAccordion();
  
  // Initialize category tabs
  initCategoryTabs();
  
  // Initialize search functionality
  initSearch();
  
  // Add keyboard accessibility
  addFAQKeyboardAccessibility();
});

// FAQ Accordion
function initAccordion() {
  const accordionItems = document.querySelectorAll('.accordion-item');
  
  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    const content = item.querySelector('.accordion-content');
    
    header.addEventListener('click', () => {
      // Check if this item is already active
      const isActive = item.classList.contains('active');
      
      // Close all accordion items
      accordionItems.forEach(accItem => {
        accItem.classList.remove('active');
        const accContent = accItem.querySelector('.accordion-content');
        accContent.style.maxHeight = null;
      });
      
      // If the clicked item wasn't active, open it
      if (!isActive) {
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });
}

// Category Tabs
function initCategoryTabs() {
  const categoryTabs = document.querySelectorAll('.category-tab');
  const faqCategories = document.querySelectorAll('.faq-category');
  
  categoryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active class from all tabs
      categoryTabs.forEach(t => t.classList.remove('active'));
      
      // Add active class to clicked tab
      tab.classList.add('active');
      
      // Hide all FAQ categories
      faqCategories.forEach(category => category.classList.remove('active'));
      
      // Show the selected category
      const categoryId = tab.getAttribute('data-category');
      document.getElementById(categoryId).classList.add('active');
    });
  });
}

// Search Functionality
function initSearch() {
  const searchInput = document.getElementById('faq-search-input');
  const searchBtn = document.getElementById('search-btn');
  const accordionItems = document.querySelectorAll('.accordion-item');
  const categoryTabs = document.querySelectorAll('.category-tab');
  const faqCategories = document.querySelectorAll('.faq-category');
  
  // Function to perform search
  const performSearch = () => {
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (searchTerm === '') {
      // If search is empty, reset to default view
      resetSearch();
      return;
    }
    
    // Show all categories for searching across all
    faqCategories.forEach(category => category.classList.add('active'));
    
    // Remove active class from all category tabs
    categoryTabs.forEach(tab => tab.classList.remove('active'));
    
    let hasResults = false;
    
    // Search through all accordion items
    accordionItems.forEach(item => {
      const headerText = item.querySelector('.accordion-header h3').textContent.toLowerCase();
      const contentText = item.querySelector('.accordion-content p').textContent.toLowerCase();
      
      if (headerText.includes(searchTerm) || contentText.includes(searchTerm)) {
        // Show items that match search
        item.style.display = 'block';
        
        // Highlight matched text (optional)
        highlightText(item, searchTerm);
        
        // Open the accordion item
        item.classList.add('active');
        const content = item.querySelector('.accordion-content');
        content.style.maxHeight = content.scrollHeight + 'px';
        
        hasResults = true;
      } else {
        // Hide items that don't match
        item.style.display = 'none';
      }
    });
    
    // Show message if no results found
    if (!hasResults) {
      // You could add a "no results" message here
      alert('No matching questions found. Please try a different search term.');
      resetSearch();
    }
  };
  
  // Function to reset search
  const resetSearch = () => {
    // Clear search input
    searchInput.value = '';
    
    // Show default category
    faqCategories.forEach(category => category.classList.remove('active'));
    document.getElementById('reservations').classList.add('active');
    
    // Set active category tab
    categoryTabs.forEach(tab => tab.classList.remove('active'));
    document.querySelector('[data-category="reservations"]').classList.add('active');
    
    // Reset accordion items
    accordionItems.forEach(item => {
      item.style.display = 'block';
      item.classList.remove('active');
      const content = item.querySelector('.accordion-content');
      content.style.maxHeight = null;
      
      // Remove any highlighting
      const header = item.querySelector('.accordion-header h3');
      header.innerHTML = header.textContent;
      
      const paragraph = item.querySelector('.accordion-content p');
      paragraph.innerHTML = paragraph.textContent;
    });
  };
  
  // Function to highlight matched text
  const highlightText = (item, searchTerm) => {
    const header = item.querySelector('.accordion-header h3');
    const paragraph = item.querySelector('.accordion-content p');
    
    const headerText = header.textContent;
    const paragraphText = paragraph.textContent;
    
    // Create highlighted versions
    const highlightedHeader = headerText.replace(new RegExp(searchTerm, 'gi'), match => `<span class="highlight">${match}</span>`);
    const highlightedParagraph = paragraphText.replace(new RegExp(searchTerm, 'gi'), match => `<span class="highlight">${match}</span>`);
    
    // Apply highlighting
    header.innerHTML = highlightedHeader;
    paragraph.innerHTML = highlightedParagraph;
    
    // Add CSS for highlight (ensure this is added to your CSS)
    // .highlight { background-color: yellow; font-weight: bold; }
    const style = document.createElement('style');
    style.textContent = '.highlight { background-color: rgba(139, 0, 0, 0.2); padding: 0 2px; }';
    document.head.appendChild(style);
  };
  
  // Add event listeners
  searchBtn.addEventListener('click', performSearch);
  
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      performSearch();
    }
  });
  
  // Clear search on ESC key
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      resetSearch();
    }
  });
}

// Add keyboard accessibility for FAQ elements
function addFAQKeyboardAccessibility() {
  // Make accordion headers keyboard accessible
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach(header => {
    header.setAttribute('tabindex', '0');
    header.setAttribute('role', 'button');
    header.setAttribute('aria-expanded', 'false');
    
    header.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        header.click();
        
        // Update aria-expanded attribute
        const isExpanded = header.parentElement.classList.contains('active');
        header.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
      }
    });
    
    // Update aria-expanded on click too
    header.addEventListener('click', () => {
      const isExpanded = header.parentElement.classList.contains('active');
      header.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
    });
  });
  
  // Make category tabs keyboard accessible
  const categoryTabs = document.querySelectorAll('.category-tab');
  categoryTabs.forEach(tab => {
    tab.setAttribute('tabindex', '0');
    tab.setAttribute('role', 'tab');
    
    tab.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        tab.click();
      }
    });
  });
}
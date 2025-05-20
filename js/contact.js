// Contact page specific JavaScript

document.addEventListener('DOMContentLoaded', () => {
  // Initialize contact form
  initContactForm();
});

// Contact Form
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  
  // Input fields to validate
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const phoneInput = document.getElementById('phone');
  const subjectInput = document.getElementById('subject');
  const messageInput = document.getElementById('message');
  const statusDiv = document.getElementById('form-submission-status');
  
  // Add real-time validation
  if (nameInput) {
    nameInput.addEventListener('blur', () => {
      if (!nameInput.value.trim()) {
        showError(nameInput, 'Please enter your name');
      } else {
        clearError(nameInput);
      }
    });
  }
  
  if (emailInput) {
    emailInput.addEventListener('blur', () => {
      if (!emailInput.value.trim()) {
        showError(emailInput, 'Please enter your email address');
      } else if (!validateEmail(emailInput.value)) {
        showError(emailInput, 'Please enter a valid email address');
      } else {
        clearError(emailInput);
      }
    });
  }
  
  if (phoneInput) {
    phoneInput.addEventListener('blur', () => {
      if (phoneInput.value.trim() && !validatePhone(phoneInput.value)) {
        showError(phoneInput, 'Please enter a valid phone number');
      } else {
        clearError(phoneInput);
      }
    });
  }
  
  if (subjectInput) {
    subjectInput.addEventListener('change', () => {
      if (!subjectInput.value || subjectInput.value === '') {
        showError(subjectInput, 'Please select a subject');
      } else {
        clearError(subjectInput);
      }
    });
  }
  
  if (messageInput) {
    messageInput.addEventListener('blur', () => {
      if (!messageInput.value.trim()) {
        showError(messageInput, 'Please enter your message');
      } else if (messageInput.value.trim().length < 10) {
        showError(messageInput, 'Your message is too short');
      } else {
        clearError(messageInput);
      }
    });
  }
  
  // Handle form submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Validate all fields
    let isValid = true;
    
    // Name validation
    if (!nameInput.value.trim()) {
      showError(nameInput, 'Please enter your name');
      isValid = false;
    } else {
      clearError(nameInput);
    }
    
    // Email validation
    if (!emailInput.value.trim()) {
      showError(emailInput, 'Please enter your email address');
      isValid = false;
    } else if (!validateEmail(emailInput.value)) {
      showError(emailInput, 'Please enter a valid email address');
      isValid = false;
    } else {
      clearError(emailInput);
    }
    
    // Phone validation (optional)
    if (phoneInput.value.trim() && !validatePhone(phoneInput.value)) {
      showError(phoneInput, 'Please enter a valid phone number');
      isValid = false;
    } else {
      clearError(phoneInput);
    }
    
    // Subject validation
    if (!subjectInput.value || subjectInput.value === '') {
      showError(subjectInput, 'Please select a subject');
      isValid = false;
    } else {
      clearError(subjectInput);
    }
    
    // Message validation
    if (!messageInput.value.trim()) {
      showError(messageInput, 'Please enter your message');
      isValid = false;
    } else if (messageInput.value.trim().length < 10) {
      showError(messageInput, 'Your message is too short');
      isValid = false;
    } else {
      clearError(messageInput);
    }
    
    // If all validations pass, submit the form
    if (isValid) {
      // In a real application, this would send data to the server
      // For demo purposes, we'll simulate a successful submission
      
      // Show loading state
      const submitButton = form.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;
      submitButton.textContent = 'Sending...';
      submitButton.disabled = true;
      
      // Simulate server request
      setTimeout(() => {
        // Reset button state
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        // Show success message
        statusDiv.textContent = 'Thank you for your message! We will get back to you soon.';
        statusDiv.className = 'success';
        
        // Reset form
        form.reset();
        
        // Clear success message after 5 seconds
        setTimeout(() => {
          statusDiv.textContent = '';
          statusDiv.className = '';
        }, 5000);
      }, 1500);
    }
  });
}

// Phone validation
function validatePhone(phone) {
  // Basic phone validation - allows different formats
  const re = /^[\d\+\-\.\(\) ]{7,20}$/;
  return re.test(phone);
}
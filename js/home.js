// Home page specific JavaScript

document.addEventListener('DOMContentLoaded', () => {
  // Initialize menu tabs
  initMenuTabs();
  
  // Initialize testimonials slider
  initTestimonialsSlider();
  
  // Initialize reservation form
  initReservationForm();
  
  // Initialize newsletter form
  initNewsletterForm();
  
  // Initialize banner sliders
  initBannerSliders();
});

// Banner Sliders
function initBannerSliders() {
  const bannerSliders = document.querySelectorAll('.banner-slider');
  
  bannerSliders.forEach(slider => {
    new Swiper(slider, {
      slidesPerView: 1,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      }
    });
  });
}

// Menu Tabs
function initMenuTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const categoryContents = document.querySelectorAll('.category-content');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      tabButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      button.classList.add('active');
      
      // Hide all category contents
      categoryContents.forEach(content => content.classList.remove('active'));
      
      // Show the selected category content
      const category = button.getAttribute('data-category');
      document.getElementById(category).classList.add('active');
    });
  });
}

// Testimonials Slider
function initTestimonialsSlider() {
  const testimonials = document.querySelectorAll('.testimonial');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  let currentIndex = 0;
  let testimonialInterval;
  
  // Function to show testimonial at specific index
  const showTestimonial = (index) => {
    // Hide all testimonials
    testimonials.forEach(testimonial => testimonial.classList.remove('active'));
    
    // Remove active class from all dots
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Show the testimonial at the given index
    testimonials[index].classList.add('active');
    
    // Add active class to the corresponding dot
    dots[index].classList.add('active');
    
    // Update current index
    currentIndex = index;
  };
  
  // Set up click event for dots
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const index = parseInt(dot.getAttribute('data-index'));
      showTestimonial(index);
      
      // Reset the interval
      clearInterval(testimonialInterval);
      startTestimonialInterval();
    });
  });
  
  // Set up click events for navigation buttons
  prevBtn.addEventListener('click', () => {
    let index = currentIndex - 1;
    if (index < 0) index = testimonials.length - 1;
    showTestimonial(index);
    
    // Reset the interval
    clearInterval(testimonialInterval);
    startTestimonialInterval();
  });
  
  nextBtn.addEventListener('click', () => {
    let index = currentIndex + 1;
    if (index >= testimonials.length) index = 0;
    showTestimonial(index);
    
    // Reset the interval
    clearInterval(testimonialInterval);
    startTestimonialInterval();
  });
  
  // Automatic testimonial rotation
  const startTestimonialInterval = () => {
    testimonialInterval = setInterval(() => {
      let index = currentIndex + 1;
      if (index >= testimonials.length) index = 0;
      showTestimonial(index);
    }, 5000);
  };
  
  // Start the interval
  startTestimonialInterval();
  
  // Pause the rotation when hovering over the testimonial
  const testimonialContainer = document.querySelector('.testimonials-slider');
  testimonialContainer.addEventListener('mouseenter', () => {
    clearInterval(testimonialInterval);
  });
  
  testimonialContainer.addEventListener('mouseleave', () => {
    startTestimonialInterval();
  });
}

// Reservation Form
function initReservationForm() {
  const form = document.getElementById('reservation-form');
  if (!form) return;
  
  // Set min date for date input (today)
  const dateInput = document.getElementById('date');
  if (dateInput) {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    dateInput.setAttribute('min', formattedDate);
  }
  
  // Handle form submission
  handleFormSubmit(form, (formData) => {
    // In a real application, this would send data to the server
    console.log('Reservation form data:', formData);
    
    // Show success message (simulate server response)
    alert(`Thank you for your reservation request!\n\nWe've received your reservation for ${formData.guests} guests on ${formatDate(formData.date)} at ${convertTime(formData.time)}.\n\nWe'll confirm your reservation shortly.`);
    
    // Reset form
    form.reset();
  });
}

// Newsletter Form
function initNewsletterForm() {
  const form = document.getElementById('newsletter-form');
  if (!form) return;
  
  // Handle form submission
  handleFormSubmit(form, (formData) => {
    // In a real application, this would send data to the server
    console.log('Newsletter form data:', formData);
    
    // Show success message (simulate server response)
    alert(`Thank you for subscribing to our newsletter!\n\nYou'll now receive updates about our seasonal menus, special events, and exclusive offers.`);
    
    // Reset form
    form.reset();
  });
}

// Helper function to convert time from 24h to 12h format
function convertTime(time24h) {
  if (!time24h) return '';
  
  const [hours, minutes] = time24h.split(':');
  const period = hours >= 12 ? 'PM' : 'AM';
  const hours12 = hours % 12 || 12;
  
  return `${hours12}:${minutes} ${period}`;
}
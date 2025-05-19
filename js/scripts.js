/**
 * Main JavaScript file for Reformed Seminary website
 */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('nav ul');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('show');
        });
    }

    // Header Scroll Effect
    const header = document.querySelector('header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Program Tabs Functionality (for program details page)
    const tabLinks = document.querySelectorAll('.program-tab-menu a');
    const tabContents = document.querySelectorAll('.program-tab-content');
    
    if (tabLinks.length && tabContents.length) {
        tabLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Remove active class from all tabs
                tabLinks.forEach(tab => tab.classList.remove('active'));
                
                // Add active class to clicked tab
                this.classList.add('active');
                
                // Hide all tab contents
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Show corresponding tab content
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.classList.add('active');
                }
            });
        });
    }

    // Event Filter Functionality (for events page)
    const filterTabs = document.querySelectorAll('.event-filter-tab');
    const eventCards = document.querySelectorAll('.event-page-card');
    
    if (filterTabs.length && eventCards.length) {
        filterTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Remove active class from all filter tabs
                filterTabs.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked tab
                this.classList.add('active');
                
                // Get filter category
                const category = this.getAttribute('data-category');
                
                // Show/hide events based on category
                eventCards.forEach(card => {
                    if (category === 'all') {
                        card.style.display = 'flex';
                    } else if (card.getAttribute('data-category') === category) {
                        card.style.display = 'flex';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // Form Validation
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            let valid = true;
            
            // Get all required inputs
            const requiredInputs = contactForm.querySelectorAll('[required]');
            
            // Check if all required fields are filled
            requiredInputs.forEach(input => {
                if (!input.value.trim()) {
                    valid = false;
                    input.classList.add('error');
                } else {
                    input.classList.remove('error');
                }
            });
            
            // Email validation
            const emailInput = contactForm.querySelector('input[type="email"]');
            if (emailInput && emailInput.value.trim()) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailInput.value)) {
                    valid = false;
                    emailInput.classList.add('error');
                }
            }
            
            // Prevent form submission if not valid
            if (!valid) {
                e.preventDefault();
                
                // Show error message
                const errorMessage = document.querySelector('.form-error-message') || document.createElement('div');
                errorMessage.className = 'form-error-message';
                errorMessage.textContent = 'Please fill in all required fields correctly.';
                errorMessage.style.color = 'red';
                errorMessage.style.marginBottom = '20px';
                
                if (!document.querySelector('.form-error-message')) {
                    contactForm.prepend(errorMessage);
                }
            }
        });
    }

    // Testimonial Slider
    initTestimonialSlider();

    // Faculty Filter
    initFacultyFilter();

    // Smooth Scroll for Anchor Links
    initSmoothScroll();

    // Image Lightbox
    initLightbox();
});

/**
 * Initialize Testimonial Slider
 */
function initTestimonialSlider() {
    const testimonialContainer = document.querySelector('.testimonials-slider');
    
    if (!testimonialContainer) return;
    
    const testimonials = testimonialContainer.querySelectorAll('.testimonial-box');
    const prevBtn = testimonialContainer.querySelector('.slider-prev');
    const nextBtn = testimonialContainer.querySelector('.slider-next');
    
    if (!testimonials.length || !prevBtn || !nextBtn) return;
    
    let currentIndex = 0;
    
    // Show initial testimonial
    showTestimonial(currentIndex);
    
    // Previous button click
    prevBtn.addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentIndex);
    });
    
    // Next button click
    nextBtn.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(currentIndex);
    });
    
    // Auto slide
    let slideInterval = setInterval(function() {
        currentIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(currentIndex);
    }, 5000);
    
    // Pause on hover
    testimonialContainer.addEventListener('mouseenter', function() {
        clearInterval(slideInterval);
    });
    
    // Resume on mouse leave
    testimonialContainer.addEventListener('mouseleave', function() {
        slideInterval = setInterval(function() {
            currentIndex = (currentIndex + 1) % testimonials.length;
            showTestimonial(currentIndex);
        }, 5000);
    });
    
    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            if (i === index) {
                testimonial.style.display = 'block';
                testimonial.classList.add('active');
            } else {
                testimonial.style.display = 'none';
                testimonial.classList.remove('active');
            }
        });
    }
}

/**
 * Initialize Faculty Filter
 */
function initFacultyFilter() {
    const facultyFilter = document.querySelector('.faculty-filter');
    
    if (!facultyFilter) return;
    
    const filterBtns = facultyFilter.querySelectorAll('.faculty-filter-btn');
    const facultyCards = document.querySelectorAll('.faculty-card');
    
    if (!filterBtns.length || !facultyCards.length) return;
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter category
            const category = this.getAttribute('data-category');
            
            // Filter faculty cards
            facultyCards.forEach(card => {
                if (category === 'all') {
                    card.style.display = 'block';
                } else if (card.getAttribute('data-category') === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

/**
 * Initialize Smooth Scroll for Anchor Links
 */
function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Calculate header height for offset
                const headerHeight = document.querySelector('header').offsetHeight;
                
                // Scroll to target element with offset
                window.scrollTo({
                    top: targetElement.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Initialize Image Lightbox
 */
function initLightbox() {
    const lightboxImages = document.querySelectorAll('.lightbox-image');
    
    if (!lightboxImages.length) return;
    
    // Create lightbox elements
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <img src="" alt="Lightbox Image">
            <span class="lightbox-close">&times;</span>
        </div>
    `;
    document.body.appendChild(lightbox);
    
    const lightboxImg = lightbox.querySelector('img');
    const lightboxClose = lightbox.querySelector('.lightbox-close');
    
    // Open lightbox when clicking on an image
    lightboxImages.forEach(img => {
        img.addEventListener('click', function() {
            lightboxImg.src = this.src;
            lightbox.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    });
    
    // Close lightbox when clicking on close button
    lightboxClose.addEventListener('click', function() {
        lightbox.style.display = 'none';
        document.body.style.overflow = ''; // Enable scrolling
    });
    
    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
            document.body.style.overflow = ''; // Enable scrolling
        }
    });
}

/**
 * Countdown Timer for Events
 * @param {string} targetDate - Target date in format 'YYYY-MM-DD HH:MM:SS'
 * @param {string} elementId - ID of the element to display the countdown
 */
function initCountdown(targetDate, elementId) {
    const countdownElement = document.getElementById(elementId);
    
    if (!countdownElement) return;
    
    const targetTime = new Date(targetDate).getTime();
    
    // Update countdown every second
    const countdownInterval = setInterval(function() {
        // Get current date and time
        const now = new Date().getTime();
        
        // Find the distance between now and the countdown date
        const distance = targetTime - now;
        
        // If the countdown is over, stop the interval and display a message
        if (distance < 0) {
            clearInterval(countdownInterval);
            countdownElement.innerHTML = 'Event has started!';
            return;
        }
        
        // Time calculations for days, hours, minutes and seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Display the countdown
        countdownElement.innerHTML = `
            <div class="countdown-item">
                <span class="countdown-number">${days}</span>
                <span class="countdown-label">Days</span>
            </div>
            <div class="countdown-item">
                <span class="countdown-number">${hours}</span>
                <span class="countdown-label">Hours</span>
            </div>
            <div class="countdown-item">
                <span class="countdown-number">${minutes}</span>
                <span class="countdown-label">Minutes</span>
            </div>
            <div class="countdown-item">
                <span class="countdown-number">${seconds}</span>
                <span class="countdown-label">Seconds</span>
            </div>
        `;
    }, 1000);
}

/**
 * Initialize AOS (Animate On Scroll) Library if available
 */
function initAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true
        });
    }
}

/**
 * Initialize counter animation for numbers
 */
function initCounterAnimation() {
    const counterElements = document.querySelectorAll('.counter');
    
    if (!counterElements.length) return;
    
    counterElements.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000; // 2 seconds
        const step = Math.ceil(target / (duration / 16)); // 16ms is approx. one frame at 60fps
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current >= target) {
                counter.textContent = target;
                return;
            }
            
            counter.textContent = current;
            requestAnimationFrame(updateCounter);
        };
        
        // Start counter animation when element is in viewport
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(counter);
    });
}

/**
 * Initialize Google Maps if the API is loaded
 */
function initGoogleMap() {
    const mapElement = document.getElementById('google-map');
    
    if (!mapElement || typeof google === 'undefined' || typeof google.maps === 'undefined') return;
    
    const latitude = parseFloat(mapElement.getAttribute('data-lat')) || 26.1224;  // Default to Fort Lauderdale coordinates
    const longitude = parseFloat(mapElement.getAttribute('data-lng')) || -80.1373;
    
    const mapOptions = {
        center: { lat: latitude, lng: longitude },
        zoom: 15,
        styles: [
            {
                "featureType": "administrative",
                "elementType": "labels.text.fill",
                "stylers": [{"color": "#444444"}]
            },
            {
                "featureType": "landscape",
                "elementType": "all",
                "stylers": [{"color": "#f2f2f2"}]
            },
            {
                "featureType": "poi",
                "elementType": "all",
                "stylers": [{"visibility": "off"}]
            },
            {
                "featureType": "road",
                "elementType": "all",
                "stylers": [{"saturation": -100}, {"lightness": 45}]
            },
            {
                "featureType": "road.highway",
                "elementType": "all",
                "stylers": [{"visibility": "simplified"}]
            },
            {
                "featureType": "road.arterial",
                "elementType": "labels.icon",
                "stylers": [{"visibility": "off"}]
            },
            {
                "featureType": "transit",
                "elementType": "all",
                "stylers": [{"visibility": "off"}]
            },
            {
                "featureType": "water",
                "elementType": "all",
                "stylers": [{"color": "#2a3855"}, {"visibility": "on"}]
            }
        ]
    };
    
    const map = new google.maps.Map(mapElement, mapOptions);
    
    // Add marker
    new google.maps.Marker({
        position: { lat: latitude, lng: longitude },
        map: map,
        icon: {
            url: 'images/map-marker.png',
            scaledSize: new google.maps.Size(40, 40)
        },
        animation: google.maps.Animation.DROP
    });
}

// Call additional initialization functions
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    initAOS();
    
    // Initialize Counter Animation
    initCounterAnimation();
    
    // Initialize Google Maps (if available)
    if (document.getElementById('google-map')) {
        // Google Maps script is typically loaded asynchronously, so we need to wait for it
        if (typeof google !== 'undefined' && typeof google.maps !== 'undefined') {
            initGoogleMap();
        } else {
            // Wait for Google Maps to load
            window.initMap = initGoogleMap;
        }
    }
    
    // Initialize any countdowns on the page
    const countdownElements = document.querySelectorAll('[data-countdown]');
    countdownElements.forEach(element => {
        const targetDate = element.getAttribute('data-countdown');
        const elementId = element.id;
        initCountdown(targetDate, elementId);
    });
});


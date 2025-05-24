/**
 * Main JavaScript file for Reformed Seminary website
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Global Navigation first
    initGlobalNavigation();

   // Initialize search menu functionality only if we have the required dependencies
    setTimeout(() => {
        if (typeof window.supabase !== 'undefined' && typeof initSearchMenu === 'function') {
            initSearchMenu();
        }
    }, 100);

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

// Initialize AOS
    initAOS();
    
    // Initialize Counter Animation
    initCounterAnimation();
    
    // Initialize Google Maps (if available)
    if (document.getElementById('google-map')) {
        if (typeof google !== 'undefined' && typeof google.maps !== 'undefined') {
            initGoogleMap();
        } else {
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

/**
 * Generate Global Navigation HTML
 */
function generateGlobalNavigation() {
    return `
        <div class="container">
            <div class="main-header">

                <div class="logo">
                    <img src="images/logo-lumen-logos.svg" alt="Lumen Logos">
                    <div class="logo-text">

                        <h1>La luz del Verbo</h1>
                        <p>Revelación que ilumina el alma</p>
                    </div>
                </div>
                <button class="mobile-menu-btn">
                    <i class="fas fa-bars"></i>
                </button>
                <nav>
                    <ul>
                        <li><a href="index.html">Principal</a></li>
                        <li><a href="about.html">Acerca de</a>
                            <!-- Submenú desactivado temporalmente
                            <ul>
                                <li><a href="mission.html">Nuestra Misión</a></li>
                                <li><a href="history.html">Historia</a></li>
                                <li><a href="statement-of-faith.html">Declaración de Fé</a></li>
                            </ul>
                            -->
                        </li>
                        <!-- Menú CONOCIMIENTO desactivado temporalmente
                        <li><a href="programs.html">CONOCIMIENTO</a>
                            <ul>
                                <li><a href="master-of-divinity.html">Estudios</a></li>
                                <li><a href="master-of-arts.html">Consultas</a></li>
                            </ul>
                        </li>
                        -->
                        <li><a href="faculty.html">Enlaces</a></li>
                        <!-- Menú Títulos desactivado temporalmente
                        <li><a href="admissions.html">Titulos</a>
                            <ul>
                                <li><a href="requirements.html">Requirements</a></li>
                                <li><a href="tuition.html">Tuition & Fees</a></li>
                                <li><a href="financial-aid.html">Financial Aid</a></li>
                                <li><a href="apply.html">Apply Now</a></li>
                            </ul>
                        </li>
                        -->

                        <li class="search-menu-item">
                            <a href="#" id="search-menu-btn">Buscar <i class="fas fa-chevron-down"></i></a>
                            <div class="search-dropdown" id="search-dropdown">
                                <div class="search-dropdown-content">
                                    <!-- Pestañas de búsqueda -->
                                    <div class="search-tabs">
                                        <button class="search-tab active" data-tab="tags">Etiquetas</button>
                                        <button class="search-tab" data-tab="dates">Fechas</button>
                                    </div>
                                    
                                    <!-- Búsqueda por etiquetas -->
                                    <div class="search-tab-content active" id="tags-tab">
                                        <div class="search-header">
                                            <h4>Buscar por Etiquetas</h4>
                                            <div class="selected-tags-display" id="selected-tags-display">
                                                <!-- Etiquetas seleccionadas aparecerán aquí -->
                                            </div>
                                        </div>
                                        <div class="categories-container" id="categories-container">
                                            <!-- Las categorías se cargarán dinámicamente -->
                                            <div class="loading-message">Cargando categorías...</div>
                                        </div>
                                        <div class="search-actions">
                                            <button class="btn-search-execute" id="btn-search-execute" disabled>
                                                <i class="fas fa-search"></i> Buscar
                                            </button>
                                            <button class="btn-clear-tags" id="btn-clear-tags">
                                                <i class="fas fa-times"></i> Limpiar
                                            </button>
                                        </div>
                                    </div>
                                    
                                    <!-- Búsqueda por fechas -->
                                    <div class="search-tab-content" id="dates-tab">
                                        <div class="search-header">
                                            <h4>Buscar por Fecha</h4>
                                        </div>
                                        <div class="date-filters">

                                           <div class="date-filter-group">
                                                <label>Buscar por:</label>
                                                <select id="date-type-select">
                                                    <option value="">Seleccionar tipo</option>
                                                    <option value="year">Año específico</option>
                                                    <option value="month">Mes específico</option>
                                                    <option value="day">Día específico</option>
                                                    <option value="range">Rango de fechas</option>
                                                </select>
                                            </div>
                                            
                                            <div class="date-inputs" id="date-inputs">
                                                <!-- Los campos de fecha se mostrarán aquí según la selección -->
                                            </div>
                                        </div>
                                        <div class="search-actions">
                                            <button class="btn-search-execute" id="btn-search-dates" disabled>
                                                <i class="fas fa-calendar"></i> Buscar por Fecha
                                            </button>
                                            <button class="btn-clear-tags" id="btn-clear-dates">
                                                <i class="fas fa-times"></i> Limpiar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>

                        <li><a href="contact.html">Contacto</a></li>
                        <li><a href="#" id="login-btn">Logearse</a></li>
                    </ul>
                </nav>
            </div>
        </div>
    `;
}

/**
 * Estilos para el menú de búsqueda con pestañas
 */
const searchMenuStyles = `
<style>
.search-tabs {
    display: flex;
    border-bottom: 1px solid #ddd;
    margin-bottom: 15px;
}

.search-tab {
    flex: 1;
    padding: 10px 15px;
    border: none;
    background: none;
    cursor: pointer;
    border-bottom: 2px solid transparent;
    transition: all 0.3s ease;
    font-weight: 500;
}

.search-tab.active {
    border-bottom-color: var(--secondary-color);
    color: var(--primary-color);
    background-color: #f8f9fa;
}

.search-tab:hover {
    background-color: #f8f9fa;
}

.search-tab-content {
    display: none;
}

.search-tab-content.active {
    display: block;
}

.date-filters {
    padding: 10px 0;
}

.date-filter-group {
    margin-bottom: 15px;
}

.date-filter-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: 600;
    color: var(--primary-color);
}

.date-filter-group select {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
}

.date-inputs {
    margin-top: 15px;
}

.date-input-group {
    margin-bottom: 10px;
}

.date-input-group label {
    display: block;
    margin-bottom: 3px;
    font-size: 12px;
    color: var(--tertiary-color);
}

.date-input-group select,
.date-input-group input {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
}

.date-range-inputs {
    display: flex;
    gap: 10px;
}

.date-range-inputs > div {
    flex: 1;
}
</style>
`;

// Inyectar estilos en el head
if (!document.getElementById('search-menu-styles')) {
    const styleElement = document.createElement('div');
    styleElement.id = 'search-menu-styles';
    styleElement.innerHTML = searchMenuStyles;
    document.head.appendChild(styleElement);
}

/**
 * Initialize Global Navigation
 */
function initGlobalNavigation() {
    const header = document.querySelector('header');
    if (header) {
        header.innerHTML = generateGlobalNavigation();
        
        // Re-initialize mobile menu after injecting HTML
        initMobileMenu();
        
        // Initialize search menu if on pages that support it
        if (typeof initSearchMenu === 'function') {
            initSearchMenu();
        }
    }
}

/**
 * Initialize Mobile Menu (separated for re-use)
 */
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('nav ul');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('show');
        });
    }
}

/**
 * Initialize Search Menu (for pages that support it)
 */
function initSearchMenu() {
    // Variables para el menú de búsqueda
    let searchSelectedTags = [];
    let searchAllCategories = [];
    let searchAllTags = [];

    // Cargar categorías y etiquetas inteligentes
    loadSmartCategoriesAndTags();
    
    // Configurar eventos del menú
    setupSearchMenuEvents();

    // Cargar solo categorías y etiquetas que están en uso
    async function loadSmartCategoriesAndTags() {
        try {
            // Verificar si Supabase está disponible
            if (typeof window.supabase === 'undefined') {
                console.log('Supabase no disponible en esta página');
                return;
            }

            const supabase = window.supabase.createClient(
                'https://cjhbhfvkcwwpnhqixlwd.supabase.co',
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNqaGJoZnZrY3d3cG5ocWl4bHdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIzMTk2MjQsImV4cCI6MjA1Nzg5NTYyNH0.Db6b_riMZXmM09Bfav-iHtJBaSMX31j-eGPgnaAbI80'
            );
            
            // Obtener todas las etiquetas usadas en documentos
            const { data: documents, error: docsError } = await supabase
                .from('documents')
                .select('tags_array');
                
            if (docsError) throw docsError;
            
            // Extraer todas las etiquetas únicas en uso
            const usedTagIds = new Set();
            documents.forEach(doc => {
                const tags = getDocumentTags(doc);
                tags.forEach(tagId => usedTagIds.add(tagId));
            });
            
            // Obtener información de categorías y etiquetas
            const { data: categories, error: catError } = await supabase
                .from('categories')
                .select('*')
                .order('name');
                
            const { data: tags, error: tagsError } = await supabase
                .from('tags')
                .select('*')
                .order('name');
                
            if (catError) throw catError;
            if (tagsError) throw tagsError;
            
            // Filtrar solo etiquetas que están en uso
            const usedTags = tags.filter(tag => usedTagIds.has(tag.id));
            
            // Agrupar etiquetas por categoría
            const categoriesWithTags = categories
                .map(category => ({
                    ...category,
                    tags: usedTags.filter(tag => tag.category_id === category.id)
                }))
                .filter(category => category.tags.length > 0);
            
            searchAllCategories = categoriesWithTags;
            searchAllTags = usedTags;
            
            renderSearchCategories();
            
        } catch (error) {
            console.error('Error cargando categorías inteligentes:', error);
            const container = document.getElementById('categories-container');
            if (container) {
                container.innerHTML = '<div class="loading-message">Error al cargar categorías</div>';
            }
        }
    }

    function renderSearchCategories() {
        const container = document.getElementById('categories-container');
        if (!container) return;
        
        container.innerHTML = '';
        
        searchAllCategories.forEach(category => {
            const categoryElement = document.createElement('div');
            categoryElement.className = 'category-item';
            categoryElement.innerHTML = `
                <div class="category-header" data-category-id="${category.id}">
                    <span class="category-name">${category.name}</span>
                    <span class="category-count">${category.tags.length} etiquetas</span>
                </div>
                <div class="tags-list" id="tags-${category.id}">
                    ${category.tags.map(tag => 
                        `<div class="tag-item" data-tag-id="${tag.id}" data-tag-name="${tag.name}">
                            ${tag.name}
                        </div>`
                    ).join('')}
                </div>
            `;
            container.appendChild(categoryElement);
        });
    }

    function setupSearchMenuEvents() {
        // Toggle del menú principal
        const searchMenuBtn = document.getElementById('search-menu-btn');

        // Configurar eventos de las pestañas
        setupTabEvents();
        
        // Configurar eventos de filtros de fecha
        setupDateFilterEvents();

        if (searchMenuBtn) {
            searchMenuBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                const dropdown = document.getElementById('search-dropdown');
                if (dropdown) {
                    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
                }
            });
        }
        
        // Cerrar menú al hacer clic fuera
        document.addEventListener('click', function(e) {
            const dropdown = document.getElementById('search-dropdown');
            const menuBtn = document.getElementById('search-menu-btn');
            if (dropdown && menuBtn && !dropdown.contains(e.target) && !menuBtn.contains(e.target)) {
                dropdown.style.display = 'none';
            }
        });
        
        // Toggle de categorías y selección de etiquetas
        document.addEventListener('click', function(e) {
            // Toggle categoría
            if (e.target.closest('.category-header')) {
                const header = e.target.closest('.category-header');
                const categoryId = header.dataset.categoryId;
                const tagsList = document.getElementById(`tags-${categoryId}`);
                
                if (tagsList) {
                    // Cerrar otras categorías
                    document.querySelectorAll('.tags-list.active').forEach(list => {
                        if (list.id !== `tags-${categoryId}`) {
                            list.classList.remove('active');
                            if (list.previousElementSibling) {
                                list.previousElementSibling.classList.remove('active');
                            }
                        }
                    });
                    
                    // Toggle actual
                    tagsList.classList.toggle('active');
                    header.classList.toggle('active');
                }
            }
            
            // Seleccionar etiqueta
            if (e.target.classList.contains('tag-item')) {
                const tagId = parseInt(e.target.dataset.tagId);
                const tagName = e.target.dataset.tagName;
                
                if (searchSelectedTags.find(t => t.id === tagId)) {
                    // Quitar etiqueta
                    searchSelectedTags = searchSelectedTags.filter(t => t.id !== tagId);
                    e.target.classList.remove('selected');
                } else {
                    // Agregar etiqueta
                    searchSelectedTags.push({ id: tagId, name: tagName });
                    e.target.classList.add('selected');
                }
                
                updateSelectedTagsDisplay();
                updateSearchButton();
            }
        });
        
        // Botón de búsqueda
        const executeBtn = document.getElementById('btn-search-execute');
        if (executeBtn) {
            executeBtn.addEventListener('click', function() {
                if (searchSelectedTags.length > 0) {
                    executeTagSearch();
                }
            });
        }
        
        // Botón limpiar
        const clearBtn = document.getElementById('btn-clear-tags');
        if (clearBtn) {
            clearBtn.addEventListener('click', function() {
                clearSelectedTags();
            });
        }
    }

    // Configurar eventos de las pestañas
    function setupTabEvents() {
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('search-tab')) {
                const tabName = e.target.dataset.tab;
                
                // Remover clase active de todas las pestañas
                document.querySelectorAll('.search-tab').forEach(tab => {
                    tab.classList.remove('active');
                });
                
                // Remover clase active de todo el contenido de pestañas
                document.querySelectorAll('.search-tab-content').forEach(content => {
                    content.classList.remove('active');
                });
                
                // Activar la pestaña clickeada
                e.target.classList.add('active');
                
                // Mostrar el contenido correspondiente
                const targetContent = document.getElementById(`${tabName}-tab`);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            }
        });
    }

    // Configurar eventos de filtros de fecha
    function setupDateFilterEvents() {
        // Evento para cambio de tipo de fecha
        document.addEventListener('change', function(e) {
            if (e.target.id === 'date-type-select') {
                handleDateTypeChange(e.target.value);
            }
        });
        
        // Eventos para botones de búsqueda y limpiar fechas
        document.addEventListener('click', function(e) {
            if (e.target.id === 'btn-search-dates') {
                executeDateSearch();
            } else if (e.target.id === 'btn-clear-dates') {
                clearDateFilters();
            }
        });
        
        // Evento para cambios en los inputs de fecha
        document.addEventListener('change', function(e) {
            if (e.target.closest('#date-inputs')) {
                updateDateSearchButton();
            }
        });
    }

    // Manejar cambio de tipo de fecha
    function handleDateTypeChange(dateType) {
        const dateInputsContainer = document.getElementById('date-inputs');
        const searchButton = document.getElementById('btn-search-dates');
        
        if (!dateType) {
            dateInputsContainer.innerHTML = '';
            searchButton.disabled = true;
            return;
        }
        
        let inputsHTML = '';
        
        if (dateType === 'year') {
            inputsHTML = `
                <div class="date-input-group">
                    <label>Año:</label>
                    <select id="year-select">
                        <option value="">Seleccionar año</option>
                        ${generateYearOptions()}
                    </select>
                </div>
            `;

        } else if (dateType === 'month') {
            inputsHTML = `
                <div class="date-input-group">
                    <label>Año:</label>
                    <select id="year-select">
                        <option value="">Seleccionar año</option>
                        ${generateYearOptions()}
                    </select>
                </div>
                <div class="date-input-group">
                    <label>Mes:</label>
                    <select id="month-select">
                        <option value="">Seleccionar mes</option>
                        ${generateMonthOptions()}
                    </select>
                </div>
            `;

       } else if (dateType === 'day') {
            inputsHTML = `
                <div class="date-input-group">
                    <label>Fecha específica:</label>
                    <input type="date" id="specific-date" />
                </div>
            `;
        } else if (dateType === 'range') {
            inputsHTML = `
                <div class="date-input-group">
                    <label>Fecha de inicio:</label>
                    <input type="date" id="start-date" />
                </div>
                <div class="date-input-group">
                    <label>Fecha de fin:</label>
                    <input type="date" id="end-date" />
                </div>
            `;
        }
        
        dateInputsContainer.innerHTML = inputsHTML;
        updateDateSearchButton();

    }

    // Generar opciones de años (últimos 5 años + próximos 2)
    function generateYearOptions() {
        const currentYear = new Date().getFullYear();
        const startYear = currentYear - 5;
        const endYear = currentYear + 2;
        
        let options = '';
        for (let year = endYear; year >= startYear; year--) {
            options += `<option value="${year}">${year}</option>`;
        }
        return options;
    }

    // Generar opciones de meses
    function generateMonthOptions() {
        const months = [
            { value: 1, name: 'Enero' },
            { value: 2, name: 'Febrero' },
            { value: 3, name: 'Marzo' },
            { value: 4, name: 'Abril' },
            { value: 5, name: 'Mayo' },
            { value: 6, name: 'Junio' },
            { value: 7, name: 'Julio' },
            { value: 8, name: 'Agosto' },
            { value: 9, name: 'Septiembre' },
            { value: 10, name: 'Octubre' },
            { value: 11, name: 'Noviembre' },
            { value: 12, name: 'Diciembre' }
        ];
        
        return months.map(month => 
            `<option value="${month.value}">${month.name}</option>`
        ).join('');
    }

    // Actualizar estado del botón de búsqueda por fechas
    function updateDateSearchButton() {
        const searchButton = document.getElementById('btn-search-dates');
        const dateType = document.getElementById('date-type-select').value;
        
        let isValid = false;
        
        if (dateType === 'year') {
            const year = document.getElementById('year-select')?.value;
            isValid = !!year;
        } else if (dateType === 'month') {
            const year = document.getElementById('year-select')?.value;
            const month = document.getElementById('month-select')?.value;
            isValid = !!year && !!month;

        } else if (dateType === 'day') {
            const specificDate = document.getElementById('specific-date')?.value;
            isValid = !!specificDate;
        } else if (dateType === 'range') {
            const startDate = document.getElementById('start-date')?.value;
            const endDate = document.getElementById('end-date')?.value;
            isValid = !!startDate && !!endDate;
            
            // Validar que la fecha de inicio sea anterior a la fecha de fin
            if (isValid && startDate > endDate) {
                isValid = false;
                console.warn('La fecha de inicio debe ser anterior a la fecha de fin');
            }
        }

        searchButton.disabled = !isValid;
    }

    // Ejecutar búsqueda por fecha
    function executeDateSearch() {
        const dateType = document.getElementById('date-type-select').value;
        let searchUrl = 'consultar.html?';
        
        if (dateType === 'year') {
            const year = document.getElementById('year-select').value;
            searchUrl += `date_type=year&year=${year}`;
        } else if (dateType === 'month') {
            const year = document.getElementById('year-select').value;
            const month = document.getElementById('month-select').value;
            searchUrl += `date_type=month&year=${year}&month=${month}`;

       } else if (dateType === 'day') {
            const specificDate = document.getElementById('specific-date').value;
            searchUrl += `date_type=day&date=${specificDate}`;
        } else if (dateType === 'range') {
            const startDate = document.getElementById('start-date').value;
            const endDate = document.getElementById('end-date').value;
            searchUrl += `date_type=range&start_date=${startDate}&end_date=${endDate}`;
        }
        
        window.location.href = searchUrl;
    }

    // Limpiar filtros de fecha
    function clearDateFilters() {
        document.getElementById('date-type-select').value = '';
        document.getElementById('date-inputs').innerHTML = '';
        document.getElementById('btn-search-dates').disabled = true;
    }
    
    function updateSelectedTagsDisplay() {
        const container = document.getElementById('selected-tags-display');
        if (!container) return;
        
        container.innerHTML = searchSelectedTags.map(tag => 
            `<div class="selected-tag-chip">
                ${tag.name}
                <span class="remove-tag" data-tag-id="${tag.id}">×</span>
            </div>`
        ).join('');
        
        // Eventos para quitar etiquetas
        container.querySelectorAll('.remove-tag').forEach(btn => {
            btn.addEventListener('click', function() {
                const tagId = parseInt(this.dataset.tagId);
                searchSelectedTags = searchSelectedTags.filter(t => t.id !== tagId);
                const tagElement = document.querySelector(`[data-tag-id="${tagId}"].tag-item`);
                if (tagElement) {
                    tagElement.classList.remove('selected');
                }
                updateSelectedTagsDisplay();
                updateSearchButton();
            });
        });
    }

    function updateSearchButton() {
        const btn = document.getElementById('btn-search-execute');
        if (btn) {
            btn.disabled = searchSelectedTags.length === 0;
        }
    }

    function clearSelectedTags() {
        searchSelectedTags = [];
        document.querySelectorAll('.tag-item.selected').forEach(item => {
            item.classList.remove('selected');
        });
        updateSelectedTagsDisplay();
        updateSearchButton();
    }

    function executeTagSearch() {
        const selectedTagIds = searchSelectedTags.map(t => t.id);
        const searchUrl = `consultar.html?tags=${selectedTagIds.join(',')}`;
        window.location.href = searchUrl;
    }

    // Función auxiliar para manejar etiquetas
    function getDocumentTags(doc) {
        if (doc.tags_array && Array.isArray(doc.tags_array)) {
            return doc.tags_array.map(tag => Number(tag));
        }
        
        if (!doc || !doc.tags) return [];
        
        if (Array.isArray(doc.tags)) {
            return doc.tags.map(tag => Number(tag));
        }
        
        if (typeof doc.tags === 'number' || typeof doc.tags === 'string') {
            return [Number(doc.tags)];
        }
        
        return [Number(doc.tags)];
    }
}

// Call additional initialization functions - MOVED TO MAIN DOMContentLoaded


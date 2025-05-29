document.addEventListener('DOMContentLoaded', function() {
    // Configure lightbox
    lightbox.option({
        'resizeDuration': 200,
        'wrapAround': true,
        'showImageNumberLabel': true,
        'maxWidth': 800,
        'maxHeight': 800,
        'positionFromTop': 100,
        'alwaysShowNavOnTouchDevices': true,
        'albumLabel': 'Image %1 of %2'
    });

    // Smooth scroll to gallery if hash present
    if (window.location.hash === '#gallery') {
        const gallerySection = document.querySelector('.gallery-section');
        if (gallerySection) {
            setTimeout(() => {
                gallerySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 300);
        }
    }

    // Make main image clickable for lightbox
    const mainImage = document.querySelector('.main-image');
    if (mainImage) {
        mainImage.addEventListener('click', function() {
            lightbox.start(this);
        });
        
        // Add hover effects
        mainImage.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
        });
        mainImage.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }

    // Add click tracking for analytics (optional)
    const thumbnails = document.querySelectorAll('.gallery-thumbnail');
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            console.log('Gallery image clicked:', this.src);
            // You could add analytics tracking here
        });
    });

    // Responsive adjustments
    function handleResize() {
        const container = document.querySelector('.item-detail-container');
        if (window.innerWidth < 600) {
            if (container) container.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
        } else {
            if (container) container.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
        }
    }

    // Initialize and add event listener
    handleResize();
    window.addEventListener('resize', handleResize);

    // Add animation class when scrolling
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.gallery-thumbnail, .seller-link, .contact-seller-btn');
        elements.forEach(el => {
            const elPosition = el.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elPosition < screenPosition) {
                el.classList.add('animated');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load
});
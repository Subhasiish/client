// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Navigation scroll effect
const mainNav = document.querySelector('.main-nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        mainNav.classList.add('scrolled');
    } else {
        mainNav.classList.remove('scrolled');
    }
});

// Hero Section Animation
gsap.from('.hero-text', {
    duration: 1.5,
    y: 100,
    opacity: 0,
    ease: 'power3.out'
});

gsap.from('.hero-cta', {
    duration: 1.5,
    y: 50,
    opacity: 0,
    delay: 0.5,
    ease: 'power3.out'
});

// Add fade-in animation for Hero section cloud and text
const heroSection = document.querySelector('.hero');
ScrollTrigger.create({
    trigger: heroSection,
    start: 'top bottom',
    onEnter: () => {
        heroSection.classList.add('fade-in');
    },
    onLeaveBack: () => {
        heroSection.classList.remove('fade-in');
    }
});

// Villa Section Zoom Effect - REMOVED
// gsap.to('.villa-image', {
//     scrollTrigger: {
//         trigger: '.villa-section',
//         start: 'top top',
//         end: 'bottom top',
//         scrub: true
//     },
//     scale: 1.2,
//     ease: 'none'
// });

// Add fade-in animation for Villa section cloud and text - REMOVED
// const villaSection = document.querySelector('.villa-section');
// ScrollTrigger.create({
//     trigger: villaSection,
//     start: 'top bottom',
//     onEnter: () => {
//         villaSection.classList.add('fade-in');
//     },
//     onLeaveBack: () => {
//         villaSection.classList.remove('fade-in');
//     }
// });

// Immersive Island Section Scroll Animation
const immersiveIslandSection = document.querySelector('.immersive-island-section');
const islandImage = immersiveIslandSection.querySelector('.island-image-container img');

const immersiveTimeline = gsap.timeline({
    scrollTrigger: {
        trigger: '.immersive-island-section',
        start: 'top top',
        end: '+=2000', // Significantly increased scroll distance for slower, smoother control
        pin: true,
        scrub: 2, // Increased scrub value for even smoother transitions
        anticipatePin: 1,
        onUpdate: (self) => {
            // Optional: Add progress indicator
            console.log('Progress:', self.progress);
        }
    }
});

// First zoom to left bottom
immersiveTimeline
    .set(islandImage, { transformOrigin: '0% 100%' }) // Set transform origin to bottom left
    .to(islandImage, {
        scale: 2.5,
        x: '0%', // Keep at left edge
        y: '0%', // Keep at bottom
        duration: 8, // Significantly increased duration
        ease: 'power1.inOut' // Smoother easing with less acceleration
    })

    // Phase 2: Horizontal pan (move across to the right part of the image)
    .to(islandImage, {
        x: '-70%', // Pan to the right - adjust based on image content and zoom
        duration: 8, // Significantly increased duration
        ease: 'power1.inOut' // Smoother easing with less acceleration
    })

    // Phase 3: Vertical pan (simulate moving upward over the image content)
    .to(islandImage, {
        y: '100%', // Pan upward - adjust based on image content and zoom
        duration: 8, // Significantly increased duration
        ease: 'power1.inOut' // Smoother easing with less acceleration
    })

    // Phase 4: Second horizontal pan (continue moving horizontally)
    .to(islandImage, {
        x: '-100%', // Pan further to the right or left - adjust
        duration: 8, // Significantly increased duration
        ease: 'power1.inOut' // Smoother easing with less acceleration
    });

// Optional: Cursor-following parallax effect - TEMPORARILY COMMENTED OUT
// document.addEventListener('mousemove', (e) => {
//     const mouseX = e.clientX / window.innerWidth - 0.5; // -0.5 to 0.5 range
//     const mouseY = e.clientY / window.innerHeight - 0.5; // -0.5 to 0.5 range

//     // Get the current scroll-triggered transform
//     const currentX = gsap.getProperty(islandImage, 'x');
//     const currentY = gsap.getProperty(islandImage, 'y');

//     gsap.to(islandImage, {
//         x: currentX + (mouseX * 50), // Add cursor influence to current x
//         y: currentY + (mouseY * 50), // Add cursor influence to current y
//         rotationX: mouseY * 5,
//         rotationY: mouseX * 5,
//         ease: 'power1.out',
//         duration: 0.5
//     });
// });


// Final Section Animation
const finalSection = document.querySelector('.final-section');
const mainImage = document.querySelector('.main-image');
const collageItems = document.querySelectorAll('.collage-item');
const toggleButtons = document.querySelectorAll('.toggle-btn');
const bannerOverlay = document.querySelector('.banner-overlay');

if (finalSection && mainImage && collageItems.length > 0) {
    // Set initial states
    gsap.set(collageItems, {
        scale: 0.5,
        opacity: 0,
        x: function(index) {
            const positions = ['top-right', 'bottom-left', 'bottom-right'];
            const position = positions[index] || 'top-right';
            switch(position) {
                case 'top-right':
                case 'bottom-right':
                    return 300;
                case 'bottom-left':
                    return -300;
                default:
                    return 0;
            }
        },
        y: function(index) {
            const positions = ['top-right', 'bottom-left', 'bottom-right'];
            const position = positions[index] || 'top-right';
            switch(position) {
                case 'top-right':
                    return -200;
                case 'bottom-left':
                case 'bottom-right':
                    return 200;
                default:
                    return 0;
            }
        }
    });

    // Set initial state for banner
    gsap.set(bannerOverlay, {
        left: '-100%',
        opacity: 0,
        visibility: 'hidden'
    });

    // Create the timeline
    const finalTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: finalSection,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.5,
            pin: true,
            anticipatePin: 1,
            onUpdate: (self) => {
                // Optional: Add progress indicator
                console.log('Progress:', self.progress);
            }
        }
    });

    // Main image zoom animation
    finalTimeline
        .fromTo(mainImage, {
            scale: 1,
            y: 0
        }, {
            scale: 0.6,
            y: -50,
            duration: 3,
            ease: "power2.inOut"
        })
        // Animate collage items
        .to(collageItems, {
            scale: 1,
            opacity: 1,
            x: 0,
            y: 0,
            duration: 2,
            stagger: {
                amount: 1,
                from: "random"
            },
            ease: "power3.out"
        }, "-=1")
        // Animate banner overlay
        .to(bannerOverlay, {
            left: '0%',
            opacity: 1,
            visibility: 'visible',
            duration: 1,
            ease: "power2.inOut"
        }, "-=0.5");

    // Toggle button functionality
    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            toggleButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            // Get the selected aesthetic
            const selectedAesthetic = button.dataset.aesthetic;
            
            // Here you would typically change the images based on the selected aesthetic
            // For example:
            // updateImages(selectedAesthetic);
        });
    });

    // Set initial active state
    toggleButtons[0].classList.add('active');
}

// Fade in elements on scroll
const fadeElements = document.querySelectorAll('.cloud-text-overlay, .villa-image h2');

fadeElements.forEach(element => {
    gsap.from(element, {
        scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out'
    });
});

// Handle scroll indicator visibility
const scrollIndicator = document.querySelector('.scroll-indicator');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        scrollIndicator.style.opacity = '0';
    } else {
        scrollIndicator.style.opacity = '1';
    }
});

// Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const menuOverlay = document.querySelector('.menu-overlay');
const menuClose = document.querySelector('.menu-close');
const menuLinks = document.querySelectorAll('.menu-links a');

// Toggle menu function
function toggleMenu() {
    menuToggle.classList.toggle('active');
    menuOverlay.classList.toggle('active');
    
    if (menuOverlay.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

// Event listeners
menuToggle.addEventListener('click', toggleMenu);
menuClose.addEventListener('click', toggleMenu);

menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (menuOverlay.classList.contains('active')) {
            toggleMenu();
        }
    });
});

// Close menu when clicking outside
menuOverlay.addEventListener('click', (e) => {
    if (e.target === menuOverlay) {
        toggleMenu();
    }
});

// Initialize Locomotive Scroll and integrate with ScrollTrigger
function init() {
    gsap.registerPlugin(ScrollTrigger);

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector(".main"),
        smooth: true
    });

    locoScroll.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy(".main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },

        pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
    });

    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    ScrollTrigger.refresh();
}

init();

// Cloud Transition Parallax Effect
// const cloudOverlay = document.querySelector('.cloud-overlay');
// if (cloudOverlay) {
//     window.addEventListener('scroll', () => {
//         const scrolled = window.pageYOffset;
//         cloudOverlay.style.transform = `translateY(${scrolled * 0.2}px)`;
//     });
// } 
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
const textOverlays = immersiveIslandSection.querySelectorAll('.island-text-overlay');

// Reset text overlays
textOverlays.forEach(overlay => overlay.classList.remove('active'));

const immersiveTimeline = gsap.timeline({
    scrollTrigger: {
        trigger: '.immersive-island-section',
        start: 'top top',
        end: '+=4000',
        pin: true,
        scrub: 3,
        anticipatePin: 1,
        onUpdate: (self) => {
            const progress = self.progress;
            
            // First text overlay (0-20%)
            if (progress >= 0 && progress < 0.2) {
                textOverlays[0].classList.add('active');
                textOverlays[1].classList.remove('active');
                textOverlays[2].classList.remove('active');
                textOverlays[3].classList.remove('active');
            }
            // Second text overlay (20-45%)
            else if (progress >= 0.2 && progress < 0.45) {
                textOverlays[0].classList.remove('active');
                textOverlays[1].classList.add('active');
                textOverlays[2].classList.remove('active');
                textOverlays[3].classList.remove('active');
            }
            // Third text overlay (45-70%)
            else if (progress >= 0.45 && progress < 0.7) {
                textOverlays[0].classList.remove('active');
                textOverlays[1].classList.remove('active');
                textOverlays[2].classList.add('active');
                textOverlays[3].classList.remove('active');
            }
            // Fourth text overlay (70-100%)
            else if (progress >= 0.7) {
                textOverlays[0].classList.remove('active');
                textOverlays[1].classList.remove('active');
                textOverlays[2].classList.remove('active');
                textOverlays[3].classList.add('active');
            }
        }
    }
});

// First zoom to left bottom
immersiveTimeline
    .set(islandImage, { transformOrigin: '0% 100%' })
    .to(islandImage, {
        scale: 2.5,
        x: '0%',
        y: '0%',
        duration: 15,
        ease: 'power1.inOut'
    })
    // Phase 2: Horizontal pan with adjusted values
    .to(islandImage, {
        x: '-40%', // Reduced to keep text centered
        duration: 15,
        ease: 'power1.inOut'
    })
    // Phase 3: Vertical pan with adjusted values
    .to(islandImage, {
        y: '60%', // Reduced to keep text centered
        duration: 15,
        ease: 'power1.inOut'
    })
    // Phase 4: Second horizontal pan with adjusted values
    .to(islandImage, {
        x: '-60%', // Reduced to keep text centered
        duration: 15,
        ease: 'power1.inOut'
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

    // Create the timeline with smoother parameters
    const finalTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: finalSection,
            start: "top top",
            end: "+=2000", // Significantly increased scroll distance
            scrub: 2.5, // Increased scrub value for smoother transitions
            pin: true,
            anticipatePin: 1,
            onUpdate: (self) => {
                // Optional: Add progress indicator
                console.log('Progress:', self.progress);
            }
        }
    });

    // Main image zoom animation with smoother easing
    finalTimeline
        .fromTo(mainImage, {
            scale: 1,
            y: 0
        }, {
            scale: 0.6,
            y: -50,
            duration: 8, // Increased duration for slower animation
            ease: "power1.inOut" // Smooth easing
        })
        // Animate banner overlay first
        .to(bannerOverlay, {
            left: '0%',
            opacity: 1,
            visibility: 'visible',
            duration: 4, // Increased duration for slower animation
            ease: "power1.inOut" // Smooth easing
        }, "-=2")
        // Then animate collage items
        .to(collageItems, {
            scale: 1,
            opacity: 1,
            x: 0,
            y: 0,
            duration: 6, // Increased duration for slower animation
            stagger: {
                amount: 3, // Increased stagger amount for slower sequential animation
                from: "random",
                ease: "power1.inOut" // Smooth easing for stagger
            },
            ease: "power1.inOut" // Smooth easing
        }, "-=2"); // Adjusted overlap timing

    // Toggle button functionality with smooth transitions
    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons with smooth transition
            toggleButtons.forEach(btn => {
                gsap.to(btn, {
                    opacity: 0.7,
                    duration: 0.5, // Increased duration for smoother transition
                    ease: "power1.inOut",
                    onComplete: () => btn.classList.remove('active')
                });
            });
            
            // Add active class to clicked button with smooth transition
            gsap.to(button, {
                opacity: 1,
                duration: 0.5, // Increased duration for smoother transition
                ease: "power1.inOut",
                onComplete: () => button.classList.add('active')
            });
            
            // Get the selected aesthetic
            const selectedAesthetic = button.dataset.aesthetic;
            
            // Here you would typically change the images based on the selected aesthetic
            // For example:
            // updateImages(selectedAesthetic);
        });
    });

    // Set initial active state with smooth transition
    gsap.to(toggleButtons[0], {
        opacity: 1,
        duration: 0.5, // Increased duration for smoother transition
        ease: "power1.inOut",
        onComplete: () => toggleButtons[0].classList.add('active')
    });
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
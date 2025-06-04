// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Hero Section Animation
gsap.from('.hero-content', {
    duration: 1.5,
    y: 100,
    opacity: 0,
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
        end: '+=1000', // Increased scroll distance for smoother control
        pin: true,
        scrub: 0.5, // Reduced scrub value for smoother scrubbing
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
        duration: 4, // Increased duration
        ease: 'power3.inOut' // Smoother easing
    })

    // Phase 2: Horizontal pan (move across to the right part of the image)
    .to(islandImage, {
        x: '-70%', // Pan to the right - adjust based on image content and zoom
        duration: 4, // Increased duration
        ease: 'power3.inOut' // Smoother easing
    })

    // Phase 3: Vertical pan (simulate moving upward over the image content)
    .to(islandImage, {
        y: '100%', // Pan upward - adjust based on image content and zoom
        duration: 4, // Increased duration
        ease: 'power3.inOut' // Smoother easing
    })

    // Phase 4: Second horizontal pan (continue moving horizontally)
    .to(islandImage, {
        x: '-100%', // Pan further to the right or left - adjust
        duration: 4, // Increased duration
        ease: 'power3.inOut' // Smoother easing
    })

    //  .to(islandImage, {
    //     y: '-100%', // Pan upward - adjust based on image content and zoom
    //     duration: 4, // Increased duration
    //     ease: 'power3.inOut' // Smoother easing
    // });

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
const textOverlay = document.querySelector('.text-overlay');
const collageItems = document.querySelectorAll('.collage-item');

if (finalSection && mainImage && textOverlay && collageItems.length > 0) {
    // Set initial states
    gsap.set(collageItems, {
        scale: 0.5,
        opacity: 0,
        x: function(index) {
            const positions = ['top-left', 'top-right', 'middle-left', 'middle-right', 'bottom-left', 'bottom-right'];
            const position = positions[index] || 'top-left';
            switch(position) {
                case 'top-left':
                case 'middle-left':
                case 'bottom-left':
                    return -300;
                case 'top-right':
                case 'middle-right':
                case 'bottom-right':
                    return 300;
                default:
                    return 0;
            }
        },
        y: function(index) {
            const positions = ['top-left', 'top-right', 'middle-left', 'middle-right', 'bottom-left', 'bottom-right'];
            const position = positions[index] || 'top-left';
            switch(position) {
                case 'top-left':
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

    // Create the timeline
    const finalTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: finalSection,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.2, // Reduced from 1 for smoother scrubbing
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
            scale: 0.7,
            y: -50,
            duration: 3, // Increased duration
            ease: "power2.inOut", // Smoother easing
            overwrite: "auto" // Prevents animation conflicts
        })
        // Fade in text overlay
        .to(textOverlay, {
            opacity: 1,
            y: 0,
            duration: 2, // Increased duration
            ease: "power3.out", // Smoother easing
            overwrite: "auto"
        }, "-=0.5") // Adjusted overlap timing
        // Animate collage items
        .to(collageItems, {
            scale: 1,
            opacity: 1,
            x: 0,
            y: 0,
            duration: 2, // Increased duration
            stagger: {
                amount: 1.2, // Increased stagger amount
                from: "random",
                grid: "auto", // Added grid-based staggering
                axis: "xy" // Stagger in both x and y directions
            },
            ease: "power3.out", // Smoother easing
            overwrite: "auto"
        }, "-=1"); // Adjusted overlap timing
}

// Initial state for elements before animation starts
// Removed problematic gsap.set calls that caused ReferenceErrors

// Button toggle functionality (optional, based on image; not scroll-triggered)
const toggleButtons = finalSection.querySelectorAll('.button-toggle .toggle-btn');

toggleButtons.forEach(button => {
    button.addEventListener('click', () => {
        toggleButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        // Add logic here to change interior aesthetics (images) based on active button
        // This would likely involve changing image sources or CSS classes
    });
});

// Smooth scroll for navigation - REMOVED in favor of Lenis
// document.querySelectorAll('a[href^="#"]').forEach(anchor => {
//     anchor.addEventListener('click', function (e) {
//         e.preventDefault();
//         document.querySelector(this.getAttribute('href')).scrollIntoView({
//             behavior: 'smooth'
//         });
//     });
// });

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

// Menu Toggle (New Implementation)
const menuToggle = document.querySelector('.menu-toggle');
const menuOverlay = document.querySelector('.menu-overlay');
const menuLinks = document.querySelectorAll('.menu-content a');

console.log('Script loaded. Menu elements:', { menuToggle, menuOverlay, menuLinks });

// Initial state of the menu overlay (hidden off-screen)
gsap.set(menuOverlay, { right: '-100%', autoAlpha: 0 }); // Set initial opacity to 0 as well

// GSAP timeline for menu animation
const menuTimeline = gsap.timeline({
    paused: true, // Pause initially
    defaults: { ease: 'power3.inOut', duration: 0.8 } // Increased duration for smoother animation
});

menuTimeline.to(menuOverlay, { right: '0%', autoAlpha: 1 }); // Slide in and fade in

// Toggle menu function
function toggleMenu() {
    menuToggle.classList.toggle('active');
    if (menuToggle.classList.contains('active')) {
        console.log('Opening menu');
        menuTimeline.play();
        document.body.style.overflow = 'hidden'; // Lock body scroll
    } else {
        console.log('Closing menu');
        menuTimeline.reverse();
        document.body.style.overflow = ''; // Unlock body scroll
    }
}

// Event listeners
if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        console.log('Menu toggle clicked');
        toggleMenu();
    });
} else {
    console.error('Menu toggle button not found');
}

if (menuLinks.length > 0) {
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            console.log('Menu link clicked', link.getAttribute('href'));
            // Check if menu is open before trying to close
            if (menuToggle.classList.contains('active')) {
                 toggleMenu(); // Close menu
            }
        });
    });
} else {
     console.warn('No menu links found');
}

// Close menu when clicking outside (on the overlay itself)
if (menuOverlay) {
    menuOverlay.addEventListener('click', (e) => {
        if (e.target === menuOverlay) {
            console.log('Clicked outside menu overlay');
             // Check if menu is open before trying to close
             if (menuToggle.classList.contains('active')) {
                 toggleMenu(); // Close menu
            }
        }
    });
}

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
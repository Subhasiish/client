# Immersive Island Experience

A modern, interactive web experience featuring smooth scroll animations and immersive visual effects.

## Features

### 1. Navigation
- Smooth scroll-based navigation effects
- Responsive navigation menu with overlay
- Dynamic scroll indicator

### 2. Hero Section
- Fade-in animations for text and CTA elements
- Smooth cloud transition effects
- Responsive design

### 3. Immersive Island Section
The centerpiece of the experience features a sophisticated scroll-based animation sequence:

#### Animation Parameters
- Scroll distance: 2000px
- Smooth scrubbing with value: 2
- Four distinct animation phases:
  1. Initial zoom to bottom left
  2. Horizontal pan to right
  3. Vertical upward movement
  4. Final horizontal pan

#### Animation Timing
- Each phase duration: 8 seconds
- Smooth easing using `power1.inOut`
- Pinned section during animation
- Transform origin: bottom left (0% 100%)

### 4. Final Section
- Dynamic collage animation
- Toggle-able aesthetic views
- Smooth banner overlay transitions

## Technical Implementation

### Dependencies
- GSAP (GreenSock Animation Platform)
- ScrollTrigger plugin
- Locomotive Scroll

### Key Animation Features
- Smooth scroll-based animations
- Parallax effects
- Responsive design
- Cross-browser compatibility

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Include required scripts:
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.x.x/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.x.x/ScrollTrigger.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/locomotive-scroll@4.1.1/dist/locomotive-scroll.min.js"></script>
```

3. Initialize the animations:
```javascript
// The animations are automatically initialized when the page loads
// No additional setup required
```

## Browser Support
- Chrome (recommended)
- Firefox
- Safari
- Edge

## Performance Considerations
- Optimized animations for smooth performance
- Efficient use of GSAP for better performance
- Smooth scrubbing for better user experience

## Contributing
Feel free to submit issues and enhancement requests!

## License
[Add your license information here]

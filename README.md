# FORMA – Art & Advertising Studio Website

A premium, production-ready React website for an art direction and advertising studio. Built with React 18, TypeScript, Vite, and Three.js.

## Quick Start

```bash
npm install
npm run dev
```

The application will be available at `http://localhost:5173`. For detailed setup instructions, see `QUICKSTART.md`.

## Overview

FORMA is a fully-functional single-page website that showcases the work and services of an art direction studio founded by Ariana Moradi.

**Studio Identity:**
- **Name**: FORMA
- **Tagline**: Where Art Shapes Attention.
- **Founder**: Ariana Moradi
- **Offices**: Yerevan, Dubai, London
- **Contact**: hello@forma-studio.com

## Technical Stack

- **React 18** – Component-based UI framework
- **TypeScript** – Full type safety across the application
- **Vite** – Fast, modern build tool and dev server
- **React Three Fiber & Drei** – 3D graphics and scene management
- **Framer Motion** – Advanced animation library
- **CSS Modules** – Locally scoped, conflict-free styling
- **i18next** – Multilingual support (English, Russian, Persian with RTL)
- **Intersection Observer API** – Performance-optimized scroll-triggered animations

## Key Features

### Advanced Animation System

The site implements a sophisticated, performance-optimized animation system:

- **Class-Based Scroll Reveals**: A stagger-reveal system that uses the Intersection Observer API and CSS classes to trigger animations. This approach minimizes main-thread JavaScript execution.
- **Custom Easing Curves**: Refined cubic-bezier easing functions for smooth, natural motion.
- **Shimmer Effects**: Elegant gold shimmer animations that add visual interest to key elements.
- **Loader Animation**: SVG stroke animation for the page loader.

### 3D Hero Scene

The hero section features a sophisticated Three.js scene with:

- **TorusKnot Geometry**: An intricate centerpiece that draws attention
- **Refined Lighting**: Carefully tuned lights to create dramatic, professional mood
- **Multi-Layered Parallax**: Dynamic particle system with three layers of sparkles that respond to mouse movement

### 13 Core Components

1. **Loader** – Page initialization animation
2. **Navigation** – Fixed header with scroll effects and language toggle
3. **Hero** – 3D scene with parallax effects
4. **Services** – 2×2 grid with hover animations
5. **Portfolio** – 3-column grid featuring studio work
6. **Process** – 5-step workflow visualization
7. **Stats** – Animated numerical counters
8. **Clients** – Client logos in a responsive grid
9. **Founder** – Founder profile with SVG artwork
10. **Journal** – Blog/article card grid
11. **Contact** – Contact form with validation
12. **Footer** – Site footer with links
13. **Agent Panel** – AI chat interface

### Responsive & Accessible

- Fully responsive design optimized for all device sizes
- Accessible color contrast and semantic HTML
- Touch-friendly interactive elements
- Performance optimizations for mobile devices

### Multilingual Support

Supports three languages with proper locale handling:

- English (LTR)
- Russian (LTR)
- Persian/Farsi (RTL with adapted typography)

Users can switch languages via the language toggle in the navigation bar.

## Project Structure

```
src/
├── components/               (13 components with TypeScript + CSS Modules)
│   ├── Loader/
│   ├── Nav/
│   ├── Hero/
│   ├── Services/
│   ├── Portfolio/
│   ├── Process/
│   ├── Stats/
│   ├── Clients/
│   ├── Founder/
│   ├── Journal/
│   ├── Contact/
│   ├── Footer/
│   └── AgentPanel/
├── hooks/
│   ├── useScrollReveal.ts        (Scroll-triggered animations)
│   ├── useCounter.ts             (Animated number counters)
│   ├── useActiveSection.ts       (Active navigation tracking)
│   ├── useMouseTrack.ts          (Mouse position tracking)
│   ├── useParallax.ts            (Parallax scroll effects)
│   └── useReducedMotion.ts       (Accessibility: respects prefers-reduced-motion)
├── context/
│   └── LanguageContext.tsx       (i18next integration)
├── locales/
│   ├── en.json
│   ├── ru.json
│   └── fa.json
├── App.tsx
├── main.tsx
└── index.css                 (Global styles, variables, keyframes)
```

## Customization

### Change Colors

Edit the CSS variables in `src/index.css`:

```css
:root {
  --bg: #0B0B0B;
  --gold: #C9A84C;
  --text: #F0EBE0;
  /* ...other variables */
}
```

### Change Text Content

Update the translation files in `src/locales/`:

```json
{
  "hero.title": "Where Art Shapes Attention.",
  "services.title": "Our Services",
  /* ...other translations */
}
```

### Add or Modify Components

1. Create a new folder in `src/components/`
2. Add `Component.tsx` and `Component.module.css`
3. Import and use in `src/App.tsx`

## Available Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

## Browser Support

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

Requires modern browser features: ES6+, CSS Grid, Flexbox, IntersectionObserver, and WebGL.

## Design System

The site uses a carefully considered color palette and typography system:

**Colors:**
- Background: Dark gray (#0B0B0B)
- Accent: Gold (#C9A84C)
- Text: Light beige (#F0EBE0)
- Muted: Medium gray (#666666)

**Typography:**
- Display: Playfair Display (serif)
- Body: DM Sans (sans-serif)
- Mono: IBM Plex Mono (monospace)
- Persian: Vazirmatn (for RTL text)

**Easing Functions:**
- Spring entrance: cubic-bezier(0.16, 1, 0.3, 1)
- Smooth exit: cubic-bezier(0.77, 0, 0.175, 1)

## Performance Considerations

- Scroll animations use the Intersection Observer API for efficiency
- 3D scene rendering is optimized and pauses when off-screen
- CSS transforms and opacity are used for animations
- Google Fonts are loaded with `display=swap` for optimal performance
- Bundle is optimized through Vite's tree-shaking and code splitting

## What's Included

- 100% of original visual design preserved
- All animations and interactive elements
- Multilingual interface with RTL support
- Form validation with error handling
- SEO-friendly semantic HTML
- Mobile-first responsive design
- Performance optimizations throughout

## Status

Production-ready. All components are fully functional and tested. The site is ready for development, customization, and deployment.

## License

Proprietary. All rights reserved.

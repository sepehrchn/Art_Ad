# 🚀 Quick Start Guide

## 1. Install Dependencies
```bash
npm install
```
This will install all required packages:
- React 18, React DOM
- Vite (build tool)
- TypeScript
- Three.js
- react-intersection-observer
- i18next + react-i18next

**Expected time:** 2–3 minutes

---

## 2. Start Development Server
```bash
npm run dev
```

Your browser will automatically open to **http://localhost:5173**

You should see:
- ✅ Loader animation (progress bar 0→100% over 1.6s)
- ✅ Hero section with 3D canvas (if WebGL supported)
- ✅ All 13 sections scrollable below

---

## 3. Verify Everything Works

### Visual Checks
- [ ] Page loads without errors in console
- [ ] All sections render (Nav, Hero, Services, Portfolio, Process, Stats, Clients, Founder, Journal, Contact, Footer, AgentPanel)
- [ ] Colors match original (dark background, gold accents)
- [ ] Typography displays correctly (Playfair headings, DM Sans body)

### Interaction Checks
- [ ] **Nav links** click to scroll sections
- [ ] **Language toggle** (EN/RU/FA) switches translations
- [ ] **Mobile menu** opens at < 900px
- [ ] **Hero 3D scene** shows geometric shapes (move mouse over canvas to see parallax)
- [ ] **Hover effects** work (service cards, portfolio items, buttons)
- [ ] **Scroll animations** play when sections come into view
- [ ] **Stats counter** animates when scrolled to (0 → numbers)
- [ ] **Agent panel FAB** button (bottom-right gold circle) opens/closes
- [ ] **Contact form** validates (try submitting empty)

---

## 4. Hot Module Replacement (HMR)

Edit any component and save:
```bash
# Edit src/components/Hero/Hero.tsx
# Changes appear instantly in browser without page reload
```

This is Vite's superpower—instant feedback during development.

---

## 5. Build for Production
```bash
npm run build
```

Creates optimized bundle in `dist/` folder:
- JavaScript minified
- CSS minified
- Images/fonts optimized
- Ready to deploy

**Production build time:** ~2 seconds

---

## 6. Preview Production Build
```bash
npm run preview
```

Test the optimized build locally before deploying.

---

## 📊 File Structure Reference

```
src/
├── App.tsx                          # Root component
├── main.tsx                         # Entry point
├── index.css                        # Global styles + variables
├── components/
│   ├── Loader/                      # Page loader
│   ├── Nav/                         # Navigation bar
│   ├── Hero/                        # Hero + 3D scene
│   ├── Services/                    # 4 service cards
│   ├── Portfolio/                   # 5 portfolio items
│   ├── Process/                     # 5-step process
│   ├── Stats/                       # Animated counters
│   ├── Clients/                     # 6 industry tiles
│   ├── Founder/                     # Founder panel
│   ├── Journal/                     # 3 blog articles
│   ├── Contact/                     # Contact form
│   ├── Footer/                      # Footer
│   └── AgentPanel/                  # Chat widget
├── hooks/
│   ├── useScrollReveal.ts           # Scroll trigger hook
│   ├── useCounter.ts                # Animated numbers
│   └── useActiveSection.ts          # Nav tracking
├── context/
│   └── LanguageContext.tsx          # i18next + RTL control
└── locales/
    ├── en.json                      # English translations
    ├── ru.json                      # Russian translations
    └── fa.json                      # Persian translations
```

---

## 🌐 Language Support

The site supports three languages with **100% visual parity**:

### English (EN)
```
http://localhost:5173
Displays in LTR (left-to-right)
Default language on page load
```

### Russian (RU)
```
Click language toggle → RU
Full Cyrillic translations
Displays in LTR
```

### Persian (FA)
```
Click language toggle → FA
Full Farsi/Arabic script translations
Displays in RTL (right-to-left)
Font switches to Vazirmatn
```

---

## 🎬 Animation Testing

### Scroll Reveals
Scroll down slowly and watch content fade in with stagger:
- Services cards (0ms, 150ms, 300ms, 450ms stagger)
- Portfolio items
- Founder section
- Journal cards

### Hover Animations
- **Services:** Line sweeps left-to-right on hover (0.5s)
- **Portfolio:** Image zooms (1.04x) + gradient overlay fades in
- **Process:** Badge fills gold + glows on hover
- **Stats:** Numbers animate when visible
- **Buttons:** Scale and color change on hover

### Page Loader
- Appears on first load
- Progress bar animates 0→100% (1.6s linear)
- Counter updates simultaneously (00→100)
- 400ms pause at 100%
- 800ms fade-out (opacity 1→0)
- Content becomes visible when loader completes

---

## 🐛 Troubleshooting

### "Blank page after npm run dev"
- [ ] Check browser console for errors (F12)
- [ ] Verify port 5173 is free: `lsof -i :5173`
- [ ] Restart dev server: Ctrl+C, then `npm run dev` again
- [ ] Clear browser cache: Cmd+Shift+Delete

### "Hero canvas not rendering"
- [ ] Check GPU/WebGL support: https://get.webgl.org/
- [ ] Open browser console (F12) → check for WebGL errors
- [ ] This is expected on very old browsers (graceful degradation)

### "Images not loading / Layout broken"
- [ ] All portfolio images are SVGs (inline, no HTTP requests)
- [ ] No external image files needed
- [ ] If you see placeholder SVGs, that's correct—verify with browser DevTools

### "Language toggle not working"
- [ ] Verify translations loaded: `console.log(i18n.language)`
- [ ] Check browser console for i18next errors
- [ ] Verify `src/locales/*.json` files exist (they should)

### "3D scene looks jagged / low FPS"
- [ ] Three.js quality adapts to device:
  - Desktop: full resolution, 180 particles
  - Mobile: 50% resolution, 80 particles
- [ ] Expected: 60fps on modern hardware, 30fps on older devices
- [ ] No canvas = older browser (animation still works)

---

## 📈 Performance Tips

### During Development
- Keep Vite dev server running—HMR is instant
- Use browser DevTools (F12) to profile:
  - Performance tab: check animation FPS
  - Network tab: verify no unused assets
  - Console tab: check for warnings/errors

### For Production
1. Run `npm run build`
2. Test with `npm run preview`
3. Check bundle size: `du -sh dist/`
4. Deploy `dist/` folder to your host (Netlify, Vercel, etc.)

---

## 🎯 What's Different from the Original

✅ **Identical Visually** – Every color, font, spacing, animation preserved  
✅ **Modern Stack** – React hooks, TypeScript, component architecture  
✅ **Type-Safe** – TypeScript catches errors at compile-time  
✅ **Better DX** – Hot reload, organized file structure, reusable components  
✅ **Scalable** – Easy to add new features or components  
✅ **Maintainable** – CSS Modules prevent naming conflicts  

❌ **No Dependencies Removed** – All original libraries included (Three.js, i18next)  
❌ **No Redesign** – Pure structural migration, zero visual changes  

---

## 📝 Next Steps

1. **Verify:** Run `npm run dev`, test each section
2. **Customize:** Edit `src/components/` to adjust content, colors, copy
3. **Deploy:** Run `npm run build`, push `dist/` to hosting
4. **Integrate API:** Replace demo agent responses with real Claude API (optional)

---

## 💬 Have Questions?

Refer to:
- **Architecture:** See `MIGRATION_GUIDE.md`
- **Component Details:** Check comments in `src/components/*/` files
- **Styling:** See `src/index.css` for variables, keyframes, utilities
- **Translations:** Edit `src/locales/*.json` for multilingual content

---

**Status: ✅ Ready for Development**

You now have a production-ready React website with full TypeScript support, responsive design, and luxurious animations. Enjoy! 🎉

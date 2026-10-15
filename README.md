# 🚀 NOVA STUDIO — Responsive Store Landing Page Design

An e-commerce landing page crafted with **semantic HTML5**, **custom CSS3**, and enhanced with **Tailwind CSS**, **Font Awesome 6**, and **Google Fonts**.

---

## 📸 Screenshots Showcase

All screenshots are stored in the [`screenshots/`](screenshots/) directory.

| Viewport | Preview / Description | File |
| :--- | :--- | :--- |
| **Desktop Landing Viewport** | Hero banner, sticky navigation bar, trust metrics, and flagship product card showcase | [`desktop-landing.png`](screenshots/desktop-landing.png) |
| **Desktop Products Grid** | 4-column responsive grid with 8 curated product cards, category filters, ratings, badges, and "Shop Now" buttons | [`desktop-products.png`](screenshots/desktop-products.png) |
| **Desktop Full Page** | Complete end-to-end page showcase: Hero, Features, Products, Special Offers, Testimonials, Newsletter, and Footer | [`desktop-fullpage.png`](screenshots/desktop-fullpage.png) |
| **Interactive Cart Drawer** | Slide-over cart drawer with quantity adjustments, subtotal calculation, and checkout trigger | [`desktop-cart-drawer.png`](screenshots/desktop-cart-drawer.png) |
| **Mobile Landing Viewport** | Optimized mobile layout (390×844 iPhone/Android viewport) with compact header, cart counter, and touch CTAs | [`mobile-landing.png`](screenshots/mobile-landing.png) |
| **Mobile Products View** | Fluid single-column responsive product cards optimized for mobile screens | [`mobile-products.png`](screenshots/mobile-products.png) |
| **Mobile Navigation Menu** | Off-canvas mobile drawer with search input, icon navigation links, and support details | [`mobile-menu.png`](screenshots/mobile-menu.png) |

---

## 🎨 Design Choices & Development Rationale

### 1. Visual Theme & Color Psychology
- **Dark Mode Aesthetic (`#0b0f19` & `#111827`)**: Tech hardware and lifestyle accessories pop against a deep, sleek dark background. It minimizes glare, highlights product photography, and provides a modern, premium feel.
- **Vibrant Accent Palette**: 
  - **Electric Indigo (`#6366f1`)** and **Cyan (`#06b6d4`)** provide a futuristic gradient identity.
  - **Amber (`#f59e0b`)** highlights customer ratings and special offers.
  - **Emerald Green (`#10b981`)** provides positive reassurance for stock, battery life, and cart confirmations.
- **Glassmorphism & Ambient Glows**: Utilizes `backdrop-filter: blur(16px)` on the sticky header and radial gradient mesh lights behind hero elements.

### 2. Typography Strategy
- **Display Font (`Outfit`)**: High-character, geometric sans-serif for headings, branding, prices, and badges.
- **Body Font (`Plus Jakarta Sans`)**: Clean, legible, accessible sans-serif tuned for readability across small and large screens.

### 3. Grid Architecture & Responsiveness
- **Desktop (1025px+)**: 4-column product grid (`repeat(4, 1fr)`), 2-column hero split with floating badges, 4-column footer.
- **Tablet (769px – 1024px)**: 2-column product grid, 2-column features grid, 2-column footer, centered hero.
- **Mobile (≤ 768px)**:
  - Header collapses into a clean top bar with Brand Logo, Cart icon with live counter, and Hamburger drawer toggle.
  - Off-canvas slide-out navigation menu with search input and direct section anchors.
  - Single-column fluid product cards with full touch affordance.
  - Responsive countdown timer and full-width CTA buttons.

### 4. Interactive UX & Micro-Interactions
- **Product Card Hover Effects**: Card elevates `translateY(-8px)`, subtle border glow activates, and the product image smoothly zooms (`scale(1.08)`).
- **Interactive Filter Tabs**: Filter between "All Products", "Audio Gear", "Wearables", and "Workspace" with real-time DOM filtering.
- **"Shop Now" & Cart Slide-Over**:
  - Clicking "Shop Now" adds the product to cart, pops the badge counter, and displays a non-intrusive toast notification.
  - Slide-over drawer lets users adjust quantities, delete items, view subtotal, and simulate checkout.
- **Wishlist Toggle**: Interactive heart toggle with counter badge and feedback toast.
- **Promotional Countdown & Coupon**: Live countdown clock and one-click copyable coupon code (`LAUNCH20`).

---

## 🧩 Extra Points: Frameworks & Libraries Added

1. **Tailwind CSS CDN**: Integrated for responsive utility enhancements and modern component styling.
2. **Font Awesome 6 (Free CDN)**: Vector icons for intuitive visual cues (cart, wishlist, search, shipping, warranty, security, social media, and credit cards).
3. **Google Fonts CDN**: Preconnected font delivery for `Outfit` and `Plus Jakarta Sans`.
4. **Pure Custom CSS (`style.css` & `css/style.css`)**: Written from scratch with CSS custom properties (`:root`), flexbox/grid layout rules, keyframes, transitions, and media queries.

---

## 📁 Project File Structure

```text
checkpoint15102026/
├── index.html                   # Semantic HTML5 store landing page
├── style.css                    # Clean, well-commented custom stylesheet
├── css/
│   └── style.css                # Modular stylesheet duplicate for standard paths
├── js/
│   └── main.js                  # Modular JavaScript (cart, filters, mobile menu, toast)
├── assets/
│   └── images/                  # High-resolution product & hero images
│       ├── hero-product.jpg     # Flagship headphones showcase
│       ├── product-1.jpg        # Aura Pro Wireless ANC Headphones
│       ├── product-2.jpg        # Pulse Ultra Titanium Smartwatch
│       ├── product-3.jpg        # Zenith Mechanical Keyboard
│       ├── product-4.jpg        # Nomad Minimalist Tech Backpack
│       ├── product-5.jpg        # Lumina Studio LED Desk Lamp
│       ├── product-6.jpg        # Orbit Fast Wireless Charging Dock
│       ├── product-7.jpg        # Apex Ultra Wireless Mouse
│       └── product-8.jpg        # SoundBar Compact Hi-Fi Speaker
├── screenshots/                 # Captured responsive screenshots
│   ├── desktop-landing.png      # Desktop hero and header viewport
│   ├── desktop-products.png     # Desktop product cards section
│   ├── desktop-fullpage.png     # Complete desktop full-page scroll
│   ├── desktop-cart-drawer.png  # Interactive cart drawer open
│   ├── mobile-landing.png       # Mobile smartphone viewport
│   ├── mobile-products.png      # Mobile product card layout
│   └── mobile-menu.png          # Mobile navigation drawer open
├── take-screenshots.js          # Automated headless browser screenshot runner
└── README.md                    # Project documentation & design choices
```

---

## 💻 How to View & Test

1. **Directly in Any Browser**:
   - Double-click or open `index.html` in Microsoft Edge, Google Chrome, Firefox, or Safari.
2. **Using a Local Server** (optional):
   ```bash
   # Using Node.js
   npx serve .
   # or using Python
   python -m http.server 8000
   ```
   Navigate to `http://localhost:8000`.
3. **Responsive Testing**:
   - Open DevTools (`F12` or `Ctrl + Shift + I` / `Cmd + Option + I`).
   - Toggle Device Toolbar (`Ctrl + Shift + M`).
   - Test presets such as iPhone 14/15, Samsung Galaxy, iPad, and 1440p/1080p Desktop.


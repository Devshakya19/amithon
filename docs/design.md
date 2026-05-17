---
name: Amithon Tech Portal
colors:
  surface: '#f8f9fa'
  surface-dim: '#d9dadb'
  surface-bright: '#f8f9fa'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f4f5'
  surface-container: '#edeeef'
  surface-container-high: '#e7e8e9'
  surface-container-highest: '#e1e3e4'
  on-surface: '#191c1d'
  on-surface-variant: '#564334'
  inverse-surface: '#2e3132'
  inverse-on-surface: '#f0f1f2'
  outline: '#897362'
  outline-variant: '#ddc1ae'
  surface-tint: '#904d00'
  primary: '#904d00'
  on-primary: '#ffffff'
  primary-container: '#ff8c00'
  on-primary-container: '#623200'
  inverse-primary: '#ffb77d'
  secondary: '#4b53bc'
  on-secondary: '#ffffff'
  secondary-container: '#8991fe'
  on-secondary-container: '#1b218f'
  tertiary: '#00658f'
  on-tertiary: '#ffffff'
  tertiary-container: '#00b5fc'
  on-tertiary-container: '#004360'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdcc3'
  primary-fixed-dim: '#ffb77d'
  on-primary-fixed: '#2f1500'
  on-primary-fixed-variant: '#6e3900'
  secondary-fixed: '#e0e0ff'
  secondary-fixed-dim: '#bfc2ff'
  on-secondary-fixed: '#00006e'
  on-secondary-fixed-variant: '#3239a3'
  tertiary-fixed: '#c7e7ff'
  tertiary-fixed-dim: '#85cfff'
  on-tertiary-fixed: '#001e2e'
  on-tertiary-fixed-variant: '#004c6c'
  background: '#f8f9fa'
  on-background: '#191c1d'
  surface-variant: '#e1e3e4'
typography:
  display-lg:
    fontFamily: Sora
    fontSize: 64px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Sora
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-lg-mobile:
    fontFamily: Sora
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Sora
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-md:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.05em
  code:
    fontFamily: jetbrainsMono
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1280px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
---

## Brand & Style

The design system is built on a duality of "The Hype" and "The Engine." It balances the high-energy, marketing-driven excitement of a university hackathon with the clinical, data-dense precision required for event management and registration dashboards.

The visual direction follows a **Corporate Modern** foundation infused with **High-Contrast** energy. Marketing surfaces utilize vibrant gradients and kinetic animations to drive engagement, while internal dashboard views prioritize utility, using whitespace and structural alignment to manage complex information. The overall emotional response should feel authoritative yet accessible, signaling a professional technical environment that celebrates innovation.

## Colors

This design system utilizes a high-contrast palette to distinguish between action and structure. 
- **Primary Orange (#FF8C00):** Used for primary calls-to-action, focus states, and accentuating technical energy.
- **Navy Secondary (#000080):** Provides a grounding, trustworthy foundation. Used for headings, navigation backgrounds, and primary brand elements.
- **Surface Strategy:** Marketing pages utilize pure white backgrounds with secondary-to-primary gradients. Dashboard environments use a soft neutral off-white (#F8F9FA) to reduce eye strain and define container boundaries.
- **Dark Footer:** A deep midnight navy (#0A0A1A) provides a heavy visual anchor to all pages.

## Typography

The typographic system pairs the geometric, tech-forward **Sora** for headlines with the highly legible, contemporary **Hanken Grotesk** for UI and body copy. 

- **Headlines:** Sora is used to convey a futuristic and bold personality. For marketing hero sections, use `display-lg` with tight letter spacing.
- **UI & Data:** Hanken Grotesk is used for all functional elements. In dashboard views, prioritize `body-md` for data density.
- **Labels:** Small caps with increased tracking should be used for secondary metadata and category tags to maintain a professional, organized hierarchy.

## Layout & Spacing

This design system employs a **12-column fluid grid** for marketing sections and a **fixed-sidebar / fluid-content** model for dashboards.

- **Marketing Layout:** Use generous vertical rhythm (80px - 120px section spacing) to allow high-impact visuals to breathe.
- **Dashboard Layout:** Transitions to a compact 8px grid system. Gutters are reduced to 16px to maximize information density.
- **Breakpoints:** 
  - Mobile: < 768px (4 columns)
  - Tablet: 768px - 1024px (8 columns)
  - Desktop: > 1024px (12 columns)

## Elevation & Depth

The design system uses layers to separate navigation, content, and interactive elements.

- **The Glass Layer:** The top navigation bar is fixed with a `backdrop-filter: blur(12px)` and a semi-transparent white background (80% opacity). A 1px border on the bottom in low-opacity Navy defines the edge.
- **Interactive Depth:** Cards use a "Floating" state. At rest, they feature a subtle 1px border. On hover, they lift using a primary-tinted ambient shadow (`box-shadow: 0 20px 40px -10px rgba(255, 140, 0, 0.15)`).
- **Surface Tiers:**
  - Level 0: Background (#F8F9FA)
  - Level 1: Main content cards (White)
  - Level 2: Modals and Popovers (White with heavy diffusion shadows)

## Shapes

The shape language is modern and approachable. 
- **Standard Radius:** 0.5rem (8px) for buttons and inputs.
- **Large Radius:** 1.5rem (24px) for content cards and dashboard containers, creating a "containerized" look that feels friendly yet structured.
- **Pill Shapes:** Badges, tags, and search bars use a fully rounded (`rounded-full`) radius to contrast against the more structured grid elements.

## Components

### Buttons & Inputs
- **Primary Action:** Solid Orange (#FF8C00) with white text. 
- **Secondary Action:** Ghost style with Navy border and text.
- **Form Fields:** White backgrounds with 1px gray borders. On focus, the border transitions to Primary Orange with a 3px outer glow (`ring`) in semi-transparent orange.

### Cards & Navigation
- **Cards:** White fill, `rounded-2xl` (1.5rem). Use hover transitions for a 4px vertical "lift."
- **Navbar:** Fixed position, glassmorphism effect. Active links are indicated by a 2px orange underline or bold navy text.

### Data Tables
- **Dashboard Tables:** Use a "Zebra" striped pattern (`nth-child(even)` in #F8F9FA). 
- **Headers:** Navy background with white Sora (small-caps) text for maximum authority and clarity.

### Badges & Status
- **Status Indicators:** Use `rounded-full` shapes with low-opacity background tints (e.g., Success is soft green background with dark green text).
- **Event Chips:** Use Primary Orange for high-priority "Live" events and Navy for "Upcoming."
# Buvijon — Interface design system

## Direction

**Feel:** Calm family garden — warm neutrals, violet growth accent, organic not corporate.  
**Depth:** Borders-only hierarchy; whisper-quiet surface steps.  
**Spacing base:** 8px grid (8, 16, 24, 32, 40, 48, 64, 80, 120).

## Color tokens

| Token | Value | Use |
|-------|-------|-----|
| `--text-primary` | `#1D1D1F` | Headlines, values |
| `--text-secondary` | `#6E6E73` | Body |
| `--text-muted` | `#86868B` | Meta, labels |
| `--bg-primary` | `#FFFFFF` | Canvas |
| `--bg-section` | `#FBFBFD` | Product pages |
| `--surface-inset` | `#F5F5F7` | Inputs |
| `--surface-raised` | `#FFFFFF` | Cards |
| `--brand-primary` | `#7C3AED` | Actions, active |
| `--border-subtle` | `rgba(29,29,31,0.08)` | Default borders |
| `--border-violet` | `rgba(124,58,237,0.18)` | Emphasis |

Semantic (flowers): `--blooming`, `--warning`, `--wilting`.

## Typography

- **Display:** Geist Sans, weight 600, tight tracking on h1–h2.
- **Body:** 14–16px, line-height 1.5–1.55.
- **Eyebrow:** 12px, uppercase, 0.22em tracking, brand color.
- **KPI numbers:** 40px semibold, tabular nums.

## Components

### Segmented control
Pill group: `segmented-control` + `segmented-control__btn` + `.is-active` (ink fill).

### Product card
`panel` — white, 24px radius, subtle border, 24–32px padding. Hover: border-violet, no heavy shadow.

### KPI stat
`kpi-card` — panel + large value + secondary label.

### Preview banner
`preview-banner` — violet-50 strip, 13px, explains demo data.

### How-it-works path (`HowStepsPath`)
- Timeline: dotted rail on desktop, vertical dashed line on mobile
- Badge: 40px circle, violet-50 + border (not large gradient numerals)
- Card: `steps-path__card`, icon in 44px soft square, title leads
- Step 2 (center): `steps-path__item--focus` — filled badge + subtle violet wash

### Forms
Labels above fields. Inset `input` background. Validate on blur; clear error on change. Focus ring: 4px violet at 12% opacity.

## Patterns

- Product pages: `main.product-shell`, top padding under fixed nav.
- One primary CTA per view (waitlist / join).
- Empty states: short headline + one line hint, no illustration clutter.
- Data: right-align numbers; progress bars 8px height, rounded-full.

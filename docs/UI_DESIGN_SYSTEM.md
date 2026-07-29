# DIU Student Welfare System — UI Design System

## Brand Identity

- **University:** Daffodil International University (DIU)
- **Department:** Software Engineering (SWE)
- **Brand Colors:** Green (institutional) + Gold (accent)
- **Design Philosophy:** Clean, professional, institutional — not flashy. Think university portal, not startup dashboard.

---

## Color Tokens

### Primary Palette
| Token | Hex | RGB | Usage |
|---|---|---|---|
| `--color-primary` | `#1A4D2E` | `26, 77, 46` | Header, sidebar, primary buttons, active states |
| `--color-primary-light` | `#2D6A4F` | `45, 106, 79` | Hover states, secondary elements |
| `--color-primary-dark` | `#0F3520` | `15, 53, 32` | Pressed states, deep backgrounds |
| `--color-primary-50` | `#E8F5EE` | `232, 245, 238` | Light green tint for backgrounds |
| `--color-primary-100` | `#C4E3D0` | `196, 227, 208` | Subtle green highlights |

### Accent Palette
| Token | Hex | RGB | Usage |
|---|---|---|---|
| `--color-accent` | `#F4A100` | `244, 161, 0` | Call-to-action buttons, highlights, badges |
| `--color-accent-light` | `#FFD166` | `255, 209, 102` | Hover accent, tags |
| `--color-accent-dark` | `#CC8600` | `204, 134, 0` | Pressed accent |

### Neutral Palette
| Token | Hex | Usage |
|---|---|---|
| `--color-bg-primary` | `#FAFCFB` | Page background |
| `--color-bg-card` | `#FFFFFF` | Card surfaces |
| `--color-bg-sidebar` | `#0F3520` | Dark sidebar background |
| `--color-bg-hover` | `#F3F4F6` | Hover backgrounds |
| `--color-border` | `#E5E7EB` | Card borders, dividers |
| `--color-border-light` | `#F0F0F0` | Subtle separators |

### Text Colors
| Token | Hex | Usage |
|---|---|---|
| `--color-text-primary` | `#1A1A2E` | Main body text |
| `--color-text-secondary` | `#6B7280` | Muted/helper text |
| `--color-text-tertiary` | `#9CA3AF` | Placeholder text |
| `--color-text-on-dark` | `#F0F4F2` | Text on dark surfaces (sidebar, header) |
| `--color-text-on-primary` | `#FFFFFF` | Text on primary-color buttons |

### Semantic Colors
| Token | Hex | Usage |
|---|---|---|
| `--color-success` | `#10B981` | Resolved, approved, active |
| `--color-success-bg` | `#ECFDF5` | Success background |
| `--color-warning` | `#F59E0B` | Pending, in-progress |
| `--color-warning-bg` | `#FFFBEB` | Warning background |
| `--color-danger` | `#EF4444` | Errors, escalated, urgent |
| `--color-danger-bg` | `#FEF2F2` | Danger background |
| `--color-info` | `#3B82F6` | Informational |
| `--color-info-bg` | `#EFF6FF` | Info background |

---

## Typography

### Font Stack
| Token | Value | Usage |
|---|---|---|
| `--font-primary` | `'Inter', 'Segoe UI', system-ui, sans-serif` | Body text, UI elements |
| `--font-heading` | `'Plus Jakarta Sans', 'Inter', sans-serif` | Headings, page titles |
| `--font-mono` | `'JetBrains Mono', 'Fira Code', monospace` | Code snippets, IDs |

### Font Sizes
| Token | Size | Line Height | Usage |
|---|---|---|---|
| `--text-xs` | `0.75rem` (12px) | 1.5 | Badges, captions |
| `--text-sm` | `0.875rem` (14px) | 1.5 | Helper text, labels |
| `--text-base` | `1rem` (16px) | 1.6 | Body text |
| `--text-lg` | `1.125rem` (18px) | 1.5 | Section subtitles |
| `--text-xl` | `1.25rem` (20px) | 1.4 | Card titles |
| `--text-2xl` | `1.5rem` (24px) | 1.3 | Page subtitles |
| `--text-3xl` | `1.875rem` (30px) | 1.2 | Page titles |
| `--text-4xl` | `2.25rem` (36px) | 1.1 | Hero/landing titles |

### Font Weights
| Token | Value | Usage |
|---|---|---|
| `--font-normal` | `400` | Body text |
| `--font-medium` | `500` | Labels, emphasis |
| `--font-semibold` | `600` | Subtitles, card titles |
| `--font-bold` | `700` | Page titles, headings |

---

## Spacing Scale

| Token | Value | Usage |
|---|---|---|
| `--space-1` | `4px` | Tight gaps |
| `--space-2` | `8px` | Icon-to-text gaps |
| `--space-3` | `12px` | Compact padding |
| `--space-4` | `16px` | Default padding |
| `--space-5` | `20px` | Section inner padding |
| `--space-6` | `24px` | Card padding, between blocks |
| `--space-8` | `32px` | Section gaps |
| `--space-10` | `40px` | Major section separators |
| `--space-12` | `48px` | Page top/bottom margin |
| `--space-16` | `64px` | Large layout gaps |

---

## Border Radius

| Token | Value | Usage |
|---|---|---|
| `--radius-sm` | `4px` | Badges, chips |
| `--radius-md` | `8px` | Cards, inputs |
| `--radius-lg` | `12px` | Modals, large cards |
| `--radius-xl` | `16px` | Hero sections |
| `--radius-full` | `9999px` | Avatars, round buttons |

---

## Shadows

| Token | Value | Usage |
|---|---|---|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Subtle elevation |
| `--shadow-md` | `0 4px 6px -1px rgba(0,0,0,0.07), 0 2px 4px -2px rgba(0,0,0,0.05)` | Cards |
| `--shadow-lg` | `0 10px 15px -3px rgba(0,0,0,0.08), 0 4px 6px -4px rgba(0,0,0,0.05)` | Modals, dropdowns |
| `--shadow-focus` | `0 0 0 3px rgba(26, 77, 46, 0.2)` | Focus ring on inputs |

---

## Component Design Rules

### Cards
- Background: `--color-bg-card`
- Border: 1px solid `--color-border`
- Border-radius: `--radius-md`
- Padding: `--space-6`
- Shadow: `--shadow-sm` (elevates to `--shadow-md` on hover for interactive cards)

### Buttons
| Variant | Background | Text | Border |
|---|---|---|---|
| Primary | `--color-primary` | `--color-text-on-primary` | none |
| Secondary | transparent | `--color-primary` | 1px solid `--color-primary` |
| Accent | `--color-accent` | `#FFFFFF` | none |
| Danger | `--color-danger` | `#FFFFFF` | none |
| Ghost | transparent | `--color-text-secondary` | none |

### Inputs
- Height: 44px (touch-friendly)
- Border: 1px solid `--color-border`
- Border-radius: `--radius-md`
- Focus: border `--color-primary`, box-shadow `--shadow-focus`
- Padding: 0 `--space-4`

### Sidebar
- Width: 260px (desktop), collapsible on mobile
- Background: `--color-bg-sidebar` (dark green)
- Text: `--color-text-on-dark`
- Active item: `--color-primary-light` background with left accent bar
- DIU logo at top

### Badges / Status Tags
| Status | Background | Text |
|---|---|---|
| Open | `--color-info-bg` | `--color-info` |
| In Progress | `--color-warning-bg` | `--color-warning` |
| Resolved | `--color-success-bg` | `--color-success` |
| Escalated | `--color-danger-bg` | `--color-danger` |

---

## Layout Specifications

### Breakpoints
| Name | Min Width | Layout |
|---|---|---|
| Mobile | `0px` | Single column, bottom nav or hamburger menu |
| Tablet | `768px` | Collapsed sidebar + content area |
| Desktop | `1024px` | Full sidebar (260px) + content area |

### Page Structure
```
┌──────────────────────────────────────────────┐
│              Navbar (64px height)             │
│  [DIU Logo] [Page Title]    [Search] [Avatar] │
├──────────┬───────────────────────────────────┤
│          │                                    │
│ Sidebar  │         Content Area               │
│ (260px)  │    (max-width: 1200px)             │
│          │    (padding: 24px)                 │
│  Nav     │                                    │
│  Links   │    ┌─────────┐  ┌─────────┐       │
│          │    │  Card   │  │  Card   │       │
│          │    └─────────┘  └─────────┘       │
│          │                                    │
├──────────┴───────────────────────────────────┤
│              Footer (optional)                │
└──────────────────────────────────────────────┘
```

---

## Animation Guidelines

### Allowed Animations
- `opacity` transitions (fade-in/out)
- `transform: translateY()` (slide-in from bottom/top)
- `transform: translateX()` (sidebar slide)
- `transform: scale()` (subtle button press)

### Timing
| Type | Duration | Easing |
|---|---|---|
| Micro-interaction (hover, focus) | `150ms` | `ease-out` |
| UI transition (modal, sidebar) | `250ms` | `cubic-bezier(0.4, 0, 0.2, 1)` |
| Page enter animation | `300ms` | `cubic-bezier(0.4, 0, 0.2, 1)` |

### Forbidden
- ❌ Never animate `width`, `height`, `top`, `left`, `margin`, `padding` (causes layout reflow)
- ❌ No infinite spinning animations except loading spinners
- ❌ No animation duration > 500ms

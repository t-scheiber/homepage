---
name: Thomas Scheiber portfolio
description: Inter typography, faceted backgrounds and theme-aware green accents.
colors:
  slate-page-bg: "#14232e"
  slate-page-wash: "#10202ac7"
  slate-text: "#edf3f8"
  slate-muted: "#c0cfd8"
  slate-surface: "#182832f5"
  slate-line: "#c4e0dc30"
  slate-control-border: "#b6cac56b"
  slate-hover: "#c4e0dc0c"
  slate-accent: "#bcecd0"
  slate-accent-hover: "#d4f9e4"
  slate-on-accent: "#13271e"
  mineral-page-bg: "#edf2ed"
  mineral-page-wash: "#f4f7f3b8"
  mineral-text: "#1b302e"
  mineral-muted: "#435e58"
  mineral-surface: "#f8fbf7f5"
  mineral-line: "#35564e30"
  mineral-control-border: "#40655b8a"
  mineral-hover: "#365f5910"
  mineral-accent: "#245e4a"
  mineral-accent-hover: "#194b3b"
  mineral-on-accent: "#f6fcf8"
typography:
  display-home:
    fontFamily: "Inter, sans-serif"
    fontSize: "clamp(40px, 5vw, 64px)"
    fontWeight: 500
    lineHeight: 1.08
    letterSpacing: "-0.04em"
  headline-collection:
    fontFamily: "Inter, sans-serif"
    fontSize: "clamp(32px, 4.5vw, 54px)"
    fontWeight: 450
    lineHeight: 1.12
    letterSpacing: "-0.035em"
  title-section:
    fontFamily: "Inter, sans-serif"
    fontSize: "20px"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "-0.02em"
  body-description:
    fontFamily: "Inter, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.75
  label-action:
    fontFamily: "Inter, sans-serif"
    fontSize: "14px"
    fontWeight: 600
    lineHeight: 1.5
rounded:
  field-demo: "6px"
  action: "8px"
  navigation: "9px"
  demo-frame: "14px"
  panel: "16px"
spacing:
  control-gap: "8px"
  action-gap: "12px"
  compact-gap: "16px"
  section-gap: "24px"
  mobile-gutter: "20px"
components:
  home-primary-action:
    typography: "{typography.label-action}"
    rounded: "{rounded.action}"
    padding: "12px 20px"
  home-secondary-action:
    typography: "{typography.label-action}"
    rounded: "{rounded.action}"
    padding: "12px 20px"
  demo-button:
    rounded: "{rounded.field-demo}"
    padding: "10px 14px"
  demo-field:
    rounded: "{rounded.field-demo}"
    padding: "10px 11px"
  collection-panel:
    rounded: "{rounded.panel}"
---

# Design System: Thomas Scheiber portfolio

## Overview

The portfolio uses Inter, faceted background images and green accents. Large headings introduce the work; fine borders separate lists, controls and project details. Nearly opaque panels keep interactive examples readable against the background.

This document records the existing implementation. Mineral and Slate are the approved light and dark treatments. Their application is described below as theme-specific behavior; neither palette is a universal default for new products or unrelated interfaces.

**Key Characteristics:**

- Inter variable typography with compact supporting labels.
- Faceted page backgrounds beneath a translucent color wash.
- Bordered panels and restrained green interaction states.
- Responsive layouts and reduced-motion support.

Source provenance: colors come from `styles/themes.css`; typography, dimensions and component rules come from `styles/portfolio.css`, `styles/work-projects.css` and `styles/globals.css`. `app/layout.tsx` loads the local Inter variable font with weights 300 through 700. Theme and motion behavior comes from `lib/theme.ts`, `lib/theme-init.ts`, `components/ThemeSelect.tsx` and `components/Particles.tsx`. `PRODUCT.md` supplies the confirmed theme constraint. `docs/work-projects.md` records the work-page boundary.

This is a source extraction, not a new visual direction or a claim of browser verification. The frontmatter records reused values under descriptive names. These names are documentation aliases, not additional runtime variables. The CSS remains the implementation source of truth.

## Colors

### Primary

Green identifies links, primary actions, selected navigation and completed steps. The `accent`, `accent-hover` and `on-accent` entries record each approved theme. The CSS `--accent-fill` has the same value as `--accent` in both themes, so this document does not duplicate it.

**The Semantic theme colors Rule.** Shared components use the semantic properties from styles/themes.css so the selected theme supplies their colors.

### Neutral

Page, wash, text, muted text, surface, line, control-border and hover entries mirror the roles in the theme stylesheet. A line separates content; the stronger control border identifies an interactive boundary. The translucent surface sits above the washed image.

The sidecar's tonal ramps are synthesized opaque OKLCH preview strips derived from the source hue and chroma. They are not shipped tokens or additional approved colors. Component previews inherit live semantic properties, with Slate fallbacks when the preview host does not supply them.

### Theme-specific notes

The root stylesheet supplies Slate values. The `data-theme="light"` override supplies Mineral. Before the first paint, the theme initialization script resolves the saved Light or Dark preference, or the System preference from the operating system. The native theme selector preserves these three choices.

The light page uses `/files/backgrounds/mineral-facets.webp`; the dark page uses `/files/backgrounds/slate-facets.webp`. The body covers the viewport with the corresponding image and places the theme's wash over it. Particle colors are scoped decoration in `components/Particles.tsx`, with dark green in light mode and pale teal in dark mode. They are not additional interface accents.

Work-page status colors are local variables in `styles/work-projects.css`. Warning text is amber in Slate and brown in Mineral; status backgrounds are low-opacity tints. Preserve their scope and pair them with explicit status copy.

## Typography

Inter supplies display, body and control text. The body has a regular weight. Headings vary between medium and semibold, with tighter letter spacing as their size increases.

The frontmatter records the homepage display, collection headline, section title, description and action-label roles. These are observed roles, not a mathematically generated type scale. The description becomes 15px below the 600px breakpoint. The homepage display becomes `clamp(34px, 9vw, 48px)` at that breakpoint.

The work page has its own heading proportions. Its main heading uses `clamp(2.6rem, 4.5vw, 4.25rem)`, weight 600 and a 1.06 line height. Demo titles use 17px, weight 600 and a 1.4 line height. Supporting demo copy ranges from 11px to 14px. Inputs increase to 16px on narrow screens. These are work-page notes, not replacement global type roles.

## Layout

The shared header, footer and homepage use a 1200px maximum container and 32px side gutters. Collection pages use a 960px maximum. Below 600px, both use 20px side gutters. At 900px the header navigation wraps into a full-width row. The homepage introduction and project area become single-column below 600px.

The work page uses a 1280px maximum with 40px side gutters, reduced to 24px below 1100px and 20px below 600px. Its desktop selector occupies 206px beside the demo, with a 44px gap. At 900px it becomes a native selector above the demo. At 600px the demo's main and supporting columns stack. Contribution notes and further-project disclosures follow the same responsive reading order.

Spacing values in the frontmatter capture recurring gaps and padding. Existing CSS uses additional context-specific dimensions; the recorded subset is not an exhaustive spacing scale.

## Elevation & Depth

**The Borders before shadows Rule.** The current portfolio panels and work demos establish boundaries through borders and tonal fills; their styles do not use box shadows.

The page image, wash and nearly opaque content panels create the depth. Hover generally changes a fill, border or text color. No shadow tokens were found in the three portfolio stylesheets.

Particles move behind content and rebuild when the resolved theme changes. Reduced-motion preference removes the particle canvas and suppresses transitions and smooth scrolling. Desktop pointer interaction can repel particles or add them; the component disables those interactions on detected mobile devices.

## Shapes

Buttons and native controls use gently rounded corners. Larger panels use a wider radius, while demo fields are more compact. One-pixel borders separate content and identify controls. Small circles mark demo status and numbered steps. Source icons are inline SVG.

## Components

### Buttons

Homepage primary actions use the accent fill and its contrasting text color. The secondary CV action uses text and a control border. Both have a 48px minimum height. The primary action changes to the accent-hover color; the secondary changes its background and border.

Work-demo primary, secondary and link actions use a 44px minimum height and the smaller field radius. Primary buttons use the theme fill; secondary buttons use the panel fill and control border. Disabled demo buttons retain their label with reduced opacity and a not-allowed cursor.

### Inputs / Fields

Demo fields use the panel background, text color, control border and accent caret. Labels sit above the field. Read-only fields use muted text and the hover fill; invalid address fields use the local warning border. Selects remain native controls. Textareas resize vertically.

The shared focus rule gives links, buttons and selects a two-pixel accent outline with a four-pixel offset. Text inputs and textareas have no equivalent custom rule in the inspected CSS; their browser focus styling is not documented as a new house rule.

### Navigation

Shared navigation uses muted text at rest and accent text with a hover fill for hovered and current links. The work selector uses bordered buttons with `aria-pressed` state, then changes to a native select on narrower screens. The selected demo survives unrelated page anchors; changing demos or using Reset clears its local state.

### Cards / Containers

Collection panels and the featured homepage project share a border, a nearly opaque fill and rounded corners. Collection rows use dividers and a hover fill. Demo frames use a stronger border, a toolbar, scenario text and a local-only footnote.

### Work-page patterns

The work section has eight interactive demos and eight further-project summaries. Each demo has contribution and engineering-decision text beneath it. The further-project list uses native disclosure elements. Technology labels use text and a bottom rule rather than filled pills.

The scheduler uses a semantic table with column and row headers. Status descriptions and controls remain visible alongside color. Demo state is local to the browser and uses fictional data. These patterns describe this page; they are not a required composition for every portfolio section.

## Do's and Don'ts

### Do:

- Do use the existing semantic CSS properties when extending this portfolio.
- Do keep keyboard focus visible and preserve native control semantics.
- Do retain both approved background images and theme-aware particle colors.
- Do keep the work demonstrations visibly identified as fictional, local reconstructions.

### Don't:

- Don't hard-code a single theme's text or panel colors into shared components.
- Don't remove the reduced-motion behavior when changing decorative animation.
- Don't turn work-page dimensions, warning colors or demo arrangements into requirements for every page.

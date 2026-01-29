# INDX Project Implementation Plan

## Goal Description
Build a high-fidelity, production-ready React/Tailwind application 'INDX' with a 'Linear.app' aesthetic.

## Architecture & Tech Stack
- **Framework**: Vite + React + TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Utils**: clsx

## Design System
- **Palette**: Background `#0B0B0C`, Borders `#1D1D1F`, Text `#F4F5F8`
- **Typography**: Inter (UI), Geist Mono (Data/Code)
- **Visuals**: Glassmorphism (backdrop-blur-sm), thin borders, slow rhythmic animations.

## Core Deliverables
1.  **Protocol Hero**: Animated SVG component with { Face } [ INDX ] { Website } visuals and pulse effects.
2.  **Infrastructure Ledger**: DataTable with dummy data (OpenAI.Operator, Apple.Intell, etc).
3.  **Navigation**: Sticky header (Protocol, Ledger, Docs, Status).
4.  **Live Status Ticker**: Footer with status metrics.

## Implementation Steps
1.  Initialize project in current directory.
2.  Install dependencies.
3.  Set up Tailwind config with custom colors and fonts.
4.  Scaffold components in `/components` and hooks in `/hooks`.
5.  Implement main layout and components.
6.  Refine animations and spacing.

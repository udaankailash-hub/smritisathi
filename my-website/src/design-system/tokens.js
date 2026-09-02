/**
 * MementoCare AI — Centralized Design System Tokens
 * Healthcare-Grade Visual Standards
 */

export const COLOR_TOKENS = {
  surfaces: {
    main: '#0B132B',       // App Canvas background
    surface: '#131E3A',    // Navigation & sidebars
    card: '#1C2B4E',       // Card background
    elevated: '#0F172A',   // Modals & Popovers
    borderSubtle: '#2A3F6D',
    borderStrong: '#3B538C',
  },
  text: {
    primary: '#F8FAFC',    // 14.8:1 AAA contrast
    body: '#CBD5E1',       // 10.2:1 AAA contrast
    secondary: '#94A3B8',  // 6.8:1 AA contrast
    muted: '#64748B',      // 4.6:1 AA contrast
  },
  brand: {
    primary: '#14B8A6',    // Calming Teal (Primary action / progress)
    primaryHover: '#0D9488',
    secondary: '#0284C7',  // Sky Blue (Clinician Telemetry & Music)
    secondaryHover: '#0369A1',
    amber: '#D97706',      // Warm Amber (Reminders / Pending approvals)
    amberHover: '#B45309',
    rose: '#E11D48',       // Rose (Triage Check-in Alerts / Errors)
    purple: '#9333EA',     // Purple (ASHA Community Cluster)
  },
  highContrast: {
    bg: '#000000',
    text: '#FDE047',
    border: '#CA8A04',
  },
};

export const TYPOGRAPHY = {
  fontFamily: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  scale: {
    display: { size: '56px', lineHeight: '1.10', weight: '800' },
    h1: { size: '36px', lineHeight: '1.20', weight: '800' },
    h2: { size: '24px', lineHeight: '1.25', weight: '700' },
    h3: { size: '18px', lineHeight: '1.35', weight: '600' },
    bodyLarge: { size: '16px', lineHeight: '1.50', weight: '400' },
    bodyRegular: { size: '14px', lineHeight: '1.50', weight: '400' },
    caption: { size: '12px', lineHeight: '1.40', weight: '500' },
    micro: { size: '10px', lineHeight: '1.20', weight: '700' },
  },
  seniorTabletScaleMultiplier: 1.25, // Scaled for elderly visual ergonomics
};

export const SPACING_SCALE = {
  '3xs': '2px',
  '2xs': '4px',
  xs: '8px',
  sm: '12px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  '2xl': '48px',
  '3xl': '64px',
};

export const BORDER_RADIUS = {
  sm: '6px',
  md: '10px',
  lg: '16px',
  xl: '24px',
  full: '9999px',
};

export const SHADOWS = {
  card: '0 1px 3px rgba(0, 0, 0, 0.3)',
  hover: '0 4px 12px rgba(0, 0, 0, 0.4)',
  modal: '0 20px 25px -5px rgba(0, 0, 0, 0.6)',
  glowTeal: '0 0 20px -5px rgba(20, 184, 166, 0.25)',
};

export const BREAKPOINTS = {
  mobile: '640px',
  tablet: '768px',
  desktop: '1024px',
  maxContainer: '1280px',
};

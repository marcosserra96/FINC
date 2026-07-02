const ICONS = {
  cards: (
    <>
      <rect x="3" y="7" width="12" height="15" rx="2" transform="rotate(-8 9 14.5)" />
      <rect x="9" y="5" width="12" height="15" rx="2" />
    </>
  ),
  bulb: (
    <>
      <path d="M12 3a6 6 0 0 0-4 10.4c.6.5 1 1.3 1 2.1V16h6v-.5c0-.8.4-1.6 1-2.1A6 6 0 0 0 12 3Z" />
      <path d="M9 18h6" />
      <path d="M10 21h4" />
    </>
  ),
  led: (
    <>
      <path d="M12 3a5 5 0 0 0-3.2 8.8c.5.4.7.9.7 1.5V14h5v-.7c0-.6.2-1.1.7-1.5A5 5 0 0 0 12 3Z" />
      <path d="M10 17h4" />
      <path d="M10.5 19.5h3" />
      <path d="M16.5 8c1.8.4 2.2 2.6.8 3.8" />
    </>
  ),
  tv: (
    <>
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <path d="M8 21h8" />
      <path d="M12 18v3" />
    </>
  ),
  plug: (
    <>
      <rect x="5" y="4" width="14" height="16" rx="4" />
      <path d="M9.5 10v4" />
      <path d="M14.5 10v4" />
      <path d="M12 14v2.5" />
      <path d="M10.3 19.5h3.4" />
    </>
  ),
  charger: (
    <>
      <rect x="8" y="3" width="8" height="12" rx="2" />
      <path d="M13.2 7 10.5 10.6h2.6L11 14.6" />
      <path d="M12 15v3" />
      <path d="M9 21h6" />
    </>
  ),
  shower: (
    <>
      <path d="M9 5c1-1.3 2.3-1.3 3.2-.4L13 5.4" />
      <rect x="5" y="6.5" width="14" height="4" rx="2" />
      <path d="M8 15v2.5M12 15v3.5M16 15v2.5" />
    </>
  ),
  faucet: (
    <>
      <path d="M4 6h6V3" />
      <path d="M10 3h8a2 2 0 0 1 2 2v3" />
      <path d="M4 6v4" />
      <path d="M20 13v4.5" />
      <path d="M20 20v1" />
    </>
  ),
  ac: (
    <>
      <rect x="3" y="6" width="18" height="7" rx="2" />
      <circle cx="16.5" cy="9.5" r="0.6" fill="currentColor" stroke="none" />
      <path d="M7 17l-1 3M12 17v4M17 17l1 3" />
    </>
  ),
  fridge: (
    <>
      <rect x="6" y="2" width="12" height="20" rx="2" />
      <path d="M6 9.5h12" />
      <path d="M9 4.5v2.2M9 11.8v2.2" />
    </>
  ),
  fan: (
    <>
      <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
      <path d="M12 10.6C12 6 9 3.2 6.2 4.2c-1.4 3 1 6.4 5.8 6.4Z" />
      <path d="M13.4 12c4.5 0 7.4-3 6.4-5.8-3-1.4-6.4 1-6.4 5.8Z" />
      <path d="M12 13.4c0 4.6 3 7.4 5.8 6.4 1.4-3-1-6.4-5.8-6.4Z" />
    </>
  ),
  battery: (
    <>
      <rect x="2" y="7.5" width="16" height="9" rx="2" />
      <path d="M22 10.5v3" />
      <path d="M6 7.5v9" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.5V12l3.2 1.8" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 2.5v2.4M12 19.1v2.4M4.6 4.6l1.7 1.7M17.7 17.7l1.7 1.7M2.5 12h2.4M19.1 12h2.4M4.6 19.4l1.7-1.7M17.7 6.3l1.7-1.7" />
    </>
  ),
  curtain: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="1" />
      <path d="M4 4c3.2 4 3.2 12 0 16" />
      <path d="M20 4c-3.2 4-3.2 12 0 16" />
    </>
  ),
  window: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="1" />
      <path d="M12 4v16" />
      <path d="M4 12h16" />
    </>
  ),
  wire: (
    <>
      <path d="M3 17c3 0 2-5 5-5s2 5 5 5" />
      <path d="M18 4.5 21.5 11h-7L18 4.5Z" />
      <path d="M18 8.2v1.6" />
      <circle cx="18" cy="12.4" r="0.55" fill="currentColor" stroke="none" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3.2 19 6v6c0 5-3.5 7.6-7 9-3.5-1.4-7-4-7-9V6l7-2.8Z" />
      <path d="M8.7 12.2 11 14.5l4.3-4.5" />
    </>
  ),
  house: (
    <>
      <path d="M4 11 12 4l8 7" />
      <path d="M6 10v10h12V10" />
      <path d="M10 20v-6h4v6" />
    </>
  ),
  question: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.4 9.3a2.6 2.6 0 1 1 3.7 2.4c-.8.3-1.1.9-1.1 1.6v.4" />
      <circle cx="12" cy="16.6" r="0.5" fill="currentColor" stroke="none" />
    </>
  ),
  bolt: (
    <>
      <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />
    </>
  ),
  trophy: (
    <>
      <path d="M8 4h8v5a4 4 0 0 1-8 0V4Z" />
      <path d="M8 5.2H5.3A2.8 2.8 0 0 0 8 9.6" />
      <path d="M16 5.2h2.7A2.8 2.8 0 0 1 16 9.6" />
      <path d="M12 13v3.5" />
      <path d="M9 21h6" />
      <path d="M9.5 16.5h5v4.5h-5v-4.5Z" />
    </>
  ),
  check: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12.4 10.6 15 16 9.4" />
    </>
  ),
  cross: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M9 9l6 6M15 9l-6 6" />
    </>
  ),
  party: (
    <>
      <path d="M12 3.5 13 7l3.5 1-3.5 1-1 3.5-1-3.5L7.5 8 11 7l1-3.5Z" />
      <path d="M18.5 13.5 19 15l1.5.5-1.5.5-.5 1.5-.5-1.5-1.5-.5 1.5-.5.5-1.5Z" />
      <path d="M5.5 15 6 16.3l1.3.5L6 17.3 5.5 18.6 5 17.3l-1.3-.5L5 16.3 5.5 15Z" />
    </>
  ),
  washer: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <circle cx="12" cy="13.5" r="5" />
      <circle cx="12" cy="13.5" r="2" />
      <circle cx="7.5" cy="6" r="0.5" fill="currentColor" stroke="none" />
      <circle cx="10.5" cy="6" r="0.5" fill="currentColor" stroke="none" />
    </>
  ),
  iron: (
    <>
      <path d="M3 14.5c0-3 2.2-5 6-5h6c2.8 0 4.8 1.8 4.8 4 0 2-1.6 3.5-4 3.5H8c-3 0-5-1-5-2.5Z" />
      <path d="M7 9.5V6.8c0-1.5 1-2 3-2s3 .5 3 2v2.7" />
      <circle cx="15.5" cy="14.5" r="0.5" fill="currentColor" stroke="none" />
      <circle cx="12.5" cy="14.5" r="0.5" fill="currentColor" stroke="none" />
    </>
  ),
  sofa: (
    <>
      <rect x="3" y="11" width="18" height="7" rx="2" />
      <path d="M5.5 11V8a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v3" />
      <path d="M4.5 18v2.2M19.5 18v2.2" />
    </>
  ),
  bed: (
    <>
      <path d="M3 19v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6" />
      <path d="M3 19v2.2M21 19v2.2" />
      <rect x="5" y="9.5" width="6" height="3.6" rx="1" />
      <path d="M3 15.5h18" />
    </>
  ),
  candle: (
    <>
      <path d="M12 2.2c1.3 1.6 1.6 2.7 0 4.1-1.6-1.4-1.3-2.5 0-4.1Z" />
      <rect x="9.4" y="6.6" width="5.2" height="14.6" rx="1" />
      <path d="M12 6.6v2" />
    </>
  ),
  pot: (
    <>
      <path d="M4 11h16v3a6 6 0 0 1-6 6h-4a6 6 0 0 1-6-6v-3Z" />
      <path d="M2 11.2h2.2M19.8 11.2H22" />
      <path d="M4 9h16" />
      <path d="M9.5 7.3c0-1 .8-1.8 1.8-1.8M14.5 7.3c0-1-.8-1.8-1.8-1.8" />
    </>
  ),
  mirror: (
    <>
      <ellipse cx="12" cy="10" rx="7" ry="8" />
      <path d="M12 18v4" />
      <path d="M8 22h8" />
    </>
  ),
}

export const ICON_NAMES = Object.keys(ICONS)

export default function Icon({ name, className, size = 28, strokeWidth = 1.8 }) {
  const content = ICONS[name]
  if (!content) return null
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {content}
    </svg>
  )
}

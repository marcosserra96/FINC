const ICONS = {
  bulb: (
    <>
      <circle cx="24" cy="19" r="11" fill="#FFD54A" stroke="#E5A100" strokeWidth="2" />
      <rect x="18" y="28" width="12" height="7" rx="2" fill="#B0BEC5" stroke="#8497A0" strokeWidth="1.5" />
      <rect x="19" y="36" width="10" height="3" rx="1.5" fill="#8497A0" />
      <g stroke="#E5A100" strokeWidth="2" strokeLinecap="round">
        <line x1="24" y1="3" x2="24" y2="7" />
        <line x1="9" y1="19" x2="13" y2="19" />
        <line x1="35" y1="19" x2="39" y2="19" />
        <line x1="12.5" y1="7.5" x2="15" y2="10" />
        <line x1="35.5" y1="7.5" x2="33" y2="10" />
      </g>
    </>
  ),
  tv: (
    <>
      <rect x="6" y="10" width="36" height="24" rx="3" fill="#37474F" stroke="#263238" strokeWidth="2" />
      <rect x="10" y="14" width="28" height="16" rx="1.5" fill="#4FC3E8" />
      <line x1="19" y1="40" x2="29" y2="40" stroke="#37474F" strokeWidth="3" strokeLinecap="round" />
      <line x1="24" y1="34" x2="24" y2="40" stroke="#37474F" strokeWidth="3" />
    </>
  ),
  plug: (
    <>
      <rect x="7" y="7" width="34" height="34" rx="8" fill="#ECEFF1" stroke="#90A4AE" strokeWidth="2.5" />
      <circle cx="19" cy="24" r="4" fill="#37474F" />
      <circle cx="29" cy="24" r="4" fill="#37474F" />
    </>
  ),
  shower: (
    <>
      <path d="M12 12 h24 a2 2 0 0 1 2 2 v2 h-28 v-2 a2 2 0 0 1 2 -2 z" fill="#78909C" />
      <rect x="8" y="16" width="32" height="6" rx="3" fill="#B0BEC5" stroke="#78909C" strokeWidth="1.5" />
      <g stroke="#4FC3E8" strokeWidth="2.5" strokeLinecap="round">
        <line x1="14" y1="28" x2="12" y2="34" />
        <line x1="20" y1="28" x2="18" y2="36" />
        <line x1="26" y1="28" x2="26" y2="34" />
        <line x1="32" y1="28" x2="30" y2="36" />
        <line x1="36" y1="28" x2="36" y2="34" />
      </g>
    </>
  ),
  ac: (
    <>
      <rect x="6" y="12" width="36" height="14" rx="4" fill="#E8F6FB" stroke="#4FC3E8" strokeWidth="2" />
      <circle cx="14" cy="19" r="2" fill="#4FC3E8" />
      <g stroke="#4FC3E8" strokeWidth="2.5" strokeLinecap="round">
        <line x1="14" y1="30" x2="14" y2="40" />
        <line x1="24" y1="30" x2="24" y2="42" />
        <line x1="34" y1="30" x2="34" y2="40" />
        <line x1="12" y1="35" x2="16" y2="35" />
        <line x1="22" y1="37" x2="26" y2="37" />
        <line x1="32" y1="35" x2="36" y2="35" />
      </g>
    </>
  ),
  fridge: (
    <>
      <rect x="12" y="5" width="24" height="38" rx="4" fill="#ECEFF1" stroke="#90A4AE" strokeWidth="2" />
      <line x1="12" y1="19" x2="36" y2="19" stroke="#90A4AE" strokeWidth="2" />
      <rect x="16" y="10" width="3" height="6" rx="1.5" fill="#607D8B" />
      <rect x="16" y="24" width="3" height="6" rx="1.5" fill="#607D8B" />
    </>
  ),
  sun: (
    <>
      <circle cx="24" cy="24" r="9" fill="#FFC940" stroke="#F5A623" strokeWidth="2" />
      <g stroke="#F5A623" strokeWidth="2.5" strokeLinecap="round">
        <line x1="24" y1="4" x2="24" y2="9" />
        <line x1="24" y1="39" x2="24" y2="44" />
        <line x1="4" y1="24" x2="9" y2="24" />
        <line x1="39" y1="24" x2="44" y2="24" />
        <line x1="9.5" y1="9.5" x2="13" y2="13" />
        <line x1="38.5" y1="9.5" x2="35" y2="13" />
        <line x1="9.5" y1="38.5" x2="13" y2="35" />
        <line x1="38.5" y1="38.5" x2="35" y2="35" />
      </g>
    </>
  ),
  curtain: (
    <>
      <rect x="8" y="6" width="32" height="34" rx="2" fill="#E8F6FB" stroke="#90A4AE" strokeWidth="2" />
      <line x1="8" y1="6" x2="40" y2="6" stroke="#546E7A" strokeWidth="3" strokeLinecap="round" />
      <path d="M10 6 C16 6 14 40 22 40 L10 40 Z" fill="#4FC3E8" />
      <path d="M38 6 C32 6 34 40 26 40 L38 40 Z" fill="#3FA9CC" />
    </>
  ),
  wire: (
    <>
      <path
        d="M6 34 C14 34 10 24 18 24 C24 24 22 18 26 16"
        fill="none"
        stroke="#78909C"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path d="M32 10 L44 30 H20 Z" fill="#FFD54A" stroke="#E5A100" strokeWidth="2" strokeLinejoin="round" />
      <line x1="32" y1="18" x2="32" y2="24" stroke="#8B5E00" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="32" cy="27" r="1.4" fill="#8B5E00" />
    </>
  ),
  shield: (
    <>
      <path
        d="M24 4 L40 10 V22 C40 33 33 40 24 44 C15 40 8 33 8 22 V10 Z"
        fill="#3FC1E0"
        stroke="#009FC2"
        strokeWidth="2"
      />
      <path d="M16 23 L21 29 L33 16" fill="none" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  led: (
    <>
      <circle cx="20" cy="20" r="9" fill="#FFD54A" stroke="#E5A100" strokeWidth="2" />
      <rect x="16" y="27" width="8" height="5" rx="1.5" fill="#B0BEC5" />
      <path d="M30 30 C30 24 36 24 36 18 C36 13 31 10 28 13" fill="none" stroke="#2FA66A" strokeWidth="3" strokeLinecap="round" />
      <path d="M28 13 L27 9 M28 13 L32 12" stroke="#2FA66A" strokeWidth="2" strokeLinecap="round" />
    </>
  ),
  clock: (
    <>
      <circle cx="24" cy="24" r="17" fill="#ECEFF1" stroke="#546E7A" strokeWidth="2.5" />
      <line x1="24" y1="24" x2="24" y2="13" stroke="#37474F" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="24" y1="24" x2="32" y2="27" stroke="#37474F" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="24" cy="24" r="2" fill="#37474F" />
    </>
  ),
  battery: (
    <>
      <rect x="7" y="16" width="30" height="16" rx="3" fill="#ECEFF1" stroke="#546E7A" strokeWidth="2.5" />
      <rect x="38" y="21" width="4" height="6" rx="1.5" fill="#546E7A" />
      <rect x="10" y="19" width="18" height="10" rx="1.5" fill="#2FA66A" />
    </>
  ),
  fan: (
    <>
      <circle cx="24" cy="24" r="3.5" fill="#546E7A" />
      <g fill="#4FC3E8" stroke="#009FC2" strokeWidth="1.5">
        <ellipse cx="24" cy="12" rx="6" ry="9" />
        <ellipse cx="13" cy="30" rx="6" ry="9" transform="rotate(-120 13 30)" />
        <ellipse cx="35" cy="30" rx="6" ry="9" transform="rotate(120 35 30)" />
      </g>
    </>
  ),
  house: (
    <>
      <path d="M6 22 L24 7 L42 22" fill="none" stroke="#F37021" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="11" y="21" width="26" height="20" rx="2" fill="#FFF6EF" stroke="#F37021" strokeWidth="2.5" />
      <rect x="20" y="29" width="8" height="12" rx="1.5" fill="#F37021" />
    </>
  ),
  question: (
    <>
      <circle cx="24" cy="24" r="18" fill="#009FC2" />
      <path
        d="M18 18 C18 13 30 12 30 19 C30 24 24 24 24 29"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <circle cx="24" cy="35" r="2.4" fill="#FFFFFF" />
    </>
  ),
  bolt: (
    <>
      <path d="M27 4 L11 26 H21 L18 44 L38 18 H26 Z" fill="#F37021" stroke="#D85C11" strokeWidth="1.5" strokeLinejoin="round" />
    </>
  ),
  trophy: (
    <>
      <path d="M15 8 H33 V20 C33 27 29 31 24 31 C19 31 15 27 15 20 Z" fill="#FFC940" stroke="#E5A100" strokeWidth="2" />
      <path d="M15 10 C9 10 8 18 15 20" fill="none" stroke="#E5A100" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M33 10 C39 10 40 18 33 20" fill="none" stroke="#E5A100" strokeWidth="2.5" strokeLinecap="round" />
      <rect x="21" y="31" width="6" height="7" fill="#E5A100" />
      <rect x="14" y="38" width="20" height="5" rx="1.5" fill="#E5A100" />
    </>
  ),
  check: (
    <>
      <circle cx="24" cy="24" r="18" fill="#2FA66A" />
      <path d="M15 24 L21 30 L33 17" fill="none" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  cross: (
    <>
      <circle cx="24" cy="24" r="18" fill="#E0453C" />
      <g stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round">
        <line x1="17" y1="17" x2="31" y2="31" />
        <line x1="31" y1="17" x2="17" y2="31" />
      </g>
    </>
  ),
  party: (
    <>
      <g stroke="none">
        <rect x="21" y="3" width="6" height="6" rx="1.5" fill="#F37021" transform="rotate(20 24 6)" />
        <rect x="4" y="21" width="6" height="6" rx="1.5" fill="#009FC2" transform="rotate(-15 7 24)" />
        <rect x="38" y="21" width="6" height="6" rx="1.5" fill="#2FA66A" transform="rotate(15 41 24)" />
        <circle cx="24" cy="40" r="3.5" fill="#FFC940" />
        <circle cx="12" cy="10" r="2.5" fill="#4FC3E8" />
        <circle cx="36" cy="10" r="2.5" fill="#F37021" />
      </g>
    </>
  ),
  charger: (
    <>
      <rect x="18" y="4" width="12" height="20" rx="3" fill="#37474F" stroke="#263238" strokeWidth="2" />
      <rect x="21" y="24" width="6" height="6" fill="#263238" />
      <path d="M22 30 C22 34 26 34 26 38" fill="none" stroke="#78909C" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M23 8 L20 15 L24 15 L21 22" fill="none" stroke="#FFD54A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  washer: (
    <>
      <rect x="8" y="6" width="32" height="36" rx="4" fill="#ECEFF1" stroke="#90A4AE" strokeWidth="2.5" />
      <circle cx="24" cy="25" r="11" fill="#B3E5FC" stroke="#4FC3E8" strokeWidth="2.5" />
      <circle cx="24" cy="25" r="5" fill="#4FC3E8" />
      <circle cx="14" cy="11" r="1.6" fill="#90A4AE" />
      <circle cx="20" cy="11" r="1.6" fill="#90A4AE" />
    </>
  ),
  iron: (
    <>
      <path
        d="M6 20 H24 L40 27 L24 34 H12 C8 34 6 31 6 27 Z"
        fill="#B0BEC5"
        stroke="#78909C"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M13 20 V15 C13 12 21 12 21 15 V20" fill="none" stroke="#546E7A" strokeWidth="3" strokeLinecap="round" />
      <circle cx="32" cy="27" r="1.5" fill="#78909C" />
      <circle cx="26" cy="27" r="1.5" fill="#78909C" />
    </>
  ),
  sofa: (
    <>
      <rect x="8" y="20" width="32" height="14" rx="4" fill="#4FC3E8" stroke="#009FC2" strokeWidth="2" />
      <rect x="6" y="26" width="8" height="12" rx="3" fill="#3FA9CC" stroke="#009FC2" strokeWidth="2" />
      <rect x="34" y="26" width="8" height="12" rx="3" fill="#3FA9CC" stroke="#009FC2" strokeWidth="2" />
      <rect x="10" y="34" width="28" height="6" rx="2" fill="#009FC2" />
    </>
  ),
  bed: (
    <>
      <rect x="6" y="24" width="36" height="14" rx="3" fill="#B39DDB" stroke="#7E57C2" strokeWidth="2" />
      <rect x="6" y="18" width="12" height="10" rx="3" fill="#EDE7F6" stroke="#7E57C2" strokeWidth="2" />
      <line x1="6" y1="38" x2="6" y2="42" stroke="#7E57C2" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="42" y1="38" x2="42" y2="42" stroke="#7E57C2" strokeWidth="2.5" strokeLinecap="round" />
    </>
  ),
  window: (
    <>
      <rect x="7" y="7" width="34" height="34" rx="3" fill="#E8F6FB" stroke="#78909C" strokeWidth="2.5" />
      <line x1="24" y1="7" x2="24" y2="41" stroke="#78909C" strokeWidth="2.5" />
      <line x1="7" y1="24" x2="41" y2="24" stroke="#78909C" strokeWidth="2.5" />
    </>
  ),
  candle: (
    <>
      <path d="M24 4 C27 9 28 12 24 14 C20 12 21 9 24 4 Z" fill="#FFC940" stroke="#E5A100" strokeWidth="1.5" />
      <rect x="19" y="14" width="10" height="26" rx="1.5" fill="#FFF6E5" stroke="#D8C69A" strokeWidth="2" />
      <line x1="24" y1="14" x2="24" y2="18" stroke="#8B5E00" strokeWidth="1.5" />
    </>
  ),
  faucet: (
    <>
      <rect x="6" y="10" width="10" height="10" rx="2" fill="#B0BEC5" stroke="#78909C" strokeWidth="2" />
      <path d="M11 10 V6 H30 C34 6 34 10 34 14 V20" fill="none" stroke="#B0BEC5" strokeWidth="5" strokeLinecap="round" />
      <g stroke="#4FC3E8" strokeWidth="2.5" strokeLinecap="round">
        <line x1="34" y1="26" x2="34" y2="32" />
        <line x1="34" y1="36" x2="34" y2="40" />
      </g>
    </>
  ),
  pot: (
    <>
      <path d="M10 20 H38 V30 C38 36 32 40 24 40 C16 40 10 36 10 30 Z" fill="#B0BEC5" stroke="#78909C" strokeWidth="2" />
      <rect x="8" y="17" width="32" height="5" rx="2.5" fill="#78909C" />
      <rect x="3" y="18" width="6" height="3" rx="1.5" fill="#78909C" />
      <rect x="39" y="18" width="6" height="3" rx="1.5" fill="#78909C" />
      <path d="M18 13 C18 10 21 10 21 13 M27 13 C27 10 30 10 30 13" fill="none" stroke="#B0BEC5" strokeWidth="2" strokeLinecap="round" />
    </>
  ),
  mirror: (
    <>
      <ellipse cx="24" cy="18" rx="14" ry="16" fill="#E8F6FB" stroke="#90A4AE" strokeWidth="3" />
      <line x1="24" y1="34" x2="24" y2="42" stroke="#90A4AE" strokeWidth="3" strokeLinecap="round" />
      <line x1="16" y1="42" x2="32" y2="42" stroke="#90A4AE" strokeWidth="3" strokeLinecap="round" />
    </>
  ),
}

export const ICON_NAMES = Object.keys(ICONS)

export default function Icon({ name, className, size = 40 }) {
  const content = ICONS[name]
  if (!content) return null
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {content}
    </svg>
  )
}

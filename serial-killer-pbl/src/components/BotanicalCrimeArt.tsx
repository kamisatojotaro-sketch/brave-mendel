import React from 'react';

// ============================================================================
// BOTANICAL & CRIME-SCENE ILLUSTRATION SYSTEM (ORIGINAL PALETTE EDITION)
// Palette:
// - Pure Noir Black (#050505)
// - Neon Green (#00ff00) — matching "My Sister, The Serial Killer" cover
// - Deep Blood Red & Crimson (#c0392b / #3a0b10)
// - Off-White Paper (#f1efe6)
// ============================================================================

/**
 * 1. Swirling Lagoon Water-Ripple Caustics & Bubbles Backdrop
 */
export const LagoonWaterRipples: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 1440 460"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`pointer-events-none select-none ${className}`}
    preserveAspectRatio="none"
  >
    {/* Primary Fluid Lagoon Caustic Ribbons (Off-White #f1efe6 & Neon #00ff00) */}
    <path
      d="M-80 35 C 140 145, 290 -15, 540 92 C 780 198, 970 18, 1230 108 C 1350 150, 1430 75, 1520 115"
      stroke="#f1efe6"
      strokeWidth="1.8"
      strokeOpacity="0.28"
      strokeLinecap="round"
    />
    <path
      d="M-50 98 C 155 25, 385 215, 645 122 C 895 32, 1085 210, 1345 88 C 1415 58, 1475 92, 1530 72"
      stroke="#00ff00"
      strokeWidth="1.4"
      strokeOpacity="0.24"
      strokeLinecap="round"
    />
    <path
      d="M 45 -15 C 175 105, 95 220, 285 262 C 475 304, 535 138, 745 188 C 955 238, 1045 318, 1310 215"
      stroke="#f1efe6"
      strokeWidth="1.2"
      strokeOpacity="0.2"
      strokeLinecap="round"
    />
    <path
      d="M-30 185 C 190 120, 340 280, 590 195 C 830 110, 1020 265, 1280 165 C 1380 130, 1450 175, 1510 155"
      stroke="#c0392b"
      strokeWidth="1.1"
      strokeOpacity="0.24"
      strokeLinecap="round"
    />

    {/* Organic Enclosed Caustic Water Cells */}
    <path
      d="M 120 52 C 165 38, 215 62, 195 92 C 175 118, 115 108, 102 82 C 92 62, 105 56, 120 52 Z"
      stroke="#00ff00"
      strokeWidth="1.3"
      strokeOpacity="0.28"
    />
    <path
      d="M 320 112 C 365 98, 420 124, 398 152 C 378 176, 312 166, 298 140 C 288 122, 302 116, 320 112 Z"
      stroke="#f1efe6"
      strokeWidth="1.2"
      strokeOpacity="0.22"
    />
    <path
      d="M 1040 58 C 1095 42, 1150 70, 1128 98 C 1105 124, 1038 112, 1022 86 C 1012 68, 1025 62, 1040 58 Z"
      stroke="#00ff00"
      strokeWidth="1.3"
      strokeOpacity="0.28"
    />

    {/* Submerged Moon Reflection Orb with Crimson Crescent */}
    <g transform="translate(495, 76)">
      <circle cx="24" cy="24" r="22" fill="#f1efe6" fillOpacity="0.85" />
      <path d="M 4 31 A 22 22 0 0 0 42 37 C 32 45, 16 46, 4 31 Z" fill="#c0392b" />
      <circle cx="24" cy="24" r="26" stroke="#00ff00" strokeWidth="1" strokeOpacity="0.35" />
    </g>

    {/* Organic Water Bubbles & Droplets */}
    <circle cx="238" cy="82" r="5.5" stroke="#f1efe6" strokeWidth="1.4" strokeOpacity="0.45" />
    <circle cx="254" cy="95" r="2.8" fill="#00ff00" fillOpacity="0.45" />
    <circle cx="958" cy="68" r="7" stroke="#00ff00" strokeWidth="1.4" strokeOpacity="0.45" />
    <circle cx="946" cy="86" r="2.5" fill="#c0392b" fillOpacity="0.65" />
    <circle cx="1185" cy="148" r="5" stroke="#c0392b" strokeWidth="1.5" strokeOpacity="0.6" />
  </svg>
);

/**
 * 2. Blood-Stained Cloth / Bathroom Towel Prop
 * Off-white (#f1efe6) cloth draped & soaked with deep crimson (#c0392b) and blood-red (#3a0b10) stains.
 */
export const BloodyClothProp: React.FC<{ className?: string }> = ({ className = 'w-24 h-24' }) => (
  <svg viewBox="0 0 140 140" fill="none" className={className}>
    <ellipse cx="70" cy="128" rx="34" ry="6" fill="#050505" fillOpacity="0.7" />

    {/* Draped Off-White Bathroom Towel/Cloth Shape */}
    <path
      d="M26 24 C48 16, 92 18, 112 28 C105 58, 120 88, 104 118 C84 108, 68 124, 44 116 C30 92, 18 56, 26 24 Z"
      fill="#f1efe6"
      stroke="#050505"
      strokeWidth="3.2"
      strokeLinejoin="round"
    />
    {/* Woven Towel Stripe */}
    <path
      d="M38 104 C58 110, 82 100, 104 106"
      stroke="#00ff00"
      strokeWidth="3"
      strokeLinecap="round"
      strokeOpacity="0.65"
    />
    {/* Cloth Fold Creases */}
    <path d="M48 28 C43 60, 52 88, 46 112" stroke="#050505" strokeWidth="2.2" strokeLinecap="round" />
    <path d="M82 27 C87 58, 77 86, 88 110" stroke="#050505" strokeWidth="2.2" strokeLinecap="round" />

    {/* Crimson & Deep Blood-Red Stains Soaking the Cloth */}
    <path
      d="M50 42 C68 35, 96 44, 100 66 C104 84, 85 100, 72 93 C58 86, 65 72, 52 68 C39 64, 38 48, 50 42 Z"
      fill="#c0392b"
    />
    <path
      d="M60 52 C74 47, 90 56, 88 72 C85 84, 69 82, 62 70 C56 60, 54 55, 60 52 Z"
      fill="#6e0d14"
    />
    <path
      d="M34 66 C42 62, 48 72, 44 82 C40 88, 32 84, 34 66 Z"
      fill="#c0392b"
    />

    {/* Dripping Blood Drops Below & Around the Cloth */}
    <circle cx="42" cy="92" r="5" fill="#c0392b" />
    <circle cx="96" cy="102" r="4.2" fill="#6e0d14" />
    <path d="M74 116 C74 116, 68 128, 74 133 C80 128, 74 116, 74 116 Z" fill="#c0392b" />
    <path d="M98 112 C98 112, 94 121, 98 125 C102 121, 98 112, 98 112 Z" fill="#6e0d14" />
    <circle cx="117" cy="80" r="3.5" fill="#c0392b" />
    <circle cx="20" cy="74" r="3" fill="#c0392b" />
  </svg>
);

/**
 * 3. Father's 9-Inch Curved Hunting Knife Prop
 * Noir-black handle, off-white blade, neon-green guard, and crimson blood drips.
 */
export const HuntingKnifeProp: React.FC<{ className?: string }> = ({ className = 'w-24 h-24' }) => (
  <svg viewBox="0 0 140 140" fill="none" className={className}>
    <ellipse cx="70" cy="128" rx="30" ry="5" fill="#050505" fillOpacity="0.65" />
    <g transform="rotate(-28 70 70)">
      {/* Carved Ebony Handle */}
      <rect x="57" y="86" width="22" height="42" rx="6" fill="#050505" stroke="#f1efe6" strokeWidth="2.6" />
      <line x1="60" y1="98" x2="76" y2="98" stroke="#00ff00" strokeWidth="1.5" strokeOpacity="0.6" />
      <line x1="60" y1="110" x2="76" y2="110" stroke="#00ff00" strokeWidth="1.5" strokeOpacity="0.6" />
      <circle cx="68" cy="93" r="2.5" fill="#c0392b" />
      <circle cx="68" cy="104" r="2.5" fill="#00ff00" />
      <circle cx="68" cy="116" r="2.5" fill="#c0392b" />

      {/* Neon-Green Crossguard */}
      <rect x="46" y="80" width="44" height="7" rx="3.5" fill="#00ff00" stroke="#050505" strokeWidth="2.4" />

      {/* Curved 9-Inch Hunting Blade */}
      <path
        d="M57 80 L57 24 C57 11, 73 5, 82 17 L79 80 Z"
        fill="#f1efe6"
        stroke="#050505"
        strokeWidth="2.8"
        strokeLinejoin="round"
      />
      <line x1="63" y1="74" x2="63" y2="36" stroke="#050505" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.55" />

      {/* Deep Crimson Blood Coating the Curved Blade Tip */}
      <path
        d="M57 45 L57 24 C57 11, 73 5, 82 17 L80 52 C73 44, 67 56, 57 45 Z"
        fill="#c0392b"
      />
      <path
        d="M63 29 C63 19, 73 13, 79 21 L77 41 C71 37, 66 39, 63 29 Z"
        fill="#6e0d14"
      />
    </g>

    {/* Blood Splatter Droplets Off the Tip */}
    <path d="M96 24 C96 24, 90 37, 96 42 C102 37, 96 24, 96 24 Z" fill="#c0392b" />
    <path d="M108 42 C108 42, 104 51, 108 55 C112 51, 108 42, 108 42 Z" fill="#6e0d14" />
    <circle cx="88" cy="52" r="3" fill="#c0392b" />
    <circle cx="114" cy="30" r="2.5" fill="#00ff00" />
  </svg>
);

/**
 * 4. Korede's Bleach Bottle Prop
 * Jug labeled "BLEACH" with bubbling neon-green & crimson chemical foam.
 */
export const BleachBottleProp: React.FC<{ className?: string }> = ({ className = 'w-24 h-24' }) => (
  <svg viewBox="0 0 140 140" fill="none" className={className}>
    <ellipse cx="68" cy="126" rx="42" ry="7" fill="#00ff00" fillOpacity="0.32" />
    <ellipse cx="82" cy="127" rx="22" ry="4.5" fill="#c0392b" fillOpacity="0.45" />

    {/* Chemical Foam Bubbles */}
    <circle cx="42" cy="28" r="6" fill="#00ff00" />
    <circle cx="54" cy="19" r="4.5" fill="#c0392b" />
    <circle cx="96" cy="32" r="5.5" fill="#00ff00" />
    <circle cx="84" cy="18" r="3" fill="#f1efe6" />

    {/* Bottle Cap */}
    <rect x="57" y="19" width="22" height="13" rx="3" fill="#c0392b" stroke="#050505" strokeWidth="2.6" />
    {/* Jug Body */}
    <path
      d="M54 32 L82 32 L95 52 L95 118 C95 123, 91 126, 85 126 L51 126 C45 126, 41 123, 41 118 L41 52 Z"
      fill="#f1efe6"
      stroke="#050505"
      strokeWidth="3"
      strokeLinejoin="round"
    />
    {/* Molded Handle */}
    <path d="M84 44 L99 44 C105 44, 107 66, 99 66 L88 66" fill="none" stroke="#f1efe6" strokeWidth="6.5" strokeLinecap="round" />
    <path d="M84 44 L99 44 C105 44, 107 66, 99 66 L88 66" fill="none" stroke="#050505" strokeWidth="2.6" strokeLinecap="round" />

    {/* Pop-Art Label Band */}
    <rect x="42" y="62" width="52" height="38" fill="#050505" />
    <rect x="42" y="66" width="52" height="4" fill="#00ff00" />
    <rect x="42" y="92" width="52" height="4" fill="#c0392b" />
    <text x="68" y="85" textAnchor="middle" fill="#f1efe6" fontSize="11.5" fontFamily="monospace" fontWeight="bold">
      BLEACH
    </text>
  </svg>
);

/**
 * 5. Korede's Scrubbing Rubber Gloves & Blood Drops Prop
 */
export const RubberGlovesProp: React.FC<{ className?: string }> = ({ className = 'w-24 h-24' }) => (
  <svg viewBox="0 0 140 140" fill="none" className={className}>
    <ellipse cx="70" cy="126" rx="34" ry="5" fill="#050505" fillOpacity="0.6" />
    <g transform="rotate(-14 55 72)">
      <path
        d="M36 112 L38 68 L28 56 C25 52, 30 46, 35 50 L42 58 L42 36 C42 30, 49 30, 49 36 L49 54 L53 32 C53 26, 60 26, 60 32 L60 54 L64 36 C64 30, 71 30, 71 36 L71 58 L75 44 C76 39, 82 41, 81 47 L76 72 L78 112 Z"
        fill="#00ff00"
        stroke="#050505"
        strokeWidth="2.8"
        strokeLinejoin="round"
      />
      <rect x="34" y="102" width="46" height="10" rx="2" fill="#f1efe6" stroke="#050505" strokeWidth="2.4" />
    </g>
    {/* Crimson Blood & Bleach Drops */}
    <circle cx="96" cy="48" r="5" fill="#c0392b" />
    <circle cx="106" cy="62" r="3.5" fill="#00ff00" />
    <path d="M92 78 C92 78, 87 89, 92 93 C97 89, 92 78, 92 78 Z" fill="#c0392b" />
  </svg>
);

/**
 * 6. Round Crimson-Tinted Sunglasses Reflecting a Knife
 * Directly inspired by the cover of "My Sister, The Serial Killer".
 */
export const CrimsonSunglassesProp: React.FC<{ className?: string }> = ({ className = 'w-36 h-16' }) => (
  <svg viewBox="0 0 220 90" fill="none" className={className}>
    <defs>
      <linearGradient id="crimsonLens" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#e74c3c" />
        <stop offset="48%" stopColor="#c0392b" />
        <stop offset="100%" stopColor="#3a0b10" />
      </linearGradient>
    </defs>
    <line x1="6" y1="44" x2="26" y2="44" stroke="#f1efe6" strokeWidth="3" strokeLinecap="round" />
    <path d="M94 42 Q110 31 126 42" stroke="#f1efe6" strokeWidth="3.2" fill="none" />
    <line x1="194" y1="44" x2="214" y2="44" stroke="#f1efe6" strokeWidth="3" strokeLinecap="round" />

    {/* Left Round Lens */}
    <circle cx="60" cy="45" r="34" fill="url(#crimsonLens)" stroke="#f1efe6" strokeWidth="3" />
    <path d="M50 76 L53 50 L64 44 L69 76 Z" fill="#050505" opacity="0.88" />
    <path d="M63 47 L75 27 L80 32 L66 51 Z" fill="#00ff00" opacity="0.92" />

    {/* Right Round Lens */}
    <circle cx="160" cy="45" r="34" fill="url(#crimsonLens)" stroke="#f1efe6" strokeWidth="3" />
    <path d="M150 76 L153 50 L164 44 L169 76 Z" fill="#050505" opacity="0.88" />
    <path d="M163 47 L175 27 L180 32 L166 51 Z" fill="#00ff00" opacity="0.92" />

    {/* Specular Lens Glints */}
    <path d="M37 28 A 26 26 0 0 1 56 19" stroke="#f1efe6" strokeWidth="2.5" strokeLinecap="round" opacity="0.75" />
    <path d="M137 28 A 26 26 0 0 1 156 19" stroke="#f1efe6" strokeWidth="2.5" strokeLinecap="round" opacity="0.75" />
  </svg>
);

/**
 * 7. Botanical Lily Pads, Off-White Reeds, Crimson Lotus & Frog Cutout Footer
 * Styled in the original Noir Black (#050505), Neon Green (#00ff00), Crimson (#c0392b), & Off-White (#f1efe6) palette!
 */
export const BotanicalLagoonFooter: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 1440 250"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`pointer-events-none select-none w-full ${className}`}
    preserveAspectRatio="none"
  >
    {/* Deep Noir Lagoon Bank Silhouette */}
    <path
      d="M0 195 C 220 155, 460 225, 720 185 C 980 145, 1210 215, 1440 175 L 1440 250 L 0 250 Z"
      fill="#050505"
      fillOpacity="0.85"
    />

    {/* Sharp Off-White & Crimson Reeds Rising from the Lagoon Trench */}
    <g opacity="0.9">
      <path d="M155 245 Q172 140 142 58 Q184 140 176 245 Z" fill="#f1efe6" />
      <path d="M182 245 Q204 128 228 48 Q214 145 200 245 Z" fill="#f1efe6" />
      <path d="M208 245 Q236 150 268 84 Q244 168 226 245 Z" fill="#c0392b" />
      <path d="M234 245 Q258 168 286 112 Q264 182 248 245 Z" fill="#00ff00" />

      <path d="M1160 245 Q1142 135 1110 56 Q1156 140 1178 245 Z" fill="#f1efe6" />
      <path d="M1192 245 Q1214 142 1250 68 Q1226 154 1208 245 Z" fill="#c0392b" />
      <path d="M1222 245 Q1246 155 1288 94 Q1256 172 1238 245 Z" fill="#f1efe6" />
      <path d="M1252 245 Q1272 175 1308 122 Q1282 188 1266 245 Z" fill="#00ff00" />
    </g>

    {/* Left Layered Giant Lily Pads with Neon-Green Radial Veins */}
    <g transform="translate(15, 118)">
      <ellipse cx="145" cy="68" rx="138" ry="48" fill="#082411" stroke="#00ff00" strokeWidth="2" strokeOpacity="0.65" />
      <path d="M145 68 L272 52 L282 75 Z" fill="#050505" />
      <path
        d="M145 68 L42 46 M145 68 L82 25 M145 68 L162 22 M145 68 L220 35 M145 68 L78 98 M145 68 L180 105"
        stroke="#00ff00"
        strokeWidth="1.8"
        strokeOpacity="0.55"
        strokeLinecap="round"
      />
    </g>
    <g transform="translate(245, 152)">
      <ellipse cx="95" cy="44" rx="88" ry="32" fill="#061a0c" stroke="#00ff00" strokeWidth="1.8" strokeOpacity="0.55" />
      <path d="M95 44 L175 34 L182 50 Z" fill="#050505" />
      <path d="M95 44 L35 30 M95 44 L75 16 M95 44 L135 20 M95 44 L65 68 M95 44 L130 68" stroke="#00ff00" strokeWidth="1.5" strokeOpacity="0.45" />
    </g>

    {/* Right Layered Giant Lily Pads with Neon-Green Radial Veins */}
    <g transform="translate(1075, 122)">
      <ellipse cx="160" cy="66" rx="150" ry="50" fill="#082411" stroke="#00ff00" strokeWidth="2" strokeOpacity="0.65" />
      <path d="M160 66 L18 52 L12 76 Z" fill="#050505" />
      <path
        d="M160 66 L80 30 M160 66 L155 20 M160 66 L235 32 M160 66 L278 62 M160 66 L110 104 M160 66 L212 104"
        stroke="#00ff00"
        strokeWidth="1.8"
        strokeOpacity="0.55"
        strokeLinecap="round"
      />
    </g>
    <g transform="translate(885, 155)">
      <ellipse cx="105" cy="45" rx="98" ry="34" fill="#061a0c" stroke="#00ff00" strokeWidth="1.8" strokeOpacity="0.55" />
      <path d="M105 45 L18 35 L12 52 Z" fill="#050505" />
      <path d="M105 45 L50 22 M105 45 L105 14 M105 45 L160 24 M105 45 L75 72 M105 45 L145 70" stroke="#00ff00" strokeWidth="1.5" strokeOpacity="0.45" />
    </g>

    {/* Multi-Petaled Off-White & Crimson Water-Lily Bloom */}
    <g transform="translate(845, 98)">
      <path d="M65 92 C28 80, 8 48, 20 22 C40 36, 52 58, 65 92 Z" fill="#c0392b" stroke="#050505" strokeWidth="1.5" />
      <path d="M65 92 C102 80, 122 48, 110 22 C90 36, 78 58, 65 92 Z" fill="#c0392b" stroke="#050505" strokeWidth="1.5" />
      <path d="M65 92 C38 68, 30 30, 44 8 C55 30, 60 58, 65 92 Z" fill="#f1efe6" stroke="#c0392b" strokeWidth="1.6" />
      <path d="M65 92 C92 68, 100 30, 86 8 C75 30, 70 58, 65 92 Z" fill="#f1efe6" stroke="#c0392b" strokeWidth="1.6" />
      <path d="M65 92 C50 58, 54 18, 65 0 C76 18, 80 58, 65 92 Z" fill="#f1efe6" stroke="#050505" strokeWidth="1.6" />
    </g>

    {/* Left Poison-Dart Frog Motif (Crimson, Off-White Belly, Noir Spots) */}
    <g transform="translate(78, 92)">
      <path d="M24 44 L8 60 L28 60" stroke="#c0392b" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round" />
      <ellipse cx="48" cy="36" rx="27" ry="16" transform="rotate(-14 48 36)" fill="#c0392b" stroke="#050505" strokeWidth="2" />
      <path d="M28 40 Q48 53 70 36 Q56 48 28 40 Z" fill="#f1efe6" />
      <circle cx="42" cy="28" r="5" fill="#050505" />
      <circle cx="56" cy="32" r="4" fill="#050505" />
      <circle cx="68" cy="24" r="4.5" fill="#050505" stroke="#00ff00" strokeWidth="1.5" />
      <path d="M60 44 L72 58" stroke="#c0392b" strokeWidth="5" strokeLinecap="round" />
    </g>

    {/* Right Poison-Dart Frog Motif */}
    <g transform="translate(1245, 96) scale(-1, 1)">
      <path d="M24 44 L8 60 L28 60" stroke="#c0392b" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round" />
      <ellipse cx="48" cy="36" rx="25" ry="15" transform="rotate(-12 48 36)" fill="#c0392b" stroke="#050505" strokeWidth="2" />
      <path d="M28 40 Q48 52 68 36 Q56 46 28 40 Z" fill="#f1efe6" />
      <circle cx="44" cy="28" r="4.8" fill="#050505" />
      <circle cx="57" cy="33" r="3.8" fill="#050505" />
      <circle cx="66" cy="24" r="4" fill="#050505" stroke="#00ff00" strokeWidth="1.5" />
    </g>
  </svg>
);

/**
 * 8. Neon-Green / Crimson Paint & Blood Splatter SVG Accent
 */
export const PaintSplatterBadge: React.FC<{ color?: string; className?: string }> = ({
  color = '#00ff00',
  className = 'w-16 h-16',
}) => {
  const mappedColor = color === '#ff007f' ? '#c0392b' : color === '#00ff33' ? '#00ff00' : color;
  return (
    <svg viewBox="0 0 100 100" fill="none" className={`pointer-events-none select-none ${className}`}>
      <path
        d="M52 22 C64 16, 78 28, 74 42 C84 48, 86 64, 72 68 C74 80, 58 86, 48 76 C36 84, 22 74, 28 60 C16 52, 22 34, 36 36 C38 22, 46 25, 52 22 Z"
        fill={mappedColor}
      />
      <circle cx="18" cy="26" r="5" fill={mappedColor} />
      <circle cx="84" cy="24" r="4" fill={mappedColor} />
      <circle cx="88" cy="76" r="6" fill={mappedColor} />
      <circle cx="22" cy="82" r="3.5" fill={mappedColor} />
      <circle cx="62" cy="12" r="3" fill={mappedColor} />
    </svg>
  );
};

import React from 'react';

// ============================================================================
// BOTANICAL & CRIME-SCENE POP-ART ILLUSTRATION SYSTEM
// Inspired by the gouache/risograph cover of "How to Kill Your Family"
// (emerald foliage, cream water ripples, fluorescent hot-pink #ff007f pops)
// fused with "My Sister, The Serial Killer" (hunting knife, blood-soaked cloths,
// bleach bottle, round crimson sunglasses, hibiscus blooms, splatter ink).
// ============================================================================

/**
 * 1. Swirling Cream Water-Ripple Caustics & Bubbles Backdrop
 * Recreates the top fluid cream water lines from the reference cover
 * (representing the Lagos Lagoon beneath the Third Mainland Bridge).
 */
export const LagoonWaterRipples: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 1440 420"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`pointer-events-none select-none ${className}`}
    preserveAspectRatio="none"
  >
    {/* Organic Fluid Lagoon Caustic Swirls */}
    <path
      d="M-60 45 C 180 130, 320 -10, 560 95 C 790 195, 980 25, 1240 110 C 1360 150, 1440 80, 1520 120"
      stroke="#f3efe4"
      strokeWidth="1.6"
      strokeOpacity="0.42"
    />
    <path
      d="M-40 110 C 140 40, 390 210, 640 125 C 890 40, 1080 205, 1340 90 C 1410 60, 1470 95, 1520 75"
      stroke="#f3efe4"
      strokeWidth="1.2"
      strokeOpacity="0.32"
    />
    <path
      d="M 80 -10 C 190 95, 110 210, 290 250 C 470 290, 540 140, 740 185 C 940 230, 1040 310, 1290 220"
      stroke="#f3efe4"
      strokeWidth="1.1"
      strokeOpacity="0.26"
    />
    <path
      d="M 210 145 C 310 115, 420 165, 510 135 C 600 105, 680 155, 780 125"
      stroke="#00ff33"
      strokeWidth="1.2"
      strokeOpacity="0.28"
    />

    {/* Submerged Moon / Sun Reflection Disc with Hot-Pink Rim (from Reference Cover) */}
    <circle cx="515" cy="96" r="22" fill="#f3efe4" fillOpacity="0.9" />
    <path d="M 495 104 A 22 22 0 0 0 532 110 L 515 118 Z" fill="#ff007f" />

    {/* Organic Water Bubbles & Droplets */}
    <circle cx="240" cy="82" r="5" stroke="#f3efe4" strokeWidth="1.3" strokeOpacity="0.55" />
    <circle cx="254" cy="94" r="2.5" fill="#f3efe4" fillOpacity="0.45" />
    <circle cx="960" cy="68" r="6.5" stroke="#f3efe4" strokeWidth="1.4" strokeOpacity="0.5" />
    <circle cx="975" cy="82" r="3" stroke="#f3efe4" strokeWidth="1.2" strokeOpacity="0.45" />
    <circle cx="1180" cy="148" r="4.5" stroke="#ff007f" strokeWidth="1.4" strokeOpacity="0.6" />
  </svg>
);

/**
 * 2. Blood-Stained Cloth / Bathroom Towel Prop
 * Flat-gouache cream cloth draped & soaked with fluorescent magenta & crimson blood splatters.
 */
export const BloodyClothProp: React.FC<{ className?: string }> = ({ className = 'w-24 h-24' }) => (
  <svg viewBox="0 0 140 140" fill="none" className={className}>
    {/* Draped Cream Towel/Cloth Shape */}
    <path
      d="M28 24 C48 18, 92 20, 110 28 C104 58, 118 88, 102 118 C82 110, 68 124, 46 116 C32 92, 20 56, 28 24 Z"
      fill="#f3efe4"
      stroke="#040705"
      strokeWidth="3"
    />
    {/* Cloth Fold Lines */}
    <path d="M48 30 C44 62, 52 88, 46 112" stroke="#040705" strokeWidth="2" strokeLinecap="round" />
    <path d="M82 28 C86 58, 78 86, 88 110" stroke="#040705" strokeWidth="2" strokeLinecap="round" />

    {/* Vibrant Hot-Pink & Crimson Blood Stains Soaking the Cloth */}
    <path
      d="M52 44 C68 38, 94 46, 98 66 C102 82, 84 98, 72 92 C60 86, 66 72, 54 68 C42 64, 40 50, 52 44 Z"
      fill="#ff007f"
    />
    <path
      d="M62 54 C74 50, 88 58, 86 72 C84 82, 70 80, 64 70 Z"
      fill="#d90429"
    />
    {/* Dripping Blood Drops Below the Cloth */}
    <circle cx="42" cy="88" r="5" fill="#ff007f" />
    <circle cx="96" cy="102" r="4" fill="#d90429" />
    <path d="M74 118 C74 118, 69 128, 74 132 C79 128, 74 118, 74 118 Z" fill="#ff007f" />
    <circle cx="116" cy="82" r="3.5" fill="#ff007f" />
  </svg>
);

/**
 * 3. Father's 9-Inch Curved Hunting Knife Prop
 * Ink-black carved handle, cream-and-emerald blade, and hot-pink/crimson blood drips off the tip.
 */
export const HuntingKnifeProp: React.FC<{ className?: string }> = ({ className = 'w-24 h-24' }) => (
  <svg viewBox="0 0 140 140" fill="none" className={className}>
    <g transform="rotate(-28 70 70)">
      {/* Carved Wooden/Black Handle */}
      <rect x="58" y="88" width="20" height="40" rx="5" fill="#040705" stroke="#f3efe4" strokeWidth="2.5" />
      <circle cx="68" cy="100" r="2.5" fill="#ff007f" />
      <circle cx="68" cy="114" r="2.5" fill="#ff007f" />
      {/* Crossguard */}
      <rect x="48" y="82" width="40" height="7" rx="3" fill="#00ff33" stroke="#040705" strokeWidth="2" />
      {/* Curved Hunting Blade */}
      <path
        d="M58 82 L58 26 C58 14, 72 8, 80 18 L78 82 Z"
        fill="#f3efe4"
        stroke="#040705"
        strokeWidth="2.5"
      />
      {/* Hot-Pink & Crimson Blood Coating the Blade Tip */}
      <path
        d="M58 42 L58 26 C58 14, 72 8, 80 18 L79 48 C72 42, 66 52, 58 42 Z"
        fill="#ff007f"
      />
      <path
        d="M64 28 C64 20, 72 15, 77 22 L76 38 C70 35, 66 36, 64 28 Z"
        fill="#d90429"
      />
    </g>
    {/* Blood Splatter Droplets */}
    <path d="M96 26 C96 26, 91 38, 96 42 C101 38, 96 26, 96 26 Z" fill="#ff007f" />
    <circle cx="108" cy="48" r="4" fill="#d90429" />
    <circle cx="88" cy="52" r="2.5" fill="#ff007f" />
  </svg>
);

/**
 * 4. Korede's Bleach Bottle & Rubber Gloves Prop
 * Pop-art jug labeled "BLEACH" with bubbling neon-green & magenta chemical foam.
 */
export const BleachBottleProp: React.FC<{ className?: string }> = ({ className = 'w-24 h-24' }) => (
  <svg viewBox="0 0 140 140" fill="none" className={className}>
    {/* Chemical Foam Bubbles */}
    <circle cx="42" cy="28" r="6" fill="#00ff33" />
    <circle cx="54" cy="20" r="4" fill="#ff007f" />
    <circle cx="96" cy="34" r="5" fill="#00ff33" />

    {/* Bottle Cap */}
    <rect x="58" y="20" width="20" height="12" rx="2" fill="#ff007f" stroke="#040705" strokeWidth="2.5" />
    {/* Neck & Handle */}
    <path
      d="M54 32 L82 32 L94 52 L94 118 C94 123, 90 126, 84 126 L52 126 C46 126, 42 123, 42 118 L42 52 Z"
      fill="#f3efe4"
      stroke="#040705"
      strokeWidth="3"
    />
    {/* Cutout Jug Handle */}
    <path d="M84 44 L98 44 C104 44, 106 66, 98 66 L88 66" fill="none" stroke="#f3efe4" strokeWidth="6" strokeLinecap="round" />
    <path d="M84 44 L98 44 C104 44, 106 66, 98 66 L88 66" fill="none" stroke="#040705" strokeWidth="2.5" strokeLinecap="round" />

    {/* Pop-Art Label Band */}
    <rect x="42" y="64" width="52" height="36" fill="#040705" />
    <rect x="42" y="68" width="52" height="4" fill="#00ff33" />
    <rect x="42" y="92" width="52" height="4" fill="#ff007f" />
    <text x="68" y="86" textAnchor="middle" fill="#f3efe4" fontSize="11" fontFamily="monospace" fontWeight="bold">
      BLEACH
    </text>
  </svg>
);

/**
 * 5. Round Crimson-Tinted Sunglasses Reflecting a Knife
 * Directly inspired by the cover of "My Sister, The Serial Killer".
 */
export const CrimsonSunglassesProp: React.FC<{ className?: string }> = ({ className = 'w-36 h-16' }) => (
  <svg viewBox="0 0 220 90" fill="none" className={className}>
    <defs>
      <linearGradient id="crimsonLens" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#ff007f" />
        <stop offset="45%" stopColor="#d90429" />
        <stop offset="100%" stopColor="#1a0308" />
      </linearGradient>
    </defs>
    {/* Wire Temple Arms & Bridge */}
    <line x1="6" y1="44" x2="26" y2="44" stroke="#f3efe4" strokeWidth="3" strokeLinecap="round" />
    <path d="M96 42 Q110 34 124 42" stroke="#f3efe4" strokeWidth="3" fill="none" />
    <line x1="194" y1="44" x2="214" y2="44" stroke="#f3efe4" strokeWidth="3" strokeLinecap="round" />

    {/* Left Round Lens */}
    <circle cx="60" cy="45" r="34" fill="url(#crimsonLens)" stroke="#f3efe4" strokeWidth="3" />
    {/* Left Lens Silhouette Reflection (Raised Hand with Knife) */}
    <path d="M52 76 L54 52 L64 46 L68 76 Z" fill="#040705" opacity="0.85" />
    <path d="M64 48 L74 30 L78 34 L66 52 Z" fill="#00ff33" opacity="0.9" />

    {/* Right Round Lens */}
    <circle cx="160" cy="45" r="34" fill="url(#crimsonLens)" stroke="#f3efe4" strokeWidth="3" />
    {/* Right Lens Silhouette Reflection */}
    <path d="M152 76 L154 52 L164 46 L168 76 Z" fill="#040705" opacity="0.85" />
    <path d="M164 48 L174 30 L178 34 L166 52 Z" fill="#00ff33" opacity="0.9" />

    {/* Specular Glints */}
    <path d="M38 28 A 26 26 0 0 1 56 20" stroke="#f3efe4" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
    <path d="M138 28 A 26 26 0 0 1 156 20" stroke="#f3efe4" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
  </svg>
);

/**
 * 6. Botanical Lily Pads, Cream Reeds, Pink Hibiscus/Lotus & Poison Frog Cutout Footer
 * Directly recreates the bottom composition of the "How to Kill Your Family" reference cover!
 */
export const BotanicalLagoonFooter: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 1440 240"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`pointer-events-none select-none w-full ${className}`}
    preserveAspectRatio="none"
  >
    {/* Sharp Cream & Pink Reeds Rising from the Inky Trench */}
    <g opacity="0.85">
      <path d="M180 240 Q195 140 165 65 Q205 140 200 240 Z" fill="#f3efe4" />
      <path d="M210 240 Q230 130 250 55 Q240 145 228 240 Z" fill="#f3efe4" />
      <path d="M235 240 Q260 155 290 95 Q268 170 252 240 Z" fill="#ff007f" />
      <path d="M1190 240 Q1170 135 1140 60 Q1185 140 1208 240 Z" fill="#f3efe4" />
      <path d="M1220 240 Q1240 145 1275 75 Q1252 155 1236 240 Z" fill="#ff007f" />
      <path d="M1250 240 Q1270 160 1310 105 Q1280 175 1265 240 Z" fill="#f3efe4" />
    </g>

    {/* Left Giant Lily Pad with Bright Green Veins */}
    <g transform="translate(20, 115)">
      <ellipse cx="140" cy="65" rx="135" ry="48" fill="#0b4f26" stroke="#258e47" strokeWidth="2.5" />
      <path d="M140 65 L265 50 L275 72 Z" fill="#041d0e" />
      <path d="M140 65 L40 45 M140 65 L80 25 M140 65 L160 22 M140 65 L215 35 M140 65 L75 95 M140 65 L175 102" stroke="#258e47" strokeWidth="2" />
    </g>

    {/* Right Giant Lily Pad with Bright Green Veins */}
    <g transform="translate(1080, 120)">
      <ellipse cx="160" cy="65" rx="150" ry="50" fill="#0b4f26" stroke="#258e47" strokeWidth="2.5" />
      <path d="M160 65 L20 52 L15 75 Z" fill="#041d0e" />
      <path d="M160 65 L80 30 M160 65 L155 20 M160 65 L235 32 M160 65 L275 62 M160 65 L110 102 M160 65 L210 102" stroke="#258e47" strokeWidth="2" />
    </g>

    {/* Cream & Hot-Pink Lotus / Hibiscus Bloom Floating on the Pad */}
    <g transform="translate(860, 105)">
      <path d="M60 85 C30 75, 12 45, 22 22 C40 35, 50 55, 60 85 Z" fill="#ff007f" />
      <path d="M60 85 C90 75, 108 45, 98 22 C80 35, 70 55, 60 85 Z" fill="#ff007f" />
      <path d="M60 85 C38 65, 32 30, 44 10 C54 30, 58 55, 60 85 Z" fill="#f3efe4" stroke="#ff007f" strokeWidth="1.5" />
      <path d="M60 85 C82 65, 88 30, 76 10 C66 30, 62 55, 60 85 Z" fill="#f3efe4" stroke="#ff007f" strokeWidth="1.5" />
      <path d="M60 85 C48 55, 52 18, 60 2 C68 18, 72 55, 60 85 Z" fill="#f3efe4" stroke="#040705" strokeWidth="1.5" />
    </g>

    {/* Hot-Pink & Cream Poison-Dart Frog Motif (Left Lily Pad) */}
    <g transform="translate(85, 92)">
      {/* Frog Body */}
      <ellipse cx="48" cy="36" rx="26" ry="16" transform="rotate(-15 48 36)" fill="#ff007f" />
      {/* Cream Belly */}
      <path d="M30 40 Q48 52 68 36 Q56 46 30 40 Z" fill="#f3efe4" />
      {/* Ink Black Spots */}
      <circle cx="44" cy="28" r="5" fill="#040705" />
      <circle cx="58" cy="32" r="4" fill="#040705" />
      {/* Frog Eye */}
      <circle cx="68" cy="24" r="4.5" fill="#040705" stroke="#f3efe4" strokeWidth="1.5" />
      {/* Hind Leg */}
      <path d="M26 42 L10 58 L28 58" stroke="#ff007f" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  </svg>
);

/**
 * 7. Neon-Green / Hot-Pink Paint & Blood Splatter SVG Accent
 */
export const PaintSplatterBadge: React.FC<{ color?: string; className?: string }> = ({
  color = '#00ff33',
  className = 'w-16 h-16',
}) => (
  <svg viewBox="0 0 100 100" fill="none" className={`pointer-events-none select-none ${className}`}>
    <path
      d="M52 22 C64 16, 78 28, 74 42 C84 48, 86 64, 72 68 C74 80, 58 86, 48 76 C36 84, 22 74, 28 60 C16 52, 22 34, 36 36 C38 22, 46 25, 52 22 Z"
      fill={color}
    />
    <circle cx="18" cy="26" r="5" fill={color} />
    <circle cx="84" cy="24" r="4" fill={color} />
    <circle cx="88" cy="76" r="6" fill={color} />
    <circle cx="22" cy="82" r="3.5" fill={color} />
    <circle cx="62" cy="12" r="3" fill={color} />
  </svg>
);

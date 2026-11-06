import React from 'react';

// ============================================================================
// BOTANICAL & CRIME-SCENE POP-ART ILLUSTRATION SYSTEM
// Inspired by the gouache/risograph cover of "How to Kill Your Family"
// (emerald foliage, swirling cream water ripples, fluorescent hot-pink #ff007f
// poison frogs, reeds & lily pads) fused with "My Sister, The Serial Killer"
// (Father's 9-inch hunting knife, blood-soaked bathroom cloths, bleach jug,
// yellow/pink rubber scrubbing gloves, and round crimson-tinted sunglasses).
// ============================================================================

/**
 * 1. Swirling Cream Water-Ripple Caustics & Bubbles Backdrop
 * Recreates the top fluid cream water-caustic network from the reference cover
 * (representing the Lagos Lagoon beneath the Third Mainland Bridge).
 */
export const LagoonWaterRipples: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 1440 460"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`pointer-events-none select-none ${className}`}
    preserveAspectRatio="none"
  >
    {/* Primary Fluid Lagoon Caustic Ribbons (Cream #f3efe4) */}
    <path
      d="M-80 35 C 140 145, 290 -15, 540 92 C 780 198, 970 18, 1230 108 C 1350 150, 1430 75, 1520 115"
      stroke="#f3efe4"
      strokeWidth="2"
      strokeOpacity="0.48"
      strokeLinecap="round"
    />
    <path
      d="M-50 98 C 155 25, 385 215, 645 122 C 895 32, 1085 210, 1345 88 C 1415 58, 1475 92, 1530 72"
      stroke="#f3efe4"
      strokeWidth="1.5"
      strokeOpacity="0.36"
      strokeLinecap="round"
    />
    <path
      d="M 45 -15 C 175 105, 95 220, 285 262 C 475 304, 535 138, 745 188 C 955 238, 1045 318, 1310 215"
      stroke="#f3efe4"
      strokeWidth="1.3"
      strokeOpacity="0.3"
      strokeLinecap="round"
    />
    <path
      d="M-30 185 C 190 120, 340 280, 590 195 C 830 110, 1020 265, 1280 165 C 1380 130, 1450 175, 1510 155"
      stroke="#f3efe4"
      strokeWidth="1.1"
      strokeOpacity="0.22"
      strokeLinecap="round"
    />

    {/* Organic Enclosed Caustic Water Cells (Like Top-Left of Reference Cover 1) */}
    <path
      d="M 120 52 C 165 38, 215 62, 195 92 C 175 118, 115 108, 102 82 C 92 62, 105 56, 120 52 Z"
      stroke="#f3efe4"
      strokeWidth="1.4"
      strokeOpacity="0.38"
    />
    <path
      d="M 320 112 C 365 98, 420 124, 398 152 C 378 176, 312 166, 298 140 C 288 122, 302 116, 320 112 Z"
      stroke="#f3efe4"
      strokeWidth="1.3"
      strokeOpacity="0.3"
    />
    <path
      d="M 1040 58 C 1095 42, 1150 70, 1128 98 C 1105 124, 1038 112, 1022 86 C 1012 68, 1025 62, 1040 58 Z"
      stroke="#f3efe4"
      strokeWidth="1.4"
      strokeOpacity="0.35"
    />

    {/* Subtle Neon-Green & Hot-Pink Lagoon Shimmer Threads */}
    <path
      d="M 210 145 C 310 112, 425 168, 520 135 C 615 102, 690 158, 795 125"
      stroke="#00ff33"
      strokeWidth="1.4"
      strokeOpacity="0.32"
      strokeLinecap="round"
    />
    <path
      d="M 840 162 C 930 132, 1035 182, 1135 148"
      stroke="#ff007f"
      strokeWidth="1.3"
      strokeOpacity="0.32"
      strokeLinecap="round"
    />

    {/* Submerged Moon / Sun Reflection Orb with Hot-Pink Crescent (From Reference Cover 1) */}
    <g transform="translate(495, 76)">
      <circle cx="24" cy="24" r="22" fill="#f3efe4" fillOpacity="0.92" />
      <path d="M 4 31 A 22 22 0 0 0 42 37 C 32 45, 16 46, 4 31 Z" fill="#ff007f" />
      <circle cx="24" cy="24" r="26" stroke="#f3efe4" strokeWidth="1" strokeOpacity="0.35" />
    </g>

    {/* Organic Water Bubbles & Droplets */}
    <circle cx="238" cy="82" r="5.5" stroke="#f3efe4" strokeWidth="1.5" strokeOpacity="0.6" />
    <circle cx="254" cy="95" r="2.8" fill="#f3efe4" fillOpacity="0.5" />
    <circle cx="226" cy="98" r="2" fill="#00ff33" fillOpacity="0.55" />

    <circle cx="958" cy="68" r="7" stroke="#f3efe4" strokeWidth="1.5" strokeOpacity="0.55" />
    <circle cx="975" cy="83" r="3.5" stroke="#f3efe4" strokeWidth="1.3" strokeOpacity="0.5" />
    <circle cx="946" cy="86" r="2.2" fill="#ff007f" fillOpacity="0.65" />

    <circle cx="1185" cy="148" r="5" stroke="#ff007f" strokeWidth="1.5" strokeOpacity="0.65" />
    <circle cx="1200" cy="158" r="2.5" fill="#f3efe4" fillOpacity="0.45" />
  </svg>
);

/**
 * 2. Blood-Stained Cloth / Bathroom Towel Prop
 * Flat-gouache cream cloth draped & soaked with fluorescent magenta & crimson blood splatters.
 */
export const BloodyClothProp: React.FC<{ className?: string }> = ({ className = 'w-24 h-24' }) => (
  <svg viewBox="0 0 140 140" fill="none" className={className}>
    {/* Soft Drop Shadow */}
    <ellipse cx="70" cy="128" rx="34" ry="6" fill="#040705" fillOpacity="0.55" />

    {/* Draped Cream Bathroom Towel/Cloth Shape */}
    <path
      d="M26 24 C48 16, 92 18, 112 28 C105 58, 120 88, 104 118 C84 108, 68 124, 44 116 C30 92, 18 56, 26 24 Z"
      fill="#f3efe4"
      stroke="#040705"
      strokeWidth="3.2"
      strokeLinejoin="round"
    />
    {/* Decorative Woven Towel Stripe Near Bottom Edge */}
    <path
      d="M38 104 C58 110, 82 100, 104 106"
      stroke="#0d5c2e"
      strokeWidth="3"
      strokeLinecap="round"
      strokeOpacity="0.65"
    />
    {/* Cloth Fold Creases */}
    <path d="M48 28 C43 60, 52 88, 46 112" stroke="#040705" strokeWidth="2.2" strokeLinecap="round" />
    <path d="M82 27 C87 58, 77 86, 88 110" stroke="#040705" strokeWidth="2.2" strokeLinecap="round" />

    {/* Vibrant Hot-Pink & Crimson Blood Stains Soaking the Cloth */}
    <path
      d="M50 42 C68 35, 96 44, 100 66 C104 84, 85 100, 72 93 C58 86, 65 72, 52 68 C39 64, 38 48, 50 42 Z"
      fill="#ff007f"
    />
    <path
      d="M60 52 C74 47, 90 56, 88 72 C85 84, 69 82, 62 70 C56 60, 54 55, 60 52 Z"
      fill="#d90429"
    />
    {/* Secondary Blood Handprint / Smear */}
    <path
      d="M34 66 C42 62, 48 72, 44 82 C40 88, 32 84, 34 66 Z"
      fill="#ff007f"
    />

    {/* Dripping Blood Drops Below & Around the Cloth */}
    <circle cx="42" cy="92" r="5" fill="#ff007f" />
    <circle cx="96" cy="102" r="4.2" fill="#d90429" />
    <path d="M74 116 C74 116, 68 128, 74 133 C80 128, 74 116, 74 116 Z" fill="#ff007f" />
    <path d="M98 112 C98 112, 94 121, 98 125 C102 121, 98 112, 98 112 Z" fill="#d90429" />
    <circle cx="117" cy="80" r="3.5" fill="#ff007f" />
    <circle cx="20" cy="74" r="3" fill="#d90429" />
  </svg>
);

/**
 * 3. Father's 9-Inch Curved Hunting Knife Prop
 * Ink-black carved handle, metallic cream blade, neon guard, and hot-pink/crimson blood drips.
 */
export const HuntingKnifeProp: React.FC<{ className?: string }> = ({ className = 'w-24 h-24' }) => (
  <svg viewBox="0 0 140 140" fill="none" className={className}>
    <ellipse cx="70" cy="128" rx="30" ry="5" fill="#040705" fillOpacity="0.5" />
    <g transform="rotate(-28 70 70)">
      {/* Carved Ebony Handle */}
      <rect x="57" y="86" width="22" height="42" rx="6" fill="#040705" stroke="#f3efe4" strokeWidth="2.6" />
      {/* Handle Grip Grooves & Rivets */}
      <line x1="60" y1="98" x2="76" y2="98" stroke="#258e47" strokeWidth="1.5" strokeOpacity="0.6" />
      <line x1="60" y1="110" x2="76" y2="110" stroke="#258e47" strokeWidth="1.5" strokeOpacity="0.6" />
      <circle cx="68" cy="93" r="2.5" fill="#ff007f" />
      <circle cx="68" cy="104" r="2.5" fill="#00ff33" />
      <circle cx="68" cy="116" r="2.5" fill="#ff007f" />

      {/* Neon-Green Brass Crossguard */}
      <rect x="46" y="80" width="44" height="7" rx="3.5" fill="#00ff33" stroke="#040705" strokeWidth="2.4" />

      {/* Curved 9-Inch Hunting Blade */}
      <path
        d="M57 80 L57 24 C57 11, 73 5, 82 17 L79 80 Z"
        fill="#f3efe4"
        stroke="#040705"
        strokeWidth="2.8"
        strokeLinejoin="round"
      />
      {/* Blade Fuller / Blood Groove Line */}
      <line x1="63" y1="74" x2="63" y2="36" stroke="#040705" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.55" />

      {/* Hot-Pink & Crimson Blood Coating the Curved Blade Tip */}
      <path
        d="M57 45 L57 24 C57 11, 73 5, 82 17 L80 52 C73 44, 67 56, 57 45 Z"
        fill="#ff007f"
      />
      <path
        d="M63 29 C63 19, 73 13, 79 21 L77 41 C71 37, 66 39, 63 29 Z"
        fill="#d90429"
      />
    </g>

    {/* Blood Splatter Droplets Off the Tip */}
    <path d="M96 24 C96 24, 90 37, 96 42 C102 37, 96 24, 96 24 Z" fill="#ff007f" />
    <path d="M108 42 C108 42, 104 51, 108 55 C112 51, 108 42, 108 42 Z" fill="#d90429" />
    <circle cx="88" cy="52" r="3" fill="#ff007f" />
    <circle cx="114" cy="30" r="2.5" fill="#00ff33" />
  </svg>
);

/**
 * 4. Korede's Bleach Bottle Prop
 * Pop-art jug labeled "BLEACH" with bubbling neon-green & magenta chemical foam.
 */
export const BleachBottleProp: React.FC<{ className?: string }> = ({ className = 'w-24 h-24' }) => (
  <svg viewBox="0 0 140 140" fill="none" className={className}>
    {/* Spilled Neon-Green & Pink Bleach Puddle at Base */}
    <ellipse cx="68" cy="126" rx="42" ry="7" fill="#00ff33" fillOpacity="0.35" />
    <ellipse cx="82" cy="127" rx="22" ry="4.5" fill="#ff007f" fillOpacity="0.45" />

    {/* Chemical Foam Bubbles */}
    <circle cx="42" cy="28" r="6" fill="#00ff33" />
    <circle cx="54" cy="19" r="4.5" fill="#ff007f" />
    <circle cx="96" cy="32" r="5.5" fill="#00ff33" />
    <circle cx="84" cy="18" r="3" fill="#f3efe4" />

    {/* Bottle Cap */}
    <rect x="57" y="19" width="22" height="13" rx="3" fill="#ff007f" stroke="#040705" strokeWidth="2.6" />
    {/* Jug Body */}
    <path
      d="M54 32 L82 32 L95 52 L95 118 C95 123, 91 126, 85 126 L51 126 C45 126, 41 123, 41 118 L41 52 Z"
      fill="#f3efe4"
      stroke="#040705"
      strokeWidth="3"
      strokeLinejoin="round"
    />
    {/* Molded Handle */}
    <path d="M84 44 L99 44 C105 44, 107 66, 99 66 L88 66" fill="none" stroke="#f3efe4" strokeWidth="6.5" strokeLinecap="round" />
    <path d="M84 44 L99 44 C105 44, 107 66, 99 66 L88 66" fill="none" stroke="#040705" strokeWidth="2.6" strokeLinecap="round" />

    {/* Pop-Art Label Band */}
    <rect x="42" y="62" width="52" height="38" fill="#040705" />
    <rect x="42" y="66" width="52" height="4" fill="#00ff33" />
    <rect x="42" y="92" width="52" height="4" fill="#ff007f" />
    <text x="68" y="85" textAnchor="middle" fill="#f3efe4" fontSize="11.5" fontFamily="monospace" fontWeight="bold">
      BLEACH
    </text>
  </svg>
);

/**
 * 5. Korede's Scrubbing Rubber Gloves & Blood Drops Prop
 * Iconic crime-scene cleanup motif from the novel.
 */
export const RubberGlovesProp: React.FC<{ className?: string }> = ({ className = 'w-24 h-24' }) => (
  <svg viewBox="0 0 140 140" fill="none" className={className}>
    <ellipse cx="70" cy="126" rx="34" ry="5" fill="#040705" fillOpacity="0.45" />
    {/* Left Rubber Glove (Hot Pink) */}
    <g transform="rotate(-14 55 72)">
      <path
        d="M36 112 L38 68 L28 56 C25 52, 30 46, 35 50 L42 58 L42 36 C42 30, 49 30, 49 36 L49 54 L53 32 C53 26, 60 26, 60 32 L60 54 L64 36 C64 30, 71 30, 71 36 L71 58 L75 44 C76 39, 82 41, 81 47 L76 72 L78 112 Z"
        fill="#ff007f"
        stroke="#040705"
        strokeWidth="2.8"
        strokeLinejoin="round"
      />
      <rect x="34" y="102" width="46" height="10" rx="2" fill="#f3efe4" stroke="#040705" strokeWidth="2.4" />
    </g>
    {/* Neon Bleach & Crimson Blood Drops on Glove */}
    <circle cx="96" cy="48" r="5" fill="#00ff33" />
    <circle cx="106" cy="62" r="3.5" fill="#ff007f" />
    <path d="M92 78 C92 78, 87 89, 92 93 C97 89, 92 78, 92 78 Z" fill="#d90429" />
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
        <stop offset="0%" stopColor="#ff007f" />
        <stop offset="48%" stopColor="#d90429" />
        <stop offset="100%" stopColor="#140206" />
      </linearGradient>
    </defs>
    {/* Metallic Wire Temple Arms & Arched Nose Bridge */}
    <line x1="6" y1="44" x2="26" y2="44" stroke="#f3efe4" strokeWidth="3" strokeLinecap="round" />
    <path d="M94 42 Q110 31 126 42" stroke="#f3efe4" strokeWidth="3.2" fill="none" />
    <line x1="194" y1="44" x2="214" y2="44" stroke="#f3efe4" strokeWidth="3" strokeLinecap="round" />

    {/* Left Round Lens */}
    <circle cx="60" cy="45" r="34" fill="url(#crimsonLens)" stroke="#f3efe4" strokeWidth="3" />
    {/* Left Lens Silhouette Reflection (Raised Hand Brandishing Father's Knife) */}
    <path d="M50 76 L53 50 L64 44 L69 76 Z" fill="#040705" opacity="0.88" />
    <path d="M63 47 L75 27 L80 32 L66 51 Z" fill="#00ff33" opacity="0.92" />

    {/* Right Round Lens */}
    <circle cx="160" cy="45" r="34" fill="url(#crimsonLens)" stroke="#f3efe4" strokeWidth="3" />
    {/* Right Lens Silhouette Reflection */}
    <path d="M150 76 L153 50 L164 44 L169 76 Z" fill="#040705" opacity="0.88" />
    <path d="M163 47 L175 27 L180 32 L166 51 Z" fill="#00ff33" opacity="0.92" />

    {/* Crisp Specular Lens Glints */}
    <path d="M37 28 A 26 26 0 0 1 56 19" stroke="#f3efe4" strokeWidth="2.5" strokeLinecap="round" opacity="0.75" />
    <path d="M137 28 A 26 26 0 0 1 156 19" stroke="#f3efe4" strokeWidth="2.5" strokeLinecap="round" opacity="0.75" />
  </svg>
);

/**
 * 7. Botanical Lily Pads, Cream Reeds, Pink Water-Lily & Poison Dart Frogs Cutout Footer
 * Directly recreates the bottom composition of the "How to Kill Your Family" reference cover!
 */
export const BotanicalLagoonFooter: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 1440 250"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`pointer-events-none select-none w-full ${className}`}
    preserveAspectRatio="none"
  >
    {/* Deep Inky Lagoon Bank Silhouette */}
    <path
      d="M0 195 C 220 155, 460 225, 720 185 C 980 145, 1210 215, 1440 175 L 1440 250 L 0 250 Z"
      fill="#040705"
      fillOpacity="0.65"
    />

    {/* Sharp Cream & Hot-Pink Reeds Rising from the Lagoon Trench (Left, Center-Left, Right) */}
    <g opacity="0.9">
      {/* Left Reed Cluster */}
      <path d="M155 245 Q172 140 142 58 Q184 140 176 245 Z" fill="#f3efe4" />
      <path d="M182 245 Q204 128 228 48 Q214 145 200 245 Z" fill="#f3efe4" />
      <path d="M208 245 Q236 150 268 84 Q244 168 226 245 Z" fill="#ff007f" />
      <path d="M234 245 Q258 168 286 112 Q264 182 248 245 Z" fill="#f3efe4" />

      {/* Right Reed Cluster */}
      <path d="M1160 245 Q1142 135 1110 56 Q1156 140 1178 245 Z" fill="#f3efe4" />
      <path d="M1192 245 Q1214 142 1250 68 Q1226 154 1208 245 Z" fill="#ff007f" />
      <path d="M1222 245 Q1246 155 1288 94 Q1256 172 1238 245 Z" fill="#f3efe4" />
      <path d="M1252 245 Q1272 175 1308 122 Q1282 188 1266 245 Z" fill="#ff007f" />
    </g>

    {/* Left Layered Giant Lily Pads with Bright Emerald Radial Veins */}
    <g transform="translate(15, 118)">
      <ellipse cx="145" cy="68" rx="138" ry="48" fill="#0b5228" stroke="#289c50" strokeWidth="2.5" />
      <path d="M145 68 L272 52 L282 75 Z" fill="#041d0e" />
      <path
        d="M145 68 L42 46 M145 68 L82 25 M145 68 L162 22 M145 68 L220 35 M145 68 L78 98 M145 68 L180 105"
        stroke="#289c50"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </g>
    <g transform="translate(245, 152)">
      <ellipse cx="95" cy="44" rx="88" ry="32" fill="#084220" stroke="#289c50" strokeWidth="2" />
      <path d="M95 44 L175 34 L182 50 Z" fill="#041d0e" />
      <path d="M95 44 L35 30 M95 44 L75 16 M95 44 L135 20 M95 44 L65 68 M95 44 L130 68" stroke="#289c50" strokeWidth="1.8" />
    </g>

    {/* Right Layered Giant Lily Pads with Bright Emerald Radial Veins */}
    <g transform="translate(1075, 122)">
      <ellipse cx="160" cy="66" rx="150" ry="50" fill="#0b5228" stroke="#289c50" strokeWidth="2.5" />
      <path d="M160 66 L18 52 L12 76 Z" fill="#041d0e" />
      <path
        d="M160 66 L80 30 M160 66 L155 20 M160 66 L235 32 M160 66 L278 62 M160 66 L110 104 M160 66 L212 104"
        stroke="#289c50"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </g>
    <g transform="translate(885, 155)">
      <ellipse cx="105" cy="45" rx="98" ry="34" fill="#084220" stroke="#289c50" strokeWidth="2" />
      <path d="M105 45 L18 35 L12 52 Z" fill="#041d0e" />
      <path d="M105 45 L50 22 M105 45 L105 14 M105 45 L160 24 M105 45 L75 72 M105 45 L145 70" stroke="#289c50" strokeWidth="1.8" />
    </g>

    {/* Multi-Petaled Cream & Hot-Pink Water-Lily / Lotus Bloom (From Reference Cover 1) */}
    <g transform="translate(845, 98)">
      <path d="M65 92 C28 80, 8 48, 20 22 C40 36, 52 58, 65 92 Z" fill="#ff007f" stroke="#040705" strokeWidth="1.5" />
      <path d="M65 92 C102 80, 122 48, 110 22 C90 36, 78 58, 65 92 Z" fill="#ff007f" stroke="#040705" strokeWidth="1.5" />
      <path d="M65 92 C38 68, 30 30, 44 8 C55 30, 60 58, 65 92 Z" fill="#f3efe4" stroke="#ff007f" strokeWidth="1.6" />
      <path d="M65 92 C92 68, 100 30, 86 8 C75 30, 70 58, 65 92 Z" fill="#f3efe4" stroke="#ff007f" strokeWidth="1.6" />
      <path d="M65 92 C50 58, 54 18, 65 0 C76 18, 80 58, 65 92 Z" fill="#f3efe4" stroke="#040705" strokeWidth="1.6" />
    </g>

    {/* Left Poison-Dart Frog Motif (Hot-Pink, Cream Belly, Ink-Black Spots) */}
    <g transform="translate(78, 92)">
      <path d="M24 44 L8 60 L28 60" stroke="#ff007f" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round" />
      <ellipse cx="48" cy="36" rx="27" ry="16" transform="rotate(-14 48 36)" fill="#ff007f" stroke="#040705" strokeWidth="2" />
      <path d="M28 40 Q48 53 70 36 Q56 48 28 40 Z" fill="#f3efe4" />
      <circle cx="42" cy="28" r="5" fill="#040705" />
      <circle cx="56" cy="32" r="4" fill="#040705" />
      <circle cx="68" cy="24" r="4.5" fill="#040705" stroke="#f3efe4" strokeWidth="1.5" />
      <path d="M60 44 L72 58" stroke="#ff007f" strokeWidth="5" strokeLinecap="round" />
    </g>

    {/* Right Poison-Dart Frog Motif Leaping onto the Lily Pad */}
    <g transform="translate(1245, 96) scale(-1, 1)">
      <path d="M24 44 L8 60 L28 60" stroke="#ff007f" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round" />
      <ellipse cx="48" cy="36" rx="25" ry="15" transform="rotate(-12 48 36)" fill="#ff007f" stroke="#040705" strokeWidth="2" />
      <path d="M28 40 Q48 52 68 36 Q56 46 28 40 Z" fill="#f3efe4" />
      <circle cx="44" cy="28" r="4.8" fill="#040705" />
      <circle cx="57" cy="33" r="3.8" fill="#040705" />
      <circle cx="66" cy="24" r="4" fill="#040705" stroke="#f3efe4" strokeWidth="1.5" />
    </g>
  </svg>
);

/**
 * 8. Neon-Green / Hot-Pink Paint & Blood Splatter SVG Accent
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

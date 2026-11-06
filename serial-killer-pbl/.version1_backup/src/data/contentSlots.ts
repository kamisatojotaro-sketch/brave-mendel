// ============================================================================
// CONTENT SLOTS CONFIGURATION FILE
// Fill in the `<content>` and `<main character intros>` placeholders below
// to populate your PBL Website for "My Sister, The Serial Killer".
// ============================================================================

export type PageId = 'home' | 'guide' | 'characters' | 'author';

export interface NavCardSlot {
  id: Exclude<PageId, 'home'>;
  number: string;
  title: string;
  subtitle: string;
  dropdownDescription: string; // Can be customized
  tag: string;
}

export interface GuideStepSlot {
  stepNumber: string;
  title: string;
  captionLine: string; // Synced typewriter caption during the shadow scene
  content: string;     // <-- Fill in your `<content>` step-by-step breakdown here
  itemsTag: string;
}

export interface CharacterSlot {
  id: string;
  name: string;
  roleTitle: string;
  tagline: string;
  bio: string;         // <-- Fill in your `<main character intros>` here
  silhouetteType: 'korede' | 'ayoola' | 'tade' | 'femi' | 'mother';
  stats: {
    label: string;
    value: number; // 0 to 100
  }[];
  signatureItem: string;
  status: string;
}

export interface AuthorSectionSlot {
  authorName: string;
  novelTitle: string;
  setting: string;
  accolade: string;
  authorBioContent: string;   // <-- Fill in `<content>` for Oyinkan Braithwaite bio
  bookContextContent: string; // <-- Fill in `<content>` for Book Context & Themes
  pblNotesContent: string;    // <-- Fill in `<content>` for PBL Analysis / Takeaways
}

// ----------------------------------------------------------------------------
// 1. LANDING PAGE DROPDOWN NAVIGATION CARDS
// ----------------------------------------------------------------------------
export const NAV_DROPDOWN_SLOTS: NavCardSlot[] = [
  {
    id: 'guide',
    number: '01',
    title: 'Guide',
    subtitle: 'CRIME-SCENE PROTOCOL // CLEANUP',
    dropdownDescription: '<content> — Step-by-step interactive breakdown of Korede’s methodical cleanup protocol after Ayoola strikes.',
    tag: 'INTERACTIVE SCENE + 5 STEPS',
  },
  {
    id: 'characters',
    number: '02',
    title: 'Characters',
    subtitle: 'DOSSIER SELECT // LAGOS CAST',
    dropdownDescription: '<main character intros> — GTA-style character select carousel profiling Korede, Ayoola, Tade, Femi, and The Mother.',
    tag: '5 PLAYABLE PROFILES',
  },
  {
    id: 'author',
    number: '03',
    title: 'About Author',
    subtitle: 'OYINKAN BRAITHWAITE // CONTEXT',
    dropdownDescription: '<content> — Background on Oyinkan Braithwaite, the Lagos setting, and the Booker Prize-longlisted debut novel.',
    tag: 'AUTHOR & LITERARY DOSSIER',
  },
];

// ----------------------------------------------------------------------------
// 2. GUIDE PAGE: SHADOW SCENE CAPTIONS & STEP-BY-STEP `<content>` SLOTS
// ----------------------------------------------------------------------------
export const GUIDE_STEP_SLOTS: GuideStepSlot[] = [
  {
    stepNumber: '01',
    title: 'Gather Supplies',
    captionLine: 'Step 1: Gather supplies — bleach, disinfectant, rubber gloves, and heavy towels…',
    content: '<content>',
    itemsTag: 'BLEACH // GLOVES // DISINFECTANT // SPONGES',
  },
  {
    stepNumber: '02',
    title: 'Soak Up the Blood',
    captionLine: 'Step 2: Contain the spill immediately before the crimson stains set into the grout…',
    content: '<content>',
    itemsTag: 'ABSORPTION // CONTAINMENT // TIMING',
  },
  {
    stepNumber: '03',
    title: 'Wrap the Body ("Like a Mummy")',
    captionLine: 'Step 3: Wrap the body tightly in sheets and plastic — methodical, clinical, tight…',
    content: '<content>',
    itemsTag: 'SHEETS // CONCEALMENT // CLINICAL PRECISION',
  },
  {
    stepNumber: '04',
    title: 'Transport & Disposal',
    captionLine: 'Step 4: Move the package from the apartment to the trunk and toward the lagoon bridge…',
    content: '<content>',
    itemsTag: 'TRUNK // THIRD MAINLAND BRIDGE // LAGOON',
  },
  {
    stepNumber: '05',
    title: 'Final Bleach-Down of the Scene',
    captionLine: 'Step 5: Scrub every surface with pure bleach until only the sharp chemical scent remains.',
    content: '<content>',
    itemsTag: 'LEMON & BLEACH // ZERO TRACE // CASE CLOSED',
  },
];

// ----------------------------------------------------------------------------
// 3. CHARACTERS PAGE: GTA-STYLE CAROUSEL (`<main character intros>` SLOTS)
// ----------------------------------------------------------------------------
export const CHARACTER_SLOTS: CharacterSlot[] = [
  {
    id: 'korede',
    name: 'KOREDE',
    roleTitle: 'THE METHODICAL NURSE // THE CLEANER',
    tagline: '"Bleach masks the smell of blood better than anything else."',
    bio: '<main character intros>',
    silhouetteType: 'korede',
    signatureItem: 'Industrial Bleach & Surgical Gloves',
    status: 'HEAD NURSE // ACCOMPLICE',
    stats: [
      { label: 'CLEANUP PRECISION', value: 99 },
      { label: 'SISTERLY LOYALTY', value: 92 },
      { label: 'EMOTIONAL SUPPRESSION', value: 88 },
    ],
  },
  {
    id: 'ayoola',
    name: 'AYOOLA',
    roleTitle: 'THE BEAUTIFUL, CARELESS SERIAL KILLER',
    tagline: '"Korede, I killed him. Come and help me."',
    bio: '<main character intros>',
    silhouetteType: 'ayoola',
    signatureItem: 'Father’s Hunting Knife & Instagram Feed',
    status: '3 CONFIRMED VICTIMS // UNBOTHERED',
    stats: [
      { label: 'LETHAL CHARM', value: 100 },
      { label: 'REMORSE INDEX', value: 4 },
      { label: 'MANIPULATION', value: 96 },
    ],
  },
  {
    id: 'tade',
    name: 'TADE',
    roleTitle: 'THE CHARMING DOCTOR // NEXT TARGET?',
    tagline: '"Everything changes the moment he catches a glimpse of Ayoola."',
    bio: '<main character intros>',
    silhouetteType: 'tade',
    signatureItem: 'Stethoscope & Unwitting Infatuation',
    status: 'PHYSICIAN // IN THE CROSSHAIRS',
    stats: [
      { label: 'MEDICAL SKILL', value: 85 },
      { label: 'SURVIVAL INSTINCT', value: 22 },
      { label: 'BLIND INFATUATION', value: 95 },
    ],
  },
  {
    id: 'femi',
    name: 'FEMI',
    roleTitle: 'BOYFRIEND #3 // THE POET VICTIM',
    tagline: '"Three stabs. One call to Korede. Another body in the bathroom."',
    bio: '<main character intros>',
    silhouetteType: 'femi',
    signatureItem: 'Spoken-Word Notebook & Unanswered Texts',
    status: 'DECEASED // MISSING PERSON',
    stats: [
      { label: 'POETIC CHARM', value: 78 },
      { label: 'DANGER AWARENESS', value: 10 },
      { label: 'SURVIVAL RATE', value: 0 },
    ],
  },
  {
    id: 'mother',
    name: 'THE MOTHER',
    roleTitle: 'THE MATRIARCH // GUARDIAN OF APPEARANCES',
    tagline: '"Family reputation in Lagos comes before everything else."',
    bio: '<main character intros>',
    silhouetteType: 'mother',
    signatureItem: 'Gold Jewelry & Favoritism toward Ayoola',
    status: 'MATRIARCH // DENIAL SPECIALIST',
    stats: [
      { label: 'SOCIAL STATUS OBSESSION', value: 94 },
      { label: 'FAVORITISM (AYOOLA)', value: 98 },
      { label: 'PLAUISBLE DENIABILITY', value: 90 },
    ],
  },
];

// ----------------------------------------------------------------------------
// 4. ABOUT AUTHOR PAGE (`<content>` SLOTS)
// ----------------------------------------------------------------------------
export const AUTHOR_SLOT: AuthorSectionSlot = {
  authorName: 'OYINKAN BRAITHWAITE',
  novelTitle: 'My Sister, The Serial Killer',
  setting: 'Lagos, Nigeria',
  accolade: 'Booker Prize Longlist // Women’s Prize for Fiction Finalist',
  authorBioContent: '<content>',
  bookContextContent: '<content>',
  pblNotesContent: '<content>',
};

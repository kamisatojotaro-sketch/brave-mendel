import { ChapterSummary } from '../types';

export const chapterSummaries: ChapterSummary[] = [
  {
    chapterId: 'bio-12-genetics-principles',
    chapterName: 'Principles of Inheritance and Variation',
    subject: 'biology',
    eli5QuickGrasp: 'Genetics is the rulebook of how life passes traits to kids. Mendel discovered that traits behave like discrete marble tokens (alleles), not blending milkshakes. Sometimes genes ride together in the same car on the chromosome (linkage), and sometimes a single letter typo changes an entire blood cell into a sickle.',
    ncertTraps: [
      'TRAP 1: In incomplete dominance and codominance, the phenotypic ratio (1:2:1) is IDENTICAL to the genotypic ratio. Never write 3:1!',
      'TRAP 2: Drosophila fruit flies have only 4 pairs of chromosomes. Male fruit flies show ZERO crossing over during meiosis (Morgan experiment nuance).',
      'TRAP 3: Sickle cell anemia is an AUTOSOMAL recessive disorder, NOT sex-linked! Only Haemophilia and Color Blindness are X-linked recessive.',
      'TRAP 4: Henking discovered the X-body in 1891 in 50% of insect sperm, but did not realize it was a full chromosome until later.'
    ],
    mustKnowFormulas: [
      { name: 'Monohybrid Cross Ratios', formula: '\\text{Phenotypic: } 3:1, \\quad \\text{Genotypic: } 1:2:1', note: 'Standard complete dominance' },
      { name: 'Dihybrid Cross Phenotypic Ratio', formula: '9 : 3 : 3 : 1', note: 'Assumes independent assortment of unlinked genes' },
      { name: 'Recombination Frequency (Map Units)', formula: '\\text{Recombination \\%} = \\frac{\\text{Total Recombinant Progeny}}{\\text{Total Progeny}} \\times 100', note: '1% recombination = 1 map unit = 1 centiMorgan (cM)' }
    ],
    mnemonics: [
      { topic: 'Mendelian Exceptions', trick: 'In Co-Pleio', meaning: 'Incomplete dominance, Co-dominance, Pleiotropy deviate from 3:1 ratio' },
      { topic: 'Sickle Cell Point Mutation', trick: 'GAG goes to GUG (Val is Victor)', meaning: 'Glutamic acid (GAG) mutated to Valine (GUG) at 6th position of beta-globin' },
      { topic: 'Sex Determination in Birds', trick: 'Birds are Zebras in the Zoo (ZW = Female, ZZ = Male)', meaning: 'Females are heterogametic (ZW), males homogametic (ZZ)' }
    ]
  },
  {
    chapterId: 'phy-12-electrostatics',
    chapterName: 'Electrostatics (Fields & Capacitors)',
    subject: 'physics',
    eli5QuickGrasp: 'Charges are invisible magnets that push or pull each other through an electric field. Gauss\'s law is the ultimate shortcut: count how many field lines pierce a bubble to find the exact charge trapped inside. Capacitors are electronic sponges that hold electric charge and release it in explosive bursts.',
    ncertTraps: [
      'TRAP 1: Electric flux through a closed sphere does NOT change when the sphere expands, as long as enclosed charge remains the same!',
      'TRAP 2: When a dielectric slab is inserted with BATTERY CONNECTED: Voltage V remains constant, Charge Q increases K-fold, Energy U increases K-fold.',
      'TRAP 3: When a dielectric slab is inserted with BATTERY DISCONNECTED: Charge Q remains constant, Voltage V drops to V/K, Energy U drops to U/K.',
      'TRAP 4: Electric field inside the cavity of a conductor of ANY arbitrary shape is always strictly ZERO (Electrostatic Shielding).'
    ],
    mustKnowFormulas: [
      { name: 'Gauss\'s Law', formula: '\\oint \\vec{E} \\cdot d\\vec{A} = \\frac{q_{\\text{enclosed}}}{\\varepsilon_0}', note: 'Independent of shape and size of surface' },
      { name: 'Parallel Plate Capacitance', formula: 'C = \\frac{K \\varepsilon_0 A}{d}', note: 'Increases with dielectric K and plate area A, decreases with spacing d' },
      { name: 'Energy Density of Electric Field', formula: 'u_E = \\frac{1}{2} \\varepsilon_0 E^2', note: 'Energy stored per unit volume in Joules/m^3' },
      { name: 'Electric Field of Infinite Sheet', formula: 'E = \\frac{\\sigma}{2 \\varepsilon_0}', note: 'Remarkably independent of distance r from the sheet!' }
    ],
    mnemonics: [
      { topic: 'Capacitor Dielectric Effects (Battery Connected)', trick: 'CV (Constant Voltage, Charge Vaporizes upwards)', meaning: 'V is constant, C and Q and U all multiply by K' },
      { topic: 'Capacitor Dielectric Effects (Battery Disconnected)', trick: 'QC (Quiet Charge, Voltage Crumbles)', meaning: 'Q is constant, V and U divide by K' }
    ]
  },
  {
    chapterId: 'chem-12-haloalkanes',
    chapterName: 'Haloalkanes and Haloarenes',
    subject: 'chemistry',
    eli5QuickGrasp: 'Alkyl halides are molecules with a halogen hostage (Cl, Br, I) waiting to be swapped out. SN1 is a two-step divorce: the halogen leaves first, creating a carbocation, and the new partner attacks from either side (racemization). SN2 is a single-step ninja ambush: the new partner kicks the halogen out from behind like an umbrella turning inside out in a storm!',
    ncertTraps: [
      'TRAP 1: SN2 causes complete Walden Inversion, while SN1 leads to partial or full Racemisation due to planar carbocation intermediate.',
      'TRAP 2: Tertiary alkyl halides NEVER undergo SN2 due to severe steric crowding, while primary alkyl halides rarely do SN1.',
      'TRAP 3: Polar Aprotic solvents (Acetone, DMSO, DMF) accelerate SN2 reactions because they do not hydrogen-bond with the nucleophile, leaving it bare and aggressive.',
      'TRAP 4: Vinyl and Aryl halides (like Chlorobenzene) are extremely unreactive towards nucleophilic substitution due to resonance partial double bond character!'
    ],
    mustKnowFormulas: [
      { name: 'SN2 Rate Law', formula: '\\text{Rate} = k [\\text{Substrate}][\\text{Nucleophile}]', note: 'Second order kinetics, single-step bimolecular' },
      { name: 'SN1 Rate Law', formula: '\\text{Rate} = k [\\text{Substrate}]', note: 'First order kinetics, rate-determining step is carbocation formation' }
    ],
    mnemonics: [
      { topic: 'SN2 Reactivity Order', trick: 'Me > 1 > 2 > 3 (Smallest is Speediest)', meaning: 'Methyl halides react fastest in SN2 due to minimum steric hindrance' },
      { topic: 'SN1 Reactivity Order', trick: '3 > 2 > 1 > Me (Tertiary is Top dog)', meaning: 'Tertiary halides react fastest in SN1 due to hyperconjugation carbocation stability' }
    ]
  }
];

import { Question } from '../types';

export const questionsData: Question[] = [
  // ===================== BIOLOGY QUESTIONS =====================
  {
    id: 'q-bio-1',
    chapterId: 'bio-11-cell-unit',
    topicId: 'cell-membrane',
    subject: 'biology',
    difficulty: 1,
    type: 'single-choice',
    question: 'According to the widely accepted Fluid Mosaic Model proposed by Singer and Nicolson (1972), the cell membrane consists primarily of:',
    options: [
      'A continuous solid layer of proteins with interspersed lipid droplets',
      'A quasi-fluid phospholipid bilayer with embedded and peripheral proteins',
      'An outer carbohydrate shell with inner nucleic acids',
      'Rigid cellulose fibers cross-linked with pectin'
    ],
    correctIndex: 1,
    explanation: 'The fluid mosaic model describes the cell membrane as a quasi-fluid lipid bilayer where lipids provide fluidity and proteins form a mosaic pattern capable of lateral movement.',
    eli5Explanation: 'Think of the cell membrane like an ocean of salad oil (phospholipids). Icebergs (proteins) float around in this oil sea, bumping into each other and drifting sideways.',
    ncertPageRef: 'Class 11 NCERT Biology, Chapter 8, Page 131',
    trapWarning: 'Students sometimes pick "continuous solid protein layer", confusing it with older Davson-Danielli sandwich model.'
  },
  {
    id: 'q-bio-2',
    chapterId: 'bio-11-cell-unit',
    topicId: 'cell-membrane',
    subject: 'biology',
    difficulty: 3,
    type: 'single-choice',
    question: 'Why do polar molecules require carrier proteins to cross the lipid bilayer, and what is the nature of their movement during facilitated diffusion?',
    options: [
      'Polar molecules are insoluble in water; movement requires ATP hydrolysis',
      'Polar molecules cannot pass through the non-polar hydrophobic lipid tails; movement occurs along the concentration gradient without energy expenditure',
      'Polar molecules are repelled by outer polar heads; movement is against concentration gradient',
      'Polar molecules get chemically modified during transit using GTP'
    ],
    correctIndex: 1,
    explanation: 'The interior of the bilayer is made of non-polar fatty acid tails (hydrophobic). Polar molecules cannot easily dissolve through this oily interior. Carrier or channel proteins provide a hydrophilic corridor down the concentration gradient (facilitated diffusion, no ATP required).',
    eli5Explanation: 'Water-loving (polar) molecules trying to cross oily lipid tails is like trying to mix oil and water—they bounce right off! Facilitated diffusion is like installing a water slide (protein channel) that lets them slide straight in downhill with zero effort.',
    ncertPageRef: 'Class 11 NCERT Biology, Chapter 8, Page 132',
    trapWarning: 'Do not confuse Facilitated Diffusion (passive, down gradient, no ATP) with Active Transport (uses ATP, against gradient).'
  },
  {
    id: 'q-bio-3',
    chapterId: 'bio-11-cell-unit',
    topicId: 'cell-membrane',
    subject: 'biology',
    difficulty: 4,
    type: 'assertion-reason',
    question: 'Assertion (A) and Reason (R):',
    assertion: 'The fluid nature of the plasma membrane is crucial for functions such as cell growth, secretion, and endocytosis.',
    reason: 'The quasi-fluid nature of lipids enables the lateral movement of proteins within the overall bilayer.',
    options: [
      'Both (A) and (R) are true and (R) is the correct explanation of (A)',
      'Both (A) and (R) are true but (R) is NOT the correct explanation of (A)',
      '(A) is true but (R) is false',
      '(A) is false but (R) is true'
    ],
    correctIndex: 0,
    explanation: 'Both Assertion and Reason are true. The fluidity of the lipid bilayer allows dynamic processes like vesicle fusion (secretion/endocytosis), cell division, and membrane synthesis, precisely because proteins and lipids can move laterally.',
    eli5Explanation: 'If your skin was made of concrete, you could never bend your fingers or grow bigger. Because the membrane is fluid like warm wax, it can stretch, pinch in half to divide, and swallow food packets (endocytosis).',
    ncertPageRef: 'Class 11 NCERT Biology, Chapter 8, Page 132',
    trapWarning: 'In Assertion-Reason, check if Reason answers "WHY". Fluidity enables dynamic structural changes like furrow formation in cytokinesis.'
  },
  {
    id: 'q-bio-4',
    chapterId: 'bio-12-genetics-principles',
    topicId: 'mendelian-laws',
    subject: 'biology',
    difficulty: 2,
    type: 'single-choice',
    question: 'A cross between a true-breeding red-flowered snapdragon (RR) and true-breeding white-flowered snapdragon (rr) yields all pink flowers (Rr) in F1. When F1 is self-pollinated, what is the phenotypic ratio in F2?',
    options: [
      '3 Red : 1 White',
      '9 Red : 3 Pink : 3 White : 1 Yellow',
      '1 Red : 2 Pink : 1 White',
      'All Pink'
    ],
    correctIndex: 2,
    explanation: 'In incomplete dominance (Antirrhinum/snapdragon), the heterozygous genotype (Rr) produces an intermediate pink phenotype. The phenotypic ratio matches the genotypic ratio: 1 RR (red) : 2 Rr (pink) : 1 rr (white).',
    eli5Explanation: 'Instead of Red completely bullying White into silence, they blend like red and white paint making pink! When the pink kids have babies, the original pure red and white paint drops separate out again: 1 red, 2 pink, 1 white.',
    ncertPageRef: 'Class 12 NCERT Biology, Chapter 5, Page 76',
    trapWarning: 'Do not automatically select 3:1! For incomplete dominance and co-dominance, genotypic and phenotypic ratios are identical: 1:2:1.'
  },
  {
    id: 'q-bio-5',
    chapterId: 'bio-12-genetics-principles',
    topicId: 'genetic-disorders',
    subject: 'biology',
    difficulty: 5,
    type: 'single-choice',
    question: 'In Sickle-Cell Anemia, a single base substitution in the beta-globin gene causes the 6th amino acid to change from Glutamic acid (Glu) to Valine (Val). Which specific mRNA codon mutation is responsible, and what is its physiological consequence under low oxygen tension?',
    options: [
      'GAG changes to GUG; leads to polymerization of mutant hemoglobin distorting RBC into a sickle shape',
      'GUG changes to GAG; leads to excess breakdown of heme ring',
      'UAA changes to UGA; premature chain termination without folding',
      'AUG changes to AAG; failure to initiate transcription in bone marrow'
    ],
    correctIndex: 0,
    explanation: 'At the 6th position of the beta-globin chain, the DNA code changes from CTC to CAC, which transcribes into mRNA codon GAG mutating into GUG. Valine is non-polar/hydrophobic, whereas Glutamic acid is polar. Under low pO2, HbS polymerizes into long fibrous crystals, warping round RBCs into rigid sickles.',
    eli5Explanation: 'Imagine replacing a smooth magnetic ball (Glutamic acid) with a sticky piece of Velcro (Valine). When oxygen is low, all the Velcro balls stick together into stiff needles, puncturing the red blood cell from the inside and twisting it into a crescent moon (sickle) that clogs tiny blood capillaries!',
    ncertPageRef: 'Class 12 NCERT Biology, Chapter 5, Page 89',
    trapWarning: 'Watch out for direction of mutation: GAG (normal Glu) -> GUG (mutant Val). NEET loves to reverse the arrow in false options!'
  },

  // ===================== PHYSICS QUESTIONS =====================
  {
    id: 'q-phy-1',
    chapterId: 'phy-12-electrostatics',
    topicId: 'gauss-law-fields',
    subject: 'physics',
    difficulty: 1,
    type: 'single-choice',
    question: 'An electric charge Q is placed at the exact center of a closed spherical Gaussian surface. If the radius of the sphere is doubled, what happens to the total electric flux passing through the surface?',
    options: [
      'It is quadrupled (4x)',
      'It is halved (1/2x)',
      'It remains unchanged',
      'It becomes zero'
    ],
    correctIndex: 2,
    explanation: 'According to Gauss\'s Law, total electric flux Phi = Q_enclosed / epsilon_0. The flux depends solely on the net enclosed charge, not on the radius, geometry, or size of the Gaussian surface.',
    eli5Explanation: 'Imagine a bright light bulb inside a small glass bubble vs a giant glass bubble. All the rays of light shooting out from the bulb must pass through the glass in both cases—making the sphere bigger does not swallow or create light rays!',
    ncertPageRef: 'Class 12 NCERT Physics Part 1, Chapter 1, Page 33',
    trapWarning: 'Electric field drops as 1/r^2, but surface area grows as r^2. Their product (flux = E * A) stays perfectly constant!'
  },
  {
    id: 'q-phy-2',
    chapterId: 'phy-12-electrostatics',
    topicId: 'capacitors-dielectric',
    subject: 'physics',
    difficulty: 3,
    type: 'single-choice',
    question: 'A parallel plate capacitor with air between plates has capacitance C0. It is connected to a battery of potential V0. While keeping the battery connected, a dielectric slab of constant K = 5 is inserted between the plates. What are the new charge Q and stored energy U?',
    options: [
      'Q = 5 Q0, U = 5 U0',
      'Q = Q0, U = U0 / 5',
      'Q = 5 Q0, U = U0 / 5',
      'Q = Q0 / 5, U = 5 U0'
    ],
    correctIndex: 0,
    explanation: 'Since the battery remains CONNECTED, potential V remains constant at V0. The new capacitance is C = K * C0 = 5 C0. Charge Q = C * V = 5 C0 * V0 = 5 Q0. Stored energy U = 1/2 C V^2 = 1/2 (5 C0) V0^2 = 5 U0.',
    eli5Explanation: 'Keeping the battery connected means the electric pressure (voltage) stays locked. Adding a dielectric is like expanding the water tank\'s floor area 5x. The battery immediately pumps in 5x more water (charge) and the stored energy jumps 5x!',
    ncertPageRef: 'Class 12 NCERT Physics Part 1, Chapter 2, Page 78',
    trapWarning: 'CRITICAL NEET TRAP: Check whether the battery was "DISCONNECTED" or "KEPT CONNECTED". If disconnected, Q stays constant and U decreases (U/K). If connected, V stays constant and U increases (K*U).'
  },
  {
    id: 'q-phy-3',
    chapterId: 'phy-12-modern-physics',
    topicId: 'photoelectric-effect',
    subject: 'physics',
    difficulty: 4,
    type: 'assertion-reason',
    question: 'Assertion (A) and Reason (R):',
    assertion: 'The stopping potential in a photoelectric experiment depends on the frequency of incident radiation, but is completely independent of the intensity of radiation.',
    reason: 'The maximum kinetic energy of emitted photoelectrons is determined by photon energy (h*nu) and work function (Phi_0), whereas intensity only increases the number of incident photons per second.',
    options: [
      'Both (A) and (R) are true and (R) is the correct explanation of (A)',
      'Both (A) and (R) are true but (R) is NOT the correct explanation of (A)',
      '(A) is true but (R) is false',
      '(A) is false but (R) is true'
    ],
    correctIndex: 0,
    explanation: 'Einstein\'s photoelectric equation: e*V_s = K_max = h*nu - Phi_0. Stopping potential V_s depends strictly on frequency nu. Increasing intensity means more photons, thus more electrons (higher saturation current), but the kinetic energy of each individual electron remains identical.',
    eli5Explanation: 'Think of photons as tennis balls. A faster ball (higher frequency) hits an electron harder and makes it fly out faster. Throwing 1,000 slow tennis balls (high intensity) won\'t make any single electron fly faster—it just knocks out more slow ones!',
    ncertPageRef: 'Class 12 NCERT Physics Part 2, Chapter 11, Page 391',
    trapWarning: 'Classic mistake: thinking brighter light (higher intensity) gives electrons more speed. Intensity = quantity of photons; Frequency = punch of each photon.'
  },
  {
    id: 'q-phy-4',
    chapterId: 'phy-12-ray-optics',
    topicId: 'refraction-tir',
    subject: 'physics',
    difficulty: 2,
    type: 'single-choice',
    question: 'What is the critical angle for a glass-air interface if the refractive index of glass is mu = 1.5?',
    options: [
      'sin^(-1)(2/3)',
      'sin^(-1)(3/2)',
      'cos^(-1)(2/3)',
      'tan^(-1)(1.5)'
    ],
    correctIndex: 0,
    explanation: 'Critical angle theta_c is given by sin(theta_c) = 1 / mu = 1 / 1.5 = 2/3. Therefore, theta_c = sin^(-1)(2/3) ≈ 41.8 degrees.',
    eli5Explanation: 'When light tries to leave thick glass into thin air, it bends away from the normal. At the critical angle, it bends so hard it skims flat along the surface like a skipping stone. Any steeper, and it bounces completely backwards inside (Total Internal Reflection)!',
    ncertPageRef: 'Class 12 NCERT Physics Part 2, Chapter 9, Page 320',
    trapWarning: 'Remember that light must travel from DENSER medium to RARER medium for TIR to occur.'
  },
  {
    id: 'q-phy-5',
    chapterId: 'phy-11-rotational-motion',
    topicId: 'moment-of-inertia',
    subject: 'physics',
    difficulty: 5,
    type: 'single-choice',
    question: 'A solid sphere, a solid cylinder, and a thin circular ring of the same mass M and radius R roll down an inclined plane without slipping from rest. In what order will they reach the bottom?',
    options: [
      'Sphere first, then Cylinder, then Ring',
      'Ring first, then Cylinder, then Sphere',
      'All three reach simultaneously because mass and radius cancel out',
      'Cylinder first, then Sphere, then Ring'
    ],
    correctIndex: 0,
    explanation: 'Linear acceleration in pure rolling is a = (g * sin theta) / (1 + I / (M*R^2)). For solid sphere: I/(MR^2) = 2/5 = 0.4. For solid cylinder: I/(MR^2) = 1/2 = 0.5. For ring: I/(MR^2) = 1.0. Lower I/(MR^2) yields higher linear acceleration. Thus: a_sphere > a_cylinder > a_ring.',
    eli5Explanation: 'Objects with mass crowded at the outer rim (like the ring) waste a lot of gravity energy just spinning in circles. The solid sphere keeps its mass packed close to the center, so it spins effortlessly and sprints down the hill fastest!',
    ncertPageRef: 'Class 11 NCERT Physics Part 1, Chapter 7, Page 179',
    trapWarning: 'Do not confuse rolling with sliding! In frictionless sliding, all shapes tie. In rolling, moment of inertia dictates who wins.'
  },

  // ===================== CHEMISTRY QUESTIONS =====================
  {
    id: 'q-chem-1',
    chapterId: 'chem-12-electrochem',
    topicId: 'nernst-gibbs',
    subject: 'chemistry',
    difficulty: 3,
    type: 'single-choice',
    question: 'For a galvanic cell reaction: Zn(s) + Cu^2+(aq) -> Zn^2+(aq) + Cu(s), if the concentration of Zn^2+ is increased 100-fold at 298 K, what is the change in cell potential (E_cell)?',
    options: [
      'Decreases by 0.0591 V',
      'Increases by 0.0591 V',
      'Decreases by 0.118 V',
      'Remains unchanged'
    ],
    correctIndex: 0,
    explanation: 'Nernst equation: E_cell = E0_cell - (0.0591 / 2) * log10([Zn^2+] / [Cu^2+]). Increasing [Zn^2+] by 100 adds log10(100) = 2 to the log term. Change = - (0.0591 / 2) * 2 = -0.0591 V. Cell potential decreases by 0.0591 V.',
    eli5Explanation: 'Think of Zn^2+ as the exhaust smoke coming out of a battery engine. If you pump 100x more exhaust into the tailpipe, the engine chokes and its voltage drops by ~0.059 Volts.',
    ncertPageRef: 'Class 12 NCERT Chemistry Part 1, Chapter 3, Page 71',
    trapWarning: 'Remember n = 2 for Zn -> Zn2+ + 2e-. The factor 2 in the denominator cancels with log(100) = 2.'
  },
  {
    id: 'q-chem-2',
    chapterId: 'chem-12-haloalkanes',
    topicId: 'sn1-sn2-mechanism',
    subject: 'chemistry',
    difficulty: 2,
    type: 'single-choice',
    question: 'Which of the following alkyl halides undergoes nucleophilic substitution via SN2 mechanism at the fastest rate?',
    options: [
      'CH3-Cl',
      '(CH3)2CH-Cl',
      '(CH3)3C-Cl',
      'CH3-CH2-Cl'
    ],
    correctIndex: 0,
    explanation: 'SN2 proceeds via single-step backside attack without carbocation formation. Steric hindrance is the dominating factor: Methyl > 1 degree > 2 degree > 3 degree. CH3Cl has the least steric crowding and reacts fastest.',
    eli5Explanation: 'SN2 is like sneaking into an unlocked open room through the back door. Methyl chloride (CH3-Cl) is an empty hallway with tiny hydrogen atoms. Tertiary chloride is jammed with bulky bodybuilders blocking the doorway!',
    ncertPageRef: 'Class 12 NCERT Chemistry Part 2, Chapter 10, Page 301',
    trapWarning: 'SN1 favors 3° (stable carbocation). SN2 favors 1° and Methyl (least steric hindrance).'
  },
  {
    id: 'q-chem-3',
    chapterId: 'chem-12-coordination',
    topicId: 'vbt-cft',
    subject: 'chemistry',
    difficulty: 4,
    type: 'single-choice',
    question: 'According to Crystal Field Theory, in an octahedral complex [CoF6]^3- vs [Co(NH3)6]^3-, what are the respective hybridization, pairing state, and magnetic behavior?',
    options: [
      '[CoF6]^3- is outer orbital (sp3d2, paramagnetic, weak field ligand F-); [Co(NH3)6]^3- is inner orbital (d2sp3, diamagnetic, strong field ligand NH3)',
      '[CoF6]^3- is inner orbital (d2sp3, diamagnetic); [Co(NH3)6]^3- is outer orbital (sp3d2, paramagnetic)',
      'Both are outer orbital and paramagnetic',
      'Both are inner orbital and diamagnetic'
    ],
    correctIndex: 0,
    explanation: 'Co^3+ has 3d^6 configuration. Fluoride (F-) is a weak field ligand (Delta_o < P), causing no electron pairing; electrons occupy t2g^4 eg^2 (4 unpaired electrons, paramagnetic, uses outer 4d orbitals -> sp3d2). Ammonia (NH3) is a strong field ligand with Co^3+ (Delta_o > P), forcing pairing into t2g^6 eg^0 (0 unpaired electrons, diamagnetic, inner d2sp3).',
    eli5Explanation: 'Ammonia (NH3) is a strict drill sergeant (strong ligand) that forces 6 electrons into 3 double-bunks (pairing), leaving outer bunks empty (diamagnetic). Fluoride (F-) is a lazy coach (weak ligand); electrons spread out into single bunks, staying unpaired (paramagnetic)!',
    ncertPageRef: 'Class 12 NCERT Chemistry Part 1, Chapter 9, Page 253',
    trapWarning: 'NH3 acts as a strong field ligand with Co(III), even though it sits near the middle of the spectrochemical series!'
  },
  {
    id: 'q-chem-4',
    chapterId: 'chem-12-aldehydes-ketones',
    topicId: 'named-reactions',
    subject: 'chemistry',
    difficulty: 4,
    type: 'assertion-reason',
    question: 'Assertion (A) and Reason (R):',
    assertion: 'Formaldehyde (HCHO) and Benzaldehyde (C6H5CHO) undergo Cannizzaro reaction when treated with concentrated 50% NaOH, whereas Acetaldehyde (CH3CHO) undergoes Aldol condensation.',
    reason: 'Cannizzaro reaction requires aldehydes that lack any alpha-hydrogen atoms, undergoing self-redox (disproportionation).',
    options: [
      'Both (A) and (R) are true and (R) is the correct explanation of (A)',
      'Both (A) and (R) are true but (R) is NOT the correct explanation of (A)',
      '(A) is true but (R) is false',
      '(A) is false but (R) is true'
    ],
    correctIndex: 0,
    explanation: 'Both Assertion and Reason are true. The presence of an alpha-hydrogen permits enolate ion formation, leading to Aldol condensation. Aldehydes lacking alpha-hydrogens (HCHO, C6H5CHO, (CH3)3C-CHO) cannot form enolates; under conc. alkali, one molecule is reduced to alcohol while the other is oxidized to carboxylate salt (Cannizzaro).',
    eli5Explanation: 'Alpha-hydrogens are like loose handles. If a molecule has a handle (Acetaldehyde), base grabs it to link two molecules together (Aldol). If it has NO handles (Formaldehyde), the base forces them into a split-personality trade: one gets reduced to alcohol, the other gets oxidized to acid!',
    ncertPageRef: 'Class 12 NCERT Chemistry Part 2, Chapter 12, Page 370',
    trapWarning: 'Test your memory: Chloral (CCl3-CHO) has no alpha-H, but gives haloform with base instead of Cannizzaro!'
  },
  {
    id: 'q-chem-5',
    chapterId: 'chem-11-atomic-structure',
    topicId: 'quantum-numbers',
    subject: 'chemistry',
    difficulty: 5,
    type: 'single-choice',
    question: 'For an orbital characterized by principal quantum number n = 4 and azimuthal quantum number l = 2, calculate the total number of radial nodes and angular nodes respectively:',
    options: [
      'Radial nodes = 1, Angular nodes = 2',
      'Radial nodes = 2, Angular nodes = 1',
      'Radial nodes = 0, Angular nodes = 3',
      'Radial nodes = 3, Angular nodes = 2'
    ],
    correctIndex: 0,
    explanation: 'For any atomic orbital: Angular nodes = l. Here l = 2 (d-orbital), so angular nodes = 2. Radial nodes = n - l - 1 = 4 - 2 - 1 = 1. Total nodes = n - 1 = 4 - 1 = 3.',
    eli5Explanation: 'Think of an atomic orbital like an onion with layers. Radial nodes are hollow spherical shells inside where finding an electron is zero (like empty layers between onion rings). Angular nodes are flat slicing planes dividing the lobes like knife cuts. Formula: Radial = n - l - 1; Angular = l.',
    ncertPageRef: 'Class 11 NCERT Chemistry Part 1, Chapter 2, Page 59',
    trapWarning: 'Do not confuse total nodes (n - 1) with radial nodes (n - l - 1). NEET often tests this exact formula in paper 1.'
  }
];

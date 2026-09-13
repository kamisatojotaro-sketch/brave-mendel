import { Derivation, BoardAnswerTemplate } from '../types';

export const derivationsData: Derivation[] = [
  // 1. LENS MAKER'S FORMULA
  {
    id: 'deriv-lens-maker',
    subject: 'physics',
    title: 'Derivation of Lens Maker\'s Formula',
    chapter: 'Ray Optics and Optical Instruments',
    marksTypical: 5,
    cbseFrequency: 'Very High',
    aim: 'Derive the relation 1/f = (mu - 1) * (1/R1 - 1/R2) for a thin convex lens bounded by spherical surfaces of radii R1 and R2.',
    eli5Summary: 'A lens is just two curved glass surfaces back-to-back. Light bends once entering the glass front door, and bends again exiting the back door. Combining both surface bends into one equation gives the magic recipe that opticians use to craft prescription glasses!',
    finalFormula: '\\frac{1}{f} = (\\mu - 1)\\left( \\frac{1}{R_1} - \\frac{1}{R_2} \\right)',
    steps: [
      {
        stepNumber: 1,
        instruction: 'State the refraction formula at a single spherical surface for the first refracting surface ABC with radius of curvature R1.',
        math: '\\frac{\\mu_2}{v_1} - \\frac{\\mu_1}{u} = \\frac{\\mu_2 - \\mu_1}{R_1}',
        cbseMarkAllocation: '1 Mark (Statement + Ray Diagram with proper arrow marks)',
        proTip: 'Always draw ray arrows! CBSE deduction rule: 1/2 mark cut if arrows on incident/refracted rays are missing.'
      },
      {
        stepNumber: 2,
        instruction: 'For the second surface ADC with radius R2, the first image I1 serves as a virtual object in medium mu2, forming the final real image I at distance v in medium mu1.',
        math: '\\frac{\\mu_1}{v} - \\frac{\\mu_2}{v_1} = \\frac{\\mu_1 - \\mu_2}{R_2} = -\\frac{\\mu_2 - \\mu_1}{R_2}',
        cbseMarkAllocation: '1.5 Marks (Careful identification of virtual object and medium inversion)',
        proTip: 'Notice the medium swapped from mu2 to mu1. Keep the negative sign clearly factored out.'
      },
      {
        stepNumber: 3,
        instruction: 'Add Equation (1) and Equation (2) to eliminate the intermediate image distance v1.',
        math: '\\left( \\frac{\\mu_2}{v_1} - \\frac{\\mu_1}{u} \\right) + \\left( \\frac{\\mu_1}{v} - \\frac{\\mu_2}{v_1} \\right) = (\\mu_2 - \\mu_1)\\left( \\frac{1}{R_1} - \\frac{1}{R_2} \\right)',
        cbseMarkAllocation: '1 Mark (Algebraic cancellation of mu2/v1 terms)',
        proTip: 'Highlight the cancellation of mu2/v1 explicitly in your exam sheet.'
      },
      {
        stepNumber: 4,
        instruction: 'Factor out mu1 from the left-hand side.',
        math: '\\mu_1 \\left( \\frac{1}{v} - \\frac{1}{u} \\right) = (\\mu_2 - \\mu_1)\\left( \\frac{1}{R_1} - \\frac{1}{R_2} \\right) \\implies \\frac{1}{v} - \\frac{1}{u} = \\left( \\frac{\\mu_2}{\\mu_1} - 1 \\right)\\left( \\frac{1}{R_1} - \\frac{1}{R_2} \\right)',
        cbseMarkAllocation: '0.5 Mark',
        proTip: 'Let mu = mu2 / mu1 (relative refractive index of lens with respect to surrounding medium).'
      },
      {
        stepNumber: 5,
        instruction: 'Apply the definition of focal length: when the object is at infinity (u = -infinity), the image forms at principal focus (v = f).',
        math: '\\frac{1}{f} - \\frac{1}{-\\infty} = (\\mu - 1)\\left( \\frac{1}{R_1} - \\frac{1}{R_2} \\right) \\implies \\frac{1}{f} = (\\mu - 1)\\left( \\frac{1}{R_1} - \\frac{1}{R_2} \\right)',
        cbseMarkAllocation: '1 Mark (Final formula box + condition u = infty)',
        proTip: 'Enclose the final result in a box! Examiners check for this immediately.'
      }
    ]
  },

  // 2. DRIFT VELOCITY & OHM'S LAW DEDUCTION
  {
    id: 'deriv-drift-velocity',
    subject: 'physics',
    title: 'Drift Velocity & Deduction of Ohm\'s Law',
    chapter: 'Current Electricity',
    marksTypical: 3,
    cbseFrequency: 'Very High',
    aim: 'Derive expression for drift velocity vd = -e E tau / m and deduce Ohm\'s law (V = I R) from microscopic electronic parameters.',
    eli5Summary: 'Electrons in a wire are like bumper cars bouncing violently in random directions at millions of miles an hour. When you flip on a battery voltage, an electric field gives them a tiny, sluggish push in one direction (the drift speed is slower than an ant crawling!). Adding up all those sluggish ants gives electric current!',
    finalFormula: 'I = n e A v_d \\implies R = \\frac{m L}{n e^2 \\tau A}',
    steps: [
      {
        stepNumber: 1,
        instruction: 'State the acceleration experienced by a free conduction electron of mass m and charge -e in an applied electric field E.',
        math: '\\vec{a} = -\\frac{e \\vec{E}}{m}',
        cbseMarkAllocation: '0.5 Mark',
        proTip: 'Mention negative sign shows acceleration is opposite to electric field direction.'
      },
      {
        stepNumber: 2,
        instruction: 'Define relaxation time tau as the average time between two successive collisions, deriving average drift velocity.',
        math: '\\vec{v}_d = \\vec{u}_{\\text{avg}} + \\vec{a} \\tau = 0 + \\left( -\\frac{e \\vec{E}}{m} \\right) \\tau \\implies v_d = \\frac{e E \\tau}{m}',
        cbseMarkAllocation: '1 Mark (Thermal velocity u_avg = 0 condition)',
        proTip: 'Emphasize that average thermal velocity in absence of E is strictly zero.'
      },
      {
        stepNumber: 3,
        instruction: 'Relate current I to drift velocity vd in a conductor of length L, cross-sectional area A, and electron density n.',
        math: 'q = (n \\cdot A \\cdot L) e \\implies I = \\frac{q}{t} = \\frac{n A L e}{L / v_d} = n e A v_d',
        cbseMarkAllocation: '0.5 Mark',
        proTip: 'L / vd represents the transit time for charge to cross conductor length.'
      },
      {
        stepNumber: 4,
        instruction: 'Substitute electric field E = V / L into the current expression to deduce Ohm\'s Law.',
        math: 'I = n e A \\left( \\frac{e \\left(\\frac{V}{L}\\right) \\tau}{m} \\right) = \\left( \\frac{n e^2 \\tau A}{m L} \\right) V \\implies V = \\left( \\frac{m L}{n e^2 \\tau A} \\right) I = I R',
        cbseMarkAllocation: '1 Mark (Explicitly identifying R = mL / (n e^2 tau A))',
        proTip: 'State: At constant temperature, n and tau are constant, so R is constant. Thus V is proportional to I.'
      }
    ]
  },

  // 3. ELECTRIC FIELD OF DIPOLE (AXIAL LINE)
  {
    id: 'deriv-dipole-axial',
    subject: 'physics',
    title: 'Electric Field of Dipole on Axial Line',
    chapter: 'Electrostatics',
    marksTypical: 3,
    cbseFrequency: 'High',
    aim: 'Derive the electric field of an electric dipole of dipole moment p = q(2a) at a distance r along its axial line.',
    eli5Summary: 'A dipole is two equal and opposite charges (+q and -q) glued together. If you stand in a straight line with them (axial line), one charge is slightly closer to you than the other. The closer charge wins the tug-of-war!',
    finalFormula: 'E_{\\text{axial}} = \\frac{1}{4\\pi\\varepsilon_0} \\frac{2p}{r^3} \\quad (\\text{for } r \\gg a)',
    steps: [
      {
        stepNumber: 1,
        instruction: 'Draw electric dipole of charges -q at A and +q at B separated by 2a. Let P be a point at distance r from dipole center O along the axis.',
        math: 'AP = r + a, \\quad BP = r - a',
        cbseMarkAllocation: '0.5 Mark (Diagram + distance definitions)',
        proTip: 'Always mark dipole moment vector p pointing from -q to +q.'
      },
      {
        stepNumber: 2,
        instruction: 'Write expressions for electric field vectors E_+q (directed away) and E_-q (directed towards dipole).',
        math: 'E_{+q} = \\frac{1}{4\\pi\\varepsilon_0} \\frac{q}{(r - a)^2}, \\quad E_{-q} = \\frac{1}{4\\pi\\varepsilon_0} \\frac{q}{(r + a)^2}',
        cbseMarkAllocation: '1 Mark',
        proTip: 'Since BP < AP, E_+q > E_-q. Net field points along vector p.'
      },
      {
        stepNumber: 3,
        instruction: 'Compute net electric field E = E_+q - E_-q and simplify algebraically.',
        math: 'E = \\frac{q}{4\\pi\\varepsilon_0} \\left[ \\frac{1}{(r-a)^2} - \\frac{1}{(r+a)^2} \\right] = \\frac{q}{4\\pi\\varepsilon_0} \\left[ \\frac{(r+a)^2 - (r-a)^2}{(r^2 - a^2)^2} \\right] = \\frac{q}{4\\pi\\varepsilon_0} \\frac{4ar}{(r^2 - a^2)^2}',
        cbseMarkAllocation: '1 Mark',
        proTip: 'Factor 4ar into 2 * (2a) * r to introduce dipole moment p = q * 2a.'
      },
      {
        stepNumber: 4,
        instruction: 'Substitute p = 2qa and apply short-dipole approximation (r >> a).',
        math: 'E = \\frac{1}{4\\pi\\varepsilon_0} \\frac{2pr}{(r^2 - a^2)^2} \\xrightarrow{r \\gg a} E_{\\text{axial}} = \\frac{1}{4\\pi\\varepsilon_0} \\frac{2p}{r^3}',
        cbseMarkAllocation: '0.5 Mark (Final vector statement: along direction of p)',
        proTip: 'State: Electric field of a dipole falls off as 1/r^3, faster than a single charge (1/r^2).'
      }
    ]
  },

  // 4. YOUNG'S DOUBLE SLIT EXPERIMENT (FRINGE WIDTH)
  {
    id: 'deriv-ydse-fringe',
    subject: 'physics',
    title: 'Expression for Fringe Width in Young\'s Double Slit Experiment',
    chapter: 'Wave Optics',
    marksTypical: 5,
    cbseFrequency: 'Very High',
    aim: 'Derive path difference Delta x = y*d / D and deduce fringe width beta = lambda * D / d for interference fringes.',
    eli5Summary: 'When wave ripples from two tiny slits overlap, their peaks collide to create dazzling bright stripes, and peaks colliding with troughs cancel out into dark stripes. Geometry lets us calculate the exact millimeter distance between every bright stripe on the screen!',
    finalFormula: '\\beta = \\frac{\\lambda D}{d}',
    steps: [
      {
        stepNumber: 1,
        instruction: 'Set up two coherent narrow slits S1 and S2 separated by distance d, with screen placed parallel at distance D. Let P be a point on screen at distance y from central maximum O.',
        math: 'S_1 = (0, d/2), \\quad S_2 = (0, -d/2), \\quad P = (D, y)',
        cbseMarkAllocation: '1 Mark (Ray diagram showing path difference S2P - S1P)',
        proTip: 'Make sure slit separation d is drawn much smaller than screen distance D.'
      },
      {
        stepNumber: 2,
        instruction: 'Calculate path lengths S1P and S2P using Pythagoras theorem in right-angled triangles.',
        math: 'S_2 P^2 - S_1 P^2 = \\left[ D^2 + \\left(y + \\frac{d}{2}\\right)^2 \\right] - \\left[ D^2 + \\left(y - \\frac{d}{2}\\right)^2 \\right] = 2yd',
        cbseMarkAllocation: '1.5 Marks (Algebraic expansion and cancellation of D^2 terms)',
        proTip: 'Factor as (S2P - S1P)(S2P + S1P) = 2yd.'
      },
      {
        stepNumber: 3,
        instruction: 'Since D >> d and y << D, approximate S2P + S1P ≈ 2D to find path difference Delta x.',
        math: '(S_2 P - S_1 P)(2D) \\approx 2yd \\implies \\Delta x = S_2 P - S_1 P = \\frac{yd}{D}',
        cbseMarkAllocation: '1 Mark',
        proTip: 'Highlight the approximation S2P + S1P ≈ 2D explicitly.'
      },
      {
        stepNumber: 4,
        instruction: 'For constructive interference (bright fringes), set Delta x = n * lambda. Find position of n-th bright fringe.',
        math: '\\frac{y_n d}{D} = n \\lambda \\implies y_n = \\frac{n \\lambda D}{d} \\quad (n = 0, 1, 2, \\dots)',
        cbseMarkAllocation: '0.5 Mark',
        proTip: 'Central bright fringe is at y_0 = 0.'
      },
      {
        stepNumber: 5,
        instruction: 'Compute fringe width beta as distance between two successive bright fringes (y_{n} - y_{n-1}).',
        math: '\\beta = y_n - y_{n-1} = \\frac{n \\lambda D}{d} - \\frac{(n-1) \\lambda D}{d} = \\frac{\\lambda D}{d}',
        cbseMarkAllocation: '1 Mark (Final formula box + statement: all fringes have equal width)',
        proTip: 'State: Fringe width beta is independent of n; interference fringes are equally spaced!'
      }
    ]
  },

  // 5. FIRST-ORDER REACTION INTEGRATED RATE LAW
  {
    id: 'deriv-first-order-kinetics',
    subject: 'chemistry',
    title: 'Integrated Rate Equation for First Order Chemical Kinetics',
    chapter: 'Chemical Kinetics',
    marksTypical: 3,
    cbseFrequency: 'Very High',
    aim: 'Derive k = (2.303/t) * log10([R]0 / [R]) and half-life t_1/2 = 0.693 / k for a first-order reaction.',
    eli5Summary: 'Imagine a popcorn popper where every single kernel has a fixed 10% chance of popping each minute. The more unpopped kernels remain, the faster popping noises you hear. As kernels pop, the rate slows down smoothly in an exponential curve!',
    finalFormula: 'k = \\frac{2.303}{t} \\log_{10} \\left( \\frac{[R]_0}{[R]} \\right) \\quad \\text{and} \\quad t_{1/2} = \\frac{0.693}{k}',
    steps: [
      {
        stepNumber: 1,
        instruction: 'Write the differential rate law for a first-order reaction R -> P.',
        math: '-\\frac{d[R]}{dt} = k [R]^1 \\implies \\frac{d[R]}{[R]} = -k dt',
        cbseMarkAllocation: '0.5 Mark',
        proTip: 'Separate variables [R] on LHS and time t on RHS.'
      },
      {
        stepNumber: 2,
        instruction: 'Integrate both sides between initial time t = 0 (where [R] = [R]0) and time t (where [R] = [R]).',
        math: '\\int_{[R]_0}^{[R]} \\frac{d[R]}{[R]} = -k \\int_0^t dt \\implies \\ln [R] - \\ln [R]_0 = -k t \\implies \\ln \\left( \\frac{[R]}{[R]_0} \\right) = -k t',
        cbseMarkAllocation: '1 Mark',
        proTip: 'Recall integral of 1/x dx is natural log ln(x).'
      },
      {
        stepNumber: 3,
        instruction: 'Rearrange and convert natural logarithm (ln) to base 10 logarithm by multiplying by 2.303.',
        math: 'k t = \\ln \\left( \\frac{[R]_0}{[R]} \\right) \\implies k = \\frac{2.303}{t} \\log_{10} \\left( \\frac{[R]_0}{[R]} \\right)',
        cbseMarkAllocation: '1 Mark',
        proTip: 'Box this equation as the primary integrated rate expression.'
      },
      {
        stepNumber: 4,
        instruction: 'Derive half-life t1/2 when concentration drops to [R] = [R]0 / 2.',
        math: 't_{1/2} = \\frac{2.303}{k} \\log_{10} \\left( \\frac{[R]_0}{[R]_0 / 2} \\right) = \\frac{2.303}{k} \\log_{10}(2) = \\frac{2.303 \\times 0.3010}{k} = \\frac{0.693}{k}',
        cbseMarkAllocation: '0.5 Mark',
        proTip: 'Crucial conclusion: Half-life of a first-order reaction is completely independent of initial reactant concentration!'
      }
    ]
  }
];

export const boardAnswersData: BoardAnswerTemplate[] = [
  {
    id: 'ans-1',
    subject: 'biology',
    chapter: 'Molecular Basis of Inheritance',
    marks: 3,
    question: 'Describe the initiation, elongation, and termination steps of transcription in bacteria. Why does polycistronic mRNA in bacteria require no post-transcriptional processing?',
    markingSchemePoints: [
      'Initiation: RNA polymerase binds to promoter with sigma (σ) factor (1/2 Mark)',
      'Elongation: RNA polymerase synthesizes RNA 5\' -> 3\' using nucleoside triphosphates (1/2 Mark)',
      'Termination: Rho (ρ) factor terminates transcription at terminator site (1/2 Mark)',
      'Coupled transcription-translation: No nuclear membrane separates DNA from ribosomes in prokaryotes (1 Mark)',
      'Introns absent: Bacterial structural genes are continuous with no split-gene arrangement (1/2 Mark)'
    ],
    modelAnswer: `**1. Stages of Transcription in Prokaryotes:**
• **Initiation**: RNA polymerase holoenzyme recognizes and binds to the promoter sequence of DNA with the transient association of the **sigma (σ) factor**.
• **Elongation**: The core RNA polymerase moves along the template strand (3' to 5'), unwinding the helix and polymerizing ribonucleotides in the **5' → 3'** direction complementary to the template.
• **Termination**: Upon reaching the terminator sequence, the **rho (ρ) factor** associates with the polymerase, causing the nascent RNA transcript and enzyme to dissociate.

**2. Why Bacteria Require No Splicing / Post-Transcriptional Processing:**
• In bacteria, structural genes are **monocistronic/continuous**, containing **no intervening sequences (introns)**.
• Since prokaryotes lack a nuclear membrane, mRNA does not need export; translation can begin even while the 3' end of mRNA is still being transcribed (**coupled transcription-translation**).`,
    eli5Explanation: 'In bacteria, there is no separate bedroom (nucleus) for DNA—everything floats in one open living room. As soon as the RNA copy starts printing out of the machine, ribosomes jump right onto it and start building protein immediately, with zero need for editing out commercial breaks (introns)!',
    keyDefinitionsToUnderline: ['sigma (σ) factor', 'rho (ρ) factor', '5\' → 3\' direction', 'absence of introns', 'coupled transcription-translation']
  },
  {
    id: 'ans-2',
    subject: 'physics',
    chapter: 'Wave Optics',
    marks: 3,
    question: 'State Huygens\' Principle. Using it, prove the laws of reflection of a plane wavefront incident on a plane reflecting surface.',
    markingSchemePoints: [
      'Statement of Huygens Principle (every point on wavefront is source of secondary wavelets) (1 Mark)',
      'Labeled ray / wavefront diagram showing incident wavefront AB and reflected wavefront CD (1 Mark)',
      'Geometric proof showing congruence of triangles ΔABC and ΔADC (1/2 Mark)',
      'Deduction of angle of incidence i = angle of reflection r (1/2 Mark)'
    ],
    modelAnswer: `**Huygens' Principle:**
1. Every point on a given wavefront acts as a fresh source of secondary disturbance, sending out spherical secondary wavelets in all directions with the speed of the wave in that medium.
2. The forward common envelope or tangential surface to these secondary wavelets at any subsequent instant gives the new wavefront.

**Proof of Laws of Reflection:**
• Let a plane wavefront $AB$ be incident on a plane reflecting surface $XY$ at angle $i$.
• As point $A$ reaches the mirror, it starts emitting secondary wavelets with speed $v$. Let $\\tau$ be the time taken by point $B$ to reach the surface at $C$.
• Thus, distance $BC = v \\tau$. In the same time $\\tau$, wavelets from $A$ travel a distance $AD = v \\tau$.
• Consider right-angled triangles $\\Delta ABC$ and $\\Delta ADC$:
  - $\\angle B = \\angle D = 90^\\circ$ (rays are perpendicular to wavefronts)
  - $AC = AC$ (common hypotenuse)
  - $BC = AD = v \\tau$
• Therefore, $\\Delta ABC \\cong \\Delta ADC$ by RHS congruence criterion.
• By corresponding parts of congruent triangles:
  $$\\angle BAC = \\angle DCA \\implies i = r$$
• Hence, the angle of incidence equals the angle of reflection. Since incident ray, normal, and reflected ray all lie in the plane of the paper, the laws of reflection are proved.`,
    eli5Explanation: 'Imagine a row of soldiers marching in a straight line hitting a tilted wall. The first soldier to hit immediately bounces off at an angle. By the time the last soldier hits the wall, the first soldier has marched the exact same distance into the room. Matching the geometry proves the bounce angle must match the entry angle!',
    keyDefinitionsToUnderline: ['secondary wavelets', 'forward common envelope', 'v * tau', 'RHS congruence', 'angle of incidence equals angle of reflection']
  },
  {
    id: 'ans-3',
    subject: 'chemistry',
    chapter: 'Coordination Compounds',
    marks: 2,
    question: 'Write the IUPAC name of [Pt(NH3)2 Cl(NO2)] and draw its geometrical isomers. Indicate which isomer shows optical activity.',
    markingSchemePoints: [
      'Correct IUPAC name: Diamminechloridonitrito-N-platinum(II) (1 Mark)',
      'Drawing of cis and trans isomers (1/2 Mark)',
      'Optical activity statement: Square planar complexes possess plane of symmetry, hence neither cis nor trans is optically active (1/2 Mark)'
    ],
    modelAnswer: `**1. IUPAC Name:**
**Diamminechloridonitrito-N-platinum(II)** (or Diamminechloridonitroplatinum(II))
*(Oxidation state calculation: $x + 2(0) - 1 - 1 = 0 \\implies x = +2$)*

**2. Geometrical Isomers:**
• **cis-isomer**: Both $NH_3$ ligands occupy adjacent positions (at $90^\\circ$ to each other).
• **trans-isomer**: Both $NH_3$ ligands occupy opposite positions (at $180^\\circ$ across from each other).

**3. Optical Activity:**
• **Neither isomer is optically active.**
• Platinum(II) complexes are four-coordinate **square planar ($dsp^2$)**. Square planar complexes possess a plane of symmetry (the molecular plane itself), making them superimposable on their mirror images and achiral.`,
    eli5Explanation: 'Think of a square table: having two identical cups side-by-side is cis; having them on opposite diagonal corners is trans. Because a flat table can always be sliced in half like a sheet of paper, it is completely symmetrical and cannot be optically active!',
    keyDefinitionsToUnderline: ['Diamminechloridonitrito-N-platinum(II)', 'cis (adjacent 90°)', 'trans (opposite 180°)', 'square planar dsp2', 'plane of symmetry']
  }
];

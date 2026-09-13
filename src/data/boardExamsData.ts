import { Derivation, BoardAnswerTemplate } from '../types';

export const derivationsData: Derivation[] = [
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
  {
    id: 'deriv-wheatstone',
    subject: 'physics',
    title: 'Condition for Balanced Wheatstone Bridge',
    chapter: 'Current Electricity',
    marksTypical: 3,
    cbseFrequency: 'Very High',
    aim: 'Using Kirchhoff\'s laws, deduce the condition for balance of a Wheatstone bridge: P / Q = R / S when galvanometer current Ig = 0.',
    eli5Summary: 'Think of four resistors like two parallel branches of water pipes. If the water pressure in the middle of both pipes is exactly equal, no water will flow between them through a connecting valve (galvanometer Ig = 0). The ratio of the resistances must be equal!',
    finalFormula: '\\frac{P}{Q} = \\frac{R}{S}',
    steps: [
      {
        stepNumber: 1,
        instruction: 'Draw the 4-arm bridge ABCD with resistances P, Q, R, S and galvanometer G in arm BD. State Kirchhoff\'s Junction Law at B and D when bridge is balanced (I_g = 0).',
        math: 'I_1 = I_2 \\quad \\text{along branch ABC}; \\quad I_3 = I_4 \\quad \\text{along branch ADC}',
        cbseMarkAllocation: '1 Mark (Circuit diagram with current labeling)',
        proTip: 'Do not forget battery E and key K in the circuit diagram.'
      },
      {
        stepNumber: 2,
        instruction: 'Apply Kirchhoff\'s Loop Rule to closed loop ABDA in clockwise direction.',
        math: '-I_1 P - I_g G + I_3 R = 0 \\implies -I_1 P + I_3 R = 0 \\implies I_1 P = I_3 R \\quad \\text{--- (Eq 1)}',
        cbseMarkAllocation: '1 Mark (Sign convention application)',
        proTip: 'State the loop direction (e.g. ABDA) explicitly.'
      },
      {
        stepNumber: 3,
        instruction: 'Apply Kirchhoff\'s Loop Rule to closed loop BCDB in clockwise direction.',
        math: '-I_1 Q + I_3 S + I_g G = 0 \\implies -I_1 Q + I_3 S = 0 \\implies I_1 Q = I_3 S \\quad \\text{--- (Eq 2)}',
        cbseMarkAllocation: '0.5 Mark',
        proTip: 'Since Ig = 0, current in BC is I1 and current in DC is I3.'
      },
      {
        stepNumber: 4,
        instruction: 'Divide Equation (1) by Equation (2) to eliminate currents I1 and I3.',
        math: '\\frac{I_1 P}{I_1 Q} = \\frac{I_3 R}{I_3 S} \\implies \\frac{P}{Q} = \\frac{R}{S}',
        cbseMarkAllocation: '0.5 Mark (Final ratio statement)',
        proTip: 'Mention: "This balanced state is independent of the EMF of the cell and galvanometer resistance."'
      }
    ]
  },
  {
    id: 'deriv-nernst',
    subject: 'chemistry',
    title: 'Derivation of Nernst Equation from Thermodynamic Principles',
    chapter: 'Electrochemistry',
    marksTypical: 3,
    cbseFrequency: 'High',
    aim: 'Relate electrical potential E_cell to Gibbs Free Energy change and reaction quotient Q.',
    eli5Summary: 'Voltage is the electrical pressure created by a chemical reaction wanting to happen. As products pile up, the driving force drops. The Nernst equation calculates the exact voltage drop based on temperature and concentration.',
    finalFormula: 'E_{\\text{cell}} = E^\\circ_{\\text{cell}} - \\frac{2.303 RT}{nF} \\log_{10} Q',
    steps: [
      {
        stepNumber: 1,
        instruction: 'Write the fundamental thermodynamic Van\'t Hoff isotherm equation relating Gibbs free energy change Delta G to standard free energy Delta G0.',
        math: '\\Delta G = \\Delta G^\\circ + RT \\ln Q',
        cbseMarkAllocation: '1 Mark',
        proTip: 'State clearly that Q is the reaction quotient [Products]/[Reactants].'
      },
      {
        stepNumber: 2,
        instruction: 'Substitute electrical work done: Delta G = -nFE_cell and Delta G0 = -nFE0_cell into the isotherm equation.',
        math: '-nFE_{\\text{cell}} = -nFE^\\circ_{\\text{cell}} + RT \\ln Q',
        cbseMarkAllocation: '1 Mark',
        proTip: 'State n = number of moles of electrons transferred, F = Faraday constant (96,500 C/mol).'
      },
      {
        stepNumber: 3,
        instruction: 'Divide the entire equation by -nF and convert natural logarithm (ln) to log base 10.',
        math: 'E_{\\text{cell}} = E^\\circ_{\\text{cell}} - \\frac{RT}{nF} \\ln Q = E^\\circ_{\\text{cell}} - \\frac{2.303 RT}{nF} \\log_{10} Q',
        cbseMarkAllocation: '0.5 Mark',
        proTip: 'At T = 298 K, 2.303 * R * T / F = 0.0591 V.'
      },
      {
        stepNumber: 4,
        instruction: 'Write the operational formula at standard temperature 298 K.',
        math: 'E_{\\text{cell}} = E^\\circ_{\\text{cell}} - \\frac{0.0591}{n} \\log_{10} Q',
        cbseMarkAllocation: '0.5 Mark',
        proTip: 'Mention that pure solids and liquids have activity = 1.'
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
  }
];

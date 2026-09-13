import { Chapter } from '../types';

export const syllabusData: Chapter[] = [
  // ----------------- BIOLOGY (CLASS 11) -----------------
  {
    id: 'bio-11-living-world',
    name: 'The Living World',
    subject: 'biology',
    classLevel: '11',
    ncertUnit: 'Diversity in the Living World',
    topics: [
      { id: 'taxo-hierarchy', name: 'Taxonomic Hierarchy & Categories', subtopics: ['Species to Kingdom', 'Suffixes used in taxa', 'Binomial nomenclature'] },
      { id: 'taxo-aids', name: 'Taxonomical Aids & Identification', subtopics: ['Herbarium', 'Botanical Gardens', 'Keys & Manuals'] }
    ]
  },
  {
    id: 'bio-11-bio-class',
    name: 'Biological Classification',
    subject: 'biology',
    classLevel: '11',
    ncertUnit: 'Diversity in the Living World',
    isHighWeightage: true,
    topics: [
      { id: 'monera', name: 'Kingdom Monera', subtopics: ['Archaebacteria', 'Eubacteria', 'Mycoplasma'] },
      { id: 'protista', name: 'Kingdom Protista', subtopics: ['Chrysophytes', 'Dinoflagellates', 'Euglenoids', 'Slime moulds', 'Protozoans'] },
      { id: 'fungi', name: 'Kingdom Fungi', subtopics: ['Phycomycetes', 'Ascomycetes', 'Basidiomycetes', 'Deuteromycetes'] },
      { id: 'viruses-viroids', name: 'Viruses, Viroids, Prions & Lichens', subtopics: ['Capsid structure', 'Prion diseases', 'Lichen symbiosis'] }
    ]
  },
  {
    id: 'bio-11-plant-kingdom',
    name: 'Plant Kingdom',
    subject: 'biology',
    classLevel: '11',
    ncertUnit: 'Diversity in the Living World',
    topics: [
      { id: 'algae', name: 'Algae & Pigmentation', subtopics: ['Chlorophyceae', 'Phaeophyceae', 'Rhodophyceae', 'Hydrocolloids'] },
      { id: 'bryo-pteri', name: 'Bryophytes & Pteridophytes', subtopics: ['Liverworts vs Mosses', 'Heterospory & Seed habit', 'Prothallus'] },
      { id: 'gymnosperms', name: 'Gymnosperms', subtopics: ['Mycorrhiza in Pinus', 'Coralloid roots in Cycas', 'Archegonia'] }
    ]
  },
  {
    id: 'bio-11-animal-kingdom',
    name: 'Animal Kingdom',
    subject: 'biology',
    classLevel: '11',
    ncertUnit: 'Diversity in the Living World',
    isHighWeightage: true,
    topics: [
      { id: 'basis-class', name: 'Basis of Classification', subtopics: ['Coelom types', 'Symmetry', 'Germ layers', 'Metamerism'] },
      { id: 'non-chordates', name: 'Non-Chordate Phyla', subtopics: ['Porifera to Echinodermata', 'Hemichordata: Proboscis gland'] },
      { id: 'chordates', name: 'Chordata & Vertebrate Classes', subtopics: ['Chondrichthyes vs Osteichthyes', 'Amphibia, Reptilia, Aves, Mammalia'] }
    ]
  },
  {
    id: 'bio-11-cell-unit',
    name: 'Cell: The Unit of Life',
    subject: 'biology',
    classLevel: '11',
    ncertUnit: 'Cell Structure and Function',
    isHighWeightage: true,
    topics: [
      { id: 'cell-membrane', name: 'Fluid Mosaic Model & Cell Wall', subtopics: ['Singer & Nicolson', 'Lipid bilayer', 'Active vs Passive transport'] },
      { id: 'endomembrane', name: 'Endomembrane System', subtopics: ['ER (RER vs SER)', 'Golgi apparatus cis/trans', 'Lysosomes', 'Vacuoles'] },
      { id: 'mitochondria-chloroplast', name: 'Mitochondria & Plastids', subtopics: ['Mitochondrial matrix & cristae', 'Thylakoids & Stroma', '70S ribosomes'] },
      { id: 'nucleus-chromosomes', name: 'Nucleus & Chromosome Morphology', subtopics: ['Nuclear pore', 'Nucleolus', 'Centromere positions', 'Satellite chromosomes'] }
    ]
  },
  {
    id: 'bio-11-cell-cycle',
    name: 'Cell Cycle and Cell Division',
    subject: 'biology',
    classLevel: '11',
    ncertUnit: 'Cell Structure and Function',
    isHighWeightage: true,
    topics: [
      { id: 'interphase-mitosis', name: 'Interphase & Mitosis Stages', subtopics: ['G1, S phase DNA replication', 'G2 phase', 'Prophase to Telophase', 'Cytokinesis'] },
      { id: 'meiosis-stages', name: 'Meiosis I & II Nuances', subtopics: ['Leptotene to Diakinesis', 'Synaptonemal complex', 'Crossing over & Recombinase', 'Chiasmata'] }
    ]
  },
  {
    id: 'bio-11-photosynthesis',
    name: 'Photosynthesis in Higher Plants',
    subject: 'biology',
    classLevel: '11',
    ncertUnit: 'Plant Physiology',
    isHighWeightage: true,
    topics: [
      { id: 'light-reactions', name: 'Light Reactions & Photophosphorylation', subtopics: ['LHC & Reaction centers', 'PS II & PS I (Z-scheme)', 'Cyclic vs Non-cyclic', 'Chemiosmotic hypothesis'] },
      { id: 'c3-c4-pathways', name: 'Calvin Cycle & C4 Pathway', subtopics: ['RuBisCO dual nature', 'Kranz anatomy', 'PEPcase', 'Photorespiration in C3'] }
    ]
  },
  {
    id: 'bio-11-human-circulation',
    name: 'Body Fluids and Circulation',
    subject: 'biology',
    classLevel: '11',
    ncertUnit: 'Human Physiology',
    topics: [
      { id: 'blood-coagulation', name: 'Blood Components & Clotting Cascade', subtopics: ['Formed elements', 'ABO & Rh incompatibility', 'Thrombokinase mechanism'] },
      { id: 'cardiac-cycle-ecg', name: 'Cardiac Cycle & ECG Waves', subtopics: ['SAN pacemaker', 'Cardiac output', 'P, QRS, T waves', 'Double circulation'] }
    ]
  },

  // ----------------- BIOLOGY (CLASS 12) -----------------
  {
    id: 'bio-12-sexual-repro-plants',
    name: 'Sexual Reproduction in Flowering Plants',
    subject: 'biology',
    classLevel: '12',
    ncertUnit: 'Reproduction',
    isHighWeightage: true,
    topics: [
      { id: 'microsporogenesis', name: 'Microsporogenesis & Pollen Grain', subtopics: ['Anther wall 4 layers (Tapetum)', '2-celled vs 3-celled pollen', 'Sporopollenin'] },
      { id: 'megasporogenesis', name: 'Megasporogenesis & Embryo Sac', subtopics: ['Monosporic development', '7-celled 8-nucleate structure', 'Filiform apparatus'] },
      { id: 'double-fertilization', name: 'Double Fertilization & Post-Fertilization', subtopics: ['Syngamy + Triple fusion', 'PEN (3n)', 'Endosperm development', 'Apomixis & Polyembryony'] }
    ]
  },
  {
    id: 'bio-12-genetics-principles',
    name: 'Principles of Inheritance and Variation',
    subject: 'biology',
    classLevel: '12',
    ncertUnit: 'Genetics and Evolution',
    isHighWeightage: true,
    topics: [
      { id: 'mendelian-laws', name: 'Mendelian Genetics & Deviations', subtopics: ['Incomplete dominance', 'Co-dominance (ABO blood)', 'Dihybrid ratio 9:3:3:1', 'Test cross'] },
      { id: 'linkage-mapping', name: 'Linkage, Recombination & Sex Determination', subtopics: ['Morgan fruit fly experiments', 'Gene mapping (Sturtevant)', 'XX-XO, ZZ-ZW systems', 'Honeybee haplodiploidy'] },
      { id: 'genetic-disorders', name: 'Pedigree Analysis & Disorders', subtopics: ['Haemophilia', 'Sickle-cell anemia (Glu->Val at 6th position)', 'Downs, Turners, Klinefelter syndromes'] }
    ]
  },
  {
    id: 'bio-12-molecular-basis',
    name: 'Molecular Basis of Inheritance',
    subject: 'biology',
    classLevel: '12',
    ncertUnit: 'Genetics and Evolution',
    isHighWeightage: true,
    topics: [
      { id: 'dna-structure', name: 'DNA Structure & Search for Genetic Material', subtopics: ['Griffith transforming principle', 'Avery-MacLeod-McCarty', 'Hershey-Chase bacteriophage', 'Meselson-Stahl semi-conservative'] },
      { id: 'transcription-processing', name: 'Transcription & RNA Processing', subtopics: ['Promoter, Coding, Template strand', 'Capping (7-mG), Tailing (poly-A)', 'Splicing of introns'] },
      { id: 'lac-operon', name: 'Genetic Code & Lac Operon', subtopics: ['Degenerate, Universal, Wobble', 'Repressor protein & Allolactose', 'Structural genes z, y, a'] }
    ]
  },
  {
    id: 'bio-12-biotech-principles',
    name: 'Biotechnology: Principles and Processes',
    subject: 'biology',
    classLevel: '12',
    ncertUnit: 'Biotechnology',
    isHighWeightage: true,
    topics: [
      { id: 'recombinant-tools', name: 'Tools of Recombinant DNA Technology', subtopics: ['Restriction Endonucleases (EcoRI)', 'pBR322 selectable markers (ampR, tetR)', 'Taq polymerase in PCR'] },
      { id: 'downstream-processing', name: 'Competent Host & Bioreactors', subtopics: ['Micro-injection & Biolistics', 'Continuous vs Fed-batch bioreactors', 'Downstream separation'] }
    ]
  },

  // ----------------- PHYSICS (CLASS 11) -----------------
  {
    id: 'phy-11-units-errors',
    name: 'Units and Measurements',
    subject: 'physics',
    classLevel: '11',
    ncertUnit: 'Mechanics',
    topics: [
      { id: 'dimensions-analysis', name: 'Dimensional Analysis & Applications', subtopics: ['Principle of homogeneity', 'Deducing relations', 'Conversion of units'] },
      { id: 'errors-instruments', name: 'Error Propagation & Instruments', subtopics: ['Percentage errors in powers', 'Vernier caliper least count', 'Screw gauge zero error'] }
    ]
  },
  {
    id: 'phy-11-kinematics-1d-2d',
    name: 'Kinematics: 1D & 2D Motion',
    subject: 'physics',
    classLevel: '11',
    ncertUnit: 'Mechanics',
    isHighWeightage: true,
    topics: [
      { id: 'graphs-calculus', name: 'Motion Graphs & Calculus Approximations', subtopics: ['v-t graph area & slope', 'Constant acceleration equations', 'Relative velocity in 1D'] },
      { id: 'projectile-motion', name: 'Projectile Motion & Vectors', subtopics: ['Time of flight, Max height, Range', 'Complementary angles of projection', 'River-boat & Rain-man problems'] }
    ]
  },
  {
    id: 'phy-11-laws-of-motion',
    name: 'Laws of Motion and Friction',
    subject: 'physics',
    classLevel: '11',
    ncertUnit: 'Mechanics',
    isHighWeightage: true,
    topics: [
      { id: 'fbd-newton', name: 'Free Body Diagrams & Block Systems', subtopics: ['Tension in strings', 'Normal reaction', 'Connected bodies on incline'] },
      { id: 'friction-banking', name: 'Friction & Circular Motion', subtopics: ['Static vs Kinetic coefficient', 'Angle of repose', 'Banking of curved tracks'] }
    ]
  },
  {
    id: 'phy-11-rotational-motion',
    name: 'Rotational Motion',
    subject: 'physics',
    classLevel: '11',
    ncertUnit: 'Mechanics',
    isHighWeightage: true,
    topics: [
      { id: 'torque-angular-momentum', name: 'Torque & Angular Momentum Conservation', subtopics: ['Tau = r x F', 'L = I * omega', 'Ice skater spinning'] },
      { id: 'moment-of-inertia', name: 'Moment of Inertia & Rolling', subtopics: ['Parallel & Perpendicular axis theorems', 'Ring, Disc, Sphere, Cylinder', 'Pure rolling acceleration'] }
    ]
  },
  {
    id: 'phy-11-thermodynamics',
    name: 'Thermodynamics & KTG',
    subject: 'physics',
    classLevel: '11',
    ncertUnit: 'Heat and Thermodynamics',
    isHighWeightage: true,
    topics: [
      { id: 'first-law-thermo', name: 'First Law & Thermodynamic Processes', subtopics: ['Isothermal vs Adiabatic PV curves', 'Work done in isobaric/isochoric', 'Molar specific heats Cp & Cv'] },
      { id: 'ktg-speeds', name: 'Kinetic Theory of Gases', subtopics: ['RMS speed, Average speed, Most probable', 'Degrees of freedom & internal energy', 'Mean free path'] }
    ]
  },

  // ----------------- PHYSICS (CLASS 12) -----------------
  {
    id: 'phy-12-electrostatics',
    name: 'Electrostatics (Fields & Capacitors)',
    subject: 'physics',
    classLevel: '12',
    ncertUnit: 'Electromagnetism',
    isHighWeightage: true,
    topics: [
      { id: 'gauss-law-fields', name: 'Gauss Law & Field Calculations', subtopics: ['Infinite line charge field', 'Infinite sheet field', 'Spherical shell inside/outside'] },
      { id: 'capacitors-dielectric', name: 'Capacitance & Dielectric Insertion', subtopics: ['Parallel plate capacitor', 'Dielectric slab effect (battery connected vs disconnected)', 'Energy stored in capacitor'] }
    ]
  },
  {
    id: 'phy-12-current-elec',
    name: 'Current Electricity',
    subject: 'physics',
    classLevel: '12',
    ncertUnit: 'Electromagnetism',
    isHighWeightage: true,
    topics: [
      { id: 'drift-velocity', name: 'Drift Velocity & Ohm Law Derivation', subtopics: ['Current density j = n e vd', 'Relaxation time', 'Temperature dependence of resistivity'] },
      { id: 'circuits-kirchhoff', name: 'Kirchhoff Laws & Wheatstone Bridge', subtopics: ['Loop law & Junction law', 'Balanced Wheatstone condition', 'Metre bridge wire experiment'] }
    ]
  },
  {
    id: 'phy-12-ray-optics',
    name: 'Ray Optics and Optical Instruments',
    subject: 'physics',
    classLevel: '12',
    ncertUnit: 'Optics',
    isHighWeightage: true,
    topics: [
      { id: 'refraction-tir', name: 'Refraction & Total Internal Reflection', subtopics: ['Snells law', 'Critical angle & Optical fibers', 'Apparent depth'] },
      { id: 'lenses-prisms', name: 'Lens Maker Formula & Prisms', subtopics: ['Thin lens formula', 'Power of combination', 'Prism angle of minimum deviation', 'Compound microscope & Telescope'] }
    ]
  },
  {
    id: 'phy-12-modern-physics',
    name: 'Modern Physics (Dual Nature, Atoms, Nuclei)',
    subject: 'physics',
    classLevel: '12',
    ncertUnit: 'Modern Physics',
    isHighWeightage: true,
    topics: [
      { id: 'photoelectric-effect', name: 'Photoelectric Effect & de Broglie', subtopics: ['Einsteins photoelectric equation', 'Stopping potential vs frequency', 'de Broglie wavelength of electron'] },
      { id: 'bohr-atom-radii', name: 'Bohr Model & Energy Levels', subtopics: ['Quantization of angular momentum', 'Radius rn proportional to n^2/Z', 'Lyman, Balmer, Paschen transitions', 'Nuclear binding energy curve'] }
    ]
  },
  {
    id: 'phy-12-semiconductors',
    name: 'Semiconductor Electronics',
    subject: 'physics',
    classLevel: '12',
    ncertUnit: 'Modern Physics',
    isHighWeightage: true,
    topics: [
      { id: 'pn-junction-diodes', name: 'p-n Junction Diode & Rectifiers', subtopics: ['Forward vs Reverse bias I-V curves', 'Depletion layer width', 'Half-wave vs Full-wave rectifier', 'Photodiode & Solar cell'] },
      { id: 'logic-gates', name: 'Logic Gates & Truth Tables', subtopics: ['AND, OR, NOT gates', 'NAND & NOR as universal gates', 'Truth table generation'] }
    ]
  },

  // ----------------- CHEMISTRY (CLASS 11) -----------------
  {
    id: 'chem-11-atomic-structure',
    name: 'Structure of Atom',
    subject: 'chemistry',
    classLevel: '11',
    ncertUnit: 'Physical Chemistry',
    isHighWeightage: true,
    topics: [
      { id: 'quantum-numbers', name: 'Quantum Numbers & Electronic Config', subtopics: ['Principal, Azimuthal, Magnetic, Spin', 'Pauli exclusion principle', 'Hund rule of max multiplicity', 'Aufbau principle'] },
      { id: 'bohr-photoelectric', name: 'Bohr Model & Dual Character of Matter', subtopics: ['de Broglie wavelength', 'Heisenberg uncertainty principle', 'Radial & Angular nodes'] }
    ]
  },
  {
    id: 'chem-11-chemical-bonding',
    name: 'Chemical Bonding & Molecular Structure',
    subject: 'chemistry',
    classLevel: '11',
    ncertUnit: 'Inorganic Chemistry',
    isHighWeightage: true,
    topics: [
      { id: 'vsepr-hybridization', name: 'VSEPR Theory & Hybridization', subtopics: ['sp, sp2, sp3, sp3d, sp3d2 shapes', 'Lone pair - bond pair repulsion', 'Dipole moment comparisons'] },
      { id: 'mot-diagrams', name: 'Molecular Orbital Theory (MOT)', subtopics: ['Bond order calculation', 'O2 vs N2 molecular orbital energy order', 'Paramagnetic vs Diamagnetic nature'] }
    ]
  },
  {
    id: 'chem-11-equilibrium',
    name: 'Equilibrium (Chemical & Ionic)',
    subject: 'chemistry',
    classLevel: '11',
    ncertUnit: 'Physical Chemistry',
    isHighWeightage: true,
    topics: [
      { id: 'chemical-eq-lechatelier', name: 'Chemical Equilibrium & Le Chatelier', subtopics: ['Kp and Kc relationship', 'Effect of temperature, pressure, inert gas addition', 'Reaction quotient Q vs K'] },
      { id: 'ionic-ph-buffer', name: 'Ionic Equilibrium & Buffers', subtopics: ['pH and pOH calculations', 'Ostwald dilution law', 'Buffer solutions (Henderson-Hasselbalch)', 'Solubility product Ksp & Common ion effect'] }
    ]
  },
  {
    id: 'chem-11-goc',
    name: 'General Organic Chemistry (GOC)',
    subject: 'chemistry',
    classLevel: '11',
    ncertUnit: 'Organic Chemistry',
    isHighWeightage: true,
    topics: [
      { id: 'electronic-effects', name: 'Electronic Displacement Effects', subtopics: ['Inductive effect (+I / -I)', 'Resonance / Mesomeric effect (+M / -M)', 'Hyperconjugation stability', 'Electromeric effect'] },
      { id: 'intermediates-acidity', name: 'Reaction Intermediates & Acid-Base Order', subtopics: ['Carbocation, Carbanion, Free radical stability', 'Acidity order of substituted phenols/carboxylic acids', 'Basic strength of aliphatic & aromatic amines'] }
    ]
  },

  // ----------------- CHEMISTRY (CLASS 12) -----------------
  {
    id: 'chem-12-solutions',
    name: 'Solutions',
    subject: 'chemistry',
    classLevel: '12',
    ncertUnit: 'Physical Chemistry',
    topics: [
      { id: 'raoult-henry', name: 'Henrys Law & Raoults Law', subtopics: ['Ideal vs Non-ideal solutions', 'Positive vs Negative deviations from Raoults law', 'Azeotropes'] },
      { id: 'colligative-vanthoff', name: 'Colligative Properties & van \'t Hoff Factor', subtopics: ['Elevation in boiling point (Kb)', 'Depression in freezing point (Kf)', 'Osmotic pressure (pi = CRT)', 'van \'t Hoff factor i (association/dissociation)'] }
    ]
  },
  {
    id: 'chem-12-electrochem',
    name: 'Electrochemistry',
    subject: 'chemistry',
    classLevel: '12',
    ncertUnit: 'Physical Chemistry',
    isHighWeightage: true,
    topics: [
      { id: 'nernst-gibbs', name: 'Nernst Equation & Gibbs Free Energy', subtopics: ['Standard electrode potentials', 'E_cell = E0 - (0.0591/n) log Q', 'Delta G0 = -nFE0', 'Equilibrium constant from E0'] },
      { id: 'conductance-kohlrausch', name: 'Conductance & Kohlrausch Law', subtopics: ['Specific conductivity (kappa) vs Molar conductivity (Lambda_m)', 'Limiting molar conductivity', 'Degree of dissociation of weak electrolyte'] }
    ]
  },
  {
    id: 'chem-12-coordination',
    name: 'Coordination Compounds',
    subject: 'chemistry',
    classLevel: '12',
    ncertUnit: 'Inorganic Chemistry',
    isHighWeightage: true,
    topics: [
      { id: 'iupac-isomerism', name: 'IUPAC Nomenclature & Isomerism', subtopics: ['Naming complex cations & anions', 'Ionization, Linkage, Hydrate isomerism', 'Geometrical (cis/trans, fac/mer) & Optical isomerism'] },
      { id: 'vbt-cft', name: 'Valence Bond Theory & Crystal Field Theory', subtopics: ['Inner vs Outer orbital complexes', 'Crystal field splitting in octahedral & tetrahedral (Delta_o vs Delta_t)', 'Spectrochemical series & Strong/weak ligands'] }
    ]
  },
  {
    id: 'chem-12-haloalkanes',
    name: 'Haloalkanes and Haloarenes',
    subject: 'chemistry',
    classLevel: '12',
    ncertUnit: 'Organic Chemistry',
    topics: [
      { id: 'sn1-sn2-mechanism', name: 'SN1 vs SN2 Nucleophilic Substitution', subtopics: ['SN1: Carbocation intermediate, Racemization, 3 > 2 > 1', 'SN2: Inversion of configuration (Walden), 1 > 2 > 3', 'Solvent effects (polar protic vs polar aprotic)'] },
      { id: 'elimination-sandmeyer', name: 'Elimination & Electrophilic Substitution', subtopics: ['Saytzeff rule', 'Grignard reagent preparation', 'Sandmeyer reaction for haloarenes'] }
    ]
  },
  {
    id: 'chem-12-aldehydes-ketones',
    name: 'Aldehydes, Ketones and Carboxylic Acids',
    subject: 'chemistry',
    classLevel: '12',
    ncertUnit: 'Organic Chemistry',
    isHighWeightage: true,
    topics: [
      { id: 'nucleophilic-addition', name: 'Nucleophilic Addition Reactions', subtopics: ['Reactivity of aldehydes vs ketones', 'Addition of HCN, NaHSO3, Grignard', 'Hemiacetal & Acetal formation'] },
      { id: 'named-reactions', name: 'High-Yield Named Reactions', subtopics: ['Aldol & Cross-Aldol condensation', 'Cannizzaro reaction (no alpha-H)', 'Clemmensen vs Wolff-Kishner reduction', 'Hell-Volhard-Zelinsky (HVZ) reaction'] }
    ]
  }
];

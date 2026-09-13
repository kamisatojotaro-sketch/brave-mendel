import { LearnerTopic } from '../types';

export const learnerTopics: LearnerTopic[] = [
  // 1. DEEP LEARNING & AI
  {
    id: 'deep-learning-transformers',
    title: 'Transformers, Self-Attention & Geometric Deep Learning',
    domain: 'Deep Learning & AI',
    tags: ['Transformers', 'Self-Attention', 'NLP', 'LLMs', 'ArXiv Papers', 'FlashAttention', 'Geometric DL'],
    depthContent: {
      1: {
        depthLabel: 'Tier 1: Dumb It Down (ELI5)',
        description: 'No equations, zero jargon. The pure intuitive mental model.',
        coreContent: `Imagine you are at a crowded high-school party where 50 people are talking at once. 

Older AI models (like RNNs) worked like a person with severe short-term memory who could only listen to one word at a time in strict order. By the time they reached word 20, they completely forgot what word 1 was about.

**The Transformer revolutionized everything with one idea: Self-Attention.**
Instead of reading word by word, imagine every word is an attendee at the party holding a flashlight.
• When the word **"bank"** speaks, it doesn't know if it means a money bank or a river bank.
• So it shines its flashlight across the entire room.
• If it sees the word **"money"** or **"vault"**, its flashlight glows super bright on them. 
• If it sees the word **"water"** or **"river"**, it focuses on that instead.

Every single word simultaneously calculates how much it should care about every other word in the entire sentence at once. That is the secret engine powering ChatGPT, Claude, and Gemini.`,
        analogies: [
          'The Flashlight Party: Every word shines a beam of variable brightness on all other words.',
          'The Filing Cabinet: Query is what you ask for, Key is the label on the drawer, Value is the actual document inside.'
        ],
        rabbitHoleQuestions: [
          'Why did humans assume language had to be processed sequentially from left to right for 50 years?',
          'If words can look at future words during training, why does text generation still output one token at a time?'
        ]
      },
      2: {
        depthLabel: 'Tier 2: Undergraduate Foundations',
        description: 'Vector embeddings, Query-Key-Value mechanics, and the Attention matrix.',
        coreContent: `At a mathematical level, words or tokens are first mapped to high-dimensional continuous vectors $\\mathbf{x}_i \\in \\mathbb{R}^{d}$.

In the original Transformer architecture (*Attention Is All You Need*, 2017), the input sequence matrix $X \\in \\mathbb{R}^{N \\times d}$ is projected into three distinct learned subspace matrices via weight matrices $W_Q, W_K, W_V \\in \\mathbb{R}^{d \\times d_k}$:

1. **Queries ($Q = X W_Q$)**: What each token is currently searching for.
2. **Keys ($K = X W_K$)**: What features each token possesses to advertise itself.
3. **Values ($V = X W_V$)**: The actual informational payload to be aggregated.

The attention weights are computed using the inner product (dot product) between queries and keys. Because the dot product grows large with high dimensionality $d_k$ (causing the softmax to push gradients to near zero), it is scaled by $\\frac{1}{\\sqrt{d_k}}$.`,
        equations: [
          '\\text{Attention}(Q, K, V) = \\text{softmax}\\left( \\frac{Q K^T}{\\sqrt{d_k}} \\right) V',
          '\\text{MultiHead}(Q, K, V) = \\text{Concat}(\\text{head}_1, \\dots, \\text{head}_h) W^O',
          '\\text{head}_i = \\text{Attention}(Q W_i^Q, K W_i^K, V W_i^V)'
        ],
        codeSnippet: `import torch
import torch.nn.functional as F

def scaled_dot_product_attention(Q, K, V, mask=None):
    # Q, K, V shape: [batch_size, num_heads, seq_len, d_k]
    d_k = Q.size(-1)
    scores = torch.matmul(Q, K.transpose(-2, -1)) / (d_k ** 0.5)
    if mask is not None:
        scores = scores.masked_fill(mask == 0, -1e9)
    weights = F.softmax(scores, dim=-1)
    output = torch.matmul(weights, V)
    return output, weights`
      },
      3: {
        depthLabel: 'Tier 3: Advanced Architecture & Math',
        description: 'Multi-Head Attention, RoPE (Rotary Position Embeddings), and Transformer Block Dynamics.',
        coreContent: `To achieve state-of-the-art performance in modern LLMs (LLaMA 3, Gemma, Mistral), three critical architectural refinements replaced original 2017 primitives:

1. **Rotary Position Embedding (RoPE)**:
Instead of adding static sinusoidal vectors ($X + P$), RoPE applies a complex 2D rotation to pairs of vector components:
$$R_{\\Theta, m}^d = \\text{diag}\\left( R_{\\theta_1, m}, \\dots, R_{\\theta_{d/2}, m} \\right)$$
This ensures that the inner product $(R_m q)^T (R_n k)$ depends strictly on the relative distance $(m - n)$, preserving translation invariance across context lengths up to 128k+ tokens.

2. **RMSNorm**:
Replacing standard LayerNorm: $\\text{RMSNorm}(x) = \\frac{x}{\\sqrt{\\frac{1}{d}\\sum_{i=1}^d x_i^2 + \\epsilon}} \\odot \\gamma$.

3. **SwiGLU Activation**:
$$\\text{SwiGLU}(x) = \\text{Swish}(x W_{\\text{gate}}) \\odot (x W_{\\text{up}}) W_{\\text{down}}$$`,
        equations: [
          '\\langle R_{\\Theta, m} q, R_{\\Theta, n} k \\rangle = g(q, k, m - n)',
          '\\text{RMSNorm}(x) = \\frac{x}{\\text{RMS}(x)} \\odot \\gamma',
          '\\text{FFN}_{\\text{SwiGLU}}(x) = (\\text{Swish}(x W_{\\text{gate}}) \\odot (x W_{\\text{up}})) W_{\\text{down}}'
        ]
      },
      4: {
        depthLabel: 'Tier 4: Frontier Research & ArXiv Papers',
        description: 'Memory bottlenecks, FlashAttention, State Space Models (Mamba), and KV-Cache Compression.',
        coreContent: `The fundamental scaling wall of the Transformer is its $O(N^2)$ memory and time complexity with sequence length $N$.

### Breakthrough 1: FlashAttention (Dao et al., 2022 / 2023)
Traditional GPU implementations were IO-bound: writing the $N \\times N$ attention matrix to High Bandwidth Memory (HBM) and reading it back for softmax consumed 80% of execution time. FlashAttention computes exact attention inside fast SRAM using **online softmax tiling** and recomputation during backward pass, achieving a 2x-4x speedup with zero approximation loss!

### Breakthrough 2: State Space Duality & Mamba (Gu & Dao, 2023)
Selective State Space Models (Mamba) challenge Transformers with $O(N)$ linear-time inference by making recurrent state matrices input-dependent:
$$h'(t) = A(t) h(t) + B(t) x(t), \\quad y(t) = C(t) h(t)$$`,
        researchPapers: [
          {
            title: 'Attention Is All You Need',
            authors: 'Vaswani, Shazeer, Parmar, Uszkoreit, Jones, Gomez, Kaiser, Polosukhin',
            year: 2017,
            arxivId: '1706.03762',
            coreContribution: 'Eliminated recurrence and convolutions entirely, introducing scaled dot-product multi-head attention.',
            plainEnglishTakeaway: 'Proved that paying attention to everything at once beats reading in sequential order.'
          },
          {
            title: 'FlashAttention: Fast and Memory-Efficient Exact Attention with IO-Awareness',
            authors: 'Tri Dao, Daniel Y. Fu, Stefano Ermon, Atri Rudra, Christopher Ré',
            year: 2022,
            arxivId: '2205.14135',
            coreContribution: 'Tiled matrix multiplication with online softmax normalization inside GPU on-chip SRAM.',
            plainEnglishTakeaway: 'Showed that the bottleneck was moving data from slow memory, not matrix multiplication itself.'
          },
          {
            title: 'Mamba: Linear-Time Sequence Modeling with Selective State Spaces',
            authors: 'Albert Gu, Tri Dao',
            year: 2023,
            arxivId: '2312.00752',
            coreContribution: 'Selective state spaces with hardware-aware parallel scans achieving Transformer-level reasoning at linear cost.',
            plainEnglishTakeaway: 'Broke the monopoly of Transformers for ultra-long context understanding.'
          }
        ]
      },
      5: {
        depthLabel: 'Tier 5: The Obscure Rabbit Hole',
        description: 'Geometric Deep Learning, Symmetry Groups, Hopfield Networks & Over-squashing.',
        coreContent: `Welcome to the extreme edge of neural architecture theory.

### 1. Transformers are Continuous Hopfield Networks
In 2020, Ramsauer et al. demonstrated that Scaled Dot-Product Attention is mathematically isomorphic to the update rule of a modern continuous associative memory (Hopfield network) with exponential storage capacity:
$$E(z) = -\\text{lse}\\left(\\beta, X^T z\\right) + \\frac{1}{2} z^T z$$
The Transformer does not merely "extract features"—it projects input queries onto energy valleys representing stored prototype attractors in a continuous thermodynamic landscape!

### 2. The Geometric Deep Learning Blueprint (Bronstein et al.)
Deep learning can be unified under the Erlangen Program of Felix Klein: architectures are simply inductive biases respecting the symmetry group of the underlying domain:
• **CNNs**: Invariant/Equivariant under Translation group $\\mathcal{T}(2)$.
• **Graph Neural Networks (GNNs)**: Equivariant under the Permutation group $\\mathcal{S}_n$.
• **Transformers**: Set functions that are fully permutation-equivariant over unordered bags of tokens, with positional encodings acting as symmetry-breaking perturbations!`,
        rabbitHoleQuestions: [
          'Can a finite Transformer simulate a Universal Turing Machine with bounded precision? (Yes, shown via RASP and counter automata).',
          'Is the self-attention map learning an implicit conformal field theory on the Riemannian manifold of tokens?',
          'If continuous Hopfield networks explain attention, can we build analog optical computers that compute attention in femtoseconds?'
        ]
      }
    },
    conceptGraph: [
      { id: 'vec-embed', label: 'Token Embeddings', tier: 1, description: 'Words converted into coordinates in geometric space.', connections: ['dot-prod', 'rope'] },
      { id: 'dot-prod', label: 'Scaled Dot-Product', tier: 2, description: 'Queries dot Keys measuring semantic alignment.', connections: ['softmax-matrix', 'multi-head'] },
      { id: 'softmax-matrix', label: 'Attention Weight Matrix', tier: 2, description: 'Row-normalized probabilities allocating dynamic focus.', connections: ['flash-attn'] },
      { id: 'multi-head', label: 'Multi-Head Attention', tier: 2, description: 'Parallel projections capturing syntax and semantics concurrently.', connections: ['swiglu'] },
      { id: 'rope', label: 'Rotary Embeddings (RoPE)', tier: 3, description: 'Complex plane rotation encoding relative token positions.', connections: ['flash-attn'] },
      { id: 'swiglu', label: 'SwiGLU & RMSNorm', tier: 3, description: 'Modern feed-forward gated activations and stabilized pre-normalization.', connections: ['hopfield'] },
      { id: 'flash-attn', label: 'FlashAttention Tiling', tier: 4, description: 'Exact on-chip SRAM tiling bypassing memory bandwidth bottlenecks.', connections: ['mamba-ssm'] },
      { id: 'mamba-ssm', label: 'State Space Duality (Mamba)', tier: 4, description: 'Linear-time sequence modeling with selective continuous state transitions.', connections: ['hopfield'] },
      { id: 'hopfield', label: 'Continuous Hopfield Energy', tier: 5, description: 'Attention as thermodynamic energy minimization in associative memory.', connections: ['geom-dl'] },
      { id: 'geom-dl', label: 'Geometric Symmetry Biases', tier: 5, description: 'Unification of neural networks under Klein\'s Erlangen symmetry groups.', connections: [] }
    ]
  },

  // 2. NEUROSCIENCE & ADHD
  {
    id: 'neuroscience-adhd-hyperfocus',
    title: 'Neuroscience of ADHD: Dopamine Signaling, Default Mode Network & Hyperfocus',
    domain: 'Neuroscience',
    tags: ['ADHD', 'Dopamine', 'Default Mode Network', 'Hyperfocus', 'Executive Function', 'Neuroplasticity'],
    depthContent: {
      1: {
        depthLabel: 'Tier 1: Dumb It Down (ELI5)',
        description: 'Why the ADHD brain is not a broken brain, but a Ferrari with bicycle brakes.',
        coreContent: `Having ADHD doesn't mean you have a shortage of attention. It means you have **an attention regulation engine that only starts when there is novelty, urgency, or extreme fascination**.

Think of your brain like a smartphone with 100 apps running in the background.
• In a neurotypical brain, the phone automatically puts background apps to sleep when you open a textbook.
• In an ADHD brain, the phone tries to run all 100 apps at full screen brightness simultaneously because the brain's chemical "sleep manager" (Dopamine and Norepinephrine in the Prefrontal Cortex) is under-signaled.

**What is Hyperfocus?**
When an ADHD brain finally finds something it genuinely fixates on (like coding, video games, an obscure rabbit hole, or a high-stakes crisis), dopamine floods the prefrontal cortex. The brakes suddenly lock in, the background apps vanish, and you enter a super-flow state where you can out-work anyone for 10 hours straight without eating!`,
        analogies: [
          'The Ferrari with Bicycle Brakes: Immense horsepower and speed, but the braking system requires specific cognitive downshifting.',
          'The Salty Popcorn Principle: An ADHD brain is starving for stimulation tokens; if a task is boring, the brain will hallucinate daydreams to survive the under-stimulation.'
        ],
        rabbitHoleQuestions: [
          'Why were ADHD traits evolutionary superpowers for hunter-gatherers scanning the savanna for predators?',
          'How does the Default Mode Network (mind wandering) stay locked on while you try to read?'
        ]
      },
      2: {
        depthLabel: 'Tier 2: Foundational Principles',
        description: 'Prefrontal cortex loops, tonic vs phasic dopamine firing, and executive dysfunction.',
        coreContent: `Neurobiologically, ADHD is primarily a disorder of the frontostriatal network:

1. **Dopamine Transporter (DAT1) & D4 Receptors**:
The density of dopamine reuptake transporters in the striatum is elevated, leading to premature clearing of synaptic dopamine. Consequently, **tonic (baseline) dopamine levels are low**, while **phasic (burst) firing** requires unusually intense stimuli to register a reward signal.

2. **The Frontostriatal Circuit**:
Connecting the Dorsolateral Prefrontal Cortex (DLPFC), Anterior Cingulate Cortex (ACC), and Basal Ganglia. This circuit is responsible for working memory gating, response inhibition, and delay discounting.`,
        equations: [
          'V = \\frac{A}{1 + k D} \\quad \\text{(Hyperbolic Delay Discounting)}',
          '\\Delta w = \\eta \\cdot (R - \\hat{R}) \\cdot e_t \\quad \\text{(Dopamine Reward Prediction Error)}'
        ]
      },
      3: {
        depthLabel: 'Tier 3: Network Dynamics & DMN/TPN Anti-Correlation',
        description: 'The failure of Default Mode Network suppression during task engagement.',
        coreContent: `In the human brain, two primary large-scale networks exhibit an antagonistic relationship:
• **Task-Positive Network (TPN)**: Active during externally focused, goal-directed attention.
• **Default Mode Network (DMN)**: Active during introspection, mind-wandering, and autobiographical memory (medial prefrontal cortex, posterior cingulate cortex, angular gyrus).

In neurotypical controls, activating the TPN strongly **suppresses** the DMN (negative covariance: $r < -0.4$). In ADHD individuals, the anti-correlation is significantly attenuated ($r \\approx 0$ or positive), leading to **intrusive task-unrelated thoughts (mind-wandering)** penetrating conscious working memory during low-stimulation tasks.`,
        equations: [
          '\\text{Corr}(\\text{TPN}(t), \\text{DMN}(t)) \\approx 0 \\quad \\text{(Attenuated Anti-Correlation in ADHD)}'
        ]
      },
      4: {
        depthLabel: 'Tier 4: Frontier Research & Literature',
        description: 'Genetic polygenic risk scores, locus coeruleus norepinephrine tuning, and sleep architecture.',
        coreContent: `Recent genome-wide association studies (GWAS) involving over 38,000 cases have identified 27 genome-wide significant loci enriched in brain-expressed genes.

Frontier research highlights the **Locus Coeruleus - Norepinephrine (LC-NE) system**. The LC exhibits an inverted-U performance curve (Yerkes-Dodson law):
• Low LC activity causes hypo-arousal and distractibility.
• High burst-firing is required to stabilize cortical signal-to-noise ratio. Medications like methylphenidate block DAT and NET, shifting the prefrontal cortex back to the optimal apex of the inverted-U.`,
        researchPapers: [
          {
            title: 'The default mode network in ADHD: an activation likelihood estimation meta-analysis',
            authors: 'Cortese, S., Kelly, C., et al.',
            year: 2012,
            arxivId: 'Am J Psychiatry 169(10)',
            coreContribution: 'Demonstrated pervasive hypoactivation of frontoparietal attention networks and hyperactivation of DMN.',
            plainEnglishTakeaway: 'Proved with fMRI scans that ADHD daydreaming is a physical failure to shut down internal brain chatter.'
          },
          {
            title: 'Genome-wide analyses of attention-deficit/hyperactivity disorder identify 27 risk loci',
            authors: 'Demontis, D. et al.',
            year: 2023,
            arxivId: 'Nature Genetics 55',
            coreContribution: 'Uncovered neurodevelopmental gene expression pathways conserved across human evolutionary history.',
            plainEnglishTakeaway: 'Showed that ADHD genetics have existed for thousands of years and are deeply tied to exploratory foraging behavior.'
          }
        ]
      },
      5: {
        depthLabel: 'Tier 5: The Obscure Rabbit Hole',
        description: 'The Hunter vs Farmer Hypothesis, Time Blindness & Spontaneous Lateral Innovation.',
        coreContent: `### 1. Hartmann\'s Hunter vs. Farmer Evolutionary Hypothesis
Why did genes for distractibility, novelty seeking, and risk-taking survive natural selection? In prehistoric nomadic societies, a "farmer" who liked repetitive routine planting thrived in fields, but a "hunter" who was hyper-vigilant, slept lightly, noticed a twig snapping 50 yards away, and bolted on impulse kept the entire tribe fed and safe from predators!

### 2. The Internal Clock Oscillator Deficit (Time Blindness)
ADHD individuals do not "disrespect deadlines"—their brain's striatal dopamine clock literally pulses at an irregular frequency. Experimental duration discrimination tests prove that ADHD brains perceive 10 minutes of boring tasks as lasting 45 minutes, while 3 hours of hyperfocus registers as 20 minutes!`,
        rabbitHoleQuestions: [
          'If ADHD traits are evolutionary hunting adaptations, why does the modern school system punish nonlinear exploration?',
          'Can we intentionally trigger hyperfocus on demand using auditory gamma entrainment and micro-stakes gamification?'
        ]
      }
    },
    conceptGraph: [
      { id: 'adhd-dopamine', label: 'Tonic Dopamine Deficit', tier: 1, description: 'Baseline neurochemical signaling causing sensation hunger.', connections: ['adhd-dmn', 'adhd-prefrontal'] },
      { id: 'adhd-dmn', label: 'Default Mode Network', tier: 2, description: 'Daydreaming network failing to deactivate during tasks.', connections: ['adhd-hyperfocus'] },
      { id: 'adhd-prefrontal', label: 'Prefrontal Gating', tier: 2, description: 'Executive dysfunction and delay discounting.', connections: ['adhd-lc-ne'] },
      { id: 'adhd-hyperfocus', label: 'Hyperfocus Phenomenon', tier: 3, description: 'Dopamine flood locking in 10-hour intense flow states.', connections: ['adhd-hunter'] },
      { id: 'adhd-lc-ne', label: 'Locus Coeruleus Inverted-U', tier: 4, description: 'Norepinephrine tuning cortical signal-to-noise ratio.', connections: ['adhd-gwas'] },
      { id: 'adhd-gwas', label: 'GWAS 27 Polygenic Loci', tier: 4, description: 'Genetic architecture conserved across human evolutionary history.', connections: ['adhd-hunter'] },
      { id: 'adhd-hunter', label: 'Hunter-Gatherer Hypothesis', tier: 5, description: 'Evolutionary survival advantages of novelty seeking.', connections: [] }
    ]
  },

  // 3. BLACK HOLES & THEORETICAL PHYSICS
  {
    id: 'black-hole-thermodynamics',
    title: 'Black Hole Thermodynamics & The Holographic Principle',
    domain: 'Theoretical Physics',
    tags: ['Black Holes', 'Hawking Radiation', 'Holographic Principle', 'AdS/CFT', 'Information Paradox'],
    depthContent: {
      1: {
        depthLabel: 'Tier 1: Dumb It Down (ELI5)',
        description: 'How black holes turned out to be the ultimate information hard drives of the universe.',
        coreContent: `Everyone knows that black holes are cosmic vacuum cleaners so dense that not even light can escape once it crosses the event horizon.

**The crazy twist discovered in the 1970s:**
Physicists realized that if you throw a hot cup of tea into a black hole, the entropy (disorder) of the universe seems to disappear! To save the laws of thermodynamics, Jacob Bekenstein and Stephen Hawking proved that **black holes have temperature, radiate heat, and have entropy!**

And here is the mind-melting part (The Holographic Principle):
The storage capacity of a black hole is NOT determined by its volume (how much 3D space is inside). It is strictly determined by the surface area of its outer skin (2D event horizon)! 

It means our entire 3D universe might just be a 2D hologram painted on the cosmic boundary!`,
        analogies: [
          'The Holographic Sticker: Just like a 2D shiny sticker creates a 3D hologram when light hits it, our 3D world might be projected from a 2D boundary surface.',
          'The Pixelated Horizon: The event horizon is divided into tiny Planck-area pixels ($10^{-70} \\text{ m}^2$), and each pixel stores exactly 1 bit of information.'
        ],
        rabbitHoleQuestions: [
          'If you burn an encyclopedia, the information is scrambled in smoke. When a black hole evaporates, is the information gone forever?',
          'Is gravity a fundamental force, or just an emergent illusion created by quantum entanglement thermodynamics?'
        ]
      },
      2: {
        depthLabel: 'Tier 2: Foundational Principles',
        description: 'The four laws of black hole mechanics and the Bekenstein-Hawking formula.',
        coreContent: `In 1973, Bardeen, Carter, and Hawking formulated the four laws of black hole mechanics, which bear a 1-to-1 mathematical correspondence with the four laws of classical thermodynamics:

• **Zeroth Law**: Surface gravity $\\kappa$ is constant over the event horizon (analogous to uniform temperature $T$).
• **First Law**: $dM = \\frac{\\kappa}{8\\pi} dA + \\Omega dJ + \\Phi dQ$ (analogous to $dE = T dS - P dV$).
• **Second Law (Hawking\'s Area Theorem)**: The surface area of the event horizon never decreases: $\\Delta A \\ge 0$.
• **Third Law**: It is impossible to achieve $\\kappa = 0$ in a finite number of physical processes.`,
        equations: [
          'S_{\\text{BH}} = \\frac{k_B c^3 A}{4 G \\hbar} = \\frac{A}{4 \\ell_P^2}',
          'T_H = \\frac{\\hbar c^3}{8 \\pi G M k_B}',
          'dM = \\frac{\\kappa}{8\\pi} dA + \\Omega dJ + \\Phi dQ'
        ]
      },
      3: {
        depthLabel: 'Tier 3: Quantum Field Theory in Curved Spacetime',
        description: 'Bogoliubov transformations and the derivation of Hawking radiation.',
        coreContent: `Hawking radiation arises because the vacuum state of a quantum field is observer-dependent in curved spacetime.

Consider a massless scalar field $\\phi$. In flat Minkowski spacetime, the field operator is expanded into creation and annihilation operators: $\\phi = \\sum (a_k u_k + a_k^\\dagger u_k^*)$. In the vicinity of a collapsing star, an asymptotic past observer (in-state) and an asymptotic future observer (out-state) define different vacua related by **Bogoliubov coefficients** $\\alpha_{ij}$ and $\\beta_{ij}$:
$$b_i = \\sum_j (\\alpha_{ij} a_j + \\beta_{ij} a_j^\\dagger)$$
Because $\\beta_{ij} \\neq 0$, the in-vacuum $|0_{\\text{in}}\\rangle$ contains a non-zero expectation value of out-particles with an exact Planckian thermal distribution at temperature $T_H$!`,
        equations: [
          '\\langle 0_{\\text{in}} | N_i^{\\text{out}} | 0_{\\text{in}} \\rangle = \\sum_j |\\beta_{ij}|^2 = \\frac{1}{e^{\\frac{2\\pi \\omega}{\\kappa}} - 1}'
        ]
      },
      4: {
        depthLabel: 'Tier 4: Frontier Research & Literature',
        description: 'The Black Hole Information Paradox, The Page Curve, and Quantum Islands.',
        coreContent: `### The Page Curve & Quantum Extremal Islands (2019-2020 Breakthrough)
In 1993, Don Page showed that if black hole evaporation is unitary (preserving quantum information), the entanglement entropy of radiation must initially increase, peak at the "Page Time" (when the black hole loses half its mass), and return to zero.

In 2019, Penington, Almheiri, Engelhardt, Marolf, and Maxfield derived the unitary Page curve directly from semiclassical Euclidean gravitational path integrals using **Quantum Extremal Surfaces (QES)**. After the Page time, an "island" inside the black hole interior becomes dynamically part of the entanglement wedge of the exterior Hawking radiation!`,
        researchPapers: [
          {
            title: 'Black hole explosions?',
            authors: 'S. W. Hawking',
            year: 1974,
            arxivId: 'Nature 248, 30–31',
            coreContribution: 'Demonstrated that quantum effects cause black holes to emit blackbody radiation and evaporate.',
            plainEnglishTakeaway: 'Showed that black holes are not completely black—they glow with quantum heat.'
          },
          {
            title: 'The Anti-de Sitter holographic dictionary and quantum extremal islands',
            authors: 'Almheiri, Hartman, Maldacena, Shaghoulian, Tajdini',
            year: 2020,
            arxivId: '2006.06872',
            coreContribution: 'Resolved the 45-year-old Black Hole Information Paradox using replica wormholes.',
            plainEnglishTakeaway: 'Proved that information is never destroyed; it escapes back out via quantum wormholes.'
          }
        ]
      },
      5: {
        depthLabel: 'Tier 5: The Obscure Rabbit Hole',
        description: 'AdS/CFT duality, ER=EPR, and Spacetime as Quantum Error-Correcting Code.',
        coreContent: `### 1. ER = EPR (Maldacena & Susskind)
In 1935, Einstein wrote two foundational papers: one proposing Einstein-Rosen bridges (wormholes, ER) and one proposing quantum entanglement (EPR). In 2013, Susskind and Maldacena conjectured they are the EXACT same phenomenon: **any two entangled particles are connected by an invisible micro-wormhole through spacetime**!

### 2. Spacetime as a Holographic Quantum Error-Correcting Code (HaPPY code)
In 2015, Pastawski, Yoshida, Harlow, and Preskill showed that the AdS/CFT correspondence functions identically to a quantum error-correcting code. Bulk spacetime geometry emerges from boundary entanglement in a way that is robust against local erasure errors!`,
        rabbitHoleQuestions: [
          'If spacetime is an error-correcting code, who or what is running the computation?',
          'Does the cosmological event horizon of our expanding universe imply we are inside an inside-out black hole?'
        ]
      }
    },
    conceptGraph: [
      { id: 'bh-entropy', label: 'Bekenstein-Hawking Entropy', tier: 1, description: 'Entropy proportional to horizon area A/4G.', connections: ['bh-hawking', 'bh-holo'] },
      { id: 'bh-hawking', label: 'Hawking Radiation', tier: 2, description: 'Thermal particle emission from quantum vacuum fluctuations.', connections: ['bh-info'] },
      { id: 'bh-holo', label: 'Holographic Principle', tier: 3, description: '3D volume physics projected from 2D boundary surface.', connections: ['bh-adscft'] },
      { id: 'bh-info', label: 'Information Paradox', tier: 4, description: 'Apparent destruction of quantum unitarity during evaporation.', connections: ['bh-page'] },
      { id: 'bh-page', label: 'Page Curve & Islands', tier: 4, description: 'Unitarity preserved via quantum extremal surfaces.', connections: ['bh-erepr'] },
      { id: 'bh-adscft', label: 'AdS/CFT Correspondence', tier: 4, description: 'Duality between gravity and conformal quantum field theory.', connections: ['bh-erepr'] },
      { id: 'bh-erepr', label: 'ER = EPR Conjecture', tier: 5, description: 'Wormholes and quantum entanglement are identical physical structures.', connections: [] }
    ]
  },

  // 4. GAME THEORY & STRATEGIC MECHANISMS
  {
    id: 'game-theory-nash-equilibrium',
    title: 'Game Theory, Mechanism Design & Evolutionary Dynamics',
    domain: 'Mathematics & Economics',
    tags: ['Game Theory', 'Nash Equilibrium', 'Mechanism Design', 'Prisoners Dilemma', 'Evolutionary Games'],
    depthContent: {
      1: {
        depthLabel: 'Tier 1: Dumb It Down (ELI5)',
        description: 'The mathematics of strategy, trust, betrayal, and why smart people make stupid collective decisions.',
        coreContent: `Imagine you and another suspect are arrested for a robbery and put into separate interrogation rooms.

• If you both stay silent, you both get 1 year in jail.
• If you snitch and your partner stays silent, you walk out completely free while they get 10 years.
• If you BOTH snitch on each other, you both get 5 years.

**The Tragedy of Pure Rationality (The Prisoner's Dilemma):**
From your selfish perspective, snitching is ALWAYS better whether your partner stays silent or talks. Your partner thinks the exact same thing. So you both snitch, and you both get 5 years in prison—even though staying silent would have given you only 1 year!

**Game theory proves why world peace, climate action, and traffic jams are so hard**: when everyone acts completely rationally in their own self-interest, the group as a whole often lands in the worst possible outcome!`,
        analogies: [
          'The Concert Standing Trap: If one person stands on their tiptoes to see better, everyone behind them must stand too. Now everyone is uncomfortable standing, but nobody can see any better!',
          'Golden Balls Split or Steal: The television game show where human trust meets mathematical game theory.'
        ],
        rabbitHoleQuestions: [
          'Can altruism and kindness evolve naturally in a population of purely selfish organisms?',
          'Why do nuclear armed countries build more missiles even though it makes them less safe?'
        ]
      },
      2: {
        depthLabel: 'Tier 2: Foundational Principles',
        description: 'Strategic normal-form games, dominant strategies, and Nash Equilibrium.',
        coreContent: `A non-cooperative game is formally defined by a triplet $\\Gamma = (N, \\{S_i\\}_{i \\in N}, \\{u_i\\}_{i \\in N})$:
• $N = \\{1, 2, \\dots, n\\}$: The finite set of players.
• $S_i$: The set of pure strategies available to player $i$.
• $u_i: S \\rightarrow \\mathbb{R}$: The payoff utility function.

### Nash Equilibrium:
A strategy profile $s^* = (s_1^*, s_2^*, \\dots, s_n^*) \\in S$ is a **Nash Equilibrium** if no player can unilaterally deviate to improve their expected utility:
$$u_i(s_i^*, s_{-i}^*) \\ge u_i(s_i, s_{-i}^*) \\quad \\forall s_i \\in S_i, \\quad \\forall i \\in N$$
John Nash proved in 1950 using Kakutani's fixed-point theorem that **every finite game has at least one mixed-strategy Nash equilibrium**.`,
        equations: [
          'u_i(s_i^*, s_{-i}^*) \\ge u_i(s_i, s_{-i}^*) \\quad \\forall s_i \\in S_i',
          '\\sigma_i(s_i) = \\frac{e^{\\lambda u_i(s_i)}}{\\sum_{s\'} e^{\\lambda u_i(s\')}} \\quad \\text{(Quantal Response Equilibrium)}'
        ]
      },
      3: {
        depthLabel: 'Tier 3: Mechanism Design & Auction Theory',
        description: 'Vickrey-Clarke-Groves (VCG) mechanisms and dominant-strategy incentive compatibility.',
        coreContent: `While game theory analyzes behavior in existing rules, **Mechanism Design (Reverse Game Theory)** engineers the rules of the game so that self-interested players are mathematically forced to reveal their true private values!

### The Vickrey (Second-Price) Auction
In a second-price sealed-bid auction:
• Every bidder submits a secret bid $b_i$.
• The highest bidder wins the item, but **pays only the second-highest bid** ($p = \\max_{j \\neq i} b_j$).
• **Theorem**: Bidding your exact true valuation ($b_i = v_i$) is a weakly dominant strategy! Bidding higher risks paying more than the item is worth; bidding lower risks losing the item without saving a penny!`,
        equations: [
          'p_i(v) = \\sum_{j \\neq i} v_j(k^*(v_{-i})) - \\sum_{j \\neq i} v_j(k^*(v)) \\quad \\text{(VCG Payment Formula)}'
        ]
      },
      4: {
        depthLabel: 'Tier 4: Frontier Research & Literature',
        description: 'Algorithmic Game Theory, Price of Anarchy, and Multi-Agent Reinforcement Learning.',
        coreContent: `In internet-scale systems (traffic routing, ad auctions, decentralized protocols), we measure efficiency loss using the **Price of Anarchy (PoA)**:
$$\\text{PoA} = \\frac{\\max_{s} \\text{SocialWelfare}(s)}{\\min_{s \\in \\text{Nash}} \\text{SocialWelfare}(s)}$$

Tim Roughgarden proved that in selfish network routing (Braess\'s Paradox), adding a brand-new high-speed highway can actually **increase total travel time for every single driver**!`,
        researchPapers: [
          {
            title: 'Equilibrium points in n-person games',
            authors: 'John F. Nash',
            year: 1950,
            arxivId: 'PNAS 36 (1): 48–49',
            coreContribution: 'Formulated the foundational equilibrium concept and proved existence via fixed-point theorem.',
            plainEnglishTakeaway: 'Showed that every strategic standoff has a point where nobody has an incentive to change their mind alone.'
          },
          {
            title: 'How bad is selfish routing?',
            authors: 'Tim Roughgarden, Éva Tardos',
            year: 2002,
            arxivId: 'Journal of the ACM 49(2)',
            coreContribution: 'Proved bounded Price of Anarchy in congestion games.',
            plainEnglishTakeaway: 'Proved that selfish commuters only waste 33% more time compared to an all-knowing master traffic controller.'
          }
        ]
      },
      5: {
        depthLabel: 'Tier 5: The Obscure Rabbit Hole',
        description: 'Evolutionary Stable Strategies (ESS), Axelrod\'s Tournament, and Tit-for-Tat.',
        coreContent: `### Robert Axelrod\'s Legendary Computer Tournament (1980)
Axelrod invited the world\'s top mathematicians, economists, and psychologists to submit computer programs to play 200 rounds of iterated Prisoner\'s Dilemma against each other. Complex Machiavellian strategies that tried to exploit opponents got crushed.

The winner was the simplest program in the tournament, written by Anatol Rapoport in four lines of BASIC: **Tit-for-Tat**!
1. Start by cooperating on round 1.
2. After that, simply copy whatever the opponent did in the previous round.
3. If they betray you, retaliate immediately once.
4. If they cooperate again, forgive them immediately!

Axelrod proved that the four golden rules for evolutionary success in life are: **Be Nice, Be Retaliatory, Be Forgiving, and Be Clear**!`,
        rabbitHoleQuestions: [
          'Why does human society punish altruistic whistleblowers even when it benefits the group as a whole?',
          'Can an artificial superintelligence be coordinated using mechanism design, or will it find arbitrage loopholes in human rules?'
        ]
      }
    },
    conceptGraph: [
      { id: 'gt-prisoners', label: 'Prisoner\'s Dilemma', tier: 1, description: 'Selfish rationality producing suboptimal group outcomes.', connections: ['gt-nash', 'gt-concert'] },
      { id: 'gt-nash', label: 'Nash Equilibrium', tier: 2, description: 'Zero incentive for unilateral strategy deviation.', connections: ['gt-vcg'] },
      { id: 'gt-concert', label: 'Tragedy of the Commons', tier: 1, description: 'Over-exploitation of shared unpriced resources.', connections: ['gt-poa'] },
      { id: 'gt-vcg', label: 'VCG Mechanism Design', tier: 3, description: 'Designing rules where truth-telling is a dominant strategy.', connections: ['gt-poa'] },
      { id: 'gt-poa', label: 'Price of Anarchy', tier: 4, description: 'Measuring efficiency gap between selfish chaos and optimal planning.', connections: ['gt-axelrod'] },
      { id: 'gt-axelrod', label: 'Axelrod\'s Tit-for-Tat', tier: 5, description: 'The evolutionary emergence of trust, retaliation, and forgiveness.', connections: [] }
    ]
  }
];

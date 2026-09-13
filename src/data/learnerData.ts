import { LearnerTopic } from '../types';

export const learnerTopics: LearnerTopic[] = [
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
    # Compute attention scores: [seq_len, seq_len]
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
Instead of adding static sinusoidal vectors ($X + P$), RoPE applies a complex 2D rotation to pairs of vector components in the query and key representations:
$$R_{\\Theta, m}^d = \\text{diag}\\left( R_{\\theta_1, m}, R_{\\theta_2, m}, \\dots, R_{\\theta_{d/2}, m} \\right)$$
This ensures that the inner product $(R_m q)^T (R_n k)$ depends strictly on the relative distance $(m - n)$, preserving translation invariance across context lengths up to 128k+ tokens.

2. **Pre-LayerNorm vs Post-LayerNorm**:
Original transformers used Post-LN ($x_{t+1} = \\text{LayerNorm}(x_t + \\text{Sublayer}(x_t))$), which caused gradient vanishing/explosion without warm-up. Modern architectures use Pre-LN or RMSNorm:
$$y = x + \\text{Sublayer}(\\text{RMSNorm}(x))$$
where $\\text{RMSNorm}(x) = \\frac{x}{\\sqrt{\\frac{1}{d}\\sum_{i=1}^d x_i^2 + \\epsilon}} \\odot \\gamma$.

3. **SwiGLU Activation**:
Replacing standard ReLU/GELU in the Feed-Forward Network (FFN):
$$\\text{SwiGLU}(x) = \\text{Swish}(x W_1) \\otimes (x W_2)$$`,
        equations: [
          '\\langle R_{\\Theta, m} q, R_{\\Theta, n} k \\rangle = g(q, k, m - n)',
          '\\text{RMSNorm}(x) = \\frac{x}{\\text{RMS}(x)} \\odot \\gamma = \\frac{x}{\\sqrt{\\frac{1}{d} \\sum_{i=1}^d x_i^2 + \\varepsilon}} \\odot \\gamma',
          '\\text{FFN}_{\\text{SwiGLU}}(x) = (\\text{Swish}(x W_{\\text{gate}}) \\odot (x W_{\\text{up}})) W_{\\text{down}}'
        ],
        codeSnippet: `class RMSNorm(torch.nn.Module):
    def __init__(self, dim: int, eps: float = 1e-6):
        super().__init__()
        self.eps = eps
        self.weight = torch.nn.Parameter(torch.ones(dim))

    def forward(self, x):
        norm = torch.rsqrt(x.pow(2).mean(-1, keepdim=True) + self.eps)
        return x * norm * self.weight`
      },
      4: {
        depthLabel: 'Tier 4: Frontier Research & ArXiv Papers',
        description: 'Memory bottlenecks, FlashAttention, State Space Models (Mamba), and KV-Cache Compression.',
        coreContent: `The fundamental scaling wall of the Transformer is its $O(N^2)$ memory and time complexity with sequence length $N$.

### Breakthrough 1: FlashAttention (Dao et al., 2022 / 2023)
Traditional GPU implementations were IO-bound: writing the $N \\times N$ attention matrix to High Bandwidth Memory (HBM) and reading it back for softmax consumed 80% of execution time. FlashAttention computes exact attention inside fast SRAM using **online softmax tiling** and recomputation during backward pass, achieving a 2x-4x speedup with zero approximation loss!

### Breakthrough 2: State Space Duality & Mamba (Gu & Dao, 2023)
Selective State Space Models (Mamba) challenge Transformers with $O(N)$ linear-time inference by making recurrent state matrices input-dependent:
$$h'(t) = A(t) h(t) + B(t) x(t), \\quad y(t) = C(t) h(t)$$
During training it unrolls as a parallel associative scan (logarithmic parallel time); during generation it compresses history into a constant-size hidden state $h$.`,
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
            plainEnglishTakeaway: 'Showed that the bottleneck was not math operations (FLOPs), but moving data back and forth from slow memory.'
          },
          {
            title: 'Mamba: Linear-Time Sequence Modeling with Selective State Spaces',
            authors: 'Albert Gu, Tri Dao',
            year: 2023,
            arxivId: '2312.00752',
            coreContribution: 'Selective state spaces with hardware-aware parallel scans achieving Transformer-level reasoning at linear cost.',
            plainEnglishTakeaway: 'Broke the 5-year monopoly of Transformers for ultra-long context understanding.'
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
• **Transformers**: Set functions that are fully permutation-equivariant over unordered bags of tokens, with positional encodings acting as symmetry-breaking perturbations!

### 3. The Over-squashing & Expressive Bottleneck Paradox
Why do Graph Transformers outperform message-passing GNNs? In standard message passing, information from $k$-hop neighbors grows exponentially ($d^k$), but must be compressed into a fixed-width vector. This causes **exponential information bottleneck (over-squashing)**. Global attention effectively collapses the graph diameter to 1, eliminating topological resistance.`,
        rabbitHoleQuestions: [
          'Can a finite Transformer simulate a Universal Turing Machine with bounded precision? (Yes, shown via RASP and counter automata).',
          'Is the self-attention map learning an implicit conformal field theory on the Riemannian manifold of tokens?',
          'If continuous Hopfield networks explain attention, can we build analog optical or thermodynamic computers that compute attention in femtoseconds with zero electricity?'
        ]
      }
    },
    conceptGraph: [
      { id: 'vec-embed', label: 'Token Embeddings', tier: 1, description: 'Words converted into coordinates in 4096-dimensional geometric space.', connections: ['dot-prod', 'rope'] },
      { id: 'dot-prod', label: 'Scaled Dot-Product', tier: 2, description: 'Queries dot Keys scaled by sqrt(d_k) measuring semantic alignment.', connections: ['softmax-matrix', 'multi-head'] },
      { id: 'softmax-matrix', label: 'Attention Weight Matrix', tier: 2, description: 'Row-normalized probabilities allocating dynamic focus across the context window.', connections: ['flash-attn'] },
      { id: 'multi-head', label: 'Multi-Head Attention', tier: 2, description: 'Parallel attention projections capturing syntax, coreference, and semantics concurrently.', connections: ['swiglu'] },
      { id: 'rope', label: 'Rotary Embeddings (RoPE)', tier: 3, description: 'Complex plane rotation encoding relative token positions naturally.', connections: ['flash-attn'] },
      { id: 'swiglu', label: 'SwiGLU & RMSNorm', tier: 3, description: 'Modern feed-forward gated activations and stabilized pre-normalization layers.', connections: ['hopfield'] },
      { id: 'flash-attn', label: 'FlashAttention Tiling', tier: 4, description: 'Exact on-chip SRAM tiling bypassing memory bandwidth bottlenecks.', connections: ['mamba-ssm'] },
      { id: 'mamba-ssm', label: 'State Space Duality (Mamba)', tier: 4, description: 'Linear-time sequence modeling with selective continuous state transitions.', connections: ['hopfield'] },
      { id: 'hopfield', label: 'Continuous Hopfield Energy', tier: 5, description: 'Attention as thermodynamic energy minimization in associative memory.', connections: ['geom-dl'] },
      { id: 'geom-dl', label: 'Geometric Symmetry Biases', tier: 5, description: 'Unification of neural networks under Klein\'s Erlangen symmetry groups.', connections: [] }
    ]
  },
  {
    id: 'quantum-biology',
    title: 'Quantum Biology: Coherence, Tunnelling & Avian Magnetoreception',
    domain: 'Quantum Biology',
    tags: ['Quantum Biology', 'Quantum Tunnelling', 'Photosynthesis', 'Cryptochrome', 'Radical Pairs'],
    depthContent: {
      1: {
        depthLabel: 'Tier 1: Dumb It Down (ELI5)',
        description: 'How living creatures hijack weird subatomic physics.',
        coreContent: `For decades, physicists believed quantum physics only happened in freezing cold, ultra-clean vacuum labs. They thought warm, wet, chaotic living cells would immediately destroy any delicate quantum magic.

**They were wrong.** Life has evolved over 3.8 billion years to become the ultimate quantum engineer!
• **Birds have quantum compasses in their eyes**: European robins navigate thousands of miles across oceans by using entangled pairs of electrons inside a protein in their retinas called *Cryptochrome*. They can literally see Earth's magnetic field lines!
• **Enzymes use teleportation (Quantum Tunnelling)**: To make chemical reactions happen fast enough to keep you alive, hydrogen atoms don't climb over chemical energy barriers—they literally ghost-walk straight *through* the barrier!`,
        analogies: [
          'Quantum Tunnelling: Instead of kicking a ball over a 50-foot hill, the ball dissolves and re-appears on the other side.',
          'Quantum Beat in Photosynthesis: Like sending 100 maze-runners down every hallway at the exact same instant to guarantee finding the fastest exit.'
        ],
        rabbitHoleQuestions: [
          'Do your olfactory receptors smell vibrational frequencies of molecular bonds using quantum tunnelling rather than shape-fitting lock-and-key?',
          'Is quantum coherence active in brain microtubules (the Penrose-Hameroff Orch-OR hypothesis)?'
        ]
      },
      2: {
        depthLabel: 'Tier 2: Undergraduate Foundations',
        description: 'Fenna-Matthews-Olson (FMO) complex and radical-pair magnetoreception.',
        coreContent: `In the photosynthetic Fenna-Matthews-Olson (FMO) bacteriochlorophyll complex, photon excitation transfers from chlorosomes to the reaction center with an astounding near-100% quantum efficiency.

Traditional classical energy transfer (Förster Resonance Energy Transfer, FRET) is an incoherent hopping mechanism with rate proportional to $R^{-6}$. In 2007, Fleming and Engel used 2D electronic spectroscopy to discover long-lived quantum beats enduring over 600 femtoseconds at biological temperatures, demonstrating that the excitation exists as a delocalized quantum superposition exploring multiple chromophore pathways simultaneously.`,
        equations: [
          '\\hat{H} = \\sum_{i} \\epsilon_i |i\\rangle\\langle i| + \\sum_{i \\neq j} J_{ij} |i\\rangle\\langle j|',
          'k_{\\text{FRET}} = \\frac{1}{\\tau_D} \\left( \\frac{R_0}{R} \\right)^6',
          '\\Delta E \\Delta t \\ge \\frac{\\hbar}{2}'
        ]
      },
      3: {
        depthLabel: 'Tier 3: Advanced Biophysical Mechanisms',
        description: 'The Radical Pair Mechanism in Cryptochrome and Enzymatic Proton Tunnelling.',
        coreContent: `In Cryptochrome (Cry4) flavoproteins found in bird eyes:
1. Photoexcitation by blue photon (450 nm) transfers an electron from a chain of four tryptophan residues ($W_{\\text{A}}, W_{\\text{B}}, W_{\\text{C}}, W_{\\text{D}}$) to the flavin adenine dinucleotide (FAD) cofactor.
2. This creates a spatially separated radical pair: $[\\text{FAD}^{\\bullet -} \\dots \\text{TrpH}^{\\bullet +}]$.
3. The two unpaired electron spins initially start in an entangled singlet state ($S = 0$).
4. Hyperfine interactions with neighboring nitrogen and hydrogen nuclear spins interconvert the radical pair between Singlet ($S$) and Triplet ($T$) states.
5. An external geomagnetic field as weak as 50 micro-Tesla perturbs this $S \\leftrightarrow T$ oscillation frequency, altering the ratio of downstream chemical signaling products that tell the bird's brain which direction is North!`,
        equations: [
          '\\hat{H}_{\\text{RP}} = g\\mu_B \\vec{B} \\cdot (\\hat{S}_1 + \\hat{S}_2) + \\sum_k \\hat{S}_1 \\cdot \\mathbf{A}_{1k} \\cdot \\hat{I}_{1k} + \\sum_l \\hat{S}_2 \\cdot \\mathbf{A}_{2l} \\cdot \\hat{I}_{2l}',
          '\\Phi_S = \\int_0^\\infty k_S \\rho_{SS}(t) dt'
        ]
      },
      4: {
        depthLabel: 'Tier 4: Research Frontier',
        description: 'Environment-Assisted Quantum Transport (ENAQT) and Quantum Scent.',
        coreContent: `Counter-intuitively, biological quantum transport is not damaged by thermal noise—it is *accelerated* by it! This phenomenon is termed **Environment-Assisted Quantum Transport (ENAQT)**:
In a purely coherent quantum system with energy disorder, Anderson localization traps the exciton on a single chromophore. Thermal phonons (molecular jiggling) continuously dephase the energy levels just enough to shake the exciton out of localized traps, enabling ballistic routing to the reaction center!`,
        researchPapers: [
          {
            title: 'Evidence for wavelike energy transfer through quantum coherence in photosynthetic systems',
            authors: 'Engel, Calhoun, Read, Ahn, Mančal, Cheng, Blankenship, Fleming',
            year: 2007,
            arxivId: 'Nature 446, 782–786',
            coreContribution: 'Direct experimental proof of quantum beating in the FMO complex at 77 K and later physiological temperatures.',
            plainEnglishTakeaway: 'Proved that photosynthesis solves the traveling salesman problem using quantum wave superpositions.'
          },
          {
            title: 'Magnetic sensitivity of radical pair reaction yields in cryptochrome',
            authors: 'Hore & Mouritsen',
            year: 2016,
            arxivId: 'Annual Review of Biophysics',
            coreContribution: 'Quantum spin dynamics explaining how geomagnetic orientation occurs in migratory songbirds.',
            plainEnglishTakeaway: 'Showed that a bird eye is an organic quantum sensor sensitive to micro-Tesla fields.'
          }
        ]
      },
      5: {
        depthLabel: 'Tier 5: Obscure Rabbit Hole',
        description: 'Proton Tunnelling DNA Mutations & The Orch-OR Quantum Consciousness Hypothesis.',
        coreContent: `### Löwdin\'s Quantum DNA Mutation Model (1963 - Confirmed 2022)
In the hydrogen bonds connecting Guanine-Cytosine base pairs, protons can undergo double quantum tunnelling across the potential energy barrier. Slocombe et al. (2022) using open quantum systems models showed that quantum tunnelling rates exceed classical thermal hopping by orders of magnitude, spontaneously creating rare tautomeric forms (G*-C*) that evade DNA polymerase proofreading and cause spontaneous genetic mutations!

### Orch-OR (Orchestrated Objective Reduction)
Roger Penrose and Stuart Hameroff proposed that consciousness arises not from synaptic firing, but from quantum superpositions within tubulin dimers inside neuronal microtubules, collapsing via Diósi-Penrose gravitationally induced quantum state reduction ($E = \\hbar / t$). While heavily debated, recent experiments detect delayed luminescence and quantum optical super-radiance in bundles of brain microtubules!`,
        rabbitHoleQuestions: [
          'If DNA mutations are driven by quantum tunnelling, is biological evolution fundamentally non-deterministic at the subatomic scale?',
          'Can we design synthetic room-temperature quantum computers by copying the molecular vibration shielding found in bacteriochlorophyll?'
        ]
      }
    },
    conceptGraph: [
      { id: 'fmo-complex', label: 'Photosynthetic FMO', tier: 1, description: 'Light harvesting complex routing excitons with 99% quantum yield.', connections: ['coherence-beats', 'enaqt'] },
      { id: 'coherence-beats', label: 'Quantum Superposition Beats', tier: 2, description: 'Wave-like electron excitation visiting all reaction sites at once.', connections: ['enaqt'] },
      { id: 'enaqt', label: 'ENAQT (Thermal Assist)', tier: 3, description: 'Molecular vibrations shaking excitons out of localized traps.', connections: ['tunnelling-enzymes'] },
      { id: 'cryptochrome', label: 'Cryptochrome Radical Pair', tier: 3, description: 'Blue-light photoinduced entangled spin states in bird retinas.', connections: ['geomag-sensing'] },
      { id: 'geomag-sensing', label: 'Geomagnetic Singlet/Triplet', tier: 4, description: 'Micro-Tesla fields altering chemical reaction yields in bird brains.', connections: ['dna-tunnelling'] },
      { id: 'tunnelling-enzymes', label: 'Enzymatic Tunnelling', tier: 2, description: 'Protons teleporting through activation barriers in metabolic enzymes.', connections: ['dna-tunnelling'] },
      { id: 'dna-tunnelling', label: 'Löwdin DNA Base Tunnelling', tier: 5, description: 'Spontaneous double-proton tunnelling causing base-pair mutations.', connections: ['orch-or'] },
      { id: 'orch-or', label: 'Microtubule Orch-OR', tier: 5, description: 'Penrose-Hameroff quantum superposition within neuronal tubulin.', connections: [] }
    ]
  }
];

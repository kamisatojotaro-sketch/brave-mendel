# SYNAPSE // Master Condensed Project Specification

This document synthesizes and condenses all user requests, specifications, psychological learning principles, architectural decisions, and visual design rules into a single comprehensive blueprint.

---

## 1. Executive Summary & User Goal
- **Target User**: Class 12 student in India preparing for **NEET UG** and **CBSE Class 12 Board Exams** (Physics, Chemistry, Biology) with ADHD, alongside an obsessive passion for universal deep dives into niche topics.
- **Core Problem Solved**: Traditional textbooks and generic coaching apps are overwhelming, lack cognitive scaffolding, have rigid pace, and trigger ADHD boredom or executive dysfunction.
- **Solution Built**: **SYNAPSE**—a cognitive ops platform featuring ADHD learning psychology (ELI5 analogies, 5-tier depth escalation, active recall drills, flow sprint audio synthesizers, spaced repetition mistake vault, automated scheduling, and AI vision step-marking for handwritten answers).

---

## 2. Core Wings & Navigation Structure
The platform is organized into 5 unified wings hosted under a tactical navigation header:

### A. MAIN HUB (`hub`)
- **Central Tactical Command Center**:
  - Live military/tactical telemetry: Real-time clock, status indicators, and circular radar sweep reticle.
  - Overall PCB Mastery Matrix: Live visual percentage gauges for Biology, Physics, and Chemistry.
  - **Today's Study Mission Itinerary**: Daily interactive checklist synchronized with **The Prepper** scheduler.
  - Quick action dispatchers to jump directly into NEET Arena, NCERT Board Lab, The Prepper, or The Learner.

### B. NCERT BOARD LAB (`board`)
- **Dual Editions**:
  - **Light Learner**: "Dumb It Down" / ELI5 analogies, daily-life mental models, formula simplifications.
  - **Deep Learner**: Formal CBSE marking rubrics, keyword identification, derivation proofs.
- **Subject & Subtopic Navigation**:
  - Complete syllabus covering Class 12 & 11 Physics, Chemistry, and Biology.
  - Displays all chapters $\rightarrow$ reveals all subtopics with an option to drill individual subtopics or click **"Study Entire Chapter"**.
- **3 Specialized Operation Modes**:
  1. **Study Session**: 5 Depth Tiers (Tier 1: ELI5 Intuition $\rightarrow$ Tier 5: 100/100 CBSE Rubric), key points, dual coding visual blueprints, and an end-of-topic active recall drill.
  2. **Skimmer**: 2-Minute rapid review flashcards with critical laws, formulas, and boundary caveats.
  3. **Test Prepper & Handwritten Answer Photo Upload**:
     - Real CBSE past board examination questions with step-by-step mark allocation.
     - **Handwritten Answer Photo Upload (`AnswerPhotoUploadModal`)**: Photograph/upload handwritten answer sheets on paper; evaluated by AI against official CBSE step-marking rubrics.
- **Verified Completion Rule**:
  - Chapter & subject progress bars **never update automatically**; they strictly increment when the student clicks the verified completion button at the very end of a study session, skim, or test!

### C. NEET UG EXAM ARENA (`neet`)
- **Dual Editions**:
  - **Light Learner**: Intuitive physics/chemistry/biology grasp and rapid mental shortcuts.
  - **Deep Learner**: Last 15 years PYQ patterns, NTA trick traps, negative marking warnings.
- **3 Specialized Operation Modes**:
  1. **Study Session**: 5 Depth Tiers tailored to NEET speed hacks, formula shortcuts, and mini revision quizzes.
  2. **Skimmer**: 120-second flashcards for high-yield tables, dimensions, and periodic trends.
  3. **Mock Test Prepper**: Timed mock exam with +4 / -1 negative marking, 45-second countdown timer, score card, and automated error logging into the **Mistake Vault**.
- **Verified Progress Tracking**: Progress bar strictly updates upon clicking the completion button at the end.

### D. THE PREPPER (`prepper`)
- **Automated Goal Scheduler**:
  - 1-Click **7-Day Sprint** or **30-Day Interleaved Schedule** (Physics $\rightarrow$ Chemistry $\rightarrow$ Biology rotation to prevent burnout).
- **Custom Daily Date Scheduler**:
  - Pick any calendar date, select subject, chapter, mode, and estimated time.
  - Automatically updates the Main Hub's "Today's Study Mission" each day.

### E. THE LEARNER (`learner`)
- **Universal Hyperfixation Engine**:
  - Open curiosity search input: accepts **literally any topic across human knowledge** (e.g. *Quantum Computing, Roman Empire, CRISPR, Synthesizers, Neuroscience, Game Theory, Black Hole Thermodynamics*).
  - Minimalist search bar with instant synthesis.
  - **5 Cognitive Depth Tiers**:
    - **Tier 1: Dumb It Down (ELI5)**: Zero equations, everyday metaphors, visual intuition first.
    - **Tier 2: Foundational Principles**: Invariants, conservation laws, core components.
    - **Tier 3: Technical Architecture**: Governing equations, code snippets, systems architecture.
    - **Tier 4: Frontier Research & Literature**: Seminal ArXiv preprints, breakthroughs, active debates.
    - **Tier 5: The Obscure Rabbit Hole**: Forgotten origins, counter-intuitive paradoxes, fringe frontiers.
  - **Comprehensive Resource Matrix**:
    - 🌐 **Wikipedia & Encyclopedias**: Direct external links with preview snippets.
    - 📚 **Essential Books & Literature**: Key titles, authors, and conceptual takeaways.
    - 🎬 **Documentaries & Video Lectures**: Curated platform media links.
    - 🕳️ **Adjacent Rabbit Holes**: Interactive curiosity pills—click any one to trigger an immediate deep dive.
  - **Interactive Concept Connection Tree**: Visual node map linking concepts from Tier 1 to Tier 5.

---

## 3. Cognitive Psychology & ADHD Toolset
- **Dual Coding**: Text concepts paired with visual blueprints and spatial layouts.
- **Active Recall & Interleaving**: Testing recall immediately after every subtopic.
- **Bionic Reading Mode**: Algorithmic bolding of word prefixes to anchor ADHD eye-tracking.
- **Ambient Audio Synthesizer**: Web Audio API engine providing Brown Noise, Pink Noise, and 14Hz Beta Binaural Beats.
- **Mistake Vault**: Categorizes errors by cognitive type (`concept`, `trap`, `calculation`, `careless`) with spaced-repetition review.

---

## 4. Visual Design & UI/UX System
- **Aesthetic Direction**: Inspired by the user-uploaded image (`media_1789307061536.png`) and `pvmun26.vercel.app`.
- **Palette**: Deep tactical obsidian (`#040806`), matrix emerald (`#06120a`), vivid emerald accents (`#10b981`), and subtle noise texture.
- **Typography**:
  - Editorial serif headings (`Cinzel`, `Playfair Display`) tracking wide.
  - Telemetry Data & Labels: Crisp monospace (`JetBrains Mono`) with `//` and `[ ]` decorators.
- **Tactical HUD Elements**: Glassmorphic panels, corner crosshairs, reticle radars, and glowing neon CTA buttons.

---

## 5. Technology Stack & Deployment
- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, Lucide React icons.
- **Math & Formulas**: Offline bundled KaTeX (zero external CDN dependencies).
- **Storage**: LocalStorage for zero-latency privacy and persistence across reloads.
- **Vision & Evaluation Engine**: Google Gemini API / Vision evaluator with offline procedural fallback.
- **Deployment**: Configured for Vercel via GitHub origin push.

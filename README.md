# SYNAPSE // Cognitive Mastery & The Hyperfixation Engine

A full-stack, cognitive-science powered learning platform built for Class 12 students in India preparing for **NEET** and **NCERT Board Exams**, engineered specifically for ADHD minds with a specialized hyperfixation engine (**The Learner**) to deep-dive into complex, obscure topics like Deep Learning, Transformers, and Quantum Biology.

---

## 🚀 How to Deploy on Vercel (100% Free)

This project is pre-configured with `vercel.json` for instant deployment on Vercel.

### Method 1: Deploy via GitHub (Recommended)

1. Create a new repository on [GitHub](https://github.com/new) (e.g. `synapse-cognitive`).
2. Push your project code to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of SYNAPSE platform"
   git branch -M main
   git remote add origin https://github.com/<YOUR_USERNAME>/<YOUR_REPO>.git
   git push -u origin main
   ```
3. Go to [Vercel](https://vercel.com) and log in with GitHub.
4. Click **"Add New..."** → **"Project"**.
5. Select your GitHub repository. Vercel will automatically detect **Vite**:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. Click **"Deploy"**. In under 40 seconds, your site will be live at `https://your-project.vercel.app`!

---

### Method 2: Deploy Directly via Terminal (No GitHub Required)

1. Open your terminal in this project folder:
   ```bash
   cd "c:\Users\S Jaasim Hasan\Documents\antigravity\brave-mendel"
   ```
2. Run the Vercel CLI:
   ```bash
   npx vercel
   ```
3. Follow the quick interactive prompts:
   - *Set up and deploy?* → `y`
   - *Which scope?* → (Press Enter)
   - *Link to existing project?* → `n`
   - *Project name?* → `synapse-learner` (or press Enter)
   - *In which directory is your code located?* → `./` (Press Enter)
   - *Want to modify these settings?* → `n`
4. For the final production URL, run:
   ```bash
   npx vercel --prod
   ```

---

## 💻 Local Development

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Build for production
npm run build
```
Local server will start at: `http://localhost:3000`

---

## 🧠 Core Features

1. **NEET Arena (Class 11 & 12 PCB)**:
   - Official revised NMC syllabus for Biology, Physics, and Chemistry.
   - 5-Tier Difficulty Slider (Recall $\rightarrow$ Application $\rightarrow$ NEET PYQ $\rightarrow$ Assertion-Reason $\rightarrow$ Brain-Twister).
   - Instant **"Dumb It Down" (ELI5)** plain-language analogies.
   - NCERT Line-by-Line traps and formula cheat sheets.
   - Automated Mistake Vault for spaced repetition.

2. **NCERT Board Lab**:
   - Interactive step-by-step derivation guides with CBSE line-by-line mark allocation.
   - 1/2/3/5-mark structured model answers with official marking rubrics and keywords to underline.

3. **The Learner (ADHD Hyperfixation Engine)**:
   - Deep Dive on **Transformers, Self-Attention & Geometric Deep Learning**.
   - 5 Cognitive Depth Tiers (ELI5 $\rightarrow$ Undergrad $\rightarrow$ Math & Architecture $\rightarrow$ ArXiv Papers $\rightarrow$ Continuous Hopfield Rabbit Holes).
   - Interactive Concept Tree graph.

4. **ADHD Cognitive Toolkit**:
   - Bionic reading mode toggle.
   - Flow sprint timer with in-browser Web Audio synthesizer (Brown Noise, Pink Noise, 14Hz Beta Binaural Beats).
   - LocalStorage offline persistence.

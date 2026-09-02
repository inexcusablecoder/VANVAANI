# VANVAANI — SIH 2026 (Problem Statement ID: SIH26042)

> **Tagline:** Every Language. Every Classroom.  
> **Problem Statement:** AI-Powered Vernacular Pedagogy and Real-Time Translation Tool for Mother Tongue-Based Primary Education  
> **Organization:** Government of Jharkhand — Department of Higher & Technical Education / Department of School Education & Literacy  
> **Theme:** Smart Education | **Category:** Software  

---

## 📌 Executive Summary

**VANVAANI** is an offline-first AI classroom assistant built specifically for primary schools in rural tribal belts of Jharkhand. Operating in alignment with Jharkhand's **PALASH Mother Tongue-Based Multilingual Education (MTB-MLE)** programme and the national **NIPUN Bharat Foundational Literacy and Numeracy (FLN)** guidelines, VANVAANI bridges the linguistic barrier between Hindi-medium trained primary teachers and native tribal-language-speaking students.

According to the **PALASH Language Mapping Survey (2024)**, only **23% of Grade-1 children** in Jharkhand's tribal-area schools understand Hindi upon entering primary school. VANVAANI enables real-time two-way classroom translation, voice instruction synthesis, bilingual worksheet generation, and visual flashcard creation for:
- **Santhali** (Ol Chiki script)
- **Mundari**
- **Ho**

---

## 🏛️ Technical Architecture

For complete architectural specifications, system diagrams, data models, AI pipelines, and offline-first protocols, please consult:

👉 **[Read full ARCHITECTURE.md Specification](./ARCHITECTURE.md)**

### Key Architectural Highlights:
* **Domain-Bounded Match Engine:** ~2,000–3,000 FLN vocabulary scope ensures sub-3-second latency and zero LLM hallucinations offline on ≤2GB RAM tablet hardware.
* **On-Device AI Engine:** Quantized TFLite / ONNX models for speech recognition (IndicWav2Vec / Vosk) and text-to-speech synthesis (Vakyansh / VITS).
* **Modular Language Packs:** Standardized JSON/SQLite language pack system (`assets/language_packs/`) allowing seamless addition of new regional languages.
* **Human-in-the-Loop Feedback:** Interactive teacher correction tool logging structured data to an offline `SyncQueue` for expert linguist review.

---

## 📂 Repository Directory Structure

```text
VANVAANI/
├── ARCHITECTURE.md             # Master Technical Architecture Specification
├── README.md                   # Project Overview & Setup Instructions (This file)
├── SIH26042_Final.pptx         # Official SIH Presentation Deck
├── mobile/                     # Native Android Kotlin Application Project
│   ├── app/                    # Android Application Module
│   │   └── src/main/java/com/vanvaani/
│   │       ├── ui/             # Dashboard, Translation, Voice, Content Views
│   │       ├── data/           # Local Database (Room/SQLite), Sync Manager
│   │       └── ai/             # On-Device ASR/TTS & Retrieval Engine
│   └── build.gradle.kts
├── backend/                    # Node.js / FastAPI Cloud Sync Gateway & Database
│   ├── src/                    # REST API Controllers & Language Pack Routes
│   └── database/               # PostgreSQL Database Schemas & Migrations
├── ai/                         # AI Model Pipeline & Dictionary Quantization Scripts
│   ├── dictionary_builder/     # FLN Vocabulary Curation Pipeline
│   └── quantization/           # ONNX / TFLite Quantization Scripts
└── src/                        # Interactive Companion Web Application (PWA)
    ├── components/             # Material 3 UI Components & Navigation
    ├── pages/                  # Splash, Onboarding, Dashboard & Feature Screens
    ├── services/               # Mock & Local Storage Service Interfaces
    └── styles/                 # Theme System & Ol Chiki Typography
```

---

## 🚀 Running the Interactive Web Companion App

The web companion app provides a high-fidelity visual prototype of the VANVAANI classroom assistant for interactive testing across mobile tablet and desktop browsers.

### Prerequisites:
- Node.js (v18+)
- npm or pnpm

### Quick Start:
```bash
# Install dependencies
npm install

# Start local development server
npm run dev
```
Open your browser at `http://localhost:5173`.

---

## 📱 Building the Native Android Application

1. Open the `./mobile` directory in **Android Studio (Ladybug or later)**.
2. Ensure Android SDK 34 (Android 14) and JDK 17 are installed.
3. Sync Gradle project files.
4. Run on an Android Emulator or physical test device (Android 8.0+ / 2GB RAM minimum).

---

## 🏆 Development Roadmap

- [x] **Phase 0:** Master Architecture Specification & Repository Foundation
- [x] **Phase 1:** Branding, Material 3 Design System, Splash, Onboarding & Feature UI Shells
- [ ] **Phase 2:** Local SQLite Phrase-Bank & Text Translation Service Integration
- [ ] **Phase 3:** On-Device ASR & TTS Model Pipeline Integration
- [ ] **Phase 4:** Educational Content Generators (Bilingual Worksheets & Flashcards)
- [ ] **Phase 5:** Offline Storage Manager & Sync Queue Infrastructure
- [ ] **Phase 6:** Teacher Feedback Loop & Validation Queue
- [ ] **Phase 7:** Backend REST API & Central PostgreSQL Sync Server
- [ ] **Phase 8:** Grand Finale Performance Optimization & Low-End Device Benchmarks

---

## 📜 License & Accreditation

Developed for **Smart India Hackathon 2026 (SIH26042)**  
Department of Higher & Technical Education / Department of School Education & Literacy, **Government of Jharkhand**.  
Aligned with **NIPUN Bharat FLN** and **PALASH MTB-MLE**.

# Changelog

All notable changes to the **AiProf** project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- **Core Next.js Setup:** Initialized the project infrastructure using Next.js 15 (App Router), React, TypeScript, and Tailwind CSS.
- **Product Requirements Document (PRD):** Drafted and injected the comprehensive PRD directly into `README.md` to establish project scope, target audience, and architecture.
- **Immersive Landing Page (`src/app/page.tsx`):**
  - Designed a premium, responsive landing page utilizing a dark-mode theme.
  - Implemented dynamic gradient typography and soft glowing background elements.
  - Added feature showcase cards with hover-state micro-animations.
- **Global Design System (`src/app/globals.css`):**
  - Configured custom utility classes for gradient text and fade-in animations.
  - Established core CSS variables matching the chosen brand identity.
- **Dashboard Interface (`src/app/dashboard/page.tsx`):**
  - Built a split-pane layout for intuitive user navigation.
  - **Sidebar:** Engineered a drag-and-drop file upload zone alongside a scrollable "Knowledge Base" document list.
  - **Main View:** Developed a chat interface featuring tabbed navigation (Context Chat, Auto Summaries, Quizzes) and differentiated user/AI message blocks.
  - Integrated `lucide-react` for polished, standardized iconography.
- **File Upload & Parsing API (`src/app/api/upload/route.ts`):**
  - Constructed a backend endpoint to securely receive `multipart/form-data`.
  - Integrated `pdf-parse` to facilitate robust text extraction out of PDF binaries entirely on the server-side.
  - Included fallback parsing logic for `.txt` and `.md` file equivalents.
  - Successfully wired the frontend dashboard to execute asynchronous API fetches, triggering realtime UI feedback upon extraction success.

### Changed
- **Metadata Config (`src/app/layout.tsx`):** Overhauled standard boilerplate DOM elements (Title, Meta Description) strictly for the AiProf persona.
- **Upload Functionality:** Converted the mocked `handleUpload` state demonstration within the Dashboard to execute an actual robust POST request containing standard `FormData`.

### Fixed
- Identified and bypassed potential directory naming conflicts (`AiProf` uppercase constraints) cleanly against Node ecosystem restrictions during initial environment bootstrapping without disrupting the existing `.git` history structure.

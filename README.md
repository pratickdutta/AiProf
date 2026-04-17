# AiProf - Your Context-Aware AI Tutor

AiProf is an intelligent web application designed to act as a personal, context-aware AI tutor. It allows users to upload study materials (PDFs, text notes) and interact with an AI that answers questions, generates summaries, and creates quizzes strictly based on the provided content.

## Product Requirements & Architecture

### Core Features
- **Upload Notes:** Upload PDFs and text files.
- **Context-Aware Q&A:** Chat with an AI that strictly answers from the uploaded content, including source text references.
- **Automated Summarization:** Generate short or detailed summaries from uploaded notes.
- **Quiz Generator:** Automatically generate MCQs based on the text.

### Technology Stack
- **Frontend:** Next.js (React), Tailwind CSS
- **Backend:** Next.js API Routes (Node.js)
- **AI Framework:** LangChain JS
- **LLM/Embeddings:** OpenAI API
- **Vector Database:** Pinecone (or similar)
- **Database:** MongoDB / Firebase

### Running the Project Locally

First, clone the repository and install dependencies:

```bash
git clone https://github.com/pratickdutta/AiProf.git
cd AiProf
npm install
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Development Roadmap
- [x] Initial Project Setup (Next.js, Tailwind CSS)
- [ ] Document Upload UI & API Route
- [ ] LangChain Text Splitting & Embedding setup
- [ ] Vector Databse Integration
- [ ] Q&A Chat Interface
- [ ] Summarization and Quiz generation modules

---
*Developed by pratickdutta*

# Aegis AI: UAE Contract Intelligence

A production-ready SaaS application designed to automate legal compliance auditing for the UAE market. This system ingests unstructured employment contracts (PDFs) and evaluates them against **Federal Decree-Law No. 33 of 2021** (The UAE Labour Law) to instantly identify regulatory risks.

## Core Features

* **High-Speed Document Ingestion:** Extracts text from legal PDFs with sub-second latency.
* **UAE Compliance Engine:** A deterministic heuristics engine that flags illegal probation periods, excessive non-compete clauses, and unlawful notice terms.
* **Executive Dashboard:** A premium, glassmorphic dark-mode interface with interactive data visualization and state-driven metric tracking.
* **Privacy First:** Fully local/on-premise extraction pipeline ensuring zero sensitive data is leaked to third-party LLM APIs.

## Technical Architecture

* **Frontend:** Next.js 15 (App Router), React, Tailwind CSS, Framer Motion, Lucide Icons.
* **Backend:** FastAPI, Python, PyPDF2, Uvicorn.
* **Data Flow:** The Next.js client transmits a multipart file payload to the FastAPI server. The backend parses the document layer, executes the text through a proprietary UAE compliance matrix, and returns a structured JSON risk-assessment payload to the React dashboard.

## Local Setup & Installation

### Backend Integration
1. Navigate to the backend directory: `cd backend`
2. Create a virtual environment: `python -m venv venv`
3. Activate the environment:
   * Windows: `venv\Scripts\activate`
   * Mac/Linux: `source venv/bin/activate`
4. Install dependencies: `pip install -r requirements.txt`
5. Launch the API server: `uvicorn main:app --reload --port 8000`

### Frontend Integration
1. Navigate to the frontend directory: `cd frontend`
2. Install Node modules: `npm install`
3. Launch the development server: `npm run dev`
4. Access the dashboard at `http://localhost:3000`

## Demo

![Aegis Dashboard](/frontend/screenshots/dashboard.png)
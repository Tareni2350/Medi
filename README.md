# MediSync AI

MediSync AI is a universal healthcare interoperability platform powered by AI. It addresses the challenge of fragmented patient records by aggregating data from multiple sources—hospitals, labs, and pharmacies—using India's ABHA (Ayushman Bharat Health Account) ID.

## Key Features

- **Unified Clinical History:** Aggregates conditions, medications, lab results, allergies, and procedures into a single, cohesive view.
- **AI-Powered Medical Summaries:** Uses a clinical-focused LLM (via Genkit and Gemini) to synthesize raw, fragmented data into concise, doctor-friendly summaries.
- **Diagnostic Trends:** Interactive charts for visualizing key health markers (e.g., Blood Glucose, HbA1c) over time.
- **ABDM Integrated:** Designed to align with the Ayushman Bharat Digital Mission (ABDM) framework for secure health data exchange.
- **Real-time Context:** A sidebar that maintains patient context across different views for a seamless clinical workflow.

## Tech Stack

- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS & ShadCN UI
- **AI/ML:** Genkit with Gemini 2.5 Flash
- **Icons:** Lucide-React
- **Charts:** Recharts (via ShadCN Chart components)

## Getting Started

1.  **Search:** Enter a demo ABHA ID on the home page (e.g., `1234-5678-9012`).
2.  **Overview:** View the integrated clinical profile and the AI-generated summary.
3.  **Diagnostics:** Explore historical trends and lab data.

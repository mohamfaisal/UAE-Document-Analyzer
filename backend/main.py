from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import time
import logging

from ai_pipeline import extract_text_from_pdf, generate_summary
from uae_risk_engine import analyze_uae_risks

app = FastAPI(title="UAE Legal AI Analyzer")

# Configure CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO)

@app.post("/analyze")
async def analyze_document(file: UploadFile = File(...)):
    if not file.filename.endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Only PDF files are supported.")
    
    start_time = time.time()
    
    try:
        # 1. Ingestion
        file_bytes = await file.read()
        text = extract_text_from_pdf(file_bytes)
        
        if not text.strip():
            raise HTTPException(status_code=400, detail="PDF is empty or unreadable.")

        # 2. AI Processing
        summary = generate_summary(text)
        
        # 3. Risk Inference
        risks = analyze_uae_risks(text)
        
        process_time = round(time.time() - start_time, 2)
        logging.info(f"Processed {file.filename} in {process_time}s")

        # 4. Structured Output
        return {
            "document_name": file.filename,
            "processing_time_seconds": process_time,
            "summary": summary,
            "risks": risks,
            "status": "success"
        }

    except Exception as e:
        logging.error(f"Error processing document: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error during analysis.")
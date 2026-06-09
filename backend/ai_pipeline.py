import PyPDF2
import io

def extract_text_from_pdf(file_bytes):
    reader = PyPDF2.PdfReader(io.BytesIO(file_bytes))
    text = ""
    for page in reader.pages:
        extracted = page.extract_text()
        if extracted:
            text += extracted + "\n"
    return text

def chunk_text(text, max_words=400):
    words = text.split()
    return [" ".join(words[i:i + max_words]) for i in range(0, len(words), max_words)]

def generate_summary(text):
    """
    Fallback Extractive Summarization.
    Extracts the first few meaningful sentences to avoid PyTorch/Windows dependency crashes.
    """
    # Clean the text and split into sentences
    lines = text.replace('\n', ' ').split('.')
    
    # Filter out empty strings or very short fragments
    valid_sentences = [line.strip() for line in lines if len(line.strip()) > 30]
    
    # Grab the first 3 substantial sentences for the summary
    if not valid_sentences:
        return "Could not generate summary. Document may be empty or unreadable."
    
    summary = ". ".join(valid_sentences[:3]) + "."
    return summary
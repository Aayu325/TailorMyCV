from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from pdf_parser import extract_text_from_pdf
from matcher import get_match_result
from cleaning import clean_json_string
from docx_parser import extract_html_from_docx
import json
import tempfile
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://tailor-my-cv-xtkw.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/match/")
async def match_files(resume: UploadFile = File(...), jd_text: str = Form(...)):
    if len(jd_text.strip()) < 20:
        return {"error": "Job description is too short or missing."}

    resume_data = await resume.read()
    with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as temp_resume:
        temp_resume.write(resume_data)
        temp_resume_path = temp_resume.name

    resume_text = extract_text_from_pdf(temp_resume_path)
    os.unlink(temp_resume_path)

    result = get_match_result(resume_text, jd_text)

    if hasattr(result, "content"):
        result = result.content

    cleaned = clean_json_string(result)
    print("Cleaned Response:\n", cleaned)

    try:
        parsed = json.loads(cleaned)
        return {
            "match_score": parsed.get("match_score"),
            "missing_keywords": parsed.get("missing_keywords"),
            "suggestions": parsed.get("suggestions"),
            "resume_text": resume_text
        }
    except json.JSONDecodeError:
        return {
            "error": "Could not parse cleaned JSON",
            "raw_response": cleaned,
            "resume_text": resume_text
        }

@app.post("/upload-docx/")
async def upload_docx(resume: UploadFile = File(...)):
    if not resume.filename.endswith(".docx"):
        return {"error": "Only .docx files are supported."}

    with tempfile.NamedTemporaryFile(delete=False, suffix=".docx") as temp_file:
        temp_file.write(await resume.read())
        temp_path = temp_file.name

    try:
        html = extract_html_from_docx(temp_path)
    finally:
        os.unlink(temp_path)

    return {"html": html}

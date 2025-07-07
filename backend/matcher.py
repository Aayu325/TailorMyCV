from langchain_groq import ChatGroq
from langchain.prompts import PromptTemplate
from dotenv import load_dotenv
import os

load_dotenv()

llm = ChatGroq(
    groq_api_key=os.getenv("GROQ_API_KEY"),
    model_name="llama3-70b-8192"
)

template = """
You are a professional resume matcher AI.
Given the RESUME and the JOB DESCRIPTION below, return:

1. Match Score (0–100) of resume with job description that how much resume matches with job description
2. Missing Keywords in Resume according to job description
3. Suggestions to improve resume
with 100 percent accuracy
RESUME:
{resume}

JOB DESCRIPTION:
{jd}

Think step-by-step before scoring
Respond in JSON format with keys: match_score, missing_keywords, suggestions.
Return only a valid JSON object. No markdown, no explanation.
If the job description is not valid English or too short (less than 20 words), return a JSON with match_score = 0 and a suggestion to improve the job description.
"""

# Use PromptTemplate + LCEL pipeline
prompt = PromptTemplate(input_variables=["resume", "jd"], template=template)
chain = prompt | llm  # LCEL-style chaining

def get_match_result(resume_text, jd_text):
    return chain.invoke({"resume": resume_text, "jd": jd_text})

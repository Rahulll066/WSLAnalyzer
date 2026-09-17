import base64
import os

from fastapi import APIRouter, UploadFile, File, HTTPException
from pydantic import BaseModel

from core.parser import parse_line
from core.analyzer import analyze_logs
from core.statistics import generate_statistics
from core.risk import calculate_risk
from core.analyzers.brute_force import detect as detect_brute_force

router = APIRouter(prefix="/upload", tags=["Upload"])

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


class EncodedUpload(BaseModel):
    filename: str
    content: str


def analyze_file(filename: str, content: bytes):
    file_path = os.path.join(UPLOAD_DIR, os.path.basename(filename))

    with open(file_path, "wb") as buffer:
        buffer.write(content)

    logs = []

    with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
        for line in f:
            parsed = parse_line(line.strip())
            if parsed:
                logs.append(parsed)

    results = analyze_logs(logs)
    brute_force_results = detect_brute_force(logs)
    summary = generate_statistics(logs, results)
    summary["risk_score"] = calculate_risk(results)

    return {
        "filename": filename,
        "summary": summary,
        "brute_force": brute_force_results,
        "results": results
    }


@router.post("")
@router.post("/")
async def upload_log(file: UploadFile = File(...)):
    return analyze_file(file.filename, file.file.read())


@router.post("/encoded")
async def upload_encoded(payload: EncodedUpload):
    try:
        content = base64.b64decode(payload.content, validate=True)
    except ValueError as error:
        raise HTTPException(status_code=400, detail="Invalid encoded file content") from error

    return analyze_file(payload.filename, content)

from fastapi import APIRouter, UploadFile, File
import shutil
import os

from core.parser import parse_line
from core.analyzer import analyze_logs
from core.statistics import generate_statistics
from core.risk import calculate_risk
from core.analyzers.brute_force import detect as detect_brute_force

router = APIRouter(prefix="/upload", tags=["Upload"])

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post("/")
async def upload_log(file: UploadFile = File(...)):
    file_path = os.path.join(UPLOAD_DIR, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    logs = []

    with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
        for line in f:
            parsed = parse_line(line.strip())
            if parsed:
                logs.append(parsed)

    # Analyze logs
    results = analyze_logs(logs)
    brute_force_results = detect_brute_force(logs)

    # Generate statistics
    summary = generate_statistics(logs, results)

    # Calculate overall risk score
    summary["risk_score"] = calculate_risk(results)

    return {
        "filename": file.filename,
        "summary": summary,
        "brute_force": brute_force_results,
        "results": results
    }
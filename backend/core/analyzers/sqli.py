from core.rule_loader import get_rules

PATTERNS = get_rules()["sqli"]


def detect(log):
    url = log["url"].lower()
    findings = []

    for pattern in PATTERNS:
        if pattern.lower() in url:
            findings.append({
                "type": "SQL Injection",
                "severity": "High",
                "pattern": pattern,
                "evidence": log["url"],
                "recommendation": "Validate input and use parameterized queries.",
                "owasp": "A03:2021 Injection"
            })

    return findings
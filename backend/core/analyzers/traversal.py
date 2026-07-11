from core.rule_loader import get_rules

PATTERNS = get_rules()["traversal"]

def detect(log):

    url = log["url"].lower()

    findings = []

    for pattern in PATTERNS:

        if pattern.lower() in url:

            findings.append({
                "type": "Directory Traversal",
                "severity": "High",
                "pattern": pattern,
                "url": log["url"]
            })

    return findings
from core.rule_loader import get_rules

PATTERNS = get_rules()["scanner"]


def detect(log):

    agent = log["user_agent"].lower()

    findings = []

    for pattern in PATTERNS:

        if pattern.lower() in agent:

            findings.append({
                "type": "Security Scanner",
                "severity": "Medium",
                "tool": pattern
            })

    return findings
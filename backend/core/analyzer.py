from core.analyzers import (
    sqli,
    xss,
    traversal,
    command,
    scanner,
)


def analyze_logs(logs):
    results = []

    for log in logs:
        findings = []

        findings.extend(sqli.detect(log))
        findings.extend(xss.detect(log))
        findings.extend(traversal.detect(log))
        findings.extend(command.detect(log))
        findings.extend(scanner.detect(log))

        if findings:
            results.append({
                "log": log,
                "findings": findings
            })

    return results
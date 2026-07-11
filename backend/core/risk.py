SEVERITY_SCORES = {
    "Low": 5,
    "Medium": 10,
    "High": 20,
    "Critical": 30
}


def calculate_risk(findings):

    score = 0

    for result in findings:

        for finding in result["findings"]:

            severity = finding["severity"]

            score += SEVERITY_SCORES.get(severity, 0)

    return min(score, 100)
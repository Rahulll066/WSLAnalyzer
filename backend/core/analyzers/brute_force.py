from collections import defaultdict

# Endpoints commonly targeted for login
LOGIN_ENDPOINTS = [
    "/login",
    "/signin",
    "/admin",
    "/wp-login.php"
]

# Number of failed login attempts before flagging
FAILED_THRESHOLD = 5


def detect(logs):
    """
    Detect brute-force attacks based on repeated failed logins.
    """

    failed_attempts = defaultdict(int)
    findings = []

    for log in logs:

        url = log["url"].lower()

        if any(endpoint in url for endpoint in LOGIN_ENDPOINTS):

            if log["status"] in [401, 403]:

                failed_attempts[log["ip"]] += 1

    for ip, count in failed_attempts.items():

        if count >= FAILED_THRESHOLD:

            findings.append({
                "ip": ip,
                "type": "Brute Force Attack",
                "severity": "Critical",
                "failed_attempts": count,
                "recommendation": "Enable account lockout and rate limiting."
            })

    return findings
from collections import Counter


def generate_statistics(logs, findings):
    """
    Generate summary statistics from parsed logs and detected findings.
    """

    total_requests = len(logs)

    suspicious_requests = len(findings)

    unique_ips = len(set(log["ip"] for log in logs))

    status_codes = Counter(str(log["status"]) for log in logs)

    methods = Counter(log["method"] for log in logs)

    attack_distribution = Counter()

    ip_attacks = Counter()

    targeted_urls = Counter()

    severity_counter = Counter()

    for result in findings:

        ip = result["log"]["ip"]
        url = result["log"]["url"]

        ip_attacks[ip] += len(result["findings"])
        targeted_urls[url] += 1

        for finding in result["findings"]:

            attack_distribution[finding["type"]] += 1
            severity_counter[finding["severity"]] += 1

    risk_score = min(100, suspicious_requests * 10)

    if risk_score >= 75:
        threat_level = "High"
    elif risk_score >= 40:
        threat_level = "Medium"
    else:
        threat_level = "Low"

    most_common_attack = (
        attack_distribution.most_common(1)[0][0]
        if attack_distribution
        else "None"
    )

    most_targeted_url = (
        targeted_urls.most_common(1)[0][0]
        if targeted_urls
        else "-"
    )

    most_common_status = (
        status_codes.most_common(1)[0][0]
        if status_codes
        else "-"
    )

    return {

        "total_requests": total_requests,

        "suspicious_requests": suspicious_requests,

        "unique_ips": unique_ips,

        "risk_score": risk_score,

        "threat_level": threat_level,

        "most_common_attack": most_common_attack,

        "most_targeted_url": most_targeted_url,

        "most_common_status": most_common_status,

        "status_codes": dict(status_codes),

        "methods": dict(methods),

        "attack_distribution": dict(attack_distribution),

        "severity_distribution": dict(severity_counter),

        "top_attacking_ips": ip_attacks.most_common(10),

    }
import re

LOG_PATTERN = re.compile(
    r'(?P<ip>\S+) '
    r'\S+ \S+ '
    r'\[(?P<time>.*?)\] '
    r'"(?P<method>\S+) (?P<url>\S+) (?P<protocol>.*?)" '
    r'(?P<status>\d{3}) '
    r'(?P<size>\S+) '
    r'"(?P<referer>.*?)" '
    r'"(?P<agent>.*?)"'
)


def parse_line(line: str):
    match = LOG_PATTERN.match(line)

    if not match:
        return None

    data = match.groupdict()

    return {
        "ip": data["ip"],
        "timestamp": data["time"],
        "method": data["method"],
        "url": data["url"],
        "protocol": data["protocol"],
        "status": int(data["status"]),
        "size": data["size"],
        "referer": data["referer"],
        "user_agent": data["agent"]
    }
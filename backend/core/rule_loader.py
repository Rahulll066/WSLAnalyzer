import json
import os

RULES_PATH = os.path.join(
    os.path.dirname(os.path.dirname(__file__)),
    "rules",
    "attack_patterns.json"
)

with open(RULES_PATH, "r", encoding="utf-8") as file:
    RULES = json.load(file)


def get_rules():
    return RULES
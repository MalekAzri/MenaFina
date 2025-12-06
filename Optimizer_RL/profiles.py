# profiles.py

PROFILE_CONFIG = {
    "conservative": {"max_crypto": 0.03, "min_safe": 0.40, "min_bonds": 0.30},
    "balanced":     {"max_crypto": 0.10, "min_safe": 0.25, "min_bonds": 0.15},
    "aggressive":   {"max_crypto": 0.25, "min_safe": 0.10, "min_bonds": 0.00}
}

def get_profile_constraints(profile: str):
    return PROFILE_CONFIG.get(profile, PROFILE_CONFIG["balanced"])

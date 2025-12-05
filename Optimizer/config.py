START_DATE = "2018-01-01"
END_DATE = "2025-01-01"

CAPITAL = 10000  # montant initial à investir

# profils utilisateurs — pondérations maxi/min
PROFILE_CONFIG = {
    "conservative": {"max_crypto": 0.03, "min_safe": 0.40, "min_bonds": 0.30},
    "balanced":     {"max_crypto": 0.10, "min_safe": 0.25, "min_bonds": 0.15},
    "aggressive":   {"max_crypto": 0.25, "min_safe": 0.10, "min_bonds": 0.00}
}

